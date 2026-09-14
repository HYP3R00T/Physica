export const roadmapDomains = ["mathematics", "physics"] as const
export type RoadmapDomain = (typeof roadmapDomains)[number]
export type RoadmapFilter = "all" | RoadmapDomain

export function roadmapFileIdentity(path: string): { id: string; domain: RoadmapDomain } {
  const match = path.replaceAll("\\", "/").match(/^(mathematics|physics)\/([a-z0-9]+(?:-[a-z0-9]+)*)\.mdx?$/)
  if (!match) throw new Error(`Invalid roadmap path: ${path}. Use mathematics/<slug>.mdx or physics/<slug>.mdx.`)
  return { id: match[2], domain: match[1] as RoadmapDomain }
}

// Filter only the graph. The original segments retain every prerequisite for the detail panel.
export function filterRoadmap<T extends { id: string; domain: RoadmapDomain; dependencies: string[] }>(
  segments: T[],
  filter: RoadmapFilter,
): T[] {
  const visible = segments.filter((segment) => filter === "all" || segment.domain === filter)
  const ids = new Set(visible.map((segment) => segment.id))
  return visible.map((segment) => ({ ...segment, dependencies: segment.dependencies.filter((id) => ids.has(id)) }))
}
