# Dual-Mode Portfolio Design

## Goal

Turn the existing React/Vite portfolio into a single deployable SPA with two
selectable experiences: the preserved Clyde long-scroll site (`Original`) and
an adapted, Clyde-branded version of the public JSTN portfolio experience
(`JSTN`). The adaptation follows the reference's public information hierarchy,
bordered editorial layout, route model, and interaction rhythm while replacing
all identity, copy, project data, and assets with Clyde's truthful material.

## Boundaries and license

- The source adaptation is derived from `JustineDevs/Portfolio`, which declares
  GPL-3.0. The checkout keeps the full GPL license, adds a modification and
  attribution notice, and links the upstream source from the JSTN-mode footer.
- Only public portfolio behavior is adapted: Home, About, Projects, project
  details, Experience, and Collection. Admin, CMS, auth, database, engagement,
  analytics, and scheduling integrations are deliberately not ported.
- The current Original layout and its assets remain available and are not
  rewritten to depend on the JSTN mode.

## Runtime architecture

`App` owns a `portfolioMode` state (`original` or `jstn`) persisted in
`localStorage` under `portfolio-mode`. A shared `ModeSwitcher` exposes both
modes with native buttons, `aria-pressed`, visible focus, and a 44px touch
target. Switching to Original replaces the URL with `/` and renders the
existing desktop/mobile layout. Switching to JSTN preserves the current JSTN
route in `portfolio-jstn-path` and renders the route at `/`, `/about`,
`/projects`, `/projects/:slug`, `/experience`, or `/collection`.

The JSTN router is a small history-api adapter, not a new dependency. It
normalizes paths, handles `popstate`, prevents full reloads for internal links,
and falls back to the JSTN home page for unknown paths. The mode is inferred as
JSTN for a deep public route on first load, allowing direct links to work.

## JSTN experience

The new `src/jstn` boundary contains the route shell, header/footer, shared
editorial primitives, route pages, data, and CSS. The visual system uses the
reference's light `#F8F8F8` canvas, charcoal typography, thin gray rules,
responsive 92/88/75/70% content widths, square/rounded editorial panels, and
small uppercase labels. GSAP supplies entrance and scroll-reveal effects;
`prefers-reduced-motion` disables them. Heavy WebGL and server-backed features
are intentionally represented by CSS/asset-safe equivalents so the mode stays
deployable in the existing Vite app.

Content is sourced from the existing portfolio assets and the verified career
context: Ngnair Payments, Capytech E-Learning Solutions, and JP Consulting and
Services. Project cards cover WaiveRight, ADZU SDU, LeoRentACar, Offline POS,
Mujer LGBTQ+, and OrSem Family Feud; Weaveable and Anyam are presented as
recognition proof rather than employment. Project cards and detail pages use
stable slugs and local images.

## Acceptance criteria

1. `npm run lint` and `npm run build` exit 0.
2. Original mode renders the current desktop and mobile layouts with no source
   dependency on JSTN-only components.
3. JSTN mode's six public route families render, navigate internally, and
   expose Clyde content; unknown routes fall back safely.
4. Mode switching survives reload, is keyboard operable, and has a visible
   focus indicator; reduced motion produces no GSAP animation work.
5. Playwright checks both modes at 1440x1000 and 390x844, assert no horizontal
   overflow, no blocking console errors, and valid internal route links.
6. `LICENSE`, `NOTICE.md`, and the footer clearly identify the GPL-derived
   portion and upstream repository.
