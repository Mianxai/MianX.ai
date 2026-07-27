// Design experience reviewer — analysis/handoff only; no public brand mutation.

const DEFAULT_MODEL = "claude-sonnet-4-6";
const PROHIBITED = [
  "send_email",
  "approve_production_action",
  "deploy_production",
  "public_brand_change",
  "git_push",
];

export const DESIGN_REVIEWER = {
  slug: "design-reviewer",
  version: 1,
  name: "Design Experience Reviewer",
  purpose:
    "Analyse product/interface design against system conventions, usability, and " +
    "accessibility. Produces handoff recommendations — never mutates the locked public site.",
  workforceSlug: "design.experience",
  hierarchyLevel: "L5",
  reportsTo: "executive-cpo",
  department: "design",
  domain: "experience_review",
  riskClass: "R2",
  autonomyLevel: "recommend",
  allowedCapabilities: ["plan", "summarize", "review_work", "qa_review"],
  prohibitedCapabilities: [...PROHIBITED],
  inputSchema: {
    type: "object",
    required: ["objective"],
    properties: {
      objective: { type: "string", maxLength: 8000 },
      product_spec: { type: "object" },
      prior: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: [
      "interface_findings",
      "design_system_notes",
      "usability_findings",
      "accessibility_findings",
      "handoff",
      "design_status",
    ],
    properties: {
      interface_findings: { type: "array", items: { type: "string" } },
      design_system_notes: { type: "array", items: { type: "string" } },
      usability_findings: { type: "array", items: { type: "string" } },
      accessibility_findings: { type: "array", items: { type: "string" } },
      handoff: { type: "array", items: { type: "string" } },
      design_status: { type: "string" },
      public_site_locked: { type: "boolean" },
    },
  },
  defaultProvider: "anthropic",
  defaultModel: DEFAULT_MODEL,
  requiresHumanApproval: false,
  lifecycleStatus: "active",
  enabledByDefault: true,
  executionTimeoutMs: 30000,
  wave: "release-candidate",
  repositoryWriteAuthority: false,
  productionMutationAuthority: false,
};

export const DESIGN_AGENT_DEFINITIONS = [DESIGN_REVIEWER];
export const DESIGN_SLUGS = DESIGN_AGENT_DEFINITIONS.map((d) => d.slug);
export function getDesignDefinition(slug) {
  return DESIGN_AGENT_DEFINITIONS.find((d) => d.slug === slug) || null;
}
