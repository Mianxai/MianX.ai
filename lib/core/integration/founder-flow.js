/**
 * Founder Integration UX — pure flow / empty-state / validation helpers.
 */

import { EXECUTION_MODES } from "./schemas.js";
import { isActiveProofProject } from "./project-access-shared.js";

export const FOUNDER_FLOW_STEPS = Object.freeze([
  { id: "project", label: "Project" },
  { id: "objective", label: "Objective" },
  { id: "clarification", label: "Clarification" },
  { id: "plan", label: "Plan" },
  { id: "plan_approval", label: "Plan Approval" },
  { id: "simulation_approval", label: "Simulation Approval" },
  { id: "simulation", label: "Simulation" },
  { id: "evidence", label: "Evidence" },
  { id: "memory_learning", label: "Memory & Learning" },
  { id: "final_review", label: "Final Review" },
  { id: "completed", label: "Completed" },
]);

export function filterRunsForProject(runs = [], projectId) {
  if (!projectId) return [];
  const seen = new Set();
  const out = [];
  for (const r of runs) {
    if (!r?.id || seen.has(r.id)) continue;
    if (r.project_id && r.project_id !== projectId) continue;
    seen.add(r.id);
    out.push(r);
  }
  return out;
}

export function runIdSuffix(id) {
  if (!id || typeof id !== "string") return "";
  if (id.length <= 8) return id;
  return id.slice(-8);
}

/** Client-safe mirror of server proof status mapping. */
export function mapProofStatusFromRun(run) {
  if (!run) return "not_started";
  const stage = run.current_stage;
  const status = run.status;
  if (stage === "completed" || status === "completed") return "completed";
  if (stage === "rejected" || status === "rejected") return "rejected";
  if (stage === "failed" || status === "failed") return "failed";
  if (stage === "paused" || status === "paused") return "paused";
  if (stage === "founder_final_review") return "awaiting_final_review";
  if (stage === "clarification_required") return "clarification_required";
  if (stage === "founder_approval_required") return "awaiting_plan_approval";
  if (stage === "simulation_approval_required") return "awaiting_simulation_approval";
  if (stage === "approved_for_simulation") return "simulation_approved";
  if (
    [
      "workforce_allocated",
      "tasks_claimed",
      "collaboration_running",
      "verification_running",
      "memory_writing",
      "learning_proposals_created",
    ].includes(stage)
  ) {
    return "simulation_running";
  }
  if (run.recovery_count > 0 && status === "active") return "recovering";
  if (stage === "objective_received" || stage === "objective_validated") {
    return "objective_created";
  }
  return "objective_created";
}

