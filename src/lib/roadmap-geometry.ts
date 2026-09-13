import type { RoadmapSegment, RoadmapStrand } from "./roadmap"

export const ROADMAP_ROW_HEIGHT = 96
export interface RoadmapEdge {
  source: string
  target: string
  lane: string
  d: string
}

/** Calculate fixed curves for reuse; selection only changes their paint groups. */
export function getRoadmapEdges(segments: RoadmapSegment[], strands: RoadmapStrand[]): RoadmapEdge[] {
  const lanes = new Map(strands.map((strand, index) => [strand.id, index]))
  const positions = new Map(segments.map((segment, index) => [segment.id, { segment, index }]))
  return segments.flatMap((target, index) =>
    target.dependencies.map((source) => {
      const origin = positions.get(source)
      if (!origin) throw new Error(`Unknown roadmap dependency: ${source}`)
      const sourceLane = lanes.get(origin.segment.strand)
      const targetLane = lanes.get(target.strand)
      if (sourceLane === undefined || targetLane === undefined) throw new Error("Unknown roadmap strand")
      const x1 = 12 + sourceLane * 15
      const x2 = 12 + targetLane * 15
      const y1 = origin.index * ROADMAP_ROW_HEIGHT + ROADMAP_ROW_HEIGHT / 2
      const y2 = index * ROADMAP_ROW_HEIGHT + ROADMAP_ROW_HEIGHT / 2
      const bend = Math.min(48, (y2 - y1) / 2)
      return {
        source,
        target: target.id,
        lane: origin.segment.strand,
        d: `M ${x1} ${y1} L ${x1} ${y2 - bend} C ${x1} ${y2 - bend / 2}, ${x2} ${y2 - bend / 2}, ${x2} ${y2}`,
      }
    }),
  )
}
