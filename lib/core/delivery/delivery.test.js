import { describe, it, expect } from "vitest";
import {
  WAVE2_SLUGS,
  WAVE2_AGENT_DEFINITIONS,
  SOFTWARE_DELIVERY_STEPS,
  listExecutableWave2Slugs,
  validateProductSpec,
  validateArchitecturePlan,
  validateEngineeringResult,
  validateReviewResult,
  validateQaOutput,
  assertQaIndependence,
  assertNoCapabilityEscalation,
  assertProjectScope,
  deriveDeliveryApproval,
  activateDeliveryPod,
  WAVE2_ROLE_MATRIX,
  wave2ActivatedRuntimeSlugs,
  buildSoftwareDeliveryNextStep,
  FINAL_QA_OWNER,
  IMPLEMENTER_SLUG,
  INDEPENDENT_QA_SLUG,
} from "./index";
import { getDefinition, isInstantiable, listWaves } from "@/lib/workforce";
import { getAgentDefinition, PROTECTED_CAPABILITIES } from "../agents";

describe("Wave-2 role mapping", () => {
  it("activates exactly 5 delivery runtime agents", () => {
    expect(WAVE2_SLUGS).toHaveLength(5);
    expect(listExecutableWave2Slugs()).toHaveLength(5);
    expect(SOFTWARE_DELIVERY_STEPS).toEqual([
      "delivery-product",
      "delivery-architect",
      "delivery-engineer",
      "delivery-review",
      "delivery-qa",
    ]);
    expect(wave2ActivatedRuntimeSlugs()).toEqual(SOFTWARE_DELIVERY_STEPS);
  });

  it("maps each Wave-2 agent to an instantiable workforce definition", () => {
    for (const agent of WAVE2_AGENT_DEFINITIONS) {
      const wf = getDefinition(agent.workforceSlug);
      expect(wf, agent.workforceSlug).toBeTruthy();
      expect(isInstantiable(wf)).toBe(true);
      expect(agent.repositoryWriteAuthority).toBe(false);
      expect(agent.requiresHumanApproval).toBe(false);
      for (const cap of agent.allowedCapabilities) {
        expect(PROTECTED_CAPABILITIES).not.toContain(cap);
      }
      expect(getAgentDefinition(agent.slug)?.lifecycleStatus).toBe("active");
    }
  });

  it("records Product / Engineering / Review / independent QA ownership", () => {
    expect(WAVE2_ROLE_MATRIX.find((r) => r.runtimeSlug === "delivery-product").department).toBe(
      "product"
    );
    expect(WAVE2_ROLE_MATRIX.find((r) => r.runtimeSlug === "delivery-architect").department).toBe(
      "engineering"
    );
    expect(WAVE2_ROLE_MATRIX.find((r) => r.runtimeSlug === "delivery-review").department).toBe(
      "engineering"
    );
    expect(FINAL_QA_OWNER.department).toBe("qa");
    expect(FINAL_QA_OWNER.runtimeSlug).toBe("delivery-qa");
  });

  it("updates wave-2 registry to runtime delivery slugs", () => {
    const wave2 = listWaves().find((w) => w.id === "wave-2");
    expect(wave2.agents).toEqual(SOFTWARE_DELIVERY_STEPS);
  });
});

describe("pod activation", () => {
  it("activates a project-scoped pod of 5 instances", () => {
    const pod = activateDeliveryPod({ projectId: "proj-1", orgId: "org-1" });
    expect(pod.count).toBe(5);
    expect(pod.instances.every((i) => i.project_id === "proj-1")).toBe(true);
    expect(pod.instances.every((i) => i.repository_write_authority === false)).toBe(true);
  });

  it("rejects pod activation without project id", () => {
    expect(() => activateDeliveryPod({})).toThrow(/project_id/);
  });
});

describe("handoff schemas", () => {
  it("accepts a valid product spec and rejects missing acceptance criteria", () => {
    const spec = validateProductSpec({
      objective: "Add project health summary",
      problem_statement: "Missing visibility",
      scope: "Admin read-only summary",
      out_of_scope: ["Deploy"],
      requirements: ["Show health fields"],
      acceptance_criteria: ["Fields evidence-backed"],
      constraints: [],
      dependencies: [],
      risk_level: "R2",
    });
    expect(spec.requirements).toHaveLength(1);
    expect(() =>
      validateProductSpec({
        objective: "x",
        problem_statement: "y",
        scope: "z",
        out_of_scope: ["a"],
        requirements: ["r"],
        acceptance_criteria: [],
        risk_level: "R2",
      })
    ).toThrow(/Invalid product specification/);
  });

  it("rejects engineering claims of repository writes", () => {
    expect(() =>
      validateEngineeringResult({
        work_packages: [
          {
            task_id: "1",
            owner: "delivery-engineer",
            files_or_components: ["a"],
            change_intent: "x",
            acceptance_criteria: ["y"],
            risk_class: "R2",
          },
        ],
        implementation_result: { summary: "did stuff", status: "done" },
        repository_write_performed: true,
      })
    ).toThrow(/Invalid engineering result/);
  });
});

