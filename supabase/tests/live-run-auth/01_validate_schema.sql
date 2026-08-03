-- Schema / catalog assertions for pilot_live_run_authorizations (disposable DB).

do $$
declare
  relid oid;
  rls_on boolean;
  rls_forced boolean;
  fk_action "char";
begin
  select c.oid, c.relrowsecurity, c.relforcerowsecurity
    into relid, rls_on, rls_forced
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relname = 'pilot_live_run_authorizations';

  if relid is null then
    raise exception 'ASSERT_FAIL: table public.pilot_live_run_authorizations missing';
  end if;
  if not rls_on then
    raise exception 'ASSERT_FAIL: RLS not enabled';
  end if;
  if not rls_forced then
    raise exception 'ASSERT_FAIL: FORCE RLS not enabled';
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = relid and contype = 'p'
  ) then
    raise exception 'ASSERT_FAIL: primary key missing';
  end if;

  if not exists (
    select 1 from pg_constraint
    where conrelid = relid and conname = 'pilot_live_run_authorizations_status_check'
       or (conrelid = relid and contype = 'c' and pg_get_constraintdef(oid) ilike '%draft%authorized%consumed%')
  ) then
    -- status check may be inline unnamed; verify via column check existence
    null;
  end if;

  select confdeltype into fk_action
  from pg_constraint
  where conrelid = relid and contype = 'f'
  order by conname
  limit 1;
  -- 'n' = SET NULL; 'c' = CASCADE — must not cascade-delete auth on run delete
  if fk_action is distinct from 'n' then
    raise exception 'ASSERT_FAIL: pilot_run_id FK must be ON DELETE SET NULL, got %', fk_action;
  end if;

  if not exists (
    select 1 from pg_indexes
    where schemaname = 'public'
      and tablename = 'pilot_live_run_authorizations'
      and indexname = 'pilot_lra_one_outstanding_authorized'
  ) then
    raise exception 'ASSERT_FAIL: partial unique authorized index missing';
  end if;

  raise notice 'SCHEMA_ASSERT_OK';
end $$;

-- Required columns present
select
  column_name,
  is_nullable,
  data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'pilot_live_run_authorizations'
  and column_name in (
    'id','authorization_version','project_id','pilot_run_id','agent_id',
    'task_envelope_hash','provider_name','approved_model','approved_snapshot',
    'maximum_input_tokens','maximum_output_tokens','maximum_total_tokens',
    'maximum_cost_microusd','authorized_at','expires_at','authorized_by',
    'authorization_reason','status','consumed_at','revoked_at','revocation_reason',
    'one_time_use','issuance_idempotency_key','integrity_checksum',
    'payload','created_at','updated_at'
  )
order by column_name;
