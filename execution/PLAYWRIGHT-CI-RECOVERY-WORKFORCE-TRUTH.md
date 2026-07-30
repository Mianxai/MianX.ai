# Playwright CI recovery — Live Workforce truth assertion

**Branch:** `cursor/fix-workforce-playwright-truth`  
**Base:** `origin/main` `f68d962` (merged PR #69)

## Root cause

Phase I.4 replaced Founder-visible “38 executable” catalogue wording with
Compiled / Persisted / Ready to allocate / Live tested cards. The Playwright
route-sweep still asserted `/38 executable/i`.

## Fix

- Assert `data-testid` capacity truth cards
- Align e2e mock `capacityTruth` with CI unconfigured DB state
- Fix zero-state fallback that incorrectly used `readyToAllocate ?? 445`
- Regression unit tests for unconfigured vs bootstrapped UI truth

## Out of scope

Next.js `themeColor` metadata warnings — separate cleanup item.
