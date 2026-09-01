# Clyde portfolio design QA

Status: procedural Three.js particle figure, personalized portrait rollout, and compact Professional refinement verified locally; exact facial geometry remains blocked on a personalized 3D asset (2026-09-01, Asia/Manila).

## Current motion refinement

This section supersedes the earlier overall pass below. The earlier route/layout checks remain historical evidence, not proof that the current portrait is a 1:1 match.

- Source: the public reference identified in `NOTICE.md`, inspected through the in-app Browser, not its GitHub source.
- The rendered title has three clipped letter layers and a top-half flap rotating from approximately -90 degrees to rest. Hover scrambles letters/digits, temporarily fades the dark tiles, and resolves characters from left to right. The page loads Framer Motion and GSAP chunks, but that alone does not establish which library owns this specific effect.
- The portrait canvas identifies `three.js r182`; the observed asset inventory includes `/assets/avatar.glb` and the Draco decoder. It is a real 3D avatar, not just a filtered photograph.
- Evidence: `docs/motion-captures/reference-title-00.jpg` through `reference-title-11.jpg` and `local-title-00.jpg` through `local-title-21.jpg` are time-sequenced screenshot samples, not a screen recording. The browser API has no recording capability.
- Full-view comparison: `docs/motion-captures/title-comparison.png` combines both hover sequences at 1280 x 720 CSS pixels. Source bitmap 1272 x 716 is normalized to 1280 x 720; local bitmap is 1280 x 720. This is a sampled visual comparison, not frame-synchronized video or a frame-perfect timing measurement.
- `docs/motion-captures/rest-comparison.png` and paired `reference-portrait-left/right.jpg`, `local-portrait-left/right.jpg` record the asset/geometry difference. Typography and flap states are readable in the combined view, so no additional crop was needed.
- Local mobile evidence: `docs/motion-captures/local-mobile.jpg`, 390 x 844 CSS pixels, no horizontal overflow. Desktop console warnings/errors: none observed.

### Findings and implementation

- Closed: static name tiles. `SplitFlapName.jsx` now runs a finite scramble/resolve sequence on mount and hover. Native CSS rotates the clipped flap, while a time-derived letter sequence settles left to right. The accessible name stays CLYDE. No animation dependency was added.
- Closed: photo-derived particle sampling. Personal Home now lazy-loads a real Three.js `Points` scene built from 22,000 deterministic procedural points. The custom shader supplies continuous low-cadence idle motion, pointer-driven yaw/pitch, and local particle displacement without reading pixels from a photograph. Rendering pauses outside the viewport or in a hidden document; reduced-motion and WebGL-failure paths show Clyde's supplied portrait instead.
- Closed: inconsistent portrait assets. Clyde's supplied `profme.png` is retained as the source, delivered through a 54KB WebP primary plus PNG fallback, and used across Personal fallback, Professional, About, social metadata, and the local portfolio case-study cover. CSS crops preserve the original file while presenting a half-body composition.
- Closed: text-only association strip. Personal Home now uses local image-backed Ngnair, Ateneo de Zamboanga University, and Capytech marks with meaningful alternative text.
- Closed: flat description hierarchy. Personal and Professional descriptions now render structured segments with evidence-backed phrases emphasized in blue and bold, without injected HTML.
- Closed: oversized Professional layout. Desktop gutters are reduced, the real name wraps safely, tech groups use a dense two-column tag layout, and long values use explicit min-width/wrapping containment. At 1200 x 720, the Professional grid measured 2021px tall versus the prior 3017px checkpoint; the tech section measured 597px versus 968px.
- Closed: static section entrances. Motion for React `13.1.1` supplies viewport-once fade/translate entrances with `useReducedMotion`; GSAP remains absent.
- Open P1: exact facial geometry. The procedural bust has real 3D volume and interaction but is intentionally a custom human silhouette, not a reconstruction of Clyde's face. A Clyde GLB/GLTF scan/model is still required for exact personalized facial and side-surface fidelity. No reference person's avatar was copied or represented as Clyde.
- Typography/colors: tile proportions, central seam, dark rest state, translucent scramble state, and flap geometry follow the observed reference. The sequence uses approximate measured timing, not a verified upstream library implementation.
- Layout/copy: existing layout and truthful Clyde content are preserved; the five-letter name intentionally occupies less width than the reference's seven-letter name.
- Image quality: the local photo point cloud is visibly brighter/flatter and is not approved as a 1:1 replacement for the 3D reference.

