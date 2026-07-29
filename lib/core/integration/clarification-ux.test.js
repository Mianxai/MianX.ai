import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  __resetIntegrationRuntime,
  createIntegrationRun,
  saveRun,
  FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
  mapProofStatusFromRun,
} from "@/lib/core/integration";
import { deriveFounderWorkflowSteps } from "@/components/admin/integration/IntegrationFounderWorkflowGuide";
import { deriveNextFounderProofAction } from "@/lib/core/integration/founder-proof-canonical.js";

describe("Phase H — Founder guided clarification UX", () => {
  beforeEach(() => {
    __resetIntegrationRuntime();
  });

  it("maps clarification stage to waiting_for_founder workflow step", () => {
    const steps = deriveFounderWorkflowSteps({
      hasRun: true,
      runStage: "clarification_required",
      proofStatus: "clarification_required",
    });
    const current = steps.find((s) => s.isCurrent);
    expect(current?.id).toBe("clarification");
    expect(current?.state).toBe("waiting_for_founder");
    expect(steps.find((s) => s.id === "objective")?.state).toBe("completed");
  });

  it("guided action deep-links to clarification anchor with project and run", () => {
    const action = deriveNextFounderProofAction({
      canonical_run: {
        id: "e8848aeb-388f-49b3-9b44-7ffbfa715110",
        project_id: "61d3b1fd-c260-479b-9289-0c75f977e892",
        current_stage: "clarification_required",
      },
      proof_status: "clarification_required",
      run_stage: "clarification_required",
      duplicate_warning: false,
    });
    expect(action.label).toMatch(/clarification/i);
    expect(action.href).toContain("tab=objective");
    expect(action.href).toContain("project_id=61d3b1fd-c260-479b-9289-0c75f977e892");
    expect(action.href).toContain("run_id=e8848aeb-388f-49b3-9b44-7ffbfa715110");
    expect(action.href).toContain("#clarification");
  });

  it("guided action for duplicates deep-links to #duplicates", () => {
    const action = deriveNextFounderProofAction({
      canonical_run: {
        id: "e8848aeb-388f-49b3-9b44-7ffbfa715110",
        project_id: "61d3b1fd-c260-479b-9289-0c75f977e892",
        current_stage: "clarification_required",
      },
      proof_status: "clarification_required",
      run_stage: "clarification_required",
      duplicate_warning: true,
    });
    expect(action.id).toBe("resolve_duplicates");
    expect(action.href).toContain("#duplicates");
  });

  it("mapProofStatusFromRun returns clarification_required for that stage", () => {
    expect(
      mapProofStatusFromRun({ current_stage: "clarification_required", status: "awaiting_clarification" })
    ).toBe("clarification_required");
  });
});

