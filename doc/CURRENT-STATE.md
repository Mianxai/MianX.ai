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

`e5b0f503841e6fafbfb4f1d2e1e93c3b17bd17aa`

(Includes merged Phase II.2 OpenAI one-agent live path. Does not imply a live provider run.)

## Deployment state

| Item | Value |
|------|-------|
| Production URL | https://mian-x-ai.vercel.app |
| Manual Production deploy from this documentation PR | not performed |
| Environment / secrets changed by this docs work | no |

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
| Pending database migrations (last verification) | none |
| Migrations changed by this documentation PR | no |

## Workforce truth

| Metric | Value |
|--------|-------|
| capacitySeats | 445 |
| compiledSeats | 445 (planning capacity) |
| persistedSeats | 445 |
| readyToAllocateSeats | 445 |
| allocatedSeats | 0 |
| activeInstances / active agents | 0 |
| liveTestedSeats / live-tested agents | 0 |

**445 is capacity planning, not 445 running or live-tested agents.**

## AI provider truth

| Item | Value |
|------|-------|
| OpenAI execution path | merged into main |
| Provider configured | no |
| providerName | none |
| Genuine provider calls | 0 |
| liveExecutionReady | false |

## Live execution truth

| Item | Value |
|------|-------|
| LIVE_AGENT_EXECUTION_ENABLED (Production posture) | false / not activating agents |
| LIVE_AGENT_PILOT_ENABLED | false |
| Pilot agent allocated / activated | no |
| Real OpenAI network proof run | not performed |

## Founder Proof truth

| Item | Value |
|------|-------|
| status | awaiting_final_review |
| Final Founder Review | not approved |
| Auto-approval | forbidden |

## Documentation maturity

| Item | Value |
|------|-------|
| Enterprise portal draft (`doc/README.md`) | large enterprise draft; Stage 1 truth-corrected |
| Master roadmap (`doc/complete-roadmap.md`) | planning monolith; future sections planned |
| Canonical map / registry / baseline | Stage 1 created |
| Large split of README/roadmap | **not done** (deferred) |

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

- Workforce, Readiness, and Workforce Ops responsibility overlap requires audit before consolidation.
- GitHub scheduled fallback external-delivery proof remains pending.

## Resolved issues

- **Projects card Founder Proof contradiction** — **resolved** (2026-08-03, Draft PR [#80](https://github.com/Mianxai/MianX.ai/pull/80)).
  - **Root cause:** `/admin/projects` treated missing/`null` operational summary (including in-flight load and fetch failure) as “No active Founder Proof”, and labeled proof from `canonical_integration_run` alone instead of the shared `founder_proof_ui` / status classification. During load, metrics showed “…” while Founder Proof falsely claimed no active proof.
  - **Fix:** Shared `lib/core/integration/founder-proof-status.js` classification; Projects card uses `resolveProjectsFounderProofDisplay` so `awaiting_final_review` / `founder_final_review` is active review-pending; explicit Loading… / Unavailable metric states; per-project ops load errors no longer map to empty proof.
  - **Verification evidence:** unit tests in `founder-proof-status.test.js`, `projects-truth.test.jsx`, `admin-ops-summary.test.js` (awaiting_final_review → active; no-proof empty preserved; failure → Unavailable; metrics not left as “…”).
  - **Resulting truthful behavior:** Canonical project with awaiting_final_review shows active Founder Proof waiting for final Founder review; Final Review remains unapproved; no fabricated metrics.

## Suspected issues requiring reproduction

- Objectives loading anomaly — **client failure modes reproduced and hardened** (2026-08-03, Draft PR [#80](https://github.com/Mianxai/MianX.ai/pull/80)). Evidence: (1) uncaught `fetch` throw left `loading` true with no `finally`; (2) unstable `useCallback`/`useEffect` deps on `router` could retrigger loads; (3) `DelayedLoader` was invoked with ignored `children`/`delayMs` while `active` defaulted true. Fixed with try/finally, 30s abort timeout, response-schema validation, stable router ref, correct `DelayedLoader active={loading}`, and explicit auth/API/unexpected ErrorState + Retry. Not treated as a permanent Production-only server bug without a live hang after timeout; empty/error states remain truthful (no fabricated objectives).

## Current blockers

1. Founder Final Review not approved (independent of docs).
2. Provider not configured (`providerName: none`).
3. Live switches not enabled; no Founder-authorized live pilot run.
4. Documentation Stage 2+ refactor (README/roadmap split) not started.
5. UI contradictions listed above need separate engineering work.

## Next operational milestone

Complete Stage 1 documentation canonicalization (this stage), then proceed to a
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
- that any genuine OpenAI call has been made.
