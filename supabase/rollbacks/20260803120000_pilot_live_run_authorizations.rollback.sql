-- Rollback for 20260803120000_pilot_live_run_authorizations.sql
-- Founder-only. Do not run against Production without empty-table confirmation.
-- Drops the table only when no rows remain (safety guard).

do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'pilot_live_run_authorizations'
  ) then
    if exists (select 1 from pilot_live_run_authorizations limit 1) then
      raise exception 'REFUSING_ROLLBACK: pilot_live_run_authorizations is not empty';
    end if;
    drop policy if exists pilot_lra_service_all on pilot_live_run_authorizations;
    drop table pilot_live_run_authorizations;
  end if;
end $$;
