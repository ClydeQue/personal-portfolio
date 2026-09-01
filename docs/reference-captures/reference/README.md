# Live reference captures

Captured through the in-app Browser on 2026-08-31 from the rendered public
public reference (see NOTICE.md) UI. These files are QA evidence, not production assets.
No upstream GitHub application source was used for this capture set.

Desktop CSS viewport: 1440 × 1000. Mobile CSS viewport: 390 × 844.
The Browser screenshot surface scales its returned bitmap slightly: for example
Home desktop is 1432 × 994 and Home mobile is 382 × 827. `innerWidth` and
`innerHeight` were verified as the requested CSS dimensions. Paired local
captures must use the same Browser surface, CSS viewport, route and state.

| Files | Source route | State |
| --- | --- | --- |
| home-desktop.png, home-mobile.png | `/` | Personal, top |
| home-panels-desktop.png | `/` | Personal, scrollY700 |
| professional-desktop.png, professional-mobile.png | `/` | Professional, top |
| menu-mobile.png | `/` | Personal, menu expanded |
| footer-desktop.png, footer-mobile.png | `/` | Personal, document bottom |
| about-desktop.png, about-mobile.png | `/about` | Top |
| projects-desktop.png, projects-mobile.png | `/projects` | Top |
| project-detail-desktop.png, project-detail-mobile.png | `/projects/mirofish` | Top |
| experience-desktop.png, experience-mobile.png | `/experience` | Top |
| experience-phase-desktop.png | `/experience` | Phase section, Foundation active |
| collection-desktop.png, collection-mobile.png | `/collection` | Top, initial selection |
| blog-desktop.png, blog-mobile.png | `/blog` | Top |
| article-desktop.png, article-mobile.png | `/blog/founder-school` | Top |
| license-desktop.png, license-mobile.png | `/license` | Top |

## Observed exceptions and content boundaries

- Project details omit the status strip. At scrollY 0 the navigation starts at
  y0 with height66, while ordinary routes have the status strip above navigation.
- Project-detail main content is wider than the ordinary 1074px frame. Header
  inner content retains the ordinary frame.
- Mobile menu expands in document flow; it is not a viewport-covering overlay.
- Footer mobile groups the large brand above Resources and Social.
- Source dynamic portrait orientation, activity values and phase state can
  change. Paired QA should compare geometry and equivalent interaction state,
  not fabricated identical personal data or animation pixels.
- Source portraits, brand identity, biography and metrics are replaced by
  truthful Clyde content. Captured source image failures are not copied as bugs.

These screenshots alone are not final visual QA. Task12 must compare source
and local images together, fix mismatches, and record the verified outcomes.
