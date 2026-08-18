import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("Phase E migration contract", () => {
  const sql = readFileSync(
    resolve("supabase/migrations/20260728180000_phase_e_template_intelligence.sql"),
    "utf8"
  );

  it("is additive and founder-gated", () => {
    expect(sql).toMatch(/DO NOT apply without Founder approval/i);
    expect(sql).toMatch(/Rollback:/i);
    expect(sql).not.toMatch(/^\s*drop table(?! if exists)/im);
    expect(sql).not.toMatch(/\btruncate\b/i);
    expect(sql).not.toMatch(/\bdelete from\b/i);
  });

  it("creates required tables", () => {
    for (const t of [
      "industry_templates",
      "business_model_templates",
      "capability_templates",
      "department_templates",
      "module_templates",
      "workflow_templates",
      "compliance_templates",
      "architecture_templates",
      "risk_templates",
      "kpi_templates",
      "template_relations",
      "template_versions",
      "template_evidence",
      "template_reviews",
    ]) {
      expect(sql).toContain(`create table if not exists ${t}`);
    }
  });

  it("enables RLS and service_role grants", () => {
    expect(sql).toMatch(/enable row level security/);
    expect(sql).toMatch(/to service_role/);
  });
});
