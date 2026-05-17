## Goal

Make `/dashboard` feel solid and editorial — same brand language as the Phamily Pharma site (and your home page): deep ink background, cream surfaces, **one** confident accent, Bagel Fat One for display, Fredoka for body. No gradient washes, no glow blobs, no rainbow charts.

## What changes

### 1. Kill the "trying too hard" visuals
- Remove the teal→purple gradient on the active tab pill, on the volume bars, and on the cumulative area fill.
- Remove the decorative blurred blob in the corner of every `Card`.
- Remove the soft drop shadows on header chips.
- One accent color per surface — no 5-color pie/bar palettes. Charts get **ink + a single accent** (Targeted = ink, Comprehensive = accent), categorical bars all share one color.

### 2. Solid color system on the dashboard
- Page background: `--paper` (cream), not the global ink — gives the dashboard a flat editorial feel like Phamily's green slab.
- Cards: flat white on cream, hairline border in `ink/12`, no shadow, no blob.
- Accent: pick **one** — recommend keeping `--purple` as the single dashboard accent (matches the logo without going pastel). Teal demoted to neutral support.
- Tabs: flat pill row, active = solid ink fill + cream text, inactive = transparent with ink/70 text. No gradient.

### 3. Typography — Phamily style
- Phamily uses a fat rounded display face for the logo (you already have **Bagel Fat One**) and a rounded geometric sans for UI (you already have **Fredoka**). Same stack, just used more consistently.
- Apply **Bagel Fat One** to: dashboard H1 (already), all `Panel` titles, all tab labels, table column headers, KPI big-number (already).
- Body / labels / table cells: **Fredoka** 500–600, slightly tighter tracking.
- Drop the all-caps `tracking-[0.14em]` micro-labels — replace with normal-case Bagel Fat One small caps feel via the display font at 11–12px.

### 4. Layout cleanup
- Header: single row on desktop, stacks cleanly on mobile. Search + Filter move into a compact toolbar **under** the tab row (where they belong on a dashboard), not floating beside the title.
- Tab bar: horizontal scroll on mobile (current wraps look messy at 634px), 44px tall pills, even spacing.
- Grid: standardize on a 12-col mental model — KPI row = 4 equal cards, content blocks below in 6/6 or 8/4 splits. Remove the awkward 1.6fr/1fr Geographic split — use 7/5.
- Spacing: section gap `gap-6`, card padding `p-6`, chart height `h-72` for everything (currently jumps between 260/300/320).
- Facility table: zebra rows, sticky header, right-align numeric columns (already partial), remove the colored sector pills — replace with a quiet dot + label.

### 5. Chart polish
- Single accent (`--purple`) for all single-series bars/pies.
- Two-series charts: `--ink` (Targeted) + `--purple` (Comprehensive). Legend dots match.
- Axis ticks: Fredoka 11px, ink/60.
- Gridlines: 1px solid `ink/8`, no dashes.
- Tooltips: cream bg, ink text, 1px ink border, square corners feel — keep 12px radius but drop the dark fill.

## Files touched

- `src/routes/dashboard.tsx` — full restyle of `Card`, `StatCard`, `Panel`, `TabBar`, header, all four tabs, table.
- `src/styles.css` — add a `.font-display` application to panel/tab headings is already available; no token changes unless you want me to also calm the home-page palette (out of scope unless you say so).

## What I won't touch (unless you ask)

- Home page, Predict page, Performance page, Navbar — same visual language stays.
- The local-data engine, charts data shape, tab structure (Overview / Geographic / Demographic / Institutional / Temporal stays).
- Color tokens in `styles.css` — I'll just use `--ink`, `--paper`, `--purple` more strictly inside the dashboard.

Approve and I'll rewrite `src/routes/dashboard.tsx` in one pass.