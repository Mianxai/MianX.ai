-- Focused Phase II.3 one-time Founder live-run authorization table.
-- DO NOT apply without Founder approval. Included in Draft PR only.
-- migrationApplied: no (until Founder dry-run + push review)
-- ProductionDatabaseChanged: no
--
-- Storage decision: B — dedicated durable authorization table required.
-- RLS: service_role only. Anon/authenticated have no policies → denied under RLS.
-- Rollback: supabase/rollbacks/20260803120000_pilot_live_run_authorizations.rollback.sql
-- FK on pilot_run_id uses ON DELETE SET NULL (does not cascade-delete auth/evidence).

create table if not exists public.pilot_live_run_authorizations (
  id uuid primary key default gen_random_uuid(),
  authorization_version integer not null default 1
    check (authorization_version >= 1 and authorization_version <= 1000),
  project_id uuid not null,
  pilot_run_id uuid references public.pilot_runs(id) on delete set null,
  agent_id text not null default 'mianx-internal-architecture-reviewer'
    check (char_length(agent_id) between 1 and 120),
  task_envelope_hash text not null
    check (char_length(task_envelope_hash) = 64),
  provider_name text not null default 'openai'
    check (char_length(provider_name) between 1 and 64),
  approved_model text not null
    check (char_length(approved_model) between 1 and 120),
  approved_snapshot text
    check (approved_snapshot is null or char_length(approved_snapshot) between 1 and 120),
  maximum_input_tokens integer not null check (maximum_input_tokens >= 0),
  maximum_output_tokens integer not null check (maximum_output_tokens >= 0),
  maximum_total_tokens integer not null check (maximum_total_tokens >= 0),
  maximum_cost_microusd bigint not null check (maximum_cost_microusd >= 0),
  authorized_at timestamptz,
  expires_at timestamptz not null,
  authorized_by text
    check (authorized_by is null or char_length(authorized_by) <= 200),
  authorization_reason text
    check (authorization_reason is null or char_length(authorization_reason) <= 500),
  status text not null default 'draft'
    check (status in ('draft', 'authorized', 'consumed', 'expired', 'revoked')),
  consumed_at timestamptz,
  revoked_at timestamptz,
  revocation_reason text
    check (revocation_reason is null or char_length(revocation_reason) <= 500),
  one_time_use boolean not null default true,
  issuance_idempotency_key text
    check (
      issuance_idempotency_key is null
      or char_length(issuance_idempotency_key) between 1 and 200
    ),
  integrity_checksum text not null
    check (char_length(integrity_checksum) = 64),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pilot_lra_issuance_idempotency_unique unique (issuance_idempotency_key),
  constraint pilot_lra_expires_after_authorized check (
    authorized_at is null or expires_at >= authorized_at
  ),
  constraint pilot_lra_consumed_requires_timestamp check (
    status <> 'consumed' or consumed_at is not null
  ),
  constraint pilot_lra_revoked_requires_timestamp check (
    status <> 'revoked' or revoked_at is not null
  )
);

-- At most one outstanding authorized row per project+agent+task envelope.
create unique index if not exists pilot_lra_one_outstanding_authorized
  on public.pilot_live_run_authorizations (project_id, agent_id, task_envelope_hash)
  where status = 'authorized';

create index if not exists pilot_lra_project_idx
  on public.pilot_live_run_authorizations (project_id);
create index if not exists pilot_lra_status_idx
  on public.pilot_live_run_authorizations (status);
create index if not exists pilot_lra_expires_idx
  on public.pilot_live_run_authorizations (expires_at);

alter table public.pilot_live_run_authorizations enable row level security;

drop policy if exists pilot_lra_service_all on public.pilot_live_run_authorizations;
create policy pilot_lra_service_all on public.pilot_live_run_authorizations
  for all to service_role
  using (true)
  with check (true);

-- Explicit: no grants to anon/authenticated. Browser cannot write authorization state.
revoke all on table public.pilot_live_run_authorizations from public;
revoke all on table public.pilot_live_run_authorizations from anon;
revoke all on table public.pilot_live_run_authorizations from authenticated;
grant all on table public.pilot_live_run_authorizations to service_role;

-- Atomic one-time consume (single guarded UPDATE). Not distributed exactly-once
-- provider execution — at-most-one authorized provider-attempt boundary only.
-- Does not rewrite integrity_checksum (caller may recompute after success).
create or replace function public.consume_pilot_live_run_authorization(
  p_id uuid,
  p_project_id uuid,
  p_agent_id text,
  p_task_envelope_hash text,
  p_provider_name text,
  p_approved_model text,
  p_approved_snapshot text,
  p_integrity_checksum text
)
returns setof public.pilot_live_run_authorizations
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  update public.pilot_live_run_authorizations as a
  set
    status = 'consumed',
    consumed_at = now(),
    updated_at = now()
  where a.id = p_id
    and a.status = 'authorized'
    and a.consumed_at is null
    and a.expires_at > now()
    and a.project_id = p_project_id
    and a.agent_id = p_agent_id
    and a.task_envelope_hash = p_task_envelope_hash
    and a.provider_name = p_provider_name
    and a.approved_model = p_approved_model
    and (
      p_approved_snapshot is null
      or a.approved_snapshot is not distinct from p_approved_snapshot
    )
    and a.integrity_checksum = p_integrity_checksum
    and a.one_time_use = true
  returning a.*;
end;
$$;

revoke all on function public.consume_pilot_live_run_authorization(
  uuid, uuid, text, text, text, text, text, text
) from public;
revoke all on function public.consume_pilot_live_run_authorization(
  uuid, uuid, text, text, text, text, text, text
) from anon;
revoke all on function public.consume_pilot_live_run_authorization(
  uuid, uuid, text, text, text, text, text, text
) from authenticated;
grant execute on function public.consume_pilot_live_run_authorization(
  uuid, uuid, text, text, text, text, text, text
) to service_role;

comment on table public.pilot_live_run_authorizations is
  'One-time Founder live-run authorization. Consume via consume_pilot_live_run_authorization. Never auto-created from Final Review or queue alone.';

comment on function public.consume_pilot_live_run_authorization(
  uuid, uuid, text, text, text, text, text, text
) is
  'Atomic one-time authorization consumption. Duplicate callers get zero rows returned (already-consumed or conflict).';
