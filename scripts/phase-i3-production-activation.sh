#!/usr/bin/env bash
# Phase I.3 production activation — DO NOT RUN from Cursor agents without Founder.
# Prepares merge → migrate → deploy → bootstrap → verify. Never embeds API keys.
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

echo "== Phase I.3 production activation (interactive) =="
echo "Repository: $(basename "$REPO_ROOT")"
git fetch origin
EXPECTED_MAIN="$(git rev-parse origin/main)"
echo "origin/main: $EXPECTED_MAIN"

echo "Running verify suite (must pass before merge)..."
npm run lint
npm run typecheck
npm test
npm run build

echo "Mark PR ready / merge ONLY with Founder confirmation and expected-head protection."
echo "Example: gh pr ready <N> && gh pr merge <N> --merge --match-head-commit <sha>"
read -r -p "Type MERGE to continue after manual merge, or Ctrl-C to stop: " MERGE_CONFIRM
if [[ "$MERGE_CONFIRM" != "MERGE" ]]; then
  echo "Stopped."
  exit 1
fi

git checkout main
git pull --ff-only origin main

echo "Migration dry-run (review output carefully)..."
npx supabase db push --dry-run || true
read -r -p "Type APPLY to apply pending migrations, or Ctrl-C: " APPLY
if [[ "$APPLY" != "APPLY" ]]; then
  echo "Stopped before migration apply."
  exit 1
fi
npx supabase db push

echo "Deploy production via your host CLI (example: vercel --prod) — Founder only."
read -r -p "Type DEPLOY after production deploy completes: " DEPLOY
if [[ "$DEPLOY" != "DEPLOY" ]]; then
  echo "Stopped before bootstrap."
  exit 1
fi

npm run workforce:bootstrap
npm run workforce:verify

echo "Confirm 445 seats, 20 departments, 13 workflows, live-tested=0."
echo "Next: run scripts/configure-openrouter-production.sh"
echo "Then: scripts/run-controlled-workforce-activation.sh"