export function deriveStepStates(ctx) {
  const {
    hasProject,
    hasRun,
    proofStatus,
    runStage,
    runStatus,
  } = ctx;

  const stage = runStage || "";
  const status = proofStatus || "not_started";

  const completed = new Set();
  const current = new Set();
  const blocked = new Set();
  const pending = new Set();

  if (!hasProject) {
    current.add("project");
    for (const s of FOUNDER_FLOW_STEPS) {
      if (s.id !== "project") pending.add(s.id);
    }
    return { completed, current, blocked, pending };
  }

  completed.add("project");

  if (!hasRun && status === "not_started") {
    current.add("objective");
    for (const s of FOUNDER_FLOW_STEPS) {
      if (!completed.has(s.id) && s.id !== "objective") pending.add(s.id);
    }
    return { completed, current, blocked, pending };
  }

  completed.add("objective");

  if (stage === "clarification_required" || status === "clarification_required") {
    current.add("clarification");
    pending.add("plan");
    pending.add("plan_approval");
    pending.add("simulation_approval");
    pending.add("simulation");
    pending.add("evidence");
    pending.add("memory_learning");
    pending.add("final_review");
    pending.add("completed");
    return { completed, current, blocked, pending };
  }

  completed.add("clarification");

  if (
    ["objective_validated", "templates_matched", "capabilities_mapped", "plan_generated"].includes(
      stage
    ) ||
    status === "objective_created"
  ) {
    current.add("plan");
    pending.add("plan_approval");
    pending.add("simulation_approval");
    pending.add("simulation");
    pending.add("evidence");
    pending.add("memory_learning");
    pending.add("final_review");
    pending.add("completed");
    return { completed, current, blocked, pending };
  }

  completed.add("plan");

  if (stage === "founder_approval_required" || status === "awaiting_plan_approval") {
    current.add("plan_approval");
    pending.add("simulation_approval");
    pending.add("simulation");
    pending.add("evidence");
    pending.add("memory_learning");
    pending.add("final_review");
    pending.add("completed");
    return { completed, current, blocked, pending };
  }

  completed.add("plan_approval");
  completed.add("simulation_approval");

  if (
    ["approved_for_simulation", "workforce_allocated", "tasks_claimed", "collaboration_running", "verification_running", "memory_writing", "learning_proposals_created", "paused"].includes(
      stage
    ) ||
    status === "simulation_running" ||
    status === "simulation_approved"
  ) {
    current.add("simulation");
    pending.add("evidence");
    pending.add("memory_learning");
    pending.add("final_review");
    pending.add("completed");
    return { completed, current, blocked, pending };
  }

  completed.add("simulation");
  completed.add("evidence");
  completed.add("memory_learning");

  if (stage === "founder_final_review" || status === "awaiting_final_review") {
    current.add("final_review");
    pending.add("completed");
    return { completed, current, blocked, pending };
  }

  if (stage === "completed" || status === "completed" || runStatus === "completed") {
    completed.add("final_review");
    completed.add("completed");
    return { completed, current, blocked, pending };
  }

  if (stage === "rejected" || status === "rejected" || runStatus === "rejected") {
    blocked.add("completed");
    current.add("final_review");
    return { completed, current, blocked, pending };
  }

  current.add("objective");
  pending.add("plan");
  return { completed, current, blocked, pending };
}

export function getPlanGuidance(ctx) {
  if (!ctx.hasProject) {
    return {
      title: "No project selected",
      reason: "Select an active project before planning an integration run.",
      nextAction: "Use the project selector above or open Control Room.",
      actionTab: "dashboard",
    };
  }
  if (!ctx.hasRun) {
    return {
      title: "No objective created yet",
      reason: "Create a Founder objective or start the production proof from Control Room.",
      nextAction: "Open the Objective tab to create an objective, or Start Founder Proof on Control Room.",
      actionTab: "objective",
    };
  }
  if (ctx.runStage === "clarification_required") {
    return {
      title: "Objective awaiting clarification",
      reason: "The integration run needs a Founder clarification answer before planning continues.",
      nextAction: "Open Objective and submit clarification.",
      actionTab: "objective",
    };
  }
  if (ctx.runStage === "objective_validated") {
    return {
      title: "Plan not generated yet",
      reason: "Generate a deterministic plan after the objective is validated.",
      nextAction: "Use Generate deterministic plan below when ready.",
      actionTab: "plan",
    };
  }
  return null;
}

export function getSimulationGuidance(ctx) {
  if (!ctx.hasProject) {
    return {
      title: "No project selected",
      reason: "Simulation is scoped to a single authorised project.",
      nextAction: "Select a project first.",
      actionTab: "dashboard",
    };
  }
  if (!ctx.hasRun) {
    return {
      title: "No simulation run selected",
      reason: "There is no integration run for this project yet.",
      nextAction: "Create an objective or start the production proof.",
      actionTab: "objective",
    };
  }
  if (ctx.runStage === "founder_approval_required") {
    return {
      title: "Founder plan approval required",
      reason: "Simulation cannot proceed until the plan is explicitly approved on the Plan tab.",
      nextAction: "Open Plan and approve the plan (simulation still will not start).",
      actionTab: "plan",
    };
  }
  if (ctx.runStage === "simulation_approval_required") {
    return null; // panel itself shows approval CTA
  }
  if (ctx.runStage === "objective_validated" || ctx.runStage === "clarification_required") {
    return {
      title: "Prerequisites not met",
      reason: "Complete clarification and plan generation before simulation.",
      nextAction: "Finish Objective and Plan steps first.",
      actionTab: "plan",
    };
  }
  if (ctx.runStage === "approved_for_simulation") {
    return {
      title: "Ready to start simulation",
      reason: "Founder approved the plan. Simulation still requires an explicit Start simulation action.",
      nextAction: "Press Start simulation when ready — nothing runs automatically.",
      actionTab: "simulation",
    };
  }
  return null;
}

