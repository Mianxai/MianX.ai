// Wave-6 Finance + HR + Legal advisory agents — recommend-only under human gates.

const DEFAULT_MODEL = "claude-sonnet-4-6";
const DEFAULT_EXECUTION_TIMEOUT_MS = 30000;
const PROHIBITED = [
  "send_email",
  "approve_production_action",
  "deploy_production",
  "modify_billing",
  "transfer_funds",
  "execute_payment",
  "hire_decide",
  "fire_decide",
  "change_compensation",
  "sign_agreement",
  "file_regulatory",
  "accept_legal_terms",
  "git_push",
];

function advisoryAgent(cfg) {
  return {
    version: 1,
    hierarchyLevel: "L5",
    riskClass: cfg.riskClass || "R3",
    autonomyLevel: "recommend",
    prohibitedCapabilities: [...PROHIBITED],
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval: false,
    lifecycleStatus: "active",
    enabledByDefault: true,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
    wave: "wave-6",
    repositoryWriteAuthority: false,
    productionMutationAuthority: false,
    ...cfg,
  };
}

export const FINANCE_ADVISOR = advisoryAgent({
  slug: "finance-advisor",
  workforceSlug: "finance.advisor",
  name: "Finance Advisor",
  purpose: "Budget, cost, forecast, unit-economics, and spending recommendations. Never transfers funds or alters billing.",
  department: "finance",
  domain: "financial_analysis",
  reportsTo: "executive-cfo",
  allowedCapabilities: ["budget_recommend", "plan", "summarize", "observe_metrics"],
  inputSchema: {
    type: "object",
    required: ["question"],
    properties: {
      question: { type: "string", maxLength: 8000 },
      evidence: { type: "object" },
      mode: { type: "string", maxLength: 40 },
      proposed_action: { type: "string", maxLength: 100 },
    },
  },
  outputSchema: {
    type: "object",
    required: ["analysis", "recommendations", "risks", "finance_status", "disclaimer"],
    properties: {
      analysis: { type: "string" },
      recommendations: { type: "array", items: { type: "string" } },
      risks: { type: "array", items: { type: "string" } },
      unit_economics: { type: "object" },
      finance_status: { type: "string" },
      disclaimer: { type: "string" },
      requires_founder_approval: { type: "boolean" },
    },
  },
});

export const HR_WORKFORCE_PLANNER = advisoryAgent({
  slug: "hr-workforce-planner",
  workforceSlug: "hr.workforce-planner",
  name: "HR Workforce Planner",
  purpose: "Workforce planning, role analysis, hiring-plan and training recommendations. Never hires/fires or changes compensation.",
  department: "hr",
  domain: "workforce_planning",
  reportsTo: "executive-chro",
  allowedCapabilities: ["hire_recommend", "plan", "summarize"],
  inputSchema: {
    type: "object",
    required: ["question"],
    properties: {
      question: { type: "string", maxLength: 8000 },
      evidence: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: ["plan", "role_analysis", "recommendations", "hr_status", "disclaimer"],
    properties: {
      plan: { type: "array", items: { type: "string" } },
      role_analysis: { type: "array", items: { type: "string" } },
      hiring_plan: { type: "array", items: { type: "string" } },
      training: { type: "array", items: { type: "string" } },
      recommendations: { type: "array", items: { type: "string" } },
      hr_status: { type: "string" },
      disclaimer: { type: "string" },
    },
  },
});

export const LEGAL_RISK_ADVISOR = advisoryAgent({
  slug: "legal-risk-advisor",
  workforceSlug: "legal.risk-advisor",
  name: "Legal Risk Advisor",
  purpose: "Legal-risk, contract issue-spotting, compliance checklists, and review prep. Analysis only — not licensed legal advice; never signs or files.",
  department: "legal",
  domain: "legal_risk_analysis",
  reportsTo: "executive-clo",
  allowedCapabilities: ["plan", "summarize", "review_work"],
  inputSchema: {
    type: "object",
    required: ["matter"],
    properties: {
      matter: { type: "string", maxLength: 8000 },
      evidence: { type: "object" },
      mode: { type: "string", maxLength: 40 },
      proposed_action: { type: "string", maxLength: 100 },
    },
  },
  outputSchema: {
    type: "object",
    required: ["risks", "issues", "compliance_checklist", "preparation", "legal_status", "disclaimer"],
    properties: {
      risks: { type: "array", items: { type: "string" } },
      issues: { type: "array", items: { type: "string" } },
      compliance_checklist: { type: "array", items: { type: "string" } },
      policy_gaps: { type: "array", items: { type: "string" } },
      preparation: { type: "array", items: { type: "string" } },
      legal_status: { type: "string" },
      disclaimer: { type: "string" },
      is_licensed_legal_advice: { type: "boolean" },
      requires_founder_approval: { type: "boolean" },
    },
  },
});

export const WAVE6_AGENT_DEFINITIONS = [FINANCE_ADVISOR, HR_WORKFORCE_PLANNER, LEGAL_RISK_ADVISOR];
export const WAVE6_SLUGS = WAVE6_AGENT_DEFINITIONS.map((d) => d.slug);
export const ADVISORY_REVIEW_STEPS = ["finance-advisor", "hr-workforce-planner", "legal-risk-advisor"];
export function getWave6Definition(slug) {
  return WAVE6_AGENT_DEFINITIONS.find((d) => d.slug === slug) || null;
}
