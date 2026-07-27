// Mianx Core agent registry.
//
// This is the truthful, minimal first agent set for the runtime. Each entry
// describes exactly what the agent may and may not do. Capabilities listed
// here are enforced by the approval policy (lib/core/approvals.js) and the
// provider adapter — an agent cannot perform anything not in
// allowedCapabilities, and any capability in PROTECTED_CAPABILITIES requires
// a human approval before a run may execute it.
//
// We deliberately do NOT claim autonomous email sending, browsing, or any
// production side effect. These agents produce structured analysis only.

import { WAVE1_AGENT_DEFINITIONS } from "./executive/agents";
import { WAVE2_AGENT_DEFINITIONS } from "./delivery/agents";
import { WAVE3_AGENT_DEFINITIONS } from "./platform/agents";

export const CAPABILITIES = {
  READ_LEAD: "read_lead",
  SCORE_LEAD: "score_lead",
  DRAFT_TEXT: "draft_text",
  SUMMARIZE: "summarize",
  RESEARCH_SUMMARY: "research_summary",
  QA_REVIEW: "qa_review",
  PLAN: "plan",
  REQUIREMENTS: "requirements",
  ENGINEERING_PLAN: "engineering_plan",
  TEST_REVIEW: "test_review",
  SECURITY_REVIEW: "security_review",
  RELEASE_RECOMMEND: "release_recommend",
  FOLLOW_UP_DRAFT: "follow_up_draft",
  // Wave-1 executive control plane (analysis / recommend only).
  ORCHESTRATE: "orchestrate",
  DELEGATE: "delegate",
  // Protected: never executed without a human approval record.
  SEND_EMAIL: "send_email",
  APPROVE_PRODUCTION_ACTION: "approve_production_action",
};

// Capabilities that always require a human approval before a run executes.
export const PROTECTED_CAPABILITIES = [
  CAPABILITIES.SEND_EMAIL,
  CAPABILITIES.APPROVE_PRODUCTION_ACTION,
];

const DEFAULT_MODEL = "claude-sonnet-4-6";
const DEFAULT_EXECUTION_TIMEOUT_MS = 30000;

// Entries carry a lifecycleStatus of "draft" | "active" | "deprecated" (the
// same values the agent_definitions table allows). Only "active" definitions
// are executable — draft entries are catalog-visible design contracts and the
// runtime refuses to register them (see isAgentExecutable / registerAgent).

