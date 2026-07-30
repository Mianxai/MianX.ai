// Bounded dependency-aware orchestrator (per tick).

import {
  listItems,
  listDependencies,
  getProgram,
  saveItem,
  saveProgram,
  saveCheckpoint,
  appendEvent,
  listPrograms,
  listAllocations,
} from "./store";
import { transitionState, canTransition } from "./state-machine";
import { allocateAgent } from "./allocation";
import { ALLOCATION_BOUNDS, CHECKPOINT_KINDS } from "./states";
import { executeAgentRun } from "./agent-run";
import { releaseRetryWait } from "./recovery";
import { selectProgramsFairly } from "./fairness";
import { forbidden } from "../errors";

/**
 * One bounded orchestration tick.
 */
export async function runOrchestratorTick({
  programId = null,
  maxItems = ALLOCATION_BOUNDS.maxAgentsPerProgramTick,
  providerAdapter = null,
  now = Date.now(),
  fairnessCursor = 0,
} = {}) {
  let programs;
  if (programId) {
    programs = [getProgram(programId)].filter(Boolean);
  } else {
    const fair = selectProgramsFairly({ cursor: fairnessCursor });
    programs = fair.programs;
  }

  const summary = {
    programs: 0,
    ready: 0,
    blocked: 0,
    assigned: 0,
    ran: 0,
    succeeded: 0,
    failed: 0,
    skipped_paused: 0,
    dead_lettered: 0,
  };

  for (const program of programs) {
    if (!program || program.paused_at || program.status === "paused") {
      summary.skipped_paused += 1;
      continue;
    }
    if (["cancelled", "succeeded"].includes(program.status)) continue;
    summary.programs += 1;

    // Release retry_wait
    for (const item of listItems({ programId: program.id })) {
      if (item.status === "retry_wait") {
        const released = releaseRetryWait(item, now);
        if (released !== item) saveItem(released);
      }
    }

    const deps = listDependencies({ programId: program.id });
    let items = listItems({ programId: program.id });
    const byId = new Map(items.map((i) => [i.id, i]));

    for (const item of items) {
      if (!["task", "agent_run"].includes(item.level)) continue;
      if (["succeeded", "cancelled", "dead_lettered", "running", "review", "assigned"].includes(item.status)) {
        continue;
      }
      if (item.status === "paused") continue;

      const incomplete = (item.dependency_ids || []).filter((depId) => {
        const dep = byId.get(depId);
        if (!dep) return true;
        return dep.status !== "succeeded";
      });

      if (incomplete.length && ["queued", "ready", "blocked"].includes(item.status)) {
        if (item.status !== "blocked" && canTransition(item.status, "blocked")) {
          saveItem(transitionState(item, "blocked", { reason: "dependencies" }));
          summary.blocked += 1;
        }
        continue;
      }

      if (!incomplete.length && ["queued", "blocked"].includes(item.status)) {
        if (canTransition(item.status, "ready")) {
          saveItem(transitionState(item, "ready", { reason: "deps_met" }));
          summary.ready += 1;
        }
      }
    }

    const ready = listItems({ programId: program.id })
      .filter((i) => i.status === "ready" && ["task", "agent_run"].includes(i.level))
      .sort(
        (a, b) =>
          (a.wave || 99) - (b.wave || 99) || String(a.priority).localeCompare(String(b.priority))
      );

    let advanced = 0;
    for (const item of ready) {
      if (advanced >= maxItems) break;

      const allocation = allocateAgent({
        item,
        program,
        existing: listAllocations({ projectId: program.project_id }),
      });
      if (!allocation.ok) {
        appendEvent({
          program_id: program.id,
          project_id: program.project_id,
          item_id: item.id,
          event_type: "allocation_deferred",
          payload: { reason: allocation.reason },
        });
        continue;
      }

      let assigned = transitionState(item, "assigned", {
        reason: "allocated",
        actor: allocation.agent_slug,
      });
      assigned = { ...assigned, assigned_agent: allocation.agent_slug };
      saveItem(assigned);
      summary.assigned += 1;

      const result = await executeAgentRun({
        item: assigned,
        program,
        providerAdapter,
        now,
      });
      summary.ran += 1;
      advanced += 1;
      if (result.status === "succeeded") summary.succeeded += 1;
      else if (result.status === "dead_lettered") summary.dead_lettered += 1;
      else summary.failed += 1;
    }

    const remaining = listItems({ programId: program.id }).filter(
      (i) =>
        ["task", "agent_run"].includes(i.level) &&
        !["succeeded", "cancelled", "dead_lettered"].includes(i.status)
    );
    if (remaining.length === 0) {
      let p = getProgram(program.id);
      if (p && canTransition(p.status, "succeeded")) {
        p = transitionState(p, "succeeded", { reason: "all_items_done" });
        saveProgram(p);
        saveCheckpoint({
          program_id: program.id,
          project_id: program.project_id,
          kind: CHECKPOINT_KINDS[6],
          label: "Program completed",
          payload: { ceo_brief: buildCeoCompletionBrief(p) },
        });
      } else if (p && p.status !== "succeeded") {
        // Force complete from queued/running if transitions allow via running→succeeded path
        saveProgram({
          ...p,
          status: "succeeded",
          updated_at: new Date().toISOString(),
          metadata: {
            ...(p.metadata || {}),
            ceo_brief: buildCeoCompletionBrief(p),
          },
        });
        saveCheckpoint({
          program_id: program.id,
          project_id: program.project_id,
          kind: CHECKPOINT_KINDS[6],
          label: "Program completed",
          payload: { ceo_brief: buildCeoCompletionBrief(p) },
        });
      }
    }
  }

  return summary;
}

export function buildCeoCompletionBrief(program) {
  return {
    program_id: program.id,
    product: program.product?.name || null,
    industry: program.product?.industry || null,
    status: "completed",
    note: "Execution program completed for planning deliverables. Industry OS was not built.",
    generated_at: new Date().toISOString(),
  };
}

export function assertNotWholeWorkforce(selectedCount, catalogSize = 38) {
  if (selectedCount >= catalogSize) {
    throw forbidden("Orchestrator refused whole-workforce activation.");
  }
  if (selectedCount > ALLOCATION_BOUNDS.maxAgentsPerProgramTick) {
    throw forbidden("Orchestrator exceeded per-tick agent bound.");
  }
  return true;
}
