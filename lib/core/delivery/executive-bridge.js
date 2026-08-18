// Bridge: Wave-1 executives route product-development objectives into Wave-2.

import { forbidden, validationError } from "../errors";
import { clip } from "../validate";
import { WAVE1_SLUGS } from "../executive/agents";
import { startSoftwareDelivery } from "./workflow";

const ROUTERS = new Set([
  "executive-ceo",
  "executive-cpo",
  "executive-cto",
]);

/**
 * Executive / C-Suite owner hands an approved product objective to the
 * software-delivery pod. Returns structured handoff + started workflow.
 */
export async function routeExecutiveObjectiveToDelivery({
  projectId,
  objective,
  routedBy = "executive-cpo",
  proposedAction = null,
  actor,
  idempotencyKey = null,
}) {
  const router = clip(routedBy, 100);
  if (!WAVE1_SLUGS.includes(router) && router !== "founder") {
    throw validationError("Unknown executive router.", {
      routed_by: `Unknown Wave-1 agent "${router}".`,
    });
  }
  if (router !== "founder" && !ROUTERS.has(router)) {
    throw forbidden(
      `Agent "${router}" is not permitted to route into the Wave-2 delivery pod.`
    );
  }
  const objectiveText = clip(objective, 8000);
  if (!objectiveText) {
    throw validationError("Objective required.", { objective: "objective is required." });
  }

  const handoff = {
    workflow: "software-delivery",
    routed_by: router,
    objective: objectiveText,
    proposed_action: proposedAction ? clip(proposedAction, 100) : null,
    stage: "handoff",
  };

  const started = await startSoftwareDelivery({
    projectId,
    objective: objectiveText,
    proposedAction,
    actor,
    idempotencyKey,
    source: `executive:${router}`,
  });

  return {
    handoff,
    ...started,
    executive_state: {
      routed_by: router,
      delivery_task_id: started.task.id,
      delivery_job_id: started.job.id,
      pod_count: started.pod.count,
    },
  };
}
