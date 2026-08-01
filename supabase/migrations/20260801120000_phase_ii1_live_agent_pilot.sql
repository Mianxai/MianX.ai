-- Additive Phase II.1 live-agent pilot durable tables.
-- DO NOT apply without Founder approval.
-- Idempotent: create if not exists; RLS + service_role grants.
-- No provider keys. No seed data that allocates or activates agents.
-- Rollback: drop tables in reverse order only if empty and Founder-approved.

-- ---------------------------------------------------------------------------
-- 1. pilot_runs
-- ---------------------------------------------------------------------------
create table if not exists pilot_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  task_id text,
  agent_definition_id text not null default 'mianx-internal-architecture-reviewer',
  agent_instance_id text,
  approval_id uuid,
  provider text not null default 'none',
  model text,
  status text not null default 'blocked',
  attempt integer not null default 1,
  lease_owner text,
  lease_expires_at timestamptz,
  idempotency_key text,
  input_hash text,
  output_hash text,
  input_tokens integer,
  output_tokens integer,
  total_tokens integer,
  estimated_cost_usd numeric(12, 6),
  started_at timestamptz,
  ended_at timestamptz,
  failure_classification text,
  evidence_refs jsonb not null default '[]'::jsonb,
  fabricated boolean not null default false,
  simulated boolean not null default false,
  live boolean not null default false,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pilot_runs_idempotency_unique unique (idempotency_key)
);

create index if not exists pilot_runs_project_idx on pilot_runs (project_id);
create index if not exists pilot_runs_status_idx on pilot_runs (status);
create index if not exists pilot_runs_agent_idx on pilot_runs (agent_definition_id);

alter table pilot_runs enable row level security;
drop policy if exists pilot_runs_service_all on pilot_runs;
create policy pilot_runs_service_all on pilot_runs
  for all to service_role using (true) with check (true);
grant all on table pilot_runs to service_role;

-- ---------------------------------------------------------------------------
-- 2. pilot_approvals
-- ---------------------------------------------------------------------------
create table if not exists pilot_approvals (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  task_id text not null,
  agent_slug text not null default 'mianx-internal-architecture-reviewer',
  approved_by text,
  notes text,
  status text not null default 'approved',
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists pilot_approvals_project_idx on pilot_approvals (project_id);
create index if not exists pilot_approvals_task_idx on pilot_approvals (project_id, task_id, agent_slug);

alter table pilot_approvals enable row level security;
drop policy if exists pilot_approvals_service_all on pilot_approvals;
create policy pilot_approvals_service_all on pilot_approvals
  for all to service_role using (true) with check (true);
grant all on table pilot_approvals to service_role;

-- ---------------------------------------------------------------------------
-- 3. provider_requests (pilot-scoped evidence of provider calls)
-- ---------------------------------------------------------------------------
create table if not exists pilot_provider_requests (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  pilot_run_id uuid references pilot_runs(id) on delete cascade,
  provider_name text not null default 'none',
  model_name text,
  request_id text,
  raw_provider_status text,
  normalized_error_code text,
  retryable boolean not null default false,
  network_called boolean not null default false,
  fabricated boolean not null default false,
  simulated boolean not null default false,
  latency_ms integer,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists pilot_provider_requests_run_idx on pilot_provider_requests (pilot_run_id);
create index if not exists pilot_provider_requests_project_idx on pilot_provider_requests (project_id);

alter table pilot_provider_requests enable row level security;
drop policy if exists pilot_provider_requests_service_all on pilot_provider_requests;
create policy pilot_provider_requests_service_all on pilot_provider_requests
  for all to service_role using (true) with check (true);
grant all on table pilot_provider_requests to service_role;

-- ---------------------------------------------------------------------------
-- 4. token_usage
-- ---------------------------------------------------------------------------
create table if not exists pilot_token_usage (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  pilot_run_id uuid references pilot_runs(id) on delete cascade,
  input_tokens integer,
  output_tokens integer,
  total_tokens integer,
  fabricated boolean not null default false,
  simulated boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists pilot_token_usage_run_idx on pilot_token_usage (pilot_run_id);

alter table pilot_token_usage enable row level security;
drop policy if exists pilot_token_usage_service_all on pilot_token_usage;
create policy pilot_token_usage_service_all on pilot_token_usage
  for all to service_role using (true) with check (true);
grant all on table pilot_token_usage to service_role;

-- ---------------------------------------------------------------------------
-- 5. cost_usage
-- ---------------------------------------------------------------------------
create table if not exists pilot_cost_usage (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  pilot_run_id uuid references pilot_runs(id) on delete cascade,
  estimated_cost_usd numeric(12, 6),
  currency text not null default 'USD',
  fabricated boolean not null default false,
  simulated boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists pilot_cost_usage_run_idx on pilot_cost_usage (pilot_run_id);

alter table pilot_cost_usage enable row level security;
drop policy if exists pilot_cost_usage_service_all on pilot_cost_usage;
create policy pilot_cost_usage_service_all on pilot_cost_usage
  for all to service_role using (true) with check (true);
grant all on table pilot_cost_usage to service_role;

-- ---------------------------------------------------------------------------
-- 6. pilot_evidence
-- ---------------------------------------------------------------------------
create table if not exists pilot_evidence (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  pilot_run_id uuid references pilot_runs(id) on delete cascade,
  kind text not null default 'run_summary',
  prompt_version text,
  prompt_hash text,
  output_hash text,
  summary jsonb not null default '{}'::jsonb,
  fabricated boolean not null default false,
  simulated boolean not null default false,
  live boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists pilot_evidence_run_idx on pilot_evidence (pilot_run_id);
create index if not exists pilot_evidence_project_idx on pilot_evidence (project_id);

alter table pilot_evidence enable row level security;
drop policy if exists pilot_evidence_service_all on pilot_evidence;
create policy pilot_evidence_service_all on pilot_evidence
  for all to service_role using (true) with check (true);
grant all on table pilot_evidence to service_role;

-- ---------------------------------------------------------------------------
-- 7. pilot_failures
-- ---------------------------------------------------------------------------
create table if not exists pilot_failures (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  pilot_run_id uuid references pilot_runs(id) on delete set null,
  classification text not null,
  message text,
  sanitized_details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists pilot_failures_project_idx on pilot_failures (project_id);

alter table pilot_failures enable row level security;
drop policy if exists pilot_failures_service_all on pilot_failures;
create policy pilot_failures_service_all on pilot_failures
  for all to service_role using (true) with check (true);
grant all on table pilot_failures to service_role;

-- ---------------------------------------------------------------------------
-- 8. kill_switch_events
-- ---------------------------------------------------------------------------
create table if not exists pilot_kill_switch_events (
  id uuid primary key default gen_random_uuid(),
  project_id uuid,
  active boolean not null,
  actor text,
  reason text,
  created_at timestamptz not null default now()
);

create index if not exists pilot_kill_switch_events_created_idx
  on pilot_kill_switch_events (created_at desc);

alter table pilot_kill_switch_events enable row level security;
drop policy if exists pilot_kill_switch_events_service_all on pilot_kill_switch_events;
create policy pilot_kill_switch_events_service_all on pilot_kill_switch_events
  for all to service_role using (true) with check (true);
grant all on table pilot_kill_switch_events to service_role;
