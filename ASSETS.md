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

## Version 4 illustrations

Original SVG illustrations are generated deterministically from `src/illustrations.mjs`:

- `commercial-plumbing.svg`: commercial washroom fixtures and water distribution. Replaces the unrelated cooling-filter image.
- `gas-services.svg`: conceptual meter, isolation valve and copper supply pipe. Replaces generic tools. This is not an installation diagram.
- `step-enquiry.svg`: property and enquiry details.
- `step-plan.svg`: property plan and scope checklist.
- `step-agree.svg`: appointment and agreed details.

All are labelled illustrations, not TRST jobs. Service cards distinguish original-site photographs, AI illustrations and vector illustrations. The original TRST logo is unchanged. Cooling imagery is now used on the heating and cooling page, where it is relevant.
