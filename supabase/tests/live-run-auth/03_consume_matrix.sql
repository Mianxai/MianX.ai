-- Functional consume / mismatch / expiry / revoke tests (disposable DB).
-- Run as a BYPASSRLS role (postgres / service_role).

create temporary table if not exists _lra_test_ids (k text primary key, v uuid);

do $$
declare
  pid uuid := '61d3b1fd-c260-479b-9289-0c75f977e892';
  aid text := 'mianx-internal-architecture-reviewer';
  th text := repeat('a', 64);
  chk text := repeat('b', 64);
  auth_id uuid;
  rows_n int;
  consumed_n int;
begin
  insert into public.pilot_runs (id, project_id, status)
  values (pg_catalog.gen_random_uuid(), pid, 'queued')
  on conflict do nothing;

  -- Valid authorized fixture
  insert into public.pilot_live_run_authorizations (
    project_id, agent_id, task_envelope_hash, provider_name,
    approved_model, approved_snapshot,
    maximum_input_tokens, maximum_output_tokens, maximum_total_tokens,
    maximum_cost_microusd, authorized_at, expires_at, authorized_by,
    status, integrity_checksum
  ) values (
    pid, aid, th, 'openai',
    'gpt-5.4-mini', 'gpt-5.4-mini-2026-03-17',
    4000, 1200, 5200,
    100000, pg_catalog.now(), pg_catalog.now() + interval '15 minutes', 'fixture',
    'authorized', chk
  ) returning id into auth_id;

  insert into _lra_test_ids values ('auth', auth_id)
  on conflict (k) do update set v = excluded.v;

  -- Happy path consume
  select count(*) into rows_n
  from public.consume_pilot_live_run_authorization(
    auth_id, pid, aid, th, 'openai', 'gpt-5.4-mini', 'gpt-5.4-mini-2026-03-17', chk
  );
  if rows_n <> 1 then
    raise exception 'ASSERT_FAIL: expected 1 consume row, got %', rows_n;
  end if;

  select count(*) into consumed_n
  from public.pilot_live_run_authorizations
  where id = auth_id and status = 'consumed' and consumed_at is not null;
  if consumed_n <> 1 then
    raise exception 'ASSERT_FAIL: row not consumed once';
  end if;

  -- Duplicate consume → zero rows
  select count(*) into rows_n
  from public.consume_pilot_live_run_authorization(
    auth_id, pid, aid, th, 'openai', 'gpt-5.4-mini', 'gpt-5.4-mini-2026-03-17', chk
  );
  if rows_n <> 0 then
    raise exception 'ASSERT_FAIL: duplicate consume must return 0 rows';
  end if;

  raise notice 'CONSUME_HAPPY_PATH_OK';
end $$;

-- Expired
do $$
declare
  pid uuid := '61d3b1fd-c260-479b-9289-0c75f977e892';
  aid text := 'mianx-internal-architecture-reviewer';
  th text := repeat('c', 64);
  chk text := repeat('d', 64);
  auth_id uuid;
  rows_n int;
begin
  insert into public.pilot_live_run_authorizations (
    project_id, agent_id, task_envelope_hash, provider_name,
    approved_model, maximum_input_tokens, maximum_output_tokens, maximum_total_tokens,
    maximum_cost_microusd, authorized_at, expires_at, status, integrity_checksum
  ) values (
    pid, aid, th, 'openai', 'gpt-5.4-mini', 4000, 1200, 5200, 100000,
    pg_catalog.now() - interval '1 hour', pg_catalog.now() - interval '1 minute',
    'authorized', chk
  ) returning id into auth_id;

  select count(*) into rows_n
  from public.consume_pilot_live_run_authorization(
    auth_id, pid, aid, th, 'openai', 'gpt-5.4-mini', null, chk
  );
  if rows_n <> 0 then
    raise exception 'ASSERT_FAIL: expired must not consume';
  end if;
end $$;

