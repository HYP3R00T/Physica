import assert from "node:assert/strict"
import { test } from "node:test"
import { mapRoadmapModules } from "../src/lib/content.ts"
import rehypeRoadmapContent from "../src/lib/rehype-roadmap-content.mjs"
import { migrateRoadmapProgress, resolveRoadmapHash } from "../src/lib/roadmap-identity.ts"
import { getRoadmapStrands } from "../src/lib/roadmap-strands.ts"
import { validateRoadmap } from "../src/lib/roadmap-validation.ts"

const entry = (id, dependencies = [], strand = "physics", draft = false, aliases = []) => ({
  id,
  data: { strand, dependencies, draft, aliases },
})
const sort = (entries) => validateRoadmap(entries).map(({ id }) => id)

test("sorts dependencies before dependents regardless of input order", () => {
  const entries = [entry("spectra", ["atoms"]), entry("atoms", ["vectors"]), entry("vectors")]
  assert.deepEqual(sort(entries), ["vectors", "atoms", "spectra"])
  assert.deepEqual(sort(entries.reverse()), ["vectors", "atoms", "spectra"])
})
test("inserts a segment without renaming or ordering existing files", () => {
  assert.deepEqual(sort([entry("lasers", ["spectra"]), entry("atoms"), entry("spectra", ["atoms"])]), [
    "atoms",
    "spectra",
    "lasers",
  ])
})
test("resolves independent roots, branching, merging, and a new strand", () => {
  const entries = [
    entry("merge", ["left", "right"]),
    entry("right", ["root"], "new-strand"),
    entry("left", ["root"]),
    entry("root"),
    entry("independent"),
  ]
  assert.deepEqual(sort(entries), ["independent", "root", "left", "right", "merge"])
})
test("rejects missing dependencies, invalid strand names, repeated links and invalid filenames", () => {
  assert.throws(() => sort([entry("atoms", ["missing"])]), /unknown roadmap segment/)
  assert.throws(() => sort([entry("atoms", [], "invalid strand")]), /Invalid strand/)
  assert.throws(() => sort([entry("root"), entry("atoms", ["root", "root"])]), /Repeated/)
  assert.throws(() => sort([entry("Folder/Atoms")]), /filename/)
})
test("rejects cycles, including disconnected cycles and self-dependencies", () => {
  assert.throws(() => sort([entry("root"), entry("a", ["b"]), entry("b", ["a"])]), /Circular.*a, b/)
  assert.throws(() => sort([entry("self", ["self"])]), /Circular/)
})
test("rejects duplicate IDs and conflicting aliases", () => {
  assert.throws(() => sort([entry("atoms"), entry("atoms")]), /Duplicate/)
  assert.throws(() => sort([entry("atoms", [], "physics", false, ["old"]), entry("old")]), /alias/)
  assert.throws(
    () => sort([entry("a", [], "physics", false, ["old"]), entry("b", [], "physics", false, ["old"])]),
    /alias/,
  )
})
test("published segments cannot depend on drafts", () => {
  assert.throws(() => sort([entry("draft", [], "physics", true), entry("atoms", ["draft"])]), /depends on draft/)
})
test("resolves descriptive slugs, old links and scoped heading links", () => {
  const segments = [{ id: "atomic-structure", aliases: ["am1"] }]
  assert.deepEqual(resolveRoadmapHash("#segment-AM1--references", segments), {
    id: "atomic-structure",
    hash: "#segment-atomic-structure--references",
  })
  assert.deepEqual(resolveRoadmapHash("#segment-atomic-structure", segments), {
    id: "atomic-structure",
    hash: "#segment-atomic-structure",
  })
  assert.equal(resolveRoadmapHash("#segment-missing", segments), undefined)
  assert.equal(resolveRoadmapHash("#%broken", segments), undefined)
})
test("preserves old checklist progress while migrating to slugs", () => {
  const segments = [{ id: "atomic-structure", aliases: ["am1"] }]
  assert.deepEqual(
    [
      ...migrateRoadmapProgress(
        [
          JSON.stringify(["AM1", "Hydrogen"]),
          JSON.stringify(["atomic-structure", "Hydrogen"]),
          JSON.stringify(["unavailable-segment", "Saved topic"]),
          "broken",
          null,
        ],
        segments,
      ),
    ],
    [JSON.stringify(["atomic-structure", "Hydrogen"]), JSON.stringify(["unavailable-segment", "Saved topic"])],
  )
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
  const path = "/project/content/roadmap/functions-and-vectors.mdx"
  rehypeRoadmapContent()(tree, { path, history: [path], data: {} })
  assert.equal(tree.children[0].properties.id, "segment-functions-and-vectors--what-to-study")
  assert.equal(tree.children[0].tagName, "h2")
  assert.equal(tree.children[1].properties.id, "segment-functions-and-vectors--energy")
  assert.equal(tree.children[2].properties.href, "#segment-functions-and-vectors--what-to-study")
  assert.equal(tree.children[3].properties.href, "#segment-functions-and-vectors--energy")
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

test("assigns colors by first strand appearance and cycles after pink", () => {
  const names = Array.from({ length: 11 }, (_, i) => `strand-${i}`)
  const strands = getRoadmapStrands([{ strand: names[0] }, ...names.map((strand) => ({ strand }))])
  assert.deepEqual(
    strands.map(({ id }) => id),
    names,
  )
  assert.deepEqual(
    strands.map(({ color }) => color),
    ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "purple", "pink", "red", "orange"].map(
      (name) => `var(--${name}-0)`,
    ),
  )
  assert.deepEqual(getRoadmapStrands([]), [])
})

test("maps modules to roadmap segments from module metadata", () => {
  const module = {
    id: "demo/index",
    filePath: "content/notes/demo/index.mdx",
    data: { roadmap: "vectors", draft: false },
  }
  const targets = [{ id: "vectors", data: { draft: false } }]
  assert.equal(mapRoadmapModules([module], targets).get("vectors"), module)
  assert.equal(mapRoadmapModules([{ ...module, data: { draft: false } }], targets).size, 0)
  assert.equal(mapRoadmapModules([{ ...module, data: { ...module.data, draft: true } }], targets).size, 0)
})

test("rejects duplicate module mappings, unknown targets, note mappings and published-to-draft links", () => {
  const module = {
    id: "demo/index",
    filePath: "content/notes/demo/index.mdx",
    data: { roadmap: "vectors", draft: false },
  }
  const targets = [{ id: "vectors", data: { draft: false } }]
  assert.throws(() => mapRoadmapModules([module, { ...module, id: "other/index" }], targets), /linked to both/)
  assert.throws(() => mapRoadmapModules([module], []), /unknown roadmap segment/)
  assert.throws(
    () => mapRoadmapModules([{ ...module, filePath: "content/notes/demo/note.mdx" }], targets),
    /module index/,
  )
  assert.throws(() => mapRoadmapModules([module], [{ id: "vectors", data: { draft: true } }]), /draft roadmap/)
})
