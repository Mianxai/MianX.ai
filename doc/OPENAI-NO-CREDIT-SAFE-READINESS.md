# OpenAI no-credit safe readiness

Status: Preview / Draft (branch `cursor/openai-no-credit-safe-readiness`)  
Date: 2026-08-03  
Scope: Mianxai/MianX.ai — Production project `mian-x-ai` only

## Production truth (post key configuration)

- `OPENAI_API_KEY` was configured by the Founder through the Vercel Production
  sensitive environment UI and Production was redeployed.
- Server-side presence is verified **only** as the boolean
  `apiKeyConfigured: true`.
- No key value, fragment, length, hash, or environment dump is retained in
  Admin reports or logs by design (`getApiKeyPresenceStatus`).

Founder-observed billing balance on 2026-08-03: $0.00.  
Not machine-verified by MianX.ai.

## What was not performed

- No Models API request.
- No Responses / generation request.
- No live switch enablement.
- No agent allocation or activation.
- No real pilot task queue.
- No real live-run authorization creation.
- No Founder Final Review change.
- No database migration.

## Why `providerCallAllowed` remains false

Key presence is necessary but not sufficient. Fail-closed gates still require:

1. Account model-access status `verified` (separate Founder authorization for
   exactly one Models API check).
2. Billing credit status `available` (machine-verified later — currently
   `not_checked`; do not infer from key presence or from Founder-observed UI).
3. Billing mode status `standard` (or another Founder-approved path).
4. One-time live-run authorization matching the bounded envelope.
5. Exactly one allocated pilot agent and one queued task.
6. Execution switch then pilot switch enabled in that order.

Until those gates pass, `providerCallAllowed: false` and
`liveExecutionReady: false`.

## Credit-independent work completed (fixtures / mocks only)

- Model and snapshot allowlist validation.
- Token-envelope and integer micro-USD cost calculations.
- Task-envelope hashing and authorization checksum validation.
- One-time authorization state machine, idempotency, duplicate-delivery, and
  crash-recovery tests.
- Evidence schema validation.
- Provider error categorization (`insufficient_quota`, `payment_required`,
  `billing_not_active`, `account_deactivated`, `rate_limit_exceeded`,
  `model_not_available`) with **no automatic retry**, sanitized operator
  blockers, and no raw provider body exposure.
- Switch-off rehearsal (documentation helper — cannot mutate Vercel env).
- Admin blocker rendering for account access + billing readiness.
- Secret-exposure regression tests.

## Future minimum funding step

When the Founder funds the OpenAI account:

1. Confirm credits in the OpenAI billing UI (human observation).
2. Do **not** enable switches automatically.
3. Do **not** call Models API or generation immediately after credits appear.
4. Obtain a **separate** Founder authorization for exactly one Models API
   account-access check.
5. Obtain a **separate** Founder authorization for exactly one generation
   attempt (authorization row + envelope + switches) only after account access
   and billing readiness are verified.

## Rollback / key removal

1. In Vercel → `mian-x-ai` → Settings → Environment Variables, remove or rotate
   `OPENAI_API_KEY` (Production).
2. Redeploy Production.
3. Confirm `apiKeyConfigured: false` (boolean only).
4. Keep both live switches off.
5. Do not delete durable evidence or authorization history.

## Related docs

- `doc/ONE-AGENT-FIRST-LIVE-RUN-READINESS-PACKET.md`
- `doc/ONE-AGENT-PROVIDER-ACTIVATION-RUNBOOK.md`
- `doc/CURRENT-STATE.md`
