-- Additive Phase E template intelligence catalog tables.
-- DO NOT apply without Founder approval.
-- Idempotent: create if not exists; RLS + service_role grants.
-- Rollback: drop tables in reverse order (template_reviews,
-- template_evidence, template_versions, template_relations,
-- kpi_templates, risk_templates, architecture_templates,
-- compliance_templates, workflow_templates, module_templates,
-- department_templates, capability_templates, business_model_templates,
-- industry_templates) only if empty and Founder-approved —
-- never auto-rollback in CI.

-- ---------------------------------------------------------------------------
-- Shared catalog column pattern (tables 1–10):
--   id, organization_id, project_id, slug, name, description, status,
--   version, scope, source, confidence, evidence_refs, payload, owner,
--   audit_metadata, created_at, updated_at
-- Unique (slug, version) for platform-scoped rows via partial unique index.
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- industry_templates
-- ---------------------------------------------------------------------------
create table if not exists industry_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'platform',
  source text not null default 'catalog',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint industry_templates_status_check
    check (status in (
      'draft','under_review','approved','active','deprecated','archived'
    )),
  constraint industry_templates_scope_check
    check (scope in ('platform','organization','project')),
  constraint industry_templates_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create unique index if not exists industry_templates_platform_slug_version_uidx
  on industry_templates (slug, version) where scope = 'platform';
create index if not exists industry_templates_status_idx on industry_templates (status);
create index if not exists industry_templates_slug_idx on industry_templates (slug);
create index if not exists industry_templates_version_idx on industry_templates (version);
create index if not exists industry_templates_project_idx on industry_templates (project_id);
create index if not exists industry_templates_organization_idx on industry_templates (organization_id);

alter table industry_templates enable row level security;
drop policy if exists industry_templates_service_all on industry_templates;
create policy industry_templates_service_all on industry_templates
  for all to service_role using (true) with check (true);
grant all on table industry_templates to service_role;

-- ---------------------------------------------------------------------------
-- business_model_templates
-- ---------------------------------------------------------------------------
create table if not exists business_model_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'platform',
  source text not null default 'catalog',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint business_model_templates_status_check
    check (status in (
      'draft','under_review','approved','active','deprecated','archived'
    )),
  constraint business_model_templates_scope_check
    check (scope in ('platform','organization','project')),
  constraint business_model_templates_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create unique index if not exists business_model_templates_platform_slug_version_uidx
  on business_model_templates (slug, version) where scope = 'platform';
create index if not exists business_model_templates_status_idx on business_model_templates (status);
create index if not exists business_model_templates_slug_idx on business_model_templates (slug);
create index if not exists business_model_templates_version_idx on business_model_templates (version);
create index if not exists business_model_templates_project_idx on business_model_templates (project_id);
create index if not exists business_model_templates_organization_idx on business_model_templates (organization_id);

alter table business_model_templates enable row level security;
drop policy if exists business_model_templates_service_all on business_model_templates;
create policy business_model_templates_service_all on business_model_templates
  for all to service_role using (true) with check (true);
grant all on table business_model_templates to service_role;

-- ---------------------------------------------------------------------------
-- capability_templates
-- ---------------------------------------------------------------------------
create table if not exists capability_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'platform',
  source text not null default 'catalog',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint capability_templates_status_check
    check (status in (
      'draft','under_review','approved','active','deprecated','archived'
    )),
  constraint capability_templates_scope_check
    check (scope in ('platform','organization','project')),
  constraint capability_templates_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create unique index if not exists capability_templates_platform_slug_version_uidx
  on capability_templates (slug, version) where scope = 'platform';
create index if not exists capability_templates_status_idx on capability_templates (status);
create index if not exists capability_templates_slug_idx on capability_templates (slug);
create index if not exists capability_templates_version_idx on capability_templates (version);
create index if not exists capability_templates_project_idx on capability_templates (project_id);
create index if not exists capability_templates_organization_idx on capability_templates (organization_id);

alter table capability_templates enable row level security;
drop policy if exists capability_templates_service_all on capability_templates;
create policy capability_templates_service_all on capability_templates
  for all to service_role using (true) with check (true);
