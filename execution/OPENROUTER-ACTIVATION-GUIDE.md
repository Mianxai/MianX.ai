# OpenRouter Activation Guide

Founder-only. Agents must not configure production secrets or run live smoke from CI.

## Environment contract

```bash
OPENROUTER_API_KEY=<secret>
OPENROUTER_DEFAULT_MODEL=openrouter/free
OPENROUTER_PAID_FALLBACK_ENABLED=false
OPENROUTER_SITE_URL=https://mianx.ai   # or preview URL
OPENROUTER_APP_NAME=MianX.ai
```

Optional for live smoke only:

```bash
ALLOW_LIVE_PROVIDER_TEST=true
```

## Behavior

- OpenAI-compatible chat completions via OpenRouter
- Free-only model selection; **paid fallback hard-disabled** even if env says `true`
- Fail closed when no compatible free model is available
- Never silently route to a paid model
- CI/Preview use deterministic provider test-double — no external calls

## Queue routing

Jobs with `provider: "openrouter"` are executed through `invokeRealAgent`.  
If `OPENROUTER_API_KEY` is missing, the job fails with `PROVIDER_UNAVAILABLE` (never success).

Catalogue agents still default to `anthropic` until Founder enqueues with OpenRouter or updates agent `defaultProvider`.

## Activation steps (exact)

1. Set the env vars above on the host (Preview or production — Founder only).
2. Confirm Admin → Workforce Readiness shows OpenRouter key present and paid fallback disabled.
3. Run **Real Agent Readiness Check** (no provider calls).
4. Create/select a **disposable safe project** (never the production Founder Proof).
5. Optionally enqueue a single `openrouter` job for that project, or run:

```bash
ALLOW_LIVE_PROVIDER_TEST=true \
OPENROUTER_API_KEY=… \
OPENROUTER_DEFAULT_MODEL=openrouter/free \
npm run agents:live-smoke -- --project <safe-uuid> --confirm
```

6. Verify smoke output: model name, latency, tokens, one safe tool, evidence, QA, instance release, no protected side effect.
7. Only then may `live_tested` counts rise — this Draft PR leaves them at **0**.

## Do not

- Enable paid models or Anthropic paid calls for this activation path
- Run smoke from CI or Cursor agent sessions without explicit Founder authorization
- Mutate production Founder Proof project/run IDs
- Claim Real Agent Ready before live smoke passes
