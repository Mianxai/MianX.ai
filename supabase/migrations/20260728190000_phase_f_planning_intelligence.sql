-- Additive Phase F planning intelligence tables.
-- DO NOT apply without Founder approval.
-- Idempotent: create if not exists; RLS + service_role grants.
-- Rollback: drop tables in reverse order (planning_audit_events,
-- planning_learning_proposals, planning_memory_links,
-- planning_execution_previews, planning_evidence, planning_risks,
-- planning_deliverables, planning_approval_gates, planning_dependencies,
-- planning_wbs_nodes, planning_milestones, planning_capabilities,
-- planning_roadmaps, planning_plans) only if empty and Founder-approved —
-- never auto-rollback in CI.

-- ---------------------------------------------------------------------------
-- Shared planning column pattern (tables 1–13):
--   id, organization_id, project_id, slug, name, description, status,
--   version, scope, source, confidence, evidence_refs, payload, owner,
--   audit_metadata, created_at, updated_at
-- Child tables add plan_id (and extras where noted).
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- planning_plans
-- ---------------------------------------------------------------------------
create table if not exists planning_plans (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'project',
  source text not null default 'planning',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_plans_status_check
    check (status in (
      'draft','pending_approval','approved','rejected','returned','archived'
    )),
  constraint planning_plans_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists planning_plans_status_idx on planning_plans (status);
create index if not exists planning_plans_project_idx on planning_plans (project_id);
create index if not exists planning_plans_organization_idx on planning_plans (organization_id);

alter table planning_plans enable row level security;
drop policy if exists planning_plans_service_all on planning_plans;
create policy planning_plans_service_all on planning_plans
  for all to service_role using (true) with check (true);
grant all on table planning_plans to service_role;

-- ---------------------------------------------------------------------------
-- planning_roadmaps
-- ---------------------------------------------------------------------------
create table if not exists planning_roadmaps (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  plan_id uuid not null references planning_plans(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'project',
  source text not null default 'planning',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  horizon text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_roadmaps_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists planning_roadmaps_horizon_idx on planning_roadmaps (horizon);
create index if not exists planning_roadmaps_plan_idx on planning_roadmaps (plan_id);
create index if not exists planning_roadmaps_status_idx on planning_roadmaps (status);

alter table planning_roadmaps enable row level security;
drop policy if exists planning_roadmaps_service_all on planning_roadmaps;
create policy planning_roadmaps_service_all on planning_roadmaps
  for all to service_role using (true) with check (true);
grant all on table planning_roadmaps to service_role;

-- ---------------------------------------------------------------------------
-- planning_capabilities
-- ---------------------------------------------------------------------------
create table if not exists planning_capabilities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  plan_id uuid not null references planning_plans(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'project',
  source text not null default 'planning',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_capabilities_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists planning_capabilities_plan_idx on planning_capabilities (plan_id);
create index if not exists planning_capabilities_status_idx on planning_capabilities (status);
create index if not exists planning_capabilities_slug_idx on planning_capabilities (slug);

alter table planning_capabilities enable row level security;
drop policy if exists planning_capabilities_service_all on planning_capabilities;
create policy planning_capabilities_service_all on planning_capabilities
  for all to service_role using (true) with check (true);
grant all on table planning_capabilities to service_role;

-- ---------------------------------------------------------------------------
-- planning_milestones
-- ---------------------------------------------------------------------------
create table if not exists planning_milestones (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  plan_id uuid not null references planning_plans(id) on delete restrict,
  roadmap_id uuid references planning_roadmaps(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'project',
  source text not null default 'planning',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_milestones_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists planning_milestones_plan_idx on planning_milestones (plan_id);
create index if not exists planning_milestones_roadmap_idx on planning_milestones (roadmap_id);
create index if not exists planning_milestones_status_idx on planning_milestones (status);

alter table planning_milestones enable row level security;
drop policy if exists planning_milestones_service_all on planning_milestones;
create policy planning_milestones_service_all on planning_milestones
  for all to service_role using (true) with check (true);
grant all on table planning_milestones to service_role;

-- ---------------------------------------------------------------------------
-- planning_wbs_nodes
-- ---------------------------------------------------------------------------
create table if not exists planning_wbs_nodes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  plan_id uuid not null references planning_plans(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'project',
  source text not null default 'planning',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  kind text,
  parent_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_wbs_nodes_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists planning_wbs_nodes_plan_idx on planning_wbs_nodes (plan_id);
create index if not exists planning_wbs_nodes_kind_idx on planning_wbs_nodes (kind);
create index if not exists planning_wbs_nodes_parent_idx on planning_wbs_nodes (parent_id);
create index if not exists planning_wbs_nodes_status_idx on planning_wbs_nodes (status);

alter table planning_wbs_nodes enable row level security;
drop policy if exists planning_wbs_nodes_service_all on planning_wbs_nodes;
create policy planning_wbs_nodes_service_all on planning_wbs_nodes
  for all to service_role using (true) with check (true);
grant all on table planning_wbs_nodes to service_role;

-- ---------------------------------------------------------------------------
-- planning_dependencies
-- ---------------------------------------------------------------------------
create table if not exists planning_dependencies (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  plan_id uuid not null references planning_plans(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'project',
  source text not null default 'planning',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  from_node_id text not null,
  to_node_id text not null,
  kind text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_dependencies_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists planning_dependencies_plan_idx on planning_dependencies (plan_id);
create index if not exists planning_dependencies_kind_idx on planning_dependencies (kind);

alter table planning_dependencies enable row level security;
drop policy if exists planning_dependencies_service_all on planning_dependencies;
create policy planning_dependencies_service_all on planning_dependencies
  for all to service_role using (true) with check (true);
grant all on table planning_dependencies to service_role;

-- ---------------------------------------------------------------------------
-- planning_approval_gates
-- ---------------------------------------------------------------------------
create table if not exists planning_approval_gates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  plan_id uuid not null references planning_plans(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'pending',
  version integer not null default 1,
  scope text not null default 'project',
  source text not null default 'planning',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_approval_gates_status_check
    check (status in (
      'pending','approved','rejected','returned','archived'
    )),
  constraint planning_approval_gates_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists planning_approval_gates_plan_idx on planning_approval_gates (plan_id);
create index if not exists planning_approval_gates_status_idx on planning_approval_gates (status);

alter table planning_approval_gates enable row level security;
drop policy if exists planning_approval_gates_service_all on planning_approval_gates;
create policy planning_approval_gates_service_all on planning_approval_gates
  for all to service_role using (true) with check (true);
grant all on table planning_approval_gates to service_role;

-- ---------------------------------------------------------------------------
-- planning_deliverables
-- ---------------------------------------------------------------------------
create table if not exists planning_deliverables (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  plan_id uuid not null references planning_plans(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'project',
  source text not null default 'planning',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_deliverables_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists planning_deliverables_plan_idx on planning_deliverables (plan_id);
create index if not exists planning_deliverables_status_idx on planning_deliverables (status);

alter table planning_deliverables enable row level security;
drop policy if exists planning_deliverables_service_all on planning_deliverables;
create policy planning_deliverables_service_all on planning_deliverables
  for all to service_role using (true) with check (true);
grant all on table planning_deliverables to service_role;

-- ---------------------------------------------------------------------------
-- planning_risks
-- ---------------------------------------------------------------------------
create table if not exists planning_risks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  plan_id uuid not null references planning_plans(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'project',
  source text not null default 'planning',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_risks_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists planning_risks_plan_idx on planning_risks (plan_id);
create index if not exists planning_risks_status_idx on planning_risks (status);

alter table planning_risks enable row level security;
drop policy if exists planning_risks_service_all on planning_risks;
create policy planning_risks_service_all on planning_risks
  for all to service_role using (true) with check (true);
grant all on table planning_risks to service_role;

-- ---------------------------------------------------------------------------
-- planning_evidence
-- ---------------------------------------------------------------------------
create table if not exists planning_evidence (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  plan_id uuid not null references planning_plans(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'project',
  source text not null default 'planning',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_evidence_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists planning_evidence_plan_idx on planning_evidence (plan_id);
create index if not exists planning_evidence_status_idx on planning_evidence (status);

alter table planning_evidence enable row level security;
drop policy if exists planning_evidence_service_all on planning_evidence;
create policy planning_evidence_service_all on planning_evidence
  for all to service_role using (true) with check (true);
grant all on table planning_evidence to service_role;

-- ---------------------------------------------------------------------------
-- planning_execution_previews (payload holds preview JSON)
-- ---------------------------------------------------------------------------
create table if not exists planning_execution_previews (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  plan_id uuid not null references planning_plans(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'project',
  source text not null default 'planning',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_execution_previews_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists planning_execution_previews_plan_idx on planning_execution_previews (plan_id);
create index if not exists planning_execution_previews_status_idx on planning_execution_previews (status);

alter table planning_execution_previews enable row level security;
drop policy if exists planning_execution_previews_service_all on planning_execution_previews;
create policy planning_execution_previews_service_all on planning_execution_previews
  for all to service_role using (true) with check (true);
grant all on table planning_execution_previews to service_role;

-- ---------------------------------------------------------------------------
-- planning_memory_links
-- ---------------------------------------------------------------------------
create table if not exists planning_memory_links (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  plan_id uuid not null references planning_plans(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'project',
  source text not null default 'planning',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  memory_entry_id text,
  type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_memory_links_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists planning_memory_links_plan_idx on planning_memory_links (plan_id);
create index if not exists planning_memory_links_type_idx on planning_memory_links (type);
create index if not exists planning_memory_links_memory_entry_idx on planning_memory_links (memory_entry_id);

alter table planning_memory_links enable row level security;
drop policy if exists planning_memory_links_service_all on planning_memory_links;
create policy planning_memory_links_service_all on planning_memory_links
  for all to service_role using (true) with check (true);
grant all on table planning_memory_links to service_role;

-- ---------------------------------------------------------------------------
-- planning_learning_proposals
-- ---------------------------------------------------------------------------
create table if not exists planning_learning_proposals (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  plan_id uuid not null references planning_plans(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'pending_review',
  version integer not null default 1,
  scope text not null default 'project',
  source text not null default 'planning',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint planning_learning_proposals_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists planning_learning_proposals_plan_idx on planning_learning_proposals (plan_id);
create index if not exists planning_learning_proposals_status_idx on planning_learning_proposals (status);

alter table planning_learning_proposals enable row level security;
drop policy if exists planning_learning_proposals_service_all on planning_learning_proposals;
create policy planning_learning_proposals_service_all on planning_learning_proposals
  for all to service_role using (true) with check (true);
grant all on table planning_learning_proposals to service_role;

-- ---------------------------------------------------------------------------
-- planning_audit_events
-- ---------------------------------------------------------------------------
create table if not exists planning_audit_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  plan_id uuid references planning_plans(id) on delete restrict,
  action text not null,
  actor text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists planning_audit_events_action_idx on planning_audit_events (action);
create index if not exists planning_audit_events_plan_idx on planning_audit_events (plan_id);
create index if not exists planning_audit_events_created_at_idx on planning_audit_events (created_at);

alter table planning_audit_events enable row level security;
drop policy if exists planning_audit_events_service_all on planning_audit_events;
create policy planning_audit_events_service_all on planning_audit_events
  for all to service_role using (true) with check (true);
grant all on table planning_audit_events to service_role;
