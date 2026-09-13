// @ts-check

import { unified } from "@astrojs/markdown-remark"
import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import AutoImport from "astro-auto-import"
import icon from "astro-icon"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import rehypeCodeBlocks from "./src/lib/rehype-code-blocks.mjs"
import rehypeEquationReferences from "./src/lib/rehype-equation-references.mjs"
import rehypeRoadmapContent from "./src/lib/rehype-roadmap-content.mjs"

/** @type {import("@astrojs/markdown-remark").RemarkPlugins} */
const remarkPlugins = [remarkMath]

/** @type {import("@astrojs/markdown-remark").RehypePlugins} */
const rehypePlugins = [
  rehypeEquationReferences,
  rehypeKatex,
  [
    rehypeCodeBlocks,
    {
      theme: {
        light: "github-light",
        dark: "github-dark-default",
      },
    },
  ],
  // Scope roadmap heading links to each segment’s descriptive slug.
  rehypeRoadmapContent,
]

export default defineConfig({
  site: "https://physica.hyperoot.dev",
  trailingSlash: "never",
  prefetch: true,
  compressHTML: true,

  build: {
    format: "file",
  },

  markdown: {
    processor: unified({ remarkPlugins, rehypePlugins }),
    syntaxHighlight: false,
  },

  integrations: [
    {
      name: "search-on-interaction",
      hooks: {
        "astro:config:setup": ({ addClientDirective }) => {
          addClientDirective({ name: "search", entrypoint: "./src/directives/search.ts" })
        },
      },
    },
    icon({
      iconDir: "src/assets/icons",
      svgoOptions: {
        plugins: [
          {
            name: "convertColors",
            params: {
              currentColor: true,
            },
          },
        ],
      },
    }),
    AutoImport({ imports: ["./src/components/core/Video.astro"] }),
    mdx(),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
})
