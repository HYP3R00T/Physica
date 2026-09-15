import assert from "node:assert/strict"
import test from "node:test"
import { filterRoadmap } from "../src/lib/roadmap-domain.ts"
import { getRoadmapEdges, getRoadmapLayout } from "../src/lib/roadmap-geometry.ts"

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

test("same-strand siblings fork without passing through each other's nodes", () => {
  const segments = [
    { id: "energy", strand: "mechanics", dependencies: [] },
    { id: "circular", strand: "mechanics", dependencies: ["energy"] },
    { id: "collisions", strand: "mechanics", dependencies: ["energy"] },
    { id: "rotation", strand: "mechanics", dependencies: ["circular", "collisions"] },
  ]
  const { nodeX, laneCount, edges } = getRoadmapLayout(segments, [{ id: "mechanics" }])
  assert.equal(laneCount, 2)
  assert.notEqual(nodeX.get("circular"), nodeX.get("collisions"))
  assert.equal(nodeX.get("rotation"), nodeX.get("circular"))
  assert.equal(edges.find((edge) => edge.target === "collisions").d, "M 12 48 C 12 72, 27 72, 27 96 L 27 240")
  assert.equal(edges.find((edge) => edge.source === "collisions").d, "M 27 240 L 27 288 C 27 312, 12 312, 12 336")
  assert.ok(edges.every((edge) => edge.lane === "mechanics"))
})

test("independent roots stay separate while their paths are active", () => {
  const segments = [
    { id: "a", strand: "math", dependencies: [] },
    { id: "b", strand: "math", dependencies: [] },
    { id: "c", strand: "math", dependencies: ["a"] },
    { id: "d", strand: "math", dependencies: ["b"] },
    { id: "e", strand: "math", dependencies: [] },
  ]
  const layout = getRoadmapLayout(segments, [{ id: "math" }])
  assert.equal(layout.laneCount, 2)
  assert.notEqual(layout.nodeX.get("a"), layout.nodeX.get("b"))
  assert.equal(layout.nodeX.get("e"), layout.nodeX.get("a"))
})

test("filtered linear paths need only one lane and empty maps need none", () => {
  const strands = [{ id: "mechanics" }]
  const layout = getRoadmapLayout(
    [
      { id: "energy", strand: "mechanics", dependencies: [] },
      { id: "circular", strand: "mechanics", dependencies: ["energy"] },
    ],
    strands,
  )
  assert.equal(layout.laneCount, 1)
  assert.equal(getRoadmapLayout([], []).laneCount, 0)
})

test("a curated sequence stays in one lane while cross-strand prerequisites remain visible", () => {
  const segments = [
    { id: "math", domain: "mathematics", strand: "calculus", dependencies: [] },
    { id: "rotation", domain: "physics", strand: "mechanics", dependencies: [] },
    {
      id: "oscillations",
      domain: "physics",
      strand: "mechanics",
      follows: "rotation",
      dependencies: ["rotation", "math"],
    },
    { id: "gravity", domain: "physics", strand: "mechanics", follows: "oscillations", dependencies: ["rotation"] },
    { id: "lagrange", domain: "physics", strand: "mechanics", follows: "gravity", dependencies: ["rotation", "math"] },
    {
      id: "modes",
      domain: "physics",
      strand: "mechanics",
      follows: "lagrange",
      dependencies: ["oscillations", "lagrange"],
    },
  ]
  const strands = [{ id: "calculus" }, { id: "mechanics" }]
  const { nodeX, laneCount, edges } = getRoadmapLayout(segments, strands)
  assert.equal(laneCount, 2)
  assert.equal(new Set(segments.slice(1).map(({ id }) => nodeX.get(id))).size, 1)
  assert.ok(edges.some(({ source, target }) => source === "oscillations" && target === "gravity"))
  assert.ok(edges.some(({ source, target }) => source === "math" && target === "lagrange"))
  assert.ok(!edges.some(({ source, target }) => source === "rotation" && target === "gravity"))
  assert.deepEqual(segments[3].dependencies, ["rotation"])
  const physics = filterRoadmap(segments, "physics")
  assert.equal(getRoadmapLayout(physics, [{ id: "mechanics" }]).laneCount, 1)
})
