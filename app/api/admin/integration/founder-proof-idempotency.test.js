import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Phase H — Founder production proof idempotency (server-side)", () => {
  let store;
  let insertCalls;
  let persistDelayMs;

  const PROJECT = {
    id: "61d3b1fd-c260-479b-9289-0c75f977e892",
    organization_id: "c3f8b3b2-1111-4e6b-9c3d-0a0d2b6e8d1a",
    status: "active",
  };

  beforeEach(() => {
    vi.resetModules();
    store = new Map();
    insertCalls = 0;
    persistDelayMs = 30;

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
        requireActiveProjectForProof: vi.fn(async () => PROJECT),
        listPersistedIntegrationRuns: vi.fn(async () => Array.from(store.values())),
        persistIntegrationRunInsertOnly: vi.fn(async (run) => {
          insertCalls += 1;

          if (store.has(run.id)) {
            return {
              ok: true,
              durable: true,
              inserted: false,
              conflict: true,
              run: store.get(run.id),
            };
          }

          // Delay to simulate concurrent serverless invocations.
          await new Promise((r) => setTimeout(r, persistDelayMs));

          if (store.has(run.id)) {
            return {
              ok: true,
              durable: true,
              inserted: false,
              conflict: true,
              run: store.get(run.id),
            };
          }

          store.set(run.id, run);
          return { ok: true, durable: true, inserted: true, run };
        }),
      };
    });
  });

  it("returns existing active run when an active proof already exists", async () => {
    const { FOUNDER_PRODUCTION_PROOF_OBJECTIVE } = await import(
      "@/lib/core/integration"
    );

    store.set("existing-run-1", {
      id: "existing-run-1",
      project_id: PROJECT.id,
      organization_id: PROJECT.organization_id,
      current_stage: "clarification_required",
      status: "awaiting_clarification",
      started_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-01-01T00:00:00.000Z",
      proof: { is_production_proof: true },
      objective: { title: FOUNDER_PRODUCTION_PROOF_OBJECTIVE.title },
      evidence: { count: 0 },
      memory: { count: 0 },
      learning: { count: 0 },
      recovery_count: 0,
    });

    const { POST } = await import("./route.js");
    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "start_founder_proof",
          project_id: PROJECT.id,
          confirmation: true,
          actor: "founder",
        }),
      })
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.resumed_existing_run).toBe(true);
    expect(body.run.id).toBe("existing-run-1");
    expect(insertCalls).toBe(0);
  });

  it("concurrent start calls create only one persisted run", async () => {
    const { POST } = await import("./route.js");

    const reqBody = {
      action: "start_founder_proof",
      project_id: PROJECT.id,
      confirmation: true,
      actor: "founder",
    };

    const [r1, r2] = await Promise.all([
      POST(
        new Request("http://localhost/api/admin/integration", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(reqBody),
        })
      ),
      POST(
        new Request("http://localhost/api/admin/integration", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(reqBody),
        })
      ),
    ]);

    expect(r1.status).toBe(200);
    expect(r2.status).toBe(200);
    const b1 = await r1.json();
    const b2 = await r2.json();

    expect(b1.ok).toBe(true);
    expect(b2.ok).toBe(true);
    expect(b1.run.id).toBe(b2.run.id);

    // Only one run should have been inserted.
    expect(store.size).toBe(1);
    expect(insertCalls).toBeGreaterThanOrEqual(1);
    expect(insertCalls).toBeLessThanOrEqual(2);
  });

  it("rejects mismatched idempotency key for the selected project", async () => {
    const { POST } = await import("./route.js");

    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "start_founder_proof",
          project_id: PROJECT.id,
          confirmation: true,
          actor: "founder",
          idempotency_key: "wrong-idempotency-base",
        }),
      })
    );

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error?.message || "").toMatch(/idempotency_key/i);
  });
});

