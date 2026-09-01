# Reference-Only Personalized Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the dual-mode portfolio with one personalized, GPL-compliant, high-fidelity recreation of the public `reference site` experience using Clyde's truthful content and local assets.

**Architecture:** Keep the existing React 19 and Vite 7 application, but replace the mode router and legacy page trees with a small History API route contract, a single immutable content domain, a shared shell, and focused route components. Interactive state is expressed through pure reducers and browser-native APIs so it remains testable with Node's built-in test runner and does not require GSAP, Lenis, analytics, a CMS, or a private service.

**Tech Stack:** React 19, Vite 7, JavaScript modules, CSS, Canvas 2D, Node `node:test`, in-app Browser visual QA.

**Spec:** `docs/superpowers/specs/2026-08-30-reference-only-portfolio-design.md`

## Global Constraints

- The live public reference (see NOTICE.md) experience is the sole visual and interaction reference; do not copy its GitHub implementation.
- The only portfolio experience is Clyde's personalized Reference-style site; there is no Original/Reference mode or mode button.
- Required public routes are `/`, `/about`, `/projects`, `/projects/:slug`, `/experience`, `/collection`, `/blog`, `/blog/:slug`, and `/license`.
- The Personal/Professional switch persists under `portfolio-view` and is available in shared navigation. Selecting a view from another route navigates to Home; selecting it on Home changes only content. Live-reference correction2026-09-01 supersedes Task3's earlier Home-only rendering instruction.
- The captured desktop viewport is 1440x1000; the captured mobile viewport is 390x844.
- Core tokens are `#f8f8f8` canvas, `#383838` primary text, `#424242` dark surface, `#1342ff` accent, Geist Sans, and Geist Mono.
- The desktop content canvas is 1,074px wide at 1440px, with a 36px status strip and approximately 66px navigation row that scroll away with the document.
- Images, icons, fonts, and marks are local; production source contains no Reference asset URL or remote image/font hotlink.
- Clyde's identity, employers, dates, project contribution boundaries, links, and metrics remain truthful; missing optional facts are omitted.
- Preserve `LICENSE` as GPL-3.0-only and update `NOTICE.md` plus the visible `/license` route for the modified work.
- No deployment, push, merge, private CMS, authentication, database, analytics, scheduling integration, or production API is part of this plan.
- Preserve the pre-existing nine `peer`-flag removals in the dirty `package-lock.json`; do not stage `.playwright-cli/` or `output/` unless a later task explicitly creates named QA evidence there.
- Every functional task follows red, green, refactor and ends with a focused commit.
- Completion requires `npm run lint`, `node --test test/*.test.js`, `npm run build`, no broken internal links/images, no blocking console errors, no horizontal overflow, and `design-qa.md` ending in `final result: passed` with no P0/P1/P2 mismatch.

---

## File Map

### Application and state

- `src/App.jsx`: single portfolio application, route subscription, page selection, route-scroll behavior.
- `src/app/router.js`: route normalization, matching, link interception, `pushState`, and `popstate` subscription.
- `src/app/uiState.js`: Personal/Professional persistence, mobile-menu state, Experience selection, Collection selection, and safe storage helpers.
- `src/app/interaction.js`: pure image-fallback and activity-year selection helpers.
- `src/main.jsx`: React root only; no legacy touch shim or mode initialization.

### Content

- `src/data/portfolio.js`: identity, navigation, social/contact links, Home views, project case studies, Experience phases, collection resources, blog posts, activity values, and license metadata.
- `src/data/selectors.js`: lookup and related-content selectors with deterministic fallbacks.

### Shared UI

- `src/components/shell/PortfolioShell.jsx`: status/header/content/footer composition.
- `src/components/shell/StatusBar.jsx`: live-style status strip with truthful static values.
- `src/components/shell/Header.jsx`: desktop navigation, brand, Home switch, contact actions, and mobile menu trigger.
- `src/components/shell/MobileMenu.jsx`: expanded mobile navigation and focus lifecycle.
- `src/components/shell/Footer.jsx`: brand/resources/social/legal/activity composition.
- `src/components/shell/CustomCursor.jsx`: two square cursor layers with fine-pointer and reduced-motion safeguards.
- `src/components/shell/AmbientCanvas.jsx`: fixed low-contrast animated background.
- `src/components/shell/BackToTop.jsx`: threshold visibility and reduced-motion-aware scrolling.
- `src/components/ui/Icon.jsx`: maps semantic icon names to existing bundled SVG files.
- `src/components/ui/ProjectCard.jsx`: shared source-faithful project-card interaction.
- `src/components/ui/ActivityHeatmap.jsx`: deterministic local activity grid.
- `src/components/ui/ImageWithFallback.jsx`: local media fallback chain.

### Routes

- `src/pages/HomePage.jsx`: Personal and Professional Home compositions.
- `src/pages/AboutPage.jsx`: profile, about, stack, work, and recent-project split layout.
- `src/pages/ProjectsPage.jsx`: featured-project intro and six-card archive.
- `src/pages/ProjectDetailPage.jsx`: complete project case study, gallery, metadata, share, and related projects.
- `src/pages/ExperiencePage.jsx`: hero, four selectable phases, orbital panel, proof, writing, and education.
- `src/pages/CollectionPage.jsx`: stats, search, categories, marketplace, and detail selection.
- `src/pages/BlogPage.jsx`: four-entry writing index.
- `src/pages/BlogDetailPage.jsx`: article hero, metadata, body, share, and related writing.
- `src/pages/LicensePage.jsx`: visible GPL and modification notice.
- `src/pages/NotFoundPage.jsx`: unknown-route recovery without a stale restored route.

### Styling and assets

- `src/styles/tokens.css`: fonts, colors, dimensions, spacing, type scale, and motion variables.
- `src/styles/base.css`: reset, body, focus, type, links, grids, and reduced-motion behavior.
- `src/styles/shell.css`: status bar, navigation, menu, cursor, ambient canvas, footer, and scroll control.
- `src/styles/pages.css`: all route layouts and interactive states.
- `src/styles/responsive.css`: desktop/mobile reordering and overflow protections.
- `public/fonts/geist-sans.woff2`, `public/fonts/geist-mono.woff2`: locally bundled captured font resources.
- `public/fonts/OFL.txt`: Geist font license.
- `public/images/brand/clyde-mark.png`: existing local K mark copied from the favicon family and rendered monochrome by CSS.
- `docs/reference-captures/reference/`: authoritative source screenshots used only for QA evidence, never shipped in the application build.

