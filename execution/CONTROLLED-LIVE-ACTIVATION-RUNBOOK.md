# Controlled Live Activation Runbook

**Do not run from Cursor, CI, Preview, or Playwright.**

## Prerequisites

1. Production (or staging) migration applied
2. `npm run workforce:bootstrap` completed (445 seats)
3. `npm run workforce:verify` shows OK and live-tested = 0
4. `OPENROUTER_API_KEY` set on the host
5. Disposable project UUID created (not the Founder Proof project)

## Exact steps

1. Open a secure terminal (not Cursor agent automation).
2. Confirm free-only policy:
   - `OPENROUTER_FREE_ONLY=true`
   - `OPENROUTER_PAID_FALLBACK_ENABLED=false`
3. Temporarily enable the live gate:
   ```bash
   export ALLOW_LIVE_PROVIDER_TEST=true
   export OPENROUTER_MAX_REQUESTS_PER_RUN=3
   export OPENROUTER_MAX_TOKENS_PER_RUN=4000
   ```
4. Run:
   ```bash
   scripts/run-controlled-workforce-activation.sh <disposable-project-uuid>
   ```
   Or:
   ```bash
   npm run workforce:live-activation-check -- --project <uuid> --confirm
   ```
5. Capture durable record IDs from JSON output (instance, invocation, QA, evidence).
6. Confirm `ALLOW_LIVE_PROVIDER_TEST` is disabled afterward (script trap does this).
7. Confirm live-tested count increased only for the tested seats/archetypes — not all 445.
8. Confirm no production deploy, email, payment, or Founder Proof mutation occurred.

## Refusal conditions

- Missing key
- `ALLOW_LIVE_PROVIDER_TEST` not true
- Free-only false or paid fallback true
- CI / GitHub Actions / Vercel Preview
- Canonical Founder Proof project without `--allow-founder-proof`
- Request budget > 3
- Missing `--confirm` or `--project`
