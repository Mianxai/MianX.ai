import { describe, it, expect } from "vitest";
import {
  canDelegate,
  assertCanDelegate,
  assertCapabilityInheritance,
  detectDelegationCycles,
  assertNoDelegationCycles,
  assertPlanDelegations,
  validateExecutivePlan,
  aggregateExecutiveResult,
  RESPONSIBILITY_MATRIX,
  founderApprovalBoundaries,
  WAVE1_SLUGS,
  L2_SLUGS,
  buildExecutiveNextStep,
} from "./index";

describe("Wave-1 delegation policy", () => {
  it("allows L1 → L2 only", () => {
    expect(canDelegate("executive-ceo", "executive-cto")).toBe(true);
    expect(canDelegate("executive-cto", "executive-cpo")).toBe(false);
    expect(canDelegate("executive-ceo", "executive-ceo")).toBe(false);
    expect(canDelegate("executive-ceo", "founder")).toBe(false);
  });

  it("rejects self-delegation and unknown agents", () => {
    expect(() => assertCanDelegate("executive-ceo", "executive-ceo")).toThrow(/Self-delegation/);
    expect(() => assertCanDelegate("executive-ceo", "unknown-agent")).toThrow();
    expect(() => assertCanDelegate("executive-cto", "executive-cpo")).toThrow(/not permitted/);
  });

  it("blocks capability escalation into protected caps", () => {
    expect(() =>
      assertCapabilityInheritance("executive-ceo", "executive-cto")
    ).not.toThrow();
  });

  it("detects circular delegation graphs", () => {
    const cycles = detectDelegationCycles({
      a: ["b"],
      b: ["c"],
      c: ["a"],
    });
    expect(cycles.length).toBeGreaterThan(0);
    expect(() =>
      assertNoDelegationCycles({ "executive-ceo": ["executive-cto", "executive-ceo"] })
    ).toThrow(/Circular/);
  });

  it("validates a full plan delegation set", () => {
    expect(() =>
      assertPlanDelegations("executive-ceo", [
        "executive-cto",
        "executive-cpo",
        "executive-ciso",
      ])
    ).not.toThrow();
  });
});

describe("executive plan schema", () => {
  it("accepts a valid plan", () => {
    const plan = validateExecutivePlan({
      objective_summary: "Assess Industry OS launch readiness",
      workstreams: [
        {
          id: "ws-tech",
          owner_agent: "executive-cto",
          priority: "high",
          success_criteria: ["Tech risks listed"],
          risk_class: "R3",
        },
        {
          id: "ws-product",
          owner_agent: "executive-cpo",
          success_criteria: ["Scope bounded"],
          risk_class: "R2",
        },
        {
          id: "ws-sec",
          owner_agent: "executive-ciso",
          success_criteria: ["Threat surface reviewed"],
          risk_class: "R4",
          approval_required: true,
        },
      ],
      status: "planned",
    });
    expect(plan.workstreams).toHaveLength(3);
  });

  it("rejects unknown owner agents", () => {
    expect(() =>
      validateExecutivePlan({
        objective_summary: "x",
        workstreams: [
          {
            id: "ws1",
            owner_agent: "not-a-real-agent",
            success_criteria: ["a"],
          },
        ],
      })
    ).toThrow();
  });
});

describe("executive aggregation", () => {
  it("never claims success when a child is blocked", () => {
    const result = aggregateExecutiveResult({
      objective: "Launch Industry OS",
      plan: {
        objective_summary: "Launch Industry OS",
        workstreams: [
          {
            id: "ws-tech",
            owner_agent: "executive-cto",
            risk_class: "R3",
            success_criteria: ["a"],
          },
        ],
        approval_required: true,
      },
      assessments: {
        "executive-cto": {
          recommendation: "blocked",
          summary: "Blocked",
          risks: ["x"],
        },
      },
    });
    expect(result.status).toBe("blocked");
    expect(result.recommendation).toBe("no_go");
  });

  it("parks protected launch decisions for Founder approval", () => {
    const result = aggregateExecutiveResult({
      objective: "Launch",
      plan: {
        objective_summary: "Launch",
        workstreams: [
          {
            id: "ws",
            owner_agent: "executive-cpo",
            risk_class: "R2",
            success_criteria: ["a"],
          },
        ],
      },
      assessments: {
        "executive-cpo": { recommendation: "hold", summary: "ok", risks: [] },
      },
    });
    expect(result.approval_required).toBe(true);
    expect(result.status).toBe("awaiting_founder");
  });
});

describe("responsibility matrix", () => {
  it("covers Founder + Wave-1 agents without overlapping L2 domains", () => {
    expect(RESPONSIBILITY_MATRIX.some((r) => r.slug === "founder")).toBe(true);
    expect(WAVE1_SLUGS).toHaveLength(11);
    expect(L2_SLUGS).toHaveLength(10);
    const domains = RESPONSIBILITY_MATRIX.filter((r) => r.level === "L2").map((r) => r.owns[0]);
    expect(new Set(domains).size).toBe(domains.length);
    expect(founderApprovalBoundaries()).toContain("launch_industry_os");
  });
});

describe("buildExecutiveNextStep", () => {
  it("routes CEO plan to CTO after validating owners", () => {
    const next = buildExecutiveNextStep(
      {
        workflow: "executive-readiness",
        workflow_step: 0,
        agent_slug: "executive-ceo",
        input: { objective: "Assess readiness", mode: "plan" },
      },
      {
        objective_summary: "Assess readiness",
        workstreams: [
          {
            id: "ws-tech",
            owner_agent: "executive-cto",
            success_criteria: ["a"],
            risk_class: "R3",
          },
          {
            id: "ws-product",
            owner_agent: "executive-cpo",
            success_criteria: ["a"],
            risk_class: "R2",
          },
          {
            id: "ws-sec",
            owner_agent: "executive-ciso",
            success_criteria: ["a"],
            risk_class: "R4",
          },
        ],
        status: "planned",
      }
    );
    expect(next.nextSlug).toBe("executive-cto");
  });

  it("requests Founder approval after synthesis", () => {
    const next = buildExecutiveNextStep(
      {
        workflow: "executive-readiness",
        workflow_step: 4,
        agent_slug: "executive-ceo",
        input: {
          objective: "Assess",
          mode: "synthesize",
          plan: {
            objective_summary: "Assess",
            workstreams: [
              {
                id: "ws",
                owner_agent: "executive-cto",
                success_criteria: ["a"],
                risk_class: "R3",
              },
            ],
          },
          assessments: {
            "executive-cto": { recommendation: "hold", summary: "ok" },
            "executive-cpo": { recommendation: "hold", summary: "ok" },
            "executive-ciso": { recommendation: "hold", summary: "ok" },
          },
        },
      },
      {
        status: "awaiting_founder",
        workstreams: [],
        approval_required: true,
        executive_result: "Needs Founder",
      }
    );
    expect(next.approval.capability).toBe("approve_production_action");
  });
});