export const AGENT_DEFINITIONS = [
  {
    slug: "lead-intelligence",
    version: 1,
    name: "Lead Intelligence Agent",
    purpose:
      "Evaluate a submitted lead and produce a structured score, summary and " +
      "recommended next actions for a human to act on.",
    allowedCapabilities: [
      CAPABILITIES.READ_LEAD,
      CAPABILITIES.SCORE_LEAD,
      CAPABILITIES.SUMMARIZE,
      CAPABILITIES.DRAFT_TEXT,
    ],
    prohibitedCapabilities: [
      CAPABILITIES.SEND_EMAIL,
      CAPABILITIES.APPROVE_PRODUCTION_ACTION,
    ],
    inputSchema: {
      type: "object",
      required: ["email", "message"],
      properties: {
        name: { type: "string", maxLength: 200 },
        email: { type: "string", format: "email" },
        company: { type: "string", maxLength: 200 },
        industry: { type: "string", maxLength: 40 },
        message: { type: "string", maxLength: 4000 },
      },
    },
    outputSchema: {
      type: "object",
      required: ["score", "temperature", "summary", "next_actions"],
      properties: {
        score: { type: "number", minimum: 0, maximum: 100 },
        temperature: { type: "string", enum: ["hot", "warm", "cold"] },
        summary: { type: "string" },
        next_actions: { type: "array", items: { type: "string" } },
        // Draft reply for a human to review — never sent automatically.
        draft_reply: { type: "string" },
      },
    },
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval: false,
    lifecycleStatus: "active",
    enabledByDefault: true,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
  },
  {
    slug: "research",
    version: 1,
    name: "Research Agent",
    purpose:
      "Accept a bounded research question and produce structured findings and " +
      "sources-of-reasoning when an AI provider is configured. No live " +
      "browsing or external actions.",
    allowedCapabilities: [
      CAPABILITIES.RESEARCH_SUMMARY,
      CAPABILITIES.SUMMARIZE,
    ],
    prohibitedCapabilities: [
      CAPABILITIES.SEND_EMAIL,
      CAPABILITIES.APPROVE_PRODUCTION_ACTION,
    ],
    inputSchema: {
      type: "object",
      required: ["question"],
      properties: {
        question: { type: "string", maxLength: 2000 },
        context: { type: "string", maxLength: 4000 },
      },
    },
    outputSchema: {
      type: "object",
      required: ["summary", "findings"],
      properties: {
        summary: { type: "string" },
        findings: { type: "array", items: { type: "string" } },
        open_questions: { type: "array", items: { type: "string" } },
      },
    },
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval: false,
    lifecycleStatus: "active",
    enabledByDefault: true,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
  },
  {
    slug: "qa-review",
    version: 1,
    name: "QA Review Agent",
    purpose:
      "Review a supplied result against acceptance criteria and return a " +
      "pass/fail verdict with issues and recommendations. It can never " +
      "approve its own protected production action.",
    allowedCapabilities: [CAPABILITIES.QA_REVIEW],
    prohibitedCapabilities: [
      CAPABILITIES.SEND_EMAIL,
      CAPABILITIES.APPROVE_PRODUCTION_ACTION,
    ],
    inputSchema: {
      type: "object",
      required: ["result", "acceptance_criteria"],
      properties: {
        result: { type: "string", maxLength: 8000 },
        acceptance_criteria: { type: "string", maxLength: 4000 },
      },
    },
    outputSchema: {
      type: "object",
      required: ["verdict", "issues", "recommendations"],
      properties: {
        verdict: { type: "string", enum: ["pass", "fail"] },
        issues: { type: "array", items: { type: "string" } },
        recommendations: { type: "array", items: { type: "string" } },
      },
    },
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval: false,
    lifecycleStatus: "active",
    enabledByDefault: true,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
  },

  // --- Draft definitions ---------------------------------------------------
  // Not executable. These describe planned runtime agents so the contract is
  // reviewable before any of them is promoted to "active". None of them may be
  // presented as a working agent.
  {
    slug: "workflow-orchestrator",
    version: 1,
    name: "Workflow Orchestrator Agent (draft)",
    purpose:
      "Propose the order of steps for a multi-step request and name the risks " +
      "of that ordering. It plans only — it never executes a step, calls " +
      "another agent or takes any external action.",
    allowedCapabilities: [CAPABILITIES.PLAN, CAPABILITIES.SUMMARIZE],
    prohibitedCapabilities: [
      CAPABILITIES.SEND_EMAIL,
      CAPABILITIES.APPROVE_PRODUCTION_ACTION,
    ],
    inputSchema: {
      type: "object",
      required: ["objective"],
      properties: {
        objective: { type: "string", maxLength: 4000 },
        constraints: { type: "string", maxLength: 4000 },
      },
    },
    outputSchema: {
      type: "object",
      required: ["plan", "risks"],
      properties: {
        plan: { type: "array", items: { type: "string" } },
        risks: { type: "array", items: { type: "string" } },
      },
    },
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval: false,
    lifecycleStatus: "draft",
    enabledByDefault: false,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
  },
  {
    slug: "requirements-analyst",
    version: 1,
    name: "Requirements Analyst Agent (draft)",
    purpose:
      "Turn a free-form request into structured requirements, stated " +
      "assumptions and the open questions a human must answer.",
    allowedCapabilities: [CAPABILITIES.REQUIREMENTS, CAPABILITIES.SUMMARIZE],
    prohibitedCapabilities: [
      CAPABILITIES.SEND_EMAIL,
      CAPABILITIES.APPROVE_PRODUCTION_ACTION,
    ],
    inputSchema: {
      type: "object",
      required: ["request"],
      properties: {
        request: { type: "string", maxLength: 8000 },
      },
    },
    outputSchema: {
      type: "object",
      required: ["summary", "requirements", "assumptions", "open_questions"],
      properties: {
        summary: { type: "string" },
        requirements: { type: "array", items: { type: "string" } },
        assumptions: { type: "array", items: { type: "string" } },
        open_questions: { type: "array", items: { type: "string" } },
      },
    },
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval: false,
    lifecycleStatus: "draft",
    enabledByDefault: false,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
  },
  {
    slug: "engineering-planning",
    version: 1,
    name: "Engineering Planning Agent (draft)",
    purpose:
      "Produce an engineering plan and proposed patch descriptions from a set " +
      "of requirements. It proposes only: it never writes to a repository, " +
      "opens or merges a pull request, or mutates anything on GitHub.",
    allowedCapabilities: [
      CAPABILITIES.ENGINEERING_PLAN,
      CAPABILITIES.SUMMARIZE,
    ],
    prohibitedCapabilities: [
      CAPABILITIES.SEND_EMAIL,
      CAPABILITIES.APPROVE_PRODUCTION_ACTION,
    ],
    inputSchema: {
      type: "object",
      required: ["requirements"],
      properties: {
        requirements: { type: "string", maxLength: 8000 },
        context: { type: "string", maxLength: 4000 },
      },
    },
    outputSchema: {
      type: "object",
      required: ["summary", "work_items", "risks", "test_plan"],
      properties: {
        summary: { type: "string" },
        work_items: { type: "array", items: { type: "string" } },
        risks: { type: "array", items: { type: "string" } },
        test_plan: { type: "array", items: { type: "string" } },
      },
    },
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval: false,
    lifecycleStatus: "draft",
    enabledByDefault: false,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
  },
  {
    slug: "test-qa",
    version: 1,
    name: "Test QA Agent (draft)",
    purpose:
      "Review supplied test evidence for a change and return a pass/fail " +
      "verdict with the issues found. It never runs tests itself and never " +
      "approves a production action.",
    allowedCapabilities: [CAPABILITIES.TEST_REVIEW, CAPABILITIES.QA_REVIEW],
    prohibitedCapabilities: [
      CAPABILITIES.SEND_EMAIL,
      CAPABILITIES.APPROVE_PRODUCTION_ACTION,
    ],
    inputSchema: {
      type: "object",
      required: ["change_summary", "evidence"],
      properties: {
        change_summary: { type: "string", maxLength: 4000 },
        evidence: { type: "string", maxLength: 8000 },
      },
    },
    outputSchema: {
      type: "object",
      required: ["verdict", "issues", "recommendations"],
      properties: {
        verdict: { type: "string", enum: ["pass", "fail"] },
        issues: { type: "array", items: { type: "string" } },
        recommendations: { type: "array", items: { type: "string" } },
      },
    },
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval: false,
    lifecycleStatus: "draft",
    enabledByDefault: false,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
  },
  {
    slug: "security-review",
    version: 1,
    name: "Security Review Agent (draft)",
    purpose:
      "Review supplied security evidence for a change and report findings. " +
      "Its verdict is advisory input for a human reviewer, never a sign-off.",
    allowedCapabilities: [CAPABILITIES.SECURITY_REVIEW, CAPABILITIES.SUMMARIZE],
    prohibitedCapabilities: [
      CAPABILITIES.SEND_EMAIL,
      CAPABILITIES.APPROVE_PRODUCTION_ACTION,
    ],
    inputSchema: {
      type: "object",
      required: ["change_summary", "evidence"],
      properties: {
        change_summary: { type: "string", maxLength: 4000 },
        evidence: { type: "string", maxLength: 8000 },
      },
    },
    outputSchema: {
      type: "object",
      required: ["verdict", "findings", "recommendations"],
      properties: {
        verdict: { type: "string", enum: ["pass", "fail", "needs_review"] },
        findings: { type: "array", items: { type: "string" } },
        recommendations: { type: "array", items: { type: "string" } },
      },
    },
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval: true,
    lifecycleStatus: "draft",
    enabledByDefault: false,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
  },
  {
    slug: "release-readiness",
    version: 1,
    name: "Release Readiness Agent (draft)",
    purpose:
      "Weigh QA and security verdicts into a go / no_go / hold release " +
      "recommendation with blockers. It recommends only — it can never " +
      "deploy, promote or release anything.",
    allowedCapabilities: [
      CAPABILITIES.RELEASE_RECOMMEND,
      CAPABILITIES.SUMMARIZE,
    ],
    prohibitedCapabilities: [
      CAPABILITIES.SEND_EMAIL,
      CAPABILITIES.APPROVE_PRODUCTION_ACTION,
    ],
    inputSchema: {
      type: "object",
      required: ["change_summary", "qa_verdict", "security_verdict"],
      properties: {
        change_summary: { type: "string", maxLength: 4000 },
        qa_verdict: { type: "string", maxLength: 40 },
        security_verdict: { type: "string", maxLength: 40 },
      },
    },
    outputSchema: {
      type: "object",
      required: ["recommendation", "rationale", "blockers"],
      properties: {
        recommendation: { type: "string", enum: ["go", "no_go", "hold"] },
        rationale: { type: "string" },
        blockers: { type: "array", items: { type: "string" } },
      },
    },
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval: true,
    lifecycleStatus: "draft",
    enabledByDefault: false,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
  },
  {
    slug: "follow-up-draft",
    version: 1,
    name: "Follow-up Draft Agent (draft)",
    purpose:
      "Draft follow-up or outreach text for a human to review, edit and send. " +
      "It never sends anything itself.",
    allowedCapabilities: [CAPABILITIES.FOLLOW_UP_DRAFT, CAPABILITIES.DRAFT_TEXT],
    prohibitedCapabilities: [
      CAPABILITIES.SEND_EMAIL,
      CAPABILITIES.APPROVE_PRODUCTION_ACTION,
    ],
    inputSchema: {
      type: "object",
      required: ["context"],
      properties: {
        context: { type: "string", maxLength: 8000 },
        audience: { type: "string", maxLength: 200 },
      },
    },
    outputSchema: {
      type: "object",
      required: ["draft_body", "caveats"],
      properties: {
        subject: { type: "string" },
        draft_body: { type: "string" },
        caveats: { type: "array", items: { type: "string" } },
      },
    },
    defaultProvider: "anthropic",
    defaultModel: DEFAULT_MODEL,
    requiresHumanApproval: true,
    lifecycleStatus: "draft",
    enabledByDefault: false,
    executionTimeoutMs: DEFAULT_EXECUTION_TIMEOUT_MS,
  },
  ...WAVE1_AGENT_DEFINITIONS,
  ...WAVE2_AGENT_DEFINITIONS,
  ...WAVE3_AGENT_DEFINITIONS,
];

