-- Minimal bootstrap for ephemeral membership-scope migration validation.
-- Disposable DB only. No Production credentials.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then
    create role anon nologin;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'service_role') then
    create role service_role nologin bypassrls;
  end if;
end $$;

grant usage on schema public to anon, authenticated, service_role;
grant all on schema public to service_role;

create or replace function public.mianx_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete restrict,
  name text not null,
  slug text not null,
  status text not null default 'active',
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  unique (organization_id, slug)
);

create table if not exists public.admin_memberships (
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
    check (role in ('owner', 'admin', 'operator', 'viewer')),
  constraint admin_memberships_status_check
    check (status in ('active', 'revoked'))
);

alter table public.admin_memberships enable row level security;
alter table public.organizations enable row level security;
alter table public.projects enable row level security;

revoke all on table public.admin_memberships from public;
revoke all on table public.admin_memberships from anon;
revoke all on table public.admin_memberships from authenticated;
grant all on table public.admin_memberships to service_role;

revoke all on table public.organizations from anon, authenticated;
revoke all on table public.projects from anon, authenticated;
grant all on table public.organizations to service_role;
grant all on table public.projects to service_role;
