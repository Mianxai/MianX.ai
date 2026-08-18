# One-Key OpenRouter Activation Guide

## Only required secret for normal real-agent startup

```bash
OPENROUTER_API_KEY=<secret>
```

## Safe defaults (automatic)

```bash
OPENROUTER_DEFAULT_MODEL=openrouter/free
OPENROUTER_FREE_ONLY=true
OPENROUTER_PAID_FALLBACK_ENABLED=false
OPENROUTER_APP_NAME=MianX.ai
```

Optional: `OPENROUTER_SITE_URL`, `OPENROUTER_MAX_REQUESTS_PER_RUN`, `OPENROUTER_MAX_TOKENS_PER_RUN`.

## Behaviour

- Free-only routing; paid fallback hard-disabled
- Fail closed if no compatible free model
- Roles use provider-neutral capability profiles — **no manual rewrite of every role from Anthropic to OpenRouter**
- Precedence: task requirement → project policy → org policy → system OpenRouter default → fail closed

## Founder steps

1. Deploy approved code  
2. Apply Phase I.2 migration (`npx supabase db push --dry-run` then apply)  
3. Set `OPENROUTER_API_KEY`  
4. Open `/admin/workforce-activation`  
5. Run controlled activation check on a disposable project  
6. Activate AI Software House for normal work  
