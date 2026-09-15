import type { RoadmapSegment, RoadmapStrand } from "./roadmap"

export const ROADMAP_ROW_HEIGHT = 96
export interface RoadmapEdge {
  source: string
  target: string
  lane: string
  d: string
}

function requireValue<T>(value: T | undefined): T {
  if (value === undefined) throw new Error("Incomplete roadmap layout")
  return value
}

/** Allocate independent paths within each subject strand before drawing edges. */
export function getRoadmapLayout(segments: RoadmapSegment[], strands: RoadmapStrand[]) {
  const positions = new Map(segments.map((segment, index) => [segment.id, { segment, index }]))
  const strandIds = new Set(strands.map(({ id }) => id))
  // A curated reading step replaces same-strand prerequisite strokes, not the prerequisites themselves.
  const graphParents = new Map(
    segments.map((segment) => [
      segment.id,
      segment.follows
        ? [
            ...new Set([
              segment.follows,
              ...segment.dependencies.filter((id) => positions.get(id)?.segment.strand !== segment.strand),
            ]),
          ]
        : segment.dependencies,
    ]),
  )
  const tracks: { strand: string; tail: string; start: number; end: number; lane: number }[] = []
  const trackById = new Map<string, number>()

  for (const [index, segment] of segments.entries()) {
    if (!strandIds.has(segment.strand)) throw new Error("Unknown roadmap strand")
    const parents = requireValue(graphParents.get(segment.id)).map((id) => {
      const parent = positions.get(id)
      if (!parent) throw new Error(`Unknown roadmap dependency: ${id}`)
      if (parent.index >= index) throw new Error("Roadmap dependencies must precede their dependents")
      return parent
    })
    const sameStrand = parents.filter(({ segment: parent }) => parent.strand === segment.strand)
    const continuation = sameStrand.find(({ segment: parent }) => {
      const track = trackById.get(parent.id)
      return track !== undefined && tracks[track]?.tail === parent.id
    })
    let trackIndex = continuation ? trackById.get(continuation.segment.id) : undefined
    if (trackIndex === undefined) {
      trackIndex = tracks.length
      tracks.push({
        strand: segment.strand,
        tail: segment.id,
        start: Math.min(index, ...sameStrand.map((parent) => parent.index)),
        end: index,
        lane: 0,
      })
    }
    const track = requireValue(tracks[trackIndex])
    track.tail = segment.id
    track.end = Math.max(track.end, index)
    trackById.set(segment.id, trackIndex)
    for (const parent of parents) {
      const parentTrack = requireValue(tracks[requireValue(trackById.get(parent.segment.id))])
      parentTrack.end = Math.max(parentTrack.end, index)
    }
  }

  let laneCount = 0
  for (const strand of strands) {
    const ends: number[] = []
    const paths = tracks.filter((track) => track.strand === strand.id).sort((a, b) => a.start - b.start)
    for (const track of paths) {
      let lane = ends.findIndex((end) => end < track.start)
      if (lane < 0) lane = ends.length
      ends[lane] = track.end
      track.lane = laneCount + lane
    }
    laneCount += ends.length
  }

  const nodeX = new Map(
    segments.map((segment) => [
      segment.id,
      12 + requireValue(tracks[requireValue(trackById.get(segment.id))]).lane * 15,
    ]),
  )
  const edges = segments.flatMap((target, index) =>
    requireValue(graphParents.get(target.id)).map((source) => {
      const origin = requireValue(positions.get(source))
      const x1 = requireValue(nodeX.get(source))
      const x2 = requireValue(nodeX.get(target.id))
      const y1 = origin.index * ROADMAP_ROW_HEIGHT + ROADMAP_ROW_HEIGHT / 2
      const y2 = index * ROADMAP_ROW_HEIGHT + ROADMAP_ROW_HEIGHT / 2
      const bend = Math.min(48, (y2 - y1) / 2)
      // A same-strand fork leaves its parent immediately, avoiding intervening sibling nodes.
      const fork =
        origin.segment.strand === target.strand &&
        x1 !== x2 &&
        requireValue(tracks[requireValue(trackById.get(target.id))]).start >= origin.index
      const d = fork
        ? `M ${x1} ${y1} C ${x1} ${y1 + bend / 2}, ${x2} ${y1 + bend / 2}, ${x2} ${y1 + bend} L ${x2} ${y2}`
        : `M ${x1} ${y1} L ${x1} ${y2 - bend} C ${x1} ${y2 - bend / 2}, ${x2} ${y2 - bend / 2}, ${x2} ${y2}`
      return { source, target: target.id, lane: origin.segment.strand, d }
    }),
  )
  return { nodeX, laneCount, edges }
}

/** Calculate fixed curves for reuse; selection only changes their paint groups. */
export function getRoadmapEdges(segments: RoadmapSegment[], strands: RoadmapStrand[]): RoadmapEdge[] {
  return getRoadmapLayout(segments, strands).edges
}
