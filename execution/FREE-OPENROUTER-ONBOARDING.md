# Free OpenRouter Onboarding

You can create an OpenRouter account and API key **without purchasing credits**.

- Use `openrouter/free` for controlled low-volume testing
- Paid fallback remains **disabled**
- Free model availability and rate limits may vary
- Production scale may later need credits or another provider

**Do not** require the key during database foundation setup.

After foundation:

1. Create key at OpenRouter (no purchase required for account/key creation)
2. Run `scripts/configure-openrouter-production.sh`
3. Keep `OPENROUTER_FREE_ONLY=true` and `OPENROUTER_PAID_FALLBACK_ENABLED=false`
4. Run controlled activation on a disposable project UUID

This guide does **not** promise unlimited free production inference.
