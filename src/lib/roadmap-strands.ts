const colors = ["red", "orange", "yellow", "green", "teal", "cyan", "blue", "purple", "pink"]

export type RoadmapStrand = { id: string; color: string }

export function getRoadmapStrands(segments: { strand: string }[]): RoadmapStrand[] {
  return [...new Set(segments.map(({ strand }) => strand))].map((id, index) => ({
    id,
    color: `var(--${colors[index % colors.length]}-0)`,
  }))
}
