import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

vi.mock("@/lib/core/repo", () => ({
  getLastRuntimeTick: vi.fn(async () => null),
}));

vi.mock("@/lib/core/schema-probes", () => ({
  resolveSchemaProbeFlags: vi.fn(async () => ({
    membershipTablePresent: false,
    runtimeJobsSchemaPresent: false,
    memoryEntriesSchemaPresent: false,
    learningCandidatesSchemaPresent: false,
    integrationRunsSchemaPresent: false,
    integrationStageEventsSchemaPresent: false,
    integrationCheckpointsSchemaPresent: false,
    integrationEvidenceManifestsSchemaPresent: false,
    integrationFailureEventsSchemaPresent: false,
  })),
  probeTablePresent: vi.fn(async () => "missing"),
  resetSchemaProbeCache: vi.fn(),
}));

vi.mock("@/lib/core/memory", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    memoryLearningPersistenceStatus: vi.fn(async () => ({
      durable: false,
      backend: "unavailable",
      reason: "supabase_unconfigured",
    })),
  };
});

vi.mock("@/lib/admin-auth", () => ({
  requireAdmin: vi.fn().mockRejectedValue(new Error("Not admin")),
}));

const KEYS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ANTHROPIC_API_KEY",
  "INTERNAL_RUNTIME_SECRET",
  "CRON_SECRET",
  "RUNTIME_SCHEDULER_ACTIVE",
  "RUNTIME_SCHEDULER_PLATFORM",
];

function mockRequest(url = "http://localhost/api/core/health") {
  return { url };
}

describe("GET /api/core/health", () => {
  const original = { ...process.env };
  beforeEach(() => {
    for (const k of KEYS) delete process.env[k];
    vi.resetModules();
  });
  afterEach(() => {
    process.env = { ...original };
  });

  it("public liveness returns lightweight response without DB queries", async () => {
    const { GET } = await import("./route.js");
    const res = await GET(mockRequest("http://localhost/api/core/health"));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.service).toBe("mianx");
    expect(data.time).toBeTruthy();
    // Public response must not contain internal details
    expect(data.config).toBeUndefined();
    expect(data.agents).toBeUndefined();
    expect(data.lastTick).toBeUndefined();
  });

  it("non-admin diagnostics falls back to public response", async () => {
    const { GET } = await import("./route.js");
    const res = await GET(mockRequest("http://localhost/api/core/health?action=diagnostics"));
    // requireAdmin is mocked to reject, so non-admin gets public response
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.service).toBe("mianx");
  });

  it("admin diagnostics returns full health with only non-secret booleans", async () => {
    // Override the mock to resolve (admin authenticated)
    const { requireAdmin } = await import("@/lib/admin-auth");
    requireAdmin.mockResolvedValueOnce(undefined);
    vi.resetModules();
    // Re-mock requireAdmin to resolve for this test
    const adminAuth = await import("@/lib/admin-auth");
    adminAuth.requireAdmin.mockResolvedValueOnce(undefined);

    const { GET } = await import("./route.js");
    const res = await GET(mockRequest("http://localhost/api/core/health?action=diagnostics"));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.config.supabase).toBe(false);
    expect(data.config.providers.anthropic).toBe(false);
    expect(data.config.providerStatus).toBe("unconfigured");
    expect(data.agents).toBeGreaterThan(0);
    expect(data.agentsCatalogTotal).toBeGreaterThan(data.agents);
    expect(data.config.scheduler.mode).toBe("unconfigured");
    expect(data.config.scheduler.automaticProcessing).toBe(false);
    expect(data.config.scheduler.platformCronConfigured).toBe(true);
    expect(data.config.rateLimit.durable).toBe(false);
    expect(data.lastTick).toBeNull();
    expect(data.integration).toBeTruthy();
    expect(data.integration.pendingMigrationsKnown).toBeUndefined();
    expect(data.integration.migrationReadiness?.pending).toEqual([]);
    expect(JSON.stringify(data.integration)).not.toMatch(/20260728210000_phase_h/);
    expect(data.integration.fabricated_live_execution).toBe(false);
    expect(data.integration.simulationReady).toBe(false);
    const serialized = JSON.stringify(data);
    expect(serialized).not.toMatch(/service_role/i);
    expect(serialized).not.toMatch(/eyJ|https?:\/\//i);
  });

  it("reflects configured providers without exposing the key (admin diagnostics)", async () => {
    process.env.ANTHROPIC_API_KEY = "super-secret";
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://x.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon";

    const { GET } = await import("./route.js");
    const res = await GET(mockRequest("http://localhost/api/core/health?action=diagnostics"));
    const data = await res.json();
    expect(data.config.supabase).toBe(true);
    expect(data.config.providers.anthropic).toBe(true);
    expect(data.config.providerStatus).toBe("configured");
    expect(JSON.stringify(data)).not.toContain("super-secret");
  });
});
