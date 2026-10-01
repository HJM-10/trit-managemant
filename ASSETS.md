# Illustrative service imagery

The original TRST logo, kitchen-tap repair photograph and pipe-wrench photograph are retained from the existing website. See README.md for their source URLs.

The following new assets were created with the built-in image generation tool for this pitch. They are illustrative images, not photographs of TRST staff, actual customers or completed jobs. This distinction is included in the website's prototype information.

| Asset | Brief |
| --- | --- |
| `dist/assets/heating-service.png` | Photorealistic editorial photograph, landscape 3:2, an adult heating engineer in unbranded navy workwear inspecting copper pipework and a white radiator in a tidy utility room. Natural side light, credible tools, focus on hands and hardware. No logos, text or watermark. |
| `dist/assets/drainage-service.png` | Photorealistic editorial photograph, landscape 3:2, an adult drain technician in navy workwear and gloves feeding drain-cleaning equipment into an exterior inspection chamber on a British brick patio. Focus on hands, hose and drain. No sewage, logos, text or watermark. |
| `dist/assets/bathroom-service.png` | Photorealistic interior architecture photograph, landscape 3:2, a contemporary British bathroom concept with basin, glass shower enclosure, deep navy accent tile and natural light. No people, logos, text or watermark. |
| `dist/assets/cooling-service.png` | Photorealistic editorial photograph, landscape 3:2, an adult technician in unbranded navy workwear servicing wall-mounted air conditioning in a modern commercial workspace. Natural daylight and realistic equipment. No logos, text or watermark. |

The animated plumbing schematic is a conceptual service-navigation graphic, not an installation diagram or technical instruction. Its paths are animated in CSS and can be paused. OS reduced-motion preferences disable automatic animation.

## About interior — October 2026

`dist/assets/property-care-interior.png` was generated with the built-in image generation tool for the homepage About section and the About page. It is a generic home-interior concept, not a photograph of a TRST project. Its provenance is explained in the retained “About this prototype” dialog rather than an overlay on the image.

Final generation prompt:

> Use case: photorealistic-natural. Asset type: website About section illustration, generic concept interior, not a real contractor portfolio photograph. Generate one beautiful restrained editorial architectural visualization of a welcoming contemporary British home interior. Portrait 4:5 composition. Foreground on left: refined brushed-chrome curved kitchen tap above pale stone undermount sink with subtle realistic water-free reflections. Navy blue shaker lower cabinetry and pale limestone worktop, no exaggerated luxury. View leads naturally rightward into a bright living/dining space, oak flooring, white traditional radiator beneath a large sash window, a small green indoor plant, warm soft afternoon daylight. Beautiful coherent realistic architectural geometry and hardware. Calm lived-in warmth with very few carefully composed objects. Colors: navy, soft ivory, pale oak and natural green. Mid-distance view, not an extreme tap close-up. Main focal elements within central 75 percent so image works in both portrait and landscape crop. Keep bottom 20 percent visually simple for a small white caption overlay added separately. No people, tools, work crews, logos, signs, lettering, text, badges or watermarks. The mood is thoughtful care for everyday spaces. Avoid glossy mansion real estate styling and excessive decoration.

## Version 4 illustrations

Original SVG illustrations are generated deterministically from `src/illustrations.mjs`:

- `commercial-plumbing.svg`: commercial washroom fixtures and water distribution. Replaces the unrelated cooling-filter image.
- `gas-services.svg`: conceptual meter, isolation valve and copper supply pipe. Replaces generic tools. This is not an installation diagram.
- `step-enquiry.svg`: property and enquiry details.
- `step-plan.svg`: property plan and scope checklist.
- `step-agree.svg`: appointment and agreed details.

All are labelled illustrations, not TRST jobs. Service cards distinguish original-site photographs, AI illustrations and vector illustrations. The original TRST logo was retained in version 4; the approved Option 1 identity below supersedes it. Cooling imagery is now used on the heating and cooling page, where it is relevant.

## Option 1: architectural flow — approved 1 October 2026

The approved house-and-pipe logo is authored as scalable SVG in `src/trst-property-care.svg`, with the matching favicon in `src/trst-mark.svg`. These are copied into `dist/assets/` at build time. The original `trst-logo.jpg` is retained as an archival source.

`dist/assets/architecture-left.png` and `dist/assets/architecture-right.png` were created using the built-in image generation tool with the approved Option 1 mockup as the visual reference. Both are transparent generic architectural illustrations, not photographs or depictions of a TRST project. They are decorative and hidden from assistive technology. See `design/architecture-prompts.md` for the exact generation prompts.
