import type { CollectionEntry } from "astro:content"

export type LearningEntry = CollectionEntry<"learning">

const RESERVED_SLUGS = new Set(["404", "api", "assets", "_astro", "post", "components", "roadmap", "modules"])
const withoutExtension = (id: string) => id.replace(/\.(?:md|mdx)$/, "")
const pathParts = (entry: LearningEntry) => withoutExtension(entry.id).split("/")

export const isModule = (entry: LearningEntry) => /(?:^|\/)index\.(?:md|mdx)$/.test(entry.filePath ?? "")

export const getModuleFolder = (entry: LearningEntry) => pathParts(entry)[0]

export const getModuleSlug = (entry: LearningEntry) => getModuleFolder(entry)

export const getNoteSlug = (entry: LearningEntry) => {
  const filename = pathParts(entry).at(-1) ?? entry.id
  return filename.replace(/^\d+-/, "")
}

export const getNoteOrder = (entry: LearningEntry) => {
  const filename = pathParts(entry).at(-1) ?? ""
  const prefix = filename.match(/^(\d+)-/)?.[1]
  return prefix ? Number(prefix) : Number.POSITIVE_INFINITY
}

export const sortNotes = (notes: LearningEntry[]) =>
  [...notes].sort((left, right) => {
    const order = getNoteOrder(left) - getNoteOrder(right)
    return order || left.data.title.localeCompare(right.data.title)
  })

export const getModuleNotes = (entries: LearningEntry[], module: LearningEntry) => {
  const folder = getModuleFolder(module)
  return sortNotes(entries.filter((entry) => !isModule(entry) && getModuleFolder(entry) === folder))
}

export const validateContent = (entries: LearningEntry[]) => {
  const modules = entries.filter(isModule)
  const moduleFolders = new Set(modules.map(getModuleFolder))
  const publicSlugs = new Map<string, string>()

  for (const entry of entries) {
    if (!isModule(entry) && !moduleFolders.has(getModuleFolder(entry))) {
      throw new Error(`Note "${entry.id}" has no module index file.`)
    }

    if (!isModule(entry) && pathParts(entry).length !== 2) {
      throw new Error(`Note "${entry.id}" is nested too deeply. Notes must live directly inside a module folder.`)
    }

    const slug = isModule(entry) ? getModuleSlug(entry) : getNoteSlug(entry)
    if (RESERVED_SLUGS.has(slug)) {
      throw new Error(`The public slug "${slug}" is reserved and cannot be used by "${entry.id}".`)
    }
    const existing = publicSlugs.get(slug)
    if (existing) {
      throw new Error(`Duplicate public slug "${slug}" in "${existing}" and "${entry.id}".`)
    }
    publicSlugs.set(slug, entry.id)
  }

  const moduleSlugs = new Set(modules.map(getModuleSlug))
  for (const module of modules) {
    for (const related of module.data.related) {
      if (!moduleSlugs.has(related)) {
        throw new Error(`Module "${module.id}" references unknown module "${related}".`)
      }
    }
  }
}

export function mapRoadmapModules(entries: LearningEntry[], segments: { id: string; data: { draft: boolean } }[]) {
  const bySegment = new Map<string, LearningEntry>()
  const targets = new Map(segments.map((segment) => [segment.id, segment]))
  for (const entry of entries) {
    const target = entry.data.roadmap
    if (!target) continue
    if (!isModule(entry)) throw new Error(`Set roadmap on the module index, not the note "${entry.id}".`)
    const segment = targets.get(target)
    if (!segment) throw new Error(`Module "${entry.id}" references unknown roadmap segment "${target}".`)
    if (!entry.data.draft && segment.data.draft)
      throw new Error(`Published module "${entry.id}" references draft roadmap segment "${target}".`)
    const existing = bySegment.get(target)
    if (existing) throw new Error(`Roadmap segment "${target}" is linked to both "${existing.id}" and "${entry.id}".`)
    bySegment.set(target, entry)
  }
  return new Map([...bySegment].filter(([, module]) => !module.data.draft))
}
