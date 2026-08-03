#!/usr/bin/env bash
# Concurrent consume against disposable Postgres.
# Exactly one session must succeed; others get zero rows.
set -euo pipefail

: "${DATABASE_URL:?DATABASE_URL required}"
REPS="${CONCURRENCY_REPS:-5}"
WORKERS="${CONCURRENCY_WORKERS:-8}"

echo "=== concurrent consume reps=${REPS} workers=${WORKERS} ==="

for ((rep=1; rep<=REPS; rep++)); do
  AUTH_ID=$(psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atc "
    insert into public.pilot_live_run_authorizations (
      project_id, agent_id, task_envelope_hash, provider_name,
      approved_model, maximum_input_tokens, maximum_output_tokens, maximum_total_tokens,
      maximum_cost_microusd, authorized_at, expires_at, status, integrity_checksum
    ) values (
      '61d3b1fd-c260-479b-9289-0c75f977e892',
      'mianx-internal-architecture-reviewer',
      md5('${rep}'::text) || md5(('x'||'${rep}')::text),
      'openai',
      'gpt-5.4-mini',
      4000, 1200, 5200,
      100000,
      pg_catalog.now(),
      pg_catalog.now() + interval '15 minutes',
      'authorized',
      md5(('c'||'${rep}')::text) || md5(('d'||'${rep}')::text)
    ) returning id;
  ")

  THASH=$(psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atc "select md5('${rep}'::text) || md5(('x'||'${rep}')::text);")
  CHKSUM=$(psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atc "select md5(('c'||'${rep}')::text) || md5(('d'||'${rep}')::text);")

  TMPDIR=$(mktemp -d)
  for ((w=1; w<=WORKERS; w++)); do
    (
      psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atc "
        select count(*) from public.consume_pilot_live_run_authorization(
          '${AUTH_ID}'::uuid,
          '61d3b1fd-c260-479b-9289-0c75f977e892'::uuid,
          'mianx-internal-architecture-reviewer',
          '${THASH}',
          'openai',
          'gpt-5.4-mini',
          null,
          '${CHKSUM}'
        );
      " > "${TMPDIR}/w${w}.out" 2>"${TMPDIR}/w${w}.err" || echo FAIL > "${TMPDIR}/w${w}.out"
    ) &
  done
  wait

  SUCCESS=0
  ZERO=0
  for f in "${TMPDIR}"/w*.out; do
    val=$(tr -d '[:space:]' < "$f")
    if [[ "$val" == "1" ]]; then SUCCESS=$((SUCCESS+1)); fi
    if [[ "$val" == "0" ]]; then ZERO=$((ZERO+1)); fi
  done

  FINAL=$(psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -Atc "
    select status || ':' || count(*)::text
    from public.pilot_live_run_authorizations
    where id = '${AUTH_ID}'::uuid
    group by status;
  ")

  echo "rep=${rep} success=${SUCCESS} zero=${ZERO} final=${FINAL}"
  if [[ "$SUCCESS" -ne 1 ]]; then
    echo "ASSERT_FAIL: expected exactly one successful consume, got ${SUCCESS}" >&2
    cat "${TMPDIR}"/w*.err >&2 || true
    exit 1
  fi
  if [[ "$FINAL" != "consumed:1" ]]; then
    echo "ASSERT_FAIL: expected consumed:1, got ${FINAL}" >&2
    exit 1
  fi
  rm -rf "$TMPDIR"
done

echo "CONCURRENT_CONSUME_OK"
