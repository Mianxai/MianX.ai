// Structured research evidence analyst — complements wave-0 research summary agent.
// Does not replace runtime.research; focuses on plan, source quality, uncertainty.

const DEFAULT_MODEL = "claude-sonnet-4-6";
const PROHIBITED = [
  "send_email",
  "approve_production_action",
  "deploy_production",
  "git_push",
];

export const RESEARCH_EVIDENCE = {
  slug: "research-evidence",
  version: 1,
  name: "Research Evidence Analyst",
  purpose:
    "Plan structured research, synthesise evidence with source-quality and uncertainty " +
    "handling, and hand off to Product/Executive workflows. Never invents citations.",
  workforceSlug: "research.evidence",
  hierarchyLevel: "L5",
  reportsTo: "executive-chief-scientist",
  department: "research",
  domain: "evidence_synthesis",
  riskClass: "R2",
  autonomyLevel: "recommend",
  allowedCapabilities: ["research_summary", "plan", "summarize"],
  prohibitedCapabilities: [...PROHIBITED],
  inputSchema: {
    type: "object",
    required: ["question"],
    properties: {
      question: { type: "string", maxLength: 8000 },
      context: { type: "string", maxLength: 8000 },
      prior: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: [
      "research_plan",
      "findings",
      "sources",
      "source_quality",
      "uncertainties",
      "handoff",
      "research_status",
    ],
    properties: {
      research_plan: { type: "array", items: { type: "string" } },
      findings: { type: "array", items: { type: "string" } },
      sources: { type: "array", items: { type: "string" } },
      source_quality: { type: "array", items: { type: "string" } },
      uncertainties: { type: "array", items: { type: "string" } },
      handoff: { type: "array", items: { type: "string" } },
      research_status: { type: "string" },
      invented_citations: { type: "boolean" },
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

export const RESEARCH_EVIDENCE_DEFINITIONS = [RESEARCH_EVIDENCE];
export const RESEARCH_EVIDENCE_SLUGS = RESEARCH_EVIDENCE_DEFINITIONS.map((d) => d.slug);
export function getResearchEvidenceDefinition(slug) {
  return RESEARCH_EVIDENCE_DEFINITIONS.find((d) => d.slug === slug) || null;
}
