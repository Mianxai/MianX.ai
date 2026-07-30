/**
 * Canonical workflow operational audit.
 */

import { WORKFLOWS } from "../workflow";
import { getAgentDefinition, isAgentExecutable } from "../agents";
import { assertWorkflowRoutingCoverage } from "./router";

const META = {
  "lead-qualification": {
    purpose: "Score inbound leads and draft human-reviewed follow-up.",
    version: "1.1.0",
    approvalGates: ["send_email"],
    evidenceRequirements: ["lead_score", "qa_verdict", "draft_body"],
    completionCriteria: "QA pass + follow-up draft + optional human send approval",
  },
  "product-planning": {
    purpose: "Turn a request into product spec, research, architecture, QA.",
    version: "1.1.0",
    approvalGates: [],
    evidenceRequirements: ["product_spec", "architecture", "qa_verdict"],
    completionCriteria: "QA pass on planning artifacts",
  },
  "release-readiness": {
    purpose: "QA + security + release recommendation without deploying.",
    version: "1.1.0",
    approvalGates: ["approve_production_action"],
    evidenceRequirements: ["qa_verdict", "security_status", "release_recommendation"],
    completionCriteria: "Human decision on recommendation",
  },
  "executive-readiness": {
    purpose: "Wave-1 executive control-plane assessment.",
    version: "1.0.0",
    approvalGates: ["approve_production_action"],
    evidenceRequirements: ["executive_assessments"],
    completionCriteria: "CEO synthesis complete; protected actions Founder-gated",
  },
  "software-delivery": {
    purpose: "Product → Architecture → Engineering → Review → independent QA.",
    version: "1.0.0",
    approvalGates: [],
    evidenceRequirements: ["delivery_artifacts", "qa_status"],
    completionCriteria: "Independent QA complete; no autonomous deploy",
  },
  "platform-candidate": {
    purpose: "Controlled coding candidate + platform readiness reviews.",
    version: "1.0.0",
    approvalGates: [],
    evidenceRequirements: ["candidate", "security", "devops", "infra", "data_ai"],
    completionCriteria: "Platform reviews complete; no push/merge/deploy",
  },
  "controlled-delivery": {
    purpose: "Software delivery plus platform gates.",
    version: "1.0.0",
    approvalGates: [],
    evidenceRequirements: ["delivery_and_platform"],
    completionCriteria: "All stages complete without autonomous production mutation",
  },
  "operations-incident": {
    purpose: "Coordinate ops, support triage, and analytics for incidents.",
    version: "1.0.0",
    approvalGates: [],
    evidenceRequirements: ["incident_report"],
    completionCriteria: "Ops coordination artifacts recorded",
  },
  "business-growth": {
    purpose: "Growth loop from lead intelligence through follow-up draft.",
    version: "1.0.0",
    approvalGates: ["send_email"],
    evidenceRequirements: ["growth_artifacts", "qa_verdict"],
    completionCriteria: "QA pass + draft; send is human-gated",
  },
  "advisory-review": {
    purpose: "Finance, HR, and legal advisory assessments.",
    version: "1.0.0",
    approvalGates: [],
    evidenceRequirements: ["advisory_findings"],
    completionCriteria: "All advisory agents completed",
  },
  "enterprise-objective": {
    purpose: "Decompose Founder objective into workstreams via CEO.",
    version: "1.1.0",
    approvalGates: ["approve_production_action"],
    evidenceRequirements: ["decomposition", "aggregate_status"],
    completionCriteria: "Synthesis complete; protected actions Founder-gated",
  },
  "employee-onboarding-founder-proof": {
    purpose: "Founder Proof path for secure employee onboarding (integration).",
    version: "1.0.0",
    approvalGates: ["founder_final_review", "simulation_approval", "plan_approval"],
    evidenceRequirements: ["proof_pack", "memory_candidates", "learning_candidates"],
    completionCriteria: "awaiting_final_review with durable evidence — Founder decides",
    stages: [
      "objective",
      "clarification",
      "plan",
      "plan_approval",
      "simulation_approval",
      "simulation",
      "evidence",
      "memory_learning",
      "founder_final_review",
    ],
    eligibleAgents: [
      "executive-ceo",
      "platform-security",
      "hr-workforce-planner",
      "ops-coordinator",
      "qa-review",
    ],
  },
};

export function auditCanonicalWorkflows() {
  const routing = assertWorkflowRoutingCoverage();
  const workflows = [];

  for (const [id, wf] of Object.entries(WORKFLOWS)) {
    const meta = META[id] || {};
    const steps = wf.steps || [];
    const eligible = steps.map((slug) => {
      const def = getAgentDefinition(slug);
      return {
        slug,
        executable: Boolean(def && isAgentExecutable(def)),
        name: def?.name || slug,
      };
    });
    const operational =
      eligible.length > 0 && eligible.every((e) => e.executable);
    workflows.push({
      id,
      name: wf.name,
      purpose: meta.purpose || wf.name,
      version: meta.version || "1.0.0",
      stages: steps,
      stageOwners: steps,
      requiredCapabilities: eligible.flatMap((e) => {
        const def = getAgentDefinition(e.slug);
        return def?.allowedCapabilities || [];
      }),
      eligibleAgents: eligible,
      dependencies: [],
      approvalGates: meta.approvalGates || [],
      evidenceRequirements: meta.evidenceRequirements || [],
      completionCriteria: meta.completionCriteria || "All stages succeed",
      retryRecovery: "Bounded job retries with exponential backoff; dead-letter on exhaustion",
      cancellationRules: "Queued cancel immediate; leased cooperative cancel",
      projectIsolation: true,
      deterministicSimulationSupport: true,
      liveProviderReadinessInterface: "optional_anthropic_adapter",
      operational,
      displaysAsOperational: operational,
    });
  }

  const onboarding = META["employee-onboarding-founder-proof"];
  workflows.push({
    id: "employee-onboarding-founder-proof",
    name: onboarding.name || "Employee onboarding Founder Proof",
    purpose: onboarding.purpose,
    version: onboarding.version,
    stages: onboarding.stages,
    stageOwners: onboarding.eligibleAgents,
    requiredCapabilities: [],
    eligibleAgents: onboarding.eligibleAgents.map((slug) => ({
      slug,
      executable: isAgentExecutable(getAgentDefinition(slug)),
      name: getAgentDefinition(slug)?.name || slug,
    })),
    dependencies: ["integration_orchestrator"],
    approvalGates: onboarding.approvalGates,
    evidenceRequirements: onboarding.evidenceRequirements,
    completionCriteria: onboarding.completionCriteria,
    retryRecovery: "Founder Proof recovery via return_plan_for_corrections / retry simulation",
    cancellationRules: "Founder may reject or return; no auto-complete",
    projectIsolation: true,
    deterministicSimulationSupport: true,
    liveProviderReadinessInterface: "optional_anthropic_adapter",
    operational: onboarding.eligibleAgents.every((s) =>
      isAgentExecutable(getAgentDefinition(s))
    ),
    displaysAsOperational: true,
  });

  return {
    workflows,
    allOperational: workflows.every((w) => w.operational),
    routing,
  };
}