grant all on table capability_templates to service_role;

-- ---------------------------------------------------------------------------
-- department_templates
-- ---------------------------------------------------------------------------
create table if not exists department_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'platform',
  source text not null default 'catalog',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint department_templates_status_check
    check (status in (
      'draft','under_review','approved','active','deprecated','archived'
    )),
  constraint department_templates_scope_check
    check (scope in ('platform','organization','project')),
  constraint department_templates_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create unique index if not exists department_templates_platform_slug_version_uidx
  on department_templates (slug, version) where scope = 'platform';
create index if not exists department_templates_status_idx on department_templates (status);
create index if not exists department_templates_slug_idx on department_templates (slug);
create index if not exists department_templates_version_idx on department_templates (version);
create index if not exists department_templates_project_idx on department_templates (project_id);
create index if not exists department_templates_organization_idx on department_templates (organization_id);

alter table department_templates enable row level security;
drop policy if exists department_templates_service_all on department_templates;
create policy department_templates_service_all on department_templates
  for all to service_role using (true) with check (true);
grant all on table department_templates to service_role;

-- ---------------------------------------------------------------------------
-- module_templates
-- ---------------------------------------------------------------------------
create table if not exists module_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'platform',
  source text not null default 'catalog',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint module_templates_status_check
    check (status in (
      'draft','under_review','approved','active','deprecated','archived'
    )),
  constraint module_templates_scope_check
    check (scope in ('platform','organization','project')),
  constraint module_templates_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create unique index if not exists module_templates_platform_slug_version_uidx
  on module_templates (slug, version) where scope = 'platform';
create index if not exists module_templates_status_idx on module_templates (status);
create index if not exists module_templates_slug_idx on module_templates (slug);
create index if not exists module_templates_version_idx on module_templates (version);
create index if not exists module_templates_project_idx on module_templates (project_id);
create index if not exists module_templates_organization_idx on module_templates (organization_id);

alter table module_templates enable row level security;
drop policy if exists module_templates_service_all on module_templates;
create policy module_templates_service_all on module_templates
  for all to service_role using (true) with check (true);
grant all on table module_templates to service_role;

-- ---------------------------------------------------------------------------
-- workflow_templates
-- ---------------------------------------------------------------------------
create table if not exists workflow_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'platform',
  source text not null default 'catalog',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint workflow_templates_status_check
    check (status in (
      'draft','under_review','approved','active','deprecated','archived'
    )),
  constraint workflow_templates_scope_check
    check (scope in ('platform','organization','project')),
  constraint workflow_templates_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create unique index if not exists workflow_templates_platform_slug_version_uidx
  on workflow_templates (slug, version) where scope = 'platform';
create index if not exists workflow_templates_status_idx on workflow_templates (status);
create index if not exists workflow_templates_slug_idx on workflow_templates (slug);
create index if not exists workflow_templates_version_idx on workflow_templates (version);
create index if not exists workflow_templates_project_idx on workflow_templates (project_id);
create index if not exists workflow_templates_organization_idx on workflow_templates (organization_id);

alter table workflow_templates enable row level security;
drop policy if exists workflow_templates_service_all on workflow_templates;
create policy workflow_templates_service_all on workflow_templates
  for all to service_role using (true) with check (true);
grant all on table workflow_templates to service_role;

-- ---------------------------------------------------------------------------
-- compliance_templates
-- ---------------------------------------------------------------------------
create table if not exists compliance_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'platform',
  source text not null default 'catalog',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint compliance_templates_status_check
    check (status in (
      'draft','under_review','approved','active','deprecated','archived'
    )),
  constraint compliance_templates_scope_check
    check (scope in ('platform','organization','project')),
  constraint compliance_templates_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create unique index if not exists compliance_templates_platform_slug_version_uidx
  on compliance_templates (slug, version) where scope = 'platform';
create index if not exists compliance_templates_status_idx on compliance_templates (status);
create index if not exists compliance_templates_slug_idx on compliance_templates (slug);
create index if not exists compliance_templates_version_idx on compliance_templates (version);
create index if not exists compliance_templates_project_idx on compliance_templates (project_id);
create index if not exists compliance_templates_organization_idx on compliance_templates (organization_id);

