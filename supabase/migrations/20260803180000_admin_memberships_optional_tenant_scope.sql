-- Additive: optional organization/project scope columns on admin_memberships.
-- DO NOT apply without Founder dry-run + approval.
-- migrationApplied: no (Draft / readiness only until Founder apply)
-- ProductionDatabaseChanged: no
--
-- Semantics (application MUST enforce — RLS remains service_role-bypass for Admin APIs):
--   • organization_id NULL = legacy single-tenant row → resolve to canonical default
--     org only. Does NOT authorize multi-organization global access.
--   • project_id NULL = all projects within the effective organization scope.
--   • project_id set requires organization_id set (check constraint).
--   • Explicit platform-wide / cross-org listing requires platform.admin (owner)
--     in application code — never inferred from NULL columns alone.
--   • Clients cannot self-assign these columns (no authenticated write policies).

alter table public.admin_memberships
  add column if not exists organization_id uuid
    references public.organizations (id) on delete set null;

alter table public.admin_memberships
  add column if not exists project_id uuid
    references public.projects (id) on delete set null;

-- project scope without org scope is invalid.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'admin_memberships_project_requires_org'
  ) then
    alter table public.admin_memberships
      add constraint admin_memberships_project_requires_org
      check (project_id is null or organization_id is not null);
  end if;
end $$;

create index if not exists admin_memberships_organization_id_idx
  on public.admin_memberships (organization_id);

create index if not exists admin_memberships_project_id_idx
  on public.admin_memberships (project_id);

-- Lookup helper for active memberships by org (partial).
create index if not exists admin_memberships_active_org_idx
  on public.admin_memberships (organization_id, user_id)
  where status = 'active' and revoked_at is null;

comment on column public.admin_memberships.organization_id is
  'Optional org scope. NULL = legacy default-org resolution only (not multi-org global). Enforced in application until tenant RLS exists.';

comment on column public.admin_memberships.project_id is
  'Optional project scope. NULL = all projects within effective org scope. Requires organization_id when set.';
