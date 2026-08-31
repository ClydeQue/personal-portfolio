# JSTN-Only Clyde Portfolio Design

## Status

Approved in chat on 2026-08-30. Clyde confirmed permission to recreate the
public `jstn.site` interface and approved a faithful Clyde-personalized design.
The live website is the sole visual and interaction authority. The upstream
GitHub implementation is not a design reference.

## Goal

Replace the current dual-mode React/Vite portfolio with one public portfolio
that matches the live JSTN experience at high visual fidelity while presenting
only truthful Clyde content. The finished site has no legacy Original/GSAP
experience and no Original/JSTN mode switch. The reference site's
Personal/Professional switch remains because it changes the content view inside
the single approved portfolio.

The replacement covers the complete public reference surface captured during
discovery:

- Home in Personal and Professional states
- About
- Projects
- Six Clyde project-detail pages
- Experience, including selectable career phases
- Collection, including category, search, resource selection, and detail states
- Writing index and four local writing/case-study pages
- License
- Shared status bar, header, mobile menu, footer, custom cursor, background
  system, activity presentation, and back-to-top control

## Source evidence and visual contract

The source was inspected in the in-app browser at 1440x1000 and 390x844. The
captured live contract includes:

- a `#f8f8f8` page canvas and `#383838` primary text
- `#1342ff` as the main interaction accent
- Geist Sans and Geist Mono typography
- a 1,074px centered desktop content canvas at 1440px viewport width
- a 36px status strip followed by an approximately 66px navigation bar that
  scrolls away with the document in the observed live runtime
- thin gray rules, square editorial panels, and restrained radii
- large, tightly tracked black headings
- dotted and orthographic-grid section backgrounds
- a subtle fixed ambient canvas layer
- a two-layer 12px square cursor on fine-pointer devices
- a compact mobile status strip and header, a prominent Schedule action, and an
  expandable full-width navigation menu
- responsive content reordering instead of scaled-down desktop columns

Every visual-QA comparison must use the same source route, state, scroll
position, and viewport as the local capture. The user-provided screenshots are
additional reference evidence, but the live site remains authoritative when
they differ.

## Product boundaries

### Included

- Public frontend routes and interactions listed in this specification
- Local static content and local media assets
- History API navigation with direct-link support
- Responsive desktop and mobile layouts
- Accessibility behavior appropriate to the captured controls
- GPL license and upstream attribution

### Excluded

- Admin or CMS interfaces
- Authentication and private data
- Databases or server APIs
- Analytics, visit tracking, heart counters, or real GitHub statistics
- Private scheduling integrations
- Remote activity ingestion
- Deployment, domain changes, pushing, or merging

Visible server-backed reference values will become clearly truthful local
presentation. The status strip may say `Portfolio online`; it must not pretend
that a backend health check ran. Contribution and project counts must come from
local Clyde data or be omitted rather than fabricated.

## Information architecture

The app uses a small client-side router based on `window.history`. Routes are
normalized, rendered from one route table, and restored on `popstate`.

| Route | View |
| --- | --- |
| `/` | Home with Personal/Professional state |
| `/about` | Editorial builder story |
| `/projects` | Project showcase |
| `/projects/:slug` | Project case study |
| `/experience` | Journey, experience, evidence, awards |
| `/collection` | Curated resource catalogue |
| `/blog` | Writing/case-study index |
| `/blog/:slug` | Local writing/case-study detail |
| `/license` | GPL and attribution page |

Unknown routes render a styled not-found state with links to Home and Projects.
Unknown project or writing slugs render a route-specific not-found state rather
than silently showing Home.

## Shared application architecture

`App` becomes a thin composition root. It owns the current route and the
Personal/Professional home state. It does not select between different
portfolio implementations.

The main boundaries are:

- `app/router`: path normalization, route matching, navigation, and `popstate`
- `data`: immutable Clyde profile, projects, experience, proof, collection,
  writing, and navigation records
- `components/shell`: status strip, header, desktop navigation, mobile menu,
  footer, custom cursor, background canvas, and back-to-top control
