#!/usr/bin/env bash
# Controlled workforce activation — max 3 provider calls. Disables live flag after.
set -euo pipefail
PROJECT_ID="${1:-}"
if [[ -z "$PROJECT_ID" ]]; then
  echo "Usage: $0 <disposable-project-uuid>"
  echo "Example:"
  echo "  $0 123e4567-e89b-12d3-a456-426614174000"
  echo "  $0 \"\$DISPOSABLE_PROJECT_ID\""
  echo "Do not paste documentation placeholders like <DISPOSABLE_PROJECT_UUID>."
  exit 2
fi
if [[ ! "$PROJECT_ID" =~ ^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$ ]]; then
  echo "INVALID_PROJECT_UUID"
  exit 2
fi
PROOF="61d3b1fd-c260-479b-9289-0c75f977e892"
if [[ "$PROJECT_ID" == "$PROOF" && "${ALLOW_FOUNDER_PROOF:-}" != "true" ]]; then
  echo "Refusing canonical Founder Proof project."
  exit 2
fi

export ALLOW_LIVE_PROVIDER_TEST=true
export OPENROUTER_FREE_ONLY=true
export OPENROUTER_PAID_FALLBACK_ENABLED=false
export OPENROUTER_MAX_REQUESTS_PER_RUN=3

cleanup() {
  export ALLOW_LIVE_PROVIDER_TEST=false
  echo "ALLOW_LIVE_PROVIDER_TEST disabled."
}
trap cleanup EXIT

npm run workforce:live-activation-check -- --project "$PROJECT_ID" --confirm
echo "Inspect durable IDs in command output. Verify live-tested counts and no protected actions."
