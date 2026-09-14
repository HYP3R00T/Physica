import { type RoadmapDomain, roadmapDomains } from "./roadmap-domain.ts"

type RoadmapValidationEntry = {
  id: string
  data: { domain: RoadmapDomain; strand: string; dependencies: string[]; draft: boolean }
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
    indegrees.set(id, data.dependencies.length)
    for (const dependency of data.dependencies) {
      const source = byId.get(dependency)
      if (!source) throw new Error(`${id} references unknown roadmap segment ${dependency}`)
      if (!data.draft && source.data.draft) throw new Error(`Published segment ${id} depends on draft ${dependency}`)
      outgoing.set(dependency, [...(outgoing.get(dependency) ?? []), id])
    }
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
