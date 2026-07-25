-- Mianx Core agent runtime foundation.
--
-- Additive, non-destructive migration. It introduces the minimum runtime
-- schema behind the existing website: organizations, projects, agent
-- definitions/instances, tasks, task assignments, agent runs, approval
-- requests and audit logs. Nothing in this file touches or drops the
-- existing `leads` table or its data.
--
-- Design notes:
--  * Status/lifecycle values use text + CHECK constraints (mirroring the
--    existing leads table) rather than native ENUM types, so the migration
--    stays idempotent and re-runnable without DO-block enum guards.
--  * Every operational table has RLS enabled with NO policies, so the anon
--    browser key gets zero access. All backend access goes through the
--    service_role key (which bypasses RLS), matching lib/supabase.js.
--  * Operational records are never hard-deleted by the app: soft-delete via
--    archived_at, and foreign keys use ON DELETE RESTRICT so a parent can't
--    silently destroy child runtime history. audit_logs use ON DELETE SET
--    NULL so the trail survives even if a referenced resource is removed
--    out-of-band.

-- Shared updated_at trigger.
create or replace function mianx_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- organizations
-- ---------------------------------------------------------------------------
create table if not exists organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint organizations_status_check
    check (status in ('active', 'suspended', 'archived'))
);

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  status text not null default 'active',
  metadata jsonb not null default '{}'::jsonb,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_status_check
    check (status in ('active', 'paused', 'archived')),
  constraint projects_org_slug_unique unique (organization_id, slug)
);

create index if not exists projects_org_idx on projects (organization_id);
create index if not exists projects_status_idx on projects (status);

-- ---------------------------------------------------------------------------
-- agent_definitions — versioned catalog of what an agent *is* and may do.
-- ---------------------------------------------------------------------------
create table if not exists agent_definitions (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  version integer not null default 1,
  name text not null,
  purpose text not null,
  allowed_capabilities jsonb not null default '[]'::jsonb,
  prohibited_capabilities jsonb not null default '[]'::jsonb,
  input_schema jsonb not null default '{}'::jsonb,
  output_schema jsonb not null default '{}'::jsonb,
  default_provider text not null default 'anthropic',
  default_model text not null,
  requires_human_approval boolean not null default false,
  lifecycle_status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint agent_definitions_lifecycle_check
    check (lifecycle_status in ('draft', 'active', 'deprecated')),
  constraint agent_definitions_provider_check
    check (default_provider in ('anthropic', 'none')),
  constraint agent_definitions_slug_version_unique unique (slug, version)
);

create index if not exists agent_definitions_slug_idx on agent_definitions (slug);
create index if not exists agent_definitions_lifecycle_idx on agent_definitions (lifecycle_status);

-- ---------------------------------------------------------------------------
-- agent_instances — a definition registered into a specific project.
-- ---------------------------------------------------------------------------
create table if not exists agent_instances (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete restrict,
  agent_definition_id uuid not null references agent_definitions(id) on delete restrict,
  display_name text,
  status text not null default 'active',
  config jsonb not null default '{}'::jsonb,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint agent_instances_status_check
    check (status in ('active', 'paused', 'retired'))
);

create index if not exists agent_instances_project_idx on agent_instances (project_id);
create index if not exists agent_instances_definition_idx on agent_instances (agent_definition_id);
create index if not exists agent_instances_status_idx on agent_instances (status);

-- ---------------------------------------------------------------------------
-- tasks — unit of work inside a project.
-- ---------------------------------------------------------------------------
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete restrict,
  title text not null,
  description text,
  status text not null default 'pending',
  priority text not null default 'normal',
  input jsonb not null default '{}'::jsonb,
  acceptance_criteria text,
  idempotency_key text,
  requires_approval boolean not null default false,
  created_by text,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint tasks_status_check
    check (status in (
      'pending', 'validated', 'awaiting_approval',
      'running', 'completed', 'failed', 'cancelled'
    )),
  constraint tasks_priority_check
    check (priority in ('low', 'normal', 'high', 'urgent')),
  -- Idempotent task creation: a client-supplied key is unique per project.
  constraint tasks_project_idempotency_unique unique (project_id, idempotency_key)
);

create index if not exists tasks_project_idx on tasks (project_id);
create index if not exists tasks_status_idx on tasks (status);
create index if not exists tasks_project_status_idx on tasks (project_id, status);
create index if not exists tasks_created_at_idx on tasks (created_at desc);

