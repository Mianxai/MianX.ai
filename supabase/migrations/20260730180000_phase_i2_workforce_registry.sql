-- Phase I.2 — Durable workforce registry (additive only).
-- Do NOT apply to production from agents. Founder reviews via dry-run.

-- ---------------------------------------------------------------------------
-- agent_role_archetypes
-- ---------------------------------------------------------------------------
create table if not exists agent_role_archetypes (
  id text primary key,
  version integer not null default 1,
  title text not null,
  department text not null,
  hierarchy_level text not null,
  reports_to text,
  mission text not null default '',
  responsibilities jsonb not null default '[]'::jsonb,
  capabilities jsonb not null default '[]'::jsonb,
  required_knowledge_domains jsonb not null default '[]'::jsonb,
  input_schema jsonb not null default '{}'::jsonb,
  output_schema jsonb not null default '{}'::jsonb,
  evidence_schema jsonb not null default '[]'::jsonb,
  allowed_tools jsonb not null default '[]'::jsonb,
  prohibited_tools jsonb not null default '[]'::jsonb,
  protected_actions jsonb not null default '[]'::jsonb,
  provider_capabilities_required jsonb not null default '[]'::jsonb,
  memory_read_policy text not null default 'project',
  memory_write_policy text not null default 'propose_only',
  learning_policy text not null default 'propose_only',
  delegation_policy text not null default 'none',
  qa_reviewer_requirements jsonb not null default '[]'::jsonb,
  workload_limits jsonb not null default '{}'::jsonb,
  concurrency_limits jsonb not null default '{}'::jsonb,
  risk_class text not null default 'R1',
  escalation_rules jsonb not null default '[]'::jsonb,
  project_scoped boolean not null default true,
  source_document_references jsonb not null default '[]'::jsonb,
  contract_checksum text not null,
  lifecycle_status text not null default 'proposed',
  role_type text not null default 'specialist',
  expansion_category text,
  runtime_slug text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists agent_role_archetypes_department_idx
  on agent_role_archetypes (department);
create index if not exists agent_role_archetypes_lifecycle_idx
  on agent_role_archetypes (lifecycle_status);

-- ---------------------------------------------------------------------------
-- agent_capacity_seats (exactly 445 rows after bootstrap)
-- ---------------------------------------------------------------------------
create table if not exists agent_capacity_seats (
  seat_id text primary key,
  role_archetype_id text not null references agent_role_archetypes(id) on delete restrict,
  department text not null,
  hierarchy_level text not null,
  capacity_class text not null default 'primary',
  supported_project_types jsonb not null default '[]'::jsonb,
  allowed_concurrency integer not null default 1,
  allocation_priority integer not null default 50,
  reserve_or_primary text not null default 'primary'
    check (reserve_or_primary in ('primary', 'reserve')),
  readiness_status text not null default 'defined',
  activation_requirements jsonb not null default '[]'::jsonb,
  current_project_instance_id uuid,
  lifecycle_state text not null default 'defined',
  created_source_version text not null default 'phase-i2/1.0.0',
  expansion_category text,
  audit_metadata jsonb not null default '{}'::jsonb,
  organization_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists agent_capacity_seats_department_idx
  on agent_capacity_seats (department);
create index if not exists agent_capacity_seats_lifecycle_idx
  on agent_capacity_seats (lifecycle_state);
create index if not exists agent_capacity_seats_archetype_idx
  on agent_capacity_seats (role_archetype_id);
create index if not exists agent_capacity_seats_org_idx
  on agent_capacity_seats (organization_id);

-- ---------------------------------------------------------------------------
-- project_agent_instances (durable workers)
-- ---------------------------------------------------------------------------
create table if not exists project_agent_instances (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid,
  project_id uuid not null,
  objective_id uuid,
  workflow_id text,
  task_id uuid,
  seat_id text not null references agent_capacity_seats(seat_id) on delete restrict,
  role_archetype_id text not null references agent_role_archetypes(id) on delete restrict,
  provider text not null default 'openrouter',
  model text,
  lease_owner text,
  lease_expires_at timestamptz,
  heartbeat_at timestamptz,
  attempt_count integer not null default 0,
  token_limit integer,
  context_limit integer,
  tool_budget integer not null default 12,
  last_activity_at timestamptz,
  status text not null default 'requested',
  state_reason text,
  output_ref text,
  evidence_ref text,
  review_ref text,
  audit_ref text,
  idempotency_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint project_agent_instances_project_idempotency
    unique (project_id, idempotency_key)
);

create index if not exists project_agent_instances_project_status_idx
  on project_agent_instances (project_id, status);
create index if not exists project_agent_instances_seat_idx
  on project_agent_instances (seat_id);
create index if not exists project_agent_instances_lease_idx
  on project_agent_instances (lease_expires_at);

-- ---------------------------------------------------------------------------
-- agent_instance_leases
-- ---------------------------------------------------------------------------
create table if not exists agent_instance_leases (
  id uuid primary key default gen_random_uuid(),
  instance_id uuid not null references project_agent_instances(id) on delete cascade,
  project_id uuid not null,
  worker_id text not null,
  leased_at timestamptz not null default now(),
  expires_at timestamptz not null,
  heartbeat_at timestamptz,
  released_at timestamptz,
  status text not null default 'active'
    check (status in ('active', 'expired', 'released'))
);

create index if not exists agent_instance_leases_instance_idx
  on agent_instance_leases (instance_id);
create index if not exists agent_instance_leases_expires_idx
  on agent_instance_leases (expires_at);

-- ---------------------------------------------------------------------------
-- agent_runtime_sessions / tool_calls / delegations / outputs / evidence / reviews
-- ---------------------------------------------------------------------------
create table if not exists agent_runtime_sessions (
  id uuid primary key default gen_random_uuid(),
  instance_id uuid not null references project_agent_instances(id) on delete cascade,
  project_id uuid not null,
  organization_id uuid,
  correlation_id text,
  trace_id text,
  status text not null default 'open',
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists agent_tool_calls (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references agent_runtime_sessions(id) on delete set null,
  instance_id uuid references project_agent_instances(id) on delete set null,
  project_id uuid not null,
  tool_name text not null,
  args jsonb not null default '{}'::jsonb,
  result jsonb,
  status text not null default 'requested',
  risk text,
  protected_escalation jsonb,
  idempotency_key text,
  created_at timestamptz not null default now(),
  constraint agent_tool_calls_idempotency unique (project_id, idempotency_key)
);

create index if not exists agent_tool_calls_project_idx on agent_tool_calls (project_id);

create table if not exists agent_delegations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  parent_instance_id uuid,
  child_instance_id uuid,
  parent_seat_id text,
  child_seat_id text,
  parent_agent_slug text,
  child_agent_slug text not null,
  title text not null,
  acceptance_criteria text,
  evidence_requirements jsonb not null default '[]'::jsonb,
  depth integer not null default 1,
  status text not null default 'created',
  created_at timestamptz not null default now()
);

create index if not exists agent_delegations_project_idx on agent_delegations (project_id);

create table if not exists agent_outputs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  instance_id uuid,
  seat_id text,
  output jsonb not null,
  schema_valid boolean not null default false,
  documents_used jsonb not null default '[]'::jsonb,
  idempotency_key text,
  created_at timestamptz not null default now(),
  constraint agent_outputs_idempotency unique (project_id, idempotency_key)
);

create table if not exists agent_evidence (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  instance_id uuid,
  output_id uuid references agent_outputs(id) on delete set null,
  evidence jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists agent_reviews (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null,
  output_id uuid references agent_outputs(id) on delete set null,
  producer_instance_id uuid,
  reviewer_slug text not null,
  result text not null,
  findings jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  constraint agent_reviews_no_self check (true)
);

create index if not exists agent_reviews_project_idx on agent_reviews (project_id);

-- ---------------------------------------------------------------------------
-- provider_invocations / provider_usage
-- ---------------------------------------------------------------------------
create table if not exists provider_invocations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid,
  organization_id uuid,
  instance_id uuid,
  provider text not null,
  model text,
  request_id text,
  correlation_id text,
  trace_id text,
  status text not null,
  latency_ms integer,
  error_code text,
  created_at timestamptz not null default now()
);

create table if not exists provider_usage (
  id uuid primary key default gen_random_uuid(),
  invocation_id uuid references provider_invocations(id) on delete set null,
  project_id uuid,
  organization_id uuid,
  provider text not null,
  model text,
  input_tokens integer,
  output_tokens integer,
  estimated_cost numeric,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- workforce_readiness_snapshots
-- ---------------------------------------------------------------------------
create table if not exists workforce_readiness_snapshots (
  id uuid primary key default gen_random_uuid(),
  snapshot jsonb not null,
  capacity_seats integer not null,
  mapped_seats integer not null,
  ready_to_activate integer not null default 0,
  live_tested integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- durable rate limits (Postgres-backed; no external Redis required)
-- ---------------------------------------------------------------------------
create table if not exists rate_limit_buckets (
  bucket_key text primary key,
  organization_id uuid,
  project_id uuid,
  agent_slug text,
  model text,
  window_start timestamptz not null,
  window_ms integer not null,
  count integer not null default 0,
  token_count integer not null default 0,
  limit_count integer not null,
  limit_tokens integer,
  updated_at timestamptz not null default now()
);

create index if not exists rate_limit_buckets_org_idx on rate_limit_buckets (organization_id);
create index if not exists rate_limit_buckets_project_idx on rate_limit_buckets (project_id);

-- ---------------------------------------------------------------------------
-- knowledge index durability
-- ---------------------------------------------------------------------------
create table if not exists knowledge_documents (
  id uuid primary key default gen_random_uuid(),
  document_path text not null,
  document_hash text not null,
  document_version text not null default '1',
  organization_id uuid,
  project_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  indexed_at timestamptz not null default now(),
  superseded boolean not null default false,
  constraint knowledge_documents_path_hash unique (document_path, document_hash)
);

create table if not exists knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references knowledge_documents(id) on delete cascade,
  chunk_index integer not null,
  content text not null,
  lexical_tokens text,
  embedding_json jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists knowledge_chunks_document_idx on knowledge_chunks (document_id);

-- service_role grants (local + hosted)
grant all on table agent_role_archetypes to service_role;
grant all on table agent_capacity_seats to service_role;
grant all on table project_agent_instances to service_role;
grant all on table agent_instance_leases to service_role;
grant all on table agent_runtime_sessions to service_role;
grant all on table agent_tool_calls to service_role;
grant all on table agent_delegations to service_role;
grant all on table agent_outputs to service_role;
grant all on table agent_evidence to service_role;
grant all on table agent_reviews to service_role;
grant all on table provider_invocations to service_role;
grant all on table provider_usage to service_role;
grant all on table workforce_readiness_snapshots to service_role;
grant all on table rate_limit_buckets to service_role;
grant all on table knowledge_documents to service_role;
grant all on table knowledge_chunks to service_role;
