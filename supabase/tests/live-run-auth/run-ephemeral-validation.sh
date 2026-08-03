#!/usr/bin/env bash
# Apply → validate → rollback (pre-use) → reapply → re-validate on disposable DB.
set -euo pipefail

: "${DATABASE_URL:?DATABASE_URL required}"
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
MIG="${ROOT}/supabase/migrations/20260803120000_pilot_live_run_authorizations.sql"
PREV="${ROOT}/supabase/migrations/20260801120000_phase_ii1_live_agent_pilot.sql"
ROLL="${ROOT}/supabase/rollbacks/20260803120000_pilot_live_run_authorizations.rollback.sql"
BOOT="${ROOT}/supabase/tests/live-run-auth/00_bootstrap_roles.sql"
EXPECTED_SHA="${EXPECTED_MIGRATION_SHA256:-}"

echo "=== live-run auth ephemeral DB validation ==="
echo "mutationTarget: disposable-only"

if [[ -n "$EXPECTED_SHA" ]]; then
  ACTUAL=$(shasum -a 256 "$MIG" | awk '{print $1}')
  echo "checksum actual=${ACTUAL}"
  if [[ "$ACTUAL" != "$EXPECTED_SHA" ]]; then
    echo "ASSERT_FAIL: checksum mismatch" >&2
    exit 1
  fi
fi

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$BOOT"

T0=$(date +%s)
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$PREV"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$MIG"
T1=$(date +%s)
echo "clean_apply_duration_s=$((T1-T0))"

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "${ROOT}/supabase/tests/live-run-auth/01_validate_schema.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "${ROOT}/supabase/tests/live-run-auth/02_validate_security.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "${ROOT}/supabase/tests/live-run-auth/03_consume_matrix.sql"
bash "${ROOT}/supabase/tests/live-run-auth/04_concurrent_consume.sh"

# Truncate for pre-use rollback (table must be empty)
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -c "truncate public.pilot_live_run_authorizations;"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$ROLL"
echo "rollback_ok=yes"

# Confirm removed
GONE=$(psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atc "
  select count(*) from information_schema.tables
  where table_schema='public' and table_name='pilot_live_run_authorizations';
")
if [[ "$GONE" != "0" ]]; then
  echo "ASSERT_FAIL: table still present after rollback" >&2
  exit 1
fi

# Reapply
T2=$(date +%s)
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$MIG"
T3=$(date +%s)
echo "reapply_duration_s=$((T3-T2))"

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "${ROOT}/supabase/tests/live-run-auth/01_validate_schema.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "${ROOT}/supabase/tests/live-run-auth/02_validate_security.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "${ROOT}/supabase/tests/live-run-auth/03_consume_matrix.sql"
bash "${ROOT}/supabase/tests/live-run-auth/04_concurrent_consume.sh"

echo "REAPPLY_OK"
echo "data_loss_risk_before_first_use: low (empty-table rollback drops schema only)"
echo "post_use_rollback: not recommended — prefer forward-fix after real rows"
echo "EPHEMERAL_DB_VALIDATION_OK"