-- ---------------------------------------------------------------------------
-- task_assignments — which agent instance owns a task.
-- ---------------------------------------------------------------------------
create table if not exists task_assignments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references tasks(id) on delete restrict,
  agent_instance_id uuid not null references agent_instances(id) on delete restrict,
  status text not null default 'assigned',
  assigned_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint task_assignments_status_check
    check (status in ('assigned', 'accepted', 'released'))
);

create index if not exists task_assignments_task_idx on task_assignments (task_id);
create index if not exists task_assignments_agent_idx on task_assignments (agent_instance_id);

-- ---------------------------------------------------------------------------
-- agent_runs — a single execution attempt for a task.
-- ---------------------------------------------------------------------------
create table if not exists agent_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete restrict,
  task_id uuid not null references tasks(id) on delete restrict,
  agent_instance_id uuid references agent_instances(id) on delete set null,
  status text not null default 'created',
  provider text not null default 'none',
  model text,
  input jsonb not null default '{}'::jsonb,
  output jsonb,
  error jsonb,
  retry_count integer not null default 0,
  idempotency_key text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint agent_runs_status_check
    check (status in ('created', 'running', 'succeeded', 'failed', 'cancelled')),
  constraint agent_runs_provider_check
    check (provider in ('anthropic', 'none')),
  constraint agent_runs_retry_nonneg check (retry_count >= 0)
);

create index if not exists agent_runs_project_idx on agent_runs (project_id);
create index if not exists agent_runs_task_idx on agent_runs (task_id);
create index if not exists agent_runs_status_idx on agent_runs (status);
create index if not exists agent_runs_project_status_idx on agent_runs (project_id, status);
create index if not exists agent_runs_created_at_idx on agent_runs (created_at desc);

-- ---------------------------------------------------------------------------
-- approval_requests — human gate for protected actions.
-- ---------------------------------------------------------------------------
create table if not exists approval_requests (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete restrict,
  task_id uuid references tasks(id) on delete restrict,
  run_id uuid references agent_runs(id) on delete restrict,
  requested_capability text not null,
  reason text,
  status text not null default 'pending',
  decided_by text,
  decided_at timestamptz,
  decision_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint approval_requests_status_check
    check (status in ('pending', 'approved', 'rejected', 'cancelled'))
);

create index if not exists approval_requests_project_idx on approval_requests (project_id);
create index if not exists approval_requests_status_idx on approval_requests (status);
create index if not exists approval_requests_task_idx on approval_requests (task_id);

-- ---------------------------------------------------------------------------
-- audit_logs — append-only trail of who did what to which resource.
-- ---------------------------------------------------------------------------
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete set null,
  actor text not null,
  actor_type text not null default 'admin',
  action text not null,
  resource_type text not null,
  resource_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint audit_logs_actor_type_check
    check (actor_type in ('admin', 'system', 'agent'))
);

create index if not exists audit_logs_project_idx on audit_logs (project_id);
create index if not exists audit_logs_resource_idx on audit_logs (resource_type, resource_id);
create index if not exists audit_logs_created_at_idx on audit_logs (created_at desc);

-- ---------------------------------------------------------------------------
-- updated_at triggers (idempotent: drop-if-exists then create).
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
  tables text[] := array[
    'organizations', 'projects', 'agent_definitions', 'agent_instances',
    'tasks', 'task_assignments', 'agent_runs', 'approval_requests'
  ];
begin
  foreach t in array tables loop
    execute format('drop trigger if exists set_updated_at on %I', t);
    execute format(
      'create trigger set_updated_at before update on %I
         for each row execute function mianx_set_updated_at()',
      t
    );
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security: enabled everywhere, no policies => browser anon key has
-- no access. Backend uses the service_role key which bypasses RLS. Grants are
-- explicit for the local stack (harmless no-op on hosted Supabase).
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
  tables text[] := array[
    'organizations', 'projects', 'agent_definitions', 'agent_instances',
    'tasks', 'task_assignments', 'agent_runs', 'approval_requests', 'audit_logs'
  ];
begin
  foreach t in array tables loop
    execute format('alter table %I enable row level security', t);
    execute format('grant all privileges on table %I to service_role', t);
  end loop;
end;
$$;
