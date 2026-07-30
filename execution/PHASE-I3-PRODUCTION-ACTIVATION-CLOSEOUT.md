# Phase I.3 — Production Activation Closeout

**Branch:** `cursor/phase-i3-real-workforce-activation-closeout`  
**Base main:** `267bd65f8dc176c2e480c4acd7e39e18eab9715e` (merged PR #67)  
**PR #67 state:** MERGED  

## Completion truth (before Founder live activation)

- **445 / 445 CAPACITY SEATS SOURCE-BACKED**
- **445 / 445 CAPACITY SEATS READY TO ALLOCATE**
- **148 / 148 ARCHETYPES VALIDATED**
- **20 / 20 DEPARTMENTS COVERED**
- **13 / 13 WORKFLOWS COVERED**
- **DURABLE MIGRATION VERIFIED** (+ I.3 RLS additive migration)
- **BOOTSTRAP IDEMPOTENCY VERIFIED**
- **TEST-DOUBLE SOFTWARE HOUSE VERIFIED**
- **OPENROUTER FREE-ONLY POLICY VERIFIED**
- **ACTIVATION SCRIPTS READY**
- **LIVE TESTED: 0**
- **BLOCKED ONLY BY FOUNDER MERGE, MIGRATION, API KEY AND CONTROLLED TEST**

## What I.3 fixed

- Claim verification + honest durability labels (PARTIAL when no Supabase)
- Org isolation on instance release/transition
- Duplicate seat-ID invariant
- Bootstrap `--dry-run` / `--verify-only`
- Preflight API (no provider probe, no secrets)
- Health endpoint workforce/provider/runtime/security blocks
- Founder activation checklist CTA rules
- Workforce page capacity-truth cards (not “all 445 active”)
- Live activation gates: CI refuse, paid-fallback refuse, Founder Proof refuse, tools off by default
- Additive RLS migration `20260730190000_phase_i3_workforce_rls.sql`
- Production scripts prepared (not executed)

## Commands

```bash
npm run workforce:bootstrap
npm run workforce:bootstrap -- --dry-run
npm run workforce:verify
npm run workforce:test-double
# Founder-only (not in CI):
npm run workforce:live-activation-check -- --project <uuid> --confirm
npm run workforce:software-house-acceptance -- --project <uuid> --confirm
```

## Scripts prepared (do not auto-run)

- `scripts/phase-i3-production-activation.sh`
- `scripts/configure-openrouter-production.sh`
- `scripts/run-controlled-workforce-activation.sh`

## Final report (50 fields)

| # | Field | Result |
|---|-------|--------|
| 1 | Current main SHA | `267bd65f8dc176c2e480c4acd7e39e18eab9715e` |
| 2 | PR #67 state | MERGED |
| 3 | Branch used | `cursor/phase-i3-real-workforce-activation-closeout` |
| 4 | Commit SHA | *(fill after commit)* |
| 5 | Draft PR URL | *(fill after `gh pr create`)* |
| 6 | Preview URL | Pending Vercel Preview after push |
| 7 | Changed files | Phase I.3 closeout set (code, migration, scripts, docs) |
| 8 | Capacity seats compiled | **445** |
| 9 | Capacity seats persisted (test env) | **445** (in-memory / double; Postgres when Supabase+migration) |
| 10 | Mapped seats | **445** |
| 11 | Orphan seats | **0** |
| 12 | Archetype count | **148** |
| 13 | Provenance-valid archetypes | **148** |
| 14 | Department coverage | **20 / 20** |
| 15 | Workflow coverage | **13 / 13** (contract-mapped) |
| 16 | Hierarchy result | validated (no cycles; no self-approve path) |
| 17 | Migration result | I.2 registry present; I.3 RLS additive prepared (not applied to production) |
| 18 | Bootstrap dry-run | OK — wouldPersist false; seats 445 |
| 19 | Bootstrap first-run | OK — created path verified in tests |
| 20 | Bootstrap second-run | created=0, duplicates=0, seatCount=445 |
| 21 | Queue durability | Durable when Supabase configured; schema prepared |
| 22 | Lease durability | Schema prepared; memory fallback until Supabase+migration |
| 23 | Rate-limit durability | Postgres adapter when Supabase; else memory_only (honest) |
| 24 | Knowledge durability | Ready (status surface) |
| 25 | Memory durability | Ready (status surface) |
| 26 | QA coverage | Independent QA path enforced; producer cannot self-review |
| 27 | OpenRouter policy | One-key; free-only default |
| 28 | Free-only enforcement | Verified |
| 29 | Paid fallback rejection | Verified (hard-disabled + live gate refuse) |
| 30 | Provider invocation test-double | Verified (no network) |
| 31 | Controlled activation command | Ready (gated; not executed) |
| 32 | Software-house acceptance command | Ready (gated scaffold; not executed) |
| 33 | Activation Admin UX | 15-step checklist + CTA rules |
| 34 | Health endpoint fields | workforce / provider / runtime / security (no secrets) |
| 35 | Project isolation | Fail closed |
| 36 | Organization isolation | Fail closed (I.3) |
| 37 | Protected-action enforcement | Proposals only; no auto deploy |
| 38 | Unit/integration totals | Vitest **1177 passed** / 2 skipped (164 files) |
| 39 | Browser harness | **28 passed** / 2 skipped (Chrome gated off) |
| 40 | Chrome harness | **Environment blocked** — Chrome CDP exit before ready in agent sandbox; Playwright chromium covers admin E2E |
| 41 | Playwright | **PASS** (admin-chromium project) |
| 42 | Lint | PASS |
| 43 | Typecheck | PASS |
| 44 | Build | PASS |
| 45 | Production audit | `npm audit --omit=dev` → **0 vulnerabilities** |
| 46 | Full audit | **13 high** (no `--force`); Founder may review separately |
| 47 | Migration files | `20260730180000_phase_i2_workforce_registry.sql` (merged) + `20260730190000_phase_i3_workforce_rls.sql` (additive) |
| 48 | Scripts prepared | production-activation, configure-openrouter, controlled-activation, bootstrap, verify, live-check, software-house-acceptance |
| 49 | Honest remaining external steps | Merge Draft PR → apply migrations → deploy → bootstrap → add OPENROUTER_API_KEY → controlled live test |
| 50 | Exact Founder production sequence | See `execution/445-WORKFORCE-PRODUCTION-DEPLOYMENT.md` |

## Claim verification summary (CI / no Supabase)

- FAIL: **0**
- PARTIAL: instance durability, lease durability, rate-limit durability, test-double durable path
- PASS: 445 seats, mapping, archetypes, departments, workflows, schema prepared, one-key OpenRouter

Do **not** claim the software house is 100% live before the real controlled provider test succeeds.
