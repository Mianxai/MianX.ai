import { describe, expect, it } from "vitest";
import {
  countTaskDependencies,
  normalizePlanRisks,
  proposeDepartmentForTask,
  displayDepartment,
} from "./plan-metrics.js";
import { allocateAgentsForPlan } from "./allocation.js";
import {
  extractPlanTasks,
  extractProposedAgents,
  extractPlanDependencySummary,
  extractPlanRiskCards,
} from "./founder-labels.js";
import { buildFounderApprovalPackage } from "./orchestrator.js";

describe("countTaskDependencies", () => {
  it("counts unique task-to-task edges only", () => {
    const tasks = [
      { id: "task-1", title: "A" },
      { id: "task-2", title: "B" },
      { id: "task-3", title: "C" },
      { id: "task-4", title: "D" },
    ];
    const edges = [
      { from: "program-1", to: "epic-1", kind: "contains" },
      { from: "epic-1", to: "feature-1", kind: "contains" },
      { from: "feature-1", to: "task-1", kind: "contains" },
      { from: "task-1", to: "task-2", kind: "depends_on" },
      { from: "task-2", to: "task-3", kind: "depends_on" },
      { from: "task-3", to: "task-4", kind: "depends_on" },
      { from: "task-1", to: "task-2", kind: "depends_on" }, // duplicate
      { from: "template-ref", to: "task-1", kind: "uses" },
      { from: "risk-1", to: "task-2", kind: "mitigates" },
    ];
    const result = countTaskDependencies(edges, tasks);
    expect(result.count).toBe(3);
    expect(result.edges).toHaveLength(3);
  });

  it("implies sequential deps when no task edges exist", () => {
    const tasks = [
      { id: "task-1" },
      { id: "task-2" },
      { id: "task-3" },
      { id: "task-4" },
    ];
    const result = countTaskDependencies(
      [
        { from: "program", to: "epic", kind: "contains" },
        { from: "epic", to: "feature", kind: "contains" },
      ],
      tasks
    );
    expect(result.count).toBe(3);
    expect(result.edges.every((e) => e.implied)).toBe(true);
  });
});

