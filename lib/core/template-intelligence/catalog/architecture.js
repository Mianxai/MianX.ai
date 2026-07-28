import { makeTemplateBase } from "../schemas";

export const ARCHITECTURE_TEMPLATES = [
  arch("modular-monolith", "Modular monolith", {
    suitable: ["early_mvp", "small_team", "shared_db_ok"],
    unsuitable: ["hard_team_isolation", "polyglot_extreme"],
    trade_offs: ["simpler_ops", "careful_module_boundaries"],
    security_implications: ["shared_runtime_blast_radius"],
    data_implications: ["single_primary_store_common"],
    operational_implications: ["one_deploy_unit"],
    scalability_assumptions: ["vertical_then_horizontal_app"],
    observability_needs: ["structured_logs", "request_ids"],
    recommended_modules: ["identity-access", "audit", "settings"],
    risk_factors: ["module_coupling"],
  }),
  arch("multi-tenant", "Multi-tenant", {
    suitable: ["saas", "shared_platform"],
    unsuitable: ["strict_single_tenant_contracts"],
    trade_offs: ["efficiency", "isolation_complexity"],
    security_implications: ["tenant_isolation_mandatory"],
    data_implications: ["tenant_keys_on_rows"],
    operational_implications: ["noisy_neighbor_controls"],
    scalability_assumptions: ["shared_infra_with_quotas"],
    observability_needs: ["tenant_tagged_metrics"],
    recommended_modules: ["organisation-management", "identity-access", "audit"],
    risk_factors: ["cross_tenant_leakage"],
  }),
  arch("single-tenant", "Single-tenant", {
    suitable: ["enterprise_isolation", "regulated"],
    unsuitable: ["cost_sensitive_smb_saas"],
    trade_offs: ["stronger_isolation", "higher_ops_cost"],
    security_implications: ["per_tenant_boundary"],
    data_implications: ["separate_stores_or_schemas"],
    operational_implications: ["fleet_management"],
    scalability_assumptions: ["per_tenant_scale"],
    observability_needs: ["fleet_dashboards"],
    recommended_modules: ["identity-access", "audit"],
    risk_factors: ["ops_overhead"],
  }),
  arch("api-first", "API-first", {
    suitable: ["integrations_heavy", "partner_ecosystems"],
    unsuitable: ["pure_static_sites"],
    trade_offs: ["contract_discipline", "versioning_cost"],
    security_implications: ["auth_for_every_endpoint"],
    data_implications: ["stable_resource_models"],
    operational_implications: ["rate_limits", "idempotency"],
    scalability_assumptions: ["stateless_api_tier"],
    observability_needs: ["api_latency_error_budgets"],
    recommended_modules: ["integrations", "identity-access", "audit"],
    risk_factors: ["breaking_changes"],
  }),
  arch("event-driven", "Event-driven", {
    suitable: ["async_workflows", "fan_out"],
    unsuitable: ["strict_sync_ux_only"],
    trade_offs: ["decoupling", "eventual_consistency"],
    security_implications: ["event_authz", "poison_messages"],
    data_implications: ["event_schemas"],
    operational_implications: ["queue_ops", "replay"],
    scalability_assumptions: ["consumer_parallelism"],
    observability_needs: ["trace_across_events"],
    recommended_modules: ["workflow-management", "notifications", "audit"],
    risk_factors: ["lost_or_dup_events"],
  }),
  arch("analytics-heavy", "Analytics-heavy", {
    suitable: ["reporting_first", "instrumentation_culture"],
    unsuitable: ["privacy_extreme_with_no_analytics"],
    trade_offs: ["insight", "storage_and_privacy_cost"],
    security_implications: ["pii_minimisation_in_events"],
    data_implications: ["warehouse_or_agg_tables"],
    operational_implications: ["pipeline_reliability"],
    scalability_assumptions: ["batch_plus_near_realtime"],
    observability_needs: ["pipeline_lag"],
    recommended_modules: ["analytics", "reporting", "audit"],
    risk_factors: ["metric_drift"],
  }),
  arch("integration-heavy", "Integration-heavy", {
    suitable: ["many_external_systems"],
    unsuitable: ["offline_only"],
    trade_offs: ["reach", "dependency_risk"],
    security_implications: ["secrets", "egress_controls"],
    data_implications: ["mapping_layers"],
    operational_implications: ["vendor_outage_playbooks"],
    scalability_assumptions: ["queue_buffered_io"],
    observability_needs: ["vendor_error_budgets"],
    recommended_modules: ["integrations", "audit", "notifications"],
    risk_factors: ["vendor_lock_in"],
  }),
  arch("offline-capable", "Offline-capable", {
    suitable: ["field_ops", "unreliable_networks"],
    unsuitable: ["strong_consistency_required_everywhere"],
    trade_offs: ["availability", "sync_conflict_complexity"],
    security_implications: ["local_secret_handling"],
    data_implications: ["sync_queues", "conflict_policy"],
    operational_implications: ["client_version_skew"],
    scalability_assumptions: ["edge_plus_sync"],
    observability_needs: ["sync_failure_rates"],
    recommended_modules: ["files", "task-management"],
    risk_factors: ["data_divergence"],
  }),
  arch("service-oriented", "Service-oriented", {
    suitable: ["larger_teams", "independent_deploy"],
    unsuitable: ["tiny_mvp_team"],
    trade_offs: ["autonomy", "distributed_complexity"],
    security_implications: ["service_auth"],
    data_implications: ["service_owned_data"],
    operational_implications: ["multi_service_slo"],
    scalability_assumptions: ["per_service_scale"],
    observability_needs: ["distributed_tracing"],
    recommended_modules: ["integrations", "audit"],
    risk_factors: ["partial_failure"],
  }),
];

function arch(slug, name, payload) {
  const base = makeTemplateBase({
    id: `tpl_arch_${slug}_v1`,
    slug,
    name,
    description: `Architecture pattern: ${name}`,
    evidence_refs: [{ type: "catalog", ref: "phase-e-seed" }],
  });
  return { ...base, kind: "architecture", payload };
}

export function listArchitectureTemplates({ includeDeprecated = false } = {}) {
  return ARCHITECTURE_TEMPLATES.filter(
    (t) => includeDeprecated || !["deprecated", "archived"].includes(t.status)
  );
}

export function getArchitectureTemplate(slug, version = null) {
  const matches = ARCHITECTURE_TEMPLATES.filter((t) => t.slug === slug);
  if (!matches.length) return null;
  if (version != null) return matches.find((t) => t.version === version) || null;
  return matches.find((t) => t.status === "active") || matches[0];
}
