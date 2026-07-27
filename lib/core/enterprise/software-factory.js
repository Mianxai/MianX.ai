// Deterministic software-factory helper: executive readiness → software /
// controlled delivery path. Composes existing starters; tests use fake provider.

import { clip } from "../validate";
import { startExecutiveObjective } from "../executive/workflow";
import { startSoftwareDelivery } from "../delivery/workflow";
import { startControlledDelivery } from "../platform/workflow";
import { routeExecutiveObjectiveToDelivery } from "../delivery/executive-bridge";
import { isProtectedAction } from "../executive/policy";

/**
 * Compose an end-to-end software factory path for a Founder objective.
 *
 * Modes:
 *  - "software-delivery" (default): executive advisory + Wave-2 delivery
 *  - "controlled-delivery": executive + Wave-2/3 controlled coding path
 *
 * Does not deploy, merge, or push. Protected actions remain Founder-gated.
 */
export async function startSoftwareFactory({
  projectId,
  objective,
  mode = "software-delivery",
  proposedAction = null,
  workspaceRoot = null,
  edits = [],
  allowedPathPrefixes = ["fixtures/"],
  commands = [],
  routedBy = "executive-cpo",
  skipExecutive = false,
  idempotencyKey = null,
  actor,
}) {
  const objectiveText = clip(objective, 8000);
  const proposed_action = proposedAction ? clip(proposedAction, 100) : null;
  const root =
    idempotencyKey ||
    `wf:software-factory:${projectId}:${clip(objectiveText, 40).replace(/\s+/g, "-").toLowerCase()}`;

  let executive = null;
  if (!skipExecutive) {
    executive = await startExecutiveObjective({
      projectId,
      objective: objectiveText,
      proposedAction: proposed_action,
      idempotencyKey: `${root}:executive`,
      actor,
    });
  }

  let delivery = null;
  if (mode === "controlled-delivery") {
    if (!workspaceRoot) {
      throw Object.assign(new Error("workspace_root is required for controlled-delivery factory mode."), {
        status: 400,
        code: "VALIDATION_ERROR",
      });
    }
    delivery = await startControlledDelivery({
      projectId,
      objective: objectiveText,
      workspaceRoot,
      edits,
      allowedPathPrefixes,
      commands,
      proposedAction: proposed_action,
      idempotencyKey: `${root}:controlled`,
      actor,
      routedBy,
    });
  } else {
    delivery = await routeExecutiveObjectiveToDelivery({
      projectId,
      objective: objectiveText,
      routedBy,
      proposedAction: proposed_action,
      actor,
      idempotencyKey: `${root}:delivery`,
    });
  }

  return {
    factory: "software-factory",
    mode: mode === "controlled-delivery" ? "controlled-delivery" : "software-delivery",
    objective: objectiveText,
    proposed_action,
    protected_action: isProtectedAction(proposed_action),
    executive: executive
      ? { task: executive.task, job: executive.job, created: executive.created }
      : null,
    delivery: {
      task: delivery.task,
      job: delivery.job,
      created: delivery.created,
      pod: delivery.pod || null,
      executive_state: delivery.executive_state || null,
      handoff: delivery.handoff || null,
    },
    notes: [
      "Composed starter only — queue ticks still required to execute jobs.",
      "No autonomous push, merge, or production deploy.",
    ],
  };
}

/** Alias kept for clarity in E2E imports. */
export { startSoftwareDelivery, startControlledDelivery, startExecutiveObjective };
