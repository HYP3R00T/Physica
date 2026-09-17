# Project instructions

## Project context

Physica is an educational site built with Astro, MDX, React and Tailwind CSS. Use pnpm for package management.

- `content/posts`, `content/notes` and `content/roadmap` hold educational content.
- `src/content.config.ts` defines content collections; `astro.config.mjs` configures Markdown processing.
- `src/components` holds reusable components; `src/styles` holds shared CSS and theme tokens.

## Working boundaries

- Keep changes within the requested scope. Preserve unrelated work, scientific meaning and existing content relationships.
- Follow existing conventions. Avoid unsolicited restructuring, dependencies or abstractions.
- Update references when moving or renaming content. Preserve public identifiers unless changing them is intended.
- Keep one README at the project root. Do not add documentation, audits or planning logs unless requested.
- Detailed writing and curriculum workflows belong in task-specific skills, invoked when requested.

## Verification and delivery

- Use `pnpm astro check`, `pnpm build` and `node --experimental-strip-types --test tests/*.test.mjs` as relevant to the change.
- Inspect visual changes in the browser. Report what was checked and any remaining limitations accurately.
- Keep responses concise. Commit, push or deploy only when requested, grouping authorised changes logically.
