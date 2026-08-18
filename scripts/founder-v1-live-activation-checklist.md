# Founder checklist — MianX Core v1 live autonomous activation
#
# Disposable test only. No customer data. No production secret changes via agents.
# Complete repository activation PR first, then perform these steps manually.

## A. Scheduler activation (required for automatic processing)

1. In GitHub repo secrets, set:
   - `INTERNAL_RUNTIME_SECRET` (same value as Vercel, ≥16 chars)
   - `RUNTIME_TICK_BASE_URL` = `https://mian-x-ai.vercel.app`
2. Confirm workflow `.github/workflows/runtime-tick.yml` is on `main`.
3. Run **Actions → Runtime tick → Run workflow** once (workflow_dispatch).
4. Verify Control Room / health `lastTick` updates and tick returns HTTP 200.
5. Only then set on Vercel:
   - `RUNTIME_SCHEDULER_PLATFORM=github_actions`
   - `RUNTIME_SCHEDULER_ACTIVE=1`
6. Optional Hobby daily backup: `vercel.json` cron already declares
   `GET/POST /api/internal/runtime/tick` at `0 6 * * *` (Vercel injects
   `Authorization: Bearer <CRON_SECRET>` when CRON_SECRET is set).
7. Do **not** claim automatic until step 4 succeeds.

## B. Provider activation (optional for live AI; queue still truthful without it)

1. Set Vercel `ANTHROPIC_API_KEY` (approved key only).
2. Confirm `/api/core/health` → `productionReadiness.provider` = `configured`
   (never `circuit_open` / never key material).
3. Do not run paid calls from agents in CI.

## C. Durable rate limiter (optional)

1. Set `RATE_LIMIT_DURABLE_URL` and `RATE_LIMIT_DURABLE_TOKEN` (Upstash REST).
2. Confirm health `rate_limit.durable=true` and `active=true`.

## D. Disposable advisory objective (production, after A+B)

1. Create project labelled `DISPOSABLE — Core readiness advisory`.
2. Create objective:
   > Analyse current MianX Core production readiness and provide three prioritised,
   > evidence-backed improvements. Do not deploy, mutate production data, send
   > external communications, modify secrets, change permissions, alter billing,
   > or perform any protected action.
3. Observe CEO plan + Workforce Router selected agents (bounded, not full 445).
4. Observe tasks/jobs/runs advance via scheduler ticks.
5. Confirm outputs + CEO Brief synthesis.
6. Confirm memory candidate(s) appear under `/admin/memory`.
7. Confirm learning candidate only if evidence supports (else none is honest).
8. Confirm no Founder approval required; objective completes truthfully.

## E. Protected action reject

1. In same disposable project, propose objective including `production_deploy`.
2. Expect analysis may complete; protected path → `awaiting_approval`.
3. Founder Inbox shows approval with risk/action explanation.
4. Reject approval.
5. Confirm protected action cancelled, audit `approval.decided`, no deploy,
   objective does not claim deployed.

## F. Cleanup

1. Archive/delete disposable project tasks/jobs/approvals per Admin tools.
2. Leave production secrets unchanged except intentional activation above.
3. Leave customer data untouched.

## Explicit non-actions for agents

- no merge without Founder
- no production deploy from agents
- no migration apply from agents
- no paid provider calls from CI
- no secret output