alter table compliance_templates enable row level security;
drop policy if exists compliance_templates_service_all on compliance_templates;
create policy compliance_templates_service_all on compliance_templates
  for all to service_role using (true) with check (true);
grant all on table compliance_templates to service_role;

-- ---------------------------------------------------------------------------
-- architecture_templates
-- ---------------------------------------------------------------------------
create table if not exists architecture_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'platform',
  source text not null default 'catalog',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint architecture_templates_status_check
    check (status in (
      'draft','under_review','approved','active','deprecated','archived'
    )),
  constraint architecture_templates_scope_check
    check (scope in ('platform','organization','project')),
  constraint architecture_templates_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create unique index if not exists architecture_templates_platform_slug_version_uidx
  on architecture_templates (slug, version) where scope = 'platform';
create index if not exists architecture_templates_status_idx on architecture_templates (status);
create index if not exists architecture_templates_slug_idx on architecture_templates (slug);
create index if not exists architecture_templates_version_idx on architecture_templates (version);
create index if not exists architecture_templates_project_idx on architecture_templates (project_id);
create index if not exists architecture_templates_organization_idx on architecture_templates (organization_id);

alter table architecture_templates enable row level security;
drop policy if exists architecture_templates_service_all on architecture_templates;
create policy architecture_templates_service_all on architecture_templates
  for all to service_role using (true) with check (true);
grant all on table architecture_templates to service_role;

-- ---------------------------------------------------------------------------
-- risk_templates
-- ---------------------------------------------------------------------------
create table if not exists risk_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'platform',
  source text not null default 'catalog',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint risk_templates_status_check
    check (status in (
      'draft','under_review','approved','active','deprecated','archived'
    )),
  constraint risk_templates_scope_check
    check (scope in ('platform','organization','project')),
  constraint risk_templates_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create unique index if not exists risk_templates_platform_slug_version_uidx
  on risk_templates (slug, version) where scope = 'platform';
create index if not exists risk_templates_status_idx on risk_templates (status);
create index if not exists risk_templates_slug_idx on risk_templates (slug);
create index if not exists risk_templates_version_idx on risk_templates (version);
create index if not exists risk_templates_project_idx on risk_templates (project_id);
create index if not exists risk_templates_organization_idx on risk_templates (organization_id);

alter table risk_templates enable row level security;
drop policy if exists risk_templates_service_all on risk_templates;
create policy risk_templates_service_all on risk_templates
  for all to service_role using (true) with check (true);
grant all on table risk_templates to service_role;

-- ---------------------------------------------------------------------------
-- kpi_templates
-- ---------------------------------------------------------------------------
create table if not exists kpi_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  slug text not null,
  name text not null,
  description text not null default '',
  status text not null default 'draft',
  version integer not null default 1,
  scope text not null default 'platform',
  source text not null default 'catalog',
  confidence numeric(4,3) not null default 0.500,
  evidence_refs jsonb not null default '[]'::jsonb,
  payload jsonb not null default '{}'::jsonb,
  owner text,
  audit_metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint kpi_templates_status_check
    check (status in (
      'draft','under_review','approved','active','deprecated','archived'
    )),
  constraint kpi_templates_scope_check
    check (scope in ('platform','organization','project')),
  constraint kpi_templates_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create unique index if not exists kpi_templates_platform_slug_version_uidx
  on kpi_templates (slug, version) where scope = 'platform';
create index if not exists kpi_templates_status_idx on kpi_templates (status);
create index if not exists kpi_templates_slug_idx on kpi_templates (slug);
create index if not exists kpi_templates_version_idx on kpi_templates (version);
create index if not exists kpi_templates_project_idx on kpi_templates (project_id);
create index if not exists kpi_templates_organization_idx on kpi_templates (organization_id);

alter table kpi_templates enable row level security;
drop policy if exists kpi_templates_service_all on kpi_templates;
create policy kpi_templates_service_all on kpi_templates
  for all to service_role using (true) with check (true);
grant all on table kpi_templates to service_role;

