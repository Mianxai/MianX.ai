// Execution roadmap — ordered waves from phases + dependencies.

/**
 * Produce a Founder-facing execution roadmap (still non-executing).
 */
export function buildExecutionRoadmap(objective, ceoPlan, backlog, graph) {
  const waves = (ceoPlan.execution_phases || []).map((phase, idx) => {
    const features = (backlog.features || []).filter((f) => f.phase_id === phase.id);
    const tasks = (backlog.tasks || []).filter((t) =>
      features.some((f) => {
        // task → story → feature
        const story = (backlog.stories || []).find((s) => s.id === t.parent_id);
        return story && story.parent_id === f.id;
      })
    );
    return {
      wave: idx + 1,
      phase_id: phase.id,
      name: phase.name,
      goal: phase.goal,
      departments: phase.owners || [],
      feature_ids: features.map((f) => f.id),
      task_count: tasks.length,
      entry_criteria:
        idx === 0
          ? ["Founder approval of company blueprint"]
          : [`Prior wave ${idx} complete`, "No open required dependency blockers"],
      exit_criteria: [
        "Department artifacts reviewed",
        "Required dependency edges satisfied",
      ],
      status: "blocked_pending_founder_approval",
    };
  });

  return {
    product: objective.product_hint,
    industry: objective.industry,
    waves,
    critical_path: (graph.edges || [])
      .filter((e) => e.kind === "phase_sequence")
      .map((e) => `${e.from}→${e.to}`),
    parallelisable_departments_note:
      "Within a wave, departments may plan in parallel; required cross-dept edges still gate later waves.",
    execution_frozen: true,
    note: "Roadmap is inert until Founder approval. Approval does not auto-deploy or build industry OS.",
  };
}
