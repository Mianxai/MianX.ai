---
title: OpenAI official contract notes — one-agent pilot
document_status: draft
retrieval_date: 2026-08-03
classification: Internal
---

# Official OpenAI contract review

Retrieval date: **2026-08-03**. Sources are official OpenAI developer documentation
only. Blogs and third-party snippets are not used as proof.

## Sources

| Topic | Official source |
|-------|-----------------|
| Responses API | https://developers.openai.com/api/reference/resources/responses/ |
| Migrate to Responses | https://developers.openai.com/api/docs/guides/migrate-to-responses |
| Conversation state / store | https://developers.openai.com/api/docs/guides/conversation-state |
| Structured outputs | https://developers.openai.com/api/docs/guides/structured-outputs |
| Model catalog / pricing (gpt-5.4-mini) | Official OpenAI model page (retrieval 2026-08-03) |
| JS SDK package in repo | `openai` npm (pinned in package.json / OPENAI_SDK_VERSION) |

## Verified facts (public documentation — retrieval date)

| Fact | Status |
|------|--------|
| Responses API is the current generation surface (`responses.create`) | Verified |
| Structured Outputs on Responses use `text.format` with `type: "json_schema"` | Verified |
| Model id `gpt-5.4-mini` exists in the official catalog | Verified (`officialCatalogStatus`) |
| Official pinned snapshot `gpt-5.4-mini-2026-03-17` exists | Verified |
| Supported endpoint includes `/v1/responses` | Verified |
| Structured Outputs supported for this model family | Verified |
| Standard token prices: input $0.75 / 1M, cached input $0.075 / 1M, output $4.50 / 1M | Verified (`officialPricingStatus`) |
| Standard uncached worst-case at pilot caps 4000/1200 = **$0.0084** (8400 µUSD) | Verified (integer-safe math) |
| `store: false` disables persistent Responses resource storage | Verified |
| Response objects are saved for 30 days by default unless `store: false` | Verified |
| Implementation sets `store: false`, `tools: []`, `stream: false`, no `previous_response_id` | Implementation aligned |

## store:false vs Zero Data Retention (required distinction)

| Claim | Truth |
|-------|-------|
| `store:false` means OpenAI retains nothing | **False — do not state this** |
| `store:false` disables persistent Responses resource storage for the response | True |
| `store:false` by itself establishes Zero Data Retention | **False** |
| Default abuse-monitoring retention may still apply | True |
| Zero Data Retention / Modified Abuse Monitoring are separate account controls | True |
| Pilot must minimize submitted data regardless of storage mode | True |

Statuses exposed in preflight:

- `responseStorageEnabled: false`
- `zeroDataRetentionVerified: false`
- `abuseMonitoringMode: not_checked`

These do not block the initial low-risk pilot unless Founder policy requires ZDR, but
their truth must remain visible.

## Not checked / incomplete (must not authorize a live call)

| Item | Status | Impact |
|------|--------|--------|
| Account-specific model access (`accountAccessStatus`) | **not_checked** | No API key; no authenticated Models API call |
| `accountVerifiedModel` | none | `modelReadyForProviderCall: false` |
| Configured billing mode (`billingModeStatus`) | **unknown** | `pricingReadyForProviderCall: false` |
| Authenticated Models API verification | **not performed** | — |
| Genuine Responses generation | **not performed** | provider calls = 0 |
| Zero Data Retention | **not verified** | visible only |

## Pricing math (standard, uncached)

```text
input:  4000 × 0.75 / 1,000,000 = $0.003
output: 1200 × 4.50 / 1,000,000 = $0.0054
combined: $0.0084  (8400 microdollars)
ceiling: $0.10
```

Regional processing documents a 10% uplift. When endpoint region / billing mode is
unknown, do not assume standard cheaper path for provider authorization — keep
`billingModeStatus: unknown` and `providerCallAllowed: false`.

## Implementation impact

- Separate dimensions: official catalog, account access, official pricing, billing path.
- Provider-call cost math requires `pricingReadyForProviderCall` (official + standard billing).
- Prefer snapshot `gpt-5.4-mini-2026-03-17` only after account-access confirmation — no silent swap.
- No authenticated Models API call and no genuine generation in this readiness PR.
