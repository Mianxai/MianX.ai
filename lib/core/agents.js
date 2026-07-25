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

export const CAPABILITIES = {
  READ_LEAD: "read_lead",
  SCORE_LEAD: "score_lead",
  DRAFT_TEXT: "draft_text",
  SUMMARIZE: "summarize",
  RESEARCH_SUMMARY: "research_summary",
  QA_REVIEW: "qa_review",
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
  },
];

const BY_SLUG = new Map(AGENT_DEFINITIONS.map((a) => [a.slug, a]));

export function listAgentDefinitions() {
  return AGENT_DEFINITIONS.map((a) => ({ ...a }));
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
