// Wave-5 Growth/Commercial pod — drafts and analysis only; no autonomous outreach.

const DEFAULT_MODEL = "claude-sonnet-4-6";
const DEFAULT_EXECUTION_TIMEOUT_MS = 30000;
const PROHIBITED = [
  "send_email",
  "approve_production_action",
  "deploy_production",
  "modify_billing",
  "git_push",
  "automatic_outreach",
];

function growthAgent(cfg) {
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
    wave: "wave-5",
    repositoryWriteAuthority: false,
    productionMutationAuthority: false,
    ...cfg,
  };
}

export const SALES_OPPORTUNITY = growthAgent({
  slug: "sales-opportunity",
  workforceSlug: "sales.opportunity",
  name: "Sales Opportunity Analyst",
  purpose: "Qualify opportunities, research accounts, draft proposals and follow-ups. Never sends outreach.",
  department: "sales",
  domain: "opportunity_analysis",
  reportsTo: "executive-cso",
  allowedCapabilities: ["score_lead", "research_summary", "draft_text", "plan", "summarize", "follow_up_draft"],
  inputSchema: {
    type: "object",
    required: ["lead_context"],
    properties: {
      lead_context: { type: "object" },
      prior: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: ["qualification", "opportunity_summary", "next_actions", "proposal_draft", "sales_status"],
    properties: {
      qualification: { type: "string" },
      opportunity_summary: { type: "string" },
      account_research: { type: "array", items: { type: "string" } },
      next_actions: { type: "array", items: { type: "string" } },
      proposal_draft: { type: "string" },
      follow_up_draft: { type: "string" },
      pipeline_notes: { type: "array", items: { type: "string" } },
      sales_status: { type: "string" },
      external_send_allowed: { type: "boolean" },
    },
  },
});

export const MARKETING_PLANNER = growthAgent({
  slug: "marketing-planner",
  workforceSlug: "marketing.planner",
  name: "Marketing Planner",
  purpose: "Campaign planning, positioning, content plans, and measurement recommendations. No publish/spend.",
  department: "marketing",
  domain: "campaign_planning",
  reportsTo: "executive-cmo",
  allowedCapabilities: ["plan", "summarize", "draft_text", "research_summary"],
  inputSchema: {
    type: "object",
    required: ["context"],
    properties: {
      context: { type: "object" },
      sales: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: ["campaign_plan", "positioning", "content_plan", "measurement", "marketing_status"],
    properties: {
      campaign_plan: { type: "array", items: { type: "string" } },
      positioning: { type: "string" },
      content_plan: { type: "array", items: { type: "string" } },
      market_intelligence: { type: "array", items: { type: "string" } },
      measurement: { type: "array", items: { type: "string" } },
      marketing_status: { type: "string" },
    },
  },
});

export const SEO_ANALYST = growthAgent({
  slug: "seo-analyst",
  workforceSlug: "seo.analyst",
  name: "SEO Analyst",
  purpose: "Keyword/topic analysis, technical SEO review, content-gap and on-page recommendations.",
  department: "seo",
  domain: "seo_analysis",
  reportsTo: "executive-cmo",
  allowedCapabilities: ["plan", "summarize", "research_summary"],
  inputSchema: {
    type: "object",
    required: ["context"],
    properties: {
      context: { type: "object" },
      marketing: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: ["keywords", "technical_findings", "content_gaps", "on_page", "seo_status"],
    properties: {
      keywords: { type: "array", items: { type: "string" } },
      technical_findings: { type: "array", items: { type: "string" } },
      content_gaps: { type: "array", items: { type: "string" } },
      on_page: { type: "array", items: { type: "string" } },
      performance_notes: { type: "array", items: { type: "string" } },
      seo_status: { type: "string" },
    },
  },
});

export const CUSTOMER_SUCCESS_ADVISOR = growthAgent({
  slug: "customer-success-advisor",
  workforceSlug: "customer-success.advisor",
  name: "Customer Success Advisor",
  purpose: "Onboarding, account-health, adoption, renewal-risk, and success-plan recommendations.",
  department: "customer-success",
  domain: "success_planning",
  reportsTo: "executive-coo",
  allowedCapabilities: ["plan", "summarize", "draft_text"],
  inputSchema: {
    type: "object",
    required: ["account_context"],
    properties: {
      account_context: { type: "object" },
      prior: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: ["onboarding_plan", "health", "adoption", "renewal_risk", "success_plan", "cs_status"],
    properties: {
      onboarding_plan: { type: "array", items: { type: "string" } },
      health: { type: "string" },
      adoption: { type: "array", items: { type: "string" } },
      renewal_risk: { type: "string" },
      success_plan: { type: "array", items: { type: "string" } },
      escalation: { type: "string" },
      cs_status: { type: "string" },
    },
  },
});

export const WAVE5_AGENT_DEFINITIONS = [
  SALES_OPPORTUNITY,
  MARKETING_PLANNER,
  SEO_ANALYST,
  CUSTOMER_SUCCESS_ADVISOR,
];
export const WAVE5_SLUGS = WAVE5_AGENT_DEFINITIONS.map((d) => d.slug);
export const BUSINESS_GROWTH_STEPS = [
  "lead-intelligence",
  "research",
  "sales-opportunity",
  "marketing-planner",
  "seo-analyst",
  "customer-success-advisor",
  "qa-review",
  "follow-up-draft",
];
export function getWave5Definition(slug) {
  return WAVE5_AGENT_DEFINITIONS.find((d) => d.slug === slug) || null;
}
