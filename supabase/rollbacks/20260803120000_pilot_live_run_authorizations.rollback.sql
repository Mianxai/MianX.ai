-- Rollback for 20260803120000_pilot_live_run_authorizations.sql
-- Founder-only. Do not run against Production without empty-table confirmation.
-- Pre-use rollback: drop function + table when no rows.
-- Post-use: prefer forward-fix / archival — do not drop evidence-bearing rows.

do $$
begin
  if exists (
    select 1
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname = 'consume_pilot_live_run_authorization'
  ) then
    revoke all on function public.consume_pilot_live_run_authorization(
      uuid, uuid, text, text, text, text, text, text
    ) from public;
    drop function if exists public.consume_pilot_live_run_authorization(
      uuid, uuid, text, text, text, text, text, text
    );
  end if;

  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'pilot_live_run_authorizations'
  ) then
    if exists (select 1 from public.pilot_live_run_authorizations limit 1) then
      raise exception 'REFUSING_ROLLBACK: pilot_live_run_authorizations is not empty';
    end if;
    drop policy if exists pilot_lra_service_all on public.pilot_live_run_authorizations;
    drop table public.pilot_live_run_authorizations;
  end if;
end $$;
