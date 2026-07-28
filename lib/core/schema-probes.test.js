import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  probeTablePresent,
  resolveSchemaProbeFlags,
  resetSchemaProbeCache,
} from "./schema-probes";

vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: vi.fn(),
  getSupabaseAdmin: vi.fn(),
}));

import { isSupabaseConfigured, getSupabaseAdmin } from "@/lib/supabase";

describe("schema probes", () => {
  beforeEach(() => {
    resetSchemaProbeCache();
    vi.clearAllMocks();
  });
  afterEach(() => {
    resetSchemaProbeCache();
  });

  it("returns missing when supabase is not configured", async () => {
    isSupabaseConfigured.mockReturnValue(false);
    expect(await probeTablePresent("runtime_jobs")).toBe("missing");
    expect(getSupabaseAdmin).not.toHaveBeenCalled();
  });

  it("detects present tables via head select", async () => {
    isSupabaseConfigured.mockReturnValue(true);
    getSupabaseAdmin.mockReturnValue({
      from: () => ({
        select: () => ({
          limit: async () => ({ error: null }),
        }),
      }),
    });
    expect(await probeTablePresent("runtime_jobs")).toBe("present");
  });

  it("detects missing tables from undefined-table errors", async () => {
    isSupabaseConfigured.mockReturnValue(true);
    getSupabaseAdmin.mockReturnValue({
      from: () => ({
        select: () => ({
          limit: async () => ({
            error: { code: "42P01", message: 'relation "runtime_jobs" does not exist' },
          }),
        }),
      }),
    });
    expect(await probeTablePresent("runtime_jobs")).toBe("missing");
  });

  it("returns unknown for ambiguous probe errors", async () => {
    isSupabaseConfigured.mockReturnValue(true);
    getSupabaseAdmin.mockReturnValue({
      from: () => ({
        select: () => ({
          limit: async () => ({
            error: { code: "42501", message: "permission denied" },
          }),
        }),
      }),
    });
    expect(await probeTablePresent("admin_memberships")).toBe("unknown");
  });

  it("resolveSchemaProbeFlags maps present/missing/unknown without data", async () => {
    isSupabaseConfigured.mockReturnValue(true);
    let call = 0;
    getSupabaseAdmin.mockReturnValue({
      from: (table) => ({
        select: () => ({
          limit: async () => {
            call += 1;
            if (table === "admin_memberships") return { error: null };
            return {
              error: { code: "PGRST205", message: "Could not find the table" },
            };
          },
        }),
      }),
    });
    const flags = await resolveSchemaProbeFlags();
    expect(flags.membershipTablePresent).toBe(true);
    expect(flags.runtimeJobsSchemaPresent).toBe(false);
    expect(flags.memoryEntriesSchemaPresent).toBe(false);
    expect(flags.learningCandidatesSchemaPresent).toBe(false);
    expect(call).toBe(4);
  });
});
