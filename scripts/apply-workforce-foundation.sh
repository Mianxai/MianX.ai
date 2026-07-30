#!/usr/bin/env bash
# Apply workforce database foundation (migrations + real bootstrap).
# Provider-independent. Does NOT configure OpenRouter or call AI providers.
# Do not run from Cursor agents against production without Founder confirmation.
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

echo "== Workforce foundation apply =="
echo "Repository: $(basename "$REPO_ROOT")"
git fetch origin >/dev/null 2>&1 || true
echo "HEAD: $(git rev-parse HEAD)"
echo "origin/main: $(git rev-parse origin/main 2>/dev/null || echo unknown)"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "ERROR: working tree is not clean. Commit or stash before applying foundation."
  exit 1
fi

if ! command -v supabase >/dev/null 2>&1; then
  echo "ERROR: supabase CLI not found."
  exit 1
fi

echo "Migration dry-run (review carefully)..."
npx supabase db push --dry-run || true

echo
echo "Pending additive migrations should include Phase I.2 registry and Phase I.3 RLS if not yet applied."
read -r -p "Type APPLY to apply pending migrations only, or Ctrl-C to stop: " CONFIRM
if [[ "$CONFIRM" != "APPLY" ]]; then
  echo "Stopped before migration apply."
  exit 1
fi

npx supabase db push

echo "Verifying migration list..."
npx supabase migration list || true

echo "Running real database bootstrap..."
npm run workforce:bootstrap -- --env-local

echo "Running real verify..."
npm run workforce:verify -- --env-local

echo "Second bootstrap (idempotency)..."
npm run workforce:bootstrap -- --env-local

echo "Foundation apply finished. Expect persistedSeats=445, second-run created=0, LIVE TESTED=0."
echo "Next (optional): scripts/configure-runtime-scheduler.sh"
echo "Provider key is NOT required for foundation."
