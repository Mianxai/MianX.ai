#!/usr/bin/env bash
# Configure INTERNAL_RUNTIME_SECRET / CRON_SECRET on Vercel Production.
# Never prints the secret. No AI provider calls.
set -euo pipefail

echo "== Configure runtime scheduler secret (production) =="
SECRET="$(openssl rand -hex 32)"

set_env() {
  local name="$1"
  local value="$2"
  echo "Setting $name (value not printed)…"
  printf '%s' "$value" | vercel env add "$name" production
}

set_env INTERNAL_RUNTIME_SECRET "$SECRET"
set_env CRON_SECRET "$SECRET"
unset SECRET

echo "Secret stored. Redeploy only after explicit confirmation."
read -r -p "Type REDEPLOY to trigger production redeploy, or Ctrl-C: " CONFIRM
if [[ "$CONFIRM" != "REDEPLOY" ]]; then
  echo "Stopped before redeploy. Set secret is pending next deploy."
  exit 0
fi

vercel --prod

SITE_URL="${SITE_URL:-}"
if [[ -z "$SITE_URL" ]]; then
  echo "Set SITE_URL to verify tick auth, e.g. https://your-domain"
  exit 0
fi

echo "Unauthenticated tick should fail..."
code="$(curl -sS -o /tmp/tick-unauth.json -w "%{http_code}" "$SITE_URL/api/internal/runtime/tick" || true)"
echo "HTTP $code (expect 401/403). Body not shown if it might contain diagnostics only."

echo "Authenticated diagnostic tick requires the secret from Vercel dashboard (not echoed here)."
echo "Example (Founder pastes secretly):"
echo "  curl -sS -H \"Authorization: Bearer \$INTERNAL_RUNTIME_SECRET\" \"$SITE_URL/api/internal/runtime/tick\""
echo "No OpenRouter / Anthropic calls are made by this script."
