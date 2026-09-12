import type { CollectionEntry } from "astro:content"
import { getCollection } from "astro:content"
import { getRoadmapStrands } from "./roadmap-strands"
import { validateRoadmap } from "./roadmap-validation"

export type { RoadmapStrand } from "./roadmap-strands"

export type RoadmapEntry = CollectionEntry<"roadmap">
export type RoadmapSegment = Omit<RoadmapEntry["data"], "draft" | "subject"> & {
  id: string
  subject: string
}

export async function getRoadmap() {
  const all = await getCollection("roadmap")
  const entries = validateRoadmap(all).filter((entry) => !entry.data.draft)
  const segments: RoadmapSegment[] = entries.map(({ id, data }) => {
    const { draft: _draft, ...metadata } = data
    return {
      ...metadata,
      id,
      subject: data.subject ?? data.strand.replaceAll("-", " ").replace(/^./, (letter) => letter.toUpperCase()),
    }
  })
  const strands = getRoadmapStrands(segments)
  return { entries, segments, strands, segmentIds: new Set(segments.map((segment) => segment.id)) }
}
