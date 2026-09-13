import assert from "node:assert/strict"
import test from "node:test"
import { getRoadmapEdges } from "../src/lib/roadmap-geometry.ts"

test("curves retain source lanes through branching and merging", () => {
  const segments = [
    { id: "a", strand: "math", dependencies: [] },
    { id: "b", strand: "math", dependencies: ["a"] },
    { id: "c", strand: "physics", dependencies: ["a", "b"] },
  ]
  const edges = getRoadmapEdges(segments, [{ id: "math" }, { id: "physics" }])
  assert.deepEqual(edges, [
    { source: "a", target: "b", lane: "math", d: "M 12 48 L 12 96 C 12 120, 12 120, 12 144" },
    { source: "a", target: "c", lane: "math", d: "M 12 48 L 12 192 C 12 216, 27 216, 27 240" },
    { source: "b", target: "c", lane: "math", d: "M 12 144 L 12 192 C 12 216, 27 216, 27 240" },
  ])
})

test("invalid dependencies cannot produce a broken curve", () => {
  assert.throws(
    () => getRoadmapEdges([{ id: "a", strand: "math", dependencies: ["missing"] }], [{ id: "math" }]),
    /Unknown roadmap dependency/,
  )
})
