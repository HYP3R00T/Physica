# Physica

Physica uses the shared layout, theme, effects, and search from the Notes project, with its own branding and an additional article collection.

- `pnpm dev` starts the development server.
- `pnpm build` generates the static site.
- `pnpm astro check` validates Astro and TypeScript files.

## Content

Articles remain in `content/posts`. Draft articles are excluded from public routes and search.

Add learning modules under `content/notes/<module>/index.mdx`, with ordered notes alongside them (for example, `010-vectors.mdx`). Every entry needs a `title` in its frontmatter. Optional fields are `description`, `tags`, `related`, `created`, `updated`, and `draft`. The `related` field on modules contains other module slugs.

A module is available at `/<module>` and its notes use the filename without the numeric prefix, such as `/vectors`. Note slugs must be unique across modules. Published modules, notes, and blog posts populate the full-text search index automatically. The physical quantities and measurement module accompanies the first classical mechanics roadmap segment.
