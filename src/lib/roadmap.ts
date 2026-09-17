import type { CollectionEntry } from "astro:content"
import { getCollection } from "astro:content"
import { mapRoadmapModules } from "./content"
import { getRoadmapStrands } from "./roadmap-strands"
import { getPublishedRoadmap, validateRoadmap } from "./roadmap-validation"

export type { RoadmapStrand } from "./roadmap-strands"

type RoadmapContentEntry = CollectionEntry<"roadmap">
export type RoadmapEntry = RoadmapContentEntry & {
  data: Extract<RoadmapContentEntry["data"], { overview: false }>
}
export type RoadmapOverviewEntry = RoadmapContentEntry & {
  data: Extract<RoadmapContentEntry["data"], { overview: true }>
}
export function isRoadmapSegment(entry: RoadmapContentEntry): entry is RoadmapEntry {
  return !entry.data.overview
}
export type RoadmapSegment = Omit<RoadmapEntry["data"], "draft" | "subject"> & {
  id: string
  subject: string
}

export async function getRoadmap() {
  const [all, learning] = await Promise.all([getCollection("roadmap"), getCollection("learning")])
  const segmentEntries = all.filter(isRoadmapSegment)
  const overviews = all.filter(
    (entry): entry is RoadmapOverviewEntry => entry.data.overview && Boolean(entry.data.title && entry.data.strand),
  )
  const overviewKeys = new Set<string>()
  const strandKeys = new Set(segmentEntries.map(({ data }) => `${data.domain}/${data.strand}`))
  for (const { data } of overviews) {
    const key = `${data.domain}/${data.strand}`
    if (overviewKeys.has(key)) throw new Error(`Duplicate roadmap overview for ${key}`)
    if (!strandKeys.has(key)) throw new Error(`Roadmap overview references unknown strand ${key}`)
    overviewKeys.add(key)
  }
  const modulesBySegment = mapRoadmapModules(learning, segmentEntries)
  const entries = getPublishedRoadmap(validateRoadmap(segmentEntries))
  const segments: RoadmapSegment[] = entries.map(({ id, data }) => {
    const { draft: _draft, ...metadata } = data
    return {
      ...metadata,
      id,
      strand: `${data.domain}/${data.strand}`,
      subject: data.subject ?? data.strand.replaceAll("-", " ").replace(/^./, (letter) => letter.toUpperCase()),
    }
  })
  const strands = getRoadmapStrands(segments)
  return {
    entries,
    segments,
    strands,
    overviews: overviews.filter(
      ({ data }) => !data.draft && strands.some((strand) => strand.id === `${data.domain}/${data.strand}`),
    ),
    modulesBySegment,
    segmentIds: new Set(segments.map((segment) => segment.id)),
  }
}
