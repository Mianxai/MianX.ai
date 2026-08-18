# Real Agent Live Acceptance

**This PR: LIVE TESTED = 0**

Gated command:

```bash
ALLOW_LIVE_PROVIDER_TEST=true OPENROUTER_FREE_ONLY=true \
OPENROUTER_API_KEY=… \
npm run workforce:live-activation-check -- --project <safe-uuid> --confirm
```

Max 3 provider calls. Verifies: response, safe tool, artifact, evidence, QA, isolation, instance release, tokens/latency, no protected side effect.

Do not run from Cursor, CI, Preview, Playwright, or normal builds.