- `components/content`: project cards, activity grid, technology groups,
  recognition cards, editorial panels, and shared metadata rows
- `pages`: one focused component for each route family
- `styles`: tokens, shell/layout rules, page rules, responsive rules, and motion

No component imports legacy Original layout code. Public content is supplied as
data, keeping page components reusable and preventing Clyde facts from being
scattered through JSX.

## Shared shell

### Status strip

The desktop strip matches the source density and alignment. The left side shows
a green availability indicator and truthful local copy. The right side shows
public portfolio links and locally derived counts only. On mobile, labels
condense in the same order as the source and may horizontally clip decorative
items, but the page itself must not overflow.

### Header and navigation

The header reproduces the reference proportions, translucent/blurred treatment,
bottom rule, active underline, Personal/Professional segmented control, contact
indicator, and primary action. Although the source markup includes a sticky
class, the captured live runtime scrolls both the status strip and navigation
away with the document. The local implementation follows that observed behavior
and does not pin either row to the viewport.
The brand becomes a local Clyde mark and wordmark. It must not reuse the JSTN
identity. The desktop header exposes About, Projects, Experience, and Collection.
Writing remains discoverable from Experience/About and the footer, matching the
reference information architecture.

On mobile, the logo, primary action, and menu control remain visible. The menu
opens below the header with page links, the Personal/Professional control, a
primary contact action, and a secondary message action. Escape, link selection,
and a second menu-button press close the menu. Focus returns to the menu button.

### Personal/Professional state

The switch changes the Home content and persists under a new `portfolio-view`
key. It remains available in shared navigation like the live reference. When
selected from another page, it navigates to Home with the selected view; when
already on Home, it changes the view without changing the route. It is unrelated
to the removed Original/JSTN implementation switch.

Reference correction (2026-09-01): a live Browser check of Professional from
`/projects` navigated to `/` and rendered the professional profile. This
supersedes the earlier Home-only/no-route-change assumption, following the
user's instruction to prioritize the live site's navigation.

- Personal is the visual portfolio view.
- Professional is the structured resume/profile view.

The active state uses `aria-pressed`, a visible focus treatment, and a minimum
44px touch target on mobile.

### Cursor and background

Fine-pointer devices use a real two-layer cursor matching the live square mark.
The leading square tracks the pointer immediately; the trailing square follows
with eased interpolation. Interactive targets increase or invert the cursor
state. The browser cursor remains visible when JavaScript is unavailable,
`prefers-reduced-motion` is enabled, or the device uses a coarse pointer.

The fixed ambient layer and dotted/grid surfaces are decorative and
`pointer-events: none`. Canvas motion pauses when the page is hidden and honors
reduced motion. The implementation may use Canvas/WebGL for the real portrait
particle treatment, but it must be generated from Clyde's local portrait and
must not hotlink or reuse Justine's avatar model.

### Footer and scroll control

The footer matches the source's logo/resources/social grouping and small legal
row. It links to the local license page and identifies the public JSTN reference
and GPL-derived history. A fixed dark circular back-to-top control appears after
meaningful scroll. It is approximately 42-44px on desktop, meets the 44px minimum
touch target, scrolls smoothly when motion is allowed, and jumps immediately
under reduced motion.

## Page designs

### Home: Personal

The first fold matches the source's two-column desktop hero and stacked mobile
hero. The left side uses Clyde's local portrait in the dark blue particle field.
The right side uses the orthographic grid, oversized `I'm CLYDE` treatment, and
a concise verified role statement.

Below the hero:

1. Associated/community organizations
2. Tech Stack and Description split
3. Local Clyde brand treatment and Featured Projects split
4. Recognition badges
5. Activity presentation using truthful local values
6. Shared footer

The content uses Clyde's real location, stack, current internship, community
roles, six projects, Weaveable, Anyam, and Capytech recognition.

### Home: Professional

The professional view reproduces the live resume-style two-column surface.
Desktop places identity/about/work history on the left and grouped technology
chips/recent projects on the right. Mobile stacks identity, actions, About,
technology groups, experience, projects, education, recognition, and activity.

