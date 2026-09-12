import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const components = defineCollection({
  loader: glob({
    pattern: ["**/*.md", "**/*.mdx"],
    base: "./content/components",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
  }),
})

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDatetime: z.date(),
      featured: z.boolean().optional().default(false),
      draft: z.boolean().optional().default(false),
      tags: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string().optional(),
    }),
})

const learning = defineCollection({
  loader: glob({ base: "./content/notes", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    related: z.array(z.string()).default([]),
    roadmap: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    tags: z.array(z.string()).default([]),
    created: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
})

const roadmap = defineCollection({
  loader: glob({ base: "./content/roadmap", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string().min(1),
    subject: z.string().min(1).optional(),
    strand: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    aliases: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).default([]),
    scope: z.enum(["Core", "Breadth", "Bridge", "Integration"]),
    dependencies: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
})

export const collections = { components, posts, learning, roadmap }
