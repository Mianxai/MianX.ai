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
  getWave1Definition,
  listExecutableWave1Slugs,
  PRIMARY_READINESS_E2E_AGENTS,
  PROTECTED_EXECUTIVE_ACTIONS,
  isProtectedAction,
  deriveApprovalRequirement,
  assertWorkstreamDomainAllowed,
  L2_DOMAIN_BY_SLUG,
} from "./index";
import { PROTECTED_CAPABILITIES } from "../agents";

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

  it("rejects upward delegation to Founder", () => {
    expect(() => assertCanDelegate("executive-ceo", "founder")).toThrow(/Founder/);
    expect(() => assertCanDelegate("executive-cfo", "founder")).toThrow(/Founder/);
  });

  it("blocks capability escalation into protected caps", () => {
    expect(() =>
      assertCapabilityInheritance("executive-ceo", "executive-cto")
    ).not.toThrow();
    for (const slug of L2_SLUGS) {
      const def = getWave1Definition(slug);
      for (const cap of def.allowedCapabilities) {
        expect(PROTECTED_CAPABILITIES).not.toContain(cap);
      }
      expect(def.prohibitedCapabilities).toContain("approve_production_action");
      expect(def.prohibitedCapabilities).toContain("send_email");
    }
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

describe("action/capability-based approval policy", () => {
  it("treats advisory analysis as non-protected", () => {
    expect(isProtectedAction("financial_analysis")).toBe(false);
    expect(isProtectedAction("legal_risk_analysis")).toBe(false);
    expect(isProtectedAction("security_assessment")).toBe(false);
    expect(
      deriveApprovalRequirement({ proposedAction: null }).approval_required
    ).toBe(false);
  });

  it("requires approval for protected production / money / legal actions", () => {
    for (const action of [
      "production_deploy",
      "financial_transfer",
      "legal_commitment",
      "billing_change",
      "secret_change",
      "disable_security_control",
      "launch_industry_os",
    ]) {
      const gate = deriveApprovalRequirement({ proposedAction: action });
      expect(gate.approval_required).toBe(true);
      expect(gate.approval_capability).toBeTruthy();
    }
  });

  it("CFO analysis does not require approval; transfer does", () => {
    expect(
      deriveApprovalRequirement({
        assessments: {
          "executive-cfo": {
            recommendation: "ready",
            summary: "Cost analysis complete",
          },
        },
      }).approval_required
    ).toBe(false);
    expect(
      deriveApprovalRequirement({
        assessments: {
          "executive-cfo": {
            recommendation: "ready",
            proposed_action: "financial_transfer",
          },
        },
      }).approval_required
    ).toBe(true);
  });

  it("CLO legal analysis does not require approval; binding commitment does", () => {
    expect(
      deriveApprovalRequirement({
        assessments: {
          "executive-clo": { recommendation: "ready", summary: "Risk memo" },
        },
      }).approval_required
    ).toBe(false);
    expect(
      deriveApprovalRequirement({
        assessments: {
          "executive-clo": {
            recommendation: "ready",
            proposed_action: "legal_commitment",
          },
        },
      }).approval_required
    ).toBe(true);
  });

  it("CISO assessment does not require approval; disabling a control does", () => {
    expect(
      deriveApprovalRequirement({
        assessments: {
          "executive-ciso": { recommendation: "ready", summary: "Assessment" },
        },
      }).approval_required
    ).toBe(false);
    expect(
      deriveApprovalRequirement({
        assessments: {
          "executive-ciso": {
            recommendation: "ready",
            proposed_action: "disable_security_control",
          },
        },
      }).approval_required
    ).toBe(true);
  });

  it("exposes the protected action list including runtime protected capabilities", () => {
    expect(PROTECTED_EXECUTIVE_ACTIONS).toEqual(
      expect.arrayContaining([
        "production_deploy",
        "financial_transfer",
        "legal_commitment",
        "approve_production_action",
        "send_email",
      ])
    );
  });
});

describe("all 10 L2 executives are routable", () => {
  it("defines 11 Wave-1 agents (1 L1 + 10 L2) all executable", () => {
    expect(WAVE1_SLUGS).toHaveLength(11);
    expect(L2_SLUGS).toHaveLength(10);
    expect(listExecutableWave1Slugs()).toHaveLength(11);
    expect(PRIMARY_READINESS_E2E_AGENTS).toEqual([
      "executive-ceo",
      "executive-cto",
      "executive-cpo",
      "executive-ciso",
    ]);
  });

  it("each L2 has a unique responsibility domain and is addressable by CEO", () => {
    const domains = L2_SLUGS.map((slug) => L2_DOMAIN_BY_SLUG[slug]);
    expect(new Set(domains).size).toBe(10);
    for (const slug of L2_SLUGS) {
      expect(canDelegate("executive-ceo", slug)).toBe(true);
      expect(() => assertCanDelegate("executive-ceo", slug)).not.toThrow();
      expect(() => assertCapabilityInheritance("executive-ceo", slug)).not.toThrow();
      const def = getWave1Definition(slug);
      expect(def.lifecycleStatus).toBe("active");
      expect(def.requiresHumanApproval).toBe(false);
      expect(def.reportsTo).toBe("executive-ceo");
      expect(RESPONSIBILITY_MATRIX.find((r) => r.slug === slug)?.neverSelfApprove).toBe(true);
    }
  });

  it("rejects unrelated-domain workstream ownership", () => {
    expect(() => assertWorkstreamDomainAllowed("executive-cfo", "legal")).toThrow(/not owned/);
    expect(() => assertWorkstreamDomainAllowed("executive-clo", "finance")).toThrow(/not owned/);
    expect(() => assertWorkstreamDomainAllowed("executive-ciso", "security")).not.toThrow();
  });

  it("rejects unrelated-domain plans at validation time", () => {
    expect(() =>
      validateExecutivePlan({
        objective_summary: "bad domain",
        workstreams: [
          {
            id: "ws1",
            owner_agent: "executive-cfo",
            domain: "legal",
            success_criteria: ["a"],
          },
        ],
      })
    ).toThrow();
  });
});

describe("executive plan schema", () => {
  it("accepts a valid advisory plan without Founder approval", () => {
    const plan = validateExecutivePlan({
      objective_summary: "Assess Industry OS launch readiness",
      workstreams: [
        {
          id: "ws-tech",
          owner_agent: "executive-cto",
          domain: "technology",
          priority: "high",
          success_criteria: ["Tech risks listed"],
          risk_class: "R3",
        },
        {
          id: "ws-product",
          owner_agent: "executive-cpo",
          domain: "product",
          success_criteria: ["Scope bounded"],
          risk_class: "R2",
        },
        {
          id: "ws-sec",
          owner_agent: "executive-ciso",
          domain: "security",
          success_criteria: ["Threat surface reviewed"],
          risk_class: "R4",
        },
      ],
      status: "planned",
    });
    expect(plan.workstreams).toHaveLength(3);
    expect(plan.approval_required).toBe(false);
  });

  it("marks protected proposed_action on the plan", () => {
    const plan = validateExecutivePlan({
      objective_summary: "Deploy",
      proposed_action: "production_deploy",
      workstreams: [
        {
          id: "ws",
          owner_agent: "executive-cto",
          success_criteria: ["a"],
        },
      ],
    });
    expect(plan.approval_required).toBe(true);
    expect(plan.proposed_action).toBe("production_deploy");
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

describe("executive aggregation completion semantics", () => {
  it("CASE A: advisory children complete → aggregated, no approval", () => {
    const result = aggregateExecutiveResult({
      objective: "Market readiness analysis",
      plan: {
        objective_summary: "Market readiness analysis",
        workstreams: [
          {
            id: "ws",
            owner_agent: "executive-cpo",
            success_criteria: ["a"],
          },
        ],
      },
      assessments: {
        "executive-cpo": { recommendation: "ready", summary: "ok" },
      },
    });
    expect(result.approval_required).toBe(false);
    expect(result.status).toBe("aggregated");
    expect(result.recommendation).toBe("ready");
  });

  it("CASE B: protected action proposed → awaiting_founder", () => {
    const result = aggregateExecutiveResult({
      objective: "Launch",
      proposedAction: "launch_industry_os",
      plan: {
        objective_summary: "Launch",
        proposed_action: "launch_industry_os",
        workstreams: [
          {
            id: "ws",
            owner_agent: "executive-cpo",
            success_criteria: ["a"],
          },
        ],
      },
      assessments: {
        "executive-cpo": { recommendation: "ready", summary: "ok" },
      },
    });
    expect(result.approval_required).toBe(true);
    expect(result.status).toBe("awaiting_founder");
    expect(result.primary_action).toBe("launch_industry_os");
  });

  it("CASE C: child failure never claims success and never masks with approval", () => {
    const result = aggregateExecutiveResult({
      objective: "Launch Industry OS",
      proposedAction: "production_deploy",
      plan: {
        objective_summary: "Launch Industry OS",
        proposed_action: "production_deploy",
        workstreams: [
          {
            id: "ws-tech",
            owner_agent: "executive-cto",
            success_criteria: ["a"],
          },
        ],
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
    expect(result.approval_required).toBe(false);
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
    expect(founderApprovalBoundaries()).toContain("financial_transfer");
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

  it("CASE A: advisory synthesis completes without approval", () => {
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
            "executive-cto": { recommendation: "ready", summary: "ok" },
            "executive-cpo": { recommendation: "ready", summary: "ok" },
            "executive-ciso": { recommendation: "ready", summary: "ok" },
          },
        },
      },
      { status: "aggregated", workstreams: [] }
    );
    expect(next.done).toBe(true);
    expect(next.approval).toBeUndefined();
    expect(next.aggregated.approval_required).toBe(false);
  });

  it("CASE B: protected action requests Founder approval after synthesis", () => {
    const next = buildExecutiveNextStep(
      {
        workflow: "executive-readiness",
        workflow_step: 4,
        agent_slug: "executive-ceo",
        input: {
          objective: "Assess",
          mode: "synthesize",
          proposed_action: "launch_industry_os",
          plan: {
            objective_summary: "Assess",
            proposed_action: "launch_industry_os",
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
            "executive-cto": { recommendation: "ready", summary: "ok" },
            "executive-cpo": { recommendation: "ready", summary: "ok" },
            "executive-ciso": { recommendation: "ready", summary: "ok" },
          },
        },
      },
      { status: "awaiting_founder", workstreams: [], proposed_action: "launch_industry_os" }
    );
    expect(next.approval.capability).toBe("approve_production_action");
    expect(next.aggregated.primary_action).toBe("launch_industry_os");
  });

  it("CASE C: blocked synthesis halts without approval", () => {
    const next = buildExecutiveNextStep(
      {
        workflow: "executive-readiness",
        workflow_step: 4,
        agent_slug: "executive-ceo",
        input: {
          objective: "Assess",
          mode: "synthesize",
          proposed_action: "production_deploy",
          plan: {
            objective_summary: "Assess",
            workstreams: [
              {
                id: "ws",
                owner_agent: "executive-cto",
                success_criteria: ["a"],
              },
            ],
          },
          assessments: {
            "executive-cto": { recommendation: "blocked", summary: "no" },
          },
        },
      },
      { status: "blocked" }
    );
    expect(next.halt).toBe("executive_blocked");
    expect(next.approval).toBeUndefined();
  });
});
