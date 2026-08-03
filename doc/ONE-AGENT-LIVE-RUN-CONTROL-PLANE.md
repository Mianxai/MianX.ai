---
title: One-Agent Live-Run Control Plane
document_status: draft
implementation_status: preview_control_plane
production_status: not_activated
verification_status: fixture_tested
authority_status: founder_gated
as_of: 2026-08-03
classification: Internal
---

# One-agent live-run control plane

Preview/Draft truth only. This document describes the control plane that
gates a future one-agent live run. It does **not** authorize a live run.

## Architecture flow

```text
Founder secure key config (future)
  → key-presence check (boolean only)
  → separate Founder model-access authorization (future)
  → at-most-one Models API verification (disabled by default)
  → one-time live-run authorization (fixture/DB contract)
  → execution lock (all gates)
  → atomic authorization consume at provider-attempt boundary
  → genuine Responses call (NOT performed in this PR)
  → evidence + post-run lockout
```

## Storage decision

**B — Existing schema partially sufficient.**

`pilot_approvals` can hold soft metadata in `payload` jsonb but lacks
one-time lifecycle columns (`expires_at`, `consumed_at`, status CHECK for
`authorized|consumed|expired|revoked`, issuance uniqueness, atomic consume).

Dedicated migration included (not applied):

- `supabase/migrations/20260803120000_pilot_live_run_authorizations.sql`
- rollback: `supabase/rollbacks/20260803120000_pilot_live_run_authorizations.rollback.sql`
- RLS: service_role only (same as other `pilot_*` tables)
- Indexes: issuance idempotency unique; partial unique for one outstanding
  `authorized` row per project+agent+task envelope

| Field | Value |
|-------|-------|
| migrationRequired | yes |
| migrationIncluded | yes |
| migrationApplied | **no** |
| ProductionDatabaseChanged | **no** |
| Fail-closed without migration | **yes** — `authorization_store_unavailable`; Admin/status/runtime tick must not crash; `providerCallAllowed` stays false |

## Fail-closed compatibility (migration unapplied)

When `pilot_live_run_authorizations` is absent:

- Admin Live Agent Pilot loads with truthful `authorizationStoreStatus: not_applied|unavailable`
- Blocker includes `authorization_store_unavailable`
- No fabricated authorization
- No silent bypass
- No provider call
- Runtime tick does not query the missing table in a hot loop

Migration application requires separate Founder authorization (not this PR merge).

## Authorization state machine

`draft` → `authorized` → `consumed`

Terminal alternatives: `expired`, `revoked`

**Database guarantee (when migration applied):** single guarded
`UPDATE … WHERE status='authorized' AND consumed_at IS NULL AND expires_at > now() … RETURNING`
via `consume_pilot_live_run_authorization` (SECURITY DEFINER, `search_path=public`,
execute granted to `service_role` only). Duplicate callers receive zero rows
(`ALREADY_CONSUMED_OR_CONFLICT`).

Honest wording: **atomic one-time authorization consumption** /
**duplicate-consumption protection** / **at-most-one authorized
provider-attempt boundary**. This is **not** a claim of distributed
exactly-once provider execution.

A crash after consumption must **not** permit a second provider call.
Recovery: do not un-consume; Founder may issue a **new** authorization only
after explicit review (`authorizationCrashRecoveryProcedure`). When it is
unclear whether the provider was invoked, enter manual-review/indeterminate
— never auto-retry the same authorization.

Independent from Founder Final Review and Founder Proof. Never auto-created
from Final Review, project state, or a queued task alone.

## Account-access verification flow

- Disabled by default (`capabilityEnabled: false`)
- Separate from generation
- Requires explicit authorization + injected/server fetcher
- Admin-only server path; no client OpenAI SDK
- No API key in response/logs
- Max one verification attempt per authorization (consume on attempt)
- Idempotency key supported
- Results: `verified | unavailable | mismatch | failed`
- Current Production truth: `accountAccessStatus: not_checked`

Public catalog verification ≠ account access verification.

## Key-presence privacy

Allowed: `{ apiKeyConfigured: true|false, providerName, calledOpenAI: false }`

Forbidden: key value, prefix, suffix, length, hash, env dump, headers.

Current: `apiKeyConfigured: false`, `providerName: none`

## Execution lock

Before a genuine generation call, require authorization authorized (not
expired/revoked/consumed), checksum valid, project/agent/task/model/snapshot
match, cost/token limits, provider+key configured, account access verified,
billing + official pricing verified, execution+pilot switches on, exactly one
queued task, no concurrent run, scheduler healthy, evidence store available,
idempotency lock acquired. Fake provider selection is rejected.

## Kill switches and post-run lockout

- Global execution switch / pilot switch (env; app cannot mutate Vercel)
- Kill switch (Admin)
- Consumed authorization
- Terminal task state
- Provider-attempt idempotency lock

Manual switch-off: unset `LIVE_AGENT_EXECUTION_ENABLED` and
`LIVE_AGENT_PILOT_ENABLED` in Vercel; arm kill switch; retain evidence.

## Admin control plane

Read-only / preparation display on `/admin/live-agent-pilot`:

- provider / API key configured (yes/no)
- catalog / account / pricing / billing statuses
- authorization status / expiry / consumed
- switches, queue, concurrency, scheduler, evidence
- `providerCallAllowed` / `liveExecutionReady` (remain false)
- remaining blockers

**No** Run-now, secret input, API key field, or Production authorization create.

## Security model

- Admin auth required for status/control_plane view
- Allowlists for provider/model
- Sanitized errors; no service-role leakage
- Fixture writes forbidden when `VERCEL_ENV=production` outside Vitest

## Remaining blockers before secure key configuration

1. Founder configures `OPENAI_API_KEY` in Vercel (sensitive) — not done
2. Founder authorizes Models API account-access check — not done
3. Founder creates real one-time live-run authorization — not done
4. Founder enables live switches — not done
5. Migration apply after dry-run review — not done
6. Founder Final Review remains **not approved**

## Exact future Founder actions

1. Review migration dry-run; apply when ready
2. Configure OpenAI key in Vercel Production sensitive env
3. Authorize one Models API verification
4. Issue one-time live-run authorization with limits
5. Enable switches only for the disposable pilot project
6. Observe evidence; switch off; never auto-approve Final Review

## Preview truth (this PR)

| Item | Value |
|------|-------|
| PR #84 | Merged + Production verified (`405171b`) before this Draft |
| Real API key configured | no |
| Account access | not_checked |
| Authenticated Models API calls | 0 |
| Genuine generation calls | 0 |
| providerName | none |
| Switches | false |
| Agents allocated/active/live-tested | 0/0/0 |
| Real authorization created | no |
| Control-plane PR | Draft (do not merge until Founder review) |
| Founder Final Review | not approved |