Only verified stack entries from Clyde's profile and existing project evidence
are shown. No certifications, security standards, contribution totals, client
counts, or experience claims are inferred.

### About

The page keeps the captured editorial hierarchy: section eyebrow, builder title,
short positioning statement, banner/portrait media, two-column process and
principles section, and three-column learning/under-the-hood/north-star section.
Mobile becomes one column while preserving rule spacing and type hierarchy.

Clyde's copy is grounded in his current work: full-stack engineering, design,
AI-assisted execution with verification, systems architecture, institutional
work, internships, and local client products. It must not imitate Justine's
biography or claim authorship of copied prose.

### Projects

The desktop page uses the captured large intro followed by a four-column card
grid at wide widths. Mobile uses the source's two-column compact cards. Each card
uses a local project image, title, concise description, destination URL, and
`< View` action.

The six projects are:

1. WaiveRight
2. Social Development Unit
3. LeoRentACar
4. Offline POS
5. Mujer LGBTQ+
6. OrSem 2025 Family Feud

### Project details

Every project uses one shared detail template with project-specific data:

- breadcrumb
- hero media
- period/date marker
- title and summary
- primary external action when available
- share action using Web Share with clipboard fallback
- category, tags, author, and official-site metadata
- responsibilities, technologies, and Clyde's role
- detailed case study and project-specific sections
- local gallery
- two related projects
- local activity presentation and footer

Missing optional links are not rendered. Image failures use another local image
from the same project, then a neutral text-only media state.

### Experience

The hero reproduces the dotted background, oversized Journey title, Career Path
heading, and four numbered values. Below it, four selectable phases control the
dark orbital/learning panel. Clyde's phases are:

1. Software Engineer Intern, Ngnair (Present)
2. Solutions Developer, Capytech
3. Web Development Intern, JP Consulting and Services
4. Computer Science foundation, Ateneo de Zamboanga University

The active phase row matches the captured source state: a blue status dot,
right-facing indicator, and dark framed/focused treatment. Selecting a phase
updates the orbital graphic, phase heading, date line, summary, and associated
skills without navigating away. The remainder matches the source composition:
activity, proof of work, writing, recognition, awards, community leadership,
and education/certificates where verified. Phase buttons support keyboard
navigation and expose the active panel to assistive technology.

### Collection

Collection reproduces the source's stats, repository/action strip, search field,
and three-column Categories/Marketplace/Detail layout. Mobile stacks the same
regions in that order.

The catalogue is a local curated list grouped into AI & Development, Learning &
References, and Tools & Libraries. Search matches title, description, source,
and category. Category and resource selection update the list and detail panel
without routing. Empty search results show a styled empty state and a reset
action. External resource links are the only remote dependency.

### Writing

The writing index reproduces the captured Writing & Signals intro and article
cards. Four local case-study notes use verified Clyde material:

1. Building the Capytech SCORM QA sandbox
2. Designing the SDU multi-office dashboard
3. WaiveRight's role-based workflow and custom authentication
4. Offline-first product thinking for the POS/IMS work

These are labeled portfolio case-study notes, not previously published articles.
Each detail page uses the captured back link, title, lede, readable article
column, source/project links, and shared footer.

### License

The license page states that the repository is GPL-3.0-only, links to the local
license file and GNU GPL text, identifies the modifications, and retains the
upstream attribution already documented in `NOTICE.md`. The visual design
matches the reference license page but uses Clyde's repository links.

## Local assets

All rendered media, fonts, logos, and icons must be local. Existing Clyde
project screenshots and portraits are reused. Geist font files captured from
the public page may be stored locally when licensing permits; otherwise the
closest open-source Geist distribution is used and documented.

The Clyde brand mark is a real local asset. If an acceptable existing mark is
not available, create one through the approved image-generation workflow rather
than drawing a temporary CSS or handmade SVG substitute. Icons come from the
closest matching open-source icon set and are bundled locally.

