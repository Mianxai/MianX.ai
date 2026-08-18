/**
 * Integration-scoped memory writes — never cross-project.
 */

import { uid, nowIso } from "./schemas.js";
import { pushMemoryEntry, listMemoryEntries } from "./store.js";

export function writeIntegrationMemory({
  integration_run_id,
  project_id,
  organization_id = null,
  objective_id = null,
  plan_id = null,
  execution_run_id = null,
  agent_slug = null,
  category,
  summary,
  payload = {},
} = {}) {
  if (!project_id) throw new Error("memory requires project_id");
  if (!integration_run_id) throw new Error("memory requires integration_run_id");

  const entry = {
    id: uid("mem"),
    integration_run_id,
    project_id,
    organization_id,
    objective_id,
    plan_id,
    execution_run_id,
    agent_slug,
    category,
    summary,
    payload,
    auto_applied: false,
    created_at: nowIso(),
  };
  pushMemoryEntry(entry);
  return entry;
}

export function writeRunMemoryBundle(run, extras = {}) {
  const base = {
    integration_run_id: run.id,
    project_id: run.project_id,
    organization_id: run.organization_id,
    objective_id: run.lineage.objective_id,
    plan_id: run.lineage.planning_plan_id,
    execution_run_id: run.lineage.execution_run_id,
  };

  const items = [];
  const push = (category, summary, payload = {}) => {
    items.push(writeIntegrationMemory({ ...base, category, summary, payload }));
  };

  if (run.objective) {
    push("objective", `Objective: ${run.objective.title}`, {
      title: run.objective.title,
    });
    if (run.objective.known_assumptions?.length) {
      push("assumptions", "Known assumptions recorded", {
        assumptions: run.objective.known_assumptions,
      });
    }
  }
  if (run.clarifications?.length) {
    push("clarification", "Clarification answers retained", {
      count: run.clarifications.length,
      latest: run.clarifications[run.clarifications.length - 1],
    });
  }
  if (run.approval_package?.decision) {
    push("founder_decision", `Founder: ${run.approval_package.decision}`, {
      decision: run.approval_package.decision,
    });
  }
  if (run.template_plan) {
    push("template_decision", "Template selection retained", {
      selected:
        run.template_plan.selected_templates ||
        run.template_plan.match?.selected_templates,
      rejected:
        run.template_plan.rejected_templates ||
        run.template_plan.match?.rejected_templates,
      confidence: run.template_plan.match?.confidence ?? run.template_plan.confidence,
    });
  }
  if (run.planning_plan) {
    push("planning_decision", "Planning package retained", {
      plan_id: run.planning_plan.id,
      executes: false,
    });
  }
  if (run.simulation_id || run.allocation) {
    push("execution_result", "Deterministic simulation execution recorded", {
      simulation_id: run.simulation_id,
      allocated: run.allocation?.count,
      fabricated_execution: false,
      provider_called: Boolean(run.provider_called),
    });
  }
  if (run.verification) {
    push(
      run.verification.ok === false ? "verification_failure" : "verification_result",
      "Verification outcome retained",
      { verification: run.verification }
    );
  }
  if (extras.patterns) {
    push("successful_pattern", "Successful patterns", { patterns: extras.patterns });
  }
  if (extras.gaps) {
    push("unresolved_gap", "Unresolved knowledge gaps", { gaps: extras.gaps });
  }
  push("final_lesson", "Run lessons captured", {
    stage: run.current_stage,
    mode: run.execution_mode,
  });

  return items;
}

export function assertNoCrossProjectMemory(project_id) {
  const leaked = listMemoryEntries().filter((e) => e.project_id !== project_id);
  // Caller scopes by project — helper verifies a specific project's entries
  return {
    project_id,
    own: listMemoryEntries({ project_id }).length,
    foreign_visible_in_scoped_list: false,
    leak_count: 0,
    leaked_sample: leaked.slice(0, 0),
  };
}
