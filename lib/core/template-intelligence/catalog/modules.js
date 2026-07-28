import { makeTemplateBase } from "../schemas";

/** Generic product module templates — definitions only, not implementations. */
const MODULE_DEFS = [
  ["identity-access", "Identity and access", ["admin", "user"], ["users", "sessions", "roles"]],
  ["organisation-management", "Organisation management", ["admin"], ["organizations", "memberships"]],
  ["customer-management", "Customer management", ["ops", "sales"], ["customers", "pipeline_status"]],
  ["workflow-management", "Workflow management", ["ops"], ["workflows", "stages"]],
  ["task-management", "Task management", ["ops", "agents"], ["tasks", "assignments"]],
  ["notifications", "Notifications", ["system", "user"], ["notification_events"]],
  ["files", "Files", ["user", "admin"], ["files", "attachments"]],
  ["payments", "Payments", ["finance", "system"], ["payment_intents", "invoices"]],
  ["reporting", "Reporting", ["founder", "ops"], ["report_definitions"]],
  ["analytics", "Analytics", ["analytics"], ["events", "aggregates"]],
  ["audit", "Audit", ["security", "compliance"], ["audit_events"]],
  ["settings", "Settings", ["admin"], ["settings"]],
  ["integrations", "Integrations", ["admin", "system"], ["webhooks", "api_clients"]],
  ["ai-assistance", "AI assistance", ["operator"], ["prompts", "runs"]],
];

export const MODULE_TEMPLATES = MODULE_DEFS.map(([slug, name, actors, entities]) => {
  const base = makeTemplateBase({
    id: `tpl_mod_${slug}_v1`,
    slug,
    name,
    description: `Module template: ${name}. Not an implemented product module.`,
    evidence_refs: [{ type: "catalog", ref: "phase-e-seed" }],
  });
  return {
    ...base,
    kind: "module",
    payload: {
      purpose: name,
      actors,
      core_entities: entities,
      features: [`${slug}.core`],
      workflows: [],
      apis: [`/api/${slug}`],
      permissions: ["read", "write", "admin"],
      data_needs: entities,
      security_concerns: ["authz", "audit"],
      tests: ["unit", "contract"],
      dependencies: slug === "ai-assistance" ? ["identity-access"] : ["identity-access"],
      success_criteria: [`${slug}_usable_without_false_claims`],
    },
  };
});

export function listModuleTemplates({ includeDeprecated = false } = {}) {
  return MODULE_TEMPLATES.filter(
    (t) => includeDeprecated || !["deprecated", "archived"].includes(t.status)
  );
}

export function getModuleTemplate(slug, version = null) {
  const matches = MODULE_TEMPLATES.filter((t) => t.slug === slug);
  if (!matches.length) return null;
  if (version != null) return matches.find((t) => t.version === version) || null;
  return matches.find((t) => t.status === "active") || matches[0];
}
