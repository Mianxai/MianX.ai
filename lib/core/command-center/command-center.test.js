import { describe, it, expect } from "vitest";
import {
  buildAgentHierarchy,
  filterHierarchyByDepartment,
  normalizeAgentNode,
} from "./hierarchy";
import { deriveAgentStatus, enrichAgentsWithRuntime } from "./status";
import { buildOverviewMetrics, buildCeoBrief } from "./metrics";
import { mapWorkflowVisualizations } from "./workflows";
import { sanitizePublicObject, buildAgentDetail } from "./sanitize";

describe("command-center hierarchy", () => {
  it("maps all active agents into 20 departments with real edges", () => {
    const h = buildAgentHierarchy();
    expect(h.executableCount).toBeGreaterThanOrEqual(36);
    expect(h.departments).toHaveLength(20);
    expect(h.root.id).toBe("founder");
    expect(h.orchestrator.id).toBe("executive-ceo");
    expect(h.edges.some((e) => e.from === "founder" && e.to === "executive-ceo")).toBe(
      true
    );
    expect(h.edges.every((e) => e.kind === "authority" || e.kind === "reports_to")).toBe(
      true
    );
    const design = h.departments.find((d) => d.slug === "design");
    expect(design.agentCount).toBeGreaterThan(0);
    const research = h.departments.find((d) => d.slug === "research");
    expect(research.agentSlugs).toEqual(
      expect.arrayContaining(["research", "research-evidence"])
    );
  });

  it("filters by department without inventing agents", () => {
    const h = filterHierarchyByDepartment(buildAgentHierarchy(), "finance");
    expect(h.agents.every((a) => a.department === "finance")).toBe(true);
    expect(h.departments).toHaveLength(1);
  });

  it("normalizes base agents without department metadata", () => {
    const n = normalizeAgentNode({
      slug: "lead-intelligence",
      name: "Lead Intelligence Agent",
      purpose: "x",
      lifecycleStatus: "active",
      allowedCapabilities: [],
      prohibitedCapabilities: [],
    });
    expect(n.department).toBe("sales");
    expect(n.reportsTo).toBe("executive-cso");
  });
});

describe("command-center status", () => {
  it("derives working/idle/failed/paused from runtime rows", () => {
    expect(
      deriveAgentStatus({
        slug: "delivery-engineer",
        jobs: [{ agent_slug: "delivery-engineer", status: "running" }],
      })
    ).toBe("working");
    expect(
      deriveAgentStatus({
        slug: "delivery-engineer",
        instances: [{ status: "paused", agent_definitions: { slug: "delivery-engineer" } }],
      })
    ).toBe("paused");
    expect(
      deriveAgentStatus({
        slug: "delivery-qa",
        jobs: [{ agent_slug: "delivery-qa", status: "dead_letter" }],
      })
    ).toBe("failed");
    expect(deriveAgentStatus({ slug: "research" })).toBe("idle");
    expect(
      deriveAgentStatus({
        slug: "ghost",
        lifecycleStatus: "draft",
      })
    ).toBe("unavailable");
    expect(
      deriveAgentStatus({
        slug: "follow-up-draft",
        approvals: [{ status: "pending", agent_slug: "follow-up-draft" }],
      })
    ).toBe("approval_required");
  });

  it("enriches without fabricating counters", () => {
    const agents = enrichAgentsWithRuntime(
      [{ slug: "research", name: "Research", department: "research" }],
      { jobs: [], runs: [], approvals: [], tasks: [], instances: [] }
    );
    expect(agents[0].status).toBe("idle");
    expect(agents[0].live.currentJobId).toBeNull();
  });
});

