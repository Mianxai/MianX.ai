-- Mianx Core Runtime Phase 2: durable asynchronous job queue.
--
-- Additive, idempotent, non-destructive. Nothing here alters or drops any
-- existing table, column, constraint or data. It introduces:
--   * runtime_jobs        — durable queue rows with leases and attempts
--   * claim_runtime_jobs  — atomic claim via FOR UPDATE SKIP LOCKED
--   * recover_expired_runtime_jobs — returns expired leases to the queue
--
-- Security model matches the existing runtime schema: RLS enabled with NO
-- policies (anon key has zero access); all backend access uses service_role.

-- ---------------------------------------------------------------------------
-- runtime_jobs
-- ---------------------------------------------------------------------------
create table if not exists runtime_jobs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid not null references projects(id) on delete restrict,
  task_id uuid references tasks(id) on delete restrict,
  agent_run_id uuid references agent_runs(id) on delete set null,
  agent_instance_id uuid references agent_instances(id) on delete set null,
  agent_slug text,
  workflow text,
  workflow_step integer not null default 0,
  status text not null default 'queued',
  priority integer not null default 0,
  attempt integer not null default 0,
  max_attempts integer not null default 3,
  available_at timestamptz not null default now(),
  lease_owner text,
  lease_expires_at timestamptz,
  heartbeat_at timestamptz,
  started_at timestamptz,
  finished_at timestamptz,
  cancel_requested_at timestamptz,
  idempotency_key text,
  provider text not null default 'anthropic',
  model text,
  input jsonb not null default '{}'::jsonb,
  output jsonb,
  error jsonb,
  input_tokens integer,
  output_tokens integer,
  estimated_cost numeric(12, 6),
  latency_ms integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint runtime_jobs_status_check check (status in (
    'queued', 'leased', 'running', 'succeeded',
    'failed', 'cancelled', 'dead_letter'
  )),
  constraint runtime_jobs_provider_check check (provider in ('anthropic', 'none')),
  constraint runtime_jobs_priority_check check (priority between -100 and 100),
  constraint runtime_jobs_attempt_nonneg check (attempt >= 0),
  constraint runtime_jobs_max_attempts_check check (max_attempts between 1 and 10),
  constraint runtime_jobs_tokens_nonneg check (
    (input_tokens is null or input_tokens >= 0)
    and (output_tokens is null or output_tokens >= 0)
  ),
  -- Idempotent enqueue: one logical job per project + key.
  constraint runtime_jobs_project_idempotency_unique unique (project_id, idempotency_key)
);

-- Queue scan: eligible queued work ordered by priority then age.
create index if not exists runtime_jobs_queue_idx
  on runtime_jobs (status, available_at, priority desc, created_at)
  where status = 'queued';
-- Lease recovery scan.
create index if not exists runtime_jobs_lease_idx
  on runtime_jobs (lease_expires_at)
  where status in ('leased', 'running');
create index if not exists runtime_jobs_project_idx on runtime_jobs (project_id);
create index if not exists runtime_jobs_project_status_idx on runtime_jobs (project_id, status);
create index if not exists runtime_jobs_task_idx on runtime_jobs (task_id);
create index if not exists runtime_jobs_created_at_idx on runtime_jobs (created_at desc);

-- updated_at trigger (shared function from the runtime foundation migration).
drop trigger if exists set_updated_at on runtime_jobs;
create trigger set_updated_at before update on runtime_jobs
  for each row execute function mianx_set_updated_at();

-- RLS: enabled with no policies — anon/browser key has zero access; the
-- backend service_role bypasses RLS. Explicit grant for the local stack.
alter table runtime_jobs enable row level security;
grant all privileges on table runtime_jobs to service_role;

-- ---------------------------------------------------------------------------
-- recover_expired_runtime_jobs
--
-- Returns leased/running jobs whose lease expired to the queue (or dead_letter
-- when attempts are exhausted). Runs first in every worker tick so crashed
-- workers can never strand a job. Returns the number of rows recovered.
-- ---------------------------------------------------------------------------
create or replace function recover_expired_runtime_jobs()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  recovered integer := 0;
begin
  with expired as (
    select id, attempt, max_attempts
    from runtime_jobs
    where status in ('leased', 'running')
      and lease_expires_at is not null
      and lease_expires_at < now()
    for update skip locked
  ),
  moved as (
    update runtime_jobs j
    set
      status = case
        when e.attempt >= e.max_attempts then 'dead_letter'
        else 'queued'
      end,
      lease_owner = null,
      lease_expires_at = null,
      heartbeat_at = null,
      error = case
        when e.attempt >= e.max_attempts then
          jsonb_build_object(
            'code', 'LEASE_EXPIRED',
            'message', 'Worker lease expired and attempts were exhausted.'
          )
        else j.error
      end,
      finished_at = case
        when e.attempt >= e.max_attempts then now()
        else j.finished_at
      end,
      available_at = now()
    from expired e
    where j.id = e.id
    returning j.id
  )
  select count(*) into recovered from moved;
  return recovered;
end;
$$;

revoke all on function recover_expired_runtime_jobs() from public;
grant execute on function recover_expired_runtime_jobs() to service_role;

-- ---------------------------------------------------------------------------
-- claim_runtime_jobs
--
-- Atomically claims up to p_limit eligible queued jobs for p_worker with a
-- bounded lease. FOR UPDATE SKIP LOCKED guarantees two workers can never claim
-- the same row. Eligibility: status='queued' AND available_at <= now() AND
-- attempt < max_attempts, ordered by priority (desc) then created_at (asc).
-- The claim increments attempt exactly once and stamps the lease.
-- ---------------------------------------------------------------------------
create or replace function claim_runtime_jobs(
  p_worker text,
  p_limit integer default 5,
  p_lease_seconds integer default 120
)
returns setof runtime_jobs
language plpgsql
security definer
set search_path = public
as $$
declare
  v_limit integer := least(greatest(coalesce(p_limit, 1), 1), 20);
  v_lease integer := least(greatest(coalesce(p_lease_seconds, 30), 15), 900);
begin
  return query
  with eligible as (
    select id
    from runtime_jobs
    where status = 'queued'
      and available_at <= now()
      and attempt < max_attempts
      and cancel_requested_at is null
    order by priority desc, created_at asc
    limit v_limit
    for update skip locked
  )
  update runtime_jobs j
  set
    status = 'leased',
    attempt = j.attempt + 1,
    lease_owner = p_worker,
    lease_expires_at = now() + make_interval(secs => v_lease),
    heartbeat_at = now()
  from eligible e
  where j.id = e.id
  returning j.*;
end;
$$;

revoke all on function claim_runtime_jobs(text, integer, integer) from public;
grant execute on function claim_runtime_jobs(text, integer, integer) to service_role;