-- Revoked
do $$
declare
  pid uuid := '61d3b1fd-c260-479b-9289-0c75f977e892';
  aid text := 'mianx-internal-architecture-reviewer';
  th text := repeat('e', 64);
  chk text := repeat('f', 64);
  auth_id uuid;
  rows_n int;
begin
  insert into public.pilot_live_run_authorizations (
    project_id, agent_id, task_envelope_hash, provider_name,
    approved_model, maximum_input_tokens, maximum_output_tokens, maximum_total_tokens,
    maximum_cost_microusd, authorized_at, expires_at, status, revoked_at, integrity_checksum
  ) values (
    pid, aid, th, 'openai', 'gpt-5.4-mini', 4000, 1200, 5200, 100000,
    pg_catalog.now(), pg_catalog.now() + interval '15 minutes',
    'revoked', pg_catalog.now(), chk
  ) returning id into auth_id;

  select count(*) into rows_n
  from public.consume_pilot_live_run_authorization(
    auth_id, pid, aid, th, 'openai', 'gpt-5.4-mini', null, chk
  );
  if rows_n <> 0 then
    raise exception 'ASSERT_FAIL: revoked must not consume';
  end if;
end $$;

-- Checksum / project / agent / task / provider / model mismatch
do $$
declare
  pid uuid := '61d3b1fd-c260-479b-9289-0c75f977e892';
  aid text := 'mianx-internal-architecture-reviewer';
  th text := repeat('1', 64);
  chk text := repeat('2', 64);
  auth_id uuid;
  rows_n int;
begin
  insert into public.pilot_live_run_authorizations (
    project_id, agent_id, task_envelope_hash, provider_name,
    approved_model, approved_snapshot,
    maximum_input_tokens, maximum_output_tokens, maximum_total_tokens,
    maximum_cost_microusd, authorized_at, expires_at, status, integrity_checksum
  ) values (
    pid, aid, th, 'openai', 'gpt-5.4-mini', 'gpt-5.4-mini-2026-03-17',
    4000, 1200, 5200, 100000,
    pg_catalog.now(), pg_catalog.now() + interval '15 minutes', 'authorized', chk
  ) returning id into auth_id;

  select count(*) into rows_n from public.consume_pilot_live_run_authorization(
    auth_id, pid, aid, th, 'openai', 'gpt-5.4-mini', null, repeat('9', 64)
  );
  if rows_n <> 0 then raise exception 'ASSERT_FAIL: checksum mismatch'; end if;

  select count(*) into rows_n from public.consume_pilot_live_run_authorization(
    auth_id, '00000000-0000-4000-8000-000000000099', aid, th, 'openai', 'gpt-5.4-mini', null, chk
  );
  if rows_n <> 0 then raise exception 'ASSERT_FAIL: project mismatch'; end if;

  select count(*) into rows_n from public.consume_pilot_live_run_authorization(
    auth_id, pid, 'wrong-agent', th, 'openai', 'gpt-5.4-mini', null, chk
  );
  if rows_n <> 0 then raise exception 'ASSERT_FAIL: agent mismatch'; end if;

  select count(*) into rows_n from public.consume_pilot_live_run_authorization(
    auth_id, pid, aid, repeat('0', 64), 'openai', 'gpt-5.4-mini', null, chk
  );
  if rows_n <> 0 then raise exception 'ASSERT_FAIL: task mismatch'; end if;

  select count(*) into rows_n from public.consume_pilot_live_run_authorization(
    auth_id, pid, aid, th, 'anthropic', 'gpt-5.4-mini', null, chk
  );
  if rows_n <> 0 then raise exception 'ASSERT_FAIL: provider mismatch'; end if;

  select count(*) into rows_n from public.consume_pilot_live_run_authorization(
    auth_id, pid, aid, th, 'openai', 'wrong-model', null, chk
  );
  if rows_n <> 0 then raise exception 'ASSERT_FAIL: model mismatch'; end if;

  select count(*) into rows_n from public.consume_pilot_live_run_authorization(
    auth_id, pid, aid, th, 'openai', 'gpt-5.4-mini', 'wrong-snap', chk
  );
  if rows_n <> 0 then raise exception 'ASSERT_FAIL: snapshot mismatch'; end if;

  -- Still authorized after mismatches (no partial transition)
  if (select status from public.pilot_live_run_authorizations where id = auth_id) <> 'authorized' then
    raise exception 'ASSERT_FAIL: mismatches must leave row authorized';
  end if;

  raise notice 'MISMATCH_MATRIX_OK';
