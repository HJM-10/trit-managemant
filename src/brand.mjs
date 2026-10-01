export const brand = `<a class="brand architectural-brand" href="index.html" aria-label="TRST Maintenance home"><img src="assets/trst-property-care.svg" width="210" height="64" alt="TRST Property Care"></a>`;

// Decorative images are requested only when a desktop gutter can accommodate them.
const emptyImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/%3E'.replaceAll('"', '%22');
export const architecturalFrame = `<div class="architectural-frame" aria-hidden="true"><picture class="architectural-rail architectural-rail-left"><source media="(min-width: 1440px)" srcset="assets/architecture-left.png"><img src="${emptyImage}" width="512" height="1536" alt="" decoding="async"></picture><picture class="architectural-rail architectural-rail-right"><source media="(min-width: 1440px)" srcset="assets/architecture-right.png"><img src="${emptyImage}" width="512" height="1536" alt="" decoding="async"></picture></div>`;
