---
title: MianX.ai Current State Baseline
document_status: review
implementation_status: partial
production_status: pilot
verification_status: partially_verified
authority_status: proposed
as_of: 2026-08-03
classification: Internal
---

# CURRENT-STATE

## As-of date

**2026-08-03**

## Current enterprise stage

**Stage 1 — Foundation and Core Platform**

Parallel controlled work: **Stage 2 one-agent pilot foundation only** (path merged; not live-executed).

## Explicit stage statement

MianX.ai is currently in Stage 1 — Foundation and Core Platform, with a
controlled Stage 2 one-agent pilot. It is not yet a fully operational
Enterprise AI Operating System and does not yet have 445 active or
live-tested AI agents.

## Current Production commit (latest origin/main)

`2d9b4862e7764aae5c26f0e247bb85310bc752f8`

(Merge of PR #94 — Phase 1 Step 5 final cross-tenant security closure.
Optional `admin_memberships` org/project scope migration **applied** 2026-08-03
under Founder authorization. Live-run track paused; OpenAI credits not_checked.)

## Deployment state

| Item | Value |
|------|-------|
| Production URL | https://mian-x-ai.vercel.app |
| Production alias target | Ready/success deployment for commit `2d9b486…` |
| Authorization migration applied | **yes** (2026-08-03) |
| Membership scope migration applied | **yes** — `20260803180000_admin_memberships_optional_tenant_scope.sql` |
| Scope migration checksum | `6ae5e95605342b529b561b3fb366dd5eace626d41a7c92ccfd363aa07b1e5ed7` |
| Pending migrations | **0** |
| Post-apply manual logical backup | **yes** (outside Git; checksummed; restore-tested) |
| managedBackupReady / pitrReady | **false** / **false** |
| manualRecoveryReady | **true** |
| Authorization store | available (table present; **0** real authorization rows) |
| Environment / secrets changed by code PRs | no (Founder-only Vercel UI for key) |
| providerName (core health) | none — execution blocked |
| apiKeyConfigured | **true** (boolean only; no value exposed) |
| accountAccessStatus | not_checked |
| billingCreditStatus | not_checked |
| billingModeStatus | unknown |
| Models API / generation calls | 0 / 0 |
| Switches | false |
| allocated/active/live-tested | 0/0/0 |
| Founder Proof | awaiting_final_review / founder_final_review |
| Founder Final Review | not approved |
| First-live-run readiness packet | **merged** (PR #88 → `715b700…`) |
| No-credit safe readiness | **merged** (PR #89 → `70b9382…`) |
| Master completion phases | `doc/MIANX-AI-MASTER-COMPLETION-PHASES.md` — Phase 1 `ready_for_final_verification` |
| Phase 1 tenant/authz foundation | **merged** (PR #91 → `c7ee986…`); scope columns **applied** |
| Phase 1 membership-scoped data access | **merged** (PR #92 → `92897d6…`) |
| Phase 1 RLS/scope migration readiness | **merged** (PR #93 → `c6a273a…`) |
| Phase 1 final security closure | **merged** (PR #94 → `2d9b486…`) |
| Phase 1 post-migration verification | Draft on `cursor/phase1-post-migration-final-verification` |
| Phase 1 status | `ready_for_final_verification` (not complete; Founder sign-off required) |
| Phase 2 started | **no** |

Founder-observed billing balance on 2026-08-03: $0.00.  
Not machine-verified by MianX.ai.

## Tenancy model (runtime truth)

**Single-tenant Founder platform with optional membership scope columns applied** —
`admin_memberships.organization_id` / `project_id` are nullable; existing rows
remain null (legacy default-org semantics, not multi-org global). One default org
(`mianx`); workspaces not implemented; JWT org-scoped RLS not complete. Project
list/detail scoping is application-level (PR #92+#94). See
`doc/PHASE-1-TENANT-ISOLATION-AND-ADMIN-AUTHORIZATION.md`,
`doc/PHASE-1-MEMBERSHIP-SCOPED-DATA-ACCESS.md`,
`doc/PHASE-1-RLS-SCOPE-MIGRATION-READINESS.md`,
`doc/PHASE-1-FINAL-CROSS-TENANT-SECURITY-CLOSURE.md`,
`doc/PHASE-1-POST-MIGRATION-VERIFICATION.md`.

## Scheduler state

| Item | Value |
|------|-------|
| primaryScheduler | supabase_cron |
| schedulerActive | true |
| schedulerTransitionState | supabase_primary_active |
| schedulerHealth | healthy |
| GitHub scheduled fallback delivery proof | pending external event (not claimed verified) |

## Database migration state

| Item | Value |
|------|-------|
| Phase II.1 pilot migration | applied |
| Pending database migrations (last verification) | **none** (scope migration applied 2026-08-03; dry-run up to date) |
| Migrations changed by PR #80 or workforce-audit PR | no |

## Workforce truth

| Metric | Value |
|--------|-------|
| capacitySeats / registered | 445 |
| compiledSeats | 445 (planning capacity) |
| persistedSeats | 445 |
| readyToAllocateSeats | 445 |
| allocatedSeats | 0 |
| activeInstances / active agents | 0 |
| liveTestedSeats / live-tested agents | 0 |

**445 is capacity planning, not 445 running or live-tested agents.**

Admin surface ownership (audit in progress): `doc/ADMIN-WORKFORCE-RESPONSIBILITY-MAP.md`.

## AI provider truth

| Item | Value |
|------|-------|
| OpenAI execution path | merged into main (path); activation-readiness Draft until merge |
| Provider configured | no |
| providerName | none |
| Genuine provider calls | 0 |
| liveExecutionReady | false |
| officialCatalogStatus (gpt-5.4-mini) | verified (docs 2026-08-03) |
| accountAccessStatus | not_checked |
| officialPricingStatus | verified (standard $0.75/$0.075/$4.50 per 1M) |
| billingModeStatus | unknown |
| standard worst-case at pilot caps | $0.0084 (not authorizing) |
| responseStorageEnabled | false |
| zeroDataRetentionVerified | false |
| Authenticated Models API verification | not performed |
| Provider activation readiness PR | **merged** (PR #83 → `940c227`); Production verified after merge |
| Dry-run evidence rehearsal PR | **merged** (PR #84 → `405171b`); Vitest-only fake provider; Production verified |
| Live-run control-plane PR | **merged** (PR #85 → `da4e19b`); Production verified **without** migration apply at that time |
| Live-run authorization migration readiness | **merged** (PR #86 → `5776160`); ephemeral DB CI + `search_path=''` hardening |
| Live-run authorization migration apply | **applied** 2026-08-03 — checksum `82b8223a…`; store available; **0** auth rows; provider still none |
| OpenAI secure-config / model-check readiness | **merged** (PR #87 → `8a2b6f5`); then Founder configured key via Vercel UI |
| First-live-run readiness packet | **merged** (PR #88 → `715b700…`) |
| No-credit safe readiness | Draft/Preview on `cursor/openai-no-credit-safe-readiness` |
| apiKeyConfigured (boolean) | true after Founder Vercel Production config + redeploy |
| billingCreditStatus | not_checked (key ≠ credits) |

## Live execution truth

| Item | Value |
|------|-------|
| LIVE_AGENT_EXECUTION_ENABLED (Production posture) | false / not activating agents |
| LIVE_AGENT_PILOT_ENABLED | false |
| Pilot agent allocated / activated | no |
| Real OpenAI network proof run | not performed |
| Authenticated Models API verification | not performed |

## Founder Proof truth

| Item | Value |
|------|-------|
| status | awaiting_final_review |
| stage | founder_final_review |
| Final Founder Review | not approved |
| Auto-approval | forbidden |

## Documentation maturity

| Item | Value |
|------|-------|
| Enterprise portal draft (`doc/README.md`) | large enterprise draft; Stage 1 truth-corrected |
| Master roadmap (`doc/complete-roadmap.md`) | planning monolith; future sections planned |
| Canonical map / registry / baseline | Stage 1 created |
| Large split of README/roadmap | **not done** (deferred) |
| Workforce Admin responsibility map | created (`doc/ADMIN-WORKFORCE-RESPONSIBILITY-MAP.md`) |

## Core platform maturity

| Area | Maturity |
|------|----------|
| Lead capture + Admin | implemented (product surface) |
| Durable queue / leases / tick | operational with Supabase Cron primary |
| Workforce seats foundation | persisted capacity 445; allocated/active/live-tested 0 |
| One-agent OpenAI path | implemented in code; disabled; zero genuine calls |
| Memory Engine as operational product | not operational |
| Marketplace / global expansion | planned / not started as operational products |
| RestaurantOS / PoultryOS as current product | not current product (Powered-by later) |

## Known verified issues

- Shared foundation metric presentation and Runtime Agents tab clarification — **fixed; Production deployed after exact-head merge** (2026-08-03, merged PR [#82](https://github.com/Mianxai/MianX.ai/pull/82), merge commit `44baa7a99935fe37463aaae5daaf8eeb2df1cb76`). Setup + Readiness were not collapsed. Routes were not deleted or redirected. Authenticated Production UI not directly browser-verified because no safe credentials were available.
- One-agent provider activation readiness (preflight, fail-closed verification statuses, runbook) — **Draft/Preview only** on branch `cursor/one-agent-provider-activation-readiness`. Does not configure provider, enable switches, or perform Models API / generation calls.
- GitHub scheduled fallback external-delivery proof remains pending.

## Resolved issues

- **Admin workforce foundation metrics + Runtime Agents label (PR #82)** — **fixed; Production deployed after merge** (2026-08-03, merge commit `44baa7a99935fe37463aaae5daaf8eeb2df1cb76`).
  - Shared `WorkforceMetricCard`, `normalizeWorkforceSummary` wired into Setup/Readiness/Ops, Runtime Agents tab label (id `agents` preserved), global `/admin/agents` unchanged.
- **Admin workforce responsibility overlap (label/truth headers)** — **fixed; Production deployed after merge** (2026-08-03, merged PR [#81](https://github.com/Mianxai/MianX.ai/pull/81), merge commit `da558a094a41842884791ea8432fd13c6f8379b4`).
  - Ownership map, terminology, nav labels (Setup / Readiness / Workforce Ops), purpose headers, coalesce-without-inventing-zeros for Unavailable.
  - Authenticated Production UI not directly browser-verified because no safe credentials were available.
- **Projects card Founder Proof contradiction** — **fixed; PR preview verified; Production deployed after merge** (2026-08-03, merged PR [#80](https://github.com/Mianxai/MianX.ai/pull/80), merge commit `de3972eb55ee27b201119e5bf23d1e38b72651f2`).
  - **Root cause:** `/admin/projects` treated missing/`null` operational summary (including in-flight load and fetch failure) as “No active Founder Proof”, and labeled proof from `canonical_integration_run` alone instead of the shared `founder_proof_ui` / status classification. During load, metrics showed “…” while Founder Proof falsely claimed no active proof.
  - **Fix:** Shared `lib/core/integration/founder-proof-status.js` classification; Projects card uses `resolveProjectsFounderProofDisplay` so `awaiting_final_review` / `founder_final_review` is **active review-pending** (not inactive/terminal); explicit Loading… / real value including `0` / Unavailable metric states; per-project ops load errors no longer map to empty proof.
  - **Verification evidence:** executed classifier truth table + unit/component tests; CI Lint/Build, Chrome harness, Playwright on PR #80; Vercel Preview; Production health after merge deploy (`providerName: none`, workforce 445/445/445, allocated/active/liveTested 0/0/0, proof `awaiting_final_review` / `founder_final_review`).
  - **Authenticated Production UI:** not directly browser-verified without credentials; behaviour proven by source, tests, CI, Preview, and Production health. **Founder Final Review remains not approved.**

## Suspected issues requiring reproduction

- Objectives loading anomaly — **client failure modes reproduced and hardened; Production deployed after merge** (2026-08-03, merged PR [#80](https://github.com/Mianxai/MianX.ai/pull/80)).
  - **Root cause:** (1) uncaught `fetch` throw left `loading` true without `finally`; (2) unstable router-dependent effect deps could retrigger loads; (3) `DelayedLoader` misuse; (4) missing unmount abort / stale-response guards.
  - **Fix:** try/finally, named 30s `OBJECTIVES_FETCH_TIMEOUT_MS` abort, unmount abort without misleading errors, request-id stale protection, schema/invalid-JSON handling, ErrorState + single Retry.
  - **Evidence:** `ObjectivesClient.test.jsx` lifecycle coverage. Authenticated Production Objectives UI not directly browser-verified without credentials.

## Current blockers

1. Founder Final Review not approved (independent of docs).
2. Provider not configured (`providerName: none`).
3. Model availability and pricing verification pending (official docs / separately authorized Models API).
4. Live switches not enabled; no Founder-authorized live pilot run.
5. Documentation Stage 2+ refactor (README/roadmap split) not started.
6. Remaining UI debt: further catalogue-card dedupe; Setup+Readiness collapse not authorized.

## Next operational milestone

Complete Stage 1 documentation canonicalization and Admin workforce truth alignment, then proceed to a
**Founder-authorized** controlled one-agent Production proof only after provider
configuration, both live switches, exact approval, and separate run authorization —
without declaring Stage 2 complete before Stage 1 exit criteria.

## Evidence references

- Production site: https://mian-x-ai.vercel.app
- `execution/EXECUTION-BOARD.md`
- `execution/PHASE-II1-CONTROLLED-LIVE-AGENT-PILOT.md`
- `execution/PHASE-II2-OPENAI-LIVE-PILOT-PATH.md`
- `doc/DOCUMENT-STATUS-REGISTRY.md`
- `doc/CANONICAL-DOCUMENT-MAP.md`
- `doc/ADMIN-WORKFORCE-RESPONSIBILITY-MAP.md`
- `doc/ONE-AGENT-PROVIDER-ACTIVATION-RUNBOOK.md`
- `doc/ONE-AGENT-OPENAI-CONTRACT-NOTES.md`
- Branch preservation: `backup/docs-upgrade-raw-20260803`

## Explicit non-claims

This baseline does **not** claim:

- 445 active agents;
- 445 live-tested agents;
- an operational Memory Engine product;
- a complete autonomous enterprise;
- a completed marketplace;
- a completed global platform;
- that documentation completeness equals Production readiness of every described system;
- that GitHub scheduled fallback delivery is verified;
- that Founder Final Review is approved;
- that any genuine OpenAI call has been made;
- that authenticated Production Projects/Objectives UI was browser-verified without credentials.
