# TRST Maintenance — multi-page website prototype

A responsive, interactive pitch website designed and developed by [Atarion Solutions](https://atarionsolutions.com/).

The design uses the approved Option 1 house-and-pipe logo and architectural illustrations in a navy-and-blue visual system with dedicated pages, purposeful motion and a clearer enquiry journey. This is an independent concept, not TRST's official website.

## Run locally

Requires **Node.js 20.11+**. No package installation is necessary.

```sh
npm run build
npm start
```

Open **http://127.0.0.1:4173/**. You can also open `dist/index.html` directly in a modern browser; page links and local assets use relative paths.

On Windows, keep the preview running independently of a terminal session:

```sh
npm run preview:background
```

This starts Node in a hidden background process, checks readiness and reuses an already running TRST preview. It must be started again after a reboot. If a cached homepage is visible but links fail with connection refused, the preview server has stopped: run this command, then reload the browser. Logs are `preview.log` and `preview-error.log` and are excluded from Git.

```sh
npm run check
```

Checks syntax, all 13 pages, local page/asset/anchor references, approved logo, footer credits, active navigation and demo-only form handling.

## Pages

| Page | File |
| --- | --- |
| Home | `dist/index.html` |
| About | `dist/about.html` |
| Services and interactive service map | `dist/services.html` |
| How it works | `dist/process.html` |
| Customer feedback | `dist/reviews.html` |
| Searchable FAQs | `dist/faq.html` |
| Contact | `dist/contact.html` |
| Plumbing & repairs | `dist/service-plumbing-repairs.html` |
| Heating & cooling | `dist/service-heating-cooling.html` |
| Drain cleaning & repairs | `dist/service-drain-repairs.html` |
| Commercial plumbing | `dist/service-commercial-plumbing.html` |
| Bathroom & remodelling | `dist/service-bathroom-remodelling.html` |
| Gas line services | `dist/service-gas-line-services.html` |

## Interactions and accessibility

- Page entrances, scroll reveals, floating details, hover feedback and reading progress, respecting `prefers-reduced-motion`.
- Photographic service cards and service-page heroes, including new illustrative heating, cooling, drainage and bathroom imagery.
- Homepage photo slideshow with manual selection and pause/play; it pauses on hover, keyboard focus and hidden browser tabs.
- Plumbing-specific animated flow diagram and valve, with a pause control.
- Homepage three-step accordion with slide-down panels and an animated step number.
- Homepage switches between home and business messaging.
- Service filters with a live result count.
- Three-stage project guide with click, arrow key, Home and End support.
- FAQ search with matching, empty and reset states.
- Native modal quote form with validation, service preselection, previous/next steps and a demonstration confirmation.
- Active navigation, breadcrumbs, mobile menu and persistent mobile call/quote actions.
- Semantic landmarks, labelled inputs, native dialogs, keyboard focus indicators and skip navigation.
- Navigation and service content remain in static HTML without JavaScript.

## Editing

### Version 4 refinements

- Water-blue, navy and copper palette; larger supporting text, labels and FAQ answers.
- Home/business controls, linked benefit cards and service cards share hover and keyboard-focus movement, lighting and graphic feedback.
- Three process scenes change with the selected step; arrow keys, Home and End work on the homepage steps.
- FAQs animate both ways with a pipe-and-water detail. Topic filters combine with search and reset together.
- Dedicated repair and drain guides, heating/cooling comparison, commercial facilities checklist, bathroom priority selector, gas enquiry guidance, review-reading prompts and a contact brief.
- All new UI motion honours reduced-motion preferences. Quote data remains in memory only and is cleared when the modal closes.

The new implementation lives in `src/refinements.mjs` (page content), `src/refinements.css` (design system), `src/refinements.js` (interactions), and `src/illustrations.mjs` (vector assets).

- `build.mjs`: page content, route definitions and shared generated shell.
- `src/template.html`: homepage and shared modal/icon template; the builder replaces its header and footer.
- `src/app-original.js`: retained first-version service-data source, never delivered to browsers.
- `src/app.js`: shared interactive behavior.
- `src/styles.css`: base visual system.
- `src/enhancements.css`: page layouts, logo styling, responsive refinements and motion.
- `src/visuals.mjs`, `src/visuals.css`, `src/motion.js`: service photography, plumbing graphic, slideshow and expanding process steps.
- `dist/assets/`: original logo and photographs from the existing website.
- `scripts/check.mjs`: static integrity checks.
- `AGENTS.md`: persistent project preferences, including the Atarion Solutions URL.

Run `npm run build` after editing. Generated `dist` files are committed for build-free static deployment.

## Static hosting

`vercel.json` explicitly selects the Other/static framework, runs the build and publishes `dist`. It defines no function or catch-all route. This configuration is prepared for the future deployment investigation; the Vercel runtime exception has not been inspected or a live fix verified. The existing deployment returned `500 FUNCTION_INVOCATION_FAILED` on 30 September 2026. Vercel work was deferred at the user's request.

Publish the **contents of `dist/`** with any static web host. Each page has its own HTML file; no API server or SPA fallback is required. For build settings, use `npm run build` and output directory `dist`.

`server.mjs` is a local loopback preview server, not a production backend. Google Fonts have system-font fallbacks. Pages have `noindex,nofollow` while this is a pitch concept.

## Demonstration boundaries

The quote form **does not send or persist data**. It displays an on-page preview and clears entered details when closed. Phone and email links use the published business details and can contact the actual business when chosen.

The Reviews page awaits genuine feedback and contains no invented customers, quotes or ratings. Confirm operating hours, coverage, qualifications, prices and service descriptions before launch. Gas-related work needs confirmed scope and qualifications. The original logo and photos are reused for this pitch; production reuse rights need confirmation. Additional service images are AI-generated illustrations. No photo is represented as a verified TRST project. See `ASSETS.md` for asset provenance and generation briefs.

Before production: approve copy, provide authorised photography and reviews, connect and secure the enquiry backend, approve a privacy notice, and decide on indexing and analytics. See `PITCH.md` for the pitch narrative.

## Sources and credit

- Website: https://trst-maintenance.co.uk/
- Logo: https://trst-maintenance.co.uk/wp-content/uploads/2025/08/cropped-cropped-cropped-cropped-logo.jpg
- Repair photo: https://trst-maintenance.co.uk/wp-content/uploads/2020/08/plumber-handyman-repair.jpg
- Tools photo: https://trst-maintenance.co.uk/wp-content/uploads/2020/08/plumbing-pipe-wrench.jpg

**Designed & developed by [Atarion Solutions](https://atarionsolutions.com/).** This credit appears on every page and is retained in project instructions.

## Approved architectural direction (1 October 2026)

Option 1 is implemented through `src/brand.mjs`, `src/trst-property-care.svg`, `src/trst-mark.svg`, `src/architecture.css` and `src/architecture.js`. The original logo asset remains archived. Decorative transparent illustrations frame the outer margins on screens at least 1440px wide; they never enter the 1280px content column. The picture sources avoid downloading these assets on smaller screens.

Artwork moves only in response to scrolling, capped at 70px on the left and 45.5px on the right. Reduced-motion preferences disable the effect, including when changed while the page is open. All earlier About, footer and contact-page improvements are retained.
