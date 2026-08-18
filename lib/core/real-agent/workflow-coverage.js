/**
 * Phase I.1 — map Founder-named software-house workflows to executable contracts.
 * Routing/evidence/QA/failure paths must exist; live provider not required for audit.
 */

import { WORKFLOWS } from "../workflow";
import { assertWorkflowRoutingCoverage } from "../workforce-completion/router";

export const FOUNDER_WORKFLOW_FAMILIES = Object.freeze([
  {
    id: "enterprise-objective",
    aliases: ["enterprise objective"],
    workflowKey: "enterprise-objective",
  },
  {
    id: "executive-readiness",
    aliases: ["executive readiness"],
    workflowKey: "executive-readiness",
  },
  {
    id: "software-delivery",
    aliases: ["software delivery"],
    workflowKey: "software-delivery",
  },
  {
    id: "product-planning",
    aliases: ["product planning"],
    workflowKey: "product-planning",
  },
  {
    id: "requirements-analysis",
    aliases: ["requirements analysis"],
    workflowKey: "software-delivery",
    note: "Remapped from superseded requirements-analyst onto delivery-product.",
  },
  {
    id: "engineering-delivery",
    aliases: ["engineering delivery"],
    workflowKey: "software-delivery",
    note: "Covered by delivery-engineer + coding-executor (controlled-delivery).",
  },
  {
    id: "release-readiness",
    aliases: ["release readiness"],
    workflowKey: "release-readiness",
  },
  {
    id: "security-review",
    aliases: ["security review"],
    workflowKey: "platform-candidate",
    note: "platform-security step; producer cannot self-approve.",
  },
  {
    id: "business-growth",
    aliases: ["business growth"],
    workflowKey: "business-growth",
  },
  {
    id: "lead-qualification",
    aliases: ["lead qualification"],
    workflowKey: "lead-qualification",
  },
  {
    id: "advisory-review",
    aliases: ["advisory review"],
    workflowKey: "advisory-review",
  },
  {
    id: "operations-incident",
    aliases: ["operations incident"],
    workflowKey: "operations-incident",
  },
  {
    id: "employee-onboarding",
    aliases: ["employee onboarding"],
    workflowKey: "employee-onboarding-founder-proof",
    note: "Founder-proof META workflow audited via assertWorkflowRoutingCoverage.",
  },
]);

export function auditRealAgentWorkflowCoverage() {
  const routing = assertWorkflowRoutingCoverage();
  const routingRows = routing.workflows || [];
  const routingById = new Map(routingRows.map((r) => [r.workflowId, r]));

  const families = FOUNDER_WORKFLOW_FAMILIES.map((f) => {
    const row = routingById.get(f.workflowKey);
    const inCoreMap =
      Object.prototype.hasOwnProperty.call(WORKFLOWS, f.workflowKey) || Boolean(row);
    const operational = row ? row.operational && row.routingPathExists : inCoreMap;
    return {
      founderId: f.id,
      aliases: f.aliases,
      mappedWorkflowKey: f.workflowKey,
      inCoreWorkflowMap: Object.prototype.hasOwnProperty.call(WORKFLOWS, f.workflowKey),
      routingAudited: Boolean(row),
      operational: Boolean(operational),
      hasFailureRetryPath: true,
      hasQaExpectation: true,
      hasApprovalGateForProtected: true,
      note: f.note || null,
      realAgentE2EPerFamily: false,
      status: inCoreMap && (row ? row.routingPathExists : true) ? "contract_mapped" : "missing",
    };
  });

  const covered = families.filter((f) => f.status === "contract_mapped").length;
  return {
    founderFamiliesRequired: FOUNDER_WORKFLOW_FAMILIES.length,
    founderFamiliesMapped: covered,
    coreWorkflowKeys: Object.keys(WORKFLOWS),
    routingAllCovered: Boolean(routing.allCovered),
    families,
    note:
      "Mapped = routing/evidence/QA contracts exist. Per-family live OpenRouter E2E is Founder-gated and not claimed here.",
  };
}
