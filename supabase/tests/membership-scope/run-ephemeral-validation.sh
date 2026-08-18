#!/usr/bin/env bash
# Apply → validate → rollback → reapply membership scope migration on disposable DB.
set -euo pipefail

: "${DATABASE_URL:?DATABASE_URL required}"
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
BOOT="${ROOT}/supabase/tests/membership-scope/00_bootstrap_minimal.sql"
MIG="${ROOT}/supabase/migrations/20260803180000_admin_memberships_optional_tenant_scope.sql"
ROLL="${ROOT}/supabase/rollbacks/20260803180000_admin_memberships_optional_tenant_scope.rollback.sql"
EXPECTED_SHA="${EXPECTED_MEMBERSHIP_SCOPE_SHA256:-}"

echo "=== membership-scope ephemeral DB validation ==="
echo "mutationTarget: disposable-only"
echo "ProductionDatabaseChanged: no"

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
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$MIG"
T1=$(date +%s)
echo "clean_apply_duration_s=$((T1-T0))"

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "${ROOT}/supabase/tests/membership-scope/01_validate_schema.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "${ROOT}/supabase/tests/membership-scope/02_validate_security.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "${ROOT}/supabase/tests/membership-scope/03_tenant_isolation.sql"

# Rollback (no dependence on durable production rows in ephemeral DB)
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -c "truncate public.admin_memberships;"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$ROLL"
echo "rollback_ok=yes"

GONE=$(psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atc "
  select count(*) from information_schema.columns
  where table_schema='public' and table_name='admin_memberships'
    and column_name in ('organization_id','project_id');
")
if [[ "$GONE" != "0" ]]; then
  echo "ASSERT_FAIL: scope columns still present after rollback" >&2
  exit 1
fi

T2=$(date +%s)
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$MIG"
T3=$(date +%s)
echo "reapply_duration_s=$((T3-T2))"

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "${ROOT}/supabase/tests/membership-scope/01_validate_schema.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "${ROOT}/supabase/tests/membership-scope/02_validate_security.sql"
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "${ROOT}/supabase/tests/membership-scope/03_tenant_isolation.sql"

echo "REAPPLY_OK"
echo "EPHEMERAL_MEMBERSHIP_SCOPE_DB_VALIDATION_OK"
