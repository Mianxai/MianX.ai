import { RELATION_TYPES, nowIso } from "../schemas";

/**
 * Seed relationship edges for the catalog graph.
 * from/to use kind:slug identity.
 */
export const CATALOG_RELATIONS = [
  rel("industry", "generic-platform", "contains_capability", "capability", "identity-access"),
  rel("industry", "generic-platform", "contains_capability", "capability", "organisation-management"),
  rel("industry", "generic-platform", "contains_capability", "capability", "customer-management"),
  rel("industry", "generic-platform", "contains_capability", "capability", "operations"),
  rel("industry", "generic-platform", "contains_capability", "capability", "reporting"),
  rel("industry", "generic-platform", "contains_capability", "capability", "security"),
  rel("industry", "regulated-services", "contains_capability", "capability", "compliance-controls"),
  rel("industry", "regulated-services", "contains_capability", "capability", "security"),
  rel("industry", "marketplace-platform", "contains_capability", "capability", "customer-management"),
  rel("industry", "marketplace-platform", "contains_capability", "capability", "operations"),

  rel("capability", "identity-access", "requires_department", "department", "engineering"),
  rel("capability", "organisation-management", "requires_department", "department", "engineering"),
  rel("capability", "customer-management", "requires_department", "department", "sales"),
  rel("capability", "operations", "requires_department", "department", "operations"),
  rel("capability", "reporting", "requires_department", "department", "analytics"),
  rel("capability", "finance-controls", "requires_department", "department", "finance"),
  rel("capability", "security", "requires_department", "department", "security"),
  rel("capability", "support", "requires_department", "department", "support"),
  rel("capability", "analytics", "requires_department", "department", "analytics"),
  rel("capability", "integrations", "requires_department", "department", "engineering"),
  rel("capability", "ai-assistance", "requires_department", "department", "data-ai"),
  rel("capability", "compliance-controls", "requires_department", "department", "legal"),

  rel("capability", "identity-access", "uses_module", "module", "identity-access"),
  rel("capability", "operations", "uses_module", "module", "workflow-management"),
  rel("capability", "operations", "uses_module", "module", "task-management"),
  rel("capability", "security", "uses_module", "module", "audit"),
  rel("capability", "customer-management", "uses_module", "module", "customer-management"),

  rel("module", "workflow-management", "uses_workflow", "workflow", "approval-gate"),
  rel("module", "identity-access", "uses_workflow", "workflow", "onboarding"),
  rel("module", "audit", "has_compliance", "compliance", "audit-evidence"),
  rel("workflow", "approval-gate", "has_compliance", "compliance", "access-review"),

  rel("architecture", "multi-tenant", "architecture_supports", "module", "organisation-management"),
  rel("architecture", "api-first", "architecture_supports", "module", "integrations"),

  rel("risk", "provider-unconfigured", "risk_affects", "module", "ai-assistance"),
  rel("risk", "cross-tenant-leakage", "risk_affects", "architecture", "multi-tenant"),
  rel("risk", "compliance-overclaim", "risk_affects", "compliance", "data-minimisation"),

  rel("kpi", "activation-rate", "kpi_measures", "capability", "organisation-management"),
  rel("kpi", "approval-latency", "kpi_measures", "capability", "operations"),
  rel("kpi", "audit-coverage", "kpi_measures", "capability", "security"),
];

function rel(fromKind, fromSlug, relationType, toKind, toSlug) {
  if (!RELATION_TYPES.includes(relationType)) {
    throw new Error(`Unknown relation type: ${relationType}`);
  }
  return {
    id: `rel_${fromKind}_${fromSlug}_${relationType}_${toKind}_${toSlug}`,
    from_type: fromKind,
    from_id: fromSlug,
    to_type: toKind,
    to_id: toSlug,
    relation_type: relationType,
    metadata: {},
    created_at: nowIso(),
    audit_metadata: { source: "phase-e-seed" },
  };
}

export function listCatalogRelations() {
  return [...CATALOG_RELATIONS];
}
