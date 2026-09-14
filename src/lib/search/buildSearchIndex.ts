import { getCollection } from "astro:content"
import type { LearningEntry } from "@/lib/content"
import { getModuleFolder, getModuleSlug, getNoteSlug, isModule, validateContent } from "@/lib/content"
import { getRoadmap } from "@/lib/roadmap"
import type { SearchIndex, SearchItem, SearchItemType } from "@/lib/search/types"

const searchableBody = (entry: LearningEntry) => {
  if (!("body" in entry) || typeof entry.body !== "string") return ""
  return entry.body.replace(/\s+/g, " ").trim()
}

const entryUrl = (entry: LearningEntry) => (isModule(entry) ? `/${getModuleSlug(entry)}` : `/${getNoteSlug(entry)}`)

const entryType = (entry: LearningEntry): SearchItemType => (isModule(entry) ? "module" : "note")

export async function buildSearchIndex(): Promise<SearchIndex> {
  const candidates = await getCollection("learning", ({ data }) => !import.meta.env.PROD || !data.draft)
  const modules = candidates.filter(isModule)
  const visibleFolders = new Set(modules.map(getModuleFolder))
  const entries = candidates.filter((entry) => isModule(entry) || visibleFolders.has(getModuleFolder(entry)))
  const modulesByFolder = new Map(modules.map((module) => [getModuleFolder(module), module]))

  validateContent(entries)

  const items: SearchItem[] = []

  for (const entry of entries) {
    const module = isModule(entry) ? entry : modulesByFolder.get(getModuleFolder(entry))
    if (!module) continue

    const type = entryType(entry)
    const url = entryUrl(entry)

    items.push({
      id: `${type}:${entry.id}`,
      type,
      url,
      title: entry.data.title,
      moduleTitle: module.data.title,
      description: entry.data.description,
      tags: entry.data.tags,
      body: searchableBody(entry),
    })
  }

  const posts = await getCollection("posts", ({ data }) => !data.draft)
  for (const post of posts) {
    const url = `/post/${post.id}`
    items.push({
      id: `article:${post.id}`,
      type: "article",
      url,
      title: post.data.title,
      moduleTitle: "Blogs",
      description: post.data.description,
      tags: post.data.tags,
      body: post.body?.replace(/\s+/g, " ").trim() ?? "",
    })
  }
  const { entries: roadmapEntries, segments } = await getRoadmap()
  const bodies = new Map(roadmapEntries.map(({ id, body }) => [id, body ?? ""]))
  for (const segment of segments) {
    items.push({
      id: `roadmap:${segment.id}`,
      type: "roadmap",
      url: `/roadmap#segment-${segment.id}`,
      title: segment.title,
      moduleTitle: segment.subject,
      description: segment.subject,
      tags: [segment.domain, segment.strand, segment.id],
      body: (bodies.get(segment.id) ?? "").replace(/\s+/g, " ").trim(),
    })
  }
  return { items }
}
