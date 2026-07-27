import { describe, it, expect } from "vitest";
import { createFakeProvider } from "./provider-fake";
import { validateDesignOutput } from "./design";
import { validateResearchEvidenceOutput } from "./research-evidence";
import { getAgentDefinition } from "./agents";
import { getDefinition, isInstantiable } from "@/lib/workforce";
import { assertKnowledgeAccess } from "./memory/scope";
import { assertNoCapabilityEscalation as assertOpsEscalation } from "./operations/policy";
import { deriveAdvisoryApproval } from "./advisory/policy";
import { isProtectedAction } from "./executive/policy";
import { assertWritablePath, isProtectedRelativePath } from "./coding/paths";
import { assertAllowedCommand } from "./coding/commands";
import { requireInternalWorker } from "./internal-auth";
import { buildBusinessGrowthNextStep } from "./growth/workflow";
import { buildOperationsIncidentNextStep } from "./operations/workflow";
import { buildAdvisoryReviewNextStep } from "./advisory/workflow";
import { aggregateEnterpriseStatus } from "./enterprise/orchestrator";

function fakeHeaders(auth) {
  return {
    get(name) {
      const key = String(name).toLowerCase();
      if (key === "authorization") return auth || "";
      if (key === "x-internal-secret") return "";
      return null;
    },
  };
}

describe("release-candidate security + E2E matrix", () => {
  it("registers design and research-evidence without production mutation", () => {
    for (const slug of ["design-reviewer", "research-evidence"]) {
      const def = getAgentDefinition(slug);
      expect(def.lifecycleStatus).toBe("active");
      expect(def.productionMutationAuthority).toBe(false);
      expect(isInstantiable(getDefinition(def.workforceSlug))).toBe(true);
    }
  });

  it("blocks cross-project knowledge access by default", () => {
    expect(() =>
      assertKnowledgeAccess({
        requesterScope: "project",
        targetScope: "project",
        orgId: "org-a",
        projectId: "p1",
        targetProjectId: "p2",
        authorizedCrossProject: false,
      })
    ).toThrow();
  });

  it("blocks capability escalation and protected silent completion", () => {
    expect(() => assertOpsEscalation("ops-coordinator", ["send_email"])).toThrow();
    expect(isProtectedAction("production_deploy")).toBe(true);
    expect(deriveAdvisoryApproval("transfer_funds").required).toBe(true);
  });

  it("blocks coding path escape and unsafe commands", () => {
    expect(() =>
      assertWritablePath({
        workspaceRoot: "/tmp",
        requestedPath: "../etc/passwd",
        allowedPathPrefixes: ["fixtures/"],
      })
    ).toThrow();
    expect(isProtectedRelativePath("supabase/migrations/x.sql")).toBe(true);
    expect(() => assertAllowedCommand(["curl", "https://evil.example"])).toThrow();
    expect(() => assertAllowedCommand(["git", "push", "origin", "main"])).toThrow();
  });

  it("denies anonymous scheduler tick", () => {
    const prev = process.env.INTERNAL_RUNTIME_SECRET;
    process.env.INTERNAL_RUNTIME_SECRET = "test-secret-16chars";
    try {
      expect(() => requireInternalWorker({ headers: fakeHeaders("") })).toThrow();
      expect(() =>
        requireInternalWorker({ headers: fakeHeaders("Bearer wrong-secret-xxxx") })
      ).toThrow();
      expect(
        requireInternalWorker({
          headers: fakeHeaders("Bearer test-secret-16chars"),
        }).workerId
      ).toBe("internal-worker");
    } finally {
      if (prev === undefined) delete process.env.INTERNAL_RUNTIME_SECRET;
      else process.env.INTERNAL_RUNTIME_SECRET = prev;
    }
  });

  it("A software-adjacent design + research evidence fake outputs validate", async () => {
    const provider = createFakeProvider();
    const design = validateDesignOutput(
      (await provider({ slug: "design-reviewer", input: { objective: "Review UI" } })).output
    );
    const research = validateResearchEvidenceOutput(
      (
        await provider({
          slug: "research-evidence",
          input: { question: "What constraints apply?" },
        })
      ).output
    );
    expect(design.design_status).toBe("PASS");
    expect(design.public_site_locked).toBe(true);
    expect(research.research_status).toBe("PASS");
    expect(research.invented_citations).toBe(false);
  });

  it("B business-growth ends at send_email approval", () => {
    const next = buildBusinessGrowthNextStep(
      { agent_slug: "follow-up-draft", input: { prior: {} } },
      { draft_body: "hello", caveats: [] }
    );
    expect(next.approval?.capability).toBe("send_email");
  });

  it("C operations remediation stays Founder-gated", async () => {
    const provider = createFakeProvider();
    const analytics = (
      await provider({
        slug: "analytics-reporter",
        input: { evidence: { ops: { ops_status: "PASS" } } },
      })
    ).output;
    const next = buildOperationsIncidentNextStep(
      {
        agent_slug: "analytics-reporter",
        input: { proposed_action: "production_remediation", prior: {} },
      },
      analytics
    );
    expect(next.approval?.capability).toBe("approve_production_action");
  });

  it("D advisory completes while payment remains gated", async () => {
    const provider = createFakeProvider();
    const legal = (
      await provider({
        slug: "legal-risk-advisor",
        input: { matter: "x", proposed_action: "execute_payment" },
      })
    ).output;
    const gated = buildAdvisoryReviewNextStep(
      {
        agent_slug: "legal-risk-advisor",
        input: { proposed_action: "execute_payment", prior: {} },
      },
      legal
    );
    expect(gated.approval?.capability).toBe("approve_production_action");

    const ungatedLegal = (
      await provider({ slug: "legal-risk-advisor", input: { matter: "policy review" } })
    ).output;
    const done = buildAdvisoryReviewNextStep(
      { agent_slug: "legal-risk-advisor", input: { prior: {} } },
      ungatedLegal
    );
    expect(done.done).toBe(true);
  });

  it("enterprise aggregation refuses success while workstream awaiting approval", () => {
    const result = aggregateEnterpriseStatus([
      { id: "a", required: true, status: "succeeded" },
      { id: "b", required: true, status: "awaiting_approval" },
    ]);
    expect(result.status).not.toBe("SUCCESS");
    expect(String(result.status).toUpperCase()).toMatch(/AWAITING_APPROVAL/);
  });
});
