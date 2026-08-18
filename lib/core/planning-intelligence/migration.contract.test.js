import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase F migration contract", () => {
  const sql = readFileSync(
    resolve("supabase/migrations/20260728190000_phase_f_planning_intelligence.sql"),
    "utf8"
  );

  it("is additive and founder-gated", () => {
    expect(sql).toMatch(/DO NOT apply without Founder approval/i);
    expect(sql).toMatch(/Rollback:/i);
    expect(sql).not.toMatch(/^\s*drop table(?! if exists)/im);
    expect(sql).not.toMatch(/\btruncate\b/i);
    expect(sql).not.toMatch(/\bdelete from\b/i);
  });

  it("creates required planning tables", () => {
    for (const t of [
      "planning_plans",
      "planning_roadmaps",
      "planning_capabilities",
      "planning_milestones",
      "planning_wbs_nodes",
      "planning_dependencies",
      "planning_approval_gates",
      "planning_deliverables",
      "planning_risks",
      "planning_evidence",
      "planning_execution_previews",
      "planning_memory_links",
      "planning_learning_proposals",
      "planning_audit_events",
    ]) {
      expect(sql).toContain(`create table if not exists ${t}`);
    }
  });

  it("enables RLS and service_role grants", () => {
    expect(sql).toMatch(/enable row level security/);
    expect(sql).toMatch(/to service_role/);
  });
});
