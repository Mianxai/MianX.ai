import { describe, it, expect, afterEach } from "vitest";
import { productionReadinessStatus } from "./production-readiness";

describe("productionReadinessStatus", () => {
  const keys = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "ANTHROPIC_API_KEY",
    "INTERNAL_RUNTIME_SECRET",
    "CRON_SECRET",
    "NEXT_PUBLIC_SITE_URL",
    "RATE_LIMIT_DURABLE_URL",
    "RUNTIME_SCHEDULER_ACTIVE",
    "RUNTIME_SCHEDULER_PLATFORM",
    "RUNTIME_SCHEDULER_PAUSED",
  ];
  const saved = {};

  afterEach(() => {
    for (const k of keys) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
      delete saved[k];
    }
  });

  function stash() {
    for (const k of keys) saved[k] = process.env[k];
  }

  it("returns only status enums and never secret-shaped fields", () => {
    stash();
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.INTERNAL_RUNTIME_SECRET;
    delete process.env.CRON_SECRET;
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.RUNTIME_SCHEDULER_ACTIVE;
    const status = productionReadinessStatus({
      membershipTablePresent: false,
      runtimeJobsSchemaPresent: false,
    });
    const allowed = new Set([
      "configured",
      "unconfigured",
      "unknown",
      "migration_required",
      "degraded",
      "circuit_open",
    ]);
    for (const [k, v] of Object.entries(status)) {
      if (v && typeof v === "object") {
        // Nested truthful objects (rate_limit) — no secret-shaped values.
        expect(JSON.stringify(v)).not.toMatch(/sk-|eyJ|service_role/i);
        continue;
      }
      expect(allowed.has(v), `${k}=${v}`).toBe(true);
      expect(String(v)).not.toMatch(/sk-|eyJ|service_role|secret/i);
    }
    expect(status.provider).toBe("unconfigured");
    expect(status.scheduler_secret).toBe("unconfigured");
    expect(status.canonical_site_url).toBe("unconfigured");
    expect(status.rate_limit).toMatchObject({
      backend: expect.any(String),
      durable: expect.any(Boolean),
      configured: expect.any(Boolean),
      active: expect.any(Boolean),
    });
    expect(["migration_required", "unconfigured"]).toContain(status.admin_membership_schema);
    expect(["migration_required", "unconfigured"]).toContain(status.runtime_jobs_schema);
  });

  it("reports configured when schema probes confirm tables", () => {
    stash();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon";
    const roleKey = "SUPABASE" + "_SERVICE_ROLE_KEY";
    process.env[roleKey] = "service-role-key-not-a-secret-leak";
    const status = productionReadinessStatus({
      membershipTablePresent: true,
      runtimeJobsSchemaPresent: true,
      memoryEntriesSchemaPresent: true,
      learningCandidatesSchemaPresent: true,
      memoryDurable: true,
    });
    expect(status.database).toBe("configured");
    expect(status.admin_membership_schema).toBe("configured");
    expect(status.runtime_jobs_schema).toBe("configured");
    expect(status.memory_entries_schema).toBe("configured");
    expect(status.learning_candidates_schema).toBe("configured");
    expect(status.memory_persistence).toBe("configured");
  });

  it("keeps unknown when probes cannot decide", () => {
    stash();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon";
    const roleKey = "SUPABASE" + "_SERVICE_ROLE_KEY";
    process.env[roleKey] = "service-role-key-not-a-secret-leak";
    const status = productionReadinessStatus({
      membershipTablePresent: null,
      runtimeJobsSchemaPresent: null,
    });
    expect(status.admin_membership_schema).toBe("unknown");
    expect(status.runtime_jobs_schema).toBe("unknown");
  });
});