describe("Phase H — clarification API security", () => {
  let store;

  const PROJECT = {
    id: "61d3b1fd-c260-479b-9289-0c75f977e892",
    organization_id: "c3f8b3b2-1111-4e6b-9c3d-0a0d2b6e8d1a",
    status: "active",
  };

  beforeEach(() => {
    vi.resetModules();
    store = new Map();

    vi.doMock("@/lib/core/auth", () => ({
      requireAdmin: vi.fn(async () => ({ id: "admin-1", email: "admin@mianx.ai" })),
    }));

    vi.doMock("@/lib/core/integration", async () => {
      const actual = await vi.importActual("@/lib/core/integration");
      return {
        ...actual,
        integrationPersistenceStatus: vi.fn(async () => ({
          durable: true,
          backend: "supabase",
          failClosed: false,
          reason: null,
          capabilities: {
            integration_runs: true,
            integration_stage_events: true,
            integration_checkpoints: true,
            integration_evidence_manifests: true,
            integration_failure_events: true,
          },
        })),
        requireActiveProjectForProof: vi.fn(async (id) => {
          if (id !== PROJECT.id) {
            const err = new Error("Project not found");
            err.status = 400;
            throw err;
          }
          return PROJECT;
        }),
        listPersistedIntegrationRuns: vi.fn(async () => Array.from(store.values())),
        persistIntegrationRun: vi.fn(async (run) => {
          store.set(run.id, run);
          return { ok: true, durable: true, run };
        }),
        persistIntegrationRunInsertOnly: vi.fn(async (run) => {
          if (store.has(run.id)) {
            return { ok: true, durable: true, inserted: false, run: store.get(run.id) };
          }
          store.set(run.id, run);
          return { ok: true, durable: true, inserted: true, run };
        }),
      };
    });
  });

  async function seedClarificationRun() {
    const { createIntegrationRun, saveRun, FOUNDER_PRODUCTION_PROOF_OBJECTIVE } = await import(
      "@/lib/core/integration"
    );
    const { run } = createIntegrationRun(
      {
        ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
        project_id: PROJECT.id,
        organization_id: PROJECT.organization_id,
        unresolved_questions: ["Confirm simulation-only?"],
      },
      { actor: "founder" }
    );
    run.proof = { is_production_proof: true };
    run.current_stage = "clarification_required";
    run.status = "awaiting_clarification";
    saveRun(run);
    store.set(run.id, run);
    return run;
  }

  it("rejects clarification for wrong project", async () => {
    const run = await seedClarificationRun();
    const { POST } = await import("@/app/api/admin/integration/route.js");
    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "submit_clarification",
          project_id: "00000000-0000-4000-8000-000000000099",
          run_id: run.id,
          answer: "Yes, simulation only.",
        }),
      })
    );
    expect(res.status).toBeGreaterThanOrEqual(400);
  });

  it("rejects non-canonical run id", async () => {
    const run = await seedClarificationRun();
    const { POST } = await import("@/app/api/admin/integration/route.js");
    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "submit_clarification",
          project_id: PROJECT.id,
          run_id: "00000000-0000-4000-8000-000000000001",
          answer: "Yes, simulation only.",
        }),
      })
    );
    expect(res.status).toBeGreaterThanOrEqual(400);
    const body = await res.json();
    expect(body.error?.message || "").toMatch(/canonical/i);
  });

  it("rejects wrong stage", async () => {
    const run = await seedClarificationRun();
    run.current_stage = "founder_approval_required";
    store.set(run.id, run);
    const { saveRun } = await import("@/lib/core/integration");
    saveRun(run);

    const { POST } = await import("@/app/api/admin/integration/route.js");
    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "submit_clarification",
          project_id: PROJECT.id,
          run_id: run.id,
          answer: "Yes, simulation only.",
        }),
      })
    );
    expect(res.status).toBeGreaterThanOrEqual(400);
    const body = await res.json();
    expect(body.error?.message || "").toMatch(/clarification_required|stage/i);
  });

  it("accepts clarification, generates plan, never auto-approves or calls provider", async () => {
    const run = await seedClarificationRun();
    const { POST } = await import("@/app/api/admin/integration/route.js");
    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "submit_clarification",
          project_id: PROJECT.id,
          run_id: run.id,
          answer: "Yes — deterministic simulation only is acceptable.",
          actor: "founder",
        }),
      })
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.plan_auto_approved).toBe(false);
    expect(body.simulation_started).toBe(false);
    expect(body.provider_called).toBe(false);
    expect(body.run.current_stage).not.toBe("clarification_required");
    // Should reach founder approval after deterministic plan generation
    expect(["founder_approval_required", "objective_validated", "plan_generated"]).toContain(
      body.run.current_stage
    );
  });

  it("double submit is idempotent", async () => {
    const run = await seedClarificationRun();
    const { POST } = await import("@/app/api/admin/integration/route.js");
    const payload = {
      action: "submit_clarification",
      project_id: PROJECT.id,
      run_id: run.id,
      answer: "Yes — deterministic simulation only is acceptable.",
      actor: "founder",
      idempotency_key: "clarify-test-key-1",
    };
    const r1 = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
    );
    expect(r1.status).toBe(200);
    const b1 = await r1.json();
    const r2 = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
    );
    expect(r2.status).toBe(200);
    const b2 = await r2.json();
    expect(b2.run.id).toBe(b1.run.id);
    expect(b2.plan_auto_approved).toBe(false);
    expect(b2.simulation_started).toBe(false);
  });

  it("blocks create while active founder proof exists", async () => {
    await seedClarificationRun();
    const { POST } = await import("@/app/api/admin/integration/route.js");
    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "create",
          objective: {
            ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
            project_id: PROJECT.id,
            unresolved_questions: [],
          },
        }),
      })
    );
    expect(res.status).toBeGreaterThanOrEqual(400);
    const body = await res.json();
    expect(body.error?.message || "").toMatch(/active Founder Production Proof/i);
  });
});
