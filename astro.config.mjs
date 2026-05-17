// @ts-check

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import rehypeMathjax from 'rehype-mathjax'
import remarkMath from 'remark-math'

// https://astro.build/config
export default defineConfig({
  site: 'https://physica.hyperoot.dev',
  prefetch: true,

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeMathjax],
    shikiConfig: {
      theme: 'css-variables',
      defaultColor: false,
    },
  },

  integrations: [
    react(),
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
    mdx(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
})
