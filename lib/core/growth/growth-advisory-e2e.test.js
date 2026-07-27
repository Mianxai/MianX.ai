import { describe, it, expect } from "vitest";
import {
  WAVE5_SLUGS,
  activateGrowthPod,
  validateSalesOutput,
} from "./index";
import {
  WAVE6_SLUGS,
  activateAdvisoryPod,
  validateLegalOutput,
} from "../advisory";
import { getAgentDefinition } from "../agents";
import { getDefinition, isInstantiable, listWaves } from "@/lib/workforce";
import { createFakeProvider } from "../provider-fake";
import { buildBusinessGrowthNextStep } from "./workflow";
import { buildAdvisoryReviewNextStep } from "../advisory/workflow";

describe("Wave-5 growth pod", () => {
  it("registers four growth agents", () => {
    expect(WAVE5_SLUGS).toHaveLength(4);
    for (const slug of WAVE5_SLUGS) {
      const def = getAgentDefinition(slug);
      expect(def.lifecycleStatus).toBe("active");
      expect(def.prohibitedCapabilities).toContain("send_email");
      expect(isInstantiable(getDefinition(def.workforceSlug))).toBe(true);
    }
    expect(listWaves().find((w) => w.id === "wave-5").agents).toEqual(WAVE5_SLUGS);
  });

  it("activates growth pod without send authority", () => {
    const pod = activateGrowthPod({ projectId: "11111111-1111-4111-8111-111111111111" });
    expect(pod.count).toBe(4);
    expect(pod.note).toMatch(/no autonomous external/i);
  });

  it("forces sales external_send_allowed false", () => {
    expect(() =>
      validateSalesOutput({
        qualification: "qualified",
        opportunity_summary: "ok",
        next_actions: ["x"],
        proposal_draft: "p",
        sales_status: "PASS",
        external_send_allowed: true,
      })
    ).toThrow(/Invalid sales output/);
  });

  it("routes follow-up draft to send_email approval", async () => {
    const provider = createFakeProvider();
    const draft = (
      await provider({
        slug: "follow-up-draft",
        input: { context: "x", audience: "lead" },
      })
    ).output;
    const next = buildBusinessGrowthNextStep(
      { agent_slug: "follow-up-draft", input: { prior: {} } },
      draft
    );
    expect(next.approval?.capability).toBe("send_email");
  });
});

describe("Wave-6 advisory pod", () => {
  it("registers three advisory agents as approval_only", () => {
    expect(WAVE6_SLUGS).toHaveLength(3);
    for (const slug of WAVE6_SLUGS) {
      const def = getAgentDefinition(slug);
      expect(def.lifecycleStatus).toBe("active");
      expect(isInstantiable(getDefinition(def.workforceSlug))).toBe(true);
    }
    const pod = activateAdvisoryPod({ projectId: "11111111-1111-4111-8111-111111111111" });
    expect(pod.count).toBe(3);
    expect(listWaves().find((w) => w.id === "wave-6").agents).toEqual(WAVE6_SLUGS);
  });

  it("rejects licensed legal advice claims", () => {
    expect(() =>
      validateLegalOutput({
        risks: ["x"],
        issues: [],
        compliance_checklist: [],
        preparation: [],
        legal_status: "PASS",
        disclaimer: "d",
        is_licensed_legal_advice: true,
      })
    ).toThrow(/Invalid legal output/);
  });

  it("gates protected finance actions", async () => {
    const provider = createFakeProvider();
    const legal = (
      await provider({
        slug: "legal-risk-advisor",
        input: { matter: "x", proposed_action: "transfer_funds" },
      })
    ).output;
    const next = buildAdvisoryReviewNextStep(
      {
        agent_slug: "legal-risk-advisor",
        input: { proposed_action: "transfer_funds", prior: {} },
      },
      legal
    );
    expect(next.approval?.capability).toBe("approve_production_action");
  });
});
