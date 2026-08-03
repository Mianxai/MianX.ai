-- Security catalog checks: RLS on, no broad anon/authenticated grants.

do $$
declare
  rls_on boolean;
  anon_privs int;
  auth_privs int;
begin
  select c.relrowsecurity into rls_on
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relname = 'admin_memberships';
  if rls_on is distinct from true then
    raise exception 'ASSERT_FAIL: RLS not enabled on admin_memberships';
  end if;

  select count(*) into anon_privs
  from information_schema.role_table_grants
  where table_schema='public' and table_name='admin_memberships'
    and grantee = 'anon';
  if anon_privs > 0 then
    raise exception 'ASSERT_FAIL: anon has grants on admin_memberships';
  end if;

  select count(*) into auth_privs
  from information_schema.role_table_grants
  where table_schema='public' and table_name='admin_memberships'
    and grantee = 'authenticated'
    and privilege_type in ('INSERT','UPDATE','DELETE','TRUNCATE');
  if auth_privs > 0 then
    raise exception 'ASSERT_FAIL: authenticated has write grants on admin_memberships';
  end if;
end $$;

select 'security_ok' as status;
