/**
 * Bridge Company Builder → Phase H integration pipeline.
 * Does not replace CB; attaches an integration run handle after blueprint approval.
 * Simulation ≠ completed real company.
 */

import {
  createIntegrationRun,
  submitClarification,
  generateIntegrationPlan,
} from "../integration/orchestrator.js";

/**
 * After a Company Builder blueprint is Founder-approved, open the E2E
 * integration pipeline in deterministic simulation mode.
 */
export function attachIntegrationPipelineFromBlueprint(blueprint, { actor = "founder" } = {}) {
  if (!blueprint?.id) throw new Error("blueprint required");
  if (blueprint.status !== "approved") {
    return {
      ok: false,
      reason: "blueprint_not_approved",
      simulation_equals_real_company: false,
    };
  }

  const project_id =
    blueprint.project_id || blueprint.projectId || blueprint.payload?.project_id;
  if (!project_id) {
    return { ok: false, reason: "project_id_missing", simulation_equals_real_company: false };
  }

  const objectiveText =
    blueprint.objective?.raw_text ||
    blueprint.objective?.objective ||
    blueprint.ceo_plan?.objective ||
    `Company Builder blueprint ${blueprint.id}`;

  let { run } = createIntegrationRun(
    {
      title: `CB → Integration: ${blueprint.id}`,
      business_purpose: String(objectiveText).slice(0, 2000),
      expected_deliverables: ["integration proof pack", "simulation evidence"],
      success_criteria: ["founder final review", "lineage preserved"],
      project_id,
      organization_id: blueprint.organization_id || null,
      execution_mode: "deterministic_simulation",
      industry: blueprint.objective?.industry || blueprint.industry || "technology",
      business_model:
        blueprint.objective?.business_model ||
        blueprint.objective?.model ||
        "subscription",
      known_assumptions: [
        "Originated from Company Builder blueprint",
        "Deterministic simulation does not equal a completed real company",
      ],
    },
    { actor, idempotency_key: `cb-int:${blueprint.id}` }
  );

  if (run.current_stage === "clarification_required") {
    ({ run } = submitClarification(
      run.id,
      {
        title: `CB → Integration: ${blueprint.id}`,
        business_purpose: String(objectiveText).slice(0, 2000),
        expected_deliverables: ["integration proof pack", "simulation evidence"],
        success_criteria: ["founder final review", "lineage preserved"],
        industry: blueprint.objective?.industry || "technology",
        business_model: blueprint.objective?.business_model || "subscription",
        clear_questions: true,
      },
      { actor }
    ));
  }

  if (run.current_stage === "objective_validated") {
    run = generateIntegrationPlan(run.id, { actor });
  }

  return {
    ok: true,
    integration_run_id: run.id,
    stage: run.current_stage,
    status: run.status,
    simulation_equals_real_company: false,
    proof_level: "LEVEL_1_DETERMINISTIC_SIMULATION",
    next: "Founder must explicitly approve simulation in /admin/integration",
  };
}
