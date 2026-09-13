import { readdir, readFile, writeFile } from "node:fs/promises"
import { parseFrontmatter } from "@astrojs/markdown-remark"
import { validateRoadmap } from "../src/lib/roadmap-validation.ts"

const directory = new URL("../content/roadmap/", import.meta.url)
const files = (await readdir(directory)).filter((file) => file.endsWith(".mdx"))
const entries = await Promise.all(
  files.map(async (file) => {
    const { frontmatter } = parseFrontmatter(await readFile(new URL(file, directory), "utf8"))
    return { id: file.slice(0, -4), data: { dependencies: [], aliases: [], draft: false, ...frontmatter } }
  }),
)
const ordered = validateRoadmap(entries)
const byId = new Map(ordered.map((entry) => [entry.id, entry]))
const strands = [...new Set(ordered.map((entry) => entry.data.strand))]
const heading = (strand) => strand.replaceAll("-", " ").replace(/^./, (letter) => letter.toUpperCase())
const lines = [
  "# Roadmap segment index",
  "",
  "Segments are grouped by strand in dependency order, including drafts. Indented names are direct prerequisites, which may belong to other strands.",
  "",
  "Regenerate with `pnpm docs:roadmap` after editing the segment frontmatter.",
  "",
]
for (const strand of strands) {
  lines.push(`## ${heading(strand)}`, "")
  for (const entry of ordered.filter((entry) => entry.data.strand === strand)) {
    lines.push(`- ${entry.data.title}`)
    for (const dependency of entry.data.dependencies) {
      lines.push(`  - ${byId.get(dependency).data.title}`)
    }
  }
  lines.push("")
}
await writeFile(new URL("../docs/roadmap-index.md", import.meta.url), lines.join("\n"))
console.log(`Indexed ${ordered.length} roadmap segments in docs/roadmap-index.md`)
