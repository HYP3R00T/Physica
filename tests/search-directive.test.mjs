import assert from "node:assert/strict"
import test from "node:test"
import search from "../src/directives/search.ts"

class Keyboard extends Event {
  constructor(key, ctrlKey = false) {
    super("keydown", { cancelable: true })
    this.key = key
    this.ctrlKey = ctrlKey
    this.metaKey = false
  }
}
class Island extends EventTarget {
  isConnected = true
  ownerDocument = globalThis.document
  attributes = new Map()
  querySelector() {
    return null
  }
  setAttribute(k, v) {
    this.attributes.set(k, v)
  }
  removeAttribute(k) {
    this.attributes.delete(k)
  }
}

test("search defers hydration, handles the shortcut once, and cleans up after loading", async () => {
  globalThis.document = new EventTarget()
  globalThis.KeyboardEvent = Keyboard
  const island = new Island()
  let loads = 0
  let hydrated = 0
  search(
    async () => {
      loads++
      return async () => {
        hydrated++
      }
    },
    {},
    island,
  )
  document.dispatchEvent(new Keyboard("x", true))
  assert.equal(loads, 0)
  const shortcut = new Keyboard("k", true)
  document.dispatchEvent(shortcut)
  island.dispatchEvent(new Event("click", { cancelable: true }))
  await new Promise((resolve) => setImmediate(resolve))
  assert(shortcut.defaultPrevented)
  assert.equal(loads, 1)
  assert.equal(hydrated, 1)
  assert(island.attributes.has("data-search-requested"))
  assert(!island.attributes.has("aria-busy"))
  document.dispatchEvent(new Keyboard("k", true))
  assert.equal(loads, 1)
})

test("navigation removes the old page's pending search listener", () => {
  globalThis.document = new EventTarget()
  globalThis.KeyboardEvent = Keyboard
  let loads = 0
  search(
    async () => {
      loads++
      return async () => {}
    },
    {},
    new Island(),
  )
  document.dispatchEvent(new Event("astro:before-swap"))
  document.dispatchEvent(new Keyboard("k", true))
  assert.equal(loads, 0)
})

test("an incoming page keeps its listener when the previous page swaps out", async () => {
  globalThis.document = new EventTarget()
  globalThis.KeyboardEvent = Keyboard
  const island = new Island()
  island.ownerDocument = new EventTarget()
  let loads = 0
  search(
    async () => {
      loads++
      return async () => {}
    },
    {},
    island,
  )
  document.dispatchEvent(new Event("astro:before-swap"))
  document.dispatchEvent(new Keyboard("k", true))
  assert.equal(loads, 0)
  island.ownerDocument = document
  document.dispatchEvent(new Keyboard("k", true))
  await new Promise((resolve) => setImmediate(resolve))
  assert.equal(loads, 1)
})
