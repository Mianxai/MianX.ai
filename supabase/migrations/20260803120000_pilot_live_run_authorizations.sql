-- Focused Phase II.3 one-time Founder live-run authorization table.
-- DO NOT apply without Founder approval. Included in Draft PR only.
-- migrationApplied: no (until Founder dry-run + push review)
-- ProductionDatabaseChanged: no
--
-- Storage decision: B — existing pilot_approvals partially sufficient but
-- lacks one-time lifecycle columns / atomic consume. Dedicated table preferred
-- over stuffing JSON into pilot_approvals.payload.
--
-- RLS: service_role only (same posture as other pilot_* tables).
-- Rollback: see sibling *.rollback.sql

create table if not exists pilot_live_run_authorizations (
  id uuid primary key default gen_random_uuid(),
  authorization_version integer not null default 1,
  project_id uuid not null,
  pilot_run_id uuid references pilot_runs(id) on delete set null,
  agent_id text not null default 'mianx-internal-architecture-reviewer',
  task_envelope_hash text not null,
  provider_name text not null default 'openai',
  approved_model text not null,
  approved_snapshot text,
  maximum_input_tokens integer not null,
  maximum_output_tokens integer not null,
  maximum_total_tokens integer not null,
  maximum_cost_microusd bigint not null,
  authorized_at timestamptz,
  expires_at timestamptz not null,
  authorized_by text,
  authorization_reason text,
  status text not null default 'draft'
    check (status in ('draft', 'authorized', 'consumed', 'expired', 'revoked')),
  consumed_at timestamptz,
  revoked_at timestamptz,
  revocation_reason text,
  one_time_use boolean not null default true,
  issuance_idempotency_key text,
  integrity_checksum text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pilot_lra_issuance_idempotency_unique unique (issuance_idempotency_key)
);

-- At most one outstanding authorized row per project+agent+task envelope.
create unique index if not exists pilot_lra_one_outstanding_authorized
  on pilot_live_run_authorizations (project_id, agent_id, task_envelope_hash)
  where status = 'authorized';

create index if not exists pilot_lra_project_idx on pilot_live_run_authorizations (project_id);
create index if not exists pilot_lra_status_idx on pilot_live_run_authorizations (status);
create index if not exists pilot_lra_expires_idx on pilot_live_run_authorizations (expires_at);

alter table pilot_live_run_authorizations enable row level security;
drop policy if exists pilot_lra_service_all on pilot_live_run_authorizations;
create policy pilot_lra_service_all on pilot_live_run_authorizations
  for all to service_role using (true) with check (true);
grant all on table pilot_live_run_authorizations to service_role;

-- Atomic consume helper (application still uses WHERE status='authorized').
comment on table pilot_live_run_authorizations is
  'One-time Founder live-run authorization. Consume with UPDATE ... WHERE status=authorized RETURNING. Never auto-created from Final Review or queue alone.';
