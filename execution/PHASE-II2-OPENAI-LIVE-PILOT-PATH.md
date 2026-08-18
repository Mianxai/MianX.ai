# Phase II.2 — OpenAI one-agent live execution path

**Status:** Draft implementation  
**Base:** `origin/main` `dfa4dd65c5f05810ccc661f404a8e04432e5e43f`  
**Explicit statement:** This PR made **no real provider call**, did not apply migrations,
did not change Production env vars, did not allocate/activate agents, and did not
increment `liveTestedSeats`.

---

## Provider architecture

- Server-only official OpenAI Node SDK (`openai@5.23.2`)
- Responses API (`client.responses.create`)
- Pilot provider resolution prefers OpenAI when `OPENAI_API_KEY` is set; otherwise `none`
- No browser/client OpenAI calls
- No Anthropic/OpenRouter paid fallback for the pilot

## Request safety

Every Responses request enforces:

- `store: false`
- `stream: false`
- `background: false`
- `tools: []` (no web/file/image/function/MCP/computer/shell)
- no `previous_response_id`
- `max_output_tokens: 1200`
- AbortController timeout 60s; wall clock 90s
- one request; automatic retry disabled

## Model registry

| Field | Value |
|-------|-------|
| Model ID | `gpt-5.4-mini` |
| Status | candidate |
| Structured outputs | yes (strict JSON schema) |
| Input price | USD 0.75 / 1M tokens |
| Output price | USD 4.50 / 1M tokens |
| Pricing version | `openai-gpt-5.4-mini-2026-08-01` |

Unknown model or missing pricing → fail closed. No silent substitution.

## Cost calculation

- Preflight uses worst-case 4000 input + 1200 output against registry pricing
- Reject before invoke when preflight > USD 0.10
- Post-run uses provider-returned usage; missing usage fails acceptance
- Actual cost > USD 0.10 fails acceptance

## Queue + runtime tick flow

1. Founder/Admin creates approval (`approval_prepare`)
2. `POST /api/admin/live-agent-pilot/execute` validates gates and creates **one** durable `pilot_runs` row (`queued`)
3. Existing scheduler tick calls `processPilotWorkFromSchedulerTick`
4. Tick **never creates** pilot work; only claims an explicitly queued run
5. Revalidates gates → one OpenAI call (when switches+key allow) → schema validate → persist evidence
6. Only full genuine evidence may set `liveTestedSeats` 0→1

## Approval / lease / idempotency

- Exact project `61d3b1fd-c260-479b-9289-0c75f977e892`
- Exact agent `mianx-internal-architecture-reviewer`
- Unused approval consumed on queue
- Idempotency key unique → duplicate 409
- One lease; lost lease blocks success finalization

## Structured output + evidence

Canonical Phase II.1 schema validated locally after Responses structured output.
Failures persist sanitized evidence and never increment live-tested.

## Switches (default false)

- `LIVE_AGENT_EXECUTION_ENABLED`
- `LIVE_AGENT_PILOT_ENABLED`

Both required before any future network call.

## Exact Production environment variables (names only)

```text
OPENAI_API_KEY=
LIVE_AGENT_OPENAI_MODEL=gpt-5.4-mini
OPENAI_PROJECT=          # optional
OPENAI_ORGANIZATION=     # optional
LIVE_AGENT_EXECUTION_ENABLED=false
LIVE_AGENT_PILOT_ENABLED=false
```

Do not commit values.

## Exact future configuration order

1. Merge + deploy (Founder)
2. Confirm OpenAI billing + key on host
3. Confirm model available on authenticated account
4. Set `LIVE_AGENT_OPENAI_MODEL=gpt-5.4-mini`
5. Set both live switches true
6. Create exact approval for exact task
7. Separate Founder run authorization
8. `POST .../execute` with idempotency key
9. Allow scheduler tick to process the queued item
10. Review evidence; liveTestedSeats may become 1 only on full gate

## Exact one-run / acceptance procedure

See gates in `assessLiveTestedEvidenceGate` — openai provider, allowlisted model,
genuine response ID, usage+cost, structured output, durable records, isolation,
`fabricated=false`, `simulated=false`, no tools, cost ≤ 0.10, runtime ≤ 90s.

## Rollback

1. Set both switches false  
2. Arm kill switch  
3. Remove `OPENAI_API_KEY` from host if needed  
4. Do not auto-decrement fabricated claims  

## Migrations

No migration changed or applied in this PR. Uses applied Phase II.1 schema.
