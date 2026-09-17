# Writing the physics roadmap

Read [Organising a learning roadmap](learning-roadmap-structure.md) for the principles behind domains, strands, segments and prerequisite connections across subjects.

The page lives at `/roadmap`. Each file in `content/roadmap/mathematics/` or `content/roadmap/physics/` is a segment. The folder determines its domain. Its filename gives it a stable identity, its frontmatter defines its relationships, and its Markdown or MDX body provides the explanation and checklist.

Browse the [segment index](roadmap-index.md) to review all segments by strand, including drafts and their prerequisites. Regenerate it with `pnpm docs:roadmap` after changing the roadmap files.

## Rebuilding under review

The active roadmap was reset and is being rebuilt through individual review. The [earlier draft](../archive/roadmap/README.md) preserves the previous segments and coverage review. Use it to check omissions; bring material back only through individual review. Record deferred topics and placement questions in the [review log](roadmap-review.md). Start with the chosen physics segment, identify its mathematical requirements, then draft the necessary segments for inspection. Keep unfinished segments as drafts.

## Choose a segment boundary

Group related concepts and their models into a coherent framework. A new topic or textbook chapter does not automatically require a new segment. Use internal headings where the learning progression can stay within one node. Keep a separate segment when it provides a useful prerequisite boundary or combining the material would make it difficult to navigate. Do not force either a fixed segment count or a chain of artificial prerequisites.

Choose the scope before choosing the title. Use familiar subject terms that identify the main framework; the title need not enumerate every subsection. A model may appear in the title when it is central to the treatment. Do not rearrange approved content merely to fit a new title.

Within a segment, introduce concepts and governing relationships before clearly labelled models and their assumptions. Keep checklists as topics and subtopics. Check coverage against references, distinguishing missing prerequisites from deliberately deferred extensions. Dependencies express required knowledge, not the order in which files were written.

After author review, retain the boundary unless a specific conceptual gap, an actual downstream dependency or an observed navigation problem warrants revisiting it. Record deferred material in the review log. A stylistic preference alone is not a reason to repeatedly rename or restructure settled segments.

## Add a segment

Use a descriptive filename, such as `content/roadmap/physics/atomic-spectra.mdx`:

```yaml
---
title: Atomic spectra
strand: matter
stage: Foundations
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
- `stage` is required and is either `Foundations` or `Advanced`. It describes progression within the segment's strand, not an absolute difficulty or importance ranking. See [Segment stages](roadmap-stages.md) for definitions and current assignments.
- `dependencies` lists required prior-study slugs. It defaults to an empty list; outgoing connections are calculated automatically. A cumulative curriculum can require completion of its preceding segment. List only the direct steps: their requirements are inherited. Classical mechanics currently uses this cumulative structure.
- `follows` optionally names the preceding reading step in the same domain and strand. It controls study order and the connecting line within that strand; it does not add a prerequisite to the detail panel. Cross-strand prerequisite connections remain visible. Without it, the graph follows dependencies as before.
- `draft: true` hides a segment. Published segments cannot depend on drafts.

Reading order must respect prerequisites. Both kinds of links are checked together for cycles. A published segment may follow a draft: the graph skips hidden reading steps, while genuine prerequisites must still be published.

There are no numbered segment codes or manually assigned positions. Adding a valid file adds its node, connections and searchable content.

## Insert material between segments

Suppose `lasers-and-controlled-atoms` depends on `atoms-and-molecules`. To put `atomic-spectra` between them:

1. Create `atomic-spectra.mdx` with `atoms-and-molecules` in its dependencies.
2. Change the relevant dependency of `lasers-and-controlled-atoms` to `atomic-spectra`. Keep any other prerequisites it still needs.

The graph then places atoms before spectra, and spectra before lasers. No existing file needs renumbering. Adding a related topic alone does not make it a prerequisite; add that relationship only when it is needed. For a suggested reading step instead, use `follows` on the new segment and update the next segment’s `follows` link. Keep their actual dependencies unchanged.

## Add a strand

Set a new strand name in a segment's frontmatter, such as `strand: biophysics` in the physics folder. It appears automatically once that segment is published.

Strand groups and colors follow each strand's first appearance in the calculated learning order. An explicit `follows` sequence keeps a strand continuous. Otherwise, a strand can occupy multiple graph lanes: independent paths fork into separate lanes and merge where their prerequisites converge. Lanes can be reused after a path ends. Colors use the site's theme variables in this order: red, orange, yellow, green, teal, cyan, blue, purple, pink. Further strands cycle back to red, then orange, and so on. All segments in a strand share its color. Identically named strands in different domains remain separate lanes. Filtering preserves strand colors and recalculates the lanes for visible paths.

The graph scrolls horizontally within its own area while the text stays beside it. On desktop the graph takes at most half the learning-path width; on mobile the split is always 50–50. Nodes and text share the same vertical progression.

A segment belongs to one visual strand, but can depend on segments from any number of strands. Those dependency edges create the forks and merges.

## How ordering works

### Mathematics within the roadmap

Mathematical segments live in `content/roadmap/mathematics/`. Physics requirements identify which mathematics segments to create. Each mathematics segment should then cover its subject coherently at the chosen level, including standard topics beyond the immediate physics application. Record earlier prerequisites and later extensions in the review log instead of silently omitting them. Strand assignments are chosen as the material develops, using the principles in [Organising a learning roadmap](learning-roadmap-structure.md). The previous strand list is archived and does not constrain new work.

The `strand` field uses lowercase, hyphenated names. The optional `subject` field gives the reader a more specific label; it does not control the domain or graph lane. New strands can be added through frontmatter without a separate collection or color configuration.

The [archived mathematics coverage review](../archive/roadmap/mathematics-coverage.md) can help identify omissions. Use searchable topic names and nested subtopics in checklists. Prerequisites can cross strands and domains; the folders do not imply independent curricula.

### Dependency order

List direct prerequisites. Omit an earlier requirement when it is already guaranteed through a listed dependency. Keep separate links for independent requirements from other branches; being more advanced does not by itself make a segment cover every earlier topic.

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

```

