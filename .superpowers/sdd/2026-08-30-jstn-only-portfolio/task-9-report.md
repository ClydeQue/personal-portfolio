## Task 9 Report

### What I implemented

- Added shared interaction helpers in `src/app/interaction.js`:
  - `nextImageSource(sources, failedIndex)` for deterministic local image fallback progression.
  - `activityYear(years, requested)` for numeric year normalization across string or object inputs while preserving the existing experience keyboard helper export.
- Reworked `src/components/ui/ActivityHeatmap.jsx` to:
  - normalize Home and Experience string-year inputs once at the component boundary,
  - derive year-specific stats from the real deterministic repository snapshot,
  - fall back to the numerically newest available year when the requested one is missing,
  - render calendar cells by week columns and weekday rows,
  - place month labels at the correct week-column boundaries,
  - add a Less-to-More legend,
  - expose an explicit keyboard-focusable horizontal scroll container for small screens.
- Updated `src/components/ui/ImageWithFallback.jsx` so image failures advance through local sources and then land on a neutral text-only fallback surface instead of a broken image icon.
- Tightened interaction/motion lifecycle behavior:
  - `CustomCursor.jsx` now toggles a document-level cursor-hiding class only when the custom cursor is active, so native cursors remain visible for coarse pointers and reduced-motion users.
  - `AmbientCanvas.jsx` now listens for runtime reduced-motion changes and stops or resumes its RAF loop without duplicate scheduling.
  - `ParticlePortrait.jsx` now caches pixel samples, reacts to visibility and reduced-motion changes at runtime, and avoids duplicate RAF loops while preserving the existing top-biased portrait sampling.
  - `BackToTop.jsx` keeps the passive scroll listener and uses reduced-motion-safe scroll behavior explicitly.
- Updated `Footer.jsx` to use the real local mail SVG icon and corrected the modified-work legal copy while preserving Clyde branding, resources, socials, and license access.
- Added `aria-orientation="vertical"` to the Experience tablist in `src/pages/ExperiencePage.jsx` to match the existing Up/Down keyboard model.
- Updated shell/page/responsive CSS for:
  - the new heatmap structure and legend,
  - accessible horizontal mobile overflow instead of clipping,
  - text-only media fallbacks,
  - reduced-motion removal of cursor/canvas animation layers,
  - `max-width: 100%` media safety and explicit `overflow-wrap: anywhere` on long URLs in responsive layouts.

### TDD Evidence

#### RED

- Command:

```bash
/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test test/interaction-contract.test.js
```

- Relevant failing output before implementation:

```text
SyntaxError: The requested module '../src/app/interaction.js' does not provide an export named 'activityYear'
```

- Why the failure was expected:
  - The new pure helper contract was intentionally written first before `activityYear` and `nextImageSource` existed.

#### GREEN

- Command:

```bash
/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test test/interaction-contract.test.js
```

- Relevant passing output after implementation:

```text
✔ image fallback advances locally then returns null
✔ image fallback ignores invalid sources and exhausted indexes
✔ activity selection falls back to the newest available year
✔ activity selection normalizes string years and preserves real matches
✔ activity selection handles unordered and empty year inputs safely
```

### Test and verification results

- Full test suite:

```bash
/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test
```

Result: 50 tests passed, 0 failed.

- Lint:

```bash
PATH=/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH npm run lint
```

Result: passed with no lint errors.

- Build:

```bash
PATH=/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH npm run build
```

Result: production build passed. Output bundles:

```text
dist/index.html                   2.47 kB │ gzip:  0.84 kB
dist/assets/index-BicX7jKV.css   73.60 kB │ gzip: 13.28 kB
dist/assets/index-BVcpaOPL.js   262.17 kB │ gzip: 78.81 kB
```

### Files changed

- `src/app/interaction.js`
- `src/components/shell/AmbientCanvas.jsx`
- `src/components/shell/BackToTop.jsx`
- `src/components/shell/CustomCursor.jsx`
- `src/components/shell/Footer.jsx`
- `src/components/ui/ActivityHeatmap.jsx`
- `src/components/ui/ImageWithFallback.jsx`
- `src/components/ui/ParticlePortrait.jsx`
- `src/pages/ExperiencePage.jsx`
- `src/styles/pages.css`
- `src/styles/responsive.css`
- `src/styles/shell.css`
- `test/interaction-contract.test.js`

### Self-review findings

- No blocking correctness issues found after the final diff and validation pass.

### Issues or concerns

- `package-lock.json` was already dirty before this task and was intentionally left untouched.
- The full test run prints the existing `baseline-browser-mapping` staleness notice from toolchain dependencies, but it does not fail the suite and was not introduced by this task.
