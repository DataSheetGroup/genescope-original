## Goals

1. Replace **every** `@iconify` "fluent-emoji-flat" icon on the dashboard with the 8 uploaded lab/science stickers.
2. Redesign the Philippines map controls so they're easier to scan and use — fewer dense segmented rows, more obvious labels, and a collapsible panel so the map breathes.

---

## 1. Sticker assets

Copy the 8 user-uploaded PNGs into `src/assets/stickers/` and import them as ES modules:

```text
src/assets/stickers/
  microscope.png   ← microscope-removebg-preview-2.png
  molecule.png     ← amino-removebg-preview-2.png
  flask-purple.png ← purple-removebg-preview-2.png
  flask-green.png  ← green-removebg-preview-2.png
  potion-blue.png  ← fire-removebg-preview-3.png
  dropper.png      ← drop-removebg-preview-3.png
  magnet.png       ← magnet-removebg-preview-2.png
  goggles.png      ← glasses-removebg-preview-3.png
```

## 2. Sticker mapping (every emoji → a sticker)

In `src/routes/dashboard.tsx`, replace the `Sticker` helper so it maps semantic names → imported PNGs:

```ts
type StickerName =
  | "records" | "calendar" | "regions" | "dna"
  | "overview" | "geographic" | "demographic" | "institutional" | "temporal"
  | "search" | "filters"
  | "trophy" | "coverage" | "patients" | "female" | "male"
  | "hospital" | "public" | "private" | "growth";
```

Mapping (re-uses the 8 stickers thoughtfully — labs/genetics theme):

| Use case (current icon)                    | Sticker        |
|---                                          |---             |
| TOTAL RECORDS / TOTAL TESTS / CUMULATIVE   | microscope     |
| YEAR COVERAGE                               | flask-green    |
| REGIONS / TOP REGION / COVERAGE / map tab  | potion-blue    |
| DISEASE CATEGORIES                          | molecule       |
| Overview tab                                | microscope     |
| Demographic tab / TOTAL PATIENTS            | molecule       |
| FEMALE SHARE                                | flask-purple   |
| MALE SHARE                                  | flask-green    |
| Institutional tab / FACILITY TYPES / hospital | goggles      |
| PUBLIC                                      | flask-green    |
| PRIVATE                                     | flask-purple   |
| Temporal tab / GROWTH / chart-increasing   | dropper        |
| PEAK YEAR / TOP REGION trophy               | flask-purple   |
| Header search input                         | magnet         |
| Header "Filters" button                     | dropper        |

Update every `<StatCard icon="…">` call and the `TABS` array to use the new semantic names.

## 3. Cleaner, friendlier map controls (`PhilippinesMap.tsx`)

Replace the current dense top-right panel (4 stacked segmented controls + 2 buttons, ~260px tall) with a much calmer two-piece UI:

### Toolbar — bottom-center, pill-shaped

A single horizontal toolbar that hovers above the bottom of the map:

```text
┌──────────────────────────────────────────────────────────────────────┐
│  [● Bubbles] [◇ Choropleth] [≋ Heat]    │    Year: [ All ▾ ]         │
│                                          │    Map:  [ Light ▾ ]       │
│                       [ Reset ]  [ ⤢ Expand ]                        │
└──────────────────────────────────────────────────────────────────────┘
```

- Visualization mode = 3 clearly-labeled pill buttons with small inline icons (active pill filled with `--ink`, inactive transparent). This is the most important control, so it gets the most space.
- Year + Basemap collapse into compact native-styled dropdowns (real `<select>` for accessibility, restyled to match the card hairlines). Year dropdown is hidden when `regionByYear` is empty.
- Reset + Expand are right-aligned ghost buttons.
- Metric switcher (Total / Targeted / Comprehensive / Share) moves into a **secondary "Layers"** drawer (see below) — most users never need it, so it shouldn't crowd the primary toolbar.

### Layers drawer — top-right, collapsible

Single small button labeled `LAYERS` in the top-right. Clicking it slides out a clean panel containing:
- Metric switcher (4 options, as a vertical radio list with descriptions like "Total records" / "Targeted only").
- Closed by default → map looks calm and uncluttered. Persists during the session via local component state.

### Detail card

Keep the "selected region" card but move it to **top-left** with friendlier copy and a small sticker (potion-blue) in the header so it visually ties to the map.

### Legend

Keep at bottom-left, but shrink it to a single line: `[gradient bar] 0 — 184  ·  Total records · All years` so it reads as a caption, not a panel.

### Affordances

- Add a subtle one-line helper *under* the map ("Click an island group for details · scroll to zoom") so users know what's interactive — replaces having to discover via the dense panel.
- Bump map height from `600px` to `640px` on desktop now that floating UI is lighter.

### What's removed

- The 260px floating control card.
- The cramped 11px font in segmented controls.
- Two of the segmented rows (Metric moves to drawer; nothing else changes behavior).

## 4. Files touched

- `src/routes/dashboard.tsx` — swap `Sticker` helper to import PNGs, rename every `icon=` prop, replace the two header `<Icon>` calls.
- `src/components/PhilippinesMap.tsx` — replace top-right control panel with bottom toolbar + collapsible Layers drawer; relocate detail card; shrink legend; add helper caption.
- `src/assets/stickers/*.png` — 8 copied PNG files.

## Out of scope

- Color tokens, fonts, navbar, other tabs' charts, data layer, backend.
- No new dependencies.
