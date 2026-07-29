// Knowledge view — expose existing scoped stores; no new RAG platform.

import * as repo from "@/lib/core/repo";
import { listMemory } from "@/lib/core/memory";
import { listPersistedIntegrationRuns } from "@/lib/core/integration/persist.js";
import { buildProjectOperationalSummary } from "@/lib/core/founder-operations";

/**
 * @param {{ projectId?: string|null }} opts
 */
export async function buildKnowledgeView({ projectId = null } = {}) {
  const qs = projectId ? `?project_id=${encodeURIComponent(projectId)}` : "";
  const sections = {
    organization: {
      label: "Organization operating knowledge",
      note: "Platform operating definitions and global catalogues. Not empty merely because project audit is empty.",
      href: "/admin/templates",
      action_label: "Open Templates catalogue",
      items: [
        {
          id: "org-templates",
          action: "global_template_catalogue",
          resourceType: "templates",
          resourceId: "platform",
          createdAt: null,
        },
        {
          id: "org-workforce",
          action: "workforce_capacity_registry",
          resourceType: "workforce",
          resourceId: "445_slots",
          createdAt: null,
        },
      ],
    },
    global_templates: {
      label: "Global template catalogue",
      note: "Reusable platform templates (organisation-wide).",
      href: "/admin/templates",
      action_label: "Open Templates",
      items: [],
    },
    project: {
      label: "Project knowledge",
      note: projectId
        ? "Project-scoped audit and task trail."
        : "Select a project to load project knowledge.",
      href: `/admin/runtime/audit${qs}`,
      action_label: "Open Audit",
      items: [],
      available: Boolean(projectId),
    },
    workflow_outputs: {
      label: "Workflow outputs",
      note: "Completed workflow/run outputs.",
      href: `/admin/outputs${qs}`,
      action_label: "Open Outputs",
      items: [],
    },
    agent_results: {
      label: "Agent results",
      note: "Agent Runtime Runs — not Integration Founder Proof runs.",
      href: `/admin/runtime/runs${qs}`,
      action_label: "Open Agent Results",
      items: [],
    },
    integration_evidence: {
      label: "Integration evidence",
      note: "Evidence attached to Integration / Founder Proof runs.",
      href: projectId
        ? `/admin/integration?project_id=${encodeURIComponent(projectId)}&tab=evidence`
        : "/admin/integration",
      action_label: "Open Integration Evidence",
      items: [],
    },
    verified_memory: {
      label: "Verified memory",
      note: "Only verified/active memory entries are trusted.",
      href: `/admin/memory${qs}`,
      action_label: "Open Memory",
      items: [],
    },
  };

  let operational = null;
  if (projectId) {
    try {
      operational = await buildProjectOperationalSummary({ projectId });
    } catch {
      operational = null;
    }
  }

  if (!projectId) {
    return {
      generatedAt: new Date().toISOString(),
      projectId: null,
      available: false,
      label: "Select a project for scoped knowledge",
      sections,
      operational,
      isolationNote:
        "Server-side project isolation remains authoritative. Organisation catalogue sections remain available without a project.",
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
    sections.workflow_outputs.items = sections.agent_results.items.filter((r) => r.workflow);

    const mem = await listMemory({ projectId });
    sections.verified_memory.items = (mem || [])
      .filter((m) =>
        ["verified", "active", "validated"].includes(m.verification_status)
      )
      .slice(0, 25)
      .map((m) => ({
        id: m.id,
        action: m.memory_type,
        resourceType: "memory",
        resourceId: m.id,
        createdAt: m.created_at,
      }));

    const integrationRuns = await listPersistedIntegrationRuns({
      project_id: projectId,
      limit: 20,
    });
    sections.integration_evidence.items = (integrationRuns || []).map((r) => ({
      id: r.id,
      action: r.current_stage || r.status,
      resourceType: "integration_run",
      resourceId: r.id,
      createdAt: r.started_at || r.created_at,
    }));
  } catch {
    return {
      generatedAt: new Date().toISOString(),
      projectId,
      available: false,
      label: "Data unavailable",
      sections,
      operational,
      isolationNote:
        "Server-side project isolation remains authoritative. No cross-project knowledge is listed here.",
    };
  }

  return {
    generatedAt: new Date().toISOString(),
    projectId,
    available: true,
    sections,
    operational,
    canonical_objective:
      operational?.objectives?.find((o) => o.is_canonical) ||
      operational?.objectives?.[0] ||
      null,
    canonical_stage: operational?.canonical_integration_run?.stage_label || null,
    isolationNote:
      "Server-side project isolation remains authoritative. No cross-project knowledge is listed here.",
  };
}
