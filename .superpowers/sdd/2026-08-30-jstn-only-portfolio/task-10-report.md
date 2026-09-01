# Task 10: Legacy GSAP removal and dependency cleanup

## Scope

Removed the verified legacy GSAP/Original/Reference source trees and packages from
the isolated `codex/reference-only-implementation` worktree. The current single-mode
shell, UI components, pages, app/data/style modules, local assets, fonts, GPL
license, and Task 9 React renderer dependency were preserved.

## RED

```sh
/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  --test test/runtime-contract.test.js --test-name-pattern='legacy mode|remote hotlinks'
```

Result: expected failure. `src/modes` existed and the new legacy-deletion
contract reported `src/modes must be removed`.

The pre-existing Vite license test was also reproduced before its change. A
phase trace established that `createServer`, `listen`, and each fetch for
`/license?direct=1`, `/LICENSE.txt?download=1`, and `/src/main.jsx` completed.
The hang occurred at `server.close()`: Vite’s automatic dependency-optimizer
crawl remained pending after the `main.jsx` fetch. The old after hook started
`server.close()` without awaiting it, so its asynchronous cleanup could not be
observed as a completed test lifecycle.

The initial full suite after source deletion also failed as expected because
`test/portfolio-data.test.js` still imported the deleted `src/reference/data.js`.
That obsolete facade assertion was removed; the file continues to test the
canonical `src/data/portfolio.js` record.

## GREEN

```sh
TASK_NODE_BIN=/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin
PATH="$TASK_NODE_BIN:$PATH" npm install --package-lock-only --ignore-scripts --no-audit
PATH="$TASK_NODE_BIN:$PATH" npm ci --ignore-scripts --no-audit

/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  --test test/vite-license-route.test.js
/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  --test test/portfolio-data.test.js
! rg -n "ModeSwitcher|Original mode|Reference mode|portfolio-mode|portfolio-reference-path|gsap|lenis|@vercel/analytics" src package.json
! rg -n "https?://[^'\") ]+\.(png|jpe?g|webp|svg|woff2?)" src public index.html
/Users/clyde/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  --test test/*.test.js
PATH="$TASK_NODE_BIN:$PATH" npm run lint
PATH="$TASK_NODE_BIN:$PATH" npm run build
git diff --check
PATH="$TASK_NODE_BIN:$PATH" npm ls react react-dom react-test-renderer --depth=0
```

Results:

- The Vite real-server regression passed and exited naturally in 366 ms. Its
  cleanup now awaits `server.close()`, and its isolated server sets
  `optimizeDeps.noDiscovery: true`; all three route/static/module assertions
  remain unchanged.
- The canonical portfolio-data test passed 7/7.
- Both forbidden-source and remote-media scans returned no matches.
- Full Node suite passed 54/54, with no pending test process.
- ESLint passed and the Vite production build passed with 63 transformed
  modules.
- `react`, `react-dom`, and `react-test-renderer` resolve exactly to `19.1.1`.
- `npm audit --omit=dev --json` reported zero runtime vulnerabilities. The
  full audit still reports 11 inherited development/build-chain advisories: one
  low (`@babel/core`), one moderate (`ajv`), and nine high
  (`brace-expansion`, `flatted`, `js-yaml`, `minimatch`, `nanoid`,
  `picomatch`, `postcss`, `rollup`, and direct `vite`). No audit remediation or
  dependency upgrades were performed.
- `package-lock.json` has no old legacy dependency entries and no `"peer":
  true` markers; the pre-existing nine marker removals remain absent.

## Files and deletions

- Removed `src/App.css`, `src/index.css`, all tracked files in `src/reference/`,
  `src/layouts/`, `src/hooks/`, and the exact preflight legacy component trees:
  `animations`, `global`, `panels`, `section2`, `sections`, plus
  `ContentOverlay.jsx`, `ContinuousBackground.jsx`, `ModeSwitcher.jsx`, and
  `ParallaxLights.jsx`.
- Reduced runtime dependencies to `react` and `react-dom`; retained the aligned
  Task 9 `react-test-renderer` development dependency.
- Removed the Tailwind Vite plugin while retaining the Task 8 `/license`
  middleware.
- Updated current Clyde portfolio metadata and local social image references.
- Replaced dual-mode notice language with the GPL-3.0-only modified public
  interface study notice, local Geist/SIL OFL attribution, and Clyde content
  and asset attribution.
- Extended the runtime deletion/no-hotlink contract and removed the obsolete
  Reference facade test coupling.

## Concerns and boundaries

- No Browser or visual QA was run in this task; that remains a later controller
  checkpoint.
- The passing Node suite still emits upstream informational warnings for
  `baseline-browser-mapping` freshness and React’s deprecated
  `react-test-renderer`; neither was changed because this task forbids unrelated
  upgrades and must preserve the Task 9 behavioral interaction regression.
- The runtime audit is clean, but the inherited full-audit development/build
  advisories above remain. No broad security claim is made for toolchain or
  future registry changes.
