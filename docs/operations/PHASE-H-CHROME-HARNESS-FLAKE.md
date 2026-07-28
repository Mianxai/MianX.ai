# Phase H — Chrome harness flake investigation

## Observed failures

Under `npm test` (full Vitest suite), two tests in
`scripts/browser-harness.test.js` intermittently failed with:

`Chrome DevToolsActivePort: owned process exited before becoming ready (ENOENT)`

## Classification

**Environment / browser-launch / timing under parallel load** — not a product
defect in Phase H integration.

Evidence:

1. Isolated run `npx vitest run scripts/browser-harness.test.js -t "real Chrome"`
   passed both tests when Google Chrome is installed.
2. Failure mode is Chrome exiting before writing `DevToolsActivePort`, which
   happens when multiple Chrome headless launches contend (full suite
   parallelism + geometry verifiers).
3. No application/API assertion failed; failures were harness process lifecycle.

## Fixes applied (reliability, not skips)

- `launchChrome` retries (3 attempts) with `--disable-dev-shm-usage`
- Longer timeouts for real-Chrome cases
- Sequential Chrome describe when `describe.sequential` is available
- Clearer ENOENT handling while waiting for the port file

## Canonical commands

```bash
# Canonical full suite (must pass after harness hardening)
npm test

# Optional isolated Chrome harness proof
npx vitest run scripts/browser-harness.test.js -t "real Chrome"

# If Chrome binary missing, real-Chrome cases are loudly skipped via describe.skip
```

Do not exclude the harness from the canonical command to obtain green results.
