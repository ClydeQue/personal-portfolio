# Task 1 Report: Mode and Route Contract

## Scope

Implemented the pure Reference mode/route contract in `src/modes/modeRouting.js` and
focused coverage in `test/mode-routing.test.js`.

The contract exports `modeStorageKey`, `referencePathStorageKey`, and the six public
route families. It normalizes static routes and valid lowercase kebab-case
project slugs, strips query/hash/trailing-slash formatting, and safely falls
back to `/`. A valid saved mode takes precedence over deep-link inference;
without one, root `/` defaults to `original`, every non-root path infers
`reference`, and unknown non-root paths normalize to the Reference home route.

## TDD evidence

### RED

Command:

```text
node --test test/mode-routing.test.js
```

Result: failed as expected before implementation with
`ERR_MODULE_NOT_FOUND` for
`src/modes/modeRouting.js` imported by the new test.

### GREEN focused test

Command:

```text
node --test test/mode-routing.test.js
```

Result: 6 tests passed, 0 failed, 0 skipped.

### Full test command

Command:

```text
node --test
```

Result: 6 tests passed, 0 failed, 0 skipped.

### Additional verification

Commands:

```text
npm run lint
npm run build
git diff --check
```

Results: lint passed; build completed successfully; diff check passed. Vite
reported the environment warning that Node 22.11.0 is below its preferred
22.12+ version, plus its existing large-chunk warning. Neither prevented the
build.

## Commit

`bb3f460826030286a96f40cd99bd287f5d5a4d6b`

## Concerns

- The project currently has no `test` script, so the relevant full test command
  is the Node test runner directly (`node --test`).
- The six-route interpretation follows the design: five exact paths plus the
  dynamic `/projects/:slug` family. Project slug validation is intentionally
  data-independent and accepts lowercase alphanumeric kebab-case slugs.
- Existing unrelated changes (`package-lock.json` and `docs/`) were left
  untouched.
