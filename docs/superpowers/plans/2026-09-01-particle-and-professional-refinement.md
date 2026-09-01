# Particle Portrait and Professional Home Refinement Implementation Plan

> **For Clyde:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the home portrait feel continuously alive and physically responsive, while giving both home modes polished entrance motion, real organization marks, emphasized evidence-backed copy, and a compact overflow-safe Professional layout.

**Architecture:** Replace the Canvas2D photo sampler with a custom procedural Three.js `Points` figure composed from deterministic head, neck, shoulder, torso, arm, and depth regions. Load the Three.js renderer only in Personal mode, keep Clyde's supplied portrait as the accessible reduced-motion/WebGL fallback, and pause rendering outside the viewport or in a hidden document. Add one reusable Motion for React reveal wrapper at the page-composition boundary. Move logo and rich-copy semantics into the frozen portfolio data, then render them through small local components.

**Tech Stack:** React 19, Vite 8, Motion for React, Three.js `Points`/custom shaders, Node test runner, Testing Library, CSS.

**Spec:** The current personalized portfolio implementation, refined by `design-qa.md` and the approved 2026-09-01 interaction/Professional-layout direction.

---

### Task 1: Define organization and rich-copy contracts

**Files:**
- Modify: `test/portfolio-data.test.js`
- Modify: `src/data/portfolio.js`
- Add: `public/images/associations/*.svg`

1. Add failing tests proving associations are local image-backed records with meaningful alt text, and rich copy exposes emphasized segments rather than HTML strings.
2. Run `node --test test/portfolio-data.test.js` and confirm the new assertions fail for the old string arrays.
3. Add the smallest frozen data records and local SVG marks that satisfy the contract.
4. Re-run the focused test and confirm green.

### Task 2: Replace photo sampling with a procedural Three.js portrait

**Files:**
- Add: `test/procedural-portrait.test.js`
- Add: `src/components/ui/proceduralPortrait.js`
- Modify: `src/components/ui/ParticlePortrait.jsx`
- Delete: `src/components/ui/portraitParticles.js`
- Delete: `src/components/ui/portraitSampleCache.js`

1. Add failing pure-function tests for a deterministic half-body point budget, recognizable region bounds, bounded idle/pointer pose, and frame lifecycle gates.
2. Run the portrait and source-contract tests and confirm they fail against the image-sampling Canvas2D implementation.
3. Implement custom procedural point geometry and a Three.js `ShaderMaterial` with restrained idle pose and local pointer repulsion.
4. Lazy-load the renderer only in Personal mode, cap idle paints, and preserve visibility, intersection, fallback, reduced-motion, disposal, and WebGL-failure paths.
5. Deliver the supplied portrait as optimized WebP with PNG fallback and use controlled half-body CSS crops across Personal fallback, Professional, About, metadata, and case-study media.
6. Re-run portrait, lifecycle, rendering, and production-build tests.

### Task 3: Add real reveal motion and semantic rendering

**Files:**
- Add: `src/components/ui/Reveal.jsx`
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/styles/pages.css`
- Modify: `src/styles/responsive.css`
- Modify: `package.json`
- Modify: `package-lock.json`
- Add/Modify: focused component tests under `test/`

1. Add failing rendering tests for logo images, strong blue emphasis, and stable reveal content.
2. Install Motion for React and implement a reduced-motion-aware `Reveal` wrapper with viewport-once entrances.
3. Render association records and rich-copy segments without `dangerouslySetInnerHTML`.
4. Apply small staggered entrances to hero, editorial panels, and Professional sections; add restrained hover lift to interactive cards only.
5. Run focused rendering tests.

### Task 4: Compact and contain Professional mode

**Files:**
- Modify: `src/styles/pages.css`
- Modify: `src/styles/responsive.css`
- Modify: `test/interaction-contract.test.js` or a focused layout contract test

1. Add a failing DOM/layout test at desktop and narrow widths that asserts no document-level horizontal overflow and verifies all Professional sections remain reachable.
2. Remove hard `nowrap`, cap headings, reduce desktop gutters, tighten tech groups/tags, and add `min-width: 0`, wrapping, and containment at the actual overflow boundaries.
3. Preserve the mobile section order and all portfolio content.
4. Run the focused browser/layout test.

### Task 5: Verify, document, and release

**Files:**
- Modify: `docs/design-qa.md`
- Modify: `/Users/clyde/development/ClydeOS/wiki/code/projects/personal-portfolio.md`
- Append: `/Users/clyde/development/ClydeOS/wiki/log.md`

1. Run `npm test`, `npm run lint`, `npm run build`, and `npm run audit:build` with Node 22.23.1.
2. Verify both modes at desktop and mobile, pointer interaction, reduced motion, focus navigation, and zero horizontal overflow in the browser.
3. Update design QA and the canonical wiki with measured evidence and the remaining personalized-GLB boundary.
4. Commit, push the authorized branch, deploy to Vercel, and smoke-test the production URL.
