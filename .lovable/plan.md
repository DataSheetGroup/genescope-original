## 1. Hero section — restore previous layout, fit viewport, asymmetric

Revert `src/routes/index.tsx` hero from the 2-column asymmetric grid back to the **previous centered single-column layout** (eyebrow, headline, paragraph, CTA pills all centered), but:

- Keep it sized so the entire hero fits in ~600px tall viewport: `pt-8 md:pt-12 pb-14 md:pb-20`, no `min-h-[78vh]`.
- Keep `display-xl` clamp small: `clamp(2rem, 5.5vw, 4.5rem)`.
- Trim paragraph `mt-5`, CTAs `mt-6`.
- Re-add the **floating illustrations around the centered text** but in **asymmetric, non-mirrored placements** (different sizes, rotations, vertical offsets — NOT 4 mirrored corners). Example: microscope top-right large, dna-strand mid-left small lower, test-tube bottom-right tiny, helix top-left tiny higher. All `hidden lg:block` with `z-0` behind text container.

## 2. Regenerate all non-matching illustrations to match microscope/helix style

The "reference" look = `microscope-doodle.png` and `helix-doodle.png`: clean cartoon sticker with a **thick white outline trim** (sticker border) around a flat-color illustration, transparent background, generous padding, no cropping.

Regenerate these 8 with one unified prompt emphasizing the **white sticker outline** + matching palette + thick outer trim + transparent bg + 15% padding:

`dna-strand.png`, `test-tube.png`, `clipboard.png`, `pill-capsule.png`, `heart-pulse.png`, `lab-flask.png`, `chromosome.png`, `petri-dish.png`.

Unified prompt: "Flat cartoon sticker illustration of a {subject}, thick white sticker outline border around the entire shape (die-cut sticker look), deep green inner linework (#0F3D2E), flat cream / coral / teal fills matching the GeneScope palette, friendly rounded shapes, centered with ~15% padding on all sides, transparent background, 1024x1024, consistent style with microscope and DNA helix reference."

Also leave `helix-check.png` and `magnifier-strand.png` as-is (already match).

## Out of scope
No routing, data, component-API, or other-page changes. Pure hero layout + asset regeneration.
