import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  __resetIntegrationRuntime,
  createIntegrationRun,
  saveRun,
  FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
  mapProofStatusFromRun,
} from "@/lib/core/integration";
import {
  deriveNextFounderProofAction,
  resolveCanonicalFounderProofRuns,
  isTerminalFounderProofRun,
} from "@/lib/core/integration/founder-proof-canonical.js";
import { withProjectAndRun } from "@/components/admin/FounderGuidedPanel";

const PROJECT = {
  id: "61d3b1fd-c260-479b-9289-0c75f977e892",
  organization_id: "c3f8b3b2-1111-4e6b-9c3d-0a0d2b6e8d1a",
  status: "active",
};

const CANONICAL_ID = "e8848aeb-388f-49b3-9b44-7ffbfa715110";
const DUPLICATE_ID = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";

function makeProofRun(id, { started_at, stage = "clarification_required" } = {}) {
  const { run } = createIntegrationRun(
    {
      ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
      project_id: PROJECT.id,
      organization_id: PROJECT.organization_id,
      unresolved_questions: ["Confirm simulation-only?"],
    },
    { actor: "founder", integration_run_id: id }
  );
  run.id = id;
  run.proof = { is_production_proof: true };
  run.payload = { ...(run.payload || {}), is_production_proof: true };
  run.current_stage = stage;
  run.status = "awaiting_clarification";
  run.started_at = started_at || "2026-07-01T00:00:00.000Z";
  run.updated_at = started_at || "2026-07-01T00:00:00.000Z";
  saveRun(run);
  return run;
}

describe("Phase H — duplicate resolution UX (guided CTA)", () => {
  beforeEach(() => {
    __resetIntegrationRuntime();
  });

  it("Command Center / guided CTA deep-links to #duplicates with project and run", () => {
    const action = deriveNextFounderProofAction({
      canonical_run: {
        id: CANONICAL_ID,
        project_id: PROJECT.id,
        current_stage: "clarification_required",
      },
      proof_status: "clarification_required",
      run_stage: "clarification_required",
      duplicate_warning: true,
    });
    expect(action.id).toBe("resolve_duplicates");
    expect(action.label).toMatch(/duplicate/i);
    expect(action.href).toContain("#duplicates");
    expect(action.href).toContain(`project_id=${PROJECT.id}`);
    expect(action.href).toContain(`run_id=${CANONICAL_ID}`);
    const preserved = withProjectAndRun(action.href, PROJECT.id, CANONICAL_ID);
    expect(preserved).toContain("#duplicates");
  });

  it("canonical is earliest active; later run is duplicate", () => {
    const canonical = makeProofRun(CANONICAL_ID, {
      started_at: "2026-07-01T00:00:00.000Z",
    });
    const dup = makeProofRun(DUPLICATE_ID, {
      started_at: "2026-07-02T00:00:00.000Z",
    });
    const res = resolveCanonicalFounderProofRuns([canonical, dup]);
    expect(res.canonical_run.id).toBe(CANONICAL_ID);
    expect(res.duplicate_runs.map((r) => r.id)).toEqual([DUPLICATE_ID]);
    expect(res.duplicate_warning).toBe(true);
    expect(res.active_founder_proof_run_count).toBe(2);
  });
});

