-- Additive: extend admin_memberships roles with viewer (read-only) and keep
-- existing owner/admin/operator values. Idempotent — drops and recreates the
-- CHECK constraint only when needed. Never drops the table or data.

do $$
begin
  -- Replace the role check to include 'viewer' while preserving existing roles.
  if exists (
    select 1 from information_schema.table_constraints
    where table_name = 'admin_memberships'
      and constraint_name = 'admin_memberships_role_check'
  ) then
    alter table admin_memberships drop constraint admin_memberships_role_check;
  end if;

  alter table admin_memberships
    add constraint admin_memberships_role_check
    check (role in ('owner', 'admin', 'operator', 'viewer'));
exception
  when duplicate_object then null;
end;
$$;

comment on table admin_memberships is
  'Explicit Admin Control Center membership. Roles: owner (full), admin (operate), operator (runtime ops), viewer (read-only). Empty table + MIANX_ADMIN_BOOTSTRAP=1 = temporary bootstrap; otherwise fail-closed once the table exists.';
