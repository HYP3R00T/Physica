// @ts-check

import { unified } from '@astrojs/markdown-remark'
import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import AutoImport from 'astro-auto-import'
import icon from 'astro-icon'
import rehypeMathjax from 'rehype-mathjax'
import remarkMath from 'remark-math'

// https://astro.build/config
export default defineConfig({
  site: 'https://physica.hyperoot.dev',
  prefetch: true,

  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeMathjax],
    }),
    shikiConfig: {
      theme: 'poimandres',
    },
  },

  integrations: [
    icon({
      iconDir: 'src/assets/icons',
      svgoOptions: {
        plugins: [
          {
            name: 'convertColors',
            params: {
              currentColor: true,
            },
          },
        ],
      },
    }),
    AutoImport({
      imports: ['./src/components/core/Video.astro'],
    }),
    mdx(),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
})
