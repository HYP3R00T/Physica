import rehypePrettyCode from "rehype-pretty-code"

const LANGUAGE_LABELS = {
  ansi: "ANSI",
  bash: "Bash",
  console: "Console",
  css: "CSS",
  dockerfile: "Dockerfile",
  html: "HTML",
  javascript: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  jsx: "JSX",
  markdown: "Markdown",
  md: "Markdown",
  mdx: "MDX",
  plaintext: "Text",
  py: "Python",
  python: "Python",
  shell: "Shell",
  sh: "Shell",
  sql: "SQL",
  toml: "TOML",
  ts: "TypeScript",
  tsx: "TSX",
  typescript: "TypeScript",
  xml: "XML",
  yaml: "YAML",
  yml: "YAML",
}

const textContent = (node) => {
  if (node.type === "text") return node.value
  if (!Array.isArray(node.children)) return ""
  return node.children.map(textContent).join("")
}

const hasProperty = (node, property) => node?.type === "element" && Object.hasOwn(node.properties ?? {}, property)

const normalizeAnsiSource = (node) => {
  if (node?.type !== "element" || node.tagName !== "code") return

  const classes = node.properties?.className
  const classNames = Array.isArray(classes) ? classes : typeof classes === "string" ? classes.split(/\s+/) : []
  const language = node.properties?.["data-language"]
  if (!classNames.includes("language-ansi") && language !== "ansi") return

  for (const child of node.children ?? []) {
    if (child.type !== "text") continue
    child.value = child.value.replace(/\\(?:x1b|u001b)/gi, "\u001b")
  }
}

const createHeader = (language, filename) => ({
  type: "element",
  tagName: "figcaption",
  properties: { className: ["code-block__header"] },
  children: [
    {
      type: "element",
      tagName: "span",
      properties: { className: ["code-block__meta"] },
      children: [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["code-block__language"] },
          children: [{ type: "text", value: LANGUAGE_LABELS[language] ?? language.toUpperCase() }],
        },
        ...(filename
          ? [
              {
                type: "element",
                tagName: "span",
                properties: { className: ["code-block__filename"], title: filename },
                children: [{ type: "text", value: filename }],
              },
            ]
          : []),
      ],
    },
    {
      type: "element",
      tagName: "button",
      properties: {
        type: "button",
        className: ["code-block__copy"],
        "aria-label": "Copy code",
        "data-code-copy": "",
      },
      children: [{ type: "text", value: "Copy" }],
    },
  ],
})

const transformCodeBlock = (node) => {
  if (node?.type !== "element" || node.tagName !== "figure" || !hasProperty(node, "data-rehype-pretty-code-figure")) {
    return
  }

  const title = node.children.find((child) => hasProperty(child, "data-rehype-pretty-code-title"))
  const pre = node.children.find((child) => child.type === "element" && child.tagName === "pre")
  if (!pre) return

  const language = String(pre.properties?.["data-language"] ?? "text").toLowerCase()
  const filename = title ? textContent(title).trim() : ""

  node.properties ??= {}
  node.properties.className = ["code-block"]
  node.properties["data-code-block"] = ""

  if (typeof pre.properties?.style === "string") {
    node.properties.style = pre.properties.style
    delete pre.properties.style
  }

  node.children = [createHeader(language, filename), pre]
}

const walk = (node) => {
  transformCodeBlock(node)
  if (!Array.isArray(node.children)) return
  for (const child of node.children) walk(child)
}

const walkAnsiSource = (node) => {
  normalizeAnsiSource(node)
  if (!Array.isArray(node.children)) return
  for (const child of node.children) walkAnsiSource(child)
}

export default function rehypeCodeBlocks(options = {}) {
  const highlightCode = rehypePrettyCode(options)

  return async (tree, file) => {
    walkAnsiSource(tree)
    await highlightCode(tree, file)
    walk(tree)
  }
}
