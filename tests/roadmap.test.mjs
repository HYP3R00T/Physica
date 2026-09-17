import assert from "node:assert/strict"
import { test } from "node:test"
import { mapRoadmapModules } from "../src/lib/content.ts"
import rehypeRoadmapContent from "../src/lib/rehype-roadmap-content.mjs"
import { filterRoadmap, roadmapFileIdentity } from "../src/lib/roadmap-domain.ts"
import { getRoadmapEdges } from "../src/lib/roadmap-geometry.ts"
import { readRoadmapProgress, resolveRoadmapHash } from "../src/lib/roadmap-identity.ts"
import { getRoadmapStrands } from "../src/lib/roadmap-strands.ts"
import { getPublishedRoadmap, validateRoadmap } from "../src/lib/roadmap-validation.ts"

const entry = (id, dependencies = [], strand = "physics", draft = false) => ({
  id,
  data: { domain: "physics", strand, dependencies, draft },
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
test("rejects duplicate IDs", () => {
  assert.throws(() => sort([entry("atoms"), entry("atoms")]), /Duplicate/)
})
test("published segments cannot depend on drafts", () => {
  assert.throws(() => sort([entry("draft", [], "physics", true), entry("atoms", ["draft"])]), /depends on draft/)
})
test("resolves current slugs and scoped heading links", () => {
  const segments = [{ id: "atomic-structure" }]
  assert.deepEqual(resolveRoadmapHash("#segment-atomic-structure--references", segments), {
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
test("reads saved checklist keys and ignores malformed values", () => {
  assert.deepEqual(
    [
      ...readRoadmapProgress([
        JSON.stringify(["atomic-structure", "Hydrogen"]),
        JSON.stringify(["unavailable-segment", "Saved topic"]),
        "broken",
        null,
      ]),
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
      {
        type: "element",
        tagName: "a",
        properties: { href: "/roadmap#segment-differential-calculus" },
        children: [],
      },
    ],
  }
  const path = "/project/content/roadmap/mathematics/functions-and-vectors.mdx"
  rehypeRoadmapContent()(tree, { path, history: [path], data: {} })
  assert.equal(tree.children[0].properties.id, "segment-functions-and-vectors--what-to-study")
  assert.equal(tree.children[0].tagName, "h2")
  assert.equal(tree.children[1].properties.id, "segment-functions-and-vectors--energy")
  assert.equal(tree.children[2].properties.href, "#segment-functions-and-vectors--what-to-study")
  assert.equal(tree.children[3].properties.href, "#segment-functions-and-vectors--energy")
  assert.equal(tree.children[4].properties.href, "/roadmap#segment-differential-calculus")
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

test("derives domains from folders while keeping slugs stable", () => {
  assert.deepEqual(roadmapFileIdentity("mathematics/vectors.mdx"), { id: "vectors", domain: "mathematics" })
  assert.deepEqual(roadmapFileIdentity("physics/vectors.md"), { id: "vectors", domain: "physics" })
  assert.equal(roadmapFileIdentity("mathematics\\vectors.mdx").id, "vectors")
  for (const path of ["vectors.mdx", "chemistry/vectors.mdx", "physics/nested/vectors.mdx", "physics/Bad Name.mdx"])
    assert.throws(() => roadmapFileIdentity(path), /Invalid roadmap path/)
  assert.throws(
    () => validateRoadmap([{ ...entry("bad"), data: { ...entry("bad").data, domain: "chemistry" } }]),
    /Invalid roadmap domain/,
  )
  assert.throws(
    () =>
      validateRoadmap([entry("same"), { ...entry("same"), data: { ...entry("same").data, domain: "mathematics" } }]),
    /Duplicate IDs|Duplicate roadmap/,
  )
})

test("domain filtering removes hidden edges without bridging or mutating prerequisites", () => {
  const segments = [
    { id: "math", domain: "mathematics", strand: "algebra", dependencies: [] },
    { id: "physics", domain: "physics", strand: "mechanics", dependencies: ["math"] },
    { id: "more-math", domain: "mathematics", strand: "algebra", dependencies: ["physics"] },
    { id: "last-math", domain: "mathematics", strand: "algebra", dependencies: ["math", "more-math"] },
  ]
  const view = filterRoadmap(segments, "mathematics")
  assert.deepEqual(
    view.map(({ id }) => id),
    ["math", "more-math", "last-math"],
  )
  assert.deepEqual(view[1].dependencies, [])
  assert.deepEqual(segments[2].dependencies, ["physics"])
  const edges = getRoadmapEdges(view, getRoadmapStrands(view))
  assert.deepEqual(
    edges.map(({ source, target }) => [source, target]),
    [
      ["math", "last-math"],
      ["more-math", "last-math"],
    ],
  )
  assert.deepEqual(filterRoadmap(segments, "all"), segments)
  assert.deepEqual(filterRoadmap(segments.slice(0, 1), "physics"), [])
})

test("reading succession orders independent topics without adding prerequisites", () => {
  const a = entry("root")
  const b = entry("z-first", ["root"])
  const c = entry("a-next", ["root"])
  c.data.follows = "z-first"
  assert.deepEqual(sort([c, b, a]), ["root", "z-first", "a-next"])
  assert.deepEqual(c.data.dependencies, ["root"])
  b.data.follows = "root"
  assert.deepEqual(sort([c, b, a]), ["root", "z-first", "a-next"])
})

test("reading succession rejects unknown, cross-strand and conflicting links", () => {
  const a = entry("a")
  a.data.follows = "missing"
  assert.throws(() => sort([a]), /follows unknown/)
  a.data.follows = "b"
  assert.throws(() => sort([a, entry("b", [], "different")]), /same domain and strand/)
  const otherDomain = entry("b")
  otherDomain.data.domain = "mathematics"
  assert.throws(() => sort([a, otherDomain]), /same domain and strand/)
  assert.throws(() => sort([a, entry("b", ["a"])]), /Circular/)
  a.data.follows = "a"
  assert.throws(() => sort([a]), /Circular/)
})

test("hidden reading steps are skipped without hiding independent published topics", () => {
  const a = entry("a")
  const b = entry("b", [], "physics", true)
  b.data.follows = "a"
  const c = entry("c", [], "physics", true)
  c.data.follows = "b"
  const d = entry("d", ["a"])
  d.data.follows = "c"
  const visible = getPublishedRoadmap(validateRoadmap([d, c, b, a]))
  assert.deepEqual(
    visible.map(({ id }) => id),
    ["a", "d"],
  )
  assert.equal(visible[1].data.follows, "a")
  assert.deepEqual(visible[1].data.dependencies, ["a"])
  assert.equal(d.data.follows, "c")
  a.data.draft = true
  d.data.dependencies = []
  assert.equal(getPublishedRoadmap(validateRoadmap([a, b, c, d]))[0].data.follows, undefined)
})

test("strand focus includes only direct prerequisites and excludes their ancestors", () => {
  const segments = [
    { id: "math", domain: "mathematics", strand: "mathematics/algebra", dependencies: [] },
    { id: "unrelated", domain: "physics", strand: "physics/mechanics", dependencies: [] },
    { id: "base", domain: "physics", strand: "physics/mechanics", dependencies: ["math"], follows: "unrelated" },
    { id: "em", domain: "physics", strand: "physics/electromagnetism", dependencies: ["base"] },
    { id: "em-next", domain: "physics", strand: "physics/electromagnetism", dependencies: ["em"], follows: "em" },
    { id: "optics", domain: "physics", strand: "physics/optics", dependencies: ["em"] },
  ]
  const original = structuredClone(segments)
  const view = filterRoadmap(segments, "physics", "physics/electromagnetism")
  assert.deepEqual(
    view.map(({ id }) => id),
    ["base", "em", "em-next"],
  )
  assert.equal(view[0].follows, undefined)
  assert.equal(view[2].follows, "em")
  assert.deepEqual(view[0].dependencies, [])
  assert.deepEqual(view[1].dependencies, ["base"])
  assert.deepEqual(segments, original)
  assert.deepEqual(filterRoadmap(segments, "all", "physics/missing"), [])
  assert.equal(filterRoadmap(segments, "all").length, segments.length)
})

test("strand focus handles shared prerequisites and distinguishes domain-qualified strands", () => {
  const segments = [
    { id: "math", domain: "mathematics", strand: "mathematics/shared", dependencies: [] },
    { id: "a", domain: "physics", strand: "physics/shared", dependencies: ["math"] },
    { id: "b", domain: "physics", strand: "physics/shared", dependencies: ["math", "a"] },
  ]
  assert.deepEqual(
    filterRoadmap(segments, "all", "mathematics/shared").map(({ id }) => id),
    ["math"],
  )
  assert.deepEqual(
    filterRoadmap(segments, "all", "physics/shared").map(({ id }) => id),
    ["math", "a", "b"],
  )
})

test("domain and strand filters intersect independently, including mathematics for a physics strand", () => {
  const segments = [
    { id: "earlier", domain: "mathematics", strand: "mathematics/algebra", dependencies: [] },
    { id: "math", domain: "mathematics", strand: "mathematics/calculus", dependencies: ["earlier"] },
    { id: "mechanics", domain: "physics", strand: "physics/mechanics", dependencies: ["math"] },
    { id: "other", domain: "physics", strand: "physics/optics", dependencies: [] },
  ]
  const original = structuredClone(segments)
  const ids = (domain, strand) => filterRoadmap(segments, domain, strand).map(({ id }) => id)
  assert.deepEqual(ids("all", "physics/mechanics"), ["math", "mechanics"])
  assert.deepEqual(ids("physics", "physics/mechanics"), ["mechanics"])
  assert.deepEqual(ids("mathematics", "physics/mechanics"), ["math"])
  assert.deepEqual(ids("all", "physics/mechanics"), ["math", "mechanics"])
  assert.deepEqual(ids("physics", ""), ["mechanics", "other"])
  assert.deepEqual(ids("mathematics", "physics/optics"), [])
  assert.deepEqual(filterRoadmap(segments, "physics", "physics/mechanics")[0].dependencies, [])
  assert.deepEqual(segments, original)
})
