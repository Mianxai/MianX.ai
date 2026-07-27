-- Additive grant for local/hosted parity with leads + core tables.
-- admin_memberships was created with RLS and no anon policies; the service
-- role client used by requireAdminUser() needs an explicit grant on some
-- local Supabase stacks (same pattern as 20260721000000_create_leads.sql).
-- Idempotent and non-destructive.

grant all privileges on table admin_memberships to service_role;

comment on table admin_memberships is
  'Explicit Admin Control Center membership. Authorization is by user_id (UUID) only; email is display metadata. Empty active set + bootstrap off = fail-closed.';
