import { rehypeHeadingIds } from "@astrojs/markdown-remark"

// Each segment is rendered on the same page, so its heading/equation IDs must be scoped.
export default function rehypeRoadmapContent() {
  return (tree, file) => {
    const path = String(file.path ?? "").replaceAll("\\", "/")
    const match = path.match(/\/content\/roadmap\/([a-z]+\d+)\.mdx?$/i)
    if (!match) return
    rehypeHeadingIds()(tree, file)
    const prefix = `segment-${match[1].toLowerCase()}--`
    const ids = new Map()
    const walk = (node, callback) => {
      callback(node)
      for (const child of node.children ?? []) walk(child, callback)
    }
    walk(tree, (node) => {
      if (node.type !== "element") return
      const id = node.properties?.id
      if (typeof id === "string") {
        ids.set(id, `${prefix}${id}`)
        node.properties.id = `${prefix}${id}`
      }
    })
    walk(tree, (node) => {
      const href = node.properties?.href
      if (typeof href === "string" && href.startsWith("#") && ids.has(href.slice(1))) {
        node.properties.href = `#${ids.get(href.slice(1))}`
      }
    })
  }
}
