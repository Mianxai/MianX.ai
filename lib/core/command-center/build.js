// Assemble Command Center snapshot from existing repos + catalog.

import { listActiveAgentDefinitions } from "@/lib/core/agents";
import { runtimeConfigStatus } from "@/lib/core/config";
import { productionReadinessStatusAsync } from "@/lib/core/production-readiness";
import * as repo from "@/lib/core/repo";
import {
  buildAgentHierarchy,
  filterHierarchyByDepartment,
} from "./hierarchy";
import { enrichAgentsWithRuntime } from "./status";
import { buildOverviewMetrics, buildCeoBrief } from "./metrics";
import { mapWorkflowVisualizations } from "./workflows";
import { buildAgentDetail } from "./sanitize";

function sourceOk(value) {
  return { available: true, value };
}
function sourceFail() {
  return { available: false, value: null };
}

/**
 * @param {{ projectId?: string|null, department?: string|null, agentSlug?: string|null }} opts
 */
export async function buildCommandCenterSnapshot({
  projectId = null,
  department = null,
  agentSlug = null,
} = {}) {
  const hierarchyBase = buildAgentHierarchy(listActiveAgentDefinitions());
  const hierarchy = filterHierarchyByDepartment(hierarchyBase, department);

  let projects = [];
  let instances = [];
  let tasks = [];
  let jobs = [];
  let runs = [];
  let approvals = [];
  let audit = [];
  let jobCounts = null;
  let sources = {
    projects: sourceFail(),
    jobs: sourceFail(),
    tasks: sourceFail(),
    approvals: sourceFail(),
    runs: sourceFail(),
    audit: sourceFail(),
  };

  try {
    projects = await repo.listProjects();
    sources.projects = sourceOk({
      active: projects.filter((p) => p.status === "active").length,
      items: projects.map((p) => ({
        id: p.id,
        name: p.name,
        status: p.status,
        organizationId: p.organization_id,
      })),
    });
  } catch {
    /* keep unavailable */
  }

  const scope = projectId || null;

  try {
    if (scope) {
      instances = await repo.listAgentInstances(scope);
      tasks = await repo.listTasks({ projectId: scope });
      const jobPage = await repo.listJobs({ projectId: scope, limit: 100, offset: 0 });
      jobs = Array.isArray(jobPage?.rows) ? jobPage.rows : [];
      runs = await repo.listRuns({ projectId: scope });
      approvals = await repo.listApprovals({ projectId: scope });
      audit = await repo.listAuditLogs({ projectId: scope });
      jobCounts = await repo.countJobsByStatus(scope);
    } else {
      // Cross-project: use aggregate counts only + recent audit; avoid leaking
      // full row dumps. Task/job lists stay empty for status enrichment unless
      // a project is selected — catalog agents show idle honestly.
      jobCounts = await repo.countJobsByStatus();
      const recent = await repo.listRecentAudit(10);
      audit = recent;
      const taskDist = await repo.countByStatus("tasks");
      const approvalDist = await repo.countByStatus("approval_requests");
      sources.tasks = sourceOk({
        queued: (taskDist.pending || 0) + (taskDist.validated || 0),
        in_progress: taskDist.running || 0,
        blocked: taskDist.awaiting_approval || 0,
      });
      sources.approvals = sourceOk({ pending: approvalDist.pending || 0 });
    }
    sources.jobs = sourceOk(jobCounts || {});
    if (scope) {
      sources.tasks = sourceOk({
        queued: tasks.filter((t) => ["pending", "validated"].includes(t.status)).length,
        in_progress: tasks.filter((t) => t.status === "running").length,
        blocked: tasks.filter((t) => t.status === "awaiting_approval").length,
      });
      sources.approvals = sourceOk({
        pending: approvals.filter((a) => a.status === "pending").length,
      });
      sources.runs = sourceOk({
        failed: runs.filter((r) => r.status === "failed").length,
      });
    }
    sources.audit = sourceOk({ recent: audit, count: audit.length });
  } catch {
    /* partial */
  }

  // Enforce project isolation: drop any accidental cross-project rows
  if (scope) {
    const same = (row) => !row.project_id || row.project_id === scope;
    instances = instances.filter(same);
    tasks = tasks.filter(same);
    jobs = jobs.filter(same);
    runs = runs.filter(same);
    approvals = approvals.filter(same);
    audit = audit.filter(same);
  }

  const enriched = enrichAgentsWithRuntime(hierarchy.agents, {
    instances,
    jobs,
    runs,
    approvals,
    tasks,
  });

  const workflowTasks = scope
    ? tasks
    : []; // require project scope for workflow viz (no cross-project leak)
  const workflows = mapWorkflowVisualizations({
    tasks: workflowTasks,
    jobs,
    approvals,
  });

  const overview = buildOverviewMetrics({
    jobs: sources.jobs,
    tasks: sources.tasks,
    approvals: sources.approvals,
    projects: sources.projects,
    enrichedAgents: enriched,
    workflows: sourceOk(
      scope
        ? workflowTasks.map((t) => ({ id: t.id, status: t.status, workflow: t.input?.workflow }))
        : null
    ),
  });

  // When all-projects: activeWorkflows unavailable (honest)
  if (!scope) {
    overview.activeWorkflows = {
      available: false,
      value: null,
      label: "Data unavailable",
      note: "Select a project to view workflow chains",
    };
    overview.blockedWorkflows = {
      available: false,
      value: null,
      label: "Data unavailable",
      note: "Select a project to view blocked workflows",
    };
  }

  const config = runtimeConfigStatus();
  const productionReadiness = await productionReadinessStatusAsync();

  const ceoBrief = buildCeoBrief({
    tasks: scope ? tasks : [],
    approvals: scope ? approvals : [],
    jobs: scope ? jobs : [],
    runs: scope ? runs : [],
    scheduler: config.scheduler,
    productionReadiness,
  });

  const departments = hierarchy.departments.map((d) => {
    const deptAgents = enriched.filter((a) => a.department === d.slug);
    return {
      ...d,
      activeInstances: deptAgents.filter((a) => a.status === "working").length,
      statusCounts: countStatuses(deptAgents),
      blockedWork: deptAgents.filter((a) =>
        ["blocked", "approval_required", "failed"].includes(a.status)
      ).length,
      approvalState: deptAgents.some((a) => a.status === "approval_required")
        ? "approval_required"
        : "clear",
    };
  });

  let selectedDetail = null;
  if (agentSlug) {
    const agent = enriched.find((a) => a.slug === agentSlug) || null;
    selectedDetail = buildAgentDetail({
      agent,
      jobs: scope ? jobs : [],
      runs: scope ? runs : [],
      approvals: scope ? approvals : [],
      audit: scope ? audit : [],
      instances: scope ? instances : [],
    });
  }

  const snapshot = {
    generatedAt: new Date().toISOString(),
    projectId: scope,
    department: department || "all",
    hierarchy: {
      root: hierarchy.root,
      orchestrator: hierarchy.orchestrator,
      edges: hierarchy.edges,
      executableCount: hierarchy.executableCount,
    },
    agents: enriched,
    departments,
    overview,
    workflows: scope
      ? { available: true, value: workflows }
      : {
          available: false,
          value: [],
          label: "Data unavailable",
          note: "Select a project to visualize workflow chains",
        },
    ceoBrief,
    schedule: {
      mode: config.scheduler?.mode || "manual",
      platformCronConfigured: Boolean(config.scheduler?.platformCronConfigured),
      automaticProcessing: Boolean(config.scheduler?.automaticProcessing),
      workerSecretConfigured: Boolean(config.scheduler?.workerSecretConfigured),
      readyForExternalScheduler: Boolean(config.scheduler?.readyForExternalScheduler),
      tickEndpoint: config.scheduler?.tickEndpoint,
      founderGuidance: config.scheduler?.founderGuidance || null,
      lastTick: null,
      recentWorkerProcessing: null,
    },
    productionReadiness,
    projects: sources.projects.available ? sources.projects.value.items : [],
    knowledge: {
      auditHref: scope
        ? `/admin/runtime/audit?project_id=${encodeURIComponent(scope)}`
        : "/admin/runtime/audit",
      runsHref: scope
        ? `/admin/runtime/runs?project_id=${encodeURIComponent(scope)}`
        : "/admin/runtime/runs",
      memoryHref: scope
        ? `/admin/memory?project_id=${encodeURIComponent(scope)}`
        : "/admin/memory",
      learningHref: scope
        ? `/admin/learning?project_id=${encodeURIComponent(scope)}`
        : "/admin/learning",
      note: "Outputs and audit live in existing Runtime views — project-scoped when selected.",
    },
    memoryLearning: {
      available: false,
      memoryCandidates: null,
      learningCandidates: null,
      label: "Data unavailable",
    },
    selectedDetail,
    sources,
  };

  try {
    const lastTick = await repo.getLastRuntimeTick();
    snapshot.schedule.lastTick = lastTick?.at || null;
    snapshot.schedule.recentWorkerProcessing = lastTick;
  } catch {
    /* keep null — Data unavailable */
  }

  try {
    const { listMemory, listLearning } = await import("@/lib/core/memory");
    const mem = await listMemory({ projectId: scope || null });
    const learn = await listLearning({ projectId: scope || null });
    snapshot.memoryLearning = {
      available: true,
      memoryCandidates: mem.filter((m) => m.verification_status === "candidate").length,
      memoryActive: mem.filter((m) =>
        ["validated", "active"].includes(m.verification_status)
      ).length,
      learningCandidates: learn.filter((l) =>
        ["proposed", "under_review"].includes(l.status)
      ).length,
      learningPromoted: learn.filter((l) => l.status === "promoted").length,
      label: null,
    };
  } catch {
    /* keep unavailable */
  }

  return snapshot;
}

function countStatuses(agents) {
  const out = {};
  for (const a of agents) {
    out[a.status] = (out[a.status] || 0) + 1;
  }
  return out;
}
