# MianX Core V1 — Founder go-live activation checklist

Operational steps only. No secrets. No automatic production mutation.

## Production URL

- Default Vercel host: `https://mian-x-ai.vercel.app`
- Canonical: whatever `NEXT_PUBLIC_SITE_URL` is configured to

## 1. Health (already verifiable without login)

```bash
curl -sS https://mian-x-ai.vercel.app/api/core/health | jq .
curl -sS -o /dev/null -w "%{http_code}\n" -X POST \
  https://mian-x-ai.vercel.app/api/internal/runtime/tick
# expect 401 without Authorization
```

Expected readiness (current production snapshot):

- database: configured
- runtime_jobs_schema: configured
- admin_membership_schema: configured
- scheduler_secret / worker: configured
- scheduler_active / automaticProcessing: unconfigured (external scheduler required)
- provider: unconfigured (UI works; agent runs need Anthropic)
- durable_rate_limiter: unconfigured (in-memory, honestly labelled)

## 2. Scheduler (Founder action)

Do **not** add in-repo Hobby cron (`vercel.json` sub-daily is rejected on Hobby).

Configure an external scheduler (or Vercel Pro Cron) to:

`POST /api/internal/runtime/tick`  
Header: `Authorization: Bearer <INTERNAL_RUNTIME_SECRET or CRON_SECRET>`

Suggested cadence: every 1–5 minutes. Bounded jobs per tick. Overlap protected by leases.

## 3. Disposable advisory objective (Founder UI)

1. Create/select a disposable project named e.g. `mianx-core-go-live-test` (not customer data).
2. Open `/admin/objectives`.
3. Submit:

   - Objective: Analyse the current MianX Core production readiness and recommend the three highest-priority improvements. Do not deploy, change production data, send external communication, modify secrets, alter billing, or perform protected actions.
   - Priority: normal/high
   - Risk: advisory / R2
   - Protected action: none

4. Confirm CEO Brief + Outputs update after jobs process (requires scheduler tick **and** provider if live Anthropic runs are required; fake provider covers CI only).

## 4. Protected reject test (Founder UI)

1. Same disposable project.
2. Objective proposing `production_deploy` (or equivalent protected action).
3. Expect: awaiting approval → Founder Inbox item → reject → cancelled → audit.
4. Confirm no deploy occurred.

## 5. Provider / rate limit (optional)

- Anthropic: set `ANTHROPIC_API_KEY` only if Founder wants live synthesis.
- Durable rate limit: configure existing adapter URL/token when ready — until then status stays non-durable.

## Explicit non-actions

- Do not merge PRs without Founder approval
- Do not apply migrations from this checklist
- Do not print secrets
- Do not fill 445 capacity slots