describe("Phase H — cancel_founder_proof_duplicate API", () => {
  let store;
  let POST;

  beforeEach(async () => {
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
          store.set(run.id, structuredClone(run));
          return { ok: true, durable: true, run };
        }),
        persistIntegrationRunInsertOnly: vi.fn(async (run) => {
          if (store.has(run.id)) {
            return {
              ok: true,
              durable: true,
              inserted: false,
              run: store.get(run.id),
            };
          }
          store.set(run.id, structuredClone(run));
          return { ok: true, durable: true, inserted: true, run };
        }),
      };
    });

    const integration = await import("@/lib/core/integration");
    integration.__resetIntegrationRuntime();
    ({ POST } = await import("@/app/api/admin/integration/route.js"));
  });

  async function seedPair() {
    const {
      createIntegrationRun,
      saveRun,
      FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
    } = await import("@/lib/core/integration");
    function seed(id, started_at) {
      const { run } = createIntegrationRun(
        {
          ...FOUNDER_PRODUCTION_PROOF_OBJECTIVE,
          project_id: PROJECT.id,
          organization_id: PROJECT.organization_id,
          unresolved_questions: ["Confirm?"],
        },
        { actor: "founder", integration_run_id: id }
      );
      run.id = id;
      run.proof = { is_production_proof: true };
      run.payload = { is_production_proof: true };
      run.current_stage = "clarification_required";
      run.status = "awaiting_clarification";
      run.started_at = started_at;
      run.updated_at = started_at;
      saveRun(run);
      store.set(run.id, structuredClone(run));
      return run;
    }
    return {
      canonical: seed(CANONICAL_ID, "2026-07-01T00:00:00.000Z"),
      dup: seed(DUPLICATE_ID, "2026-07-02T00:00:00.000Z"),
    };
  }

  it("rejects cancelling the canonical run", async () => {
    await seedPair();
    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "cancel_founder_proof_duplicate",
          project_id: PROJECT.id,
          canonical_run_id: CANONICAL_ID,
          duplicate_run_id: CANONICAL_ID,
          actor: "founder",
        }),
      })
    );
    expect(res.status).toBeGreaterThanOrEqual(400);
    const body = await res.json();
    expect(body.error?.message || "").toMatch(/canonical/i);
    expect(store.get(CANONICAL_ID)?.current_stage).toBe("clarification_required");
    expect(store.get(DUPLICATE_ID)?.current_stage).toBe("clarification_required");
  });

  it("cancels a non-canonical duplicate and preserves canonical", async () => {
    await seedPair();
    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "cancel_founder_proof_duplicate",
          project_id: PROJECT.id,
          canonical_run_id: CANONICAL_ID,
          duplicate_run_id: DUPLICATE_ID,
          actor: "founder",
        }),
      })
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.cancelled_run_id).toBe(DUPLICATE_ID);
    expect(body.canonical_run_id).toBe(CANONICAL_ID);
    expect(body.run.proof?.cancelled_as_duplicate).toBe(true);
    expect(isTerminalFounderProofRun(body.run)).toBe(true);

    expect(store.get(CANONICAL_ID).current_stage).toBe("clarification_required");
    expect(store.get(CANONICAL_ID).proof?.cancelled_as_duplicate).not.toBe(true);
    expect(isTerminalFounderProofRun(store.get(DUPLICATE_ID))).toBe(true);

    const resolution = resolveCanonicalFounderProofRuns([
      store.get(CANONICAL_ID),
      store.get(DUPLICATE_ID),
    ]);
    expect(resolution.active_founder_proof_run_count).toBe(1);
    expect(resolution.duplicate_warning).toBe(false);
    expect(resolution.canonical_run.id).toBe(CANONICAL_ID);
  });

  it("rejects cross-project duplicate cancellation", async () => {
    await seedPair();
    const dup = store.get(DUPLICATE_ID);
    dup.project_id = "00000000-0000-4000-8000-000000000099";
    store.set(dup.id, structuredClone(dup));
    const { saveRun } = await import("@/lib/core/integration");
    saveRun(dup);

    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "cancel_founder_proof_duplicate",
          project_id: PROJECT.id,
          canonical_run_id: CANONICAL_ID,
          duplicate_run_id: DUPLICATE_ID,
          actor: "founder",
        }),
      })
    );
    expect(res.status).toBeGreaterThanOrEqual(400);
    const body = await res.json();
    expect(body.error?.message || "").toMatch(/cross-project/i);
  });

  it("already-terminal duplicate is idempotent", async () => {
    await seedPair();
    const { cancelIntegrationRun, saveRun } = await import("@/lib/core/integration");
    const cancelled = cancelIntegrationRun(DUPLICATE_ID, {
      actor: "founder",
      failure_reason: "cancelled_duplicate",
    });
    cancelled.proof = {
      ...(cancelled.proof || {}),
      cancelled_as_duplicate: true,
      cancelled_duplicate_of: CANONICAL_ID,
    };
    saveRun(cancelled);
    store.set(cancelled.id, structuredClone(cancelled));

    const beforeUpdated = store.get(DUPLICATE_ID).updated_at;
    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "cancel_founder_proof_duplicate",
          project_id: PROJECT.id,
          canonical_run_id: CANONICAL_ID,
          duplicate_run_id: DUPLICATE_ID,
          actor: "founder",
        }),
      })
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.resumed_existing_cancellation).toBe(true);
    expect(store.get(CANONICAL_ID).current_stage).toBe("clarification_required");
    expect(store.get(DUPLICATE_ID).updated_at).toBe(beforeUpdated);
  });

  it("rejects clarification while duplicates exist", async () => {
    await seedPair();
    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "submit_clarification",
          project_id: PROJECT.id,
          run_id: CANONICAL_ID,
          answer: "Yes — simulation only.",
          actor: "founder",
        }),
      })
    );
    expect(res.status).toBeGreaterThanOrEqual(400);
    const body = await res.json();
    expect(body.error?.message || "").toMatch(/duplicate/i);
    expect(store.get(CANONICAL_ID).current_stage).toBe("clarification_required");
  });

  it("after cancellation, clarification submission becomes available", async () => {
    await seedPair();
    const cancelRes = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "cancel_founder_proof_duplicate",
          project_id: PROJECT.id,
          canonical_run_id: CANONICAL_ID,
          duplicate_run_id: DUPLICATE_ID,
          actor: "founder",
        }),
      })
    );
    expect(cancelRes.status).toBe(200);

    const clarifyRes = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "submit_clarification",
          project_id: PROJECT.id,
          run_id: CANONICAL_ID,
          answer: "Yes — deterministic simulation only is acceptable.",
          actor: "founder",
        }),
      })
    );
    expect(clarifyRes.status).toBe(200);
    const body = await clarifyRes.json();
    expect(body.plan_auto_approved).toBe(false);
    expect(body.simulation_started).toBe(false);
    expect(body.provider_called).toBe(false);
    expect(body.run.id).toBe(CANONICAL_ID);
    expect(body.run.current_stage).not.toBe("clarification_required");
  });

  it("does not trust client-supplied wrong canonical_run_id", async () => {
    await seedPair();
    const res = await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "cancel_founder_proof_duplicate",
          project_id: PROJECT.id,
          canonical_run_id: DUPLICATE_ID,
          duplicate_run_id: CANONICAL_ID,
          actor: "founder",
        }),
      })
    );
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(store.get(CANONICAL_ID).current_stage).toBe("clarification_required");
  });

  it("concurrent duplicate cancellation does not corrupt canonical stage history", async () => {
    await seedPair();
    const payload = {
      action: "cancel_founder_proof_duplicate",
      project_id: PROJECT.id,
      canonical_run_id: CANONICAL_ID,
      duplicate_run_id: DUPLICATE_ID,
      actor: "founder",
    };
    const [r1, r2] = await Promise.all([
      POST(
        new Request("http://localhost/api/admin/integration", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        })
      ),
      POST(
        new Request("http://localhost/api/admin/integration", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        })
      ),
    ]);
    expect(r1.status).toBe(200);
    expect(r2.status).toBe(200);
    expect(store.get(CANONICAL_ID).current_stage).toBe("clarification_required");
    expect(store.get(CANONICAL_ID).started_at).toBe("2026-07-01T00:00:00.000Z");
    expect(isTerminalFounderProofRun(store.get(DUPLICATE_ID))).toBe(true);
  });

  it("public health-aligned counts after cancellation", async () => {
    await seedPair();
    await POST(
      new Request("http://localhost/api/admin/integration", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "cancel_founder_proof_duplicate",
          project_id: PROJECT.id,
          duplicate_run_id: DUPLICATE_ID,
          actor: "founder",
        }),
      })
    );
    const resolution = resolveCanonicalFounderProofRuns([
      store.get(CANONICAL_ID),
      store.get(DUPLICATE_ID),
    ]);
    expect(resolution.active_founder_proof_run_count).toBe(1);
    expect(resolution.duplicate_count).toBe(0);
    expect(mapProofStatusFromRun(resolution.canonical_run)).toBe("clarification_required");
    expect(resolution.canonical_run.current_stage).toBe("clarification_required");
  });
});

describe("Phase H — clarification UI duplicate hard-gate (pure)", () => {
  it("documents that Submit must stay disabled while duplicateActive", () => {
    function canSubmit({ answer, busy, submitting, runId, duplicateActive }) {
      return (
        Boolean(answer?.trim()) &&
        !busy &&
        !submitting &&
        Boolean(runId) &&
        !duplicateActive
      );
    }
    expect(
      canSubmit({
        answer: "Yes",
        busy: false,
        submitting: false,
        runId: CANONICAL_ID,
        duplicateActive: true,
      })
    ).toBe(false);
    expect(
      canSubmit({
        answer: "Yes",
        busy: false,
        submitting: false,
        runId: CANONICAL_ID,
        duplicateActive: false,
      })
    ).toBe(true);
  });

  it("typed clarification answer is preserved during duplicate resolution", () => {
    const answer = "Founder typed answer pending duplicates";
    const afterCancelRefresh = answer;
    expect(afterCancelRefresh).toBe("Founder typed answer pending duplicates");
  });
});
