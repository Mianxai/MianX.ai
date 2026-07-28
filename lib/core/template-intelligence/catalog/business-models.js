import { makeTemplateBase } from "../schemas";

/** Structural business-model categories only — no forecasts. */
export const BUSINESS_MODEL_TEMPLATES = [
  bm("subscription", "Subscription", {
    revenue_drivers: ["recurring_seats_or_plans"],
    cost_drivers: ["support", "infrastructure", "churn_recovery"],
    customer_lifecycle: ["trial", "activate", "retain", "expand", "churn"],
    operational_requirements: ["billing_integration", "plan_entitlements", "usage_caps"],
    payment_considerations: ["recurring_collection", "failed_payment_retry"],
    reporting_needs: ["mrr_contract", "retention_contract"],
    risks: ["churn", "pricing_mismatch"],
    kpis: ["activation_rate", "retention_rate"],
  }),
  bm("transaction-based", "Transaction-based", {
    revenue_drivers: ["per_transaction_fees"],
    cost_drivers: ["payment_processing", "fraud_ops", "support"],
    customer_lifecycle: ["acquire", "transact", "repeat"],
    operational_requirements: ["ledger", "reconciliation", "dispute_flow"],
    payment_considerations: ["settlement_timing", "chargebacks"],
    reporting_needs: ["transaction_volume", "take_rate_contract"],
    risks: ["fraud", "payment_outage"],
    kpis: ["transaction_success_rate"],
  }),
  bm("marketplace", "Marketplace", {
    revenue_drivers: ["take_rate", "listing_fees"],
    cost_drivers: ["trust_safety", "liquidity_ops", "payments"],
    customer_lifecycle: ["supply_onboard", "demand_acquire", "match", "retain"],
    operational_requirements: ["matching", "ratings", "disputes"],
    payment_considerations: ["split_payouts", "escrow_like_holds"],
    reporting_needs: ["liquidity", "match_rate"],
    risks: ["cold_start", "trust_failure"],
    kpis: ["match_rate", "repeat_transaction_rate"],
  }),
  bm("service-delivery", "Service delivery", {
    revenue_drivers: ["billable_engagements"],
    cost_drivers: ["delivery_capacity", "quality_assurance"],
    customer_lifecycle: ["intake", "deliver", "review", "renew"],
    operational_requirements: ["scheduling", "capacity", "sla_tracking"],
    payment_considerations: ["milestones", "invoicing"],
    reporting_needs: ["utilization", "sla_attainment"],
    risks: ["capacity_overrun", "quality_variance"],
    kpis: ["on_time_delivery"],
  }),
  bm("licensing", "Licensing", {
    revenue_drivers: ["license_grants"],
    cost_drivers: ["compliance_ops", "support"],
    customer_lifecycle: ["evaluate", "license", "renew"],
    operational_requirements: ["entitlement_enforcement", "audit_exports"],
    payment_considerations: ["annual_contracts"],
    reporting_needs: ["license_utilization"],
    risks: ["piracy_or_misuse", "contract_ambiguity"],
    kpis: ["active_licenses"],
  }),
  bm("usage-based", "Usage-based", {
    revenue_drivers: ["metered_consumption"],
    cost_drivers: ["compute", "metering_accuracy"],
    customer_lifecycle: ["integrate", "consume", "optimize"],
    operational_requirements: ["metering", "quotas", "cost_controls"],
    payment_considerations: ["usage_invoicing", "overage"],
    reporting_needs: ["usage_by_tenant"],
    risks: ["bill_shock", "meter_drift"],
    kpis: ["billable_usage_accuracy"],
  }),
  bm("hybrid", "Hybrid", {
    revenue_drivers: ["subscription_base_plus_usage_or_transactions"],
    cost_drivers: ["billing_complexity", "support"],
    customer_lifecycle: ["activate", "expand_usage", "retain"],
    operational_requirements: ["multi_component_billing", "entitlements"],
    payment_considerations: ["mixed_invoicing"],
    reporting_needs: ["component_revenue_contracts"],
    risks: ["pricing_complexity"],
    kpis: ["expansion_rate"],
  }),
];

function bm(slug, name, payload) {
  const base = makeTemplateBase({
    id: `tpl_bm_${slug}_v1`,
    slug,
    name,
    description: `Structural ${name} business model pattern. No financial forecasts.`,
    evidence_refs: [{ type: "catalog", ref: "phase-e-seed" }],
  });
  return { ...base, kind: "business_model", payload };
}

export function listBusinessModelTemplates({ includeDeprecated = false } = {}) {
  return BUSINESS_MODEL_TEMPLATES.filter(
    (t) => includeDeprecated || !["deprecated", "archived"].includes(t.status)
  );
}

export function getBusinessModelTemplate(slug, version = null) {
  const matches = BUSINESS_MODEL_TEMPLATES.filter((t) => t.slug === slug);
  if (!matches.length) return null;
  if (version != null) return matches.find((t) => t.version === version) || null;
  return matches.find((t) => t.status === "active") || matches[0];
}
