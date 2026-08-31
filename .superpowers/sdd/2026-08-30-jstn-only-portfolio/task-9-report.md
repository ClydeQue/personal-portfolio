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

## Review Fix 1

### What I changed

- Fixed the Task 9 P1 integration defect in `src/components/ui/ActivityHeatmap.jsx` by mapping normalized year records with `entry` instead of the nonexistent `value` field before calling `activityYear(...)`.
- Added component-boundary regression coverage in `test/interaction-contract.test.js`:
  - a rendered-markup test that proves unordered string input `['2025', '2026']` initially selects the numerically newest year, `2026`,
  - a boundary wiring test that verifies the selected-year summary/stats and the year-button `aria-pressed` / `setRequestedYear(candidateYear)` path remain connected in the component source.
- Kept the existing Task 9 implementation intact outside this focused integration fix.

### Fix verification

- Focused regression:

```bash
/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test test/interaction-contract.test.js
```

Result: 7 tests passed, 0 failed.

- Full suite:

```bash
/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test
```

Result: 52 tests passed, 0 failed.

- Lint:

```bash
PATH=/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH npm run lint
```

Result: passed.

- Build:

```bash
PATH=/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH npm run build
```

Result: passed.

## Review Fix 2

### Root cause

- The first attempt at the new component-boundary regression used `react-test-renderer` with `await act(async () => ...)` inside a generated harness bundle.
- The assertions completed, but the focused `node --test` process stayed alive with open `MessagePort` handles and exited only when interrupted. A bounded diagnostic run showed:
  - all Task 9 assertions passing,
  - active handles `["Socket","Socket","MessagePort","MessagePort","MessagePort"]`,
  - Node cancelling the file with `Promise resolution is still pending but the event loop has already resolved`.
- The root cause was the async `act(...)` usage in a fully synchronous interaction path, not the ActivityHeatmap state update itself.

### What I changed

- Replaced the pseudo-click/source-regex coverage with a real stateful component interaction harness in `test/interaction-contract.test.js`.
  - It renders `ActivityHeatmap` with unordered string input `['2025', '2026']`.
  - It proves the initial selected year is `2026`.
  - It triggers the year button click for `2025`.
  - It verifies `aria-pressed`, the summary text, and the displayed 2025 metrics all update after the real click.
- Kept the harness stateful but changed it to synchronous `act(() => ...)` so the focused Node test exits normally.
- Added `particlePointerOffset(...)` in `src/app/interaction.js` and wired `ParticlePortrait.jsx` to actual pointer movement so particles react to cursor position while preserving:
  - reduced-motion opt-out,
  - existing RAF lifecycle behavior,
  - cleanup of pointer listeners on unmount.
- Kept the pointer coverage focused:
  - pure helper contract coverage for offset math,
  - source-level guard verification for the reduced-motion and pointer listener wiring.
- Removed the prior repo-local temp bundle path. The exact Task 9 temp artifact `.tmp/activity-heatmap-test` is no longer present.
- Kept generated harness files in OS temp space and cleaned them after each run.

### GitHub contributions requirement status

- The current Task 9 heatmap still uses the local portfolio activity snapshot interface already present in the codebase.
- There is no clean in-scope live GitHub contribution integration surface yet in this task. The missing pieces are:
  - source-of-truth choice for contribution data,
  - fetch/auth boundary,
  - caching/failure fallback behavior,
  - normalization contract into the existing ActivityHeatmap year-entry shape.
- Honest next path: a bounded follow-up task should define the data source and adapter contract first, then wire that adapter into the existing component interface without mixing data redesign into this review fix.

### Fix verification

- Focused regression:

```bash
/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test test/interaction-contract.test.js
```

Result: 8 tests passed, 0 failed. Process exited normally.

- Full suite:

```bash
/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test
```

Result: all Task 9 and existing suite assertions passed before the run stalled in the pre-existing `test/vite-license-route.test.js` file with:

```text
Promise resolution is still pending but the event loop has already resolved
```

This happened outside the Task 9 focused regression file after the new focused harness had already been proven to exit cleanly.

- Lint:

```bash
PATH=/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH npm run lint
```

Result: passed.

- Build:

```bash
PATH=/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH npm run build
```

Result: passed.

### Ownership notes

- `package.json` and `package-lock.json` are now Task 9-owned for the added `react-test-renderer` dependency needed for the stateful regression.
- I limited lockfile churn to the install required to reconcile that dependency under the Node 24 runtime.
