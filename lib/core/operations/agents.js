// Wave-4 operations agents: Ops Coordinator, Support Triage, Analytics Reporter.
// Advisory / structured planning only — never send email, deploy, or mutate production.

const DEFAULT_MODEL = "claude-sonnet-4-6";
const DEFAULT_EXECUTION_TIMEOUT_MS = 30000;

const PROHIBITED = [
  "send_email",
  "approve_production_action",
  "deploy_production",
  "modify_billing",
  "git_push",
];

function opsAgent(cfg) {
  return {
    version: 1,
    hierarchyLevel: "L5",
    riskClass: cfg.riskClass || "R2",
    autonomyLevel: "recommend",
    prohibitedCapabilities: [...PROHIBITED],
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval: false,
    lifecycleStatus: "active",
    enabledByDefault: true,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
    wave: "wave-4",
    repositoryWriteAuthority: false,
    productionMutationAuthority: false,
    ...cfg,
  };
}

export const OPS_COORDINATOR = opsAgent({
  slug: "ops-coordinator",
  workforceSlug: "operations.coordinator",
  name: "Ops Coordinator",
  purpose:
    "Ops plan, process health, blockers, SLA monitoring, escalation, and incident coordination. " +
    "Never mutates production or sends email.",
  department: "operations",
  domain: "ops_coordination",
  reportsTo: "executive-coo",
  riskClass: "R3",
  allowedCapabilities: ["plan", "summarize", "orchestrate"],
  inputSchema: {
    type: "object",
    required: ["signal"],
    properties: {
      signal: { type: "string", maxLength: 8000 },
      objective: { type: "string", maxLength: 8000 },
      proposed_action: { type: "string", maxLength: 100 },
      prior: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: [
      "incident_class",
      "severity",
      "process_health",
      "blockers",
      "ops_status",
      "recommended_actions",
    ],
    properties: {
      incident_class: { type: "string" },
      severity: { type: "string" },
      process_health: { type: "string" },
      blockers: { type: "array", items: { type: "string" } },
      sla_notes: { type: "array", items: { type: "string" } },
      escalation_path: { type: "array", items: { type: "string" } },
      ops_status: {
        type: "string",
        enum: ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"],
      },
      recommended_actions: { type: "array", items: { type: "string" } },
      requires_founder_approval: { type: "boolean" },
    },
  },
});

export const SUPPORT_TRIAGE = opsAgent({
  slug: "support-triage",
  workforceSlug: "support.triage",
  name: "Support Triage",
  purpose:
    "Intake, classify, prioritise; draft knowledge-assisted responses; link incidents. " +
    "NEVER sends email autonomously.",
  department: "support",
  domain: "support_triage",
  reportsTo: "executive-coo",
  allowedCapabilities: ["summarize", "draft_text", "plan"],
  inputSchema: {
    type: "object",
    required: ["issue"],
    properties: {
      issue: { type: "string", maxLength: 8000 },
      ops: { type: "object" },
      proposed_action: { type: "string", maxLength: 100 },
      prior: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: [
      "classification",
      "priority",
      "draft_response",
      "support_status",
      "external_send_allowed",
    ],
    properties: {
      classification: { type: "string" },
      priority: { type: "string" },
      draft_response: { type: "string" },
      escalation: { type: "string" },
      incident_link: { type: "string" },
      customer_safe: { type: "boolean" },
      support_status: {
        type: "string",
        enum: ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"],
      },
      external_send_allowed: { type: "boolean" },
    },
  },
});

export const ANALYTICS_REPORTER = opsAgent({
  slug: "analytics-reporter",
  workforceSlug: "analytics.reporter",
  name: "Analytics Reporter",
  purpose:
    "Operational metrics from real supplied inputs only. Uses data_available / " +
    "insufficient_data. NEVER fabricates uptime, CSAT, or savings.",
  department: "analytics",
  domain: "ops_analytics",
  reportsTo: "executive-cto",
  allowedCapabilities: ["summarize", "research_summary", "plan"],
  inputSchema: {
    type: "object",
    required: ["evidence"],
    properties: {
      evidence: { type: "object" },
      proposed_action: { type: "string", maxLength: 100 },
      prior: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: ["metrics", "data_available", "insufficient_data", "insights", "analytics_status"],
    properties: {
      metrics: { type: "object" },
      data_available: { type: "boolean" },
      insufficient_data: { type: "array", items: { type: "string" } },
      insights: { type: "array", items: { type: "string" } },
      analytics_status: {
        type: "string",
        enum: ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"],
      },
      fabricated_claims: { type: "array", items: { type: "string" } },
    },
  },
});

export const WAVE4_AGENT_DEFINITIONS = [
  OPS_COORDINATOR,
  SUPPORT_TRIAGE,
  ANALYTICS_REPORTER,
];

export const WAVE4_SLUGS = WAVE4_AGENT_DEFINITIONS.map((d) => d.slug);

export const OPERATIONS_INCIDENT_STEPS = [
  "ops-coordinator",
  "support-triage",
  "analytics-reporter",
];

export function getWave4Definition(slug) {
  return WAVE4_AGENT_DEFINITIONS.find((d) => d.slug === slug) || null;
}
