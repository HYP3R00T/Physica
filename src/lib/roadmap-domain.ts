export const roadmapDomains = ["mathematics", "physics"] as const
export type RoadmapDomain = (typeof roadmapDomains)[number]
export type RoadmapFilter = "all" | RoadmapDomain

export function roadmapFileIdentity(path: string): { id: string; domain: RoadmapDomain } {
  const match = path
    .replaceAll("\\", "/")
    .match(/^(mathematics|physics)\/(?:[^/]+\/)*([a-z0-9]+(?:-[a-z0-9]+)*)\.mdx?$/)
  if (!match)
    throw new Error(
      `Invalid roadmap path: ${path}. Use a Markdown file with a slug filename under mathematics/ or physics/.`,
    )
  return { id: match[2], domain: match[1] as RoadmapDomain }
}

// Filter only the graph. The original segments retain every prerequisite for the detail panel.
export function filterRoadmap<
  T extends { id: string; domain: RoadmapDomain; dependencies: string[]; strand?: string; follows?: string },
>(segments: T[], filter: RoadmapFilter, strand = ""): T[] {
  const required = new Set<string>()
  if (strand) {
    for (const segment of segments) {
      if (segment.strand !== strand) continue
      required.add(segment.id)
      for (const id of segment.dependencies) required.add(id)
    }
  }
  const visible = segments.filter(
    (segment) => (!strand || required.has(segment.id)) && (filter === "all" || segment.domain === filter),
  )
  const ids = new Set(visible.map((segment) => segment.id))
  return visible.map((segment) => {
    const copy = { ...segment, dependencies: segment.dependencies.filter((id) => ids.has(id)) }
    if (copy.follows && !ids.has(copy.follows)) delete copy.follows
    return copy
  })
}