describe("QA independence and safety", () => {
  it("blocks implementer self-certification", () => {
    expect(() =>
      assertQaIndependence({
        implementerSlug: INDEPENDENT_QA_SLUG,
        qaSlug: INDEPENDENT_QA_SLUG,
      })
    ).toThrow(/self-certify|Independent QA/);
    expect(() =>
      assertQaIndependence({
        implementerSlug: IMPLEMENTER_SLUG,
        qaSlug: IMPLEMENTER_SLUG,
      })
    ).toThrow();
    expect(() =>
      assertQaIndependence({
        implementerSlug: IMPLEMENTER_SLUG,
        qaSlug: INDEPENDENT_QA_SLUG,
      })
    ).not.toThrow();
  });

  it("rejects capability escalation and cross-project access", () => {
    expect(() =>
      assertNoCapabilityEscalation("delivery-engineer", ["approve_production_action"])
    ).toThrow(/escalation/);
    expect(() =>
      assertProjectScope({
        jobProjectId: "p1",
        requestedProjectId: "p2",
      })
    ).toThrow(/Cross-project/);
  });

  it("derives Founder approval only for protected actions", () => {
    expect(deriveDeliveryApproval({ proposedAction: null }).approval_required).toBe(false);
    expect(
      deriveDeliveryApproval({ proposedAction: "production_deploy" }).approval_required
    ).toBe(true);
  });
});

describe("buildSoftwareDeliveryNextStep", () => {
  const baseSpec = {
    objective: "Add project health",
    problem_statement: "gap",
    scope: "admin",
    out_of_scope: ["deploy"],
    requirements: ["r1"],
    acceptance_criteria: ["ac1"],
    constraints: [],
    dependencies: [],
    risk_level: "R2",
  };

  it("routes Product → Architecture", () => {
    const next = buildSoftwareDeliveryNextStep(
      {
        agent_slug: "delivery-product",
        workflow: "software-delivery",
        input: { objective: "Add project health" },
      },
      baseSpec
    );
    expect(next.nextSlug).toBe("delivery-architect");
  });

  it("halts on review rejection", () => {
    const next = buildSoftwareDeliveryNextStep(
      {
        agent_slug: "delivery-review",
        workflow: "software-delivery",
        input: {
          objective: "x",
          product_spec: baseSpec,
          architecture_plan: {},
          implementation_result: {},
        },
      },
      {
        verdict: "reject",
        findings: ["incomplete"],
        scope_ok: false,
        architecture_ok: false,
      }
    );
    expect(next.halt).toBe("review_rejected");
  });

  it("completes advisory QA without approval", () => {
    const next = buildSoftwareDeliveryNextStep(
      {
        agent_slug: "delivery-qa",
        workflow: "software-delivery",
        input: {
          objective: "Add project health",
          implementer_slug: "delivery-engineer",
          product_spec: baseSpec,
        },
      },
      {
        qa_plan: {
          acceptance_criteria_mapping: ["ac1 → ok"],
          functional_tests: ["f1"],
          regression_tests: ["r1"],
          security_checks: [],
          negative_cases: ["n1"],
          expected_result: "PASS",
        },
        qa_status: "PASS",
        delivery_readiness: {
          requirements_status: "ok",
          engineering_status: "ok",
          qa_status: "PASS",
          known_risks: [],
          blockers: [],
          recommended_next_action: "Human may implement from plan",
        },
        evidence: ["e1"],
      }
    );
    expect(next.done).toBe(true);
    expect(next.approval).toBeUndefined();
  });

  it("requests Founder approval when production deploy is proposed", () => {
    const next = buildSoftwareDeliveryNextStep(
      {
        agent_slug: "delivery-qa",
        workflow: "software-delivery",
        input: {
          objective: "Deploy",
          proposed_action: "production_deploy",
          implementer_slug: "delivery-engineer",
          product_spec: baseSpec,
        },
      },
      {
        qa_plan: {
          acceptance_criteria_mapping: ["ac1 → ok"],
          functional_tests: ["f1"],
          regression_tests: ["r1"],
          security_checks: [],
          negative_cases: ["n1"],
          expected_result: "PASS",
        },
        qa_status: "PASS",
        delivery_readiness: {
          requirements_status: "ok",
          engineering_status: "ok",
          qa_status: "PASS",
          known_risks: [],
          blockers: [],
          recommended_next_action: "Await Founder",
          proposed_action: "production_deploy",
        },
        evidence: ["e1"],
      }
    );
    expect(next.approval.capability).toBe("approve_production_action");
  });
});