end $$;

-- Token / cost envelope bounds are stored on the row; CHECK rejects negatives.
-- Higher-than-authorized envelope is an application-layer gate (execution lock),
-- not an RPC argument — consume matches identity + checksum only.
do $$
declare
  pid uuid := '61d3b1fd-c260-479b-9289-0c75f977e892';
  ok boolean := false;
begin
  begin
    insert into public.pilot_live_run_authorizations (
      project_id, agent_id, task_envelope_hash, provider_name, approved_model,
      maximum_input_tokens, maximum_output_tokens, maximum_total_tokens,
      maximum_cost_microusd, expires_at, status, integrity_checksum
    ) values (
      pid, 'mianx-internal-architecture-reviewer', repeat('3', 64), 'openai', 'gpt-5.4-mini',
      -1, 1, 1, 1, pg_catalog.now() + interval '1 minute', 'draft', repeat('4', 64)
    );
  exception when check_violation then
    ok := true;
  end;
  if not ok then
    raise exception 'ASSERT_FAIL: negative maximum_input_tokens must violate CHECK';
  end if;

  ok := false;
  begin
    insert into public.pilot_live_run_authorizations (
      project_id, agent_id, task_envelope_hash, provider_name, approved_model,
      maximum_input_tokens, maximum_output_tokens, maximum_total_tokens,
      maximum_cost_microusd, expires_at, status, integrity_checksum
    ) values (
      pid, 'mianx-internal-architecture-reviewer', repeat('5', 64), 'openai', 'gpt-5.4-mini',
      1, 1, 1, -1, pg_catalog.now() + interval '1 minute', 'draft', repeat('6', 64)
    );
  exception when check_violation then
    ok := true;
  end;
  if not ok then
    raise exception 'ASSERT_FAIL: negative maximum_cost_microusd must violate CHECK';
  end if;

  raise notice 'ENVELOPE_CHECK_OK';
end $$;

-- pilot_run_id ON DELETE SET NULL (no evidence-destroying cascade from auth table)
do $$
declare
  pid uuid := '61d3b1fd-c260-479b-9289-0c75f977e892';
  run_id uuid;
  auth_id uuid;
begin
  insert into public.pilot_runs (project_id, status)
  values (pid, 'queued')
  returning id into run_id;

  insert into public.pilot_live_run_authorizations (
    project_id, pilot_run_id, agent_id, task_envelope_hash, provider_name,
    approved_model, maximum_input_tokens, maximum_output_tokens, maximum_total_tokens,
    maximum_cost_microusd, authorized_at, expires_at, status, integrity_checksum
  ) values (
    pid, run_id, 'mianx-internal-architecture-reviewer', repeat('7', 64), 'openai',
    'gpt-5.4-mini', 100, 100, 200, 1000,
    pg_catalog.now(), pg_catalog.now() + interval '10 minutes', 'authorized', repeat('8', 64)
  ) returning id into auth_id;

  delete from public.pilot_runs where id = run_id;

  if (select pilot_run_id from public.pilot_live_run_authorizations where id = auth_id) is not null then
    raise exception 'ASSERT_FAIL: pilot_run_id must SET NULL on run delete';
  end if;
  if (select status from public.pilot_live_run_authorizations where id = auth_id) <> 'authorized' then
    raise exception 'ASSERT_FAIL: auth row must survive pilot_run delete';
  end if;

  raise notice 'PILOT_RUN_SET_NULL_OK';
end $$;