const BY_SLUG = new Map(AGENT_DEFINITIONS.map((a) => [a.slug, a]));

// Full catalog, including draft (non-executable) entries.
export function listAgentDefinitions() {
  return AGENT_DEFINITIONS.map((a) => ({ ...a }));
}

// True only for definitions the runtime is allowed to register and run.
export function isAgentExecutable(def) {
  return def?.lifecycleStatus === "active";
}

// The executable subset — use this for any "operational agents" count or
// anywhere a draft definition must not be offered.
export function listActiveAgentDefinitions() {
  return AGENT_DEFINITIONS.filter(isAgentExecutable).map((a) => ({ ...a }));
}

export function getAgentDefinition(slug) {
  const def = BY_SLUG.get(slug);
  return def ? { ...def } : null;
}

// Converts a registry entry into the row shape expected by the
// agent_definitions table (snake_case jsonb columns).
export function toAgentDefinitionRow(def) {
  return {
    slug: def.slug,
    version: def.version,
    name: def.name,
    purpose: def.purpose,
    allowed_capabilities: def.allowedCapabilities,
    prohibited_capabilities: def.prohibitedCapabilities,
    input_schema: def.inputSchema,
    output_schema: def.outputSchema,
    default_provider: def.defaultProvider,
    default_model: def.defaultModel,
    requires_human_approval: def.requiresHumanApproval,
    lifecycle_status: def.lifecycleStatus,
  };
}

