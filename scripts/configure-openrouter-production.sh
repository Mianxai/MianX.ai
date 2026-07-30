#!/usr/bin/env bash
# Configure OpenRouter on Vercel production — never echoes the key.
# Do not run from Cursor agents without Founder authorization.
set -euo pipefail
echo "== Configure OpenRouter (production) =="
read -r -s -p "Paste OPENROUTER_API_KEY (input hidden): " KEY
echo
if [[ -z "${KEY}" ]]; then
  echo "Empty key rejected."
  exit 1
fi

set_env() {
  local name="$1"
  local value="$2"
  echo "Setting $name (value not printed)…"
  printf '%s' "$value" | vercel env add "$name" production
}

set_env OPENROUTER_API_KEY "$KEY"
unset KEY
set_env OPENROUTER_DEFAULT_MODEL "openrouter/free"
set_env OPENROUTER_FREE_ONLY "true"
set_env OPENROUTER_PAID_FALLBACK_ENABLED "false"
set_env OPENROUTER_MAX_REQUESTS_PER_RUN "3"
set_env OPENROUTER_MAX_TOKENS_PER_RUN "8000"
set_env OPENROUTER_APP_NAME "MianX.ai"
set_env ALLOW_LIVE_PROVIDER_TEST "false"

echo "Trigger production redeploy (Founder): vercel --prod"
echo "Verify via /api/core/health — provider.configured === true (no secrets shown)."
echo "Confirm freeOnly=true and paidFallbackEnabled=false."
