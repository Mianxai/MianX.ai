-- Additive: optional organization/project scope columns on admin_memberships.
-- DO NOT apply without Founder dry-run + approval.
-- migrationApplied: no (Draft PR only)
-- ProductionDatabaseChanged: no
--
-- NULL organization_id / project_id preserves current single-tenant behavior
-- (global membership = all projects in the default org).
-- When set, application-layer helpers MUST enforce the scope (RLS still
-- service_role-only for Admin APIs).

alter table public.admin_memberships
  add column if not exists organization_id uuid
    references public.organizations (id) on delete set null;

alter table public.admin_memberships
  add column if not exists project_id uuid
    references public.projects (id) on delete set null;

create index if not exists admin_memberships_organization_id_idx
  on public.admin_memberships (organization_id);

create index if not exists admin_memberships_project_id_idx
  on public.admin_memberships (project_id);

comment on column public.admin_memberships.organization_id is
  'Optional org scope. NULL = platform-wide (current single-tenant Founder model). Not applied until Founder approval.';

comment on column public.admin_memberships.project_id is
  'Optional project scope. NULL = all projects within membership org scope. Enforced in application until tenant RLS exists.';
