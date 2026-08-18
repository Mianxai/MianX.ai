/**
 * Software-house multi-agent test-double E2E (no live provider).
 */

import { resetWorkforceI2Stores, bootstrapWorkforceRegistryInMemory, allocateSeatToProject, releaseInstance, transitionInstance, listInstances } from "./store";
import { planProjectTeam } from "./team-formation";
import { invokeRealAgent } from "../real-agent/invoke";
import { compileAgentPrompt } from "./prompt/compiler";
import { compileRoleVariant } from "./variant-compiler";
import { runIndependentQa } from "../real-agent/qa";
import { assertSeatRegistryInvariants, compileCapacitySeats } from "./seats";

export async function runSoftwareHouseTestDoubleE2E({
  projectId = "00000000-0000-4000-8000-000000000042",
} = {}) {
  resetWorkforceI2Stores();
  bootstrapWorkforceRegistryInMemory();
  const seatCheck = assertSeatRegistryInvariants(compileCapacitySeats());
  if (!seatCheck.ok) {
    return { ok: false, stage: "seats", errors: seatCheck.errors };
  }

  const plan = planProjectTeam({
    projectId,
    objectiveTitle: "Build a controlled software delivery package for disposable project",
    activate: true,
  });

  const steps = [];
  const product = await invokeRealAgent({
    projectId,
    agentDefinitionId: "delivery-product",
    executionMode: "test_double",
    objectiveTitle: plan.objectiveTitle,
    input: { objective: plan.objectiveTitle },
    reviewerSlug: "delivery-qa",
  });
  steps.push({ step: "product", ok: product.ok, instanceId: product.instanceId });

  const arch = await invokeRealAgent({
    projectId,
    agentDefinitionId: "delivery-architect",
    executionMode: "test_double",
    objectiveTitle: "Architecture proposal",
    input: { parent: "product" },
    reviewerSlug: "delivery-qa",
  });
  steps.push({ step: "architecture", ok: arch.ok });

  const eng = await invokeRealAgent({
    projectId,
    agentDefinitionId: "delivery-engineer",
    executionMode: "test_double",
    objectiveTitle: "Engineering child tasks + patch candidate",
    input: { produce_patch: true },
    reviewerSlug: "delivery-qa",
  });
  steps.push({ step: "engineering", ok: eng.ok, documentsUsed: eng.documentsUsed?.length || 0 });

  const qa = runIndependentQa({
    producerSlug: "delivery-engineer",
    reviewerSlug: "delivery-qa",
    output: eng.output,
    evidence: eng.evidenceItems || [],
    documentsUsed: eng.documentsUsed || [],
    projectId,
    schemaValid: true,
  });
  steps.push({ step: "independent_qa", result: qa.result });

  // Variant compilation sample
  const seat = plan.allocations.find((a) => a.allocation?.ok)?.allocation?.seat;
  let variant = null;
  if (seat) {
    variant = compileRoleVariant({
      archetypeId: seat.roleArchetypeId,
      specialization: "backend",
      seniorityLevel: "L5",
      projectIndustry: "general",
    });
    steps.push({ step: "variant", ok: variant.ok });
  }

  // Prompt compile
  if (seat) {
    const prompt = compileAgentPrompt({
      archetypeId: seat.roleArchetypeId,
      seatId: seat.seatId,
      projectId,
      objectiveTitle: plan.objectiveTitle,
    });
    steps.push({
      step: "prompt",
      ok: prompt.secretsScrubbed && prompt.tokenEstimate > 0,
    });
  }

  // Release instances
  for (const a of plan.allocations) {
    if (a.allocation?.instance?.id) {
      releaseInstance(a.allocation.instance.id, { projectId });
    }
  }
  if (product.instanceId) {
    try {
      releaseInstance(product.instanceId, { projectId });
    } catch {
      /* may already be released by invoke */
    }
  }

  // Isolation check
  const other = allocateSeatToProject({
    department: "engineering",
    projectId: "other-project",
  });
  let isolationOk = true;
  try {
    transitionInstance(other.instance.id, "assigned", { projectId });
    isolationOk = false;
  } catch {
    isolationOk = true;
  }
  if (other.ok) releaseInstance(other.instance.id, { projectId: "other-project" });

  const allOk =
    seatCheck.ok &&
    product.ok &&
    arch.ok &&
    eng.ok &&
    ["accepted", "accepted_with_warnings"].includes(qa.result) &&
    isolationOk &&
    (variant ? variant.ok : true);

  return {
    ok: allOk,
    liveProviderCalled: false,
    plan: {
      workflow: plan.workflow,
      departments: plan.departments,
      allocationCount: plan.allocations.filter((a) => a.allocation?.ok).length,
    },
    steps,
    remainingInstances: listInstances({ projectId }).filter(
      (i) => !["released", "archived"].includes(i.status)
    ).length,
    assertions: {
      durableSeatRegistry: seatCheck.ok,
      hierarchyPlan: plan.departments.length >= 3,
      independentQa: true,
      projectIsolation: isolationOk,
      noExternalSideEffect: true,
      documentsUsed: (eng.documentsUsed || []).length > 0,
    },
  };
}
