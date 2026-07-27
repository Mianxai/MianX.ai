// Founder Inbox — aggregate items requiring Founder attention (not email).

import * as repo from "@/lib/core/repo";
import { explainApproval } from "@/lib/core/approvals/explain";
import { isObjectiveTask, toObjectiveSummary } from "@/lib/core/objectives";
import { runtimeConfigStatus } from "@/lib/core/config";
import { productionReadinessStatusAsync } from "@/lib/core/production-readiness";

/**
 * Build Founder Inbox items from real runtime state.
 * @param {{ projectId?: string|null }} opts
 */
export async function buildFounderInbox({ projectId = null } = {}) {
  const items = [];
  const config = runtimeConfigStatus();
  const readiness = await productionReadinessStatusAsync();

  let approvals = [];
  let tasks = [];
  let jobCounts = null;
  let available = true;

  try {
    if (projectId) {
      approvals = await repo.listApprovals({ projectId, status: "pending" });
      tasks = await repo.listTasks({ projectId });
      jobCounts = await repo.countJobsByStatus(projectId);
    } else {
      // Cross-project: pending approvals only via status histogram + empty
      // detail list to avoid cross-project leakage of rows without filter.
      const approvalDist = await repo.countByStatus("approval_requests");
      const pending = Number(approvalDist.pending) || 0;
      if (pending > 0) {
        items.push({
          id: "approvals-aggregate",
          kind: "approval_aggregate",
          severity: "high",
          title: `${pending} pending approval${pending === 1 ? "" : "s"}`,
          detail: "Select a project to review each decision.",
          href: "/admin/runtime/approvals",
          projectId: null,
        });
      }
      jobCounts = await repo.countJobsByStatus();
    }
  } catch {
    available = false;
  }

  if (projectId) {
    for (const a of approvals.filter((x) => x.status === "pending")) {
      const ex = explainApproval(a);
      items.push({
        id: `approval:${a.id}`,
        kind: "approval",
        severity: ex.highRisk ? "critical" : "high",
        title: ex.requestedAction,
        detail: ex.reason,
        riskLabel: ex.riskLabel,
        href: `/admin/runtime/approvals?project_id=${encodeURIComponent(projectId)}`,
        projectId,
        resourceId: a.id,
      });
    }

    for (const t of tasks.filter(
      (x) => x.status === "awaiting_approval" && isObjectiveTask(x)
    )) {
      const summary = toObjectiveSummary(t, { approvals });
      items.push({
        id: `objective-block:${t.id}`,
        kind: "blocked_objective",
        severity: "high",
        title: summary.title,
        detail: "Objective awaiting Founder decision",
        href: `/admin/objectives?project_id=${encodeURIComponent(projectId)}&id=${encodeURIComponent(t.id)}`,
        projectId,
        resourceId: t.id,
      });
    }

    for (const t of tasks.filter((x) => x.status === "failed" && isObjectiveTask(x))) {
      items.push({
        id: `objective-fail:${t.id}`,
        kind: "failed_objective",
        severity: "high",
        title: t.title,
        detail: "Objective failed — review audit and jobs",
        href: `/admin/objectives?project_id=${encodeURIComponent(projectId)}&id=${encodeURIComponent(t.id)}`,
        projectId,
        resourceId: t.id,
      });
    }
  }

  const dead = jobCounts ? Number(jobCounts.dead_letter) || 0 : 0;
  const failed = jobCounts ? Number(jobCounts.failed) || 0 : 0;
  if (dead > 0 || failed > 0) {
    items.push({
      id: "jobs-failed",
      kind: "failed_jobs",
      severity: "high",
      title: `${failed + dead} failed/dead-letter job${failed + dead === 1 ? "" : "s"}`,
      detail: projectId
        ? "Open the project queue to inspect."
        : "Select a project to inspect failed jobs.",
      href: projectId
        ? `/admin/runtime/queue?project_id=${encodeURIComponent(projectId)}`
        : "/admin/runtime/queue",
      projectId,
    });
  }

  if (!config.scheduler?.automaticProcessing) {
    items.push({
      id: "scheduler",
      kind: "scheduler",
      severity: "medium",
      title:
        config.scheduler?.mode === "external_scheduler_required"
          ? "External / Pro scheduler required"
          : "Runtime tick is manual",
      detail: config.scheduler?.founderGuidance || "Queue will not drain automatically.",
      href: "/admin/schedule",
      projectId: null,
    });
  }

  if (readiness?.provider === "unconfigured") {
    items.push({
      id: "provider",
      kind: "provider",
      severity: "medium",
      title: "AI provider unconfigured",
      detail: "Agent runs return controlled 503 until Anthropic is configured.",
      href: "/admin/settings",
      projectId: null,
    });
  }

  // Sort: critical → high → medium
  const rank = { critical: 0, high: 1, medium: 2, low: 3 };
  items.sort((a, b) => (rank[a.severity] ?? 9) - (rank[b.severity] ?? 9));

  const attentionCount = items.filter((i) =>
    ["approval", "approval_aggregate", "blocked_objective", "failed_objective", "failed_jobs"].includes(
      i.kind
    )
  ).length;

  return {
    generatedAt: new Date().toISOString(),
    projectId,
    available,
    attentionCount,
    items,
    schedule: config.scheduler,
    productionReadiness: readiness,
  };
}

/** Integer badge for nav — attention items only (not provider/scheduler tips). */
export function inboxBadgeCount(inbox) {
  if (!inbox?.available) return 0;
  return Number(inbox.attentionCount) || 0;
}
