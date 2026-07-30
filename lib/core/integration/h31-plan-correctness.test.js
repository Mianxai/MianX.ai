/**
 * Phase H.3.1 — Founder plan routing + readiness tests.
 */

import { describe, it, expect } from "vitest";
import { FOUNDER_PRODUCTION_PROOF_OBJECTIVE } from "./proof.js";
import { allocateAgentsForPlan } from "./allocation.js";
import { resolveTaskDepartment, resolveDepartmentIntent } from "./intent-department.js";
import { normalizePlanRisks, countTaskDependencies, proposeDepartmentForTask } from "./plan-metrics.js";
import { extractPlanTasks, extractProposedAgents, deriveQuickStartStates } from "./founder-labels.js";
import { validateFounderPlanReadiness } from "./plan-readiness.js";

const PROJECT = "61d3b1fd-c260-479b-9289-0c75f977e892";
const RUN_ID = "e8848aeb-388f-49b3-9b44-7ffbfa715110";

function onboardingRun(overrides = {}) {
  const tasks = [
    {
      id: "t1",
      title: "Identity and Access",
      purpose: "Define identity provider and access provisioning",
      department: "engineering",
      payload: { department: "engineering", capability: "identity-access" },
    },
    {
      id: "t2",
      title: "Organisation Management",
      purpose: "Employee lifecycle and role assignment",
      department: "engineering",
      payload: { department: "engineering" },
    },
    {
      id: "t3",
      title: "Security Controls",
      purpose: "Access governance and separation of duties",
      department: "engineering",
    },
    {
      id: "t4",
      title: "Operational Readiness",
      purpose: "Onboarding handoffs and operational verification",
      department: "engineering",
    },
  ];
  return {
    id: RUN_ID,
    project_id: PROJECT,
    current_stage: "founder_approval_required",
    status: "active",
    execution_mode: "deterministic_simulation",
    objective: {
      ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
      is_production_proof: true,
    },
    proof: { is_production_proof: true },
    planning_plan: {
      wbs: {
        tasks,
        edges: [
          { from: "t1", to: "t2", kind: "after" },
          { from: "t2", to: "t3", kind: "after" },
          { from: "t3", to: "t4", kind: "after" },
        ],
      },
      objective: { title: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title },
    },
    approval_package: {
      proposed_agents: [
        { slug: "lead-intelligence", role: "Lead Intelligence", reason: "Proposed for deterministic simulation" },
        { slug: "research", role: "Research", reason: "Proposed for deterministic simulation" },
      ],
      risks: [
        { slug: "live_ai_provider_not_configured", severity: "medium", mitigation: "Use deterministic simulation" },
        { slug: "delivery_scope_may_expand", severity: "low", mitigation: "Keep scope fixed" },
      ],
      protected_actions: ["production_deployment"],
      dependencies: [
        { from: "t1", to: "t2" },
        { from: "t2", to: "t3" },
        { from: "t3", to: "t4" },
      ],
    },
    ...overrides,
  };
}

describe("onboarding department routing", () => {
  it("routes identity to Security not Engineering", () => {
    const r = resolveTaskDepartment(
      { title: "Identity and Access", purpose: "access provisioning", department: "engineering" },
      0,
      { objectiveText: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title }
    );
    expect(r.department).toBe("Security");
    expect(r.supporting).toBe("Infrastructure");
  });

  it("routes organisation/lifecycle to Human Resources", () => {
    const r = resolveTaskDepartment(
      { title: "Organisation Management", purpose: "employee lifecycle" },
      1
    );
    expect(r.department).toBe("Human Resources");
  });

  it("routes operational readiness to Operations", () => {
    expect(proposeDepartmentForTask({ title: "Operational Readiness" })).toBe("Operations");
  });

  it("extractPlanTasks overrides engineering payload", () => {
    const tasks = extractPlanTasks(onboardingRun());
    expect(tasks.map((t) => t.department)).toEqual([
      "Security",
      "Human Resources",
      "Security",
      "Operations",
    ]);
    expect(tasks.every((t) => t.department !== "Unassigned")).toBe(true);
  });
});

describe("onboarding agent selection", () => {
  it("excludes lead-intelligence and research", () => {
    const alloc = allocateAgentsForPlan({
      planning_plan: {
        objective: { title: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title, is_production_proof: true },
      },
      is_production_proof: true,
      objective_title: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title,
      max_agents: 8,
    });
    const slugs = alloc.selected_agents.map((a) => a.slug);
    expect(slugs).not.toContain("lead-intelligence");
    expect(slugs).not.toContain("research");
  });

  it("covers HR, Security, Ops, QA preferences when executable", () => {
    const agents = extractProposedAgents(onboardingRun());
    const slugs = agents.map((a) => a.slug);
    expect(slugs).not.toContain("lead-intelligence");
    expect(slugs).not.toContain("research");
    // At least one of each family when present in catalogue
    const joined = slugs.join(" ");
    expect(/executive-ceo|ops-coordinator|qa-review|platform-security|hr-workforce|security-review|delivery-qa/.test(joined)).toBe(
      true
    );
    expect(agents.every((a) => a.reason && !/Proposed for deterministic simulation/i.test(a.reason))).toBe(
      true
    );
  });
});

describe("dependencies and risks", () => {
  it("counts three acyclic dependencies with human labels", () => {
    const run = onboardingRun();
    const deps = countTaskDependencies(
      run.approval_package.dependencies,
      run.planning_plan.wbs.tasks
    );
    expect(deps.count).toBe(3);
    expect(deps.edges[0].from_label).toMatch(/Identity/i);
    expect(deps.edges[0].to_label).toMatch(/Organisation/i);
  });

  it("humanizes risk titles from slug", () => {
    const cards = normalizePlanRisks(onboardingRun().approval_package.risks);
    expect(cards[0].title).toMatch(/Live Ai Provider Not Configured|Live AI Provider/i);
    expect(cards[0].title).not.toMatch(/^Risk 1$/);
  });
});

describe("plan readiness", () => {
  it("is ready or warning for corrected onboarding plan", () => {
    const v = validateFounderPlanReadiness(onboardingRun());
    expect(["ready", "warning"]).toContain(v.status);
    expect(v.approve_enabled).toBe(true);
    expect(v.simulation_blocked_until_separate_approval).toBe(true);
    expect(v.will_not_happen_on_approve.join(" ")).toMatch(/Simulation does not start/i);
  });

  it("blocks when discouraged agents remain without recompute path", () => {
    const run = onboardingRun({
      proof: { is_production_proof: false },
      objective: { title: "Generic sales outreach", is_production_proof: false },
      planning_plan: { wbs: { tasks: [] } },
      approval_package: {
        proposed_agents: [{ slug: "lead-intelligence", reason: "x" }],
        protected_actions: ["production_deployment"],
      },
    });
    // empty tasks → blocked
    const v = validateFounderPlanReadiness(run);
    expect(v.status).toBe("blocked");
    expect(v.approve_enabled).toBe(false);
  });
});

describe("quick start states", () => {
  it("exposes distinct current/next/upcoming/completed states", () => {
    const steps = deriveQuickStartStates(onboardingRun(), { hasProject: true });
    const states = new Set(steps.map((s) => s.state));
    expect(states.has("current")).toBe(true);
    expect([...states].every((s) => ["current", "completed", "upcoming"].includes(s))).toBe(true);
  });
});

describe("intent resolver reusable", () => {
  it("does not hardcode only the Founder Proof title", () => {
    const intent = resolveDepartmentIntent({
      title: "Access governance checklist",
      purpose: "security controls",
    });
    expect(intent?.primary).toBe("security");
  });
});
