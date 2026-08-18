# Phase II.1 — Controlled one-agent live execution pilot foundation

**PR objective:** Implementation-only foundation for a future single live pilot.  
**This PR performs no live provider call.**

Base: `origin/main` `a6b3ecb57d50f4057e3b03e8415de5ff0f5422bf`

---

## Current verified foundation (Production truth)

- Workforce: capacity/compiled/persisted/readyToAllocate **445**; allocated/active/liveTested **0**
- Durability: database/queue/lease/rateLimit **durable true** (as verified)
- Scheduler: `primaryScheduler: supabase_cron`, `schedulerTransitionState: supabase_primary_active`, cadence **300000** ms, job `mianx-runtime-tick-5m`
- GitHub fallback scheduled-delivery proof: **pending external event** (do not claim verified)
- AI: `providerName: none`, `liveExecutionReady: false`, active/live-tested agents **0**
- Founder Proof: `awaiting_final_review` / Final Review waiting — **no auto-approval**

---

## Pilot objective

Live-test **exactly one** AI agent later, proving:

1. Founder-approved agent  
2. Founder-approved task  
3. Configured provider  
4. Bounded model request  
5–8. Durable queue, lease, rate limit, token/cost limits  
9–10. Structured output + durable evidence  
11–12. Project isolation; no external side effect  
13–15. Kill switch; honest failure; no automatic expansion  

---

## Pilot agent

| Field | Value |
|-------|-------|
| Name | MianX Internal Architecture Reviewer |
| Slug | `mianx-internal-architecture-reviewer` |
| Project | MianX Internal Production Proof only |
| Tools | None (no write/shell/GitHub/email/deploy/DB mutate/payment/browse/spawn) |
| Output | Structured analysis text only |
| Activation | Inactive until explicit Founder activation |

Must never access the second project (Mianxai) or other tenants.

---

## Provider-neutral architecture

Contract fields: `providerName`, `modelName`, `requestId`, token totals, `estimatedCostUsd`,
`latencyMs`, `finishReason`, `rawProviderStatus`, `normalizedErrorCode`, `retryable`,
`responseText`, `structuredOutput`, `providerEvidenceMetadata`.

When `providerName = none`:

- Pilot state: **Provider setup required**
- No network call, no fake response/tokens/cost, no live-tested increment
- `liveExecutionReady` remains false

Phase II.1 hard-blocks network even if switches and keys were present.

---

## Safety limits (server-enforced)

| Limit | Default |
|-------|---------|
| Max live agents | 1 |
| Max concurrent | 1 |
| Max queued pilot tasks | 1 |
| Max attempts | 1 |
| Automatic retry | disabled |
| Input / output / total tokens | 4000 / 1200 / 5200 |
| Max estimated cost / run | USD 0.10 |
| Wall clock | 90 s |
| Provider timeout | 60 s |
| Tools / mutations / child runs / schedule auto | forbidden |

### Switches (default false)

- `LIVE_AGENT_EXECUTION_ENABLED`
- `LIVE_AGENT_PILOT_ENABLED`

Both must be true before a **future** provider call is possible.

---

## Approval model

Future execution requires: authenticated Founder/Admin, exact project ID, exact agent slug,
exact approved task ID, explicit approval record, both switches, provider configured,
model allowlisted, budget, no active lease, queue capacity, isolation pass.

- **POST only** for execution-related actions  
- No browser direct provider calls  
- No implicit approval from Founder Proof Final Review  

---

## Queue / lease flow

Reuse durable queue/lease patterns. Pilot run store tracks lease owner/expiry and
idempotency. Runtime tick must **not** auto-start pilot work without every gate.

---

## Structured-output contract

Required: summary, architecture/security/reliability/dataIsolation findings,
operationalRisks, recommendations, blockers, confidence, requiresFounderDecision.

Reject malformed/missing/excessive/tool-call/override/secret content.
Schema failure **must not** mark live-tested.

---

## Evidence model

Success (future) requires provider request ID, non-`none` provider, model, HTTP success,
valid structured output, token+cost accounting, duration, durable run+evidence,
isolation pass, approval, `fabricated=false`, `simulated=false`, no tools, no policy violation.

Only then may `liveTestedSeats` go **0→1** (not in this PR). Cap at one.

---

## Isolation / kill switch / failures

Fail closed on wrong/missing project, cross-project task/approval/evidence/queue/memory,
wrong agent. Kill switch → HTTP 423. Failures record classification; do not inflate metrics.

---

## Exact future Founder activation procedure (do not execute in this PR)

1. Apply Phase II.1 migration after dry-run review (Founder only).  
2. Configure provider key in host secrets (Founder only) — never commit.  
3. Set `LIVE_AGENT_EXECUTION_ENABLED=true` and `LIVE_AGENT_PILOT_ENABLED=true`.  
4. Confirm Admin Pilot UI shows provider configured (still no auto-run).  
5. Create/select exact task in Proof project; POST `approval_prepare`.  
6. Allocate/activate **only** the canonical pilot seat if Founder chooses (separate step).  
7. POST execution (future phase that enables network) for that one approval.  
8. Review evidence; only full genuine gate may set liveTestedSeats=1.  
9. Leave Founder Proof Final Review independent unless Founder explicitly approves it.

---

## Exact one-run acceptance procedure (future)

1. Switches both true; kill switch inactive.  
2. Provider ≠ none; model allowlisted.  
3. Approval for exact project+agent+task.  
4. Single POST execution; lease acquired; no concurrent second run.  
5. Structured output validates; tokens/cost within limits.  
6. Durable run + evidence with fabricated/simulated false.  
7. liveTestedSeats becomes 1; activeInstances/allocated remain truthful.  
8. No other agents activated.

---

## Rollback procedure

1. Set both live switches to false (or unset).  
2. Arm kill switch via Admin Pilot UI / API.  
3. Remove provider key from host if needed.  
4. Do not roll back capacity seats; do not auto-decrement fabricated claims.  
5. Optional: Founder drops empty pilot_* tables only if approved.

---

## Remaining provider requirement

A real provider key and an enabled Phase that permits network calls.  
This PR does **not** configure or invoke any provider.

---

## Explicit statement

**This PR performs no live provider call, no agent allocation, no activation,
no liveTestedSeats increment, no Founder Proof Final Review approval,
no migration apply, and no Production deploy.**