No `raw.githubusercontent.com`, `pbs.twimg.com`, `media.licdn.com`, JSTN asset
path, or other remote image/font URL may appear in production source.

## Motion and interaction behavior

Motion follows the live site instead of preserving the old GSAP choreography:

- status strip and shared header scrolling away with the document
- subtle reveal transitions where captured
- portrait particle movement
- cursor follow and hover response
- Experience phase transitions
- collection selection states
- smooth back-to-top behavior

CSS and `requestAnimationFrame` are preferred for focused effects. GSAP is
removed unless a captured interaction cannot be reproduced cleanly without it.
Lenis is removed. Reduced motion disables nonessential motion without hiding
content.

## Legacy removal

The implementation removes:

- `src/layouts/DesktopLayout.jsx`
- `src/layouts/MobileLayout.jsx`
- legacy animation, panel, global navigation, PDF modal, parallax, and overlay
  components that are not reused by the new shell
- `src/hooks/useScrollTrigger.js` and legacy hook exports
- `src/components/ModeSwitcher.jsx`
- `src/modes/modeRouting.js`
- dual-mode local-storage keys and history state
- obsolete Original-mode tests
- unused legacy CSS and font declarations
- unused dependencies after an import audit

The existing project images, resume PDF, useful social icons, favicon, license,
and notice are retained unless replaced by a verified local asset.

## Error handling and resilience

- Router errors produce an in-shell not-found page.
- Missing project/writing records produce specific not-found states.
- Missing optional external URLs remove the action instead of creating `#` links.
- Missing images fall back locally and preserve layout dimensions.
- Web Share failures fall back to clipboard; clipboard failure displays the URL.
- Collection search and selection never throw on an empty dataset.
- Local storage failures leave the Personal view usable.
- Canvas/cursor initialization failures leave ordinary browsing and the native
  cursor intact.
- External links use `target="_blank"` and `rel="noreferrer"` when appropriate.

## Testing strategy

### Unit and structural tests

- route normalization and matching
- all static routes and six project routes
- all writing routes
- unknown-route behavior
- immutable content records and stable slugs
- truthful employer periods and project metadata
- no obsolete Original/JSTN storage or route contracts
- no hotlinked image, font, logo, or icon assets

### Runtime browser checks

At 1440x1000 and 390x844:

- load every public route directly
- navigate every internal route without a full reload
- switch Personal/Professional and reload
- open and close the mobile menu
- select every Experience phase
- filter, search, and select Collection resources
- activate share fallback and back-to-top
- assert no horizontal overflow
- assert all internal links resolve
- assert all local images load
- assert no blocking console errors or unhandled rejections
- verify keyboard focus and reduced-motion behavior

### Build gates

- `npm run lint`
- `node --test test/*.test.js`
- `npm run build`

## Blocking visual QA

Visual QA is required after functional verification. For every representative
route and key state, place the live source screenshot and local screenshot
together at the same viewport and scroll position. Compare typography, layout,
spacing, borders, radii, image crop, colors, header scroll behavior, and
responsive ordering.

The project-root `design-qa.md` records every comparison and must end with:

`final result: passed`

P0, P1, and P2 findings block completion and are fixed before rerunning QA. P3
polish may remain only as clearly listed follow-up notes. Missing source capture,
prototype capture, or combined comparison evidence produces
`final result: blocked`.

## Completion criteria

The work is complete only when:

1. The legacy GSAP/Original experience and Original/JSTN switch are absent from
   runtime and source.
2. Every route and key state in this specification works with Clyde content.
3. The Personal/Professional switch behaves like the live reference.
4. All visible assets are local and no source asset is hotlinked.
5. GPL license and attribution obligations remain intact.
6. Lint, tests, and production build pass.
7. Desktop and mobile runtime checks pass with no broken links, missing images,
   blocking console errors, or horizontal overflow.
8. `design-qa.md` exists and says `final result: passed` with no P0/P1/P2
   mismatches.
9. Unrelated dirty files remain preserved.
10. Nothing is merged, pushed, deployed, or connected to private services
    without separate approval.
