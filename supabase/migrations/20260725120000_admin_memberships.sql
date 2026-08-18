-- Admin authorization foundation (additive, idempotent).
--
-- Explicit admin memberships distinguish authentication (Supabase Auth session)
-- from authorization (allowed to operate the Admin Control Center).
--
-- Rollout (do NOT auto-seed personal emails):
--   1. Apply this migration in the target environment.
--   2. Insert the Founder membership manually, e.g.:
--        insert into admin_memberships (user_id, email, role, status)
--        values ('<supabase-auth-user-uuid>', '<founder-email>', 'owner', 'active');
--   3. Until at least one active membership exists, the application keeps the
--      pre-migration compatibility path (any authenticated session user) so a
--      code deploy before bootstrap cannot lock the Founder out.
--   4. Once one or more active memberships exist, only those members may call
--      protected admin APIs (fail-closed).
--
-- RLS: enabled with no policies — browser anon key gets zero access. Backend
-- uses the service_role client (bypasses RLS), matching existing core tables.

create table if not exists admin_memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  email text not null,
  role text not null default 'admin',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  revoked_at timestamptz,
  created_by text,
  notes text,
  constraint admin_memberships_role_check
    check (role in ('owner', 'admin', 'operator')),
  constraint admin_memberships_status_check
    check (status in ('active', 'revoked'))
);

create index if not exists admin_memberships_email_idx
  on admin_memberships (lower(email));
create index if not exists admin_memberships_status_idx
  on admin_memberships (status);

drop trigger if exists admin_memberships_set_updated_at on admin_memberships;
create trigger admin_memberships_set_updated_at
  before update on admin_memberships
  for each row execute function mianx_set_updated_at();

alter table admin_memberships enable row level security;

-- Optional soft-notes column for lead ops (additive; never required by UI).
alter table leads add column if not exists internal_notes text;

comment on table admin_memberships is
  'Explicit Admin Control Center membership. Empty table = compatibility mode; any active row enables fail-closed membership checks.';
