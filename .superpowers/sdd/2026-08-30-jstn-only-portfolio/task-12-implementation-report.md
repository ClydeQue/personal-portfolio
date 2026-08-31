# Task 12 implementation report

Date: 2026-09-01

## Changes

- `src/components/shell/Header.jsx`: keep the Personal/Professional switch in
  the shared desktop header for every shell route, matching the live reference
  on Projects and project-detail pages.
- `src/components/shell/MobileMenu.jsx`: keep the same switch in the mobile
  menu on every route, close the menu before applying a selection, and remove
  the obsolete Home-only route condition.
- `src/components/shell/PortfolioShell.jsx`: persist a selected view from the
  shared shell and navigate to `/` when a different view is chosen away from
  Home, preserving the live-reference behavior confirmed by the controller.
- `src/styles/pages.css`: correct the measured Projects heading values
  (64px/700/80px/-1.6px at desktop), restore compact Collection source-note
  typography, remove the inversion that made the native white dark-CTA arrow
  render black, and give the Professional surface the source-like white paper
  tone.
- `src/styles/shell.css`: remove the blue/gray outlined cursor treatment and
  render the two existing cursor layers as a single overlapping solid gray
  square; preserve the reduced-motion and pointer-event safeguards. Remove
  the incorrect header arrow inversion.
- `test/shell-contract.test.js`: update the shared-switch contract and add
  focused assertions for the source-derived typography, cursor, collection,
  professional-panel, and arrow corrections.

## Verification

All commands were run from the isolated worktree:

- `node --test test/shell-contract.test.js`: 3 passed.
- `npm run lint`: passed with no ESLint errors.
- `node --test test/*.test.js`: 82 passed, 0 failed.
- `npm run build`: passed. Vite emitted its existing Node 22.11 versus
  22.12+ compatibility warning, but transformed 65 modules and produced the
  distribution successfully.
- `npm run audit:build`: passed with no missing assets, forbidden URLs,
  unregistered links, or overflow-risk markers.
- `git diff --check`: passed.

## Remaining concerns

- This worker did not use the in-app Browser. The controller must perform the
  required same-state desktop/mobile visual comparisons and interaction matrix,
  including the shared switch on Projects and project details, before final
  acceptance.
- The source's native `arrowdiagonal.svg` is already white, so the fix removes
  the CSS inversion rather than changing the asset.
