# Plan: Illustration library expansion + typography softening + Predict redesign

## 1. Expand illustration library (same sticker style)

Generate 8 new PNGs in `src/assets/illustrations/` with the established style: bold deep-green outlines, flat cream/coral/teal fills, cartoon sticker look, transparent background.

New assets:
- `dna-strand.png` — vertical DNA helix
- `test-tube.png` — labeled test tube with bubbles
- `clipboard.png` — clipboard with checklist
- `pill-capsule.png` — two-tone capsule
- `heart-pulse.png` — heart with EKG line
- `lab-flask.png` — round-bottom flask
- `chromosome.png` — X chromosome doodle
- `petri-dish.png` — petri dish top view

Keep existing 4 (`helix-doodle`, `microscope-doodle`, `magnifier-strand`, `helix-check`).

## 2. Fix hero collisions

`src/routes/index.tsx` hero:
- Move floating illustrations OUT of the headline text bounds: confine them to corner zones (`top-4 right-4`, `bottom-8 left-4`) with `max-w-[110px]` on mobile, hidden under `sm`.
- Add `z-0` to illustrations, `z-10` to text content, and `pointer-events-none`.
- Add right-side padding reservation on the headline container (`pr-0 md:pr-40 lg:pr-56`) so text never sits beneath an illustration.
- Apply same pattern to `predict.tsx`, `dashboard.tsx`, `about.tsx`, `performance.tsx`, `history.tsx` — illustrations only in margins/corners, never overlapping a text column.

Sprinkle 2–4 new illustrations per page in safe corner/margin zones for visual richness.

## 3. Rounder, fluffier fonts

`src/styles.css`:
- Swap body font from **Inter** → **Nunito** (rounded humanist sans, weights 400/600/700/800) via Google Fonts import.
- Keep **Titan One** for display.
- Bump base body weight from 400 → 500 for a softer, plumper feel.
- Increase border-radius scale: `--radius` from `0.875rem` → `1.25rem` so all cards/inputs feel rounder.

## 4. Predict page redesign (clarity + symmetry)

Current issues: asymmetric `1fr_1.1fr` grid, dense form, result stack feels random.

New layout (`src/routes/predict.tsx`):

```text
┌─────────────────────────────────────────────────┐
│  Centered hero: eyebrow + headline + subtitle   │
└─────────────────────────────────────────────────┘
┌──────────────────────┬──────────────────────────┐
│  STEP 1 — Inputs     │  STEP 2 — Result         │
│  (cream card)        │  (cream card)            │
│                      │                          │
│  6 fields in 2×3     │  Big prediction label    │
│  symmetric grid      │  Confidence ring center  │
│                      │  Probability bar         │
│  [Generate] [Reset]  │  [Save] [New]            │
└──────────────────────┴──────────────────────────┘
┌─────────────────────────────────────────────────┐
│  STEP 3 — What this means (full-width card)     │
│  Definition + examples in 2-column layout       │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│  STEP 4 — Indicator influence (full-width)      │
│  Horizontal bar chart, centered, max-w-3xl      │
└─────────────────────────────────────────────────┘
```

Key changes:
- Symmetric `lg:grid-cols-2` (equal columns) for the input/result row.
- Numbered "STEP 1/2/3/4" eyebrows on each card for guided flow.
- Empty-state for result panel shows a friendly illustration + "Fill the form to see your result" — never blank.
- Form: 2-column grid on desktop, 1-column on mobile, consistent field height (`h-12`), labels above with optional helper text below.
- Move definition + indicator influence BELOW the fold as full-width sections (so result + form stay aligned at top).
- Add 1 illustration in each empty corner.

## 5. Other pages — light symmetry pass

- `dashboard.tsx`, `performance.tsx`: ensure chart cards use uniform `grid-cols-1 md:grid-cols-2` with equal gaps.
- `history.tsx`: card grid `md:grid-cols-2 lg:grid-cols-3` symmetric.
- `about.tsx`: ensure content max-width and section padding match other pages.

## Files touched

- New: 8 illustration PNGs in `src/assets/illustrations/`
- Edit: `src/styles.css` (fonts, radius)
- Edit: `src/routes/index.tsx` (hero collision fix + more illustrations)
- Edit: `src/routes/predict.tsx` (full redesign)
- Edit: `src/routes/dashboard.tsx`, `performance.tsx`, `history.tsx`, `about.tsx` (illustrations + symmetry)
- Edit: `src/components/FloatingIllustration.tsx` (add safer positioning defaults if needed)

No backend, no API, no hook changes.