### Tests and verification

- `test/router.test.js`: public route contract and browser-history helpers.
- `test/ui-state.test.js`: view persistence and interactive reducer behavior.
- `test/portfolio-data.test.js`: truth/content/local-asset invariants.
- `test/selectors.test.js`: detail and related-content behavior.
- `test/runtime-contract.test.js`: removed-mode, no-hotlink, page-registration, license, and asset-existence checks.
- `design-qa.md`: route/state comparison matrix and final blocking result.

### Removed legacy files

- Delete `src/modes/`, `src/layouts/`, `src/hooks/`, `src/components/animations/`, `src/components/panels/`, `src/components/section2/`, `src/components/sections/`, and obsolete files directly under `src/components/` and `src/components/global/`.
- Delete `src/reference/` after its verified content is migrated into the new single-mode structure.
- Delete `src/App.css`, replace `src/index.css`, and delete the old mode/routing tests.

---

### Task 1: Establish the Single-Mode Route Contract

**Files:**
- Create: `src/app/router.js`
- Create: `test/router.test.js`
- Modify: `src/App.jsx`
- Modify: `src/main.jsx`
- Delete: `src/modes/modeRouting.js`
- Delete: `test/mode-routing.test.js`
- Delete: `test/portfolio-runtime.test.js`

**Interfaces:**
- Produces: `normalizePath(pathname): string`
- Produces: `matchRoute(pathname): { name: string, path: string, params: Record<string, string> }`
- Produces: `navigate(to, options?): void`
- Produces: `subscribeToRoute(listener): () => void`
- Produces: `routeTable: readonly RouteDefinition[]`

- [ ] **Step 1: Write the failing route tests**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { matchRoute, normalizePath, routeTable } from '../src/app/router.js'

test('publishes the complete single-mode route family', () => {
  assert.deepEqual(routeTable.map(({ pattern }) => pattern), [
    '/', '/about', '/projects', '/projects/:slug', '/experience',
    '/collection', '/blog', '/blog/:slug', '/license',
  ])
})

test('normalizes case, query, hash, and trailing slash', () => {
  assert.equal(normalizePath('/PROJECTS/WaiveRight/?view=full#gallery'), '/projects/waiveright')
})

test('matches detail routes and returns notFound for unknown paths', () => {
  assert.deepEqual(matchRoute('/projects/waiveright'), {
    name: 'projectDetail', path: '/projects/waiveright', params: { slug: 'waiveright' },
  })
  assert.equal(matchRoute('/missing').name, 'notFound')
})
```

- [ ] **Step 2: Run the focused test and verify red**

Run: `node --test test/router.test.js`

Expected: FAIL because `src/app/router.js` does not exist.

- [ ] **Step 3: Implement the route module**

```js
export const routeTable = Object.freeze([
  { name: 'home', pattern: '/' },
  { name: 'about', pattern: '/about' },
  { name: 'projects', pattern: '/projects' },
  { name: 'projectDetail', pattern: '/projects/:slug' },
  { name: 'experience', pattern: '/experience' },
  { name: 'collection', pattern: '/collection' },
  { name: 'blog', pattern: '/blog' },
  { name: 'blogDetail', pattern: '/blog/:slug' },
  { name: 'license', pattern: '/license' },
])

