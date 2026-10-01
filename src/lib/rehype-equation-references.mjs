const LABEL_PATTERN = /\\label\{([^{}]+)\}/g
const REFERENCE_PATTERN = /\\eqref\(([^()]+)\)/g
const VALID_LABEL = /^[A-Za-z][A-Za-z0-9:._-]*$/

const classesOf = (node) => {
  const className = node?.properties?.className
  return Array.isArray(className) ? className : []
}

const hasClass = (node, className) => classesOf(node).includes(className)

const textOf = (node) => {
  if (node.type === "text") return node.value
  if (!Array.isArray(node.children)) return ""
  return node.children.map(textOf).join("")
}

const displayMathIn = (node) => {
  if (hasClass(node, "math-display")) return node
  if (node.tagName !== "pre" || !Array.isArray(node.children)) return undefined
  return node.children.find((child) => child.type === "element" && hasClass(child, "math-display"))
}

const fail = (file, message, node) => {
  file.fail(message, node.position)
}

const equationMarkup = (scope, label, number) => ({
  type: "element",
  tagName: "figure",
  properties: {
    ...(number ? { ...(label ? { id: label } : {}), dataEquationNumber: String(number) } : {}),
    className: ["equation"],
  },
  children: [
    {
      type: "element",
      tagName: "div",
      properties: {
        className: ["equation-scroll"],
        tabIndex: 0,
        role: "region",
        ariaLabel: number ? `Equation ${number}` : "Equation",
      },
      children: [scope],
    },
    ...(number
      ? [
          {
            type: "element",
            tagName: "figcaption",
            properties: { className: ["equation-number"] },
            children: [
              {
                type: "element",
                tagName: "a",
                properties: {
                  ...(label ? { href: `#${label}` } : {}),
                  title: `Equation ${number}`,
                },
                children: [{ type: "text", value: `(${number})` }],
              },
            ],
          },
        ]
      : []),
  ],
})

const referenceMarkup = (label, number) => ({
  type: "element",
  tagName: "a",
  properties: {
    href: `#${label}`,
    className: ["equation-reference"],
    title: `Go to equation ${number}`,
  },
  children: [{ type: "text", value: `(${number})` }],
})

