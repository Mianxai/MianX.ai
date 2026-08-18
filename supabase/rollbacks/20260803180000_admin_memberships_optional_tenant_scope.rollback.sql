-- Rollback for 20260803180000_admin_memberships_optional_tenant_scope.sql
-- Safe only if the forward migration was applied and no durable rows depend on the columns.
-- After real scoped membership rows exist, prefer forward-fix over rollback.

drop index if exists public.admin_memberships_active_org_idx;
drop index if exists public.admin_memberships_project_id_idx;
drop index if exists public.admin_memberships_organization_id_idx;

alter table public.admin_memberships
  drop constraint if exists admin_memberships_project_requires_org;

alter table public.admin_memberships
  drop column if exists project_id;

alter table public.admin_memberships
  drop column if exists organization_id;
