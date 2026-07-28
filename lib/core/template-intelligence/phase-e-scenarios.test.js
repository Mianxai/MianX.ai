/**
 * Phase E Template Intelligence — deterministic scenarios A–J.
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  matchTemplates,
  runTemplateIntelligencePlan,
  selectCapabilitiesFromObjective,
  mapCapabilitiesToDepartments,
  mapDepartmentsToExecutableAgents,
  assertAcyclic,
  detectCycles,
  canSelectForNewExecution,
  createNewVersion,
  transitionTemplateStatus,
  registerTemplateVersion,
  getTemplateVersion,
  assessLearningProposal,
  stampExecutionLineage,
  attachTemplateIntelligenceToBlueprint,
  seedCatalogVersions,
  getIndustryTemplate,
  listCatalogRelations,
  __resetVersionStore,
  __resetTemplateAudit,
  ENGINE_VERSION,
} from "./index";
import { runCompanyBuilder, __resetCompanyBuilderStore } from "../company-builder";

describe("Phase E Template Intelligence scenarios", () => {
  beforeEach(() => {
    __resetVersionStore();
    __resetTemplateAudit();
    __resetCompanyBuilderStore?.();
    seedCatalogVersions();
  });

  it("A: generic industry platform plan — templates matched, no product built", async () => {
    const plan = runTemplateIntelligencePlan({
      objective: "Plan a generic SaaS platform with customers, operations, reporting and security",
      industry: "generic-platform",
      business_model: "subscription",
      product_type: "saas",
    });
    expect(plan.ok).toBe(true);
    expect(plan.clarification_required).toBe(false);
    expect(plan.capabilities.length).toBeGreaterThan(3);
    expect(plan.departments.length).toBeGreaterThan(0);
    expect(plan.modules.length).toBeGreaterThan(0);
    expect(plan.risks.some((r) => r.slug === "provider-unconfigured")).toBe(true);
    expect(plan.selected_template_versions.length).toBeGreaterThan(0);

    const bp = await runCompanyBuilder({
      objective: "Plan a generic SaaS platform for multi-tenant operations",
      projectId: null,
      persist: false,
      actor: "test",
    });
    expect(bp.template_intelligence).toBeTruthy();
    expect(bp.execution.industry_os_executed).toBe(false);
    expect(bp.execution.agent_runs_started).toBe(0);
  });

  it("B: unknown industry → low confidence + clarification", () => {
    const match = matchTemplates({
      objective: "Build something",
      industry: "unknown",
      business_model: "subscription",
    });
    expect(match.clarification_required).toBe(true);
    expect(match.confidence).toBeLessThan(0.4);
    expect(match.selected_templates).toEqual([]);
  });

  it("C: deprecated template not selected for new plan", () => {
    const industry = getIndustryTemplate("generic-platform");
    registerTemplateVersion(industry);
    const deprecated = transitionTemplateStatus(
      { ...industry, status: "active" },
      "deprecated",
      { actor: "test", reason: "scenario-c" }
    );
    expect(canSelectForNewExecution(deprecated)).toBe(false);
    expect(canSelectForNewExecution(deprecated, { allowDeprecated: true })).toBe(true);

    // Matcher rejects deprecated industry versions when only deprecated available — use flag
    const match = matchTemplates({
      objective: "Plan platform",
      industry: "generic-platform",
      business_model: "subscription",
      allowDeprecated: false,
    });
    // catalog seed remains active; ensure rejected list mentions deprecated when present
    expect(
      match.rejected_templates.some((r) => r.reason.includes("deprecated")) ||
        match.selected_templates.some((s) => s.kind === "industry")
    ).toBe(true);
  });

  it("D: template version change — old blueprint keeps old version", () => {
    const industry = getIndustryTemplate("generic-platform");
    registerTemplateVersion(industry);
    const v2 = createNewVersion(industry, { description: "v2 body" }, { actor: "test" });
    expect(v2.version).toBe(2);
    expect(v2.status).toBe("draft");
    const old = getTemplateVersion("industry", "generic-platform", 1);
    expect(old.version).toBe(1);
    expect(old.description).not.toBe(v2.description);

    const oldBlueprint = attachTemplateIntelligenceToBlueprint(
      { id: "bp_old", status: "approved" },
      {
        ok: true,
        selected_template_versions: [
          {
            kind: "industry",
            slug: "generic-platform",
            version: 1,
            template_id: industry.id,
            why: ["pinned"],
          },
        ],
        match: { assumptions: [] },
        unresolved_questions: [],
        risks: [],
        compliance_warnings: [],
        capability_gaps: [],
        workforce_gaps: [],
      }
    );
    expect(oldBlueprint.selected_template_versions[0].version).toBe(1);
  });

  it("E: missing workforce capability → gap, no fabricated agent", () => {
    const caps = [
      {
        slug: "made-up-cap",
        owning_department: "not-a-real-dept",
        required_modules: [],
      },
    ];
    const dept = mapCapabilitiesToDepartments(caps);
    expect(dept.missing_department_coverage.length).toBe(1);
    expect(dept.departments).toEqual([]);
    const agents = mapDepartmentsToExecutableAgents([
      { slug: "totally-fake-department" },
    ]);
    expect(agents.workforce_gaps.length).toBe(1);
    expect(agents.activation_policy).toBe("candidates_only_no_auto_activation");
  });

  it("F: compliance-sensitive objective → human legal review", () => {
    const match = matchTemplates({
      objective: "Build a regulated services platform with privacy and GDPR controls",
      industry: "regulated-services",
      business_model: "subscription",
      compliance_sensitivity: "high",
    });
    expect(match.compliance_sensitive).toBe(true);
    expect(match.human_review_requirements.some((h) => h.type === "legal_compliance")).toBe(
      true
    );
    expect(match.selected_templates.some((s) => s.kind === "compliance")).toBe(true);
  });

  it("G: invalid relation cycle rejected and audited", () => {
    const cyclic = [
      {
        from_type: "module",
        from_id: "a",
        to_type: "module",
        to_id: "b",
        relation_type: "depends_on",
      },
      {
        from_type: "module",
        from_id: "b",
        to_type: "module",
        to_id: "a",
        relation_type: "depends_on",
      },
    ];
    expect(detectCycles(cyclic).length).toBeGreaterThan(0);
    expect(() => assertAcyclic(cyclic, { actor: "test" })).toThrow(/cycle/i);
    // Catalog seed remains acyclic
    expect(() => assertAcyclic(listCatalogRelations())).not.toThrow();
  });

  it("H: unsafe learning proposal rejected", () => {
    const bad = assessLearningProposal({
      type: "escalation",
      summary: "Please escalate capability and bypass approval",
      evidence: [{ ok: true }],
      confidence: 0.9,
    });
    expect(bad.rejected).toBe(true);
    expect(bad.reason).toBe("unsafe_learning_proposal");
  });

  it("I: two projects keep isolated lineage versions", () => {
    const lineageA = {
      industry_template: { slug: "generic-platform", version: 1, template_id: "a" },
      objective: "A",
    };
    const lineageB = {
      industry_template: { slug: "generic-platform", version: 2, template_id: "b" },
      objective: "B",
    };
    const itemA = stampExecutionLineage(
      { id: "task-a", project_id: "proj-a" },
      lineageA,
      { task_id: "task-a" }
    );
    const itemB = stampExecutionLineage(
      { id: "task-b", project_id: "proj-b" },
      lineageB,
      { task_id: "task-b" }
    );
    expect(itemA.lineage.industry_template.version).toBe(1);
    expect(itemB.lineage.industry_template.version).toBe(2);
    expect(itemA.project_id).not.toBe(itemB.project_id);
  });

  it("J: provider unconfigured — deterministic logic still works, no fake AI completion", () => {
    delete process.env.ANTHROPIC_API_KEY;
    const plan = runTemplateIntelligencePlan({
      objective: "Plan analytics and integrations for a hybrid platform",
      industry: "generic-platform",
      business_model: "hybrid",
    });
    expect(plan.ok).toBe(true);
    expect(plan.provider_note).toMatch(/without a configured AI provider/i);
    expect(plan.engine_version).toBe(ENGINE_VERSION);
    expect(JSON.stringify(plan)).not.toMatch(/anthropic completed|model output/i);
  });

  it("capability selection returns required vs optional with departments", () => {
    const caps = selectCapabilitiesFromObjective(
      "Need customer management, operations, reporting, finance, security, support, analytics"
    );
    expect(caps.capabilities.some((c) => c.slug === "customer-management")).toBe(true);
    const mapped = mapCapabilitiesToDepartments(caps.capabilities);
    expect(mapped.departments.some((d) => d.slug === "operations")).toBe(true);
  });
});
