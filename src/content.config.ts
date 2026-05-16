import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/notes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      draft: z.boolean().optional().default(true),
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
})

export const collections = { notes }
