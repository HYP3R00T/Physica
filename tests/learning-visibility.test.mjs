import assert from "node:assert/strict"
import test from "node:test"
import { getModuleNotes, getVisibleLearning } from "../src/lib/content.ts"

const entry = (id, data = {}) => ({
  id,
  filePath: `content/notes/${id}.mdx`,
  data: { title: id, draft: false, ...data },
})

test("draft status does not hide modules or notes and hide is optional", () => {
  const module = entry("demo/index", { draft: true })
  const draft = entry("demo/010-first", { draft: true })
  const final = entry("demo/020-second", { hide: false })
  const entries = [module, draft, final]
  assert.deepEqual(getVisibleLearning(entries), entries)
})

test("hidden notes are removed from the reading sequence", () => {
  const module = entry("demo/index")
  const first = entry("demo/010-first")
  const hidden = entry("demo/020-hidden", { hide: true, draft: true })
  const last = entry("demo/030-last", { draft: true })
  const visible = getVisibleLearning([module, first, hidden, last])
  assert.deepEqual(getModuleNotes(visible, module), [first, last])
})

test("hidden modules hide all their notes without mutating their front matter", () => {
  const hiddenModule = entry("hidden/index", { hide: true })
  const child = entry("hidden/010-child", { hide: false })
  const visibleModule = entry("visible/index")
  const visibleChild = entry("visible/010-child", { draft: true })
  const entries = [hiddenModule, child, visibleModule, visibleChild]
  const original = structuredClone(entries)
  assert.deepEqual(getVisibleLearning(entries), [visibleModule, visibleChild])
  assert.deepEqual(entries, original)
})