export function getEvidenceGuidance(ctx) {
  if (!ctx.hasProject) {
    return { title: "No project selected", reason: "Evidence is scoped to a project run." };
  }
  if (!ctx.hasRun) {
    return { title: "No run selected", reason: "Create an objective to produce evidence." };
  }
  const simStages = new Set([
    "approved_for_simulation",
    "workforce_allocated",
    "tasks_claimed",
    "collaboration_running",
    "verification_running",
    "memory_writing",
    "learning_proposals_created",
    "founder_final_review",
    "completed",
  ]);
  if (!simStages.has(ctx.runStage)) {
    return {
      title: "Simulation not started",
      reason: "Evidence is produced after simulation progresses.",
      nextAction: "Complete plan approval and start simulation.",
    };
  }
  if (!ctx.evidenceAvailable) {
    return {
      title: "Evidence not produced yet",
      reason: "No evidence manifest entries exist for this run yet.",
      nextAction: "Continue simulation until verification completes.",
    };
  }
  return null;
}

export function getMemoryGuidance(ctx) {
  if (!ctx.hasProject) return { title: "No project selected", reason: "Memory is project-scoped." };
  if (!ctx.hasRun) return { title: "No run selected", reason: "Memory is written during simulation." };
  if (!ctx.memoryCount) {
    return {
      title: "No persisted memory entries",
      reason: "No persisted memory entries exist for this run yet.",
    };
  }
  return null;
}

export function getLearningGuidance(ctx) {
  if (!ctx.hasProject) return { title: "No project selected", reason: "Learning is project-scoped." };
  if (!ctx.hasRun) return { title: "No run selected", reason: "Learning proposals appear after simulation." };
  if (!ctx.learningCount) {
    return {
      title: "No learning proposals",
      reason: "No learning proposals exist for this run yet.",
    };
  }
  return null;
}

export function getProofPackGuidance(ctx) {
  if (!ctx.hasProject) {
    return {
      title: "Select a project",
      reason: "Proof pack is tied to a single production project.",
    };
  }
  if (ctx.proofStatus === "not_started" && !ctx.hasRun) {
    return {
      title: "Proof not started",
      reason: "Start the Founder production proof or create an objective.",
      nextAction:
        "Control Room → Start Founder Proof (with confirmation) or Objective → Create objective.",
      prerequisites: [
        "Active authorised project selected",
        "Durable persistence ready",
        "Simulation readiness true",
        "Explicit Founder confirmation for production proof",
      ],
    };
  }
  return null;
}

export function normalizeListField(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string") return value;
  return "";
}

export function parseListField(text) {
  return String(text || "")
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getCreateObjectiveDisabledReason({
  projectsLoading,
  projectsLoaded,
  projectId,
  selectedProject,
  persistenceReady,
  title,
  purpose,
  deliverables,
  criteria,
  executionMode,
  busy,
}) {
  if (busy) return "Action in progress…";
  if (projectsLoading || !projectsLoaded) return "Loading projects…";
  if (!projectId) return "Select a specific project (not All projects).";
  if (!selectedProject) return "Selected project is inaccessible.";
  if (!isActiveProofProject(selectedProject)) {
    return "Selected project must be active (not archived or paused).";
  }
  if (!persistenceReady) return "Durable integration persistence is not ready.";
  if (!String(title || "").trim()) return "Title is required.";
  if (!String(purpose || "").trim()) return "Business purpose is required.";
  if (!String(deliverables || "").trim()) return "Expected deliverables are required.";
  if (!String(criteria || "").trim()) return "Success criteria are required.";
  if (!EXECUTION_MODES.includes(executionMode)) return "Execution mode is invalid.";
  return null;
}
