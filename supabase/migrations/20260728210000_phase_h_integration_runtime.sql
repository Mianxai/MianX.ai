-- Additive Phase H integration runtime tables.
-- DO NOT apply without Founder approval.
-- Idempotent: create if not exists; RLS + service_role grants.
-- Reuses existing objective/task/memory/learning/approval/agent/planning tables.
-- Rollback: drop tables in reverse order only if empty and Founder-approved.

-- ---------------------------------------------------------------------------
-- 1. integration_runs
-- ---------------------------------------------------------------------------
create table if not exists integration_runs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  objective_id text,
  template_selection_id text,
  planning_plan_id text,
  execution_preview_id text,
  execution_run_id text,
  approval_gate_id text,
  current_stage text not null,
  execution_mode text not null default 'deterministic_simulation',
  status text not null default 'active',
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  failure_reason text,
  retry_count integer not null default 0,
  recovery_count integer not null default 0,
  correlation_id text not null,
  trace_id text not null,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists integration_runs_project_idx on integration_runs (project_id);
create index if not exists integration_runs_stage_idx on integration_runs (current_stage);
create index if not exists integration_runs_status_idx on integration_runs (status);
create index if not exists integration_runs_correlation_idx on integration_runs (correlation_id);
create index if not exists integration_runs_trace_idx on integration_runs (trace_id);

alter table integration_runs enable row level security;
drop policy if exists integration_runs_service_all on integration_runs;
create policy integration_runs_service_all on integration_runs
  for all to service_role using (true) with check (true);
grant all on table integration_runs to service_role;

-- ---------------------------------------------------------------------------
-- 2. integration_stage_events
-- ---------------------------------------------------------------------------
create table if not exists integration_stage_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  integration_run_id uuid not null references integration_runs(id) on delete cascade,
  from_stage text,
  to_stage text not null,
  actor text,
  correlation_id text,
  trace_id text,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists integration_stage_events_run_idx
  on integration_stage_events (integration_run_id);
create index if not exists integration_stage_events_project_idx
  on integration_stage_events (project_id);

alter table integration_stage_events enable row level security;
drop policy if exists integration_stage_events_service_all on integration_stage_events;
create policy integration_stage_events_service_all on integration_stage_events
  for all to service_role using (true) with check (true);
grant all on table integration_stage_events to service_role;

-- ---------------------------------------------------------------------------
-- 3. integration_checkpoints
-- ---------------------------------------------------------------------------
create table if not exists integration_checkpoints (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  integration_run_id uuid not null references integration_runs(id) on delete cascade,
  stage text not null,
  status text not null,
  correlation_id text,
  trace_id text,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists integration_checkpoints_run_idx
  on integration_checkpoints (integration_run_id);
create index if not exists integration_checkpoints_project_idx
  on integration_checkpoints (project_id);

alter table integration_checkpoints enable row level security;
drop policy if exists integration_checkpoints_service_all on integration_checkpoints;
create policy integration_checkpoints_service_all on integration_checkpoints
  for all to service_role using (true) with check (true);
grant all on table integration_checkpoints to service_role;

-- ---------------------------------------------------------------------------
-- 4. integration_evidence_manifests
-- ---------------------------------------------------------------------------
create table if not exists integration_evidence_manifests (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  integration_run_id uuid not null references integration_runs(id) on delete cascade,
  correlation_id text,
  trace_id text,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create unique index if not exists integration_evidence_manifests_run_uidx
  on integration_evidence_manifests (integration_run_id);
create index if not exists integration_evidence_manifests_project_idx
  on integration_evidence_manifests (project_id);

alter table integration_evidence_manifests enable row level security;
drop policy if exists integration_evidence_manifests_service_all on integration_evidence_manifests;
create policy integration_evidence_manifests_service_all on integration_evidence_manifests
  for all to service_role using (true) with check (true);
grant all on table integration_evidence_manifests to service_role;

-- ---------------------------------------------------------------------------
-- 5. integration_failure_events
-- ---------------------------------------------------------------------------
create table if not exists integration_failure_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  integration_run_id uuid references integration_runs(id) on delete cascade,
  code text not null,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists integration_failure_events_run_idx
  on integration_failure_events (integration_run_id);
create index if not exists integration_failure_events_project_idx
  on integration_failure_events (project_id);
create index if not exists integration_failure_events_code_idx
  on integration_failure_events (code);

alter table integration_failure_events enable row level security;
drop policy if exists integration_failure_events_service_all on integration_failure_events;
create policy integration_failure_events_service_all on integration_failure_events
  for all to service_role using (true) with check (true);
grant all on table integration_failure_events to service_role;
