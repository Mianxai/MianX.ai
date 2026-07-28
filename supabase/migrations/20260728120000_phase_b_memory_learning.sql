-- Additive Phase B memory + learning tables.
-- DO NOT apply without Founder approval.
-- Idempotent: create if not exists; RLS + service_role grants.

-- ---------------------------------------------------------------------------
-- memory_entries — scoped verified / candidate enterprise memory
-- ---------------------------------------------------------------------------
create table if not exists memory_entries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  scope_type text not null,
  scope_id text,
  memory_type text not null,
  content text not null,
  structured jsonb not null default '{}'::jsonb,
  source_references jsonb not null default '[]'::jsonb,
  evidence jsonb not null default '[]'::jsonb,
  confidence numeric(4,3) not null default 0.500
    check (confidence >= 0 and confidence <= 1),
  created_by text not null,
  verified_by text,
  verification_status text not null default 'candidate',
  sensitivity text not null default 'normal',
  retention_policy text not null default 'standard',
  version integer not null default 1,
  superseded_by uuid references memory_entries(id) on delete set null,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint memory_entries_scope_type_check
    check (scope_type in (
      'organization', 'project', 'department', 'workflow',
      'agent_instance', 'task', 'run'
    )),
  constraint memory_entries_type_check
    check (memory_type in (
      'fact', 'decision', 'constraint', 'preference', 'procedure',
      'lesson', 'failure_pattern', 'success_pattern',
      'artifact_reference', 'open_question'
    )),
  constraint memory_entries_verification_check
    check (verification_status in (
      'candidate', 'validated', 'active', 'superseded', 'rejected', 'expired'
    )),
  constraint memory_entries_sensitivity_check
    check (sensitivity in ('normal', 'sensitive', 'restricted')),
  constraint memory_entries_project_scope_check
    check (
      (scope_type = 'organization' and project_id is null)
      or (scope_type <> 'organization')
    )
);

create index if not exists memory_entries_org_idx on memory_entries (organization_id);
create index if not exists memory_entries_project_idx on memory_entries (project_id);
create index if not exists memory_entries_scope_idx on memory_entries (scope_type, scope_id);
create index if not exists memory_entries_status_idx on memory_entries (verification_status);
create index if not exists memory_entries_type_idx on memory_entries (memory_type);

alter table memory_entries enable row level security;

-- Deny-by-default for anon/authenticated; service_role bypasses RLS.
drop policy if exists memory_entries_service_all on memory_entries;
create policy memory_entries_service_all on memory_entries
  for all
  to service_role
  using (true)
  with check (true);

grant all on table memory_entries to service_role;

-- ---------------------------------------------------------------------------
-- learning_candidates — verified improvement proposals (never auto-prompt rewrite)
-- ---------------------------------------------------------------------------
create table if not exists learning_candidates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  source_run_id uuid,
  source_task_id uuid,
  source_workflow text,
  agent_slug text,
  department text,
  problem text not null,
  observed_evidence jsonb not null default '[]'::jsonb,
  proposed_lesson text not null,
  proposed_change text,
  scope_type text not null default 'project',
  confidence numeric(4,3) not null default 0.500
    check (confidence >= 0 and confidence <= 1),
  risk_class text not null default 'R2',
  validation_requirements jsonb not null default '[]'::jsonb,
  status text not null default 'proposed',
  reviewed_by text,
  review_note text,
  promoted_memory_id uuid references memory_entries(id) on delete set null,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint learning_candidates_scope_check
    check (scope_type in ('organization', 'project', 'department', 'agent', 'workflow')),
  constraint learning_candidates_status_check
    check (status in (
      'proposed', 'under_review', 'validated', 'rejected', 'promoted', 'superseded'
    )),
  constraint learning_candidates_risk_check
    check (risk_class in ('R1', 'R2', 'R3', 'R4'))
);

create index if not exists learning_candidates_org_idx on learning_candidates (organization_id);
create index if not exists learning_candidates_project_idx on learning_candidates (project_id);
create index if not exists learning_candidates_status_idx on learning_candidates (status);
create index if not exists learning_candidates_agent_idx on learning_candidates (agent_slug);

alter table learning_candidates enable row level security;

drop policy if exists learning_candidates_service_all on learning_candidates;
create policy learning_candidates_service_all on learning_candidates
  for all
  to service_role
  using (true)
  with check (true);

grant all on table learning_candidates to service_role;

-- ---------------------------------------------------------------------------
-- Expand agent_instances lifecycle (additive; keeps existing values)
-- ---------------------------------------------------------------------------
alter table agent_instances drop constraint if exists agent_instances_status_check;
alter table agent_instances
  add constraint agent_instances_status_check
  check (status in (
    'provisioning', 'ready', 'active', 'idle', 'paused',
    'blocked', 'failed', 'retired'
  ));

comment on table memory_entries is
  'Phase B scoped enterprise memory. Candidates require validation before active use.';
comment on table learning_candidates is
  'Phase B learning proposals. Never auto-modify prompts, capabilities, or production.';
