// Wave-3 platform agents: DevOps, Security, Infrastructure, Data/AI, Coding Executor.
// Analysis / planning / controlled local workspace edits only — never production mutation.

const DEFAULT_MODEL = "claude-sonnet-4-6";
const DEFAULT_EXECUTION_TIMEOUT_MS = 30000;

const PROHIBITED = [
  "send_email",
  "approve_production_action",
  "deploy_production",
  "rotate_secrets",
  "modify_billing",
  "git_push",
  "git_force_push",
];

function platformAgent({
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
  riskClass = "R3",
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
    wave: "wave-3",
    repositoryWriteAuthority: slug === "coding-executor" ? "workspace_scoped" : false,
    productionMutationAuthority: false,
  };
}

export const CODING_EXECUTOR = platformAgent({
  slug: "coding-executor",
  workforceSlug: "engineering.backend",
  name: "Controlled Coding Executor",
  purpose:
    "Apply bounded edits inside an explicit disposable workspace and produce a " +
    "patch candidate with validation evidence. Never pushes, merges, or deploys.",
  department: "engineering",
  domain: "controlled_coding",
  reportsTo: "executive-cto",
  riskClass: "R3",
  allowedCapabilities: ["engineering_plan", "plan", "summarize"],
  inputSchema: {
    type: "object",
    required: ["objective", "workspace_root", "edits"],
    properties: {
      objective: { type: "string", maxLength: 8000 },
      workspace_root: { type: "string", maxLength: 1000 },
      work_package: { type: "object" },
      edits: { type: "array" },
      allowed_path_prefixes: { type: "array" },
      commands: { type: "array" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: [
      "files_changed",
      "patch_summary",
      "commands_run",
      "test_results",
      "warnings",
      "risk_class",
      "requires_human_review",
    ],
    properties: {
      files_changed: { type: "array" },
      patch_summary: { type: "object" },
      commands_run: { type: "array" },
      test_results: { type: "array" },
      warnings: { type: "array" },
      risk_class: { type: "string" },
      requires_human_review: { type: "boolean" },
      validation_passed: { type: "boolean" },
      pushed: { type: "boolean" },
      merged: { type: "boolean" },
      deployed: { type: "boolean" },
    },
  },
});

export const PLATFORM_SECURITY = platformAgent({
  slug: "platform-security",
  workforceSlug: "security.engineer",
  name: "Platform Security Reviewer",
  purpose:
    "Assess candidate changes for auth, secrets, injection, isolation, and " +
    "production risk. Advisory verdict only — never a production sign-off.",
  department: "security",
  domain: "security_assessment",
  reportsTo: "executive-ciso",
  allowedCapabilities: ["security_review", "summarize", "plan"],
  inputSchema: {
    type: "object",
    required: ["candidate"],
    properties: {
      objective: { type: "string", maxLength: 8000 },
      candidate: { type: "object" },
      prior: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: ["security_status", "findings", "recommendations"],
    properties: {
      security_status: {
        type: "string",
        enum: ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"],
      },
      findings: { type: "array", items: { type: "string" } },
      recommendations: { type: "array", items: { type: "string" } },
      secret_exposure: { type: "boolean" },
      capability_changes: { type: "array" },
      production_impact: { type: "string" },
    },
  },
});

export const PLATFORM_DEVOPS = platformAgent({
  slug: "platform-devops",
  workforceSlug: "devops.cicd",
  name: "Platform DevOps Planner",
  purpose:
    "Produce CI/CD, build/test readiness, deployment and rollback plans. " +
    "Never executes production deploys.",
  department: "devops",
  domain: "cicd_readiness",
  reportsTo: "executive-cto",
  allowedCapabilities: ["plan", "summarize", "engineering_plan"],
  inputSchema: {
    type: "object",
    required: ["candidate"],
    properties: {
      objective: { type: "string", maxLength: 8000 },
      candidate: { type: "object" },
      security: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: [
      "build_status",
      "lint_status",
      "test_status",
      "deployment_plan",
      "rollback_plan",
      "risk_assessment",
    ],
    properties: {
      build_status: { type: "string" },
      lint_status: { type: "string" },
      test_status: { type: "string" },
      artifact_readiness: { type: "string" },
      deployment_plan: { type: "array" },
      rollback_plan: { type: "array" },
      risk_assessment: { type: "string" },
      devops_status: { type: "string" },
    },
  },
});

export const PLATFORM_INFRA = platformAgent({
  slug: "platform-infra",
  workforceSlug: "infrastructure.planner",
  name: "Platform Infrastructure Planner",
  purpose:
    "Assess environment/runtime readiness, health checks, and failure modes. " +
    "No production infrastructure mutation.",
  department: "infrastructure",
  domain: "infrastructure_readiness",
  reportsTo: "executive-cto",
  allowedCapabilities: ["plan", "summarize"],
  inputSchema: {
    type: "object",
    required: ["candidate"],
    properties: {
      objective: { type: "string", maxLength: 8000 },
      candidate: { type: "object" },
      devops: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: [
      "required_services",
      "runtime_dependencies",
      "environment_requirements",
      "health_checks",
      "failure_modes",
      "rollback_considerations",
      "infra_status",
    ],
    properties: {
      required_services: { type: "array" },
      runtime_dependencies: { type: "array" },
      environment_requirements: { type: "array" },
      health_checks: { type: "array" },
      capacity_assumptions: { type: "array" },
      failure_modes: { type: "array" },
      rollback_considerations: { type: "array" },
      infra_status: {
        type: "string",
        enum: ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"],
      },
    },
  },
});

export const PLATFORM_DATA_AI = platformAgent({
  slug: "platform-data-ai",
  workforceSlug: "data-ai.governance",
  name: "Platform Data & AI Governance",
  purpose:
    "Validate provider/model policy, schemas, isolation, and telemetry hygiene. " +
    "No automatic model/provider escalation.",
  department: "data-ai",
  domain: "data_ai_governance",
  reportsTo: "executive-cto",
  allowedCapabilities: ["summarize", "plan", "research_summary"],
  inputSchema: {
    type: "object",
    required: ["candidate"],
    properties: {
      objective: { type: "string", maxLength: 8000 },
      candidate: { type: "object" },
      prior: { type: "object" },
      mode: { type: "string", maxLength: 40 },
    },
  },
  outputSchema: {
    type: "object",
    required: [
      "provider_allowed",
      "model_policy_ok",
      "schema_ok",
      "project_isolation_ok",
      "telemetry_ok",
      "data_ai_status",
    ],
    properties: {
      provider_allowed: { type: "boolean" },
      model_policy_ok: { type: "boolean" },
      fake_provider_for_tests: { type: "boolean" },
      schema_ok: { type: "boolean" },
      project_isolation_ok: { type: "boolean" },
      telemetry_ok: { type: "boolean" },
      sensitive_logging_avoided: { type: "boolean" },
      data_ai_status: {
        type: "string",
        enum: ["PASS", "PASS_WITH_RISKS", "FAIL", "BLOCKED"],
      },
      findings: { type: "array", items: { type: "string" } },
    },
  },
});

export const WAVE3_AGENT_DEFINITIONS = [
  CODING_EXECUTOR,
  PLATFORM_SECURITY,
  PLATFORM_DEVOPS,
  PLATFORM_INFRA,
  PLATFORM_DATA_AI,
];

export const WAVE3_SLUGS = WAVE3_AGENT_DEFINITIONS.map((d) => d.slug);

export const PLATFORM_CANDIDATE_STEPS = [
  "coding-executor",
  "platform-security",
  "platform-devops",
  "platform-infra",
  "platform-data-ai",
];

export const CONTROLLED_DELIVERY_STEPS = [
  "delivery-product",
  "delivery-architect",
  "delivery-engineer",
  "coding-executor",
  "delivery-review",
  "platform-security",
  "delivery-qa",
  "platform-devops",
  "platform-infra",
  "platform-data-ai",
];

export function getWave3Definition(slug) {
  return WAVE3_AGENT_DEFINITIONS.find((d) => d.slug === slug) || null;
}
