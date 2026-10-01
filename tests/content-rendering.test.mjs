import assert from "node:assert/strict"
import test from "node:test"
import { unified } from "@astrojs/markdown-remark"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import rehypeCodeBlocks from "../src/lib/rehype-code-blocks.mjs"
import rehypeEquationReferences, { rehypeEquationAnchors } from "../src/lib/rehype-equation-references.mjs"

const processor = unified({
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeEquationReferences, rehypeKatex, rehypeEquationAnchors, rehypeCodeBlocks],
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

test("equation/split and align share a counter and references target individual rows", async () => {
  const source = String.raw`See \eqref(position) and \eqref(energy).

$$
\begin{equation}
\begin{split}
K &= \int F\,dx \\
&= \frac12 mv^2
\end{split}
\label{energy}
\end{equation}
$$

$$
\begin{align}
v &= at \label{velocity} \\
x &= \begin{pmatrix}1\\2\end{pmatrix} \notag \\[1em]
x &= \frac12 at^2 \label{position} \\
a &= F/m
\end{align}
$$

$$
y=1\label{last}
$$`
  const { code } = await renderer.render(source)
  assert.doesNotMatch(code, /katex-error/)
  for (const [label, number] of [
    ["energy", 1],
    ["velocity", 2],
    ["position", 3],
    ["last", 5],
  ]) {
    assert.match(code, new RegExp(`id="${label}"[^>]*data-equation-number="${number}"`))
  }
  assert.match(code, /href="#position"[^>]*>\(3\)<\/a>/)
  assert.equal((code.match(/id="position"/g) ?? []).length, 1)
  assert.match(code, /equation-row-target/)
  assert.match(code, /<mtext>\(3\)<\/mtext>/)
  assert.doesNotMatch(code, /mml-eqn-num/)
})

test("align* stays unnumbered except labelled rows and rejects ambiguous labels", async () => {
  const { code } = await renderer.render(String.raw`$$
\begin{align*}
x &= 1 \\
y &= 2 \label{chosen}
\end{align*}
$$

See \eqref(chosen).`)
  assert.match(code, /id="chosen"[^>]*data-equation-number="1"/)
  assert.doesNotMatch(code, /katex-error/)
  await assert.rejects(
    renderer.render(String.raw`$$
\begin{align}
x &= 1 \notag \label{hidden}
\end{align}
$$`),
    /cannot have a label/,
  )
  await assert.rejects(
    renderer.render(String.raw`$$
\begin{align}
x &= 1 \label{same} \\
y &= 2 \label{same}
\end{align}
$$`),
    /Duplicate equation label/,
  )
})

test("MDX keeps row targets and resolves forward references to align rows", async () => {
  const mdx = await processor.createMdxRenderer(
    { syntaxHighlight: false },
    { srcDir: new URL("../src/", import.meta.url), sourcemap: false },
  )
  const result = await mdx.process(
    String.raw`See \eqref(second).

$$
\begin{align}
x &= 1 \label{first} \\
y &= 2 \label{second}
\end{align}
$$`,
    "/sample.mdx",
    {},
  )
  assert.match(result.code, /id: "second"/)
  assert.match(result.code, /href: "#second"/)
  assert.doesNotMatch(result.code, /katex-error/)
})
