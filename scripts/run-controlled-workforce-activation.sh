#!/usr/bin/env bash
# Controlled workforce activation — max 3 provider calls. Disables live flag after.
set -euo pipefail
PROJECT_ID="${1:-}"
if [[ -z "$PROJECT_ID" ]]; then
  echo "Usage: $0 <disposable-project-uuid>"
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
