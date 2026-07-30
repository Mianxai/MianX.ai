# Phase I.4 — Durable Bootstrap Truth

**Branch:** `cursor/phase-i4-durable-bootstrap-truth`  
**Base main:** `9c4965619b0476f276c3e0ad8885081098114947`

## Root cause

`runWorkforceVerify()` called `bootstrapWorkforceRegistryInMemory()` then reported
`listSeatsFromStore().length` as `persistedSeats`. Compiled in-memory seats were
mislabelled as database persistence. CLIs also wrapped Vitest tests instead of
running application code.

## Expected truth after this Draft PR (before Founder apply)

- **445 COMPILED**
- **null / 0 PERSISTED** until Founder applies migration + bootstrap
- **NO FALSE PERSISTENCE CLAIMS** (`OK: false` when DB missing)
- Database foundation script ready
- Scheduler setup script ready
- Provider-independent operations ready
- OpenRouter not configured
- **LIVE TESTED: 0**
- Real AI execution blocked only by API key **after** foundation

## Final report

| # | Field | Result |
|---|-------|--------|
| 1 | Latest main SHA | `9c49656` |
| 2 | Branch | `cursor/phase-i4-durable-bootstrap-truth` |
| 3 | Commit SHA | `f5417078387843b1a05ec61603f72d12f66415de` |
| 4 | Draft PR URL | https://github.com/Mianxai/MianX.ai/pull/69 |
| 5 | Preview URL | Pending Vercel Preview |
| 26 | Playwright | PASS (admin-chromium) |
| 6 | Changed files | Persistence adapter, bootstrap/verify runners+CLIs, health/Admin UX, foundation/scheduler scripts, docs, tests |
| 7 | Root cause | In-memory compile misreported as persisted; Vitest-wrapped CLIs |
| 8 | Bootstrap CLI | Real Vite SSR loader → `runWorkforceBootstrap` (not Vitest) |
| 9 | Verify CLI | Real loader → `runWorkforceVerify`; exits non-zero without DB |
| 10 | Database adapter | `persistence.js` + memory adapter for tests |
| 11 | Dry-run | compiled 445, persisted null, wouldPersist false, OK true |
| 12 | Missing-database | persisted null, readyToAllocate 0, OK false, SUPABASE_URL_MISSING |
| 13–15 | Bootstrap tests | first creates >0; second created=0; 445 persisted via adapter |
| 16 | Persisted count | null without DB; 445 after adapter bootstrap |
| 17 | Health truth | async verify; never derives persisted from compile alone |
| 18 | Foundation script | `scripts/apply-workforce-foundation.sh` |
| 19 | Scheduler script | `scripts/configure-runtime-scheduler.sh` |
| 20 | Provider-free mode | message + blocked live paths |
| 21 | OpenRouter onboarding | `execution/FREE-OPENROUTER-ONBOARDING.md` |
| 22 | UUID UX | INVALID_PROJECT_UUID; example UUID in docs/scripts |
| 23 | Vitest | 1188 passed / 2 skipped (165 files) |
| 24 | Browser harness | 28 passed / 2 skipped |
| 25 | Chrome harness | Environment-blocked (same as I.3); Playwright covers admin |
| 26 | Playwright | *(fill)* |
| 27 | Lint/typecheck/build | PASS |
| 28 | Production audit | 0 vulnerabilities |
| 29 | Full audit | 13 high (no --force) |
| 30 | Migrations | No new migration; Founder still applies I.2+I.3 |
| 31 | Security | No secrets printed; UUID validated; no provider calls |
| 32 | Remaining Founder steps | Merge → `apply-workforce-foundation.sh` → optional scheduler → later OpenRouter |

## Commands

```bash
npm run workforce:bootstrap -- --dry-run --env-local
npm run workforce:verify -- --env-local
bash scripts/apply-workforce-foundation.sh
bash scripts/verify-workforce-foundation.sh
bash scripts/configure-runtime-scheduler.sh
```
