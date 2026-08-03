---
title: One-Agent Provider Activation Runbook
document_status: draft
implementation_status: readiness_only
production_status: not_activated
verification_status: not_executed
authority_status: founder_gated
as_of: 2026-08-03
classification: Internal
---

# One-agent provider activation runbook

This runbook is **readiness documentation only**. No phase below has been
executed for a genuine OpenAI generation call. Live switches remain off.
Provider remains `none`. Founder Final Review remains independent and not
approved by this document.

## Execution flow (implemented path — not live-called)

```text
Admin request (/admin/live-agent-pilot or POST /api/admin/live-agent-pilot/execute)
  → durable queue (pilot run record; no OpenAI call)
  → runtime tick (processExplicitPilotQueue / processPilotWorkFromSchedulerTick)
  → preflight + activation gate (fail closed)
  → provider adapter (server-only openai SDK)
  → Responses API (store:false, tools:[], structured text.format)
  → schema validation
  → durable evidence
  → terminal run state
```

## Phase 0 — Current blocked baseline

| Field | Value |
|-------|-------|
| Authorization | None required to observe |
| Mutation | None |
| Rollback | N/A |
| Stop condition | Always stop here until Founder authorizes Phase 1+ |
| Evidence | Preflight: provider not configured; model/pricing not verified; switches Off; providerCallAllowed false; liveExecutionReady false |
| Prohibited | API key entry in chat/Admin; Models API call; generation call; switch enablement; agent allocation |

## Phase 1 — Founder reviews official model and pricing evidence

| Field | Value |
|-------|-------|
| Authorization | Founder |
| Mutation | Documentation / verification status only after review |
| Rollback | Leave statuses `not_checked` / `unverified` |
| Stop | Official docs or Models API do not confirm candidate model/pricing |
| Evidence | Written Founder note citing official OpenAI URLs + retrieval date |
| Prohibited | Inventing replacement pricing; claiming verified from blogs |

## Phase 2 — Founder adds API key via Vercel Production sensitive env

| Field | Value |
|-------|-------|
| Authorization | Founder |
| Mutation | Vercel Production env `OPENAI_API_KEY` (sensitive) |
| Rollback | Remove / rotate key in Vercel |
| Stop | Key cannot be stored securely |
| Evidence | Preflight `apiKeyConfigured: yes` only (never print value) |
| Prohibited | Pasting key into Admin, PR, logs, fixtures, chat |

## Phase 3 — Non-secret model identifier after verification

| Field | Value |
|-------|-------|
| Authorization | Founder |
| Mutation | Set `LIVE_AGENT_OPENAI_MODEL` to verified allowlisted id |
| Rollback | Unset env |
| Stop | Model unavailable or mismatch |
| Evidence | Model availability status → `verified` only after Models API / official proof |
| Prohibited | Silent model substitution |

## Phase 4 — Configuration-only preflight (key presence)

| Field | Value |
|-------|-------|
| Authorization | Founder |
| Mutation | None (read-only preflight) |
| Rollback | N/A |
| Stop | Preflight fails presence/isolation/policy checks |
| Evidence | Admin preflight grid |
| Prohibited | Generation call |

## Phase 5 — Authenticated Models API verification (separately authorized)

| Field | Value |
|-------|-------|
| Authorization | Explicit Founder authorization for Models API only |
| Mutation | Verification status update after successful check |
| Rollback | Revert status to `not_checked` |
| Stop | Model missing / mismatch |
| Evidence | Request id + availability status (no secret) |
| Prohibited | Treating Models API as a generation call; storing full key |

## Phase 6 — Pricing / cost-bound verification

| Field | Value |
|-------|-------|
| Authorization | Founder |
| Mutation | Pricing verification → `verified` only with official evidence |
| Rollback | `unverified` |
| Stop | Cannot prove cost ≤ $0.10 worst-case under pilot token caps |
| Evidence | Official pricing citation + computed bound |
| Prohibited | Bypassing $0.10 ceiling; inventing prices |

## Phase 7 — Allocate exactly one pilot agent

| Field | Value |
|-------|-------|
| Authorization | Founder |
| Mutation | Single pilot allocation in disposable/pilot project only |
| Rollback | Deallocate |
| Stop | Any second agent allocation requested |
| Evidence | allocated=1 for pilot slug only; workforce global active remains honest |
| Prohibited | Allocating fleet seats; claiming 445 active |

## Phase 8 — Queue exactly one pilot task

| Field | Value |
|-------|-------|
| Authorization | Founder approval record |
| Mutation | One queued durable run |
| Rollback | Cancel / kill switch |
| Stop | Queue depth would exceed 1 |
| Evidence | Queue counters |
| Prohibited | Auto-retry loops; scheduler auto-create |

## Phase 9 — Enable live switches in controlled order

| Field | Value |
|-------|-------|
| Authorization | Founder |
| Mutation | `LIVE_AGENT_EXECUTION_ENABLED` then `LIVE_AGENT_PILOT_ENABLED` |
| Rollback | Set both false; arm kill switch |
| Stop | Any preflight blocker remains |
| Evidence | Switch status + preflight |
| Prohibited | Enabling without Phases 1–8 complete |

## Phase 10 — Exactly one genuine Responses API generation call

| Field | Value |
|-------|-------|
| Authorization | Founder live-run authorization recorded |
| Mutation | One OpenAI Responses create |
| Rollback | Kill switch; disable switches |
| Stop | Any gate failure before network |
| Evidence | Provider request id, usage, cost, durable evidence |
| Prohibited | Tools; store:true; streaming; background; continuation |

## Phase 11 — Durable evidence verification

| Field | Value |
|-------|-------|
| Authorization | Founder review |
| Mutation | None beyond persisted evidence already written |
| Rollback | N/A (immutable evidence) |
| Stop | Missing usage/cost/request id / schema invalid |
| Evidence | Run terminal state + evidence row |
| Prohibited | Fabricating success; incrementing live-tested without genuine gate |

## Phase 12 — Disable switches unless continuation approved

| Field | Value |
|-------|-------|
| Authorization | Founder |
| Mutation | Switches off |
| Rollback | N/A |
| Stop | N/A |
| Evidence | Preflight returns Off / false again |
| Prohibited | Leaving live switches on by default |

## Explicit non-claims

- No phase has already happened for Production live generation.
- Authenticated Models API verification has **not** occurred in the
  activation-readiness PR.
- Genuine provider generation has **not** occurred.
- Founder Final Review remains **not approved**.
