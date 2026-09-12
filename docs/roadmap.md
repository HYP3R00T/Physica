# Writing the physics roadmap

The page lives at `/roadmap`. Each file in `content/roadmap/` is one segment. Astro reads its frontmatter to build the graph and renders its Markdown or MDX body in the detail column. There is no separate JSON curriculum to keep in sync.

## A segment file

Use the lowercase segment code as its filename, such as `cm1.mdx`:

```yaml
---
segment: CM1
order: 4
title: Motion and Newtonian dynamics
subject: Classical mechanics
lane: mechanics
scope: Core
dependencies: [E1]
draft: false
---
```

- `segment` is the stable code used by connections and links.
- `order` sets the reading order. Values must be unique positive integers; gaps are allowed.
- `subject` is the subject name shown to readers.
- `lane` places the node in one of the graph's narrow subject groups: `mathematics`, `mechanics`, `waves`, `electromagnetism`, `thermal`, `quantum`, `matter`, `space` or `methods`.
- `scope` is `Core`, `Breadth`, `Bridge` or `Integration`.
- `dependencies` lists the earlier segments used here. Outgoing connections are calculated automatically.
- `draft: true` keeps the segment off the public roadmap. Published segments cannot depend on drafts.

Adding a valid file adds a node, its connections and searchable content. No changes to the graph component are needed. Duplicate codes or orders, unknown dependencies and backwards connections fail the build.

## Write the explanation

Everything below the frontmatter is authored content. Use headings, paragraphs, equations, links and MDX components as you do in notes. For example:

```md
## How to approach this segment

Draw the motion before writing an equation. Explain what each axis and variable represents.

## What to study

- [ ] Position, displacement and distance.
- [ ] Speed, velocity and acceleration.

## By the end

Describe motion with a graph and use its slope to calculate velocity.
```

The existing topic groups and milestones have been migrated without changing their content. Add study guidance wherever it helps. Put reading recommendations and links directly in the body under a heading such as `## References`.

Markdown task lists become checkboxes. Checks are saved in this browser, not in an account or in the source files. Their keys use the segment code and topic text; rewriting a topic gives it a new key. If browser storage is unavailable, checks remain usable for the visit.

The panel shows the segment title as an H1 and prerequisite links under an H2 above the authored Markdown or MDX body. Their codes and full titles come from the dependency metadata, and selecting one opens that segment. The MDX body is rendered directly, without changes to its heading levels or inserted note lists. Heading levels stay as written: `##` renders as `<h2>`. Headings and equations receive unique IDs to avoid collisions between segments. A local heading link such as `#references` is scoped to its segment. To link to another segment, use `/roadmap#segment-m2`.

## Link notes and other pages

Write ordinary Markdown links directly in the segment body. You control their placement and wording. The panel does not generate a notes list from frontmatter.

## Scrolling and navigation

The graph follows the normal page scroll. On desktop, the selected explanation stays beside it below the site navigation and scrolls independently when it is long. The page releases the sticky panel at the end of the graph, as with the article sidebars. Search and the map guide sit together in the header.

On a small screen, the path and segment details have separate views. Selecting a segment opens its details; “Learning path” returns to the selected row. Search, direct links and browser back work with segment selection.

## Curriculum provenance

The initial 60 segments came from the segmented roadmap drafted on 12 September 2026, informed by the SVNIT, IIT Kanpur, IISER Pune, MIT, Cambridge and Caltech source review. The boundaries and ordering are editorial choices, not an institutional consensus or a complete source audit. Supporting mathematics stays within the physics curriculum, beginning from a Class 10 baseline.