// Lightweight input validation against a registry entry's declared required
// fields and string maxLengths. Returns { valid, errors }.
export function validateAgentInput(def, input) {
  const errors = {};
  const schema = def?.inputSchema;
  const obj = input && typeof input === "object" && !Array.isArray(input) ? input : {};
  if (!schema || typeof schema !== "object") return { valid: true, errors };

  for (const req of schema.required || []) {
    const val = obj[req];
    if (val === undefined || val === null || val === "") {
      errors[req] = "This field is required.";
    }
  }
  for (const [key, rule] of Object.entries(schema.properties || {})) {
    if (!(key in obj) || obj[key] == null) continue;
    const val = obj[key];
    if (rule.type === "string") {
      if (typeof val !== "string") {
        errors[key] = "Must be a string.";
      } else if (rule.maxLength && val.length > rule.maxLength) {
        errors[key] = `Must be at most ${rule.maxLength} characters.`;
      } else if (rule.format === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        errors[key] = "Must be a valid email.";
      }
    } else if (rule.type === "number") {
      if (typeof val !== "number" || !Number.isFinite(val)) {
        errors[key] = "Must be a number.";
      } else if (rule.minimum !== undefined && val < rule.minimum) {
        errors[key] = `Must be at least ${rule.minimum}.`;
      } else if (rule.maximum !== undefined && val > rule.maximum) {
        errors[key] = `Must be at most ${rule.maximum}.`;
      }
    }
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

// Structured output validation against a registry entry's outputSchema.
// Enforces required fields, primitive types, numeric bounds, string enums and
// arrays-of-strings so an unvalidated model response can never be persisted
// as a "succeeded" result. Returns { valid, errors }.
export function validateAgentOutput(def, output) {
  const errors = {};
  const schema = def?.outputSchema || def?.output_schema;
  if (!schema || typeof schema !== "object") return { valid: true, errors };
  if (!output || typeof output !== "object" || Array.isArray(output)) {
    return { valid: false, errors: { output: "Output must be a JSON object." } };
  }

  for (const req of schema.required || []) {
    if (output[req] === undefined || output[req] === null) {
      errors[req] = "This field is required.";
    }
  }
  for (const [key, rule] of Object.entries(schema.properties || {})) {
    if (!(key in output) || output[key] == null) continue;
    const val = output[key];
    if (rule.type === "string") {
      if (typeof val !== "string") errors[key] = "Must be a string.";
      else if (rule.enum && !rule.enum.includes(val)) {
        errors[key] = `Must be one of: ${rule.enum.join(", ")}.`;
      }
    } else if (rule.type === "number") {
      if (typeof val !== "number" || !Number.isFinite(val)) {
        errors[key] = "Must be a number.";
      } else if (rule.minimum !== undefined && val < rule.minimum) {
        errors[key] = `Must be at least ${rule.minimum}.`;
      } else if (rule.maximum !== undefined && val > rule.maximum) {
        errors[key] = `Must be at most ${rule.maximum}.`;
      }
    } else if (rule.type === "array") {
      if (!Array.isArray(val)) {
        errors[key] = "Must be an array.";
      } else if (rule.items?.type === "string" && val.some((v) => typeof v !== "string")) {
        errors[key] = "Every item must be a string.";
      }
    }
  }
  return { valid: Object.keys(errors).length === 0, errors };
}
