# Writing the physics roadmap

The page lives at `/roadmap`. Each file in `content/roadmap/mathematics/` or `content/roadmap/physics/` is a segment. The folder determines its domain. Its filename gives it a stable identity, its frontmatter defines its relationships, and its Markdown or MDX body provides the explanation and checklist.

Browse the [segment index](roadmap-index.md) to review all segments by strand, including drafts and their prerequisites. Regenerate it with `pnpm docs:roadmap` after changing the roadmap files.

## Add a segment

Use a descriptive filename, such as `content/roadmap/physics/atomic-spectra.mdx`:

```yaml
---
title: Atomic spectra
strand: matter
scope: Breadth
dependencies:
  - atoms-and-molecules
  - angular-momentum-symmetry-and-composite-systems
---
```

- The filename, without its extension, is the segment's slug. Use lowercase words separated by single hyphens. Keep files directly in either domain folder. Slugs must be unique across both folders. Moving a file between domains does not change its slug, links or saved checklist keys.
- `title` is the name readers see. Changing it does not change the slug or links.
- `domain` is derived from the folder by the loader; do not write it in frontmatter.
- `strand` names the graph lane within a domain. Use lowercase words separated by hyphens; no separate definition file is needed.
- `subject` is an optional, more specific subject label. It defaults to the strand name with spaces in place of hyphens.
- `scope` is `Core`, `Breadth`, `Bridge` or `Integration`.
- `dependencies` lists prerequisite slugs. It defaults to an empty list; outgoing connections are calculated automatically.
- `draft: true` hides a segment. Published segments cannot depend on drafts.

There are no numbered segment codes or manually assigned positions. Adding a valid file adds its node, connections and searchable content.

## Insert material between segments

Suppose `lasers-and-controlled-atoms` depends on `atoms-and-molecules`. To put `atomic-spectra` between them:

1. Create `atomic-spectra.mdx` with `atoms-and-molecules` in its dependencies.
2. Change the relevant dependency of `lasers-and-controlled-atoms` to `atomic-spectra`. Keep any other prerequisites it still needs.

The graph then places atoms before spectra, and spectra before lasers. No existing file needs renumbering. Adding a related topic alone does not make it a prerequisite; add that relationship only when it is needed.

## Add a strand

Set a new strand name in a segment's frontmatter, such as `strand: biophysics` in the physics folder. It appears automatically once that segment is published.

Lanes and colors follow each strand's first appearance in the calculated learning order. Colors use the site's theme variables in this order: red, orange, yellow, green, teal, cyan, blue, purple, pink. Further strands cycle back to red, then orange, and so on. All segments in a strand share its color. Identically named strands in different domains remain separate lanes. Filtering preserves each lane's color and removes unused lanes.

The graph gutter grows with the lane count; the learning path can scroll horizontally when there are too many lanes to fit.

A segment belongs to one visual strand, but can depend on segments from any number of strands. Those dependency edges create the forks and merges.

## How ordering works

### Mathematics within the roadmap

Mathematical segments live in `content/roadmap/mathematics/` and use six strands:

- Foundations
- Algebra
- Geometry and vectors
- Calculus and analysis
- Differential equations
- Probability and statistics

The `strand` field uses the corresponding lowercase, hyphenated name. The optional `subject` field gives the reader a more specific label; it does not control the domain or graph lane. New mathematics strands can be added through frontmatter without a separate collection or color configuration.

The [mathematics coverage review](mathematics-coverage.md) records the foundational syllabus and later material. Use searchable topic names and nested subtopics in checklists. Prerequisites can cross strands and domains; the folders do not imply independent curricula.

### Dependency order

The build checks dependencies and calculates a topological order. Segments with no prerequisites come first. Each following layer contains segments whose prerequisites are all in earlier layers. Within a layer, slugs sort alphabetically, independently of filesystem order.

This keeps prerequisites above their dependents and gives a repeatable display order. Two independent segments can appear in either order educationally; their vertical placement does not mean one requires the other. Follow the connections to see actual prerequisites.

Missing references, invalid strand names, duplicate identities, repeated dependencies, circular dependencies and published-to-draft dependencies fail the build. Drafts are validated too, but do not appear on the page.

## Connect a study module

Set `roadmap` in the module's `content/notes/<module>/index.mdx`:

```yaml
roadmap: algebra
```

This creates a one-to-one connection: a module can reference one segment, and a segment can have one module. The segment displays a highlighted Study module card below its title, with an Open module button. Prerequisites and authored content follow it. The module overview and all its notes display the corresponding roadmap link automatically. No links need to be duplicated in their bodies.

Use the current segment slug. Unknown targets, multiple modules assigned to the same segment, mappings placed on individual notes, and published modules linked to draft segments fail the build. Draft modules are not shown in the roadmap. Segments without modules remain unchanged, so modules can be added one at a time.

The `roadmap` field is optional. Modules without it show no roadmap link and do not appear as study modules in the roadmap.

## Write the explanation

Everything below the frontmatter is authored content. Use headings, paragraphs, equations, links and MDX components as you do in notes:

```md
## How to approach this segment

Draw the motion before writing an equation. Explain what each axis and variable represents.

## What to study

- [ ] Position, displacement and distance.
- [ ] Speed, velocity and acceleration.

## By the end

Describe motion with a graph and use its slope to calculate velocity.
```

Keep What to study and By the end as the segment’s scope and intended outcome. Add book or chapter recommendations directly in the body when useful; a References section is optional, and empty placeholders are unnecessary. The panel adds the segment title as an H1 and prerequisites under an H2 above this content. The body renders directly, preserving authored heading levels.

Markdown task lists become checkboxes. Checks are saved in the browser. Their keys use the segment slug and topic text, so rewriting a topic gives it a new key. If browser storage is unavailable, checks remain usable during the visit.

Headings and equations receive segment-specific IDs to prevent collisions. Local links such as `#what-to-study` are scoped automatically. To link to another segment, use `/roadmap#segment-atoms-and-molecules`, or `/roadmap#segment-atoms-and-molecules--what-to-study` for its What to study heading.

When renaming a file, update dependencies, module references and links that use its slug.

## Domain filtering

The learning-path header has All, Physics and Mathematics buttons. All is the initial view. The filter affects only the left-hand graph and its segment count; the selected detail panel, checklist and full prerequisites remain unchanged. A domain with no published segments shows an empty-state message.

Only edges with both endpoints visible are drawn. Hidden nodes are not replaced by invented connections. Choosing a prerequisite outside the active domain switches to All and reveals that segment. Hash navigation, including global-search links and browser back/forward, also reveals the target when necessary. Filter choices are not saved between page visits.

## Scrolling and navigation

The graph follows the normal page scroll. On desktop, the selected explanation stays below the site navigation and scrolls independently. The sticky panel ends with the graph. The global search includes roadmap titles, subjects and body content. Its Roadmap filter limits results to segments; selecting a result opens that segment directly.

On small screens, the path and segment details have separate views. Selecting a segment opens its details; “Learning path” returns to the selected row. Search, direct links and browser back work with segment selection.

## Curriculum provenance

The initial 60 segments came from the segmented roadmap drafted on 12 September 2026, informed by the SVNIT, IIT Kanpur, IISER Pune, MIT, Cambridge and Caltech source review. The boundaries and dependencies are editorial choices, not an institutional consensus or a complete source audit. Supporting mathematics stays within the physics curriculum, beginning from a Class 10 baseline.