-- ---------------------------------------------------------------------------
-- template_relations
-- ---------------------------------------------------------------------------
create table if not exists template_relations (
  id uuid primary key default gen_random_uuid(),
  from_type text not null,
  from_id text not null,
  to_type text not null,
  to_id text not null,
  relation_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  organization_id uuid references organizations(id) on delete restrict,
  project_id uuid references projects(id) on delete restrict,
  created_at timestamptz not null default now(),
  audit_metadata jsonb not null default '{}'::jsonb
);

create index if not exists template_relations_from_idx
  on template_relations (from_type, from_id);
create index if not exists template_relations_to_idx
  on template_relations (to_type, to_id);
create index if not exists template_relations_type_idx
  on template_relations (relation_type);
create index if not exists template_relations_project_idx on template_relations (project_id);
create index if not exists template_relations_organization_idx on template_relations (organization_id);

alter table template_relations enable row level security;
drop policy if exists template_relations_service_all on template_relations;
create policy template_relations_service_all on template_relations
  for all to service_role using (true) with check (true);
grant all on table template_relations to service_role;

-- ---------------------------------------------------------------------------
-- template_versions (immutable history)
-- ---------------------------------------------------------------------------
create table if not exists template_versions (
  id uuid primary key default gen_random_uuid(),
  template_kind text not null,
  template_slug text not null,
  version integer not null,
  status text not null default 'draft',
  snapshot jsonb not null default '{}'::jsonb,
  previous_version integer,
  created_by text,
  created_at timestamptz not null default now(),
  audit_metadata jsonb not null default '{}'::jsonb,
  constraint template_versions_status_check
    check (status in (
      'draft','under_review','approved','active','deprecated','archived'
    ))
);

create unique index if not exists template_versions_kind_slug_version_uidx
  on template_versions (template_kind, template_slug, version);
create index if not exists template_versions_kind_idx on template_versions (template_kind);
create index if not exists template_versions_slug_idx on template_versions (template_slug);
create index if not exists template_versions_status_idx on template_versions (status);
create index if not exists template_versions_version_idx on template_versions (version);

alter table template_versions enable row level security;
drop policy if exists template_versions_service_all on template_versions;
create policy template_versions_service_all on template_versions
  for all to service_role using (true) with check (true);
grant all on table template_versions to service_role;

-- ---------------------------------------------------------------------------
-- template_evidence
-- ---------------------------------------------------------------------------
create table if not exists template_evidence (
  id uuid primary key default gen_random_uuid(),
  template_kind text not null,
  template_slug text not null,
  version integer not null,
  evidence_type text not null,
  content text not null default '',
  source_url text,
  confidence numeric(4,3) not null default 0.500,
  created_by text,
  created_at timestamptz not null default now(),
  constraint template_evidence_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index if not exists template_evidence_kind_slug_version_idx
  on template_evidence (template_kind, template_slug, version);
create index if not exists template_evidence_type_idx on template_evidence (evidence_type);
create index if not exists template_evidence_kind_idx on template_evidence (template_kind);

alter table template_evidence enable row level security;
drop policy if exists template_evidence_service_all on template_evidence;
create policy template_evidence_service_all on template_evidence
  for all to service_role using (true) with check (true);
grant all on table template_evidence to service_role;

-- ---------------------------------------------------------------------------
-- template_reviews
-- ---------------------------------------------------------------------------
create table if not exists template_reviews (
  id uuid primary key default gen_random_uuid(),
  template_kind text not null,
  template_slug text not null,
  version integer not null,
  review_status text not null default 'pending',
  reviewer text,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint template_reviews_status_check
    check (review_status in ('pending','approved','rejected','needs_changes'))
);

create index if not exists template_reviews_kind_slug_version_idx
  on template_reviews (template_kind, template_slug, version);
create index if not exists template_reviews_status_idx on template_reviews (review_status);
create index if not exists template_reviews_kind_idx on template_reviews (template_kind);

alter table template_reviews enable row level security;
drop policy if exists template_reviews_service_all on template_reviews;
create policy template_reviews_service_all on template_reviews
  for all to service_role using (true) with check (true);
grant all on table template_reviews to service_role;
