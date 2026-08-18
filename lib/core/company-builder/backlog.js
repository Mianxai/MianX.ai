// Unified enterprise backlog — epics → features → stories → tasks (+ planned agent runs).

function id(prefix, n) {
  return `${prefix}-${String(n).padStart(3, "0")}`;
}

/**
 * Build a traceable backlog tree from objective + CEO + department plans.
 * Agent runs are planned slots only — not executed.
 */
export function buildEnterpriseBacklog(objective, ceoPlan, departmentPlans) {
  const companyId = id("company", 1);
  const productId = id("product", 1);
  const programId = id("program", 1);

  const company = {
    id: companyId,
    level: "company",
    title: "MianX.ai",
    parent_id: null,
  };
  const product = {
    id: productId,
    level: "product",
    title: objective.product_hint,
    parent_id: companyId,
    industry: objective.industry,
  };
  const program = {
    id: programId,
    level: "program",
    title: `${objective.product_hint} — Company Builder program`,
    parent_id: productId,
  };

  const epics = [];
  const features = [];
  const stories = [];
  const tasks = [];
  const agentRuns = [];

  let epicN = 0;
  let featureN = 0;
  let storyN = 0;
  let taskN = 0;
  let runN = 0;

  for (const phase of ceoPlan.execution_phases || []) {
    epicN += 1;
    const epicId = id("epic", epicN);
    epics.push({
      id: epicId,
      level: "epic",
      title: `${phase.name}: ${phase.goal}`,
      parent_id: programId,
      phase_id: phase.id,
      owners: phase.owners || [],
    });

    for (const dept of phase.owners || []) {
      featureN += 1;
      const featureId = id("feature", featureN);
      const deptPlan = (departmentPlans || []).find((d) => d.department === dept);
      features.push({
        id: featureId,
        level: "feature",
        title: `${dept} — ${phase.name} capability`,
        parent_id: epicId,
        department: dept,
        phase_id: phase.id,
      });

      const streams = deptPlan?.workstreams?.length
        ? deptPlan.workstreams
        : ["plan"];
      for (const stream of streams) {
        storyN += 1;
        const storyId = id("story", storyN);
        stories.push({
          id: storyId,
          level: "story",
          title: `${dept}: ${stream}`,
          parent_id: featureId,
          department: dept,
        });

        taskN += 1;
        const taskId = id("task", taskN);
        tasks.push({
          id: taskId,
          level: "task",
          title: `Produce ${stream} artifact for ${objective.product_hint}`,
          parent_id: storyId,
          department: dept,
          status: "planned",
          execution_allowed: false,
        });

        runN += 1;
        agentRuns.push({
          id: id("agent_run", runN),
          level: "agent_run",
          title: `Planned agent run — ${dept} / ${stream}`,
          parent_id: taskId,
          department: dept,
          status: "planned_not_started",
          note: "Traceability slot only. No agent run is started before Founder approval.",
        });
      }
    }
  }

  return {
    company,
    product,
    program,
    epics,
    features,
    stories,
    tasks,
    agent_runs: agentRuns,
    counts: {
      epics: epics.length,
      features: features.length,
      stories: stories.length,
      tasks: tasks.length,
      agent_runs: agentRuns.length,
    },
    traceability:
      "company → product → program → epic → feature → story → task → agent_run",
  };
}
