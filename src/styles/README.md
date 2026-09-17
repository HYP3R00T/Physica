# Styles

`global.css` is the stylesheet entry point, imported by `HeadSEO.astro`.
It loads Tailwind, shared styles and component styles in one place.

- `theme.css`: light and dark tokens, plus Tailwind theme mappings.
- `base.css`: element defaults, scrollbars and reduced-motion preferences.
- `layout.css`: site frames, section boundaries and reading focus mode.
- `prose.css`: rendered Markdown, callouts, tables and equations.
- `code.css`: code blocks, syntax colours and copy controls.
- `utilities.css`: shared typography helpers.
- `components/`: named stylesheets for individual components.

Keep Tailwind classes in markup. Put additional CSS in the relevant stylesheet.
Use component-specific classes or data attributes because imported CSS is global,
unlike Astro's scoped style blocks. Keep calculated dimensions and colours inline.

Preserve cascade layers when moving rules. Base defaults and prose currently use
`base`, shared site components use `components`, and typography helpers use
`utilities`. Unlayered rules retain their existing priority, including code styles. Moving a rule into a layer can change which declaration wins.

Font styles are imported by `HeadSEO.astro`. KaTeX's own stylesheet is imported by
the layouts and pages that render mathematics.

Prose selectors exclude KaTeX wrappers and their descendants. Leave math sizing
and internal layout to KaTeX. Do not add blanket resets inside math, since those
would also reset styles that KaTeX needs. Surrounding text colour and size can
still be inherited, as intended by KaTeX.
