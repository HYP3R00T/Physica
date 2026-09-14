import { readdir, readFile, writeFile } from "node:fs/promises"
import { parseFrontmatter } from "@astrojs/markdown-remark"
import { roadmapDomains, roadmapFileIdentity } from "../src/lib/roadmap-domain.ts"
import { validateRoadmap } from "../src/lib/roadmap-validation.ts"

const directory = new URL("../content/roadmap/", import.meta.url)
const files = (await readdir(directory, { recursive: true })).filter((file) => /\.mdx?$/.test(file))
const entries = await Promise.all(
  files.map(async (file) => {
    const { frontmatter } = parseFrontmatter(await readFile(new URL(file, directory), "utf8"))
    const { id, domain } = roadmapFileIdentity(file)
    return { id, data: { dependencies: [], draft: false, ...frontmatter, domain } }
  }),
)
const ordered = validateRoadmap(entries)
const byId = new Map(ordered.map((entry) => [entry.id, entry]))
const heading = (name) => name.replaceAll("-", " ").replace(/^./, (letter) => letter.toUpperCase())
const lines = [
  "# Roadmap segment index",
  "",
  "Segments are grouped by domain and strand in dependency order, including drafts. Indented names are direct prerequisites, which may belong to other domains or strands.",
  "",
  "Regenerate with `pnpm docs:roadmap` after editing the segment frontmatter.",
  "",
]
for (const domain of roadmapDomains) {
  lines.push(`## ${heading(domain)}`, "")
  const domainEntries = ordered.filter((entry) => entry.data.domain === domain)
  if (domainEntries.length === 0) lines.push("No active segments yet.", "")
  const strands = [...new Set(domainEntries.map((entry) => entry.data.strand))]
  for (const strand of strands) {
    lines.push(`### ${heading(strand)}`, "")
    for (const entry of domainEntries.filter((entry) => entry.data.strand === strand)) {
      lines.push(`- ${entry.data.title}`)
      for (const dependency of entry.data.dependencies) {
        lines.push(`  - ${byId.get(dependency).data.title}`)
      }
    }
    lines.push("")
  }
}
await writeFile(new URL("../docs/roadmap-index.md", import.meta.url), lines.join("\n"))
console.log(`Indexed ${ordered.length} roadmap segments in docs/roadmap-index.md`)
