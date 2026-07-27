// Wave-2 Software Delivery Pod — runtime agent definitions.
// Analysis / structured planning only — no repository writes, deploys, or secrets.
// Linked to canonical workforce via workforceSlug.

const DEFAULT_MODEL = "claude-sonnet-4-6";
const DEFAULT_EXECUTION_TIMEOUT_MS = 30000;

const PROHIBITED = [
  "send_email",
  "approve_production_action",
  "write_repository",
  "deploy_production",
  "rotate_secrets",
  "modify_billing",
];

function deliveryAgent({
  slug,
  workforceSlug,
  name,
  purpose,
  department,
  domain,
  reportsTo,
  allowedCapabilities,
  inputSchema,
  outputSchema,
  riskClass = "R2",
}) {
  return {
    slug,
    version: 1,
    name,
    purpose,
    workforceSlug,
    hierarchyLevel: "L5",
    reportsTo,
    department,
    domain,
    riskClass,
    autonomyLevel: "recommend",
    allowedCapabilities,
    prohibitedCapabilities: [...PROHIBITED],
    inputSchema,
    outputSchema,
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval: false,
    lifecycleStatus: "active",
    enabledByDefault: true,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
    wave: "wave-2",
    // Honest capability boundary: structured artifacts only.
    repositoryWriteAuthority: false,
  };
}