### Fresh verification

`npm test`: 81 passed, 0 failed. `npm run lint`, `npm run build`, and `npm run audit:build` passed under Node 22.23.1. The audit found zero missing assets, forbidden URLs, unregistered links, or overflow-risk markers. Regression coverage confirms deterministic procedural geometry, bounded idle/pointer pose, visibility pausing, reduced-motion fallback, WebGL cleanup, the absence of production image sampling, and removal of the portfolio license route/surface.

Real-browser checks passed at 1280 x 633/800 and 390 x 844. The hero reported an active WebGL context and `.is-ready`; before/after pointer screenshots produced different SHA-256 hashes. Reduced-motion emulation reported `canvasDisplay: none`, `ready: false`, and a visible personalized fallback. Desktop and mobile Professional views both reported `document.documentElement.scrollWidth === window.innerWidth`; the compact desktop grid measured about 2014px tall. The page had meaningful content, no Vite overlay, and no document-level horizontal overflow.

Superdesign canvas direction: `Professional Home Compact Refinement`, draft `4efd9bd8-23c7-47a7-93d4-317bf1bf742b`. The durable target state is stored in `.superdesign/resume.json`.

Markdown source-brand mentions were removed from tracked project documentation except the retained attribution in `NOTICE.md`. Reference capture and plan/spec paths were renamed with their links updated. Historical terminology was normalized for presentation; old implementation examples remain historical, not current code instructions. Git history, the worktree name, and ignored scratch history were not rewritten.

Next for exact 3D facial parity: obtain Clyde's personalized GLB/GLTF asset, feed that geometry through the existing Three.js point-cloud renderer, then repeat reference/local pointer-state comparisons. The current procedural figure intentionally claims interaction and volume, not Clyde's exact facial mesh.

## Earlier route and layout QA (historical)

The audited implementation commit is `140e226` (`fix: avoid redirect for active portfolio view`). The evidence-only commit that adds this report and the captured QA artifacts follows that implementation commit. The live visual reference was the rendered public site identified in NOTICE.md, not its GitHub repository or upstream application source.

Local preview used for every local capture:

```text
npm run build && npm run preview -- --host 127.0.0.1 --port 5174 --strictPort
http://127.0.0.1:5174/
```

The in-app Browser was used for source inspection, local interaction, screenshots, navigation, and console checks. Comparison canvases were generated with `.superpowers/sdd/*/compare-captures.mjs`; each puts the live capture on the left and the local capture on the right at the same CSS viewport.

## Automated gates

| Command | Result |
| --- | --- |
| `npm run lint` | Passed with exit code 0 and no ESLint errors. |
| `node --test test/*.test.js` | 83 passed, 0 failed, 0 skipped. |
| `npm run build` | Passed; Vite transformed 65 modules. The only output warning is the existing Node 22.11.0 versus Vite's 22.12+ compatibility notice. |
| `npm run audit:build` | Passed with `missingAssets: []`, `forbiddenUrls: []`, `unregisteredLinks: []`, and `overflowRiskMarkers: []`; 53 local assets and all emitted local links were checked. |
| `git diff --check` | Passed. |

## Same-state source/local captures

The desktop viewport was 1440 x 1000 CSS pixels and the mobile viewport was 390 x 844 CSS pixels. The Browser bitmap is slightly scaled by the app surface, so the recorded `innerWidth`/`innerHeight`, rather than the bitmap dimensions, are authoritative.

