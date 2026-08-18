import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  BOOTSTRAP_CONFIRMATION,
  runProductionBootstrapPreflight,
  runProductionBootstrapApply,
  runProductionBootstrapIdempotencyCheck,
  createMemoryPersistenceAdapter,
  resetWorkforceI2Stores,
  isLocalSensitiveEnvPlaceholder,
  productionEnvUnavailableMessage,
} from "./index";
import { SCHEDULER_EXPECTED_INTERVAL_MS } from "../scheduler-cadence";
import { schedulerExpectedIntervalMs, schedulerStatus } from "../config";
import { metadata as defaultSeoMetadata } from "../../seo";

describe("Phase I.5 production bootstrap", () => {
  beforeEach(() => {
    resetWorkforceI2Stores();
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.OPENROUTER_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
  });

  it("preflight reports zero persisted without writing", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    const pre = await runProductionBootstrapPreflight({ adapter });
    expect(pre.wrote).toBe(false);
    expect(pre.compiledSeats).toBe(445);
    expect(pre.mappedSeats).toBe(445);
    expect(pre.orphanSeats).toBe(0);
    expect(pre.duplicateSeats).toBe(0);
    expect(pre.persistedSeats).toBe(0);
    expect(pre.readyToAllocateSeats).toBe(0);
    expect(pre.allocatedSeats).toBe(0);
    expect(pre.activeInstances).toBe(0);
    expect(pre.liveTestedSeats).toBe(0);
    expect(pre.bootstrapRequired).toBe(true);
    expect(pre.workflowFamilyCount).toBe(13);
    expect(pre.liveExecutionReady).toBe(false);
    expect(pre.providerConfigured).toBe(false);
  });

  it("rejects wrong confirmation", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    const bad = await runProductionBootstrapApply({
      confirmation: "bootstrap 445",
      adapter,
    });
    expect(bad.ok).toBe(false);
    expect(bad.code).toBe("INVALID_CONFIRMATION");
    expect(bad.wrote).toBe(false);
  });

  it("first apply persists exactly 445; second creates 0", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    const first = await runProductionBootstrapApply({
      confirmation: BOOTSTRAP_CONFIRMATION,
      adapter,
    });
    expect(first.ok).toBe(true);
    expect(first.persistedSeats).toBe(445);
    expect(first.readyToAllocateSeats).toBe(445);
    expect(first.allocatedSeats).toBe(0);
    expect(first.activeInstances).toBe(0);
    expect(first.liveTestedSeats).toBe(0);
    expect(first.orphanSeats).toBe(0);
    expect(first.duplicateSeats).toBe(0);
    expect(first.created).toBeGreaterThan(0);
    expect(first.providerConfigured).toBe(false);
    expect(first.liveExecutionReady).toBe(false);

    const second = await runProductionBootstrapIdempotencyCheck({
      confirmation: BOOTSTRAP_CONFIRMATION,
      adapter,
    });
    expect(second.ok).toBe(true);
    expect(second.created).toBe(0);
    expect(second.duplicates).toBe(0);
    expect(second.persistedSeats).toBe(445);
    expect(second.readyToAllocateSeats).toBe(445);
    expect(second.allocatedSeats).toBe(0);
    expect(second.activeInstances).toBe(0);
    expect(second.liveTestedSeats).toBe(0);
    expect(second.idempotent).toBe(true);
    expect(adapter.state.seats.size).toBe(445);
  });

  it("does not create allocations or live-tested claims", async () => {
    const adapter = createMemoryPersistenceAdapter({
      credentialsOk: true,
      schemaPresent: true,
    });
    const result = await runProductionBootstrapApply({
      confirmation: BOOTSTRAP_CONFIRMATION,
      adapter,
    });
    expect(result.allocatedSeats).toBe(0);
    expect(result.activeInstances).toBe(0);
    expect(result.liveTestedSeats).toBe(0);
    expect(JSON.stringify(result)).not.toMatch(/sk-|service_role|OPENROUTER|eyJ/i);
  });

  it("detects sensitive env placeholders", () => {
    expect(isLocalSensitiveEnvPlaceholder("••••")).toBe(true);
    expect(isLocalSensitiveEnvPlaceholder("")).toBe(true);
    expect(isLocalSensitiveEnvPlaceholder("https://xyz.supabase.co")).toBe(false);
    expect(productionEnvUnavailableMessage().code).toBe(
      "PRODUCTION_SENSITIVE_ENV_NOT_LOCALLY_READABLE"
    );
    expect(productionEnvUnavailableMessage().message).toMatch(
      /Admin Workforce Activation/i
    );
  });

  it("canonical scheduler cadence is 5 minutes", () => {
    expect(SCHEDULER_EXPECTED_INTERVAL_MS).toBe(300_000);
    expect(schedulerExpectedIntervalMs("vercel_cron")).toBe(300_000);
    expect(schedulerExpectedIntervalMs("github_actions")).toBe(300_000);
    expect(schedulerExpectedIntervalMs("external")).toBe(300_000);
  });

  it("scheduler: fresh tick stays automatic", () => {
    process.env.INTERNAL_RUNTIME_SECRET = "x".repeat(24);
    process.env.RUNTIME_SCHEDULER_PLATFORM = "external";
    process.env.RUNTIME_SCHEDULER_ACTIVE = "1";
    const s = schedulerStatus({
      lastTickAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    });
    expect(s.expectedIntervalMs).toBe(300_000);
    expect(s.mode).toBe("automatic");
  });

  it("scheduler: stale tick warns without faking freshness", () => {
    process.env.INTERNAL_RUNTIME_SECRET = "x".repeat(24);
    process.env.RUNTIME_SCHEDULER_PLATFORM = "vercel_cron";
    process.env.RUNTIME_SCHEDULER_ACTIVE = "1";
    const stale = schedulerStatus({
      lastTickAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    });
    expect(stale.expectedIntervalMs).toBe(300_000);
    expect(stale.mode).toBe("warning");
  });

  it("scheduler: never-run stays automatic when active (no fake tick)", () => {
    process.env.INTERNAL_RUNTIME_SECRET = "x".repeat(24);
    process.env.RUNTIME_SCHEDULER_PLATFORM = "github_actions";
    process.env.RUNTIME_SCHEDULER_ACTIVE = "1";
    const never = schedulerStatus({ lastTickAt: null });
    expect(never.expectedIntervalMs).toBe(300_000);
    expect(never.mode).toBe("automatic");
    expect(never.lastTickAt).toBeUndefined();
  });

  it("scheduler: missing secret is not automatic", () => {
    delete process.env.INTERNAL_RUNTIME_SECRET;
    delete process.env.CRON_SECRET;
    delete process.env.RUNTIME_SCHEDULER_ACTIVE;
    const s = schedulerStatus({ lastTickAt: null });
    expect(s.expectedIntervalMs).toBe(300_000);
    expect(s.workerSecretConfigured).toBe(false);
    expect(s.automaticProcessing).toBe(false);
  });

  it("scheduler: configured external without ACTIVE requires activation", () => {
    process.env.INTERNAL_RUNTIME_SECRET = "x".repeat(24);
    process.env.RUNTIME_SCHEDULER_PLATFORM = "external";
    delete process.env.RUNTIME_SCHEDULER_ACTIVE;
    const s = schedulerStatus({});
    expect(s.mode).toBe("external_scheduler_required");
    expect(s.expectedIntervalMs).toBe(300_000);
  });

  it("metadata export does not set themeColor (viewport-only)", () => {
    expect(defaultSeoMetadata.themeColor).toBeUndefined();
  });
});

