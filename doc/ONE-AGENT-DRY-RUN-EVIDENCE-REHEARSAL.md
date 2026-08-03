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

## Fake-provider isolation

- Module: `lib/core/live-pilot/dry-run/fake-provider.js`
- Allowed only when `VITEST` / `NODE_ENV=test`
- Forbidden when `VERCEL_ENV=production` or `NODE_ENV=production` outside Vitest
- Any `LIVE_AGENT_FAKE_PROVIDER` env flag is rejected
- No Admin button can invoke the fake provider
- No Production API route exposes it

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

Fixture-only live-run authorization requires id, timestamp, project, agent, task,
max cost, model/snapshot, expiry, one-time consume. Independent from Founder Final
Review. No real authorization records are created in Production by this PR.

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
