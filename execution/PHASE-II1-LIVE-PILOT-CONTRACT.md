# Phase II.1 — Live Pilot Contract (audit)

**Status:** Draft implementation (this PR)  
**Base:** `origin/main` `a6b3ecb57d50f4057e3b03e8415de5ff0f5422bf`  
**Pilot slug:** `mianx-internal-architecture-reviewer`  
**Project:** MianX Internal Production Proof (`61d3b1fd-c260-479b-9289-0c75f977e892`)

This document audits the **actual** live-execution path and separates
simulation from durable Production capability. Simulation is never described
as live execution.

---

## Already implemented and durable

| Area | Evidence |
|------|----------|
| Task queue + worker tick | `runtime_jobs`, `claim_runtime_jobs`, Admin/internal tick |
| Lease acquisition | Job leases; overlapping ticks cannot double-run |
| `lost_lease` / retry | Requeue with backoff; exhausted → `dead_letter` |
| Rate limiter | In-memory default; optional Upstash durable adapter |
| Task idempotency | Core job/idempotency patterns |
| Audit logging | Runtime audit surfaces |
| Project isolation (core) | Project-scoped Admin APIs / RLS on many tables |
| Provider adapters (gated) | Anthropic / OpenRouter via `lib/core/provider.js` — **key-gated** |
| Model allowlist (pilot) | Pilot policy allowlist (server-enforced) |
| Scheduler primary | Supabase Cron `mianx-runtime-tick-5m` / 300000 ms |
| Workforce capacity seats | 445 capacity / compiled / persisted (planning, not live agents) |

---

## Partially implemented

| Area | Gap |
|------|-----|
| Evidence storage | Core/integration evidence exists; **pilot_evidence** additive tables in this PR (not applied) |
| Budget / token / cost | Partial ledger elsewhere; **pilot token/cost tables + policy asserts** in this PR |
| Tool execution | Real-agent tools exist; **pilot forbids all tools** |
| Approval gates | Core approvals exist; **pilot-specific Founder gates** added |
| Kill switches | Workforce control events exist; **pilot kill_switch** store + API added |
| Agent instances | Real-agent in-memory instances; pilot **not allocated** |
| Rate limit durability | Durable only when Upstash env pair set |
| Admin execution UI | Runtime/Execution pages; **dedicated `/admin/live-agent-pilot`** added |

---

## Simulated only

| Claim | Truth |
|-------|-------|
| 445 live agents | Capacity **planning** seats — not 445 running processes |
| Mock provider responses | Test doubles only — `simulated: true`, `networkCalled: false` |
| Phase II.1 execution_prepare “success” | Always blocked — foundation forbids network |

---

## Missing (until later Founder-enabled phase)

| Capability | Notes |
|------------|-------|
| Live provider call for pilot | Blocked by switches + Phase II.1 hard stop |
| liveTestedSeats 0→1 | Only after full genuine evidence gate (not this PR) |
| Agent allocation / activation | Explicit Founder steps later |
| Automatic pilot on scheduler tick | **Forbidden** — tick must not auto-run pilot |
| Paid fallback provider | Forbidden |

---

## Blocked by provider configuration

- `providerName: none` in current Production / Preview without keys
- `liveExecutionReady: false`
- Env var **names** may be documented (`ANTHROPIC_API_KEY`, `OPENROUTER_API_KEY`) — **values must never be committed**
- Both `LIVE_AGENT_EXECUTION_ENABLED` and `LIVE_AGENT_PILOT_ENABLED` default **false**

---

## Pilot-specific foundation added in this PR

- `lib/core/live-pilot/*` — policy, adapter, schema, prompts, eligibility, store, status
- Additive migration `20260801120000_phase_ii1_live_agent_pilot.sql` (**not applied**)
- Admin UI `/admin/live-agent-pilot` — Run disabled
- API `GET|POST /api/admin/live-agent-pilot` — no provider network

---

## Scheduler honesty (unchanged)

- **Verified:** Supabase primary Cron executions + pg_net HTTP 200s (Phase I.9)
- **Pending external event:** GitHub scheduled fallback **delivery** proof — do **not** claim GitHub scheduled delivery verified
- Pilot must **not** execute merely because the five-minute tick runs
