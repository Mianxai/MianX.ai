#!/usr/bin/env bash
# Verify provider-independent workforce foundation. No OpenRouter key required.
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

echo "== Workforce foundation verify =="
npm run workforce:bootstrap -- --dry-run --env-local || true
npm run workforce:verify -- --env-local
echo
echo "Expect: compiledSeats=445, persistedSeats=445, foundationReady=true,"
echo "providerReady=false, liveReady=false, productionReady=false when key absent."
echo "Health: curl -sS \"\${SITE_URL:-http://127.0.0.1:3000}/api/core/health\" | jq '.workforce,.provider,.runtime'"
