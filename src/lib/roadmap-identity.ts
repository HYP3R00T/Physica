type Identity = { id: string }

export function resolveRoadmapHash(hash: string, segments: Identity[]) {
  let decoded: string
  try {
    decoded = decodeURIComponent(hash)
  } catch {
    return undefined
  }
  const match = decoded.match(/^#segment-([a-z0-9]+(?:-[a-z0-9]+)*)(--.*)?$/i)
  if (!match) return undefined
  const name = match[1].toLowerCase()
  const segment = segments.find(({ id }) => id === name)
  return segment ? { id: segment.id, hash: `#segment-${segment.id}${match[2] ?? ""}` } : undefined
}

export function readRoadmapProgress(stored: unknown): Set<string> {
  const result = new Set<string>()
  if (!Array.isArray(stored)) return result
  for (const value of stored) {
    if (typeof value !== "string") continue
    try {
      const key: unknown = JSON.parse(value)
      if (Array.isArray(key) && key.length === 2 && key.every((item) => typeof item === "string")) {
        result.add(JSON.stringify(key))
      }
    } catch {
      /* Ignore malformed keys without discarding other saved topics. */
    }
  }
  return result
}
