import assert from "node:assert/strict"
import { test } from "node:test"
import { advanceOrbit, gravityAt, initialOrbitState, PRIMARY_SOURCE, referenceOrbitPath } from "../src/lib/orbit.ts"

test("gravity follows the inverse-square law and adds across sources", () => {
  const left = { x: 0, y: 0, mu: 1_000, softening: 0 }
  const right = { x: 200, y: 0, mu: 1_000, softening: 0 }
  assert.equal(gravityAt({ x: 100, y: 0 }, [left]).x, -0.1)
  assert.equal(gravityAt({ x: 100, y: 0 }, [left, right]).x, 0)
})

test("an unperturbed orbit conserves energy over a full circuit", () => {
  let state = initialOrbitState()
  const energy = ({ position, velocity }) => {
    const radius = Math.hypot(position.x - PRIMARY_SOURCE.x, position.y - PRIMARY_SOURCE.y)
    return (velocity.x ** 2 + velocity.y ** 2) / 2 - PRIMARY_SOURCE.mu / Math.hypot(radius, PRIMARY_SOURCE.softening)
  }
  const startingEnergy = energy(state)
  for (let index = 0; index < 1_500; index++) state = advanceOrbit(state, 1 / 120, [PRIMARY_SOURCE])
  assert.ok(Math.abs((energy(state) - startingEnergy) / startingEnergy) < 0.001)
  assert.ok(referenceOrbitPath().startsWith("M "))
})

test("a temporary second mass changes the subsequent orbit", () => {
  let baseline = initialOrbitState()
  let perturbed = initialOrbitState()
  const pointer = { x: 370, y: 120, mu: 190_000, softening: 42 }
  for (let index = 0; index < 240; index++) {
    baseline = advanceOrbit(baseline, 1 / 120, [PRIMARY_SOURCE])
    perturbed = advanceOrbit(perturbed, 1 / 120, [PRIMARY_SOURCE, pointer])
  }
  for (let index = 0; index < 240; index++) {
    baseline = advanceOrbit(baseline, 1 / 120, [PRIMARY_SOURCE])
    perturbed = advanceOrbit(perturbed, 1 / 120, [PRIMARY_SOURCE])
  }
  assert.ok(Math.hypot(perturbed.position.x - baseline.position.x, perturbed.position.y - baseline.position.y) > 10)
})
