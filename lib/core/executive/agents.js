// Wave-1 Executive / C-Suite runtime agent definitions.
// Canonical workforce IDs map via workforceSlug → lib/workforce (mianx.*.v1).
// Analysis / recommend only — never production side effects.
// Capability strings mirror lib/core/agents.js (avoid circular imports).

const DEFAULT_MODEL = "claude-sonnet-4-6";
const DEFAULT_EXECUTION_TIMEOUT_MS = 30000;

const PROHIBITED = ["send_email", "approve_production_action"];

const ASSESSMENT_OUTPUT = {
  type: "object",
  required: ["domain", "summary", "findings", "risks", "recommendation"],
  properties: {
    domain: { type: "string" },
    summary: { type: "string" },
    findings: { type: "array", items: { type: "string" } },
    risks: { type: "array", items: { type: "string" } },
    recommendation: {
      type: "string",
      enum: ["ready", "hold", "blocked"],
    },
    approval_required: { type: "boolean" },
  },
};

function csuite({
  slug,
  workforceSlug,
  name,
  purpose,
  domain,
  hierarchyLevel,
  reportsTo,
  allowedCapabilities,
  riskClass = "R3",
  requiresHumanApproval = false,
}) {
  return {
    slug,
    version: 1,
    name,
    purpose,
    workforceSlug,
    hierarchyLevel,
    reportsTo,
    department: "leadership",
    domain,
    riskClass,
    autonomyLevel: "recommend",
    allowedCapabilities,
    prohibitedCapabilities: [...PROHIBITED],
    inputSchema: {
      type: "object",
      required: ["objective"],
      properties: {
        objective: { type: "string", maxLength: 8000 },
        context: { type: "string", maxLength: 8000 },
        mode: { type: "string", maxLength: 40 },
        prior: { type: "object" },
      },
    },
    outputSchema:
      slug === "executive-ceo"
        ? {
            type: "object",
            required: ["objective_summary", "workstreams", "status"],
            properties: {
              objective_summary: { type: "string" },
              workstreams: { type: "array" },
              status: {
                type: "string",
                enum: ["planned", "aggregated", "awaiting_founder", "blocked"],
              },
              executive_result: { type: "string" },
              blockers: { type: "array", items: { type: "string" } },
              approval_required: { type: "boolean" },
            },
          }
        : ASSESSMENT_OUTPUT,
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval,
    lifecycleStatus: "active",
    enabledByDefault: true,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
    wave: "wave-1",
  };
}

/** L1 Executive Orchestrator (AI CEO equivalent). */
export const EXECUTIVE_CEO = csuite({
  slug: "executive-ceo",
  workforceSlug: "mianx.ceo.v1",
  name: "Executive Orchestrator (AI CEO)",
  purpose:
    "Decompose Founder/business objectives into bounded C-Suite workstreams, " +
    "delegate via the runtime queue, aggregate results, and escalate protected " +
    "decisions to the human Founder. Never executes production side effects.",
  domain: "executive_orchestration",
  hierarchyLevel: "L1",
  reportsTo: "founder",
  riskClass: "R4",
  allowedCapabilities: ["plan", "summarize", "orchestrate", "delegate"],
});

const L2_BASE = {
  hierarchyLevel: "L2",
  reportsTo: "executive-ceo",
};

