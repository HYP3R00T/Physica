import { type RoadmapDomain, roadmapDomains } from "./roadmap-domain.ts"

type RoadmapValidationEntry = {
  id: string
  data: { domain: RoadmapDomain; strand: string; dependencies: string[]; follows?: string; draft: boolean }
}

const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// Breadth-first topological ordering keeps parallel branches at comparable depth.
// Slugs break ties, so filesystem order never changes the resulting route.
export function validateRoadmap<T extends RoadmapValidationEntry>(entries: T[]): T[] {
  const byId = new Map<string, T>()
  for (const entry of entries) {
    if (!slug.test(entry.id)) throw new Error(`Invalid roadmap filename: ${entry.id}`)
    if (byId.has(entry.id)) throw new Error(`Duplicate roadmap segment: ${entry.id}`)
    byId.set(entry.id, entry)
    if (!roadmapDomains.includes(entry.data.domain)) throw new Error(`Invalid roadmap domain in ${entry.id}`)
    if (!slug.test(entry.data.strand)) throw new Error(`Invalid strand in ${entry.id}: ${entry.data.strand}`)
  }
  const indegrees = new Map<string, number>()
  const outgoing = new Map<string, string[]>()
  for (const { id, data } of entries) {
    if (new Set(data.dependencies).size !== data.dependencies.length) throw new Error(`Repeated dependency in ${id}`)
    for (const dependency of data.dependencies) {
      const source = byId.get(dependency)
      if (!source) throw new Error(`${id} references unknown roadmap segment ${dependency}`)
      if (!data.draft && source.data.draft) throw new Error(`Published segment ${id} depends on draft ${dependency}`)
    }
    if (data.follows !== undefined) {
      const previous = byId.get(data.follows)
      if (!previous) throw new Error(`${id} follows unknown roadmap segment ${data.follows}`)
      if (previous.data.domain !== data.domain || previous.data.strand !== data.strand)
        throw new Error(`${id} must follow a segment in the same domain and strand`)
    }
    const predecessors = new Set([...data.dependencies, ...(data.follows ? [data.follows] : [])])
    indegrees.set(id, predecessors.size)
    for (const predecessor of predecessors) outgoing.set(predecessor, [...(outgoing.get(predecessor) ?? []), id])
  }
  const result: T[] = []
  let ready = entries.filter(({ id }) => indegrees.get(id) === 0).map(({ id }) => id)
  while (ready.length) {
    const next: string[] = []
    for (const id of ready.sort()) {
      const entry = byId.get(id)
      if (entry) result.push(entry)
      for (const target of outgoing.get(id) ?? []) {
        const remaining = (indegrees.get(target) ?? 0) - 1
        indegrees.set(target, remaining)
        if (remaining === 0) next.push(target)
      }
    }
    ready = next
  }
  if (result.length !== entries.length) {
    const unresolved = entries
      .filter(({ id }) => (indegrees.get(id) ?? 0) > 0)
      .map(({ id }) => id)
      .sort()
    throw new Error(`Circular roadmap dependencies block: ${unresolved.join(", ")}`)
  }
  return result
}

/** Skip unpublished reading steps without changing genuine prerequisites. Input must be validated. */
export function getPublishedRoadmap<T extends RoadmapValidationEntry>(entries: T[]): T[] {
  const byId = new Map(entries.map((entry) => [entry.id, entry]))
  return entries
    .filter(({ data }) => !data.draft)
    .map((entry) => {
      if (!entry.data.follows) return entry
      let follows: string | undefined = entry.data.follows
      while (follows && byId.get(follows)?.data.draft) follows = byId.get(follows)?.data.follows
      return { ...entry, data: { ...entry.data, follows } }
    })
}
