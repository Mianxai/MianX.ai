---
title: One-agent first-live-run readiness packet
document_status: draft
implementation_status: readiness_only
production_status: not_executed
verification_status: not_executed
authority_status: founder_gated
as_of: 2026-08-03
classification: Internal
---

# One-agent pilot — final first-live-run readiness and Founder action packet

**Preview / Draft readiness only.** No phase below is complete. This packet does
**not** configure `OPENAI_API_KEY`, call Models API, generate Responses, enable
switches, allocate an agent, queue a task, or create a real authorization.

Canonical code: `lib/core/live-pilot/control-plane/first-live-run-readiness.js`

Related:

- `doc/OPENAI-SECURE-CONFIG-AND-MODEL-CHECK-RUNBOOK.md`
- `doc/OPENAI-NO-CREDIT-SAFE-READINESS.md`
- `doc/ONE-AGENT-PROVIDER-ACTIVATION-RUNBOOK.md`
- `doc/ONE-AGENT-LIVE-RUN-CONTROL-PLANE.md`

## Current Production baseline (post PR #88 merge `715b700…`)

| Field | Current |
|------|---------|
| Authorization store | available |
| Authorization rows | 0 |
| provider execution | blocked (key present ≠ live-ready) |
| apiKeyConfigured | true (boolean only) |
| officialCatalogStatus | verified |
| accountAccessStatus | not_checked |
| officialPricingStatus | verified |
| billingModeStatus | unknown |
| billingCreditStatus | not_checked |
| providerCallAllowed | false |
| liveExecutionReady | false |
| switches | false |
| Models API / generation | 0 / 0 |

Founder-observed billing balance on 2026-08-03: $0.00.  
Not machine-verified by MianX.ai. Key presence does not imply credits.
| workforce | 445 / 445 / 445 |
| allocated / active / live-tested | 0 / 0 / 0 |
| Founder Proof | awaiting_final_review / founder_final_review |
| Founder Final Review | not approved |
| Models API / generation | 0 / 0 |

## C1 — Blocker matrix

Built by `buildFirstLiveRunBlockerMatrix()`. Each row includes current value,
required value, owner, mutation required, authorization required, evidence,
rollback, and stop condition. Current blockers include: API key, provider,
account access, billing path, one-time authorization, switches, and
providerCallAllowed / liveExecutionReady.

## C2 — Exact Founder action sequence (15 phases)

1. Add `OPENAI_API_KEY` via Vercel sensitive Production UI  
2. Redeploy + boolean key-presence check  
3. Authorize exactly one Models API check  
4. Run exactly one model-access check (approved model/snapshot)  
5. Review model-access result  
6. Verify billing path + cost envelope  
7. Create exactly one one-time live-run authorization  
8. Allocate exactly one approved pilot agent  
9. Queue exactly one bounded pilot task  
10. Enable execution switch  
11. Enable pilot switch  
12. Exactly one Responses generation attempt  
13. Immediately disable both switches (pilot then execution)  
14. Verify durable evidence  
15. Decide live-tested marking  

No phase claims completion in this Draft.

## C3 — Pilot identity and task envelope

| Item | Value |
|------|-------|
| Pilot slug | `mianx-internal-architecture-reviewer` |
| Canonical project UUID | `61d3b1fd-c260-479b-9289-0c75f977e892` |
| Hard-code in reusable business logic | **forbidden** — use constants |

Envelope (template only — not queued):

- caps: 4000 / 1200 / 5200 tokens  
- tools: `[]` · `store: false`  
- standard estimate: 8400 µUSD · ceiling: 100000 µUSD  
- provider timeout: 60s · wall timeout: 90s  
- max attempts: 1 · concurrency: 1 · queued tasks: 1  
- approved model/snapshot: `gpt-5.4-mini` / `gpt-5.4-mini-2026-03-17`

## C4 — First-call acceptance

Pass requires: one attempt, request ID, schema pass, durable output, token/cost
within auth, checksum valid, auth consumed once, switches off after, Proof/Final
Review unchanged.

Automatic fail / manual review: missing request ID, schema/token/cost/checksum
failure, persistence ambiguity, timeout, uncertain attempt, duplicate execution.
No automatic retry of uncertain calls.

## C5 — Switch order and rollback

Enable: (1) execution (2) pilot  
Disable: (1) pilot (2) execution  

Rollback classes cover before/after key configuration, before/after model check,
before authorization, before allocation, before/after queue, after auth
consume, after provider response, evidence failure, and indeterminate attempt.
**Never delete historical evidence.**

## C6 — Founder authorization templates

Nine non-executable templates exist in code for: key confirmation, Models API
check, live-run authorization, pilot-agent allocation, task queue, switch
enablement, generation attempt, post-run switch-off, evidence acceptance. Each
names repository/project scope, model/snapshot, task/envelope, cost ceiling,
expiry, and shared prohibitions (extra calls/tasks, unrelated migrations,
database resets/repairs, unrelated env changes, Founder Proof, Founder Final
Review).

## C7 — Admin Founder checklist

Read-only Admin section shows baseline zero-state (auth store, provider, API
key, account access, billing, authorization, allocated/queued/concurrent,
switches, call counters, readiness flags), completed foundation, current
blockers, next manual Founder action, and prohibited actions. No secret field,
Run now, switch controls, allocation, or automatic authorization.

## Next exact Founder action

Phase 1 — manually add `OPENAI_API_KEY` through the intended Vercel project's
sensitive Production environment UI only. Do not paste into Cursor, chat, or
Terminal. Do not enable switches in the same change.
