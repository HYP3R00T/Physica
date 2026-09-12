import assert from "node:assert/strict"
import { test } from "node:test"
import rehypeRoadmapContent from "../src/lib/rehype-roadmap-content.mjs"
import { validateRoadmap } from "../src/lib/roadmap-validation.ts"

const entry = (segment, order, dependencies = [], draft = false) => ({
  id: segment.toLowerCase(),
  data: { segment, order, dependencies, draft },
})

test("accepts independent branches, order gaps, and unsorted collection results", () => {
  assert.doesNotThrow(() => validateRoadmap([entry("Q1", 30, ["M1"]), entry("M1", 1), entry("CM1", 10, ["M1"])]))
})
test("rejects dangling dependencies", () => {
  assert.throws(() => validateRoadmap([entry("M1", 1, ["CM1"])]), /unknown/)
})
test("rejects cycles and backwards links", () => {
  assert.throws(() => validateRoadmap([entry("M1", 1, ["CM1"]), entry("CM1", 2, ["M1"])]), /earlier/)
})
test("rejects duplicate segment IDs and orders", () => {
  assert.throws(() => validateRoadmap([entry("M1", 1), entry("M1", 2)]), /Duplicate roadmap segment/)
  assert.throws(() => validateRoadmap([entry("M1", 1), entry("M2", 1)]), /Duplicate roadmap order/)
})
test("published segments cannot depend on drafts", () => {
  assert.throws(() => validateRoadmap([entry("M1", 1, [], true), entry("CM1", 2, ["M1"])]), /depends on draft/)
})
test("checks filenames and repeated links", () => {
  assert.throws(() => validateRoadmap([{ ...entry("M1", 1), id: "wrong-name" }]), /filename/)
  assert.throws(() => validateRoadmap([entry("M1", 1), entry("CM1", 2, ["M1", "M1"])]), /Repeated/)
})
test("MDX headings, equation IDs and local links are scoped to their segment", () => {
  const tree = {
    type: "root",
    children: [
      { type: "element", tagName: "h2", properties: {}, children: [{ type: "text", value: "What to study" }] },
      { type: "element", tagName: "figure", properties: { id: "energy" }, children: [] },
      { type: "element", tagName: "a", properties: { href: "#what-to-study" }, children: [] },
      { type: "element", tagName: "a", properties: { href: "#energy" }, children: [] },
      { type: "element", tagName: "a", properties: { href: "/roadmap#segment-m2" }, children: [] },
    ],
  }
  const path = "/project/content/roadmap/m1.mdx"
  rehypeRoadmapContent()(tree, { path, history: [path], data: {} })
  assert.equal(tree.children[0].properties.id, "segment-m1--what-to-study")
  assert.equal(tree.children[0].tagName, "h2")
  assert.equal(tree.children[1].properties.id, "segment-m1--energy")
  assert.equal(tree.children[2].properties.href, "#segment-m1--what-to-study")
  assert.equal(tree.children[3].properties.href, "#segment-m1--energy")
  assert.equal(tree.children[4].properties.href, "/roadmap#segment-m2")
})
test("leaves notes and posts unchanged", () => {
  const tree = {
    type: "root",
    children: [{ type: "element", tagName: "h2", properties: { id: "intro" }, children: [] }],
  }
  const before = structuredClone(tree)
  rehypeRoadmapContent()(tree, { path: "/project/content/posts/example.mdx" })
  assert.deepEqual(tree, before)
})
