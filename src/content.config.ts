import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"
import { roadmapFileIdentity } from "./lib/roadmap-domain"

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

const roadmapMetadata = z.object({
  title: z.string().min(1),
  domain: z.enum(["mathematics", "physics"]),
  strand: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  draft: z.boolean().default(false),
})

const roadmap = defineCollection({
  loader: glob({
    base: "./content/roadmap",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry, data }) => {
      const { id, domain } = roadmapFileIdentity(entry)
      data.domain = domain
      data.overview = id === "index"
      // Keep overview IDs distinct so duplicate strand overviews can be validated.
      return data.overview ? `overview/${entry.replaceAll("\\", "/").replace(/\.mdx?$/, "")}` : id
    },
  }),
  schema: z.discriminatedUnion("overview", [
    roadmapMetadata
      .extend({
        overview: z.literal(true),
        title: z.string().default(""),
        strand: z
          .string()
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
          .or(z.literal(""))
          .default(""),
        description: z.string().optional(),
      })
      .refine(
        (data) => Boolean(data.title) === Boolean(data.strand),
        "An overview needs both title and strand, or neither for an empty placeholder.",
      ),
    roadmapMetadata.extend({
      overview: z.literal(false),
      subject: z.string().min(1).optional(),
      stage: z.enum(["Foundations", "Advanced"]),
      dependencies: z.array(z.string()).default([]),
      follows: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .optional(),
    }),
  ]),
})

export const collections = { components, posts, learning, roadmap }
