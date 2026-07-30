/**
 * Canonical tool registry — Phase I.1 safe internal + controlled engineering + protected.
 */

export const TOOL_RISK = Object.freeze({
  SAFE: "safe",
  CONTROLLED: "controlled",
  PROTECTED: "protected",
});

function tool(partial) {
  return {
    version: 1,
    risk: TOOL_RISK.SAFE,
    requiresFounderApproval: false,
    inputSchema: { type: "object", properties: {} },
    description: "",
    ...partial,
  };
}

export const TOOL_DEFINITIONS = Object.freeze([
  tool({
    name: "knowledge.search",
    description: "Search indexed MianX documentation for relevant passages.",
    inputSchema: {
      type: "object",
      required: ["query"],
      properties: {
        query: { type: "string", maxLength: 500 },
        limit: { type: "number" },
      },
    },
  }),
  tool({
    name: "knowledge.read",
    description: "Read a specific documentation path from the knowledge index.",
    inputSchema: {
      type: "object",
      required: ["path"],
      properties: { path: { type: "string", maxLength: 500 } },
    },
  }),
  tool({
    name: "memory.search",
    description: "Search verified project-scoped memory.",
    inputSchema: {
      type: "object",
      required: ["query"],
      properties: { query: { type: "string", maxLength: 500 } },
    },
  }),
  tool({
    name: "memory.propose",
    description: "Propose a memory candidate (never auto-promotes).",
    inputSchema: {
      type: "object",
      required: ["content"],
      properties: { content: { type: "string", maxLength: 4000 } },
    },
  }),
  tool({
    name: "project.read_context",
    description: "Read bounded project context metadata.",
    inputSchema: { type: "object", properties: {} },
  }),
  tool({
    name: "objective.read",
    description: "Read the current objective.",
    inputSchema: {
      type: "object",
      properties: { objectiveId: { type: "string" } },
    },
  }),
  tool({
    name: "task.read",
    description: "Read a task by id within the project.",
    inputSchema: {
      type: "object",
      required: ["taskId"],
      properties: { taskId: { type: "string" } },
    },
  }),
  tool({
    name: "task.create_child",
    description: "Create a durable child task under the current task.",
    inputSchema: {
      type: "object",
      required: ["title"],
      properties: {
        title: { type: "string", maxLength: 200 },
        acceptanceCriteria: { type: "string", maxLength: 2000 },
      },
    },
  }),
  tool({
    name: "task.update_progress",
    description: "Update progress notes on the current task.",
    inputSchema: {
      type: "object",
      required: ["note"],
      properties: { note: { type: "string", maxLength: 2000 } },
    },
  }),
  tool({
    name: "workflow.read",
    description: "Read workflow definition metadata.",
    inputSchema: {
      type: "object",
      properties: { workflowId: { type: "string" } },
    },
  }),
  tool({
    name: "workflow.propose_transition",
    description: "Propose a workflow stage transition (does not auto-apply protected gates).",
    inputSchema: {
      type: "object",
      required: ["toStage"],
      properties: { toStage: { type: "string", maxLength: 80 } },
    },
  }),
  tool({
    name: "artifact.create",
    description: "Create a structured artifact record.",
    inputSchema: {
      type: "object",
      required: ["title", "body"],
      properties: {
        title: { type: "string", maxLength: 200 },
        body: { type: "string", maxLength: 8000 },
      },
    },
  }),
  tool({
    name: "artifact.read",
    description: "Read an artifact by id.",
    inputSchema: {
      type: "object",
      required: ["artifactId"],
      properties: { artifactId: { type: "string" } },
    },
  }),
  tool({
    name: "evidence.record",
    description: "Record durable evidence for the current task.",
    inputSchema: {
      type: "object",
      required: ["summary"],
      properties: { summary: { type: "string", maxLength: 4000 } },
    },
  }),
  tool({
    name: "audit.record",
    description: "Append an audit note (no secrets).",
    inputSchema: {
      type: "object",
      required: ["action"],
      properties: { action: { type: "string", maxLength: 120 } },
    },
  }),
  tool({
    name: "agent.delegate",
    description: "Delegate a bounded child task to another agent.",
    inputSchema: {
      type: "object",
      required: ["childAgentSlug", "title"],
      properties: {
        childAgentSlug: { type: "string", maxLength: 100 },
        title: { type: "string", maxLength: 200 },
      },
    },
  }),
  tool({
    name: "agent.request_review",
    description: "Request independent QA/security review.",
    inputSchema: {
      type: "object",
      required: ["reviewerSlug"],
      properties: { reviewerSlug: { type: "string", maxLength: 100 } },
    },
  }),
  tool({
    name: "analytics.record_metric",
    description: "Record a non-sensitive analytics metric.",
    inputSchema: {
      type: "object",
      required: ["name", "value"],
      properties: {
        name: { type: "string", maxLength: 80 },
        value: { type: "number" },
      },
    },
  }),
  // Controlled engineering (sandbox only)
  tool({
    name: "workspace.list_files",
    risk: TOOL_RISK.CONTROLLED,
    description: "List files in the isolated workspace sandbox.",
    inputSchema: {
      type: "object",
      properties: { prefix: { type: "string", maxLength: 200 } },
    },
  }),
  tool({
    name: "workspace.read_file",
    risk: TOOL_RISK.CONTROLLED,
    description: "Read a file from the isolated workspace sandbox.",
    inputSchema: {
      type: "object",
      required: ["path"],
      properties: { path: { type: "string", maxLength: 400 } },
    },
  }),
  tool({
    name: "workspace.search_code",
    risk: TOOL_RISK.CONTROLLED,
    description: "Search code inside the isolated workspace sandbox.",
    inputSchema: {
      type: "object",
      required: ["query"],
      properties: { query: { type: "string", maxLength: 200 } },
    },
  }),
  tool({
    name: "workspace.create_patch_candidate",
    risk: TOOL_RISK.CONTROLLED,
    description: "Create a patch candidate (never pushes or deploys).",
    inputSchema: {
      type: "object",
      required: ["summary", "diff"],
      properties: {
        summary: { type: "string", maxLength: 500 },
        diff: { type: "string", maxLength: 20000 },
      },
    },
  }),
  tool({
    name: "workspace.run_allowed_test",
    risk: TOOL_RISK.CONTROLLED,
    description: "Run an allowlisted test command in the sandbox.",
    inputSchema: {
      type: "object",
      required: ["suite"],
      properties: { suite: { type: "string", maxLength: 80 } },
    },
  }),
  // Protected — Founder approval only
  ...[
    "production_deployment",
    "financial_transaction",
    "legal_acceptance",
    "external_email_send",
    "destructive_database_change",
    "secret_rotation",
    "permission_escalation",
    "public_release",
  ].map((name) =>
    tool({
      name,
      risk: TOOL_RISK.PROTECTED,
      requiresFounderApproval: true,
      description: `Protected action ${name} — creates Founder approval; never auto-executes.`,
      inputSchema: { type: "object", properties: { rationale: { type: "string" } } },
    })
  ),
]);

const BY_NAME = new Map(TOOL_DEFINITIONS.map((t) => [t.name, t]));

export function listToolDefinitions() {
  return TOOL_DEFINITIONS.map((t) => ({ ...t }));
}

export function getToolDefinition(name) {
  const t = BY_NAME.get(name);
  return t ? { ...t } : null;
}

export function isProtectedTool(name) {
  return getToolDefinition(name)?.risk === TOOL_RISK.PROTECTED;
}

export function toOpenAiToolSpecs(allowedNames = null) {
  const allow = allowedNames ? new Set(allowedNames) : null;
  return TOOL_DEFINITIONS.filter((t) => t.risk !== TOOL_RISK.PROTECTED)
    .filter((t) => !allow || allow.has(t.name))
    .map((t) => ({
      type: "function",
      function: {
        name: t.name,
        description: t.description,
        parameters: t.inputSchema,
      },
    }));
}