| Reference state | Live capture | Local capture | Result |
| --- | --- | --- | --- |
| Home, Personal, desktop | `docs/reference-captures/reference/source-home-personal-desktop.png` | `docs/reference-captures/reference/local-home-personal-desktop.png` | Composition, grid, header, portrait slot, associated row, and scroll behavior matched; Clyde identity, portrait, copy, and metrics are intentionally different. |
| Home, Professional, desktop | `docs/reference-captures/reference/source-home-professional-desktop.png` | `docs/reference-captures/reference/local-home-professional-desktop.png` | Two-column profile/stack/projects composition and white professional surface matched; content is truthful Clyde content. |
| Home, Personal, mobile | `docs/reference-captures/reference/source-home-mobile.png` | `docs/reference-captures/reference/local-home-mobile.png` | Mobile ordering, compact header, portrait slot, and CTA treatment matched. The source file is the settled live particle capture because a fresh source animation can be blank during its first frames. |
| Home, Professional, mobile | `docs/reference-captures/reference/source-home-professional-mobile.png` | `docs/reference-captures/reference/local-home-professional-mobile.png` | Profile card, stack groups, actions, and responsive ordering matched with personalized data. |
| Mobile menu, Personal | `docs/reference-captures/reference/source-menu-mobile.png` | `docs/reference-captures/reference/local-menu-mobile.png` | In-flow menu, nav links, view switch, actions, Escape close, and focus return verified. |
| About, desktop | `docs/reference-captures/reference/source-about-desktop.png` | `docs/reference-captures/reference/local-about-desktop.png` | Editorial grid/sidebar, heading scale, dotted background, and content rhythm matched. |
| Projects index, desktop | `docs/reference-captures/reference/source-projects-desktop.png` | `docs/reference-captures/reference/local-projects-desktop.png` | Heading, intro block, two-column card composition, overlay controls, and shared header matched. |
| Representative project detail, desktop | `docs/reference-captures/reference/source-project-detail-desktop.png` (`/projects/mirofish`) | `docs/reference-captures/reference/local-project-detail-desktop.png` (`/projects/waiveright`) | Detail shell, breadcrumb, hero, metadata, actions, and wider source detail frame matched; project imagery and copy are intentionally Clyde-specific. |
| Representative project detail, mobile | `docs/reference-captures/reference/source-project-detail-mobile-final.png` | `docs/reference-captures/reference/local-project-detail-mobile-final.png` | Mobile breadcrumb, hero crop, metadata, stacked actions, and detail continuation matched. |
| Experience, desktop | `docs/reference-captures/reference/source-experience-desktop.png` | `docs/reference-captures/reference/local-experience-desktop.png` | Career Path/Journey grid, dotted background, phase list, panel, and learning path matched. |
| Experience, Foundation phase | `docs/reference-captures/reference/experience-phase-desktop.png` | Browser interaction selected the fourth local phase and verified the matching panel and focus state. | All four phase selections, Home/End keyboard endpoints, and panel updates passed. |
| Collection, initial desktop | `docs/reference-captures/reference/source-collection-desktop.png` | `docs/reference-captures/reference/local-collection-desktop.png` | Source-like three-column browser, compact source strip, stats, search, categories, marketplace, and detail card matched. |
| Collection, search/selection | Source initial state above | Local search `SCORM`, resource selection, unmatched search, and Reset | Search narrowed to the SCORM resource, selected detail destination opened correctly, empty results cleared detail, and Reset restored All/first resource. |
| Writing index, desktop | `docs/reference-captures/reference/source-blog-desktop.png` | `docs/reference-captures/reference/local-blog-desktop.png` | Intro, list/card rhythm, tags, and footer path matched with four factual Clyde case studies. |
| Writing article, desktop | `docs/reference-captures/reference/source-article-desktop-final.png` (`/blog/founder-school`) | `docs/reference-captures/reference/local-article-desktop-final.png` (`/blog/capytech-scorm-qa-sandbox`) | Back link, title/lede, case-study label placement, readable body, and continuation link matched. |
| Writing article, mobile | `docs/reference-captures/reference/source-article-mobile-final.png` | `docs/reference-captures/reference/local-article-mobile-final.png` | Mobile title wrapping, body spacing, and navigation matched. |
| License, desktop | `docs/reference-captures/reference/source-license-desktop.png` | `docs/reference-captures/reference/local-license-desktop.png` | License surface and footer path matched; local page exposes the unchanged GPL text through local files. |
| Footer/back-to-top | `docs/reference-captures/reference/footer-desktop.png`, `footer-mobile.png` | `docs/reference-captures/reference/local-footer-desktop.png`, `local-footer-mobile.png` | Footer grouping, resources/social areas, attribution, and scroll-to-top control matched. |

Expected visual differences are limited to the requested personalization: Clyde's name/mark, truthful biography and career history, six Clyde projects, four case-study notes, local portrait, GitHub activity snapshot, social/contact links, and local assets. No live Reference asset was hotlinked or copied into the production bundle.

## Browser interaction and route audit

At both 1440 x 1000 and 390 x 844, the following 20 paths were loaded and checked for the expected heading, local image failures, document width, and route recovery:

