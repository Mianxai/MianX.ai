---
title: One-agent dry-run evidence rehearsal
document_status: draft
as_of: 2026-08-03
classification: Internal
---

# One-agent dry-run evidence rehearsal

Preview/Draft documentation only. No Production fake-provider execution.
No API key configuration. No Models API. No genuine Responses generation.
Live switches remain off. Founder Final Review unchanged.

## Flow

```text
Admin queue request (server)
  → durable queue record
  → runtime tick selection
  → preflight
  → activation gate
  → injected fake provider (Vitest only)
  → strict schema validation
  → usage + integer-safe cost calculation
  → durable evidence + checksum
  → terminal test run
```

## Evidence content integrity

Evidence uses a **content-integrity checksum** (SHA-256 over canonical critical
fields). This is **not** a digital signature — there is no signing key.

- Equivalent objects produce the same checksum
- Token / cost / model / terminal-status mutation produces mismatch
- Missing checksum → unavailable / unverified
- Checksum mismatch cannot satisfy genuine live-tested criteria
- Test evidence sets `evidenceEnvironment: test` and never promotes live-tested

## Fake-provider isolation

- Module: `lib/core/live-pilot/dry-run/fake-provider.js`
- Allowed only when `VITEST` / `NODE_ENV=test`
- Forbidden when `VERCEL_ENV=production` or `NODE_ENV=production` outside Vitest
- Any `LIVE_AGENT_FAKE_PROVIDER` / `USE_FAKE_PROVIDER` env flag is rejected
- Production index exports only the Admin report label helper — not the fake client
- No Admin button can invoke the fake provider
- No Production API route exposes it
- Untrusted `providerName` selection of fake/mock is rejected

## Evidence schema

Required fields include pilot/project/agent/task ids, provider name, model,
account-verified status, request id, latency, tokens, estimated cost, price-source
version, schema validation, provider-call count, attempt count, timeout result,
terminal status, blocked reason, error category, created timestamp, checksum.

Forbidden: API keys, Authorization headers, environment dumps, cookies,
service-role values.

## Idempotency

- Duplicate queue idempotency key does not create a second active task
- Duplicate tick after completion claims 0 and does not increment provider-call count
- One attempt / one concurrency remain enforced
- Mock evidence never marks live-tested

## Failure matrix (deterministic tests)

| Scenario | Expected |
|----------|----------|
| Preflight blocked | no provider call |
| Invalid schema | failed run; live-tested 0 |
| Provider timeout/abort | failed; live-tested 0 |
| Two queued tasks | gate blocks |
| Concurrent lease | gate blocks |
| Checksum mismatch | verify fails |
| Switch-off / kill | providerCallAllowed false; Founder Proof unchanged |

## Authorization contract

Fixture-only live-run authorization states: `draft` → `authorized` → `consumed`,
plus `expired` / `revoked`. Independent from Founder Final Review and Founder Proof.
No real authorization records are created in Production by this PR.

## Manual Production rollback (future real pilot)

1. Set `LIVE_AGENT_EXECUTION_ENABLED` and `LIVE_AGENT_PILOT_ENABLED` off in Vercel.
2. Arm kill switch from Admin if a run is in flight.
3. Do not delete historical evidence.
4. Do not auto-reissue live-run authorization.
5. Founder Proof / Final Review remain independent and unchanged.

## Remaining steps before a real call

1. Account Models API verification (Founder-authorized)
2. Billing path verified as standard (or conservative bound)
3. Secure Production API key via Vercel
4. Exact one agent + one queued task
5. Live-run authorization issued
6. Switches enabled in order
7. Exactly one genuine Responses call
8. Evidence review + switch-off

## Production prohibition

Do not enable fake provider in Production. Do not claim dry-run Vitest evidence as
authenticated Production browser evidence.
