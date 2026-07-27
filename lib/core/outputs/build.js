// Project-scoped outputs from existing run rows — no duplicate storage.

import * as repo from "@/lib/core/repo";

const KIND_FROM_SLUG = {
  "executive-ceo": "executive_synthesis",
  research: "research_result",
  "research-evidence": "research_result",
  "delivery-product": "product_spec",
  "delivery-architect": "architecture_plan",
  "delivery-qa": "qa_result",
  "test-qa": "qa_result",
  "qa-review": "qa_result",
  "security-review": "security_result",
  "delivery-security": "security_result",
  "follow-up-draft": "sales_draft",
  "lead-intelligence": "sales_draft",
  "marketing-content": "marketing_plan",
  "seo-specialist": "marketing_plan",
  "analytics-insights": "analytics_report",
  "ops-incident": "incident_summary",
};

function kindFor(run) {
  const slug = run.agent_slug || "";
  if (KIND_FROM_SLUG[slug]) return KIND_FROM_SLUG[slug];
  if (run.workflow === "enterprise-objective") return "executive_synthesis";
  if (run.workflow) return "agent_result";
  return "agent_result";
}

function summarizeOutput(output) {
  if (!output || typeof output !== "object") return null;
  const summary =
    output.summary ||
    output.synthesis ||
    output.verdict ||
    output.plan?.[0] ||
    null;
  if (typeof summary === "string") return summary.slice(0, 240);
  return null;
}

/**
 * @param {{ projectId?: string|null, workflow?: string|null, agentSlug?: string|null }} opts
 */
export async function buildOutputsView({
  projectId = null,
  workflow = null,
  agentSlug = null,
} = {}) {
  if (!projectId) {
    return {
      generatedAt: new Date().toISOString(),
      projectId: null,
      available: false,
      label: "Data unavailable",
      note: "Select a project to list scoped run outputs.",
      items: [],
    };
  }

  let runs = [];
  try {
    runs = await repo.listRuns({ projectId });
  } catch {
    return {
      generatedAt: new Date().toISOString(),
      projectId,
      available: false,
      label: "Data unavailable",
      note: "Could not load runs for this project.",
      items: [],
    };
  }

  let items = (runs || []).map((run) => ({
    id: run.id,
    kind: kindFor(run),
    agentSlug: run.agent_slug || null,
    workflow: run.workflow || null,
    status: run.status || null,
    createdAt: run.created_at || null,
    summary: summarizeOutput(run.output),
    href: `/admin/runtime/runs?project_id=${encodeURIComponent(projectId)}`,
  }));

  if (workflow) {
    items = items.filter((i) => i.workflow === workflow);
  }
  if (agentSlug) {
    items = items.filter((i) => i.agentSlug === agentSlug);
  }

  return {
    generatedAt: new Date().toISOString(),
    projectId,
    available: true,
    items,
    note: "Outputs are aggregated from existing agent runs — not a separate store.",
  };
}