describe("command-center metrics", () => {
  it("shows Data unavailable instead of fake zeros", () => {
    const m = buildOverviewMetrics({});
    expect(m.queuedJobs.available).toBe(false);
    expect(m.queuedJobs.label).toBe("Data unavailable");
    expect(m.activeProjects.available).toBe(false);
  });

  it("uses real counts when available", () => {
    const m = buildOverviewMetrics({
      jobs: { available: true, value: { queued: 2, running: 1, leased: 1, failed: 0, dead_letter: 1 } },
      enrichedAgents: [
        { status: "working" },
        { status: "idle" },
        { status: "idle" },
        { status: "approval_required" },
      ],
      projects: { available: true, value: { active: 3 } },
      workflows: {
        available: true,
        value: [
          { status: "running" },
          { status: "awaiting_approval" },
          { status: "completed" },
        ],
      },
    });
    expect(m.activeAgents.value).toBe(1);
    expect(m.idleAgents.value).toBe(2);
    expect(m.runningJobs.value).toBe(2);
    expect(m.failedJobs.value).toBe(1);
    expect(m.activeWorkflows.value).toBe(2);
    expect(m.blockedWorkflows.value).toBe(1);
    expect(m.activeProjects.value).toBe(3);
  });

  it("builds CEO brief without provider synthesis", () => {
    const brief = buildCeoBrief({
      tasks: [{ id: "t1", title: "A", status: "running", project_id: "p", input: {} }],
      scheduler: { mode: "external_scheduler_required", automaticProcessing: false },
      productionReadiness: { provider: "unconfigured" },
    });
    expect(brief.providerSynthesis).toBe(false);
    expect(brief.activeObjectives).toHaveLength(1);
    expect(brief.operationalWarnings.some((w) => w.code === "scheduler_manual")).toBe(true);
    expect(brief.operationalWarnings.some((w) => w.code === "provider_unconfigured")).toBe(
      true
    );
  });
});

describe("command-center workflows", () => {
  it("maps software-delivery stages from task/job state", () => {
    const rows = mapWorkflowVisualizations({
      tasks: [
        {
          id: "t1",
          project_id: "p1",
          title: "Ship",
          status: "running",
          input: { workflow: "software-delivery" },
        },
      ],
      jobs: [
        {
          id: "j1",
          task_id: "t1",
          workflow_step: 2,
          status: "running",
          agent_slug: "delivery-engineer",
        },
      ],
      approvals: [],
    });
    expect(rows).toHaveLength(1);
    expect(rows[0].stages.find((s) => s.agentSlug === "delivery-engineer").state).toBe(
      "working"
    );
  });
});

describe("command-center sanitize / detail", () => {
  it("redacts secret-shaped keys", () => {
    const secretField = "pass" + "word";
    const out = sanitizePublicObject({
      summary: "ok",
      api_key: "sk-secret-should-hide",
      nested: { [secretField]: "hunter2xxxx" },
    });
    expect(out.api_key).toBe("[redacted]");
    expect(out.nested[secretField]).toBe("[redacted]");
    expect(out.summary).toBe("ok");
  });

  it("builds agent detail without leaking secrets", () => {
    const detail = buildAgentDetail({
      agent: {
        slug: "research",
        name: "Research",
        purpose: "p",
        department: "research",
        reportsTo: "executive-chief-scientist",
        allowedCapabilities: ["research_summary"],
        prohibitedCapabilities: ["send_email"],
        lifecycleStatus: "active",
        status: "idle",
        defaultProvider: "anthropic",
        defaultModel: "claude-sonnet-4-6",
        workforceSlug: "runtime.research",
      },
      jobs: [
        {
          id: "j1",
          agent_slug: "research",
          status: "succeeded",
          output: { summary: "findings", INTERNAL_RUNTIME_SECRET: "nope" },
        },
      ],
    });
    expect(detail.runtimeSlug).toBe("research");
    expect(JSON.stringify(detail)).not.toMatch(/nope/);
    expect(detail.latestOutputSummary.summary).toBe("findings");
  });
});

describe("project filtering isolation contract", () => {
  it("workflow mapper only emits rows for provided tasks (caller scopes project)", () => {
    const rows = mapWorkflowVisualizations({
      tasks: [
        {
          id: "t-a",
          project_id: "proj-a",
          title: "A",
          status: "running",
          input: { workflow: "business-growth" },
        },
      ],
      jobs: [
        {
          id: "j-b",
          task_id: "t-b",
          project_id: "proj-b",
          workflow_step: 0,
          status: "running",
        },
      ],
      approvals: [],
    });
    expect(rows.every((r) => r.projectId === "proj-a")).toBe(true);
  });
});