export function normalizePath(pathname = '/') {
  const clean = pathname.split(/[?#]/, 1)[0].toLowerCase().replace(/\/{2,}/g, '/')
  const normalized = clean.length > 1 ? clean.replace(/\/$/, '') : clean
  return normalized || '/'
}

export function matchRoute(pathname) {
  const path = normalizePath(pathname)
  for (const route of routeTable) {
    const names = []
    const source = route.pattern.replace(/:([a-z]+)/g, (_, name) => {
      names.push(name)
      return '([a-z0-9]+(?:-[a-z0-9]+)*)'
    })
    const match = path.match(new RegExp(`^${source}$`))
    if (match) return { name: route.name, path, params: Object.fromEntries(names.map((name, index) => [name, match[index + 1]])) }
  }
  return { name: 'notFound', path, params: {} }
}

export function navigate(to, { replace = false } = {}) {
  const path = normalizePath(to)
  window.history[replace ? 'replaceState' : 'pushState']({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function subscribeToRoute(listener) {
  window.addEventListener('popstate', listener)
  return () => window.removeEventListener('popstate', listener)
}
```

- [ ] **Step 4: Replace App mode selection with route selection**

Use `useState(() => matchRoute(window.location.pathname))`, subscribe with `subscribeToRoute`, render the route by `route.name`, and call `window.scrollTo({ top: 0, behavior: 'auto' })` after the path changes. Remove `ModeSwitcher`, `Analytics`, `DesktopLayout`, `MobileLayout`, `ReferenceMode`, loading-delay, saved mode, and mode history imports. `src/main.jsx` should only import the new styles and render `<App />` under `StrictMode`.

- [ ] **Step 5: Run focused and baseline checks**

Run: `node --test test/router.test.js && npm run lint`

Expected: route tests PASS and lint reports zero errors.

- [ ] **Step 6: Commit the single-mode router**

```bash
git add src/App.jsx src/main.jsx src/app/router.js test/router.test.js src/modes/modeRouting.js test/mode-routing.test.js test/portfolio-runtime.test.js
git commit -m "refactor: replace portfolio mode routing"
```

### Task 2: Create the Truthful Portfolio Content Domain

**Files:**
- Create: `src/data/portfolio.js`
- Create: `src/data/selectors.js`
- Create: `test/portfolio-data.test.js`
- Create: `test/selectors.test.js`
- Modify: `src/reference/data.js` into a temporary compatibility facade until Task 10 removes the adapter
- Delete: `test/reference-data.test.js`
- Delete: `test/reference-project-data.test.js`

**Interfaces:**
- Produces: `portfolio`, a recursively frozen object containing `identity`, `navigation`, `socials`, `home`, `projects`, `experiencePhases`, `collection`, `posts`, `activity`, and `license`.
- Produces: `projectBySlug(slug)`, `postBySlug(slug)`, `relatedProjects(slug, count)`, `relatedPosts(slug, count)`, `collectionItems(query, categoryId)`.

- [ ] **Step 1: Write failing content and selector tests**

```js
const collectMediaPaths = (value, found = []) => {
  if (typeof value === 'string' && /^\/(images|icons|fonts|favicon|portfolio)\//.test(value)) found.push(value)
  else if (Array.isArray(value)) value.forEach((item) => collectMediaPaths(item, found))
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectMediaPaths(item, found))
  return found
}

test('contains six truthful project case studies and four writing entries', () => {
  assert.equal(portfolio.projects.length, 6)
  assert.equal(portfolio.posts.length, 4)
  assert.equal(portfolio.experiencePhases.length, 4)
  assert.deepEqual(portfolio.experiencePhases.map(({ organization }) => organization), [
    'Ngnair Brice Holding', 'Capytech E-Learning Solutions',
    'JP Consulting and Services', 'Ateneo de Zamboanga University',
  ])
})

test('all production media references are local', () => {
  for (const path of collectMediaPaths(portfolio)) assert.match(path, /^\//)
})

test('selectors return deterministic related records', () => {
  assert.equal(projectBySlug('waiveright').title, 'WaiveRight')
  assert.equal(relatedProjects('waiveright', 2).length, 2)
  assert.equal(postBySlug('capytech-scorm-qa-sandbox').slug, 'capytech-scorm-qa-sandbox')
})
```

- [ ] **Step 2: Run the focused tests and verify red**

Run: `node --test test/portfolio-data.test.js test/selectors.test.js`

Expected: FAIL because the new content modules do not exist.

- [ ] **Step 3: Implement recursive freezing and the content schema**

```js
const deepFreeze = (value) => {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value)
    Object.values(value).forEach(deepFreeze)
  }
  return value
}

export const portfolio = deepFreeze({
  identity: {
    name: 'Kenneth Clyde Que', shortName: 'Clyde Que', initials: 'CQ',
    location: 'Zamboanga City, Philippines',
    role: 'Software engineer, product builder, and interface designer',
    portrait: '/images/me.webp', brandMark: '/images/brand/clyde-mark.png',
  },
  navigation: [
    { label: 'About', path: '/about' }, { label: 'Projects', path: '/projects' },
    { label: 'Experience', path: '/experience' }, { label: 'Collection', path: '/collection' },
  ],
  socials: {
    github: 'https://github.com/ClydeQue',
    linkedin: 'https://www.linkedin.com/in/kenneth-que/',
    email: 'mailto:kennethque101@gmail.com',
  },
  home: {
    personal: { eyebrow: 'Software engineer / product builder', title: 'Clyde Que' },
    professional: { title: 'Kenneth Clyde Que', location: 'Zamboanga City, Philippines' },
  },
  projects,
  experiencePhases,
  collection,
  posts,
  activity,
  license: { identifier: 'GPL-3.0-only', route: '/license', sourceUrl: 'https://github.com/ClydeQue/personal-portfolio' },
})
```

Define `projects`, `experiencePhases`, `collection`, `posts`, and `activity` above the exported object. Migrate all six current project records (`waiveright`, `social-development-unit`, `leo-rent-a-car`, `offline-pos`, `mujer-lgbtq`, `orsem-family-feud`) with their existing truthful local media and contribution notes. Define the four phases as Ngnair Brice Holding Software Engineer Intern (Jul 2026-Present), Capytech Solutions Developer Intern (Jun 2026), JP Consulting Web Development Intern (Apr-May 2026), and Ateneo Computer Science foundation. The four writing records must follow the approved spec: `capytech-scorm-qa-sandbox`, `sdu-multi-office-dashboard`, `waiveright-role-based-workflow`, and `offline-first-pos-ims`. Label them portfolio case-study notes, not previously published articles, and do not invent historical publication dates. Define the collection categories as AI & Development, Learning & References, and Tools & Libraries. Activity values must be a deterministic snapshot of actual local repository commit dates, labeled Portfolio repository activity, rather than invented GitHub contributions. Each project contains `slug`, `title`, `period`, `category`, `summary`, `role`, `responsibilities`, `technologies`, `bodySections`, `cover`, `gallery`, optional `externalUrl`, and `relatedSlugs`. Each post contains `slug`, `title`, `dek`, `published` (null unless evidenced), `readingTime`, `category`, `cover`, and at least three non-empty `sections`. Keep `src/reference/data.js` as a thin derived compatibility facade for the temporary adapter; it must not duplicate the source records.

- [ ] **Step 4: Implement selectors without mutation**

```js
export const projectBySlug = (slug) => portfolio.projects.find((item) => item.slug === slug)
export const postBySlug = (slug) => portfolio.posts.find((item) => item.slug === slug)

export function relatedProjects(slug, count = 2) {
  const current = projectBySlug(slug)
  const explicit = current?.relatedSlugs.map(projectBySlug).filter(Boolean) ?? []
  const fallback = portfolio.projects.filter((item) => item.slug !== slug && !explicit.includes(item))
  return [...explicit, ...fallback].slice(0, count)
}

export function relatedPosts(slug, count = 2) {
  return portfolio.posts.filter((item) => item.slug !== slug).slice(0, count)
}

export function collectionItems(query = '', categoryId = 'all') {
  const needle = query.trim().toLowerCase()
  return portfolio.collection.resources.filter((item) =>
    (categoryId === 'all' || item.categoryId === categoryId)
    && (!needle || `${item.name} ${item.description} ${item.tags.join(' ')}`.toLowerCase().includes(needle)),
  )
}
```

- [ ] **Step 5: Run tests and commit**

Run: `node --test test/portfolio-data.test.js test/selectors.test.js`

Expected: all content and selector tests PASS.

```bash
git add src/data src/reference/data.js test/portfolio-data.test.js test/selectors.test.js test/reference-data.test.js test/reference-project-data.test.js
git commit -m "feat: define personalized portfolio content"
```

### Task 3: Build Shared State, Assets, and the Application Shell

**Files:**
- Create: `src/app/uiState.js`
- Create: `test/ui-state.test.js`
- Create: `src/components/shell/PortfolioShell.jsx`
- Create: `src/components/shell/StatusBar.jsx`
- Create: `src/components/shell/Header.jsx`
- Create: `src/components/shell/MobileMenu.jsx`
- Create: `src/components/shell/CustomCursor.jsx`
- Create: `src/components/shell/AmbientCanvas.jsx`
- Create: `src/components/shell/BackToTop.jsx`
- Create: `src/components/ui/Icon.jsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Create: `src/styles/shell.css`
- Create: `public/fonts/geist-sans.woff2`
- Create: `public/fonts/geist-mono.woff2`
- Create: `public/fonts/OFL.txt`
- Create: `public/images/brand/clyde-mark.png`
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: `portfolio`, `navigate`, current `route`.
- Produces: `VIEW_STORAGE_KEY`, `readPortfolioView(storage)`, `writePortfolioView(storage, view)`, `uiReducer(state, action)`.
- Produces: `<PortfolioShell route view onViewChange children />`.

- [ ] **Step 1: Write failing state tests**

```js
test('view storage accepts only Personal and Professional', () => {
  assert.equal(readPortfolioView({ getItem: () => 'professional' }), 'professional')
  assert.equal(readPortfolioView({ getItem: () => 'original' }), 'personal')
  assert.equal(VIEW_STORAGE_KEY, 'portfolio-view')
})

test('the reducer closes the menu after navigation and selects experience phases', () => {
  const open = uiReducer(initialUiState, { type: 'menu/open' })
  assert.equal(uiReducer(open, { type: 'navigation/complete' }).menuOpen, false)
  assert.equal(uiReducer(initialUiState, { type: 'experience/select', index: 2 }).experienceIndex, 2)
})
```

- [ ] **Step 2: Run the state test and verify red**

Run: `node --test test/ui-state.test.js`

Expected: FAIL because `src/app/uiState.js` does not exist.

- [ ] **Step 3: Implement safe persistence and reducer actions**

```js
export const VIEW_STORAGE_KEY = 'portfolio-view'
export const initialUiState = Object.freeze({ menuOpen: false, experienceIndex: 0, collectionCategory: 'all', collectionSelection: null })

export function readPortfolioView(storage) {
  try { return storage?.getItem(VIEW_STORAGE_KEY) === 'professional' ? 'professional' : 'personal' }
  catch { return 'personal' }
}

export function writePortfolioView(storage, view) {
  try { storage?.setItem(VIEW_STORAGE_KEY, view === 'professional' ? 'professional' : 'personal') }
  catch { return false }
  return true
}

export function uiReducer(state, action) {
  if (action.type === 'menu/open') return { ...state, menuOpen: true }
  if (action.type === 'menu/toggle') return { ...state, menuOpen: !state.menuOpen }
  if (action.type === 'navigation/complete' || action.type === 'menu/close') return { ...state, menuOpen: false }
  if (action.type === 'experience/select') return { ...state, experienceIndex: action.index }
  if (action.type === 'collection/category') return { ...state, collectionCategory: action.id, collectionSelection: null }
  if (action.type === 'collection/select') return { ...state, collectionSelection: action.id }
  return state
}
```

- [ ] **Step 4: Bundle and license the captured Geist fonts and brand mark**

Use the in-app Browser `pageAssets` bundle operation for font asset IDs `35542ddb6cdf734e` and `f9db1d6f4f2eee77`. Copy the two WOFF2 files into the exact paths above, record their source URLs in `NOTICE.md`, and add the SIL Open Font License as `public/fonts/OFL.txt`. Copy `public/favicon/android-chrome-512x512.png` to `public/images/brand/clyde-mark.png`; do not use a Reference logo asset.

- [ ] **Step 5: Build the shared shell**

`Header` receives `route`, `view`, and `onViewChange`. The segmented switch is rendered only when `route.name === 'home'`. `MobileMenu` is a dialog-like region controlled by the menu button, closes on Escape or navigation, and returns focus to the trigger. Status and contact values come only from `portfolio`. The header is not fixed or sticky.

`CustomCursor` creates two 12px square layers only when `(pointer: fine)` and reduced motion is off. `AmbientCanvas` uses a fixed Canvas 2D layer, pauses when `document.hidden`, and never captures pointer events. `BackToTop` appears after 600px and uses:

```js
window.scrollTo({
  top: 0,
  behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
})
```

- [ ] **Step 6: Define the captured shell tokens**

```css
@font-face { font-family: 'Geist Sans'; src: url('/fonts/geist-sans.woff2') format('woff2'); font-display: swap; }
@font-face { font-family: 'Geist Mono'; src: url('/fonts/geist-mono.woff2') format('woff2'); font-display: swap; }

:root {
  --paper: #f8f8f8; --ink: #383838; --ink-strong: #424242;
  --accent: #1342ff; --rule: #d5d5d5; --muted: #6b7280;
  --canvas: 1074px; --status-height: 36px; --nav-height: 66px;
  --font-sans: 'Geist Sans', Arial, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;
}
```

Base CSS sets `box-sizing: border-box`, paper background, ink text, accessible focus rings, a 44px minimum interactive target on coarse pointers, and no page-level horizontal overflow. Shell CSS implements the measured 1,074px frame, thin rules, transparent/blurred header treatment, active pseudo-element underline, mobile expansion, cursor, 44px back-to-top circle, and footer grid.

- [ ] **Step 7: Run state tests, lint, and commit**

Run: `node --test test/ui-state.test.js && npm run lint`

Expected: state tests PASS and lint reports zero errors.

```bash
git add src/app/uiState.js test/ui-state.test.js src/components/shell src/components/ui/Icon.jsx src/styles src/main.jsx public/fonts public/images/brand NOTICE.md
git commit -m "feat: build Reference-style portfolio shell"
```

### Task 4: Implement the Personal and Professional Home Views

**Files:**
- Create: `src/pages/HomePage.jsx`
- Create: `src/components/ui/ProjectCard.jsx`
- Create: `src/components/ui/ActivityHeatmap.jsx`
- Create: `src/components/ui/ImageWithFallback.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/pages.css`
- Modify: `src/styles/responsive.css`
- Create: `test/runtime-contract.test.js`

**Interfaces:**
- Consumes: `portfolio.home`, `portfolio.projects`, `portfolio.activity`, `view`, `onViewChange`, `navigate`.
- Produces: `<HomePage view onViewChange />`, `<ProjectCard project variant />`, `<ActivityHeatmap years />`, `<ImageWithFallback sources alt />`.

- [ ] **Step 1: Write the failing Home runtime contract**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Home registers both persisted views without a mode switch', () => {
  const source = read('src/pages/HomePage.jsx')
  assert.match(source, /personal/i)
  assert.match(source, /professional/i)
  assert.doesNotMatch(source, /Original mode|Reference mode|ModeSwitcher/)
})
```

- [ ] **Step 2: Run the focused test and verify red**

Run: `node --test test/runtime-contract.test.js --test-name-pattern="Home registers"`

Expected: FAIL because the new Home route does not exist.

- [ ] **Step 3: Build Personal Home in the live composition**

Render the split hero with Clyde's particle portrait at left and tightly tracked name/role at right, followed by association row, Tech Stack/Description split, brand assets/featured projects, and deterministic Activity section. Use `ImageWithFallback` with `['/images/me.webp', '/images/me.png']`; never render Justine's avatar.

- [ ] **Step 4: Build Professional Home in the captured resume composition**

Render Clyde's portrait/profile/about/work experience at left and grouped technology chips/recent projects at right. Keep both views mounted only one at a time, update `aria-pressed`, persist with `writePortfolioView`, and announce the selected view in an `aria-live="polite"` region.

- [ ] **Step 5: Match desktop and mobile Home geometry**

Desktop uses the 1,074px source frame and two equal editorial columns. Mobile reorders portrait, identity, statement, switch, project cards, activity, and footer without reducing desktop columns by scale. Set hero display type with `clamp(3.4rem, 6.2vw, 5.375rem)`, weight 900, and `letter-spacing: -0.05em`.

- [ ] **Step 6: Run checks and commit**

Run: `node --test test/runtime-contract.test.js && npm run lint && npm run build`

Expected: runtime contract PASS, lint PASS, build PASS.

```bash
git add src/pages/HomePage.jsx src/components/ui src/App.jsx src/styles test/runtime-contract.test.js
git commit -m "feat: add personal and professional home views"
```

### Task 5: Implement About, Projects, and Every Project Detail

**Files:**
- Create: `src/pages/AboutPage.jsx`
- Create: `src/pages/ProjectsPage.jsx`
- Create: `src/pages/ProjectDetailPage.jsx`
- Modify: `src/App.jsx`
- Modify: `src/styles/pages.css`
- Modify: `src/styles/responsive.css`
- Modify: `test/runtime-contract.test.js`
- Modify: `test/selectors.test.js`

**Interfaces:**
- Consumes: `portfolio.identity`, `portfolio.projects`, `projectBySlug`, `relatedProjects`, `navigate`, route `params.slug`.
- Produces: complete About, Projects, valid project-detail, and missing-project states.

- [ ] **Step 1: Add failing route-coverage tests**

```js
test('every published project resolves to a complete detail record', () => {
  for (const project of portfolio.projects) {
    const resolved = projectBySlug(project.slug)
    assert.ok(resolved.bodySections.length >= 2)
    assert.ok(resolved.gallery.length >= 1)
    assert.equal(relatedProjects(project.slug, 2).length, 2)
  }
})

test('App registers About, Projects, and project detail pages', () => {
  const source = read('src/App.jsx')
  for (const page of ['AboutPage', 'ProjectsPage', 'ProjectDetailPage']) assert.match(source, new RegExp(page))
})
```

- [ ] **Step 2: Run focused tests and verify red**

Run: `node --test test/selectors.test.js test/runtime-contract.test.js`

Expected: FAIL until the records and page registrations are complete.

- [ ] **Step 3: Build About in the reference editorial-builder layout**

Follow the approved About spec, not the Professional Home composition: section eyebrow, builder title, short positioning statement, banner/portrait media, two-column process and principles section, then a three-column learning/under-the-hood/north-star section. Mobile becomes one column while preserving rule spacing and type hierarchy. Clyde's copy stays grounded in verified full-stack engineering, design, AI-assisted execution with verification, systems architecture, institutional work, internships, and local client products.

- [ ] **Step 4: Build Projects index with the captured intro and card rail**

Match the large `Project Featured Showcase` hierarchy, supporting copy, social buttons, and six local-image cards. Cards use actual titles, summaries, technologies, and detail links. Keyboard activation and visible focus match pointer behavior.

- [ ] **Step 5: Build one complete template for all six project detail routes**

Each detail renders breadcrumb/back action, category/title/dek, local cover, optional external action, share action, responsibilities, technologies, role, full case-study sections, local gallery, two related cards, activity, and footer. Share uses `navigator.share` when present and `navigator.clipboard.writeText(location.href)` otherwise; the UI exposes `Shared` or `Link copied` without an alert dialog.

- [ ] **Step 6: Implement the missing-project state**

Unknown slugs show a source-styled not-found panel with a working `/projects` return action. They do not silently render the Home page and do not persist the invalid slug.

- [ ] **Step 7: Run checks and commit**

Run: `node --test test/selectors.test.js test/runtime-contract.test.js && npm run lint && npm run build`

Expected: all focused tests, lint, and build PASS.

```bash
git add src/pages/AboutPage.jsx src/pages/ProjectsPage.jsx src/pages/ProjectDetailPage.jsx src/App.jsx src/styles test
git commit -m "feat: add portfolio pages and project case studies"
```

### Task 6: Implement the Interactive Experience Route

**Files:**
- Create: `src/pages/ExperiencePage.jsx`
- Modify: `src/App.jsx`
- Modify: `src/app/uiState.js`
- Modify: `src/styles/pages.css`
- Modify: `src/styles/responsive.css`
- Modify: `test/ui-state.test.js`
- Modify: `test/runtime-contract.test.js`

**Interfaces:**
- Consumes: `portfolio.experiencePhases`, `uiReducer`, `portfolio.posts`.
- Produces: four-button single-selection phase control and active phase panel.

- [ ] **Step 1: Add failing phase-boundary tests**

```js
test('experience selection clamps to the four verified phases', () => {
  assert.equal(uiReducer(initialUiState, { type: 'experience/select', index: 3 }).experienceIndex, 3)
  assert.equal(uiReducer(initialUiState, { type: 'experience/select', index: 9 }).experienceIndex, 0)
})

test('Experience route contains the complete interactive sections', () => {
  const source = read('src/pages/ExperiencePage.jsx')
  for (const label of ['Career Path', 'Proof of work', 'Writing', 'Education']) assert.match(source, new RegExp(label, 'i'))
})
```

- [ ] **Step 2: Run focused tests and verify red**

Run: `node --test test/ui-state.test.js test/runtime-contract.test.js`

Expected: FAIL because clamping and the route sections are absent.

- [ ] **Step 3: Add clamped selection and keyboard behavior**

The reducer accepts only integer indices from `0` through `portfolio.experiencePhases.length - 1`. Phase buttons implement roving `tabIndex`, ArrowUp/ArrowDown, Home, and End. The active button has `aria-selected="true"` and controls a stable panel ID.

- [ ] **Step 4: Build the captured Experience composition**

Render the dotted hero with `Career Path & Milestones`, four numbered values, four phase rows, and a dark orbital/skills panel. The active row shows the blue dot, right indicator, and dark frame. Selection updates the orbital labels, heading, period, summary, and skill list without navigation.

Below the phase area render truthful Activity, Proof of Work, Writing, Community/Recognition, and Education/certificates only where the data file provides verified content.

- [ ] **Step 5: Run checks and commit**

Run: `node --test test/ui-state.test.js test/runtime-contract.test.js && npm run lint && npm run build`

Expected: focused tests, lint, and build PASS.

```bash
git add src/pages/ExperiencePage.jsx src/App.jsx src/app/uiState.js src/styles test
git commit -m "feat: add interactive career experience"
```

### Task 7: Implement the Searchable Three-Column Collection

**Files:**
- Create: `src/pages/CollectionPage.jsx`
- Modify: `src/App.jsx`
- Modify: `src/app/uiState.js`
- Modify: `src/data/selectors.js`
- Modify: `src/styles/pages.css`
- Modify: `src/styles/responsive.css`
- Modify: `test/selectors.test.js`
- Modify: `test/ui-state.test.js`

**Interfaces:**
- Consumes: `portfolio.collection`, `collectionItems(query, categoryId)`, `uiReducer`.
- Produces: searchable category/resource/detail selection with empty state.

- [ ] **Step 1: Add failing collection behavior tests**

```js
test('collection search is case-insensitive and category-aware', () => {
  assert.ok(collectionItems('react', 'all').length > 0)
  assert.ok(collectionItems('', 'learning').every((item) => item.categoryId === 'learning'))
  assert.deepEqual(collectionItems('a-query-that-does-not-exist', 'all'), [])
})

test('changing category clears stale detail selection', () => {
  const selected = { ...initialUiState, collectionSelection: 'react-docs' }
  const next = uiReducer(selected, { type: 'collection/category', id: 'learning' })
  assert.equal(next.collectionSelection, null)
})
```

- [ ] **Step 2: Run focused tests and verify red**

Run: `node --test test/selectors.test.js test/ui-state.test.js`

Expected: FAIL until the collection resources and selection behavior exist.

- [ ] **Step 3: Build the full Collection header and control strip**

Render the `Curated repositories and developer resources` hierarchy, truthful categories/resources/live-file counts, local-source notice, search field, and reset action. Do not call GitHub or the live Reference API.

- [ ] **Step 4: Build Categories, Marketplace, and Detail columns**

Category and resource items are buttons with `aria-pressed`; selection updates the Detail card with name, description, tags, destination, and optional public action. On mobile, render Categories, Marketplace, then Detail in that exact order. Empty search shows a bordered no-results card and keeps the search field operable.

- [ ] **Step 5: Run checks and commit**

Run: `node --test test/selectors.test.js test/ui-state.test.js && npm run lint && npm run build`

Expected: focused tests, lint, and build PASS.

```bash
git add src/pages/CollectionPage.jsx src/App.jsx src/app/uiState.js src/data/selectors.js src/styles test
git commit -m "feat: add searchable portfolio collection"
```

### Task 8: Implement Blog Index, Four Articles, License, and Not Found

**Files:**
- Create: `src/pages/BlogPage.jsx`
- Create: `src/pages/BlogDetailPage.jsx`
- Create: `src/pages/LicensePage.jsx`
- Create: `src/pages/NotFoundPage.jsx`
- Create: `public/LICENSE.txt` as an unchanged copy of the repository-root `LICENSE`
- Modify: `src/App.jsx`
- Modify: `src/styles/pages.css`
- Modify: `src/styles/responsive.css`
- Modify: `test/runtime-contract.test.js`
- Modify: `test/portfolio-data.test.js`

**Interfaces:**
- Consumes: `portfolio.posts`, `postBySlug`, `relatedPosts`, `portfolio.license`.
- Produces: writing index, valid/missing article state, visible license route, and unknown-route state.

- [ ] **Step 1: Add failing writing and legal tests**

```js
test('every article has publish metadata and substantive local content', () => {
  for (const post of portfolio.posts) {
    assert.match(post.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    assert.ok(post.sections.length >= 3)
    assert.match(post.cover, /^\/images\//)
  }
})

test('App registers writing, license, and not-found surfaces', () => {
  const source = read('src/App.jsx')
  for (const page of ['BlogPage', 'BlogDetailPage', 'LicensePage', 'NotFoundPage']) assert.match(source, new RegExp(page))
})
```

- [ ] **Step 2: Run focused tests and verify red**

Run: `node --test test/portfolio-data.test.js test/runtime-contract.test.js`

Expected: FAIL until the four article records and route registrations are present.

- [ ] **Step 3: Build writing index and article details**

The index mirrors the source editorial list with four Clyde-authored entries. Article pages render category, date, reading time, title, deck, local cover, structured sections, project/context links, share fallback, and two related posts. Missing slugs display a writing-specific recovery panel.

- [ ] **Step 4: Build visible license and global not-found routes**

`LicensePage` presents Clyde's modification notice, GPL-3.0-only identifier, no-warranty statement, source availability statement, link to the public source repository, link to the local `/LICENSE.txt`, link to the GNU GPL text, and the attribution retained in repository-root `NOTICE.md`. `NotFoundPage` states the requested path was not found and offers working Home and Projects actions.

- [ ] **Step 5: Run checks and commit**

Run: `node --test test/portfolio-data.test.js test/runtime-contract.test.js && npm run lint && npm run build`

Expected: focused tests, lint, and build PASS.

```bash
git add src/pages src/App.jsx src/styles src/data/portfolio.js public/LICENSE.txt test
git commit -m "feat: add writing and license routes"
```

### Task 9: Complete Footer Activity, Media Fallbacks, and Motion Safeguards

**Files:**
- Create: `src/app/interaction.js`
- Create: `test/interaction-contract.test.js`
- Modify: `src/components/shell/Footer.jsx`
- Modify: `src/components/shell/CustomCursor.jsx`
- Modify: `src/components/shell/AmbientCanvas.jsx`
- Modify: `src/components/shell/BackToTop.jsx`
- Modify: `src/components/ui/ActivityHeatmap.jsx`
- Modify: `src/components/ui/ImageWithFallback.jsx`
- Modify: `src/styles/shell.css`
- Modify: `src/styles/pages.css`
- Modify: `src/styles/responsive.css`

**Interfaces:**
- Consumes: deterministic activity data and local image fallback arrays.
- Produces: `nextImageSource(sources, failedIndex)` and `activityYear(years, requested)` from `src/app/interaction.js` plus guarded cursor/canvas lifecycle, image fallback state, scroll control, and footer activity year selection.

- [ ] **Step 1: Write failing pure interaction tests**

Create and test `nextImageSource(sources, failedIndex)` and `activityYear(years, requested)`:

```js
import { activityYear, nextImageSource } from '../src/app/interaction.js'

test('image fallback advances locally then returns null', () => {
  const sources = ['/images/a.webp', '/images/b.webp']
  assert.equal(nextImageSource(sources, 0), '/images/b.webp')
  assert.equal(nextImageSource(sources, 1), null)
})

test('activity selection falls back to the newest available year', () => {
  const years = [{ year: 2026 }, { year: 2025 }]
  assert.equal(activityYear(years, 2024).year, 2026)
})
```

- [ ] **Step 2: Run the focused test and verify red**

Run: `node --test test/interaction-contract.test.js`

Expected: FAIL until the exported pure helpers exist.

- [ ] **Step 3: Finish the observed interaction lifecycle**

Cursor listeners are removed on unmount, stop on coarse pointers/reduced motion, and never hide the native cursor under those fallbacks. Canvas animation cancels its frame and visibility listener on unmount. Back-to-top visibility uses a passive scroll listener. Image fallback reaches a neutral text-only media surface without a broken image icon.

- [ ] **Step 4: Finish the activity and footer composition**

Render summary cards, month labels, contribution cells, a Less-to-More legend, and local year buttons. Cell values are deterministic records, not fabricated live GitHub counts. The footer uses Clyde's brand, Resources and Social groups, license link, modified-work notice, and small legal row.

- [ ] **Step 5: Verify reduced motion and responsive overflow CSS**

`@media (prefers-reduced-motion: reduce)` removes transitions, cursor layers, canvas animation, and smooth scrolling without hiding content. At widths below 768px, every grid becomes a single column or explicit horizontal card rail; media uses `max-width: 100%`; long URLs use `overflow-wrap: anywhere`.

- [ ] **Step 6: Run checks and commit**

Run: `node --test test/interaction-contract.test.js && npm run lint && npm run build`

Expected: focused tests, lint, and build PASS.

```bash
git add src/app/interaction.js src/components src/styles test/interaction-contract.test.js
git commit -m "feat: finish portfolio interactions and activity"
```

### Task 10: Remove the Legacy GSAP Site and Clean the Dependency Boundary

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `index.html`
- Modify: `NOTICE.md`
- Modify: `test/runtime-contract.test.js`
- Delete: `src/App.css`
- Delete: `src/index.css`
- Delete: all files under `src/reference/`
- Delete: all files under `src/layouts/`
- Delete: all files under `src/hooks/`
- Delete: legacy files under `src/components/` listed in the File Map

**Interfaces:**
- Produces: one React/Vite dependency boundary and a source tree with no obsolete mode/GSAP implementation.

- [ ] **Step 1: Expand the runtime deletion contract before deleting files**

```js
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const exists = existsSync
const productionFiles = (directory) => readdirSync(directory).flatMap((name) => {
  const path = join(directory, name)
  return statSync(path).isDirectory() ? productionFiles(path) : [path]
})
const readProductionSources = () => productionFiles('src').map((path) => readFileSync(path, 'utf8')).join('\n')

test('legacy mode, GSAP, Lenis, and analytics sources are absent', () => {
  for (const path of ['src/modes', 'src/layouts', 'src/reference', 'src/components/ModeSwitcher.jsx']) {
    assert.equal(exists(path), false, `${path} must be removed`)
  }
  const production = readProductionSources()
  assert.doesNotMatch(production, /\bgsap\b|\blenis\b|@vercel\/analytics|Original mode|Reference mode/i)
})

test('production media and fonts contain no remote hotlinks', () => {
  assert.doesNotMatch(readProductionSources(), /raw\.githubusercontent\.com|pbs\.twimg\.com|media\.licdn\.com|reference\.site\//i)
})
```

- [ ] **Step 2: Run the deletion contract and verify red**

Run: `node --test test/runtime-contract.test.js --test-name-pattern="legacy mode|remote hotlinks"`

Expected: FAIL while the legacy source and dependencies remain.

- [ ] **Step 3: Delete obsolete code and remove obsolete packages**

Remove `@react-spring/web`, both Lenis packages, `@tailwindcss/vite`, `@vercel/analytics`, `gsap`, `hero-patterns`, `react-parallax-tilt`, `react-pdf`, `swiper`, and `tailwindcss`. Keep only `react` and `react-dom` as runtime dependencies and the existing React/Vite/ESLint development dependencies. Remove the Tailwind plugin from `vite.config.js`.

Regenerate the lock with `npm install --package-lock-only`, then confirm the pre-existing nine `peer` property removals remain absent in the regenerated lock. Do not stage `.playwright-cli/` or the old `output/` captures.

- [ ] **Step 4: Update metadata and GPL notice**

Change document title, description, theme color, Open Graph copy, and canonical images to the new Clyde portfolio. `NOTICE.md` states that the entire current interface is a modified GPL-3.0-only portfolio study based on the public visual experience, lists the local Geist font files and SIL OFL, identifies Clyde's original content/assets, and removes all dual-mode boundary language.

- [ ] **Step 5: Run source scans and commit**

Run:

```bash
rg -n "ModeSwitcher|Original mode|Reference mode|portfolio-mode|portfolio-reference-path|gsap|lenis|@vercel/analytics" src package.json
rg -n "https?://[^'\") ]+\.(png|jpe?g|webp|svg|woff2?)" src public index.html
node --test test/runtime-contract.test.js
npm run lint
npm run build
```

Expected: both `rg` commands return no forbidden production matches; tests, lint, and build PASS.

```bash
git add package.json package-lock.json vite.config.js index.html NOTICE.md src test/runtime-contract.test.js
git commit -m "refactor: remove legacy GSAP portfolio"
```

### Task 11: Run the Complete Automated and Link/Image Audit

**Files:**
- Create: `scripts/audit-build.mjs`
- Create: `test/build-audit.test.js`
- Modify: `package.json`
- Modify: route/data/component files only when an audit exposes a defect.

**Interfaces:**
- Consumes: `dist/`, `routeTable`, `portfolio`.
- Produces: `npm run audit:build` with a non-zero exit on a missing asset, route, forbidden host, or overflow-risk marker.

- [ ] **Step 1: Write the failing build-audit test**

```js
test('build audit checks every route and local media reference', async () => {
  const report = await auditBuild({ root: process.cwd(), dist: 'dist' })
  assert.deepEqual(report.missingAssets, [])
  assert.deepEqual(report.forbiddenUrls, [])
  assert.deepEqual(report.unregisteredLinks, [])
})
```

- [ ] **Step 2: Run the focused test and verify red**

Run: `node --test test/build-audit.test.js`

Expected: FAIL because `scripts/audit-build.mjs` does not exist.

- [ ] **Step 3: Implement the deterministic audit**

The script imports `routeTable` and `portfolio`, recursively gathers paths beginning with `/images/`, `/fonts/`, `/icons/`, `/favicon/`, `/portfolio/`, or `/LICENSE.txt`, verifies each source file exists under `public/`, reads production source and built HTML/CSS/JS, rejects forbidden remote asset hosts, and verifies every internal content link matches `matchRoute` or a verified local static asset.

Add:

```json
"audit:build": "node scripts/audit-build.mjs"
```

- [ ] **Step 4: Run the full automated gate**

Run:

```bash
npm run lint
node --test test/*.test.js
npm run build
npm run audit:build
git diff --check
```

Expected: every command exits 0. Record exact test counts and build output in the next task's QA document.

- [ ] **Step 5: Commit the automated audit**

```bash
git add scripts/audit-build.mjs test/build-audit.test.js package.json package-lock.json
git commit -m "test: audit portfolio routes and assets"
```

### Task 12: Complete Blocking In-App Browser Design QA

**Files:**
- Create: `docs/reference-captures/reference/source-home-personal-desktop.png`
- Create: `docs/reference-captures/reference/source-home-professional-desktop.png`
- Create: `docs/reference-captures/reference/source-home-mobile.png`
- Create: `docs/reference-captures/reference/source-menu-mobile.png`
- Create: `docs/reference-captures/reference/source-about-desktop.png`
- Create: `docs/reference-captures/reference/source-projects-desktop.png`
- Create: `docs/reference-captures/reference/source-project-detail-desktop.png`
- Create: `docs/reference-captures/reference/source-experience-desktop.png`
- Create: `docs/reference-captures/reference/source-collection-desktop.png`
- Create: `docs/reference-captures/reference/source-blog-desktop.png`
- Create: `docs/reference-captures/reference/source-license-desktop.png`
- Create: `design-qa.md`
- Modify: application files only to fix observed mismatches.

**Interfaces:**
- Consumes: running Vite preview, live reference, source captures, local captures.
- Produces: same-state comparison evidence at 1440x1000 and 390x844 and a passing `design-qa.md`.

- [ ] **Step 1: Start a production preview without exposing or deploying it**

Run: `npm run build && npm run preview -- --host 127.0.0.1`

Expected: Vite prints one local preview URL. Keep its terminal session ID for the entire QA task.

- [ ] **Step 2: Capture matching live and local states with the in-app Browser**

Use only the user's selected in-app Browser. Capture source and local pages at 1440x1000 and 390x844. For each pair, match route, Personal/Professional state, expanded/collapsed menu, selected Experience phase, selected Collection row, and scroll position. Include at minimum Home Personal, Home Professional, mobile Home, mobile menu, About, Projects, one representative project detail, Experience default plus another selected phase, Collection default plus search/selection, Blog index, one article, License, and footer/back-to-top state.

- [ ] **Step 3: Compare each pair side by side**

Use a single comparison canvas per state containing the live screenshot on the left and local screenshot on the right. Judge container width, header scroll behavior, typeface, type scale, weight, line height, tracking, borders, background patterns, crop, column ratios, whitespace, active states, cursor visibility, footer, and mobile ordering.

Classify findings:

- P0: route unusable, content inaccessible, legal violation, severe breakage.
- P1: wrong page structure, missing section/state, broken navigation, large fidelity mismatch.
- P2: visible spacing/type/color/border/crop/responsive mismatch.
- P3: polish that does not change the faithful composition.

- [ ] **Step 4: Fix and recapture until no P0/P1/P2 remains**

After each fix, rerun the affected Node tests, lint, build, and same-state Browser comparison. A screenshot alone is not acceptance evidence.

- [ ] **Step 5: Run interactive Browser checks**

Verify all header/mobile/footer/internal links, every project and article detail, browser Back/Forward, Personal/Professional persistence, all four Experience phases, Collection category/search/resource selection, share fallback, back-to-top, missing project/article/global route states, and image fallbacks. At both viewports record:

```js
({
  viewportWidth: window.innerWidth,
  documentWidth: document.documentElement.scrollWidth,
  horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
})
```

Expected: `horizontalOverflow` is `false` for every representative route/state. Browser console has no uncaught error, failed local asset, or accessibility-blocking warning.

- [ ] **Step 6: Write the blocking QA report**

`design-qa.md` contains the source URL, commit SHA, preview command, automated command outputs, viewport/state matrix, screenshot paths, findings and fixes, console/link/image/overflow results, and the final line exactly:

```text
final result: passed
```

- [ ] **Step 7: Run the final completion audit and commit evidence**

Run:

```bash
npm run lint
node --test test/*.test.js
npm run build
npm run audit:build
git diff --check
git status --short
```

Expected: all gates exit 0; only known unrelated untracked/dirty files remain outside the committed implementation; `design-qa.md` has no open P0/P1/P2.

```bash
git add docs/reference-captures/reference design-qa.md
git commit -m "test: complete Reference portfolio design QA"
```

---

## Completion Audit Matrix

| Requirement | Authoritative evidence |
|---|---|
| One personalized experience, no old mode | runtime-contract scan, deleted legacy tree, Browser Home capture |
| All public pages and details | route/data tests, build audit, Browser navigation matrix |
| Personal/Professional switch | UI-state tests plus desktop/mobile Browser state captures |
| Source-faithful styling and interaction | paired same-state comparison canvases and resolved design-qa findings |
| Desktop and 390x844 mobile | Browser viewport matrix and overflow measurements |
| Local assets/no hotlinks | data/runtime tests and build audit |
| GPL compliance | `LICENSE`, `NOTICE.md`, `/license`, visible footer link |
| Tests/lint/build | final command output recorded in `design-qa.md` |
| No broken links/images/console errors | Browser interaction matrix plus build audit |
| No P0/P1/P2 mismatch | `design-qa.md` final result and closed findings |
| Unrelated work preserved | final `git status --short` compared with initial dirty state |
