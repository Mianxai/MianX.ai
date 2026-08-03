---
title: OpenAI official contract notes — one-agent pilot
document_status: draft
retrieval_date: 2026-08-03
classification: Internal
---

# Official OpenAI contract review (Mission C2)

Retrieval date: **2026-08-03**. Sources are official OpenAI developer documentation
only. Blogs and third-party snippets are not used as proof.

## Sources

| Topic | Official source |
|-------|-----------------|
| Responses API | https://developers.openai.com/api/reference/resources/responses/ |
| Migrate to Responses | https://developers.openai.com/api/docs/guides/migrate-to-responses |
| Conversation state / store | https://developers.openai.com/api/docs/guides/conversation-state |
| Structured outputs | https://developers.openai.com/api/docs/guides/structured-outputs |
| JS SDK package in repo | `openai` npm (pinned in package.json / OPENAI_SDK_VERSION) |

## Verified facts (from official docs on retrieval date)

| Fact | Status |
|------|--------|
| Responses API is the current generation surface (`responses.create`) | Verified |
| Structured Outputs on Responses use `text.format` with `type: "json_schema"` (not Chat Completions `response_format`) | Verified |
| `store: false` disables Response object storage (default storage is on; ZDR may force store false) | Verified |
| Response objects are saved for 30 days by default unless `store: false` | Verified |
| Implementation sets `store: false`, `tools: []`, `stream: false`, no `previous_response_id` | Implementation aligned |

## Unverified assumptions (must not authorize a live call)

| Assumption | Status | Impact |
|------------|--------|--------|
| Model id `gpt-5.4-mini` exists and is available to this org | **Unverified** — not proven by Models API in this PR | `modelAvailability = not_checked` |
| Input $0.75 / 1M and output $4.50 / 1M | **Unverified** — candidate registry only | `pricingVerification = unverified`; cost calc fail-closed for provider calls |
| Worst-case ~$0.0084 under 4000/1200 tokens | Candidate math only when `requireVerifiedPricing: false`; not authorization | Must not bypass $0.10 ceiling |

## Implementation impact

- Preflight reports model/pricing verification statuses explicitly.
- `worstCasePreflightCost` / provider-call cost math require `pricingVerification === verified`.
- No authenticated Models API call is performed by this readiness PR.
- No genuine generation call is performed by this readiness PR.
