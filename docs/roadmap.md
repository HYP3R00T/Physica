# Writing the physics roadmap

The page lives at `/roadmap`. Each file in `content/roadmap/` is a segment. Its filename gives it a stable identity, its frontmatter defines its relationships, and its Markdown or MDX body provides the explanation and checklist.

## Add a segment

Use a descriptive filename, such as `atomic-spectra.mdx`:

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

- The filename, without its extension, is the segment's slug. Use lowercase words separated by single hyphens. Keep files directly in `content/roadmap/`.
- `title` is the name readers see. Changing it does not change the slug or links.
- `strand` names the graph lane. Use lowercase words separated by hyphens; no separate definition file is needed.
- `subject` is an optional, more specific subject label. It defaults to the strand name with spaces in place of hyphens.
- `scope` is `Core`, `Breadth`, `Bridge` or `Integration`.
- `dependencies` lists prerequisite slugs. It defaults to an empty list; outgoing connections are calculated automatically.
- `draft: true` hides a segment. Published segments cannot depend on drafts.
- `aliases` is an optional list of previous slugs or codes, used to preserve links and saved checklist progress. Dependencies must reference current slugs.

There are no numbered segment codes or manually assigned positions. Adding a valid file adds its node, connections and searchable content.

## Insert material between segments

Suppose `lasers-and-controlled-atoms` depends on `atoms-and-molecules`. To put `atomic-spectra` between them:

1. Create `atomic-spectra.mdx` with `atoms-and-molecules` in its dependencies.
2. Change the relevant dependency of `lasers-and-controlled-atoms` to `atomic-spectra`. Keep any other prerequisites it still needs.

The graph then places atoms before spectra, and spectra before lasers. No existing file needs renumbering. Adding a related topic alone does not make it a prerequisite; add that relationship only when it is needed.

## Add a strand

Set a new strand name in a segment's frontmatter, such as `strand: biophysics`. It appears automatically once that segment is published.

Lanes and colors follow each strand's first appearance in the calculated learning order. Colors use the site's theme variables in this order: red, orange, yellow, green, teal, cyan, blue, purple, pink. Further strands cycle back to red, then orange, and so on. All segments in a strand share its color.

The graph gutter grows with the lane count; the learning path can scroll horizontally when there are too many lanes to fit.

A segment belongs to one visual strand, but can depend on segments from any number of strands. Those dependency edges create the forks and merges.

## How ordering works

The build checks dependencies and calculates a topological order. Segments with no prerequisites come first. Each following layer contains segments whose prerequisites are all in earlier layers. Within a layer, slugs sort alphabetically, independently of filesystem order.

This keeps prerequisites above their dependents and gives a repeatable display order. Two independent segments can appear in either order educationally; their vertical placement does not mean one requires the other. Follow the connections to see actual prerequisites.

Missing references, invalid strand names, duplicate identities or aliases, repeated dependencies, circular dependencies and published-to-draft dependencies fail the build. Drafts are validated too, but do not appear on the page.

## Connect a study module

Set `roadmap` in the module's `content/notes/<module>/index.mdx`:

```yaml
roadmap: functions-trigonometry-and-vectors
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

Put reading recommendations and links directly in the body wherever they help. The panel adds the segment title as an H1 and prerequisites under an H2 above this content. The body renders directly, preserving authored heading levels.

Markdown task lists become checkboxes. Checks are saved in the browser. Their keys use the segment slug and topic text, so rewriting a topic gives it a new key. Existing numbered keys migrate using aliases. If browser storage is unavailable, checks remain usable during the visit.

Headings and equations receive segment-specific IDs to prevent collisions. Local links such as `#references` are scoped automatically. To link to another segment, use `/roadmap#segment-atoms-and-molecules`, or `/roadmap#segment-atoms-and-molecules--references` for its References heading. Old links such as `/roadmap#segment-am1` still resolve through aliases.

When renaming a file, update dependencies that reference it and add its old slug to `aliases`. Keep previous aliases so older links and progress continue to work.

## Scrolling and navigation

The graph follows the normal page scroll. On desktop, the selected explanation stays below the site navigation and scrolls independently. The sticky panel ends with the graph. The global search includes roadmap titles, subjects, aliases and body content. Its Roadmap filter limits results to segments; selecting a result opens that segment directly.

On small screens, the path and segment details have separate views. Selecting a segment opens its details; “Learning path” returns to the selected row. Search, direct links and browser back work with segment selection.

## Curriculum provenance

The initial 60 segments came from the segmented roadmap drafted on 12 September 2026, informed by the SVNIT, IIT Kanpur, IISER Pune, MIT, Cambridge and Caltech source review. The boundaries and dependencies are editorial choices, not an institutional consensus or a complete source audit. Supporting mathematics stays within the physics curriculum, beginning from a Class 10 baseline.
