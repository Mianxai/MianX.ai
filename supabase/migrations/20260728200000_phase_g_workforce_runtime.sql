-- Additive Phase G workforce runtime tables.
-- DO NOT apply without Founder approval.
-- Idempotent: create if not exists; RLS + service_role grants.
-- Rollback: drop tables in reverse order (workforce_audit_events,
-- workforce_simulations, workforce_health_events, workforce_control_events,
-- workforce_checkpoints, workforce_learning_proposals, workforce_memory_writes,
-- workforce_pipeline_events, workforce_collaborations, workforce_delegations,
-- workforce_messages, workforce_execution_contexts, workforce_agent_states)
-- only if empty and Founder-approved — never auto-rollback in CI.

-- ---------------------------------------------------------------------------
-- Shared column pattern:
--   id, organization_id, project_id, payload, audit_metadata,
--   created_at, updated_at
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- 1. workforce_agent_states
-- ---------------------------------------------------------------------------
create table if not exists workforce_agent_states (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  agent_slug text not null,
  lifecycle_status text not null,
  current_task_id text,
  simulation boolean not null default false,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workforce_agent_states_agent_slug_idx
  on workforce_agent_states (agent_slug);
create index if not exists workforce_agent_states_lifecycle_status_idx
  on workforce_agent_states (lifecycle_status);
create index if not exists workforce_agent_states_project_idx
  on workforce_agent_states (project_id);
create unique index if not exists workforce_agent_states_slug_project_uidx
  on workforce_agent_states (agent_slug, project_id)
  where project_id is not null;
create unique index if not exists workforce_agent_states_slug_global_uidx
  on workforce_agent_states (agent_slug)
  where project_id is null;

alter table workforce_agent_states enable row level security;
drop policy if exists workforce_agent_states_service_all on workforce_agent_states;
create policy workforce_agent_states_service_all on workforce_agent_states
  for all to service_role using (true) with check (true);
grant all on table workforce_agent_states to service_role;

-- ---------------------------------------------------------------------------
-- 2. workforce_execution_contexts
-- ---------------------------------------------------------------------------
create table if not exists workforce_execution_contexts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  agent_slug text not null,
  task_id text,
  simulation boolean not null default false,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workforce_execution_contexts_agent_slug_idx
  on workforce_execution_contexts (agent_slug);
create index if not exists workforce_execution_contexts_task_idx
  on workforce_execution_contexts (task_id);
create index if not exists workforce_execution_contexts_project_idx
  on workforce_execution_contexts (project_id);

alter table workforce_execution_contexts enable row level security;
drop policy if exists workforce_execution_contexts_service_all on workforce_execution_contexts;
create policy workforce_execution_contexts_service_all on workforce_execution_contexts
  for all to service_role using (true) with check (true);
grant all on table workforce_execution_contexts to service_role;

-- ---------------------------------------------------------------------------
-- 3. workforce_messages
-- ---------------------------------------------------------------------------
create table if not exists workforce_messages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  thread_id text,
  from_agent text,
  to_agent text,
  kind text,
  status text,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workforce_messages_kind_check
    check (kind is null or kind in (
      'delegate','receive','reply','escalate','complete'
    ))
);

create index if not exists workforce_messages_thread_idx
  on workforce_messages (thread_id);
create index if not exists workforce_messages_kind_idx
  on workforce_messages (kind);
create index if not exists workforce_messages_project_idx
  on workforce_messages (project_id);
create index if not exists workforce_messages_status_idx
  on workforce_messages (status);

alter table workforce_messages enable row level security;
drop policy if exists workforce_messages_service_all on workforce_messages;
create policy workforce_messages_service_all on workforce_messages
  for all to service_role using (true) with check (true);
grant all on table workforce_messages to service_role;

-- ---------------------------------------------------------------------------
-- 4. workforce_delegations
-- ---------------------------------------------------------------------------
create table if not exists workforce_delegations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  from_agent text,
  to_agent text,
  task_id text,
  status text,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workforce_delegations_from_agent_idx
  on workforce_delegations (from_agent);
create index if not exists workforce_delegations_to_agent_idx
  on workforce_delegations (to_agent);
create index if not exists workforce_delegations_task_idx
  on workforce_delegations (task_id);
create index if not exists workforce_delegations_status_idx
  on workforce_delegations (status);
