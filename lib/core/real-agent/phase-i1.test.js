import { describe, it, expect, beforeEach } from "vitest";
import {
  buildRealAgentReadinessReport,
  computeAgentReadiness,
  invokeRealAgent,
  runProviderTestDoubleE2E,
  liveSmokeReadiness,
  compileCanonicalRoleRegistry,
  listToolDefinitions,
  isProtectedTool,
  executeToolCall,
  runIndependentQa,
  createRealInstance,
  transitionRealInstance,
  resetRealInstances,
  REAL_INSTANCE_LIFECYCLE,
  openRouterConfig,
  selectFreeOpenRouterModel,
  auditRealAgentWorkflowCoverage,
} from "./index";
import { getAgentDefinition } from "../agents";
import { PLANNED_ROLE_SLOT_TOTAL as CAP } from "@/lib/workforce/constants";

describe("Phase I.1 real-agent runtime", () => {
  beforeEach(() => {
    resetRealInstances();
    delete process.env.OPENROUTER_API_KEY;
    delete process.env.ALLOW_LIVE_PROVIDER_TEST;
  });

  it("reports truthful readiness without claiming live-tested", () => {
    const report = buildRealAgentReadinessReport({ liveTestedSlugs: [] });
    expect(report.capacity.documentedSlots).toBe(CAP);
    expect(report.readiness.live_tested).toBe(0);
    expect(report.readiness.real_agent_ready).toBe(0);
    expect(report.completionTruth.liveSmokeNotYetRun).toBe(true);
    expect(report.catalogue.executableDefinitions).toBeGreaterThanOrEqual(36);
    const lead = computeAgentReadiness(getAgentDefinition("lead-intelligence"));
    expect(lead.deterministic_ready).toBe(true);
    expect(lead.realAgentReady).toBe(false);
    expect(lead.label).not.toMatch(/Real Agent Ready/);
  });

  it("compiles roles without fabricating filler to force 445 named personas", () => {
    const compiled = compileCanonicalRoleRegistry();
    expect(compiled.documentedCapacity).toBe(445);
    expect(compiled.fabrications).toBe(0);
    expect(compiled.canonicalRolesCompiled).toBeGreaterThan(40);
    expect(compiled.unresolvedCapacityGaps).toBeGreaterThan(0);
    expect(compiled.plannedSlotContribution).toBe(445);
  });

  it("registers safe and protected tools", () => {
    const tools = listToolDefinitions();
    expect(tools.some((t) => t.name === "knowledge.search")).toBe(true);
    expect(tools.some((t) => t.name === "workspace.create_patch_candidate")).toBe(true);
    expect(isProtectedTool("production_deployment")).toBe(true);
  });

  it("escalates protected tools to Founder approval", async () => {
    const res = await executeToolCall({
      name: "production_deployment",
      args: { rationale: "ship" },
      context: { projectId: "p1", agentSlug: "delivery-engineer" },
    });
    expect(res.status).toBe("founder_approval_required");
    expect(res.approvalRequest.autoExecuted).toBe(false);
  });

  it("enforces instance lifecycle and project isolation", () => {
    expect(REAL_INSTANCE_LIFECYCLE).toContain("tool_executing");
    const inst = createRealInstance({
      projectId: "p1",
      agentDefinitionId: "research",
    });
    transitionRealInstance(inst.id, "validating", { projectId: "p1" });
    transitionRealInstance(inst.id, "allocated", { projectId: "p1" });
    expect(() =>
      transitionRealInstance(inst.id, "idle", { projectId: "other" })
    ).toThrow(/Cross-project/);
  });

  it("runs independent QA without self-approval", () => {
    expect(() =>
      runIndependentQa({
        producerSlug: "delivery-engineer",
        reviewerSlug: "delivery-engineer",
        output: { ok: true },
        projectId: "p1",
      })
    ).toThrow(/cannot review/);
    const qa = runIndependentQa({
      producerSlug: "delivery-engineer",
      reviewerSlug: "delivery-qa",
      output: { ok: true },
      evidence: [{ type: "x" }],
      documentsUsed: [{ path: "AGENTS.md" }],
      projectId: "p1",
      schemaValid: true,
    });
    expect(["accepted", "accepted_with_warnings"]).toContain(qa.result);
  });

  it("invokes real agent via test-double path with tools + evidence + QA", async () => {
    const result = await invokeRealAgent({
      projectId: "p-iso-1",
      agentDefinitionId: "research",
      executionMode: "test_double",
      objectiveTitle: "Explain project isolation",
      acceptanceCriteria: "Structured findings",
      input: { question: "What is project isolation?" },
      reviewerSlug: "qa-review",
    });
    expect(result.ok).toBe(true);
    expect(result.provider).toBe("test_double");
    expect(result.documentsUsed.length).toBeGreaterThan(0);
    expect(result.qa).toBeTruthy();
    expect(result.toolCalls.rounds).toBeGreaterThan(0);
    expect(result.modelUsed).toBe("test_double");
  });

  it("provider test-double E2E harness passes without network", async () => {
    const e2e = await runProviderTestDoubleE2E({
      projectId: "00000000-0000-4000-8000-000000000099",
    });
    expect(e2e.liveProviderCalled).toBe(false);
    expect(e2e.ok).toBe(true);
    expect(e2e.assertions.toolCallOccurred).toBe(true);
    expect(e2e.assertions.noProtectedSideEffect).toBe(true);
  });

  it("keeps OpenRouter paid fallback disabled and live smoke gated", async () => {
    process.env.OPENROUTER_PAID_FALLBACK_ENABLED = "true";
    const cfg = openRouterConfig();
    expect(cfg.paidFallbackEnabled).toBe(false);
    const sel = await selectFreeOpenRouterModel({
      preferred: "openai/gpt-4o",
      fetchImpl: async () => ({ ok: true, json: async () => ({ data: [] }) }),
    });
    expect(sel.ok).toBe(false);
    const live = liveSmokeReadiness();
    expect(live.liveTestedCountUntilFounderRuns).toBe(0);
    expect(live.maxProviderCalls).toBe(3);
  });

  it("fails closed when provider mode lacks OpenRouter key", async () => {
    const result = await invokeRealAgent({
      projectId: "p1",
      agentDefinitionId: "research",
      executionMode: "provider",
      input: { question: "x" },
    });
    expect(result.ok).toBe(false);
    expect(result.status).toBe("provider_unavailable");
  });

  it("delegates hierarchically without self-approval or cross-project leak", async () => {
    const tasks = [];
    const res = await executeToolCall({
      name: "agent.delegate",
      args: {
        childAgentSlug: "delivery-architect",
        title: "Draft architecture for disposable project",
        acceptanceCriteria: "Structured plan",
      },
      context: {
        projectId: "proj-a",
        agentSlug: "delivery-product",
        taskId: "parent-1",
        deps: {
          createTask: async (row) => {
            expect(row.project_id).toBe("proj-a");
            expect(row.input.child_agent_slug).toBe("delivery-architect");
            const created = { id: "child-1", ...row };
            tasks.push(created);
            return { row: created, created: true, durable: true };
          },
        },
      },
    });
    expect(res.ok).toBe(true);
    expect(res.result.delegated).toBe(true);
    expect(res.result.durable).toBe(true);
    expect(tasks).toHaveLength(1);

    await expect(
      executeToolCall({
        name: "agent.delegate",
        args: { childAgentSlug: "delivery-product", title: "Self" },
        context: { projectId: "proj-a", agentSlug: "delivery-product" },
      })
    ).rejects.toThrow(/Self-delegation|not permitted|Circular/i);
  });

  it("routes openrouter queue jobs through real-agent worker bridge (test-double)", async () => {
    const { createRealAgentProviderAdapter, toWorkerProviderResult } = await import(
      "./worker-bridge"
    );
    const adapter = createRealAgentProviderAdapter({
      executionMode: "test_double",
      projectId: "queue-proj-1",
      taskId: "t1",
    });
    const mapped = await adapter({
      slug: "research",
      model: "openrouter/free",
      input: { question: "Queue path isolation check" },
    });
    expect(mapped.provider).toBe("test_double");
    expect(mapped.output).toBeTruthy();
    expect(mapped.meta.documentsUsed.length).toBeGreaterThan(0);
    expect(mapped.meta.qa).toBeTruthy();

    expect(() =>
      toWorkerProviderResult({
        ok: false,
        status: "provider_unavailable",
        reason: "OPENROUTER_NOT_CONFIGURED",
      })
    ).toThrow(/OpenRouter|OPENROUTER|unavailable|failed/i);
  });

  it("maps all 13 Founder workflow families to executable contracts", () => {
    const cov = auditRealAgentWorkflowCoverage();
    expect(cov.founderFamiliesRequired).toBe(13);
    expect(cov.founderFamiliesMapped).toBe(13);
    expect(cov.families.every((f) => f.status === "contract_mapped")).toBe(true);
  });
});
