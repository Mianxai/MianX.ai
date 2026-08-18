import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase G migration contract", () => {
  const sql = readFileSync(
    resolve("supabase/migrations/20260728200000_phase_g_workforce_runtime.sql"),
    "utf8"
  );

  it("is additive and founder-gated", () => {
    expect(sql).toMatch(/DO NOT apply without Founder approval/i);
    expect(sql).not.toMatch(/^\s*drop table(?! if exists)/im);
    expect(sql).not.toMatch(/\btruncate\b/i);
    expect(sql).not.toMatch(/\bdelete from\b/i);
  });

  it("creates workforce runtime tables", () => {
    for (const t of [
      "workforce_agent_states",
      "workforce_messages",
      "workforce_delegations",
      "workforce_pipeline_events",
      "workforce_simulations",
      "workforce_audit_events",
    ]) {
      expect(sql).toContain(`create table if not exists ${t}`);
    }
  });
});
