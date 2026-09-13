# Browser JavaScript

The header renders its logo animation and theme buttons through Astro. Small native scripts provide the interactions, including automatic and hover logo animation, saved/system themes, and synchronized desktop/mobile controls. Button styling still comes from the shared button component, rendered without hydration.

Search uses the custom `client:search` directive registered in `astro.config.mjs`. It renders the existing trigger immediately, then loads React and the dialog on a click or Ctrl/Cmd+K. The pending request opens the dialog after hydration; React then owns its existing focus, keyboard and search behavior. The directive removes its listeners after hydration or when its page leaves. Incoming islands can exist in a detached document during navigation, so cleanup must distinguish outgoing and incoming pages.

The first search activation now waits for the dialog dependencies to download. Later activations reuse loaded modules. The search engine and index remain deferred until search opens. Keep a browser check for both mouse and keyboard activation after page navigation when changing this flow.

ClientRouter remains in BaseLayout to preserve page transitions. HeadSEO does not declare a second router. The roadmap still hydrates immediately. Its fixed curve geometry is memoized for reuse across selections; precomputing and serializing every curve was tested but added roughly 25 KiB of metadata, so that approach was not retained. Highlighted and inactive strokes still use the same grouping to avoid overlap seams.

## Production measurements

Measured on 13 September 2026 using cold browser visits to production output. These are estimated gzip sizes of fetched external JavaScript, not actual hosting transfer sizes. Shared chunks are counted once per page.

| Page | Before | After |
|---|---:|---:|
| / | 94.6 KiB | 5.8 KiB |
| /roadmap | 98.5 KiB | 80.4 KiB |
| /components/dropdown-menu | 111.8 KiB | 103.9 KiB |

The homepage figures also apply to the tested blog listing, roadmap article and sample note. Inline scripts are separate: ordinary pages changed from about 7.9 KiB to 10.4 KiB uncompressed, carried within the HTML. The main reduction comes from deferring React and the search interface, not from eliminating their behavior. The roadmap still needs React at startup.

Validation covered production builds, Astro and TypeScript checks, unit tests, and browser checks for search opening/reopening, input focus, Escape and focus restoration, page transitions, theme persistence/system changes, mobile navigation, and roadmap selection/hash/checklist persistence. No development server was started for these measurements.
