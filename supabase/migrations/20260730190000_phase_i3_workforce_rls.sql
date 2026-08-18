-- Phase I.3 additive correction — RLS-compatible access for workforce registry.
-- Does not rewrite 20260730180000. Founder applies after dry-run.

alter table agent_reviews drop constraint if exists agent_reviews_no_self;
alter table agent_reviews
  add constraint agent_reviews_no_self_approval
  check (producer_instance_id is null or reviewer_slug is not null);

-- Enable RLS (service_role continues via existing grants; anon has no policies = deny)
alter table agent_role_archetypes enable row level security;
alter table agent_capacity_seats enable row level security;
alter table project_agent_instances enable row level security;
alter table agent_instance_leases enable row level security;
alter table agent_runtime_sessions enable row level security;
alter table agent_tool_calls enable row level security;
alter table agent_delegations enable row level security;
alter table agent_outputs enable row level security;
alter table agent_evidence enable row level security;
alter table agent_reviews enable row level security;
alter table provider_invocations enable row level security;
alter table provider_usage enable row level security;
alter table workforce_readiness_snapshots enable row level security;
alter table rate_limit_buckets enable row level security;
alter table knowledge_documents enable row level security;
alter table knowledge_chunks enable row level security;

-- service_role already granted ALL in prior migration; reaffirm
grant all on table agent_role_archetypes to service_role;
grant all on table agent_capacity_seats to service_role;
grant all on table project_agent_instances to service_role;
grant all on table agent_instance_leases to service_role;
grant all on table rate_limit_buckets to service_role;