create index if not exists workforce_delegations_project_idx
  on workforce_delegations (project_id);

alter table workforce_delegations enable row level security;
drop policy if exists workforce_delegations_service_all on workforce_delegations;
create policy workforce_delegations_service_all on workforce_delegations
  for all to service_role using (true) with check (true);
grant all on table workforce_delegations to service_role;

-- ---------------------------------------------------------------------------
-- 5. workforce_collaborations
-- ---------------------------------------------------------------------------
create table if not exists workforce_collaborations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  collaboration_id text,
  participant_slugs jsonb not null default '[]'::jsonb,
  shared_context jsonb not null default '{}'::jsonb,
  status text,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workforce_collaborations_collaboration_idx
  on workforce_collaborations (collaboration_id);
create index if not exists workforce_collaborations_status_idx
  on workforce_collaborations (status);
create index if not exists workforce_collaborations_project_idx
  on workforce_collaborations (project_id);

alter table workforce_collaborations enable row level security;
drop policy if exists workforce_collaborations_service_all on workforce_collaborations;
create policy workforce_collaborations_service_all on workforce_collaborations
  for all to service_role using (true) with check (true);
grant all on table workforce_collaborations to service_role;

-- ---------------------------------------------------------------------------
-- 6. workforce_pipeline_events
-- ---------------------------------------------------------------------------
create table if not exists workforce_pipeline_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  task_id text,
  stage text,
  status text,
  agent_slug text,
  simulation boolean not null default false,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workforce_pipeline_events_stage_check
    check (stage is null or stage in (
      'claim','execute','verify','review','approve','close'
    ))
);

create index if not exists workforce_pipeline_events_task_idx
  on workforce_pipeline_events (task_id);
create index if not exists workforce_pipeline_events_stage_idx
  on workforce_pipeline_events (stage);
create index if not exists workforce_pipeline_events_status_idx
  on workforce_pipeline_events (status);
create index if not exists workforce_pipeline_events_agent_slug_idx
  on workforce_pipeline_events (agent_slug);
create index if not exists workforce_pipeline_events_project_idx
  on workforce_pipeline_events (project_id);

alter table workforce_pipeline_events enable row level security;
drop policy if exists workforce_pipeline_events_service_all on workforce_pipeline_events;
create policy workforce_pipeline_events_service_all on workforce_pipeline_events
  for all to service_role using (true) with check (true);
grant all on table workforce_pipeline_events to service_role;

-- ---------------------------------------------------------------------------
-- 7. workforce_memory_writes
-- ---------------------------------------------------------------------------
create table if not exists workforce_memory_writes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  agent_slug text,
  task_id text,
  type text,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workforce_memory_writes_agent_slug_idx
  on workforce_memory_writes (agent_slug);
create index if not exists workforce_memory_writes_task_idx
  on workforce_memory_writes (task_id);
create index if not exists workforce_memory_writes_type_idx
  on workforce_memory_writes (type);
create index if not exists workforce_memory_writes_project_idx
  on workforce_memory_writes (project_id);

alter table workforce_memory_writes enable row level security;
drop policy if exists workforce_memory_writes_service_all on workforce_memory_writes;
create policy workforce_memory_writes_service_all on workforce_memory_writes
  for all to service_role using (true) with check (true);
grant all on table workforce_memory_writes to service_role;

