# Personal portfolio

React and Vite portfolio with Personal and Professional views.

## Automated activity

GitHub Actions runs `.github/workflows/daily-activity.yml` daily at 15:39
Asia/Manila, with a second attempt at 21:39 and a manual run option. Each daily batch creates 10–15 explicitly
labeled automated empty commits. These represent scheduled automation, not
manual development, and do not change any portfolio files. The count varies;
the schedule is fixed and GitHub may delay or miss a run.

The workflow uses the repository's built-in token, needs no AI API key, and
works while the owner's computer is off. A date marker prevents duplicate
batches on retries. Normal push rules apply; it never force-pushes or backdates.
GitHub profile contribution visibility must be checked separately. Disable the
workflow in Actions to stop it. The previous local maintenance schedule is
superseded by this workflow.

After the activity batch, a separate job refreshes the actual GitHub contribution
calendar, runs build/tests/lint/asset checks, and commits changed snapshot data.
The second daily attempt catches delayed contribution indexing without creating
another empty-commit batch. The snapshot can lag recent commits, including its
own publication; it never invents counts. Illustration and application code are
not randomly edited by this workflow.

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
