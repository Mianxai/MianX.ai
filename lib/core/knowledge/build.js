// Knowledge view — expose existing scoped audit/runs; no new RAG platform.

import * as repo from "@/lib/core/repo";

/**
 * @param {{ projectId?: string|null }} opts
 */
export async function buildKnowledgeView({ projectId = null } = {}) {
  const sections = {
    organization: {
      label: "Organization knowledge",
      note: "Platform catalog and shared operating definitions (not client data).",
      href: "/admin/command-center",
      items: [],
    },
    project: {
      label: "Project knowledge",
      note: projectId
        ? "Project-scoped tasks and audit trail."
        : "Select a project to load project knowledge.",
      href: projectId
        ? `/admin/runtime/audit?project_id=${encodeURIComponent(projectId)}`
        : "/admin/runtime/audit",
      items: [],
      available: Boolean(projectId),
    },
    workflow_outputs: {
      label: "Workflow outputs",
      note: "Completed run outputs live under Outputs / Runtime runs.",
      href: projectId
        ? `/admin/outputs?project_id=${encodeURIComponent(projectId)}`
        : "/admin/outputs",
      items: [],
    },
    agent_results: {
      label: "Agent results",
      note: "Per-agent run results — project scoped when selected.",
      href: projectId
        ? `/admin/runtime/runs?project_id=${encodeURIComponent(projectId)}`
        : "/admin/runtime/runs",
      items: [],
    },
  };

  if (!projectId) {
    return {
      generatedAt: new Date().toISOString(),
      projectId: null,
      available: false,
      label: "Select a project for scoped knowledge",
      sections,
      isolationNote:
        "Server-side project isolation remains authoritative. No cross-project knowledge is listed here.",
    };
  }

  try {
    const audit = await repo.listAuditLogs({ projectId });
    sections.project.items = (audit || []).slice(0, 25).map((row) => ({
      id: row.id,
      action: row.action,
      resourceType: row.resource_type,
      resourceId: row.resource_id,
      createdAt: row.created_at,
    }));
    const runs = await repo.listRuns({ projectId });
    sections.agent_results.items = (runs || []).slice(0, 25).map((r) => ({
      id: r.id,
      agentSlug: r.agent_slug,
      status: r.status,
      workflow: r.workflow,
      createdAt: r.created_at,
    }));
    sections.workflow_outputs.items = sections.agent_results.items.filter(
      (r) => r.workflow
    );
  } catch {
    return {
      generatedAt: new Date().toISOString(),
      projectId,
      available: false,
      label: "Data unavailable",
      sections,
      isolationNote:
        "Server-side project isolation remains authoritative. No cross-project knowledge is listed here.",
    };
  }

  return {
    generatedAt: new Date().toISOString(),
    projectId,
    available: true,
    sections,
    isolationNote:
      "Server-side project isolation remains authoritative. No cross-project knowledge is listed here.",
  };
}