Use What to study to define the segment's scope through topics and subtopics. Omit By the end for now. Challenge problems and possible question-bank pages are deferred until the curriculum is better established; see the review log. Add book or chapter recommendations directly in the body when useful; a References section is optional, and empty placeholders are unnecessary. The panel adds the segment title as an H1 and prerequisites under an H2 above this content. The body renders directly, preserving authored heading levels.

Markdown task lists become checkboxes. Checks are saved in the browser. Their keys use the segment slug and topic text, so rewriting a topic gives it a new key. If browser storage is unavailable, checks remain usable during the visit.

Headings and equations receive segment-specific IDs to prevent collisions. Local links such as `#what-to-study` are scoped automatically. To link to another segment, use `/roadmap#segment-atoms-and-molecules`, or `/roadmap#segment-atoms-and-molecules--what-to-study` for its What to study heading.

When renaming a file, update dependencies, module references and links that use its slug.

## Domain filtering

The learning-path header has All, Physics and Mathematics buttons. All is the initial view. The filter affects only the left-hand graph and its segment count; the selected detail panel, checklist and full prerequisites remain unchanged. A domain with no published segments shows an empty-state message.

Only edges with both endpoints visible are drawn. Hidden nodes are not replaced by invented connections. Choosing a prerequisite outside the active domain switches to All and reveals that segment. Hash navigation, including global-search links and browser back/forward, also reveals the target when necessary. Filter choices are not saved between page visits.

## Scrolling and navigation

The graph follows the normal page scroll. On desktop, the selected explanation stays below the site navigation and scrolls independently. The sticky panel ends with the graph. The global search includes roadmap titles, subjects and body content. Its Roadmap filter limits results to segments; selecting a result opens that segment directly.

On small screens, the path and segment details have separate views. Tapping a different segment highlights it; tapping the selected segment opens its details. The Segment details tab also opens the current selection; “Learning path” returns to the selected row. Search, direct links and browser back work with segment selection.

## Curriculum provenance

The fourteen-segment Classical mechanics curriculum has a separate [coverage audit](classical-mechanics-audit.md), checked against textbooks and institutional syllabuses on 15 September 2026. It records the baseline commit, corrections, deliberate boundaries and outstanding mathematics prerequisites.

The initial 60 segments came from the segmented roadmap drafted on 12 September 2026, informed by the SVNIT, IIT Kanpur, IISER Pune, MIT, Cambridge and Caltech source review. The boundaries and dependencies are editorial choices, not an institutional consensus or a complete source audit. Supporting mathematics stays within the physics curriculum, beginning from a Class 10 baseline.