describe("normalizePlanRisks", () => {
  it("renders human-readable cards without raw JSON strings as titles", () => {
    const cards = normalizePlanRisks([
      {
        code: "provider_not_configured",
        severity: "medium",
        description: "Live provider execution is unavailable.",
        mitigation: "Continue with deterministic simulation.",
      },
      "Circular dependency check passed",
    ]);
    expect(cards[0].title).toMatch(/provider/i);
    expect(cards[0].meaning).toMatch(/unavailable/i);
    expect(cards[1].title).toMatch(/Circular/);
    expect(JSON.stringify(cards)).not.toMatch(/\{"code"/);
  });
});

describe("proposeDepartmentForTask", () => {
  it("maps onboarding WBS titles to canonical departments", () => {
    expect(proposeDepartmentForTask({ title: "Identity and access" }, 0)).toMatch(
      /Security|Infrastructure/
    );
    expect(proposeDepartmentForTask({ title: "Organisation management" }, 1)).toMatch(
      /Human Resources/
    );
    expect(proposeDepartmentForTask({ title: "Onboarding operations" }, 2)).toMatch(
      /Operations/
    );
    expect(proposeDepartmentForTask({ title: "Verification and evidence" }, 3)).toMatch(
      /Quality Assurance/
    );
  });

  it("displayDepartment never returns Unassigned for known keys", () => {
    expect(displayDepartment("hr")).toBe("Human Resources");
    expect(displayDepartment("security")).toBe("Security");
  });
});

describe("onboarding agent allocation", () => {
  it("prioritises HR, security, ops, QA — not lead-intelligence or research", () => {
    const allocation = allocateAgentsForPlan({
      planning_plan: {
        objective: {
          title: "Secure Internal Employee Onboarding Workflow",
          business_purpose: "Provision identity and access for new employees",
        },
        objective_title: "Secure Internal Employee Onboarding Workflow",
        wbs: {
          tasks: [
            { id: "task-1", title: "Identity and access" },
            { id: "task-2", title: "Organisation management" },
            { id: "task-3", title: "Onboarding operations" },
            { id: "task-4", title: "Verification and evidence" },
          ],
        },
      },
      project_id: "proj-test",
      integration_run_id: "run-test",
    });

    const slugs = allocation.selected_agents.map((a) => a.slug);
    expect(slugs).toContain("executive-ceo");
    expect(slugs.some((s) => /hr|workforce-planner/i.test(s))).toBe(true);
    expect(slugs.some((s) => /security|platform-security/i.test(s))).toBe(true);
    expect(slugs).toContain("ops-coordinator");
    expect(slugs.some((s) => /qa/i.test(s))).toBe(true);
    expect(slugs).not.toContain("lead-intelligence");
    expect(slugs).not.toContain("research");
    for (const agent of allocation.selected_agents) {
      expect(agent.reason).toBeTruthy();
      expect(String(agent.reason).length).toBeGreaterThan(8);
    }
  });
});

describe("plan presentation helpers", () => {
  const sampleRun = {
    id: "run-1",
    current_stage: "founder_approval_required",
    status: "awaiting_plan_approval",
    execution_mode: "deterministic_simulation",
    project_id: "proj-1",
    objective: {
      title: "Secure Internal Employee Onboarding Workflow",
      business_purpose: "Secure onboarding",
      protected_actions: ["production_deployment"],
    },
    planning_plan: {
      id: "plan-1",
      objective: {
        title: "Secure Internal Employee Onboarding Workflow",
      },
      wbs: {
        tasks: [
          { id: "task-1", title: "Identity and access", purpose: "IAM" },
          { id: "task-2", title: "Organisation management", purpose: "HR" },
          { id: "task-3", title: "Onboarding operations", purpose: "Ops" },
          { id: "task-4", title: "Verification and evidence", purpose: "QA" },
        ],
        edges: [
          { from: "program-1", to: "epic-1", kind: "contains" },
          { from: "task-1", to: "task-2", kind: "depends_on" },
          { from: "task-2", to: "task-3", kind: "depends_on" },
          { from: "task-3", to: "task-4", kind: "depends_on" },
        ],
      },
      risks: [
        {
          title: "Provider is not configured",
          severity: "medium",
          meaning: "Live provider execution is unavailable.",
          mitigation: "Continue with deterministic simulation.",
        },
      ],
    },
  };

  it("extractPlanTasks proposes departments (never Unassigned alone)", () => {
    const tasks = extractPlanTasks(sampleRun);
    expect(tasks).toHaveLength(4);
    for (const t of tasks) {
      expect(t.department).toBeTruthy();
      expect(t.department.toLowerCase()).not.toBe("unassigned");
    }
  });

  it("extractPlanDependencySummary uses truthful task dependency count", () => {
    const summary = extractPlanDependencySummary(sampleRun);
    expect(summary.count).toBe(3);
  });

  it("extractPlanRiskCards are human-readable", () => {
    const cards = extractPlanRiskCards(sampleRun);
    expect(cards[0].title).toMatch(/Provider/i);
    expect(cards[0].meaning).toBeTruthy();
  });

  it("buildFounderApprovalPackage includes dependency_summary and agent reasons", () => {
    const pkg = buildFounderApprovalPackage(sampleRun);
    expect(pkg.dependency_summary.count).toBeLessThanOrEqual(3);
    expect(pkg.proposed_agents.length).toBeGreaterThan(0);
    expect(pkg.proposed_agents.every((a) => a.reason)).toBe(true);
    const slugs = pkg.proposed_agents.map((a) => a.slug);
    expect(slugs).not.toContain("lead-intelligence");
    expect(slugs).not.toContain("research");
  });

  it("extractProposedAgents includes selection reasons", () => {
    const run = {
      ...sampleRun,
      approval_package: buildFounderApprovalPackage(sampleRun),
    };
    const agents = extractProposedAgents(run);
    expect(agents.every((a) => a.reason)).toBe(true);
  });
});
