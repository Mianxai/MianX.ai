import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase H migration contract", () => {
  const sql = readFileSync(
    resolve("supabase/migrations/20260728210000_phase_h_integration_runtime.sql"),
    "utf8"
  );

  it("is additive and founder-gated", () => {
    expect(sql).toMatch(/DO NOT apply without Founder approval/i);
    expect(sql).not.toMatch(/^\s*drop table(?! if exists)/im);
    expect(sql).not.toMatch(/\btruncate\b/i);
    expect(sql).not.toMatch(/\bdelete from\b/i);
  });

  it("creates integration tables with RLS", () => {
    for (const t of [
      "integration_runs",
      "integration_stage_events",
      "integration_checkpoints",
      "integration_evidence_manifests",
      "integration_failure_events",
    ]) {
      expect(sql).toContain(`create table if not exists ${t}`);
      expect(sql).toContain(`alter table ${t} enable row level security`);
      expect(sql).toContain(`grant all on table ${t} to service_role`);
    }
  });
});
