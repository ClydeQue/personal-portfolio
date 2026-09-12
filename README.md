# Personal portfolio

React and Vite portfolio with Personal and Professional views.

## Automatic contribution refresh

GitHub Actions refreshes the real contribution calendar daily at 15:39 and
21:39 Asia/Manila, with a manual run option. The workflow uses GitHub's API
and built-in repository token, so no Mac or AI API key is required.

The calendar remains a generated snapshot, refreshed automatically rather than
hardcoded by hand. Counts and streaks come from that snapshot; there are no
fixed streak overrides. GitHub indexing and scheduling can delay updates.

Each refresh runs build, tests, lint, and the asset audit before committing
changed snapshot data. Unchanged output produces no commit. Empty commits and
commit-count targets have been removed. Disable the workflow in Actions to stop
refreshes. The previous local maintenance task remains paused.

## Local setup

Use Node.js 22.23.1 (a supported version for the package's `>=22.22.2`
requirement) and its bundled npm. Check `node --version` and `npm --version`
in the project directory before installing.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. No GitHub login is needed to view the
committed activity snapshot or run the site locally.

## Verification

Run these commands in order. The tests inspect generated build output, so a
fresh checkout needs a successful build first.

```sh
npm run build
npm test
npm run lint
npm run audit:build
git diff --check
```

Use `npm run preview` to inspect the production build locally. For interface
changes, check the affected pages in both views at desktop and mobile widths.
The existing lazy Three.js chunk can produce a build-size warning.

## Content and activity

Read [AGENTS.md](AGENTS.md) and [VOICE.md](VOICE.md) before editing. Preserve
verified career facts, team attribution, and the shared first-person voice.

The GitHub calendar is a committed snapshot, not a live browser request.
`npm run sync:github-activity` explicitly refreshes it using authenticated
GitHub CLI access and writes `src/data/githubActivity.js`. Review the generated
diff before committing. Keep credentials out of source files.

## Publishing

Complete verification before publishing through the existing Git deployment
integration. After a push, confirm the remote commit, provider deployment
status, and live assets. A successful local build or Git push alone does not
prove the production site was updated.
