import type { CollectionEntry } from "astro:content"
import { getCollection } from "astro:content"
import { validateRoadmap } from "./roadmap-validation"

export type RoadmapEntry = CollectionEntry<"roadmap">
export type RoadmapSegment = Omit<RoadmapEntry["data"], "segment" | "draft"> & {
  id: string
  searchText: string
}

export async function getRoadmap() {
  const all = await getCollection("roadmap")
  validateRoadmap(all)
  const entries = all.filter((entry) => !entry.data.draft).sort((a, b) => a.data.order - b.data.order)
  const segments: RoadmapSegment[] = entries.map(({ data, body }) => {
    const { segment, draft: _draft, ...metadata } = data
    return { ...metadata, id: segment, searchText: body ?? "" }
  })
  return { entries, segments, segmentIds: new Set(segments.map((segment) => segment.id)) }
}
