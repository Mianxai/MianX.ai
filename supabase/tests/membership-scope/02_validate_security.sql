-- Security catalog checks: RLS on, no broad anon/authenticated grants,
-- no USING(true)/WITH CHECK(true) policies on admin_memberships.

do $$
declare
  rls_on boolean;
  anon_privs int;
  auth_privs int;
  policy_count int;
  broad_policies int;
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

  -- Deny-by-default: zero policies (service_role bypasses RLS for Admin APIs).
  select count(*) into policy_count
  from pg_policies
  where schemaname = 'public' and tablename = 'admin_memberships';
  if policy_count <> 0 then
    raise exception 'ASSERT_FAIL: unexpected policies on admin_memberships (count=%)', policy_count;
  end if;

  select count(*) into broad_policies
  from pg_policies
  where schemaname = 'public'
    and tablename in ('admin_memberships', 'organizations', 'projects')
    and (qual = 'true' or with_check = 'true');
  if broad_policies > 0 then
    raise exception 'ASSERT_FAIL: broad USING/WITH CHECK (true) policies present';
  end if;
end $$;

select 'security_ok' as status;
