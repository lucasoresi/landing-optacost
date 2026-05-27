# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the project

This is a **zero-build** project — no npm, no bundler, no compilation step. Open `index.html` directly in a browser, or serve it with any static file server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

## Architecture

This is a single-page marketing landing for **Optacost** (a cost-analytics SaaS for Argentine clinical labs), built with React 18 + Babel loaded from CDN. There is no module system: every `src/*.jsx` file declares global functions/variables consumed by later files.

### Script load order (defined in `index.html`)

All files are loaded as `<script type="text/babel">` in this order:

1. `tweaks-panel.jsx` — exports `useTweaks`, `TweaksPanel`, and all `Tweak*` controls to `window`
2. `src/i18n.jsx` — sets `window.I18N` (bilingual ES/EN copy object)
3. `src/icons.jsx` — SVG icon components as globals
4. `src/dashboard.jsx` — mock dashboard UI used inside `Hero`
5. `src/nav.jsx` through `src/cta.jsx` — one React component per landing section
6. `src/tweaks.jsx` — `Tweaks` component (the live-edit panel wired to section tweaks)
7. `src/app.jsx` — `App` root component; mounts with `ReactDOM.createRoot`

### Tweaks / live-edit system

`window.TWEAK_DEFAULTS` in `index.html` (between `/*EDITMODE-BEGIN*/` and `/*EDITMODE-END*/`) holds the persisted config blob. `useTweaks(defaults)` from `tweaks-panel.jsx` is the state hook; `setTweak(key, value)` updates state and posts `__edit_mode_set_keys` to the parent window so a hosting tool can rewrite the `EDITMODE` block on disk.

Current tweak keys: `lang`, `accent`, `density`, `heroLayout`, `headline`, `showLogos`, `showPricing`, `showFAQ`, `showSecurity`, `serifAccents`, `darkHero`.

### Theming

CSS variables in `styles.css` define the palette. `App` writes three data attributes to `<html>`:

- `data-accent` → `azul | verde | ambar | violeta` (overrides `--accent*` variables)
- `data-density` → `compact | regular | comfy` (adjusts `--c-pad`)
- `data-serif` → `on | off`

### Internationalisation

All user-facing copy lives in `src/i18n.jsx` under `window.I18N.es` and `window.I18N.en`. Components receive the resolved dictionary as prop `t`. To add or change copy, edit only `i18n.jsx`; both language keys must stay in sync.

### Section visibility

`showPricing`, `showFAQ`, and `showSecurity` are boolean tweaks that gate rendering in `App`. Sections not in the toggle list (`Hero`, `Benefits`, `Tour`, `Convenios`, `Social`, `CTA`) are always rendered.
