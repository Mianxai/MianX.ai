import { describe, it, expect } from "vitest";
import { explainApproval, listHighRiskLabels } from "./explain";

describe("approval explanations", () => {
  it("explains send_email without inventing agents", () => {
    const ex = explainApproval({
      requested_capability: "send_email",
      reason: "Follow-up draft ready",
      project_id: "p1",
      status: "pending",
    });
    expect(ex.riskLabel).toBe("EXTERNAL SEND");
    expect(ex.whatIfApproved).toMatch(/sent/i);
    expect(ex.whatIfRejected).toMatch(/No message/i);
    expect(ex.requestingAgent).toBeNull();
    expect(ex.highRisk).toBe(true);
  });

  it("labels production deploy risk", () => {
    const ex = explainApproval({
      requested_capability: "approve_production_action",
      metadata: { proposed_action: "production_deploy", agent_slug: "executive-ceo" },
    });
    expect(ex.riskLabel).toBe("PRODUCTION DEPLOY");
    expect(ex.requestingAgent).toBe("executive-ceo");
  });

  it("exposes known high-risk labels", () => {
    const labels = listHighRiskLabels();
    expect(labels).toEqual(
      expect.arrayContaining([
        "PRODUCTION DEPLOY",
        "PAYMENT",
        "LEGAL COMMITMENT",
        "EXTERNAL SEND",
      ])
    );
  });
});
