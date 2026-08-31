# JSTN reference clone design QA

Status: blocking visual QA passed on 2026-09-01 (Asia/Manila).

The audited implementation commit is `140e226` (`fix: avoid redirect for active portfolio view`). The evidence-only commit that adds this report and the captured QA artifacts follows that implementation commit. The live visual reference was the rendered public site at [jstn.site](https://www.jstn.site/), not its GitHub repository or upstream application source.

Local preview used for every local capture:

```text
npm run build && npm run preview -- --host 127.0.0.1 --port 5174 --strictPort
http://127.0.0.1:5174/
```

The in-app Browser was used for source inspection, local interaction, screenshots, navigation, and console checks. Comparison canvases were generated with `.superpowers/sdd/2026-08-30-jstn-only-portfolio/compare-captures.mjs`; each puts the live capture on the left and the local capture on the right at the same CSS viewport.

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
| Home, Personal, desktop | `docs/reference-captures/jstn/source-home-personal-desktop.png` | `docs/reference-captures/jstn/local-home-personal-desktop.png` | Composition, grid, header, portrait slot, associated row, and scroll behavior matched; Clyde identity, portrait, copy, and metrics are intentionally different. |
| Home, Professional, desktop | `docs/reference-captures/jstn/source-home-professional-desktop.png` | `docs/reference-captures/jstn/local-home-professional-desktop.png` | Two-column profile/stack/projects composition and white professional surface matched; content is truthful Clyde content. |
| Home, Personal, mobile | `docs/reference-captures/jstn/source-home-mobile.png` | `docs/reference-captures/jstn/local-home-mobile.png` | Mobile ordering, compact header, portrait slot, and CTA treatment matched. The source file is the settled live particle capture because a fresh source animation can be blank during its first frames. |
| Home, Professional, mobile | `docs/reference-captures/jstn/source-home-professional-mobile.png` | `docs/reference-captures/jstn/local-home-professional-mobile.png` | Profile card, stack groups, actions, and responsive ordering matched with personalized data. |
| Mobile menu, Personal | `docs/reference-captures/jstn/source-menu-mobile.png` | `docs/reference-captures/jstn/local-menu-mobile.png` | In-flow menu, nav links, view switch, actions, Escape close, and focus return verified. |
| About, desktop | `docs/reference-captures/jstn/source-about-desktop.png` | `docs/reference-captures/jstn/local-about-desktop.png` | Editorial grid/sidebar, heading scale, dotted background, and content rhythm matched. |
| Projects index, desktop | `docs/reference-captures/jstn/source-projects-desktop.png` | `docs/reference-captures/jstn/local-projects-desktop.png` | Heading, intro block, two-column card composition, overlay controls, and shared header matched. |
| Representative project detail, desktop | `docs/reference-captures/jstn/source-project-detail-desktop.png` (`/projects/mirofish`) | `docs/reference-captures/jstn/local-project-detail-desktop.png` (`/projects/waiveright`) | Detail shell, breadcrumb, hero, metadata, actions, and wider source detail frame matched; project imagery and copy are intentionally Clyde-specific. |
| Representative project detail, mobile | `docs/reference-captures/jstn/source-project-detail-mobile-final.png` | `docs/reference-captures/jstn/local-project-detail-mobile-final.png` | Mobile breadcrumb, hero crop, metadata, stacked actions, and detail continuation matched. |
| Experience, desktop | `docs/reference-captures/jstn/source-experience-desktop.png` | `docs/reference-captures/jstn/local-experience-desktop.png` | Career Path/Journey grid, dotted background, phase list, panel, and learning path matched. |
| Experience, Foundation phase | `docs/reference-captures/jstn/experience-phase-desktop.png` | Browser interaction selected the fourth local phase and verified the matching panel and focus state. | All four phase selections, Home/End keyboard endpoints, and panel updates passed. |
| Collection, initial desktop | `docs/reference-captures/jstn/source-collection-desktop.png` | `docs/reference-captures/jstn/local-collection-desktop.png` | Source-like three-column browser, compact source strip, stats, search, categories, marketplace, and detail card matched. |
| Collection, search/selection | Source initial state above | Local search `SCORM`, resource selection, unmatched search, and Reset | Search narrowed to the SCORM resource, selected detail destination opened correctly, empty results cleared detail, and Reset restored All/first resource. |
| Writing index, desktop | `docs/reference-captures/jstn/source-blog-desktop.png` | `docs/reference-captures/jstn/local-blog-desktop.png` | Intro, list/card rhythm, tags, and footer path matched with four factual Clyde case studies. |
| Writing article, desktop | `docs/reference-captures/jstn/source-article-desktop-final.png` (`/blog/founder-school`) | `docs/reference-captures/jstn/local-article-desktop-final.png` (`/blog/capytech-scorm-qa-sandbox`) | Back link, title/lede, case-study label placement, readable body, and continuation link matched. |
| Writing article, mobile | `docs/reference-captures/jstn/source-article-mobile-final.png` | `docs/reference-captures/jstn/local-article-mobile-final.png` | Mobile title wrapping, body spacing, and navigation matched. |
| License, desktop | `docs/reference-captures/jstn/source-license-desktop.png` | `docs/reference-captures/jstn/local-license-desktop.png` | License surface and footer path matched; local page exposes the unchanged GPL text through local files. |
| Footer/back-to-top | `docs/reference-captures/jstn/footer-desktop.png`, `footer-mobile.png` | `docs/reference-captures/jstn/local-footer-desktop.png`, `local-footer-mobile.png` | Footer grouping, resources/social areas, attribution, and scroll-to-top control matched. |

Expected visual differences are limited to the requested personalization: Clyde's name/mark, truthful biography and career history, six Clyde projects, four case-study notes, local portrait, GitHub activity snapshot, social/contact links, and local assets. No live JSTN asset was hotlinked or copied into the production bundle.

## Browser interaction and route audit

At both 1440 x 1000 and 390 x 844, the following 20 paths were loaded and checked for the expected heading, local image failures, document width, and route recovery:

`/`, `/about`, `/projects`, `/projects/waiveright`, `/projects/social-development-unit`, `/projects/leo-rent-a-car`, `/projects/offline-pos`, `/projects/mujer-lgbtq`, `/projects/orsem-family-feud`, `/experience`, `/collection`, `/blog`, `/blog/capytech-scorm-qa-sandbox`, `/blog/sdu-multi-office-dashboard`, `/blog/waiveright-role-based-workflow`, `/blog/offline-first-pos-ims`, `/license`, `/missing-route`, `/projects/not-a-real-project`, and `/blog/not-a-real-post`.

Every route reported `horizontalOverflow: false`, zero failed local images, and the local Browser error/warning log was `[]` at both viewports. Header links, footer Writing, project View, article back links, mailto actions, browser Back/Forward, mobile menu Escape, and global not-found recovery were exercised. The shared Personal/Professional switch was checked on Home, Projects, project detail, and mobile: selecting the active view is a no-op; selecting the other view persists it and returns to Home, matching the live behavior.

Experience selected all four phases (`Software Engineer Intern`, `Solutions Developer Intern`, `Web Development Intern`, and `BS Computer Science foundation`), including keyboard Home/End focus. Collection verified category changes, case-insensitive search, source/resource selection, empty results, and Reset. Share behavior was covered by Web Share, clipboard fallback, and final URL fallback tests. Back-to-top returned the document to scrollY 0.

## Particle portrait evidence

The local Clyde portrait is a real sampled point cloud, not a static dotted placeholder. At 1440 x 1000, Browser captures in `.superpowers/sdd/2026-08-30-jstn-only-portfolio/` include `particle-final-outside.png`, `particle-final-left.png`, `particle-final-center.png`, `particle-final-right.png`, and `particle-final-return.png`.

- Left versus right pointer states changed the portrait crop by mean absolute RGB difference 124.68 with 54.19% of crop pixels changed.
- Center versus left changed 55.23% of crop pixels; center versus right changed 56.02%.
- Outside versus center changed 12.82% of crop pixels, showing the local radial response.
- Outside versus the settled return state was an exact pixel match (`meanAbsRgb: 0`, `changedFraction: 0`).

The point cloud uses luminous blue-white cores and depth-based yaw/pitch/parallax. Reduced-motion, visibility pause, resize cache invalidation, image fallback, and unmount cleanup are covered by the portrait lifecycle tests and leave the accessible local image available.

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

There are no open P0, P1, or P2 findings. Identity/content/asset differences listed above are intentional personalization requirements, not fidelity defects.

## License and source boundaries

All production media and fonts are local and were checked in both source and compiled output. The project retains the GPL license at `LICENSE`, `public/LICENSE.txt`, and `/license`, includes the Geist OFL notice at `public/fonts/OFL.txt`, and records the modified-work attribution in `NOTICE.md`. The original GSAP/Original mode, legacy layouts, Lenis/analytics dependencies, and obsolete mode-routing tree were removed. The user's unrelated checkout changes were preserved by doing the implementation in the isolated worktree; nothing was merged, pushed, deployed, or connected to private CMS/auth/database/analytics/scheduling services.

final result: passed
