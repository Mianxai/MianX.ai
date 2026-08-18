# Live Agent Acceptance Checklist

**Status this PR:** LIVE SMOKE NOT YET RUN · live-tested = 0

## A. Deterministic provider test-double (CI — required)

- [x] `runProviderTestDoubleE2E` passes without network
- [x] Structured output + tool call + evidence + independent QA
- [x] Project isolation + instance release
- [x] No protected side effect
- [x] Queue bridge: openrouter job + injected test-double adapter succeeds
- [x] Openrouter job without key fails closed

## B. Live OpenRouter smoke (Founder-only — not run in this PR)

Gates (all required):

- [ ] `OPENROUTER_API_KEY` set
- [ ] `ALLOW_LIVE_PROVIDER_TEST=true`
- [ ] `OPENROUTER_DEFAULT_MODEL` set (free route)
- [ ] Explicit safe disposable project UUID
- [ ] Explicit request limit ≤ 3
- [ ] Explicit token limit
- [ ] Explicit confirm flag

Verify after smoke:

- [ ] Real provider response
- [ ] One safe internal tool call
- [ ] Structured output
- [ ] Durable evidence record path
- [ ] Independent QA
- [ ] Project isolation
- [ ] Instance release
- [ ] Model name recorded
- [ ] Latency recorded
- [ ] Tokens recorded
- [ ] No protected side effect

Command:

```bash
npm run agents:live-smoke
```

Maximum provider calls: **3**.