export default function rehypeEquationReferences() {
  return (tree, file) => {
    const equations = new Map()
    let nextNumber = 1

    const collectEquations = (node) => {
      if (!Array.isArray(node.children)) return

      for (let index = 0; index < node.children.length; index += 1) {
        const child = node.children[index]
        if (child.type !== "element") continue

        if (hasClass(child, "math-inline")) {
          const value = textOf(child)
          if (LABEL_PATTERN.test(value)) fail(file, "Equation labels can only be used in display math", child)
          if (REFERENCE_PATTERN.test(value)) {
            fail(file, "Write \\eqref(...) directly in prose, without inline math delimiters", child)
          }
          LABEL_PATTERN.lastIndex = 0
          REFERENCE_PATTERN.lastIndex = 0
          continue
        }

        const displayMath = displayMathIn(child)
        if (displayMath) {
          // TeX comments must not introduce labels or row breaks.
          const value = textOf(displayMath).replace(/(?<!\\)%[^\n]*/g, "")
          const register = (source, numbered = false) => {
            const labels = [...source.matchAll(LABEL_PATTERN)]
            if (labels.length > 1) fail(file, "An equation row can have only one \\label", displayMath)
            const label = labels[0]?.[1].trim()
            if (label && !VALID_LABEL.test(label)) {
              fail(
                file,
                `Invalid equation label "${label}"; use letters, numbers, colon, dot, underscore, or hyphen`,
                displayMath,
              )
            }
            if (labels.length && !label) fail(file, "Equation labels cannot be empty", displayMath)
            if (label && equations.has(label)) fail(file, `Duplicate equation label "${label}"`, displayMath)
            const number = label || numbered ? nextNumber++ : undefined
            if (label) equations.set(label, number)
            return { label, number, source: source.replace(LABEL_PATTERN, "").trim() }
          }
          const align = value.trim().match(/^\\begin\{(align\*?)\}([\s\S]*)\\end\{\1\}$/)
          if (align) {
            const rows = splitAlignRows(align[2])
            const records = rows.map((row) => {
              const suppressed = /\\(?:notag|nonumber)\b/.test(row.source)
              if (suppressed && /\\label\{/.test(row.source)) {
                fail(file, "A row with \\notag or \\nonumber cannot have a label", displayMath)
              }
              if (/\\tag\b/.test(row.source)) {
                fail(file, "Use automatic numbering rather than \\tag in referenced align blocks", displayMath)
              }
              const record = register(row.source, align[1] === "align" && !suppressed)
              return { ...record, separator: row.separator }
            })
            displayMath.children = [
              {
                type: "text",
                value: `\\begin{align*}${records
                  .map((row) => `${row.source}${row.number ? `\\tag{${row.number}}` : ""}${row.separator}`)
                  .join("\n")}\\end{align*}`,
              },
            ]
            const figure = equationMarkup(child)
            figure.properties.className.push("equation-aligned")
            figure.data = { equationRows: records.filter((row) => row.number) }
            node.children[index] = figure
          } else {
            const numbered = /^\s*\\begin\{equation\}/.test(value)
            const record = register(value, numbered)
            // Our caption supplies the number; disable KaTeX's local counter.
            displayMath.children = [
              { type: "text", value: record.source.replace(/\\(begin|end)\{equation\}/g, "\\$1{equation*}") },
            ]
            node.children[index] = equationMarkup(child, record.label, record.number)
          }
          continue
        }

        collectEquations(child)
      }
    }

    const replaceReferences = (node) => {
      if (!Array.isArray(node.children)) return

      for (let index = 0; index < node.children.length; index += 1) {
        const child = node.children[index]

        if (child.type === "text") {
          const matches = [...child.value.matchAll(REFERENCE_PATTERN)]
          if (matches.length === 0) continue

          const replacement = []
          let cursor = 0

          for (const match of matches) {
            const label = match[1].trim()
            const number = equations.get(label)
            if (!number) fail(file, `Unknown equation label "${label}"`, child)

            if (match.index > cursor) {
              replacement.push({ type: "text", value: child.value.slice(cursor, match.index) })
            }
            replacement.push(referenceMarkup(label, number))
            cursor = match.index + match[0].length
          }

          if (cursor < child.value.length) {
            replacement.push({ type: "text", value: child.value.slice(cursor) })
          }

          node.children.splice(index, 1, ...replacement)
          index += replacement.length - 1
          continue
        }

        if (child.type !== "element") continue
        if (child.tagName === "a" || child.tagName === "code" || child.tagName === "pre") continue
        if (hasClass(child, "math-inline") || hasClass(child, "math-display")) continue
        replaceReferences(child)
      }
    }

    collectEquations(tree)
    replaceReferences(tree)
  }
}

// Split only outer align rows, preserving nested matrices, split blocks and spacing.
const splitAlignRows = (source) => {
  const rows = []
  const tokens = /\\(?:begin|end)\{[^{}]+\}|\\\\\*?(?:\s*\[[^\]]*\])?|\\[{}]|[{}]/g
  let environments = 0
  let braces = 0
  let cursor = 0
  for (const token of source.matchAll(tokens)) {
    if (token[0].startsWith("\\begin")) environments += 1
    else if (token[0].startsWith("\\end")) environments -= 1
    else if (token[0] === "{") braces += 1
    else if (token[0] === "}") braces -= 1
    else if (token[0].startsWith("\\\\") && environments === 0 && braces === 0) {
      rows.push({ source: source.slice(cursor, token.index), separator: token[0] })
      cursor = token.index + token[0].length
    }
  }
  if (source.slice(cursor).trim()) rows.push({ source: source.slice(cursor), separator: "" })
  return rows
}

// Run after KaTeX: attach targets to rendered row tags without enabling trusted HTML.
export function rehypeEquationAnchors() {
  return (tree, file) => {
    const visit = (node) => {
      const records = node.data?.equationRows
      if (records) {
        const remaining = new Map(records.map((row) => [`(${row.number})`, row]))
        const attach = (child, inTag = false) => {
          const isTag = inTag || hasClass(child, "katex-tag") || hasClass(child, "tag")
          const record = isTag && hasClass(child, "text") && remaining.get(textOf(child))
          if (record) {
            if (record.label) child.properties.id = record.label
            child.properties.dataEquationNumber = String(record.number)
            child.properties.className.push("equation-row-target")
            remaining.delete(`(${record.number})`)
          }
          for (const descendant of child.children ?? []) attach(descendant, isTag)
        }
        attach(node)
        // KaTeX emits empty MathML number cells with a CSS counter. Supply the
        // actual page numbers so assistive technology agrees with the HTML.
        let rowIndex = 0
        const numberMathML = (child) => {
          if (hasClass(child, "mml-eqn-num")) {
            const record = records[rowIndex++]
            child.properties.className = classesOf(child).filter((name) => name !== "mml-eqn-num")
            child.children = [
              {
                type: "element",
                tagName: "mtext",
                properties: {},
                children: [{ type: "text", value: `(${record.number})` }],
              },
            ]
          }
          for (const descendant of child.children ?? []) numberMathML(descendant)
        }
        numberMathML(node)
        if (remaining.size) fail(file, "Could not attach a reference target to an aligned equation", node)
      }
      for (const child of node.children ?? []) visit(child)
    }
    visit(tree)
  }
}
