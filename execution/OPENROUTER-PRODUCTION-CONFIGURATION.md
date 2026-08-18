# OpenRouter Production Configuration

## Defaults (safe)

| Variable | Value |
|----------|-------|
| `OPENROUTER_FREE_ONLY` | `true` |
| `OPENROUTER_PAID_FALLBACK_ENABLED` | `false` |
| `ALLOW_LIVE_PROVIDER_TEST` | `false` (until controlled test) |
| `OPENROUTER_MAX_REQUESTS_PER_RUN` | `3` |
| `OPENROUTER_MAX_TOKENS_PER_RUN` | `8000` |
| `OPENROUTER_DEFAULT_MODEL` | `openrouter/free` |

## Resolution order

task capability → project provider policy → organization provider policy → safe OpenRouter default → **fail closed**

Never silently route to a paid model. Never auto-fall back to Anthropic. Never expose the key in browser responses or logs.

When no compatible free model exists, show:

> No compatible free OpenRouter model is currently available. No provider request was sent.

## Script

```bash
scripts/configure-openrouter-production.sh
```

Input is hidden; the key is never printed. Redeploy after setting env vars. Verify via `/api/core/health` `provider` block only.