`/`, `/about`, `/projects`, `/projects/waiveright`, `/projects/social-development-unit`, `/projects/leo-rent-a-car`, `/projects/offline-pos`, `/projects/mujer-lgbtq`, `/projects/orsem-family-feud`, `/experience`, `/collection`, `/blog`, `/blog/capytech-scorm-qa-sandbox`, `/blog/sdu-multi-office-dashboard`, `/blog/waiveright-role-based-workflow`, `/blog/offline-first-pos-ims`, `/missing-route`, `/projects/not-a-real-project`, and `/blog/not-a-real-post`.

Every route reported `horizontalOverflow: false`, zero failed local images, and the local Browser error/warning log was `[]` at both viewports. Header links, footer Writing, project View, article back links, mailto actions, browser Back/Forward, mobile menu Escape, and global not-found recovery were exercised. The shared Personal/Professional switch was checked on Home, Projects, project detail, and mobile: selecting the active view is a no-op; selecting the other view persists it and returns to Home, matching the live behavior.

Experience selected all four phases (`Software Engineer Intern`, `Solutions Developer Intern`, `Web Development Intern`, and `BS Computer Science foundation`), including keyboard Home/End focus. Collection verified category changes, case-insensitive search, source/resource selection, empty results, and Reset. Share behavior was covered by Web Share, clipboard fallback, and final URL fallback tests. Back-to-top returned the document to scrollY 0.

## Historical photo-derived particle evidence (superseded)

The following evidence belongs to the removed Canvas2D photo-sampling implementation and is retained only as historical QA context. It is not evidence for the current procedural Three.js renderer. At 1440 x 1000, archived Browser captures in `.superpowers/sdd/*/` include `particle-final-outside.png`, `particle-final-left.png`, `particle-final-center.png`, `particle-final-right.png`, and `particle-final-return.png`.

- Left versus right pointer states changed the portrait crop by mean absolute RGB difference 124.68 with 54.19% of crop pixels changed.
- Center versus left changed 55.23% of crop pixels; center versus right changed 56.02%.
- Outside versus center changed 12.82% of crop pixels, showing the local radial response.
- Outside versus the settled return state was an exact pixel match (`meanAbsRgb: 0`, `changedFraction: 0`).

That removed point cloud used luminous blue-white cores and photo-derived depth. Current behavior is documented in the motion refinement and verification sections above.

## GitHub contribution calendar

`npm run sync:github-activity` uses the authenticated `gh api graphql` client only during the explicit data-sync command. No credential, token, or GraphQL request is shipped to the browser. The committed generated module is labeled `GitHub contribution activity`, records snapshot date `2026-08-31`, and explicitly says it is not a live feed.

| Calendar year | Contributions | Active days | Current streak | Longest streak |
| --- | ---: | ---: | ---: | ---: |
| 2024 | 39 | 6 | 0 | 2 |
| 2025 | 1000 | 100 | 0 | 9 |
| 2026 | 619 | 71 | 1 | 8 |

The 2026 value was independently checked with the same UTC calendar-year GraphQL bounds and returned 619. The Browser year controls rendered and switched 2024, 2025, and 2026 summaries and heatmaps without stale selection state.

## Findings closed before signoff

- P1 active-view redirect: selecting the already-active Personal or Professional control on a non-Home route incorrectly left the page. `140e226` gates navigation on an actual view change and adds regression coverage.
- P2 Projects typography: live computed values were restored to 64px, 700 weight, 80px line-height, and -1.6px tracking.
- P2 cursor: the double blue/gray outlined cursor was replaced with the source-like overlapping solid gray square treatment while retaining fine-pointer and reduced-motion safeguards.
- P2 CTA arrow contrast: local arrow assets remain native white on dark actions instead of being inverted to black.
- P2 Collection density and Professional surface: the source notice/control strip is compact again and the Professional surface is white like the live reference.

This earlier pass did not detect the static title or establish 3D portrait parity. The current motion findings above supersede its overall verdict.

## Source boundaries

All production media and fonts are local and were checked in both source and compiled output. Third-party font/icon notices remain in `NOTICE.md` and `public/fonts/OFL.txt`; the portfolio-level GPL file, download, route, package metadata, and footer attribution were removed at the user's request. The original GSAP/Original mode, legacy layouts, Lenis/analytics dependencies, and obsolete mode-routing tree were removed. The user's unrelated checkout changes were preserved by doing the implementation in the isolated worktree; nothing was merged, pushed, deployed, or connected to private CMS/auth/database/analytics/scheduling services.

final result: blocked
