-- Privilege / SECURITY DEFINER / search_path assertions (disposable DB).

do $$
declare
  fn oid;
  is_definer boolean;
  cfg text[];
  path_ok boolean := false;
  item text;
  pub_exec int;
begin
  select p.oid, p.prosecdef, p.proconfig
    into fn, is_definer, cfg
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
  where n.nspname = 'public'
    and p.proname = 'consume_pilot_live_run_authorization';

  if fn is null then
    raise exception 'ASSERT_FAIL: consume function missing';
  end if;
  if not is_definer then
    raise exception 'ASSERT_FAIL: function must be SECURITY DEFINER';
  end if;

  if cfg is not null then
    foreach item in array cfg loop
      -- SET search_path = '' may be stored as search_path= or search_path=""
      if item = 'search_path='
         or item = 'search_path=""'
         or item = 'search_path=''''' then
        path_ok := true;
      end if;
      -- Reject broad public search_path
      if item ilike 'search_path=%public%' then
        raise exception 'ASSERT_FAIL: insecure search_path contains public: %', item;
      end if;
    end loop;
  end if;
  if not path_ok then
    raise exception 'ASSERT_FAIL: search_path must be empty, got %', cfg;
  end if;

  if has_table_privilege('anon', 'public.pilot_live_run_authorizations', 'SELECT')
     or has_table_privilege('anon', 'public.pilot_live_run_authorizations', 'INSERT')
     or has_table_privilege('anon', 'public.pilot_live_run_authorizations', 'UPDATE')
     or has_table_privilege('anon', 'public.pilot_live_run_authorizations', 'DELETE') then
    raise exception 'ASSERT_FAIL: anon has table privilege';
  end if;

  if has_table_privilege('authenticated', 'public.pilot_live_run_authorizations', 'SELECT')
     or has_table_privilege('authenticated', 'public.pilot_live_run_authorizations', 'INSERT')
     or has_table_privilege('authenticated', 'public.pilot_live_run_authorizations', 'UPDATE')
     or has_table_privilege('authenticated', 'public.pilot_live_run_authorizations', 'DELETE') then
    raise exception 'ASSERT_FAIL: authenticated has table privilege';
  end if;

  if has_function_privilege('anon', fn, 'EXECUTE') then
    raise exception 'ASSERT_FAIL: anon can EXECUTE consume';
  end if;
  if has_function_privilege('authenticated', fn, 'EXECUTE') then
    raise exception 'ASSERT_FAIL: authenticated can EXECUTE consume';
  end if;
  if not has_function_privilege('service_role', fn, 'EXECUTE') then
    raise exception 'ASSERT_FAIL: service_role cannot EXECUTE consume';
  end if;

  select count(*) into pub_exec
  from information_schema.routine_privileges
  where specific_schema = 'public'
    and routine_name = 'consume_pilot_live_run_authorization'
    and grantee = 'PUBLIC'
    and privilege_type = 'EXECUTE';
  if pub_exec > 0 then
    raise exception 'ASSERT_FAIL: PUBLIC still has EXECUTE';
  end if;

  raise notice 'SECURITY_ASSERT_OK owner=% cfg=%',
    (select pg_get_userbyid(proowner) from pg_proc where oid = fn),
    cfg;
end $$;
