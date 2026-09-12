import type { CollectionEntry } from "astro:content"
import { getCollection } from "astro:content"
import { mapRoadmapModules } from "./content"
import { getRoadmapStrands } from "./roadmap-strands"
import { validateRoadmap } from "./roadmap-validation"

export type { RoadmapStrand } from "./roadmap-strands"

export type RoadmapEntry = CollectionEntry<"roadmap">
export type RoadmapSegment = Omit<RoadmapEntry["data"], "draft" | "subject"> & {
  id: string
  subject: string
}

export async function getRoadmap() {
  const [all, learning] = await Promise.all([getCollection("roadmap"), getCollection("learning")])
  const modulesBySegment = mapRoadmapModules(learning, all)
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
  return { entries, segments, strands, modulesBySegment, segmentIds: new Set(segments.map((segment) => segment.id)) }
}
