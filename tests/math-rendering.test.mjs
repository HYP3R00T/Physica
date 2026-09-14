import assert from "node:assert/strict"
import { createRequire } from "node:module"
import test from "node:test"
import katex from "katex"

test("MDX math uses the same KaTeX renderer as the site's styles", () => {
  const require = createRequire(import.meta.url)
  const rendererRequire = createRequire(require.resolve("rehype-katex"))
  const renderer = rendererRequire("katex")
  assert.equal(renderer.version, katex.version)
  for (const expression of [String.raw`\lim_{x\to 0}\frac{\sin x}{x}`, String.raw`\frac{f(x+h)-f(x)}{h}`]) {
    assert.equal(renderer.renderToString(expression), katex.renderToString(expression))
  }
})
