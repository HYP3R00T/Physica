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
    id: label,
    className: ["equation"],
    dataEquationNumber: String(number),
  },
  children: [
    scope,
    {
      type: "element",
      tagName: "figcaption",
      properties: { className: ["equation-number"] },
      children: [
        {
          type: "element",
          tagName: "a",
          properties: {
            href: `#${label}`,
            title: `Equation ${number}`,
          },
          children: [{ type: "text", value: `(${number})` }],
        },
      ],
    },
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
          const value = textOf(displayMath)
          const labels = [...value.matchAll(LABEL_PATTERN)]

          if (labels.length > 1) fail(file, "A display equation can have only one \\label", displayMath)
          if (labels.length === 0) continue

          const label = labels[0][1].trim()
          if (!VALID_LABEL.test(label)) {
            fail(
              file,
              `Invalid equation label "${label}"; use letters, numbers, colon, dot, underscore, or hyphen`,
              displayMath,
            )
          }
          if (equations.has(label)) fail(file, `Duplicate equation label "${label}"`, displayMath)

          const number = nextNumber
          nextNumber += 1
          equations.set(label, number)

          displayMath.children = [{ type: "text", value: value.replace(LABEL_PATTERN, "").trim() }]
          node.children[index] = equationMarkup(child, label, number)
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
