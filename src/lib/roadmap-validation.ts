type RoadmapValidationEntry = {
  id: string
  data: { segment: string; order: number; dependencies: string[]; draft: boolean }
}

export function validateRoadmap(entries: RoadmapValidationEntry[]) {
  const ids = new Set<string>()
  const orders = new Set<number>()
  const published = new Set(entries.filter((entry) => !entry.data.draft).map((entry) => entry.data.segment))
  const byId = new Map(entries.map((entry) => [entry.data.segment, entry]))
  for (const entry of entries) {
    const { segment, order, dependencies, draft } = entry.data
    if (ids.has(segment)) throw new Error(`Duplicate roadmap segment: ${segment}`)
    if (orders.has(order)) throw new Error(`Duplicate roadmap order ${order} in ${segment}`)
    if (entry.id.replace(/\.(md|mdx)$/, "") !== segment.toLowerCase()) {
      throw new Error(`Roadmap ${segment} must use the filename ${segment.toLowerCase()}.md or .mdx`)
    }
    if (new Set(dependencies).size !== dependencies.length) throw new Error(`Repeated dependency in ${segment}`)
    ids.add(segment)
    orders.add(order)
    for (const dependency of dependencies) {
      const source = byId.get(dependency)
      if (!source) throw new Error(`${segment} references unknown roadmap segment ${dependency}`)
      if (source.data.order >= order) throw new Error(`${segment} requires an earlier segment: ${dependency}`)
      if (!draft && !published.has(dependency))
        throw new Error(`Published segment ${segment} depends on draft ${dependency}`)
    }
  }
}
