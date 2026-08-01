-- Phase I.9 — Durable Supabase Cron primary scheduler (non-destructive).
-- Founder applies after dry-run. Does NOT insert Vault secret VALUES.
-- Does NOT mutate workforce seats, Founder Proof, or invoke AI providers.
--
-- Vault secret NAMES (create values in Dashboard / SQL as Founder):
--   mianx_runtime_tick_url     — full Production tick URL
--                                e.g. https://mian-x-ai.vercel.app/api/internal/runtime/tick
--   mianx_runtime_tick_secret  — same Bearer token as INTERNAL_RUNTIME_SECRET (≥16 chars)
--
-- Canonical cron job name: mianx-runtime-tick-5m
-- Expression: */5 * * * *

create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

-- Safe status RPC for service_role (never returns Vault plaintext).
create or replace function public.mianx_scheduler_status()
returns jsonb
language plpgsql
security definer
set search_path = public, extensions, cron, vault, net
as $$
declare
  v_url_present boolean := false;
  v_secret_present boolean := false;
  v_job record;
  v_last_run record;
  v_result jsonb;
begin
  begin
    select exists(
      select 1 from vault.decrypted_secrets where name = 'mianx_runtime_tick_url'
        and coalesce(decrypted_secret, '') <> ''
    ) into v_url_present;
  exception when others then
    v_url_present := false;
  end;

  begin
    select exists(
      select 1 from vault.decrypted_secrets where name = 'mianx_runtime_tick_secret'
        and coalesce(decrypted_secret, '') <> ''
    ) into v_secret_present;
  exception when others then
    v_secret_present := false;
  end;

  begin
    select jobid, jobname, schedule, active, command
      into v_job
      from cron.job
     where jobname = 'mianx-runtime-tick-5m'
     limit 1;
  exception when others then
    v_job := null;
  end;

  begin
    if v_job.jobid is not null then
      select status, start_time, end_time, return_message
        into v_last_run
        from cron.job_run_details
       where jobid = v_job.jobid
       order by start_time desc nulls last
       limit 1;
    end if;
  exception when others then
    v_last_run := null;
  end;

  v_result := jsonb_build_object(
    'schedulerJobName', 'mianx-runtime-tick-5m',
    'cronExpression', '*/5 * * * *',
    'configuredCadenceMs', 300000,
    'primaryScheduler', 'supabase_cron',
    'fallbackScheduler', 'github_actions',
    'vaultUrlPresent', v_url_present,
    'vaultSecretPresent', v_secret_present,
    'vaultConfigured', (v_url_present and v_secret_present),
    'jobScheduled', (v_job.jobid is not null),
    'jobActive', coalesce(v_job.active, false),
    'jobSchedule', v_job.schedule,
    'lastCronRunStatus', v_last_run.status,
    'lastCronRunStartedAt', v_last_run.start_time,
    'lastCronRunEndedAt', v_last_run.end_time,
    'secretsExposed', false
  );

  return v_result;
end;
$$;

revoke all on function public.mianx_scheduler_status() from public;
grant execute on function public.mianx_scheduler_status() to service_role;

-- Invoke Production tick via pg_net using Vault only (no literals).
create or replace function public.mianx_invoke_runtime_tick()
returns bigint
language plpgsql
security definer
set search_path = public, extensions, vault, net
as $$
declare
  v_url text;
  v_secret text;
  v_request_id bigint;
begin
  begin
    select decrypted_secret into v_url
      from vault.decrypted_secrets
     where name = 'mianx_runtime_tick_url'
     limit 1;
    select decrypted_secret into v_secret
      from vault.decrypted_secrets
     where name = 'mianx_runtime_tick_secret'
     limit 1;
  exception when others then
    raise notice 'mianx_invoke_runtime_tick: Vault unavailable or secrets missing — skip';
    return null;
  end;

  if v_url is null or length(trim(v_url)) < 8
     or v_secret is null or length(trim(v_secret)) < 16 then
    raise notice 'mianx_invoke_runtime_tick: Vault secrets mianx_runtime_tick_url / mianx_runtime_tick_secret missing or too short — skip';
    return null;
  end if;

  select net.http_post(
    url := trim(v_url),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Accept', 'application/json',
      'Authorization', 'Bearer ' || trim(v_secret),
      'x-mianx-scheduler-source', 'supabase_cron',
      'x-request-id', 'supabase-cron-' || to_char(timezone('utc', now()), 'YYYYMMDD"T"HH24MISS')
    ),
    body := '{"max_jobs":5}'::jsonb,
    timeout_milliseconds := 90000
  ) into v_request_id;

  return v_request_id;
end;
$$;

revoke all on function public.mianx_invoke_runtime_tick() from public;
grant execute on function public.mianx_invoke_runtime_tick() to service_role;

-- Idempotent schedule: only when BOTH Vault secrets are ready.
-- Scope: ONLY jobname = 'mianx-runtime-tick-5m' (never other cron jobs).
-- Incomplete Vault: unschedules the canonical job only (no broken active job).
-- Supabase/pg_cron: scheduling the same case-sensitive name replaces the job;
-- we still unschedule exact-name duplicates first for safe re-apply.
do $$
declare
  v_url_ok boolean := false;
  v_secret_ok boolean := false;
  v_existing bigint;
begin
  begin
    select exists(
      select 1 from vault.decrypted_secrets
       where name = 'mianx_runtime_tick_url' and coalesce(decrypted_secret, '') <> ''
    ) into v_url_ok;
    select exists(
      select 1 from vault.decrypted_secrets
       where name = 'mianx_runtime_tick_secret'
         and length(coalesce(decrypted_secret, '')) >= 16
    ) into v_secret_ok;
  exception when others then
    v_url_ok := false;
    v_secret_ok := false;
  end;

  -- Exact canonical name only — never wildcard / unrelated jobs.
  for v_existing in
    select jobid from cron.job where jobname = 'mianx-runtime-tick-5m'
  loop
    perform cron.unschedule(v_existing);
  end loop;

  if v_url_ok and v_secret_ok then
    perform cron.schedule(
      'mianx-runtime-tick-5m',
      '*/5 * * * *',
      $cron$select public.mianx_invoke_runtime_tick();$cron$
    );
    raise notice 'mianx-runtime-tick-5m scheduled (Vault configured).';
  else
    raise notice 'mianx-runtime-tick-5m NOT scheduled: create Vault secrets mianx_runtime_tick_url and mianx_runtime_tick_secret, then re-run schedule setup or re-apply this migration. Canonical job left unscheduled (no broken active job).';
  end if;
end;
$$;
