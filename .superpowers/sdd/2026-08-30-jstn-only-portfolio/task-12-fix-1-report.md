# Task 12 Fix 1: Active view selection routing

Date: 2026-09-01
Base commit: `24d467f` (`fix: align shared switch and source fidelity`)

## Finding

The shared `PortfolioShell` view switch persisted the clicked view but unconditionally navigated to `/` on every non-Home route. As a result, clicking the already-active Personal or Professional option on Projects, project detail, or another live route caused an unnecessary route change.

## Implementation

- Added the pure `shouldNavigateHomeForViewChange` behavior helper in `src/app/uiState.js`.
- Updated `PortfolioShell` to compare the normalized clicked view with the active view before navigating. A different view on a non-Home route still persists and returns to Home; selecting the active view persists safely without navigation; Home never redirects.
- Updated the shell contract assertion to protect the shared helper wiring.
- Added regression coverage for changed and unchanged selections across Home and non-Home routes, including project detail.

## Files changed

- `src/app/uiState.js`
- `src/components/shell/PortfolioShell.jsx`
- `test/ui-state.test.js`
- `test/shell-contract.test.js`

## Verification

All checks were run after the implementation change, before commit:

- `node --test test/ui-state.test.js test/shell-contract.test.js` — 13/13 passed.
- `node --test test/*.test.js` — 83/83 passed.
- `npm run lint` — passed with exit code 0.
- `npm run build` — passed with exit code 0. Vite still prints the repository's existing Node 22.11.0 versus Vite's 20.19+ or 22.12+ version advisory.
- `npm run audit:build` — passed with no missing assets, forbidden URLs, unregistered links, or overflow-risk markers.
- `git diff --check` — passed.

No Browser work or final QA capture changes were made in this fix round. The existing untracked `docs/reference-captures/reference` controller captures were preserved and are not part of this change.

## Remaining concern

Visual Browser confirmation of the active-view click behavior remains controller-owned, as requested. The pure regression test covers the route decision independently of JSX structure.