describe("Phase I.5 bootstrap API auth matrix", () => {
  beforeEach(() => {
    vi.resetModules();
  });
  afterEach(() => {
    vi.doUnmock("@/lib/admin-auth");
    vi.doUnmock("@/lib/core/ratelimit");
    vi.doUnmock("@/lib/core/audit");
    vi.doUnmock("@/lib/supabase");
    vi.doUnmock("@/lib/core/workforce-i2/production-bootstrap");
  });

  it("rejects unauthenticated bootstrap POST with 401", async () => {
    vi.doMock("@/lib/admin-auth", () => ({
      requireCapability: vi.fn(async () => {
        const { unauthorized } = await import("@/lib/core/errors");
        throw unauthorized();
      }),
      CAPABILITIES: { MANAGE_AGENTS: "manage_agents" },
    }));
    const { POST } = await import(
      "../../../app/api/admin/workforce/bootstrap/route.js"
    );
    const res = await POST(
      new Request("http://localhost/api/admin/workforce/bootstrap", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "http://localhost:3000" },
        body: JSON.stringify({ mode: "preflight" }),
      })
    );
    expect(res.status).toBe(401);
  });

  it("rejects unauthorized role with 403", async () => {
    vi.doMock("@/lib/admin-auth", () => ({
      requireCapability: vi.fn(async () => {
        const { forbidden } = await import("@/lib/core/errors");
        throw forbidden("Insufficient admin role for this action.");
      }),
      CAPABILITIES: { MANAGE_AGENTS: "manage_agents" },
    }));
    const { POST } = await import(
      "../../../app/api/admin/workforce/bootstrap/route.js"
    );
    const res = await POST(
      new Request("http://localhost/api/admin/workforce/bootstrap", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "http://localhost:3000" },
        body: JSON.stringify({ mode: "preflight" }),
      })
    );
    expect(res.status).toBe(403);
  });

  it("rejects cross-origin mutation via requireCapability", async () => {
    vi.doMock("@/lib/admin-auth", () => ({
      requireCapability: vi.fn(async () => {
        const { forbidden } = await import("@/lib/core/errors");
        throw forbidden("Cross-origin request blocked.");
      }),
      CAPABILITIES: { MANAGE_AGENTS: "manage_agents" },
    }));
    const { POST } = await import(
      "../../../app/api/admin/workforce/bootstrap/route.js"
    );
    const res = await POST(
      new Request("http://localhost/api/admin/workforce/bootstrap", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: "https://evil.example",
        },
        body: JSON.stringify({ mode: "preflight" }),
      })
    );
    expect(res.status).toBe(403);
  });

  it("rejects malformed confirmation without writing", async () => {
    const auditCalls = [];
    vi.doMock("@/lib/admin-auth", () => ({
      requireCapability: vi.fn(async () => ({ user: { id: "u-founder" } })),
      CAPABILITIES: { MANAGE_AGENTS: "manage_agents" },
    }));
    vi.doMock("@/lib/core/ratelimit", () => ({
      rateLimit: vi.fn(),
    }));
    vi.doMock("@/lib/core/audit", () => ({
      buildAuditEntry: (x) => x,
      recordAudit: vi.fn(async (_admin, entry) => {
        auditCalls.push(entry);
      }),
    }));
    vi.doMock("@/lib/supabase", () => ({
      getSupabaseAdmin: () => ({}),
    }));
    const { POST } = await import(
      "../../../app/api/admin/workforce/bootstrap/route.js"
    );
    const res = await POST(
      new Request("http://localhost/api/admin/workforce/bootstrap", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "http://localhost:3000" },
        body: JSON.stringify({ mode: "apply", confirmation: "WRONG" }),
      })
    );
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.code).toBe("INVALID_CONFIRMATION");
    expect(json.wrote).toBe(false);
    expect(JSON.stringify(json)).not.toMatch(/service_role|sk-or-/i);
    expect(auditCalls.some((a) => a.action === "workforce.bootstrap.rejected")).toBe(
      true
    );
  });

  it("preflight success returns safe fields and audits", async () => {
    const auditCalls = [];
    vi.doMock("@/lib/admin-auth", () => ({
      requireCapability: vi.fn(async () => ({ user: { id: "u-founder" } })),
      CAPABILITIES: { MANAGE_AGENTS: "manage_agents" },
    }));
    vi.doMock("@/lib/core/ratelimit", () => ({
      rateLimit: vi.fn(),
    }));
    vi.doMock("@/lib/core/audit", () => ({
      buildAuditEntry: (x) => x,
      recordAudit: vi.fn(async (_admin, entry) => {
        auditCalls.push(entry);
      }),
    }));
    vi.doMock("@/lib/supabase", () => ({
      getSupabaseAdmin: () => ({}),
    }));
    vi.doMock("@/lib/core/workforce-i2/production-bootstrap", () => ({
      BOOTSTRAP_CONFIRMATION: "BOOTSTRAP 445",
      runProductionBootstrapPreflight: vi.fn(async () => ({
        ok: true,
        mode: "preflight",
        wrote: false,
        compiledSeats: 445,
        mappedSeats: 445,
        orphanSeats: 0,
        duplicateSeats: 0,
        persistedSeats: 0,
        readyToAllocateSeats: 0,
        allocatedSeats: 0,
        activeInstances: 0,
        liveTestedSeats: 0,
        schemaReady: true,
        bootstrapRequired: true,
        providerConfigured: false,
        liveExecutionReady: false,
        departmentCount: 20,
        archetypeCount: 100,
        workflowFamilyCount: 13,
      })),
      runProductionBootstrapApply: vi.fn(),
      runProductionBootstrapIdempotencyCheck: vi.fn(),
    }));
    const { POST } = await import(
      "../../../app/api/admin/workforce/bootstrap/route.js"
    );
    const res = await POST(
      new Request("http://localhost/api/admin/workforce/bootstrap", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "http://localhost:3000" },
        body: JSON.stringify({ mode: "preflight" }),
      })
    );
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.compiledSeats).toBe(445);
    expect(json.persistedSeats).toBe(0);
    expect(json.providerConfigured).toBe(false);
    expect(auditCalls.some((a) => a.action === "workforce.bootstrap.preflight")).toBe(
      true
    );
    expect(auditCalls[0].metadata.requestId).toBeTruthy();
    expect(auditCalls[0].metadata.actorId).toBe("u-founder");
  });
});
