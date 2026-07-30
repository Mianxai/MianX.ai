# Runtime Scheduler Configuration

Provider-independent. No AI API key required.

```bash
bash scripts/configure-runtime-scheduler.sh
```

- Generates a strong random secret (never printed)
- Sets `INTERNAL_RUNTIME_SECRET` and `CRON_SECRET` on Vercel Production
- Redeploys only after you type `REDEPLOY`
- Verify unauthenticated `/api/internal/runtime/tick` is rejected
- Authenticated tick is a Founder diagnostic only — no provider calls
