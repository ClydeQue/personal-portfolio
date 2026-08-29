# Task 2 report: GPL compliance and mode shell

## Delivered

- Added the complete GPL-3.0 license text in `LICENSE`.
- Added `NOTICE.md`, identifying `JustineDevs/Portfolio` as the JSTN upstream
  and documenting the adapted JSTN boundary.
- Added a fixed `ModeSwitcher` with native buttons, accessible mode labels,
  `aria-pressed` state, keyboard focus styling, and 44 px minimum targets.
- Refactored `App` so it owns the active mode, safe browser storage access,
  History API transitions, and back/forward synchronization. It renders only
  the JSTN lazy seam or the pre-existing Original desktop/mobile layout.
- Added the intentionally minimal lazy `src/jstn/JstnMode.jsx` mount seam for
  Task 3 to replace with the full visual implementation.
- Extended the pure routing contract and its Node tests for unavailable or
  throwing storage, stored route restoration, deep-link preservation when
  returning to Original, and JSTN route restoration.

## Behavior

- The root defaults to Original mode.
- A public JSTN path is inferred as JSTN when no saved mode is present.
- Mode changes persist `portfolio-mode` and `portfolio-jstn-path` when
  storage is available, without failing in privacy-restricted contexts.
- Changing modes uses `history.pushState`, never a full page reload.
- Switching from a JSTN deep path to Original preserves that path and restores
  it when the user switches back to JSTN.

## Verification evidence

- TDD red: `node --test test/mode-routing.test.js` initially failed because
  the required environment and transition contract exports were absent.
- TDD green: the focused test then passed all 10 tests.
- Final checks: `node --test` passed 10/10; `npm run lint` exited 0;
  `npm run build` exited 0; `git diff --check` exited 0.
- Browser smoke check: Vite served both `/` and
  `/projects/suntastic-solar-ims` with HTTP 200. In a real browser, the
  Original and JSTN buttons exposed the expected accessible labels and pressed
  state; switching back restored the original portfolio DOM.

## Boundaries and concerns

- This task deliberately leaves the JSTN visual content as a small mount seam;
  Task 3 owns the replacement implementation in `src/jstn/JstnMode.jsx`.
- Vite emitted its existing advisory that Node 22.11.0 is below its stated
  22.12.0 patch requirement, plus its large-chunk advisory. The production
  build still completed successfully.
- Existing unrelated changes remain unstaged: `package-lock.json`, `docs/`,
  and `.playwright-cli/`.

## Fix round 1: review follow-up

### Changes

- Unknown non-root paths now infer JSTN mode while `normalizeJstnPath` maps
  them to the JSTN home route. `/` remains the only no-storage default for
  Original mode.
- `Analytics` mounts only while Original mode is active, so the JSTN branch
  does not mount the Vercel analytics integration.
- A saved JSTN deep path restored from `/` replaces the browser URL with that
  path using `history.replaceState`; this avoids a duplicate history entry.
- Added the package metadata field `"license": "GPL-3.0-only"`.

### Verification evidence

- TDD red: `node --test test/mode-routing.test.js` produced 9 passing tests
  and 1 expected failure because `/missing` still resolved to Original.
- TDD green: the same focused command passed 10/10 after the routing change.
- Final commands and results:
  - `node --test` — exit 0, 10 tests passed, 0 failed.
  - `npm run lint` — exit 0.
  - `npm run build` — exit 0; Vite built 139 modules successfully.
  - `git diff --check` — exit 0.

### Remaining concern

Vite continues to warn that the installed Node 22.11.0 is below its stated
22.12.0 patch requirement and reports the existing large-chunk advisory. The
build completed successfully.
