-- Schema / constraint validation after scope migration apply.

do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='admin_memberships'
      and column_name='organization_id'
  ) then
    raise exception 'ASSERT_FAIL: organization_id missing';
  end if;
  if not exists (
    select 1 from information_schema.columns
    where table_schema='public' and table_name='admin_memberships'
      and column_name='project_id'
  ) then
    raise exception 'ASSERT_FAIL: project_id missing';
  end if;
  if not exists (
    select 1 from pg_constraint
    where conname = 'admin_memberships_project_requires_org'
  ) then
    raise exception 'ASSERT_FAIL: project_requires_org constraint missing';
  end if;
end $$;

select 'schema_ok' as status;
