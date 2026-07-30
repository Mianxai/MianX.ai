# Playwright CI recovery — Live Workforce truth assertion

**Branch:** `cursor/fix-workforce-playwright-truth`  
**Base:** `origin/main` `f68d962` (merged PR #69)  
**Draft PR:** https://github.com/Mianxai/MianX.ai/pull/70  
**Tip:** `103719e`

## Root cause

Phase I.4 replaced Founder-visible “38 executable” catalogue wording with
Compiled / Persisted / Ready to allocate / Live tested cards. The Playwright
route-sweep still asserted `/38 executable/i`.

## Old assertion

```js
await expect(page.getByText(/38 executable/i).first()).toBeVisible();
```

## New assertions

- heading Real Autonomous Workforce
- nav Live Workforce ×1
- `wf-card-capacity-seats` = 445
- `wf-card-persisted` = n/a or 0
- `wf-card-ready-to-allocate` = 0
- `wf-card-live-tested` = 0
- no “445 active agents” / “445 running”
- no “38 executable”
- no error/hydration crash

## Gates

- Focused Live Workforce Playwright ×2: PASS
- Full Playwright: **136 passed**
- Vitest: **1192 passed** / 2 skipped
- lint / typecheck / build: PASS
- verify:browser + browser harness: PASS
- prod audit: 0; full audit: 13 high (no --force)

## Out of scope

Next.js `themeColor` metadata warnings (~many admin routes) — separate cleanup.