-- ---------------------------------------------------------------------------
-- 8. workforce_learning_proposals
-- Never auto-approved — status defaults to pending_review.
-- ---------------------------------------------------------------------------
create table if not exists workforce_learning_proposals (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  agent_slug text,
  type text,
  status text not null default 'pending_review',
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workforce_learning_proposals_agent_slug_idx
  on workforce_learning_proposals (agent_slug);
create index if not exists workforce_learning_proposals_status_idx
  on workforce_learning_proposals (status);
create index if not exists workforce_learning_proposals_type_idx
  on workforce_learning_proposals (type);
create index if not exists workforce_learning_proposals_project_idx
  on workforce_learning_proposals (project_id);

alter table workforce_learning_proposals enable row level security;
drop policy if exists workforce_learning_proposals_service_all on workforce_learning_proposals;
create policy workforce_learning_proposals_service_all on workforce_learning_proposals
  for all to service_role using (true) with check (true);
grant all on table workforce_learning_proposals to service_role;

-- ---------------------------------------------------------------------------
-- 9. workforce_checkpoints
-- ---------------------------------------------------------------------------
create table if not exists workforce_checkpoints (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  kind text,
  agent_slug text,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workforce_checkpoints_kind_idx
  on workforce_checkpoints (kind);
create index if not exists workforce_checkpoints_agent_slug_idx
  on workforce_checkpoints (agent_slug);
create index if not exists workforce_checkpoints_project_idx
  on workforce_checkpoints (project_id);

alter table workforce_checkpoints enable row level security;
drop policy if exists workforce_checkpoints_service_all on workforce_checkpoints;
create policy workforce_checkpoints_service_all on workforce_checkpoints
  for all to service_role using (true) with check (true);
grant all on table workforce_checkpoints to service_role;

-- ---------------------------------------------------------------------------
-- 10. workforce_control_events
-- ---------------------------------------------------------------------------
create table if not exists workforce_control_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  action text,
  actor text,
  agent_slug text,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workforce_control_events_action_check
    check (action is null or action in (
      'pause','resume','stop','retry','cancel','reassign','approve','reject'
    ))
);

create index if not exists workforce_control_events_action_idx
  on workforce_control_events (action);
create index if not exists workforce_control_events_actor_idx
  on workforce_control_events (actor);
create index if not exists workforce_control_events_agent_slug_idx
  on workforce_control_events (agent_slug);
create index if not exists workforce_control_events_project_idx
  on workforce_control_events (project_id);

alter table workforce_control_events enable row level security;
drop policy if exists workforce_control_events_service_all on workforce_control_events;
create policy workforce_control_events_service_all on workforce_control_events
  for all to service_role using (true) with check (true);
grant all on table workforce_control_events to service_role;

-- ---------------------------------------------------------------------------
-- 11. workforce_health_events
-- ---------------------------------------------------------------------------
create table if not exists workforce_health_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  kind text,
  severity text,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workforce_health_events_kind_idx
  on workforce_health_events (kind);
create index if not exists workforce_health_events_severity_idx
  on workforce_health_events (severity);
create index if not exists workforce_health_events_project_idx
  on workforce_health_events (project_id);

alter table workforce_health_events enable row level security;
drop policy if exists workforce_health_events_service_all on workforce_health_events;
create policy workforce_health_events_service_all on workforce_health_events
  for all to service_role using (true) with check (true);
grant all on table workforce_health_events to service_role;

-- ---------------------------------------------------------------------------
-- 12. workforce_simulations
-- Payload must not encode a production-mutation flag; simulations are
-- observational and must not mutate production state.
-- ---------------------------------------------------------------------------
create table if not exists workforce_simulations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  name text,
  status text,
  started_at timestamptz,
  ended_at timestamptz,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workforce_simulations_name_idx
  on workforce_simulations (name);
create index if not exists workforce_simulations_status_idx
  on workforce_simulations (status);
create index if not exists workforce_simulations_project_idx
  on workforce_simulations (project_id);

alter table workforce_simulations enable row level security;
drop policy if exists workforce_simulations_service_all on workforce_simulations;
create policy workforce_simulations_service_all on workforce_simulations
  for all to service_role using (true) with check (true);
grant all on table workforce_simulations to service_role;

-- ---------------------------------------------------------------------------
-- 13. workforce_audit_events
-- ---------------------------------------------------------------------------
create table if not exists workforce_audit_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  action text,
  actor text,
  agent_slug text,
  payload jsonb not null default '{}'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workforce_audit_events_action_idx
  on workforce_audit_events (action);
create index if not exists workforce_audit_events_actor_idx
  on workforce_audit_events (actor);
create index if not exists workforce_audit_events_agent_slug_idx
  on workforce_audit_events (agent_slug);
create index if not exists workforce_audit_events_project_idx
  on workforce_audit_events (project_id);
create index if not exists workforce_audit_events_created_at_idx
  on workforce_audit_events (created_at);

alter table workforce_audit_events enable row level security;
drop policy if exists workforce_audit_events_service_all on workforce_audit_events;
create policy workforce_audit_events_service_all on workforce_audit_events
  for all to service_role using (true) with check (true);
grant all on table workforce_audit_events to service_role;
