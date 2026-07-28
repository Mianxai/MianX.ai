/**
 * Work Breakdown Engine — Objective → Program → Epic → Feature → Story → Task → Agent Run
 * Structure only. Does not invent implementation details or run agents.
 */

import { makePlanningBase, uid } from "./schemas.js";
import { makeEdge } from "./graph.js";

function clip(s, n = 80) {
  const t = String(s || "").trim();
  return t.length <= n ? t : `${t.slice(0, n - 1)}…`;
}

/**
 * Build hierarchical WBS from planning inputs.
 */
export function buildWorkBreakdown({
  objective = "",
  capabilities = [],
  departments = [],
  modules = [],
  project_id = null,
  organization_id = null,
  company_name = "Planned company",
} = {}) {
  const company = makePlanningBase({
    kind: "company",
    slug: "planned-company",
    name: company_name,
    description: clip(objective, 200),
    project_id,
    organization_id,
    payload: { objective_summary: clip(objective, 240), executes: false },
  });

  const program = makePlanningBase({
    kind: "program",
    slug: "primary-program",
    name: "Primary delivery program",
    description: "Top-level program derived from Founder objective (planning only).",
    project_id,
    organization_id,
    parent_id: company.id,
    payload: { executes: false },
  });

  const portfolio = makePlanningBase({
    kind: "portfolio",
    slug: "capability-portfolio",
    name: "Capability portfolio",
    description: "Portfolio of capability-aligned epics.",
    project_id,
    organization_id,
    parent_id: company.id,
    payload: { program_id: program.id, executes: false },
  });

  const capList =
    capabilities.length > 0
      ? capabilities
      : [{ slug: "platform-foundation", name: "Platform foundation", owning_department: "engineering" }];

  const epics = [];
  const features = [];
  const stories = [];
  const tasks = [];
  const agentRuns = [];
  const edges = [];
  const deliverables = [];
  const successCriteria = [];

  for (const cap of capList) {
    const slug = typeof cap === "string" ? cap : cap.slug;
    const name = typeof cap === "string" ? cap : cap.name || cap.slug;
    const dept =
      (typeof cap === "object" && (cap.owning_department || cap.payload?.owning_department)) ||
      "engineering";

    const epic = makePlanningBase({
      kind: "epic",
      slug: `epic-${slug}`,
      name: `Epic: ${name}`,
      description: `Capability-aligned epic for ${slug}. No implementation invented.`,
      project_id,
      organization_id,
      parent_id: program.id,
      payload: {
        capability: slug,
        department: dept,
        executes: false,
      },
    });
    epics.push(epic);
    edges.push(makeEdge(program.id, epic.id, "requires"));

    const feature = makePlanningBase({
      kind: "feature",
      slug: `feat-${slug}`,
      name: `Feature shell: ${name}`,
      description: "Feature placeholder for later design — not a built module.",
      project_id,
      organization_id,
      parent_id: epic.id,
      payload: {
        capability: slug,
        module_hints: (typeof cap === "object" && (cap.required_modules || cap.payload?.required_modules)) || [],
        executes: false,
      },
    });
    features.push(feature);
    edges.push(makeEdge(epic.id, feature.id, "requires"));

    const story = makePlanningBase({
      kind: "story",
      slug: `story-${slug}-define`,
      name: `Define acceptance for ${name}`,
      description: "Story to clarify acceptance criteria with Founder — no build.",
      project_id,
      organization_id,
      parent_id: feature.id,
      payload: { executes: false },
    });
    stories.push(story);
    edges.push(makeEdge(feature.id, story.id, "requires"));

    const task = makePlanningBase({
      kind: "task",
      slug: `task-${slug}-plan`,
      name: `Plan work for ${name}`,
      description: "Planning task only. Does not invoke AI provider or mutate production.",
      project_id,
      organization_id,
      parent_id: story.id,
      payload: {
        department: dept,
        estimated_effort: 1,
        executes: false,
      },
    });
    tasks.push(task);
    edges.push(makeEdge(story.id, task.id, "requires"));

    const run = makePlanningBase({
      kind: "agent_run",
      slug: `run-${slug}-preview`,
      name: `Agent run preview: ${name}`,
      description: "Preview slot for a future agent run. Not scheduled. Not executed.",
      project_id,
      organization_id,
      parent_id: task.id,
      status: "draft",
      payload: {
        department: dept,
        agent_slug: null,
        status: "not_scheduled",
        executes: false,
        note: "Agent run is a planning placeholder for Phase G — never fabricated execution.",
      },
    });
    agentRuns.push(run);
    edges.push(makeEdge(task.id, run.id, "requires"));

    deliverables.push(
      makePlanningBase({
        kind: "deliverable",
        slug: `del-${slug}`,
        name: `Deliverable plan: ${name}`,
        description: "Expected planning deliverable (artifact definition only).",
        project_id,
        organization_id,
        parent_id: feature.id,
        payload: { capability: slug, executes: false },
      })
    );

    successCriteria.push(
      makePlanningBase({
        kind: "success_criteria",
        slug: `sc-${slug}`,
        name: `Success criteria: ${name}`,
        description: "Measurement contract placeholder — no production KPI values invented.",
        project_id,
        organization_id,
        parent_id: epic.id,
        payload: {
          capability: slug,
          criteria: ["Founder-accepted definition", "Capability ownership assigned"],
        },
      })
    );
  }

  // Sequence epics for wave planning
  for (let i = 1; i < epics.length; i++) {
    edges.push(makeEdge(epics[i - 1].id, epics[i].id, "wave_after"));
  }

  const moduleHints = (modules || []).map((m) =>
    typeof m === "string" ? m : m.slug
  );

  return {
    company,
    program,
    portfolio,
    epics,
    features,
    stories,
    tasks,
    agent_runs: agentRuns,
    deliverables,
    success_criteria: successCriteria,
    edges,
    departments: departments.map((d) => (typeof d === "string" ? d : d.slug || d.id)),
    module_hints: moduleHints,
    hierarchy: [
      "company",
      "program",
      "epic",
      "feature",
      "story",
      "task",
      "agent_run",
    ],
    execution_frozen: true,
    note: "WBS is structural planning only — no implementation invented, no agent runs scheduled.",
  };
}
