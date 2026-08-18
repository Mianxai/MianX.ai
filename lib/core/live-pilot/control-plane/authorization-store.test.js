import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getAuthorizationStoreStatus,
  consumeDurableLiveRunAuthorization,
  createConcurrentAuthorizationCasStore,
  AUTHORIZATION_TABLE,
} from "./authorization-store";
import {
  createLiveRunAuthorizationRecord,
  resetLiveRunAuthorizationFixtures,
} from "./authorization";
import {
  buildLiveRunControlPlaneAdminReport,
  buildLiveRunControlPlaneAdminReportAsync,
} from "./admin-report";
import { evaluateLiveRunExecutionLock } from "./execution-lock";
import { PILOT_PROJECT_ID, PILOT_AGENT_SLUG } from "../constants";

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: vi.fn(),
  getSupabaseAdmin: vi.fn(),
}));

vi.mock("@/lib/core/schema-probes", async () => {
  const actual = await vi.importActual("@/lib/core/schema-probes");
  return {
    ...actual,
    probeTablePresent: vi.fn(),
    resetSchemaProbeCache: vi.fn(),
  };
});

import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";
import { probeTablePresent } from "@/lib/core/schema-probes";

describe("authorization store fail-closed + atomic consume", () => {
  beforeEach(() => {
    resetLiveRunAuthorizationFixtures();
    vi.clearAllMocks();
  });

  afterEach(() => {
    resetLiveRunAuthorizationFixtures();
  });

  it("reports authorization_store_unavailable when table missing", async () => {
    isSupabaseConfigured.mockReturnValue(true);
    probeTablePresent.mockResolvedValue("missing");
    const status = await getAuthorizationStoreStatus();
    expect(status.status).toBe("not_applied");
    expect(status.reason).toBe("authorization_store_unavailable");
    expect(status.migrationApplied).toBe(false);
    expect(status.providerCallAllowed).toBe(false);
    expect(status.table).toBe(AUTHORIZATION_TABLE);
  });

  it("Admin report fail-closed without migration and never allows provider", async () => {
    isSupabaseConfigured.mockReturnValue(true);
    probeTablePresent.mockResolvedValue("missing");
    const report = await buildLiveRunControlPlaneAdminReportAsync();
    expect(report.authorizationStoreStatus).toBe("not_applied");
    expect(report.authorizationStoreReason).toBe("authorization_store_unavailable");
    expect(report.remainingBlockers).toContain("authorization_store_unavailable");
    expect(report.providerCallAllowed).toBe(false);
    expect(report.liveExecutionReady).toBe(false);
    expect(report.migrationApplied).toBe(false);
    expect(report.failClosedWithoutMigration).toBe(true);
  });

  it("sync Admin report defaults to not_applied fail-closed", () => {
    const report = buildLiveRunControlPlaneAdminReport();
    expect(report.authorizationStoreStatus).toBe("not_applied");
    expect(report.remainingBlockers).toContain("authorization_store_unavailable");
    expect(report.providerCallAllowed).toBe(false);
  });

  it("durable consume fails closed when store unavailable — no provider call", async () => {
    isSupabaseConfigured.mockReturnValue(true);
    probeTablePresent.mockResolvedValue("missing");
    const auth = createLiveRunAuthorizationRecord({
      status: "authorized",
      taskId: "t-miss",
    });
    const result = await consumeDurableLiveRunAuthorization({
      authorizationId: auth.authorizationId,
      auth,
      forceMissing: true,
    });
    expect(result.ok).toBe(false);
    expect(result.code).toBe("AUTHORIZATION_STORE_UNAVAILABLE");
    expect(result.genuineOpenAICalls).toBe(0);
  });

  it("durable consume via RPC: exactly one success under concurrent calls", async () => {
    isSupabaseConfigured.mockReturnValue(true);
    probeTablePresent.mockResolvedValue("present");
    let consumed = false;
    getSupabaseAdmin.mockReturnValue({
      rpc: async () => {
        if (consumed) return { data: [], error: null };
        consumed = true;
        return {
          data: [{ id: "x", status: "consumed", consumed_at: new Date().toISOString() }],
          error: null,
        };
      },
    });
    const auth = createLiveRunAuthorizationRecord({
      status: "authorized",
      taskId: "t-rpc",
    });
    const [a, b, c] = await Promise.all([
      consumeDurableLiveRunAuthorization({ auth }),
      consumeDurableLiveRunAuthorization({ auth }),
      consumeDurableLiveRunAuthorization({ auth }),
    ]);
    const wins = [a, b, c].filter((r) => r.ok);
    const losses = [a, b, c].filter((r) => !r.ok);
    expect(wins).toHaveLength(1);
    expect(wins[0].guarantee).toBe("atomic_one_time_authorization_consumption");
    expect(losses.length).toBe(2);
    expect(losses.every((r) => r.code === "ALREADY_CONSUMED_OR_CONFLICT")).toBe(true);
  });

  it("CAS store: concurrent consumers — exactly one wins", async () => {
    const auth = createLiveRunAuthorizationRecord({
      status: "authorized",
      taskId: "t-cas",
    });
    const cas = createConcurrentAuthorizationCasStore(auth);
    const results = await Promise.all([
      cas.consume(),
      cas.consume(),
      cas.consume(),
      cas.consume(),
      cas.consume(),
    ]);
    expect(results.filter((r) => r.ok)).toHaveLength(1);
    expect(results.filter((r) => !r.ok)).toHaveLength(4);
    expect(cas.get().status).toBe("consumed");
  });

  it("execution lock requires durable store when requireDurableStore=true", () => {
    const auth = createLiveRunAuthorizationRecord({
      status: "authorized",
      taskId: "t-lock",
    });
    const blocked = evaluateLiveRunExecutionLock({
      authorizationId: auth.authorizationId,
      taskId: "t-lock",
      requireDurableStore: true,
      authorizationStoreStatus: "not_applied",
      accountAccessStatus: "verified",
      queuedCount: 1,
      concurrentRuns: 0,
      schedulerHealthy: true,
    });
    expect(blocked.blockers).toContain("authorization_store_unavailable");
    expect(blocked.providerCallAllowed).toBe(false);
  });

  it("key presence privacy remains boolean-only on control plane report", () => {
    const report = buildLiveRunControlPlaneAdminReport();
    const blob = JSON.stringify(report);
    expect(blob).not.toMatch(/sk-[a-zA-Z0-9]{8,}/);
    expect(report).not.toHaveProperty("apiKey");
    expect(typeof report.apiKeyConfigured).toBe("boolean");
    expect(PILOT_PROJECT_ID).toBeTruthy();
    expect(PILOT_AGENT_SLUG).toBeTruthy();
  });
});
