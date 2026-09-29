export interface Point {
  x: number
  y: number
}

export interface OrbitState {
  position: Point
  velocity: Point
}

export interface GravitySource extends Point {
  mu: number
  softening: number
}

export const ORBIT_CENTER: Point = { x: 250, y: 250 }
export const PRIMARY_MU = 1_350_000
export const POINTER_MU = 190_000
export const PRIMARY_SOURCE: GravitySource = { ...ORBIT_CENTER, mu: PRIMARY_MU, softening: 14 }

const apoapsis = 220
const eccentricity = 0.28
const orientation = (-28 * Math.PI) / 180

export function initialOrbitState(): OrbitState {
  const speed = Math.sqrt(PRIMARY_MU / apoapsis) * Math.sqrt(1 - eccentricity)
  return {
    position: {
      x: ORBIT_CENTER.x + apoapsis * Math.cos(orientation),
      y: ORBIT_CENTER.y + apoapsis * Math.sin(orientation),
    },
    velocity: {
      x: -speed * Math.sin(orientation),
      y: speed * Math.cos(orientation),
    },
  }
}

export function gravityAt(position: Point, sources: readonly GravitySource[]): Point {
  let x = 0
  let y = 0
  for (const source of sources) {
    const dx = source.x - position.x
    const dy = source.y - position.y
    const distanceSquared = dx * dx + dy * dy + source.softening * source.softening
    const scale = source.mu / (distanceSquared * Math.sqrt(distanceSquared))
    x += dx * scale
    y += dy * scale
  }
  return { x, y }
}

export function advanceOrbit(state: OrbitState, seconds: number, sources: readonly GravitySource[]): OrbitState {
  const before = gravityAt(state.position, sources)
  const position = {
    x: state.position.x + state.velocity.x * seconds + (before.x * seconds * seconds) / 2,
    y: state.position.y + state.velocity.y * seconds + (before.y * seconds * seconds) / 2,
  }
  const after = gravityAt(position, sources)
  return {
    position,
    velocity: {
      x: state.velocity.x + ((before.x + after.x) * seconds) / 2,
      y: state.velocity.y + ((before.y + after.y) * seconds) / 2,
    },
  }
}

export function referenceOrbitPath(): string {
  const semimajorAxis = apoapsis / (1 + eccentricity)
  const period = 2 * Math.PI * Math.sqrt(semimajorAxis ** 3 / PRIMARY_MU)
  const samples = 420
  let state = initialOrbitState()
  const points: string[] = []
  for (let index = 0; index < samples; index++) {
    points.push(`${index ? "L" : "M"} ${state.position.x.toFixed(2)} ${state.position.y.toFixed(2)}`)
    state = advanceOrbit(state, period / samples, [PRIMARY_SOURCE])
  }
  return `${points.join(" ")} Z`
}
