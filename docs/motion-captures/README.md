# Clyde portfolio motion evidence

Captured from the rendered public reference and local production preview on 2026-09-01. See `../../NOTICE.md` for reference attribution and `../../design-qa.md` for the current findings.

- `reference-title-*` and `local-title-*`: sequential hover screenshots, approximately 100ms apart. They are sampled frames, not a video recording.
- `title-comparison.png`: source left, local right, normalized to the same 1280 x 720 CSS viewport. Scrambling is random/time-dependent, so exact characters are not expected to match.
- `rest-comparison.png`: source left, local right. The local photograph and source 3D avatar are visibly different assets, not merely different particle settings.
- `reference-portrait-*` and `local-portrait-*`: pointer left/right and rest captures. These are interaction samples, not synchronized animation frames.
- `local-mobile.jpg`: 390 x 844 local layout check.

The source canvas reports Three.js r182 and loads a GLB avatar. Exact personalized geometry remains blocked pending a Clyde 3D scan/model. The source person's model is not included in the application.
