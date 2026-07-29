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
      attention_class: "warning",
    });
  }

  if (projectId) {
    try {
      const { buildProjectOperationalSummary } = await import(
        "@/lib/core/founder-operations"
      );
      const summary = await buildProjectOperationalSummary({ projectId });
      if (summary?.integration?.duplicate_warning) {
        items.push({
          id: "integration-duplicate-proof",
          kind: "integration_duplicate_proof",
          severity: "critical",
          title: "Duplicate production Founder proof runs",
          detail: `${summary.integration.duplicate_count} non-canonical active run(s) — resolve before continuing.`,
          href: `/admin/integration?project_id=${encodeURIComponent(projectId)}`,
          projectId,
          attention_class: "action_required",
        });
      }
      const next = summary?.next_founder_action;
      if (
        next &&
        next.severity === "action_required" &&
        next.id !== "start_proof" &&
        next.id !== "resolve_duplicates"
      ) {
        const runId = summary?.canonical_integration_run?.id;
        const objectiveTitle =
          summary?.objectives?.find((o) => o.is_canonical || o.source_type === "integration_proof")
            ?.title || "Production Founder Proof";
        const hrefBase = `/admin/integration?project_id=${encodeURIComponent(projectId)}${
          runId ? `&run_id=${encodeURIComponent(runId)}` : ""
        }&tab=objective#clarification`;
        items.push({
          id: `integration-action:${next.id}`,
          kind:
            next.id === "answer_clarification"
              ? "integration_clarification_required"
              : "integration_founder_action",
          severity: "high",
          title:
            next.id === "answer_clarification" ? "Clarification required" : next.label,
          detail:
            next.id === "answer_clarification"
              ? `Objective: ${objectiveTitle}. ${next.reason}`
              : next.reason,
          clarificationQuestion:
            next.id === "answer_clarification"
              ? "Confirm success criteria and whether deterministic simulation-only remains acceptable."
              : null,
          href:
            next.id === "answer_clarification"
              ? hrefBase
              : next.href
                ? next.href.includes("project_id=")
                  ? next.href
                  : `${next.href}${next.href.includes("?") ? "&" : "?"}project_id=${encodeURIComponent(projectId)}`
                : `/admin/integration?project_id=${encodeURIComponent(projectId)}`,
          projectId,
          runId: runId || null,
          objectiveTitle,
          attention_class: "action_required",
        });
      }
    } catch {
      /* summary optional */
    }
  }

  // Phase D execution-engine inbox surface (in-process store).
  try {
    const {
      listItems,
      listPrograms,
      listEvents,
    } = await import("@/lib/core/execution-engine");
    const execItems = listItems({ projectId: projectId || undefined });
    const programs = listPrograms({ projectId: projectId || undefined });

    for (const p of programs.filter((x) => x.status === "awaiting_approval")) {
      items.push({
        id: `exec-approval:${p.id}`,
        kind: "execution_approval",
        severity: "high",
        title: `Execution program awaiting approval`,
        detail: `Program ${p.id}`,
        riskLabel: p.risk_level,
        evidence: { program_id: p.id, blueprint_id: p.blueprint_id },
        href: "/admin/company-builder",
        projectId: p.project_id,
        resourceId: p.id,
      });
    }

    for (const t of execItems.filter(
      (x) =>
        x.status === "awaiting_approval" &&
        x.audit_metadata?.requires_founder_approval
    )) {
      items.push({
        id: `protected:${t.id}`,
        kind: "protected_action",
        severity: "critical",
        title: t.title,
        detail: "Protected action requires Founder approval — not executed.",
        riskLabel: t.risk_level,
        evidence: t.audit_metadata,
        originatingTask: t.id,
        href: t.project_id
          ? `/admin/execution?project_id=${encodeURIComponent(t.project_id)}`
          : "/admin/execution",
        projectId: t.project_id,
        resourceId: t.id,
      });
    }

    for (const t of execItems.filter((x) => x.status === "dead_lettered")) {
      items.push({
        id: `exec-dlq:${t.id}`,
        kind: "dead_letter",
        severity: "high",
        title: `Dead-lettered: ${t.title || t.id}`,
        detail: t.audit_metadata?.failure_kind || "Escalation required",
        riskLabel: t.risk_level,
        evidence: t.audit_metadata,
        originatingTask: t.id,
        href: t.project_id
          ? `/admin/execution?project_id=${encodeURIComponent(t.project_id)}`
          : "/admin/execution",
        projectId: t.project_id,
        resourceId: t.id,
      });
    }

    const failedReviews = listEvents({ projectId: projectId || undefined }).filter(
      (e) => e.event_type === "review_failed_rework_created"
    );
    for (const e of failedReviews.slice(-20)) {
      items.push({
        id: `review-fail:${e.id}`,
        kind: "failed_review",
        severity: "high",
        title: "Review failed — rework created",
        detail: e.payload?.rework_id || "See execution events",
        evidence: e.payload,
        originatingTask: e.item_id,
        href: e.project_id
          ? `/admin/execution?project_id=${encodeURIComponent(e.project_id)}`
          : "/admin/execution",
        projectId: e.project_id,
        resourceId: e.item_id,
      });
    }

    for (const t of execItems.filter(
      (x) => x.audit_metadata?.rework_of && x.status === "queued"
    )) {
      items.push({
        id: `rework:${t.id}`,
        kind: "rework",
        severity: "medium",
        title: t.title,
        detail: `Rework of ${t.audit_metadata.rework_of}`,
        originatingTask: t.audit_metadata.rework_of,
        href: t.project_id
          ? `/admin/execution?project_id=${encodeURIComponent(t.project_id)}`
          : "/admin/execution",
        projectId: t.project_id,
        resourceId: t.id,
      });
    }

    for (const p of programs.filter((x) => x.status === "succeeded")) {
      const brief = p.metadata?.ceo_brief;
      if (brief) {
        items.push({
          id: `complete:${p.id}`,
          kind: "completion_brief",
          severity: "medium",
          title: `Program completed: ${p.product?.name || p.id}`,
          detail: brief.note || "CEO completion brief available",
          evidence: brief,
          href: p.project_id
            ? `/admin/execution?project_id=${encodeURIComponent(p.project_id)}&program_id=${encodeURIComponent(p.id)}`
            : "/admin/execution",
          projectId: p.project_id,
          resourceId: p.id,
        });
      }
    }

    for (const p of programs.filter((x) => x.paused_at || x.status === "paused")) {
      items.push({
        id: `pause-ctrl:${p.id}`,
        kind: "pause_control",
        severity: "medium",
        title: `Paused program ${p.id}`,
        detail: "Founder may resume or cancel via execution controls",
        href: p.project_id
          ? `/admin/execution?project_id=${encodeURIComponent(p.project_id)}&program_id=${encodeURIComponent(p.id)}`
          : "/admin/execution",
        projectId: p.project_id,
        resourceId: p.id,
      });
    }

    const escalations = listEvents({ projectId: projectId || undefined }).filter(
      (e) =>
        e.event_type === "run_failed" &&
        (e.payload?.next_status === "dead_lettered" ||
          String(e.payload?.code || "").includes("FORBIDDEN"))
    );
    for (const e of escalations.slice(-10)) {
      items.push({
        id: `escalation:${e.id}`,
        kind: "high_risk_escalation",
        severity: "critical",
        title: "High-risk execution escalation",
        detail: e.payload?.message || e.event_type,
        evidence: e.payload,
        originatingTask: e.item_id,
        href: e.project_id
          ? `/admin/execution?project_id=${encodeURIComponent(e.project_id)}`
          : "/admin/execution",
        projectId: e.project_id,
        resourceId: e.item_id,
      });
    }
  } catch {
    /* execution store optional */
  }

  // Sort: critical → high → medium
  const rank = { critical: 0, high: 1, medium: 2, low: 3 };
  items.sort((a, b) => (rank[a.severity] ?? 9) - (rank[b.severity] ?? 9));

  const attentionCount = items.filter((i) =>
    [
      "approval",
      "approval_aggregate",
      "blocked_objective",
      "failed_objective",
      "failed_jobs",
      "execution_approval",
      "protected_action",
      "dead_letter",
      "failed_review",
      "high_risk_escalation",
      "rework",
      "integration_duplicate_proof",
      "integration_founder_action",
      "integration_clarification_required",
    ].includes(i.kind)
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
