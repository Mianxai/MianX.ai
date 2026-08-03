---
title: OpenAI secure configuration and model-check runbook
document_status: draft
implementation_status: readiness_only
production_status: not_configured
verification_status: not_executed
authority_status: founder_gated
as_of: 2026-08-03
classification: Internal
---

# OpenAI pilot — secure configuration and account model-access check

**Readiness only.** This document does **not** authorize configuring
`OPENAI_API_KEY`, calling the Models API, enabling switches, allocating an
agent, creating a live-run authorization, or generating Responses.

Current Production truth (post authorization-store migration apply):

| Item | Value |
|------|-------|
| providerName | none |
| apiKeyConfigured | false |
| officialCatalogStatus | verified |
| accountAccessStatus | not_checked |
| authenticatedModelsApiCalls | 0 |
| officialPricingStatus | verified |
| billingModeStatus | unknown |
| pricingReadyForProviderCall | false |
| authorization store | available (table applied; no real auth rows) |
| providerCallAllowed | false |
| switches | false |
| agents allocated/active/live-tested | 0/0/0 |

---

## Phase A — Secure key configuration (Founder-only)

### Where to put the key

1. Open the **intended** Vercel project for https://mian-x-ai.vercel.app.
2. Settings → Environment Variables → **Production** only (unless separately
   approved for Preview).
3. Add `OPENAI_API_KEY` as a **sensitive** / encrypted Production variable.
4. Do **not** enable live switches in the same change.
5. Redeploy Production after the variable is saved so runtime can see presence.

### Absolute prohibitions

- Never paste the key in chat, Cursor prompts, PRs, issues, or docs.
- Never commit the key to Git (including `.env*` tracked files).
- Never print the key in Terminal, CI logs, or screenshots.
- Never add a browser / Admin API-key input field.
- Never dump `process.env` in Admin responses.

### Safe presence verification (boolean only)

After redeploy, Founder verifies **only**:

- `apiKeyConfigured: true|false`
- `providerName` remains non-secret (`openai` vs `none`)
- Never ask for prefix, suffix, length, or hash of the key

Rollback: remove or rotate the variable in Vercel Production, redeploy.

---

## Phase B — One-time Models API verification envelope (not executed here)

Approved catalog model: `gpt-5.4-mini`  
Approved snapshot candidate: `gpt-5.4-mini-2026-03-17`

Future check requirements (server-only, Founder-authorized separately):

| Rule | Requirement |
|------|-------------|
| Authorization | Explicit Founder Models-API-only approval + one-time auth record |
| Key | `apiKeyConfigured === true` |
| Attempts | Exactly one attempt; idempotency record |
| Timeout | ≤ 60 seconds |
| Scope | Verify only approved model/snapshot |
| Errors | Sanitized; no model-list dump to Admin |
| Network | Separate from generation / Responses |
| Consume | Authorization consumed once at attempt boundary |
| Persist | Safe result only (`verified` / `unavailable` / `mismatch` / `failed`) |

**Do not execute this check from this readiness PR.**

Current statuses must remain:

- `officialCatalogStatus: verified`
- `accountAccessStatus: not_checked`
- `authenticatedModelsApiCalls: 0`

---

## Phase C — Billing-path verification contract (not authorizing generation)

| Item | Current truth |
|------|---------------|
| officialPricingStatus | verified |
| billingModeStatus | unknown |
| pricingReadyForProviderCall | false |
| standard uncached estimate at caps | 8400 micro-USD |
| maximum Founder ceiling | 100000 micro-USD |
| tools | `[]` |
| input / output / total caps | 4000 / 1200 / 5200 |

Do **not** assume `billingModeStatus: standard` until the configured account
path is verified under a separate Founder authorization. This PR does not
authorize a generation call.

---

## Phase D — Post-configuration preflight (after Founder adds key)

Run only after Phase A redeploy. Checklist (no secrets):

- [ ] `apiKeyConfigured` true/false observed
- [ ] provider selection honesty (`none` until adapter selects openai)
- [ ] `officialCatalogStatus: verified`
- [ ] `accountAccessStatus: not_checked` until Models check authorized
- [ ] approved model / snapshot identifiers match registry
- [ ] `officialPricingStatus: verified`
- [ ] `billingModeStatus: unknown` (or later verified standard)
- [ ] authorization store available
- [ ] scheduler healthy (`supabase_cron` / `supabase_primary_active`)
- [ ] switches false
- [ ] no queued live pilot task
- [ ] no concurrent pilot run
- [ ] agents 0/0/0
- [ ] `providerCallAllowed: false` until every later gate passes

---

## Stop conditions

Stop and require Founder review when:

- key cannot be stored as Vercel sensitive Production env;
- presence check would require printing secret material;
- any code path attempts genuine Models API or Responses without separate
  Founder authorization;
- switches are found enabled unexpectedly;
- a real authorization or evidence row appears without Founder intent.

## Next exact Founder action

Configure `OPENAI_API_KEY` only via Vercel Production sensitive environment
(Phase A), redeploy, then request a **separate** authorization for the
one-time Models API account-access check. Do not enable switches or allocate
agents in that step.