/** Product specification owner (dept.product). */
export const DELIVERY_PRODUCT = deliveryAgent({
  slug: "delivery-product",
  workforceSlug: "product.delivery-owner",
  name: "Delivery Product Owner",
  purpose:
    "Interpret approved product objectives into bounded requirements and " +
    "acceptance criteria. Never expands scope silently, never deploys.",
  department: "product",
  domain: "product_specification",
  reportsTo: "executive-cpo",
  allowedCapabilities: ["requirements", "plan", "summarize"],
  inputSchema: {
    type: "object",
    required: ["objective"],
    properties: {
      objective: { type: "string", maxLength: 8000 },
      context: { type: "string", maxLength: 8000 },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: [
      "objective",
      "problem_statement",
      "scope",
      "out_of_scope",
      "requirements",
      "acceptance_criteria",
      "constraints",
      "dependencies",
      "risk_level",
    ],
    properties: {
      objective: { type: "string" },
      problem_statement: { type: "string" },
      scope: { type: "string" },
      out_of_scope: { type: "array", items: { type: "string" } },
      requirements: { type: "array", items: { type: "string" } },
      acceptance_criteria: { type: "array", items: { type: "string" } },
      constraints: { type: "array", items: { type: "string" } },
      dependencies: { type: "array", items: { type: "string" } },
      risk_level: { type: "string" },
    },
  },
});

/** Technical architecture planner (engineering.senior-backend instance). */
export const DELIVERY_ARCHITECT = deliveryAgent({
  slug: "delivery-architect",
  workforceSlug: "engineering.senior-backend",
  name: "Delivery Architect",
  purpose:
    "Produce a technical architecture plan for an approved product specification. " +
    "Does not write code to a repository.",
  department: "engineering",
  domain: "architecture",
  reportsTo: "executive-cto",
  riskClass: "R3",
  allowedCapabilities: ["engineering_plan", "plan", "summarize"],
  inputSchema: {
    type: "object",
    required: ["objective", "product_spec"],
    properties: {
      objective: { type: "string", maxLength: 8000 },
      product_spec: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: [
      "components",
      "affected_areas",
      "interfaces",
      "data_changes",
      "security_considerations",
      "implementation_steps",
      "verification_requirements",
      "rollback_considerations",
    ],
    properties: {
      components: { type: "array" },
      affected_areas: { type: "array" },
      interfaces: { type: "array" },
      data_changes: { type: "array" },
      security_considerations: { type: "array" },
      implementation_steps: { type: "array" },
      verification_requirements: { type: "array" },
      rollback_considerations: { type: "array" },
    },
  },
});

/**
 * Engineering work-package / implementation-result agent.
 * Produces structured implementation plans and claimed change intents —
 * does NOT autonomously modify a repository.
 */
export const DELIVERY_ENGINEER = deliveryAgent({
  slug: "delivery-engineer",
  workforceSlug: "engineering.backend",
  name: "Delivery Engineer",
  purpose:
    "Decompose architecture into engineering work packages and structured " +
    "implementation results. No repository write authority in Wave-2.",
  department: "engineering",
  domain: "implementation_planning",
  reportsTo: "executive-cto",
  riskClass: "R3",
  allowedCapabilities: ["engineering_plan", "plan", "summarize"],
  inputSchema: {
    type: "object",
    required: ["objective", "architecture_plan"],
    properties: {
      objective: { type: "string", maxLength: 8000 },
      product_spec: { type: "object" },
      architecture_plan: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: ["work_packages", "implementation_result", "repository_write_performed"],
    properties: {
      work_packages: { type: "array" },
      implementation_result: { type: "object" },
      repository_write_performed: { type: "boolean" },
      known_risks: { type: "array", items: { type: "string" } },
      proposed_action: { type: "string" },
    },
  },
});

/** Peer engineering review — must not be the same runtime slug as implementer. */
export const DELIVERY_REVIEW = deliveryAgent({
  slug: "delivery-review",
  workforceSlug: "engineering.senior-backend",
  name: "Delivery Engineering Reviewer",
  purpose:
    "Review implementation results for acceptance-criteria coverage, " +
    "architecture conformance, scope control, and unsafe capability requests. " +
    "Internal review only — does not create Founder approval records.",
  department: "engineering",
  domain: "engineering_review",
  reportsTo: "executive-cto",
  riskClass: "R3",
  allowedCapabilities: ["qa_review", "summarize", "plan"],
  inputSchema: {
    type: "object",
    required: ["product_spec", "architecture_plan", "implementation_result"],
    properties: {
      objective: { type: "string", maxLength: 8000 },
      product_spec: { type: "object" },
      architecture_plan: { type: "object" },
      implementation_result: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: ["verdict", "findings", "scope_ok", "architecture_ok"],
    properties: {
      verdict: { type: "string", enum: ["pass", "reject"] },
      findings: { type: "array", items: { type: "string" } },
      scope_ok: { type: "boolean" },
      architecture_ok: { type: "boolean" },
      missing_acceptance_criteria: { type: "array", items: { type: "string" } },
      unsafe_capability_requests: { type: "array", items: { type: "string" } },
    },
  },
});

/**
 * Independent QA (dept.qa) — final release-readiness evidence owner.
 * Must not be the same agent that produced the implementation result.
 */
export const DELIVERY_QA = deliveryAgent({
  slug: "delivery-qa",
  workforceSlug: "qa.release-verifier",
  name: "Delivery Release QA",
  purpose:
    "Independent quality verification against product acceptance criteria, " +
    "architecture requirements, and engineering output. Cannot self-certify " +
    "work it authored. Never approves production actions.",
  department: "qa",
  domain: "independent_quality",
  reportsTo: "executive-cto",
  riskClass: "R3",
  allowedCapabilities: ["qa_review", "test_review", "summarize"],
  inputSchema: {
    type: "object",
    required: ["product_spec", "architecture_plan", "implementation_result", "review_result"],
    properties: {
      objective: { type: "string", maxLength: 8000 },
      product_spec: { type: "object" },
      architecture_plan: { type: "object" },
      implementation_result: { type: "object" },
      review_result: { type: "object" },
      implementer_slug: { type: "string", maxLength: 100 },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: ["qa_plan", "qa_status", "delivery_readiness"],
    properties: {
      qa_plan: { type: "object" },
      qa_status: {
        type: "string",
        enum: ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"],
      },
      delivery_readiness: { type: "object" },
      evidence: { type: "array", items: { type: "string" } },
    },
  },
});

export const WAVE2_AGENT_DEFINITIONS = [
  DELIVERY_PRODUCT,
  DELIVERY_ARCHITECT,
  DELIVERY_ENGINEER,
  DELIVERY_REVIEW,
  DELIVERY_QA,
];

export const WAVE2_SLUGS = WAVE2_AGENT_DEFINITIONS.map((d) => d.slug);

export const SOFTWARE_DELIVERY_STEPS = [
  "delivery-product",
  "delivery-architect",
  "delivery-engineer",
  "delivery-review",
  "delivery-qa",
];

export function getWave2Definition(slug) {
  return WAVE2_AGENT_DEFINITIONS.find((d) => d.slug === slug) || null;
}

export function listExecutableWave2Slugs() {
  return WAVE2_AGENT_DEFINITIONS.filter((d) => d.lifecycleStatus === "active").map(
    (d) => d.slug
  );
}
