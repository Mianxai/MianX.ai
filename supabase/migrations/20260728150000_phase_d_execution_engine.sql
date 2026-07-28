-- Additive Phase D autonomous execution engine tables.
-- DO NOT apply without Founder approval.
-- Idempotent: create if not exists; RLS + service_role grants.
-- Rollback: drop tables in reverse order (execution_checkpoints,
-- execution_events, workforce_allocations, execution_dependencies,
-- execution_items, execution_programs, products, companies) only if empty
-- and Founder-approved — never auto-rollback in CI.

-- ---------------------------------------------------------------------------
-- companies
-- ---------------------------------------------------------------------------
create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  name text not null,
  status text not null default 'draft',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists companies_project_idx on companies (project_id);
create index if not exists companies_status_idx on companies (status);

alter table companies enable row level security;
drop policy if exists companies_service_all on companies;
create policy companies_service_all on companies
  for all to service_role using (true) with check (true);
grant all on table companies to service_role;

-- ---------------------------------------------------------------------------
-- products
-- ---------------------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  name text not null,
  industry text,
  status text not null default 'draft',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_company_idx on products (company_id);
create index if not exists products_project_idx on products (project_id);

alter table products enable row level security;
drop policy if exists products_service_all on products;
create policy products_service_all on products
  for all to service_role using (true) with check (true);
grant all on table products to service_role;

-- ---------------------------------------------------------------------------
-- execution_programs
-- ---------------------------------------------------------------------------
create table if not exists execution_programs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete restrict,
  product_id uuid references products(id) on delete restrict,
  project_id uuid not null references projects(id) on delete restrict,
  blueprint_id text not null,
  blueprint_version integer not null default 1,
  objective_id text,
  status text not null default 'approved',
  priority text not null default 'P2',
  risk_level text not null default 'R2',
  paused_at timestamptz,
  cancelled_at timestamptz,
  frozen_blueprint jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint execution_programs_status_check
    check (status in (
      'draft','awaiting_approval','approved','queued','ready','blocked',
      'assigned','running','review','succeeded','failed','retry_wait',
      'dead_lettered','paused','cancelled'
    ))
);

create index if not exists execution_programs_project_idx on execution_programs (project_id);
create index if not exists execution_programs_status_idx on execution_programs (status);
create index if not exists execution_programs_priority_idx on execution_programs (priority);
create index if not exists execution_programs_blueprint_idx on execution_programs (blueprint_id);

alter table execution_programs enable row level security;
drop policy if exists execution_programs_service_all on execution_programs;
create policy execution_programs_service_all on execution_programs
  for all to service_role using (true) with check (true);
grant all on table execution_programs to service_role;

-- ---------------------------------------------------------------------------
-- execution_items (epics/features/stories/tasks/agent_runs)
-- ---------------------------------------------------------------------------
create table if not exists execution_items (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references execution_programs(id) on delete restrict,
  company_id uuid not null references companies(id) on delete restrict,
  project_id uuid not null references projects(id) on delete restrict,
  objective_id text,
  parent_id uuid references execution_items(id) on delete set null,
  level text not null,
  title text not null,
  status text not null default 'queued',
  priority text not null default 'P2',
  risk_level text not null default 'R2',
  assigned_agent text,
  department text,
  wave integer,
  attempt integer not null default 0,
  max_attempts integer not null default 3,
  dependency_ids jsonb not null default '[]'::jsonb,
  handoff jsonb,
  review_requirements jsonb not null default '[]'::jsonb,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint execution_items_level_check
    check (level in ('epic','feature','story','task','agent_run')),
  constraint execution_items_status_check
    check (status in (
      'draft','awaiting_approval','approved','queued','ready','blocked',
      'assigned','running','review','succeeded','failed','retry_wait',
      'dead_lettered','paused','cancelled'
    ))
);

create index if not exists execution_items_program_idx on execution_items (program_id);
create index if not exists execution_items_project_idx on execution_items (project_id);
create index if not exists execution_items_status_idx on execution_items (status);
create index if not exists execution_items_priority_idx on execution_items (priority);
create index if not exists execution_items_parent_idx on execution_items (parent_id);
create index if not exists execution_items_agent_idx on execution_items (assigned_agent);

alter table execution_items enable row level security;
drop policy if exists execution_items_service_all on execution_items;
create policy execution_items_service_all on execution_items
  for all to service_role using (true) with check (true);
grant all on table execution_items to service_role;

-- ---------------------------------------------------------------------------
-- execution_dependencies
-- ---------------------------------------------------------------------------
create table if not exists execution_dependencies (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references execution_programs(id) on delete restrict,
  project_id uuid not null references projects(id) on delete restrict,
  from_item_id text not null,
  to_item_id text not null,
  kind text not null default 'requires',
  required boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists execution_dependencies_program_idx on execution_dependencies (program_id);
create index if not exists execution_dependencies_project_idx on execution_dependencies (project_id);

alter table execution_dependencies enable row level security;
drop policy if exists execution_dependencies_service_all on execution_dependencies;
create policy execution_dependencies_service_all on execution_dependencies
  for all to service_role using (true) with check (true);
grant all on table execution_dependencies to service_role;

-- ---------------------------------------------------------------------------
-- workforce_allocations
-- ---------------------------------------------------------------------------
create table if not exists workforce_allocations (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references execution_programs(id) on delete restrict,
  project_id uuid not null references projects(id) on delete restrict,
  item_id uuid references execution_items(id) on delete set null,
  agent_slug text not null,
  department text,
  status text not null default 'assigned',
  load_score numeric(8,3) not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists workforce_allocations_project_idx on workforce_allocations (project_id);
create index if not exists workforce_allocations_agent_idx on workforce_allocations (agent_slug);
create index if not exists workforce_allocations_status_idx on workforce_allocations (status);

alter table workforce_allocations enable row level security;
drop policy if exists workforce_allocations_service_all on workforce_allocations;
create policy workforce_allocations_service_all on workforce_allocations
  for all to service_role using (true) with check (true);
grant all on table workforce_allocations to service_role;

-- ---------------------------------------------------------------------------
-- execution_events (immutable audit stream for programs)
-- ---------------------------------------------------------------------------
create table if not exists execution_events (
  id uuid primary key default gen_random_uuid(),
  program_id uuid references execution_programs(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  item_id uuid,
  event_type text not null,
  actor text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists execution_events_program_idx on execution_events (program_id);
create index if not exists execution_events_project_idx on execution_events (project_id);
create index if not exists execution_events_type_idx on execution_events (event_type);

alter table execution_events enable row level security;
drop policy if exists execution_events_service_all on execution_events;
create policy execution_events_service_all on execution_events
  for all to service_role using (true) with check (true);
grant all on table execution_events to service_role;

-- ---------------------------------------------------------------------------
-- execution_checkpoints
-- ---------------------------------------------------------------------------
create table if not exists execution_checkpoints (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references execution_programs(id) on delete restrict,
  project_id uuid not null references projects(id) on delete restrict,
  kind text not null,
  label text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists execution_checkpoints_program_idx on execution_checkpoints (program_id);
create index if not exists execution_checkpoints_kind_idx on execution_checkpoints (kind);

alter table execution_checkpoints enable row level security;
drop policy if exists execution_checkpoints_service_all on execution_checkpoints;
create policy execution_checkpoints_service_all on execution_checkpoints
  for all to service_role using (true) with check (true);
grant all on table execution_checkpoints to service_role;
