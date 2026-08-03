import { NextResponse } from "next/server";
import { withErrorHandling, notConfigured, badRequest } from "@/lib/core/errors";
import { requireAdmin } from "@/lib/core/auth";
import { assertUuid } from "@/lib/core/validate";
import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import * as repo from "@/lib/core/repo";
import { listPersistedIntegrationRuns } from "@/lib/core/integration/persist.js";
import { listMemory, listLearning } from "@/lib/core/memory";
import { runtimeConfigStatus } from "@/lib/core/config";

export const dynamic = "force-dynamic";

function pushEvent(events, row) {
  if (!row?.id && !row?.event_type) return;
  events.push(row);
}

/**
 * Unified read-only audit lineage from existing stores (no fabrication).
 * GET /api/admin/audit/unified?project_id=
 */
export const GET = withErrorHandling(async (req) => {
  await requireAdmin(req);
  if (!isSupabaseConfigured() || !getSupabaseAdmin()) {
    throw notConfigured("Supabase is not configured.");
  }

  const url = new URL(req.url);
  const projectIdRaw = url.searchParams.get("project_id");
  if (!projectIdRaw) {
    return NextResponse.json({
      ok: false,
      events: [],
      note: "project_id required for unified audit",
    });
  }
  assertUuid(projectIdRaw, "project_id");
  const { requireProjectAccess } = await import("@/lib/tenant/project-access");
  await requireProjectAccess(req, projectIdRaw);

  const events = [];
  const limitations = [];

  try {
    const audit = await repo.listAuditLogs({ projectId: projectIdRaw });
    for (const row of audit || []) {
      pushEvent(events, {
        id: `audit:${row.id}`,
        event_type: row.action || "audit_event",
        source: "project_runtime_audit",
        project_id: projectIdRaw,
        actor: row.actor_email || row.actor_id || row.actor || null,
        objective_run_task_ref: row.resource_id || null,
        timestamp: row.created_at,
        outcome: row.outcome || row.status || "recorded",
        protected_action: Boolean(row.protected_action || row.risk_class === "R3"),
        technical: row,
      });
    }
  } catch {
    limitations.push("runtime_audit_unavailable");
  }

  try {
    const approvals = await repo.listApprovals({ projectId: projectIdRaw });
    for (const a of approvals || []) {
      pushEvent(events, {
        id: `approval:${a.id}`,
        event_type: `approval.${a.status || "pending"}`,
        source: "approvals",
        project_id: projectIdRaw,
        actor: a.requested_by || a.decided_by || null,
        objective_run_task_ref: a.task_id || a.run_id || a.id,
        timestamp: a.created_at || a.updated_at,
        outcome: a.status,
        protected_action: Boolean(a.capability || a.proposed_action),
        technical: a,
      });
    }
  } catch {
    limitations.push("approvals_unavailable");
  }

  try {
    const runs = await listPersistedIntegrationRuns({
      project_id: projectIdRaw,
      limit: 50,
    });
    for (const r of runs || []) {
      pushEvent(events, {
        id: `integration:${r.id}`,
        event_type: "integration_run.snapshot",
        source: "integration",
        project_id: projectIdRaw,
        actor: r.proof?.started_by || null,
        objective_run_task_ref: r.id,
        timestamp: r.updated_at || r.started_at,
        outcome: r.status || r.current_stage,
        protected_action: false,
        technical: {
          stage: r.current_stage,
          status: r.status,
          execution_mode: r.execution_mode,
          proof: r.proof,
        },
      });
      const history = r.stage_history || r.payload?.stage_history || [];
      if (Array.isArray(history)) {
        for (const h of history) {
          pushEvent(events, {
            id: `integration-stage:${r.id}:${h.at || h.stage || Math.random()}`,
            event_type: `integration.stage.${h.stage || h.to || "transition"}`,
            source: "integration",
            project_id: projectIdRaw,
            actor: h.actor || null,
            objective_run_task_ref: r.id,
            timestamp: h.at || h.timestamp || r.updated_at,
            outcome: h.stage || h.to || "transition",
            protected_action: false,
            technical: h,
          });
        }
      }
    }
    if (!(runs || []).length) {
      limitations.push(
        "No persisted Integration runs found for this project — historical UI-only activity cannot be fabricated."
      );
    }
  } catch {
    limitations.push("integration_runs_unavailable");
  }

  try {
    const mem = await listMemory({ projectId: projectIdRaw });
    for (const m of mem || []) {
      pushEvent(events, {
        id: `memory:${m.id}`,
        event_type: `memory.${m.verification_status || "candidate"}`,
        source: "memory",
        project_id: projectIdRaw,
        actor: m.created_by || null,
        objective_run_task_ref: m.id,
        timestamp: m.updated_at || m.created_at,
        outcome: m.verification_status,
        protected_action: false,
        technical: m,
      });
    }
  } catch {
    limitations.push("memory_unavailable");
  }

  try {
    const learn = await listLearning({ projectId: projectIdRaw });
    for (const l of learn || []) {
      pushEvent(events, {
        id: `learning:${l.id}`,
        event_type: `learning.${l.status || "candidate"}`,
        source: "learning",
        project_id: projectIdRaw,
        actor: l.created_by || null,
        objective_run_task_ref: l.id,
        timestamp: l.updated_at || l.created_at,
        outcome: l.status,
        protected_action: false,
        technical: l,
      });
    }
  } catch {
    limitations.push("learning_unavailable");
  }

  const scheduler = runtimeConfigStatus().scheduler;
  pushEvent(events, {
    id: `scheduler:status`,
    event_type: "scheduler.status_snapshot",
    source: "scheduler",
    project_id: projectIdRaw,
    actor: "system",
    objective_run_task_ref: null,
    timestamp: scheduler?.lastTickAt || new Date().toISOString(),
    outcome: scheduler?.automaticProcessing ? "automatic" : "manual_or_external",
    protected_action: false,
    technical: {
      mode: scheduler?.mode,
      platform: scheduler?.platform,
      automaticProcessing: scheduler?.automaticProcessing,
      lastTickAt: scheduler?.lastTickAt,
      note: "Snapshot of current scheduler config — not a historical tick log.",
    },
  });

  events.sort((a, b) => String(b.timestamp || "").localeCompare(String(a.timestamp || "")));

  // Deduplicate by id
  const seen = new Set();
  const deduped = [];
  for (const e of events) {
    if (seen.has(e.id)) continue;
    seen.add(e.id);
    deduped.push(e);
  }

  return NextResponse.json({
    ok: true,
    project_id: projectIdRaw,
    generated_at: new Date().toISOString(),
    events: deduped,
    limitations,
    note: limitations.length
      ? "Some historical activity may never have been persisted; missing rows are not fabricated."
      : null,
  });
});
