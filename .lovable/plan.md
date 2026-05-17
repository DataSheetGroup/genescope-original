## Goal
Replace the editorial green/cream/coral palette with one derived from the GeneScope logo: teal (~#3FB8AF) on the left, deep indigo-purple (~#6B4FBB) on the right, with a soft off-white surface.

## Scope
CSS-only change in `src/styles.css`. No component refactors — every component already consumes semantic tokens (`--primary`, `--accent`, `--background`, `--nav-bg`, `--surface-strong`, `--coral`, `--cream`, `--green-deep`, chart colors, scrollbar). I'll repoint those tokens to the new palette so the whole app picks it up automatically.

## New palette (oklch)
- `--teal`        ≈ oklch(0.72 0.10 190)  — logo teal
- `--teal-deep`   ≈ oklch(0.45 0.09 195)  — dark teal surface
- `--purple`      ≈ oklch(0.55 0.16 295)  — logo purple
- `--purple-deep` ≈ oklch(0.32 0.12 295)  — dark purple surface
- `--ink`         ≈ oklch(0.22 0.05 285)  — near-black indigo for dark bg
- `--paper`       ≈ oklch(0.97 0.01 280)  — off-white with violet tint
- `--gradient-brand`: `linear-gradient(135deg, var(--teal), var(--purple))`

## Token remap

Dark mode (default `:root`):
- `--background` → `--ink`
- `--foreground` → `--paper`
- `--card` / `--popover` → `--paper` (kept light so existing card text stays readable)
- `--primary` → `--purple`, `--primary-foreground` → `--paper`
- `--accent` → `--teal`
- `--muted` → `--purple-deep`
- `--ring` → `--teal`
- Charts: teal, purple, paper, mid-teal, mid-purple
- `--nav-bg` → `--ink`, `--nav-fg` → `--paper`

Light mode (`[data-theme="light"]`):
- `--background` → `--paper`
- `--foreground` → `--ink`
- `--primary` → `--purple`, `--accent` → `--teal`
- `--nav-bg` → `--paper`, `--surface-strong` → `--purple`

Legacy aliases (so existing class names like `.hero-green`, `.slab-cream`, `.pill-coral`, `--coral`, `--cream`, `--green-deep` keep working without touching components):
- `--green-deep` → `--ink`
- `--cream` / `--cream-dim` → `--paper` / slightly dimmer paper
- `--coral` → `--purple` (so coral pills/highlights become purple)
- `--teal-soft` → `--teal`
- `.hero-green` background stays mapped to `--ink`
- `.slab-cream` stays mapped to `--paper`
- Scrollbar: track `--ink`, thumb `--purple`, hover `--teal`

Optional polish: `.hl` highlight uses `--teal` with `--ink` text for better contrast against purple primary.

## Out of scope
- No changes to map tiles, charts data, layout, or component structure.
- Logo image itself untouched.

## Verification
- Build passes (tokens only).
- Spot-check landing, dashboard, navbar in both themes via preview.
