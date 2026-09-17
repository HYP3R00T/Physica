import assert from "node:assert/strict"
import test from "node:test"
import { unified } from "@astrojs/markdown-remark"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import rehypeCodeBlocks from "../src/lib/rehype-code-blocks.mjs"
import rehypeEquationReferences from "../src/lib/rehype-equation-references.mjs"

const processor = unified({
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeEquationReferences, rehypeKatex, rehypeCodeBlocks],
})
const renderer = await processor.createRenderer({ syntaxHighlight: false })

test("display equations scroll independently and only labelled equations are numbered", async () => {
  const source = String.raw`See \eqref(second).

$$
x = 0
$$

$$
x = 1
\label{first}
$$

$$
x = 2
\label{second}
$$

See \eqref(first). Inline $x$ remains inline.`
  const { code } = await renderer.render(source)
  assert.equal((code.match(/class="equation-scroll"/g) ?? []).length, 3)
  assert.equal((code.match(/class="equation-number"/g) ?? []).length, 2)
  assert.match(code, /href="#second"[^>]*>\(2\)<\/a>/)
  assert.match(code, /href="#first"[^>]*>\(1\)<\/a>/)
  assert.doesNotMatch(code, /katex-error/)
})

test("equation references reject missing and duplicate labels", async () => {
  await assert.rejects(renderer.render(String.raw`See \eqref(missing).`), /Unknown equation label/)
  await assert.rejects(
    renderer.render("$$\nx=1\\label{same}\n$$\n\n$$\nx=2\\label{same}\n$$"),
    /Duplicate equation label/,
  )
})

test("ANSI escapes become coloured tokens rather than literal escape text", async () => {
  const { code } = await renderer.render("```ansi\n\\x1b[32mPASS\\x1b[0m\n```")
  assert.match(code, /<span style="color:[^"]+">PASS<\/span>/)
  assert.doesNotMatch(code, /\[32m|\[0m|\^\[/)
})

test("MDX supports the same equation wrappers and references", async () => {
  const mdx = await processor.createMdxRenderer(
    { syntaxHighlight: false },
    { srcDir: new URL("../src/", import.meta.url), sourcemap: false },
  )
  const result = await mdx.process("$$\nx=1\\label{one}\n$$\n\nSee \\eqref(one).", "/sample.mdx", {})
  assert.match(result.code, /equation-scroll/)
  assert.match(result.code, /href: "#one"/)
  assert.doesNotMatch(result.code, /katex-error/)
})
