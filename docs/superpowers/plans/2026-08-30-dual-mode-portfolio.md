# Dual-Mode Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Preserve the existing Clyde portfolio as `Original` and add a Clyde-branded, GPL-compliant Reference-derived public portfolio mode with persistent switching and verified routes.

**Architecture:** Keep the existing Vite entrypoint and layouts intact behind an app-level mode boundary. Add a small history-api router and a self-contained `src/reference` component/data/style boundary so the new mode cannot destabilize the current layout. Use GSAP for lightweight entrance/reveal motion, with native CSS and reduced-motion fallbacks.

**Tech Stack:** React 19, Vite 7, GSAP 3, existing Lenis/asset stack, Node test runner, Playwright CLI.

**Spec:** `docs/superpowers/specs/2026-08-30-dual-mode-portfolio-design.md`

## Global Constraints

- Keep the current Original layout and assets working.
- Use only Clyde's truthful content and local assets in the adapted mode.
- Preserve GPL-3.0 license terms and add upstream attribution/modification notice.
- Exclude admin/CMS/auth/database/engagement/analytics/scheduling integrations.
- Keep all interactive controls keyboard accessible and respect reduced motion.

### Task 1: Define and test the mode/route contract

**Files:**
- Create: `test/mode-routing.test.js`
- Create: `src/modes/modeRouting.js`

**Interfaces:**
- `normalizeReferencePath(pathname)` returns one of the six public Reference paths.
- `modeFromLocation({ pathname, savedMode })` returns `original` or `reference`.
- `modeStorageKey`, `referencePathStorageKey`, and `referenceRoutes` are exported constants.

- [ ] Write tests for root/default mode, saved mode, deep-link inference, valid project slugs, and unknown-path fallback.
- [ ] Run `node --test test/mode-routing.test.js` and observe the expected missing-module failure.
- [ ] Implement the pure routing functions with no DOM dependency.
- [ ] Re-run the focused test and then the full test command.
- [ ] Commit the routing contract.

### Task 2: Add GPL compliance and shared mode switching

**Files:**
- Create: `LICENSE`
- Create: `NOTICE.md`
- Create: `src/components/ModeSwitcher.jsx`
- Modify: `src/App.jsx`
- Modify: `src/index.css`

**Interfaces:**
- `ModeSwitcher({ mode, onChange, compact })` renders two buttons and emits the selected mode.
- `App` owns mode persistence and renders exactly one active experience.

- [ ] Add the full GPL-3.0 text and a notice identifying the Reference-derived files and upstream repository.
- [ ] Write/extend tests for storage-safe mode initialization and switch behavior through the pure contract.
- [ ] Add the switcher with `aria-label`, `aria-pressed`, keyboard-native buttons, and touch-safe dimensions.
- [ ] Refactor `App` so Original continues to select desktop/mobile layouts and Reference mounts through a lazy boundary.
- [ ] Run lint/build and manually verify Original remains visually unchanged.
- [ ] Commit compliance and mode shell.

### Task 3: Build the Reference shared shell, data, and home route

**Files:**
- Create: `src/reference/data.js`
- Create: `src/reference/ReferenceMode.jsx`
- Create: `src/reference/reference.css`
- Create: `src/reference/components/ReferenceHeader.jsx`
- Create: `src/reference/components/ReferenceFooter.jsx`
- Create: `src/reference/components/EditorialPanel.jsx`
- Create: `src/reference/pages/HomePage.jsx`

**Interfaces:**
- `ReferenceMode` receives `onExit` and renders the active route.
- `ReferenceHeader` receives `{ path, onNavigate, onExit }`.
- `ReferenceFooter` receives `{ onNavigate }` and includes GPL attribution.
- `projects`, `experience`, and `techStack` are immutable exported data.

- [ ] Add data mapped to Clyde's existing local images and verified career/project facts.
- [ ] Port the reference hierarchy: bordered hero, associated strip, tech/description split, featured projects, activity/proof panels, and footer.
- [ ] Add a GSAP context hook for one-time reveal classes and a no-animation branch for reduced motion.
- [ ] Add internal-link handling through the router callback.
- [ ] Run lint/build and inspect the route at desktop/mobile widths.
- [ ] Commit the Reference shell/home.

### Task 4: Add public subroutes and project detail views

**Files:**
- Create: `src/reference/pages/AboutPage.jsx`
- Create: `src/reference/pages/ProjectsPage.jsx`
- Create: `src/reference/pages/ProjectDetailPage.jsx`
- Create: `src/reference/pages/ExperiencePage.jsx`
- Create: `src/reference/pages/CollectionPage.jsx`

**Interfaces:**
- Each page receives `{ onNavigate }` and uses shared data/primitives.
- `ProjectDetailPage({ slug, onNavigate })` renders a safe fallback when a slug is unknown.

- [ ] Add About story/strengths, Projects grid, and stable `/projects/:slug` details.
- [ ] Add Experience timeline/proof cards and Collection categories based on Clyde's actual work.
- [ ] Ensure every internal link resolves to one of the six normalized routes.
- [ ] Run focused route smoke checks and lint/build.
- [ ] Commit public routes.

### Task 5: Regression, visual, and accessibility verification

**Files:**
- Create: `test/portfolio-runtime.test.js`
- Modify: `package.json` only if a test script is needed.

- [ ] Add pure assertions for all route slugs and mode persistence keys.
- [ ] Run `npm run lint` and `npm run build` from a clean working tree state.
- [ ] Start `npm run dev -- --host 127.0.0.1` and use Playwright at 1440x1000 and 390x844.
- [ ] Verify Original and Reference mode switching, reload persistence, all public routes, one project detail, keyboard focus, reduced-motion media, no horizontal overflow, no blocking console errors, and no broken internal links.
- [ ] Review `git diff`, license/notice, and source attribution; commit the verified implementation.
