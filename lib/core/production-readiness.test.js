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
    const status = productionReadinessStatus({
      membershipTablePresent: false,
      runtimeJobsSchemaPresent: false,
    });
    const allowed = new Set([
      "configured",
      "unconfigured",
      "unknown",
      "migration_required",
    ]);
    for (const [k, v] of Object.entries(status)) {
      expect(allowed.has(v), `${k}=${v}`).toBe(true);
      expect(String(v)).not.toMatch(/sk-|eyJ|service_role|secret/i);
    }
    expect(status.provider).toBe("unconfigured");
    expect(status.scheduler_secret).toBe("unconfigured");
    expect(status.canonical_site_url).toBe("unconfigured");
    expect(["migration_required", "unconfigured"]).toContain(status.admin_membership_schema);
    expect(["migration_required", "unconfigured"]).toContain(status.runtime_jobs_schema);
  });
});