/** Wave-1 C-Suite advisors (canonical 10 L2 roles). */
export const EXECUTIVE_CSUITE = [
  csuite({
    ...L2_BASE,
    slug: "executive-cto",
    workforceSlug: "mianx.cto.v1",
    name: "AI Chief Technology Officer",
    purpose: "Technology, architecture, engineering and platform readiness assessments.",
    domain: "technology",
    allowedCapabilities: ["engineering_plan", "plan", "summarize"],
  }),
  csuite({
    ...L2_BASE,
    slug: "executive-coo",
    workforceSlug: "mianx.coo.v1",
    name: "AI Chief Operating Officer",
    purpose: "Operations, service delivery and continuity assessments.",
    domain: "operations",
    allowedCapabilities: ["plan", "summarize"],
  }),
  csuite({
    ...L2_BASE,
    slug: "executive-cmo",
    workforceSlug: "mianx.cmo.v1",
    name: "AI Chief Marketing Officer",
    purpose: "Marketing, brand and growth readiness assessments.",
    domain: "marketing",
    allowedCapabilities: ["draft_text", "summarize", "plan"],
  }),
  csuite({
    ...L2_BASE,
    slug: "executive-cfo",
    workforceSlug: "mianx.cfo.v1",
    name: "AI Chief Financial Officer",
    purpose: "Finance and budget risk recommendations only — never transfers funds.",
    domain: "finance",
    riskClass: "R4",
    allowedCapabilities: ["summarize", "plan"],
  }),
  csuite({
    ...L2_BASE,
    slug: "executive-chro",
    workforceSlug: "mianx.chro.v1",
    name: "AI Chief Human Resources Officer",
    purpose: "Workforce capacity and org-readiness recommendations.",
    domain: "people",
    allowedCapabilities: ["summarize", "plan"],
  }),
  csuite({
    ...L2_BASE,
    slug: "executive-cpo",
    workforceSlug: "mianx.cpo.v1",
    name: "AI Chief Product Officer",
    purpose: "Product strategy and launch-readiness assessments.",
    domain: "product",
    allowedCapabilities: ["requirements", "plan", "summarize"],
  }),
  csuite({
    ...L2_BASE,
    slug: "executive-cso",
    workforceSlug: "mianx.cso.v1",
    name: "AI Chief Sales Officer",
    purpose: "Commercial / sales readiness assessments.",
    domain: "commercial",
    allowedCapabilities: ["summarize", "plan"],
  }),
  csuite({
    ...L2_BASE,
    slug: "executive-ciso",
    workforceSlug: "mianx.ciso.v1",
    name: "AI Chief Information Security Officer",
    purpose: "Security and cyber-risk readiness assessments — never a production sign-off.",
    domain: "security",
    riskClass: "R4",
    allowedCapabilities: ["security_review", "summarize", "plan"],
  }),
  csuite({
    ...L2_BASE,
    slug: "executive-clo",
    workforceSlug: "mianx.clo.v1",
    name: "AI Chief Legal Officer",
    purpose: "Legal/compliance recommendations only — never legal commitments.",
    domain: "legal",
    riskClass: "R4",
    allowedCapabilities: ["summarize", "plan"],
  }),
  csuite({
    ...L2_BASE,
    slug: "executive-chief-scientist",
    workforceSlug: "mianx.chief-scientist.v1",
    name: "AI Chief Scientist",
    purpose: "Research and evaluation readiness assessments.",
    domain: "research",
    allowedCapabilities: ["research_summary", "summarize", "plan"],
  }),
];

export const WAVE1_AGENT_DEFINITIONS = [EXECUTIVE_CEO, ...EXECUTIVE_CSUITE];

export const WAVE1_SLUGS = WAVE1_AGENT_DEFINITIONS.map((d) => d.slug);

export const L2_SLUGS = EXECUTIVE_CSUITE.map((d) => d.slug);

export function getWave1Definition(slug) {
  return WAVE1_AGENT_DEFINITIONS.find((d) => d.slug === slug) || null;
}

/** All Wave-1 agents are active/executable (analysis-only). */
export function listExecutableWave1Slugs() {
  return WAVE1_AGENT_DEFINITIONS.filter((d) => d.lifecycleStatus === "active").map(
    (d) => d.slug
  );
}

/** Primary readiness E2E path (not the full C-Suite). */
export const PRIMARY_READINESS_E2E_AGENTS = [
  "executive-ceo",
  "executive-cto",
  "executive-cpo",
  "executive-ciso",
];

