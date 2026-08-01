import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const MIGRATIONS_DIR = join(process.cwd(), "supabase/migrations");

function readMigration(name) {
  return readFileSync(join(MIGRATIONS_DIR, name), "utf8");
}

describe("migration contract (static, not applied)", () => {
  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  it("keeps additive filename order including runtime_jobs then viewer role", () => {
    expect(files).toContain("20260725150000_runtime_jobs.sql");
    expect(files).toContain("20260726120000_admin_membership_viewer_role.sql");
    const jobsIdx = files.indexOf("20260725150000_runtime_jobs.sql");
    const viewerIdx = files.indexOf("20260726120000_admin_membership_viewer_role.sql");
    expect(jobsIdx).toBeGreaterThan(-1);
    expect(viewerIdx).toBeGreaterThan(jobsIdx);
  });

  it("runtime_jobs migration is additive and enables RLS without anon policies", () => {
    const sql = readMigration("20260725150000_runtime_jobs.sql");
    expect(sql).toMatch(/create table if not exists runtime_jobs/i);
    expect(sql).toMatch(/claim_runtime_jobs/i);
    expect(sql).toMatch(/recover_expired_runtime_jobs/i);
    expect(sql).toMatch(/for update skip locked/i);
    expect(sql).toMatch(/enable row level security/i);
    expect(sql).toMatch(/grant .+ service_role/i);
    // No destructive drops of core tables/columns.
    expect(sql).not.toMatch(/drop table (?!if exists)/i);
    expect(sql).not.toMatch(/drop column/i);
    expect(sql).not.toMatch(/truncate /i);
    expect(sql).not.toMatch(/delete from /i);
  });

  it("viewer role migration preserves owner/admin/operator and adds viewer", () => {
    const sql = readMigration("20260726120000_admin_membership_viewer_role.sql");
    expect(sql).toMatch(/owner/);
    expect(sql).toMatch(/admin/);
    expect(sql).toMatch(/operator/);
    expect(sql).toMatch(/viewer/);
    expect(sql).toMatch(/admin_memberships_role_check/);
    expect(sql).not.toMatch(/drop table/i);
    expect(sql).not.toMatch(/truncate /i);
    expect(sql).not.toMatch(/delete from /i);
  });

  it("expected dry-run order lists newer additive migrations last", () => {
    const expectedTail = [
      "20260728200000_phase_g_workforce_runtime.sql",
      "20260728210000_phase_h_integration_runtime.sql",
      "20260730180000_phase_i2_workforce_registry.sql",
      "20260730190000_phase_i3_workforce_rls.sql",
      "20260731180000_phase_i9_supabase_cron_scheduler.sql",
      "20260801120000_phase_ii1_live_agent_pilot.sql",
    ];
    expect(files.slice(-6)).toEqual(expectedTail);
  });

  it("phase_ii1 live agent pilot migration is additive with RLS and secret-free", () => {
    const sql = readMigration("20260801120000_phase_ii1_live_agent_pilot.sql");
    expect(sql).toMatch(/create table if not exists pilot_runs/i);
    expect(sql).toMatch(/create table if not exists pilot_approvals/i);
    expect(sql).toMatch(/create table if not exists pilot_provider_requests/i);
    expect(sql).toMatch(/create table if not exists pilot_token_usage/i);
    expect(sql).toMatch(/create table if not exists pilot_cost_usage/i);
    expect(sql).toMatch(/create table if not exists pilot_evidence/i);
    expect(sql).toMatch(/create table if not exists pilot_failures/i);
    expect(sql).toMatch(/create table if not exists pilot_kill_switch_events/i);
    expect(sql).toContain("mianx-internal-architecture-reviewer");
    expect(sql).toMatch(/enable row level security/i);
    expect(sql).toMatch(/grant all on table pilot_runs to service_role/i);
    expect(sql).toMatch(/DO NOT apply without Founder approval/i);
    expect(sql).not.toMatch(/Bearer [A-Za-z0-9_-]{20,}/);
    expect(sql).not.toMatch(/ANTHROPIC_API_KEY\s*=/);
    expect(sql).not.toMatch(/truncate /i);
    expect(sql).not.toMatch(/delete from /i);
  });

  it("phase_i9 supabase cron scheduler migration is additive and secret-free", () => {
    const sql = readMigration("20260731180000_phase_i9_supabase_cron_scheduler.sql");
    expect(sql).toMatch(/create extension if not exists pg_cron/i);
    expect(sql).toMatch(/create extension if not exists pg_net/i);
    expect(sql).toContain("mianx-runtime-tick-5m");
    expect(sql).toContain("*/5 * * * *");
    expect(sql).toContain("mianx_runtime_tick_url");
    expect(sql).toContain("mianx_runtime_tick_secret");
    expect(sql).not.toMatch(/Bearer [A-Za-z0-9_-]{20,}/);
    expect(sql).not.toMatch(/truncate /i);
    expect(sql).not.toMatch(/delete from /i);
  });

  it("phase_i2 workforce registry migration is additive", () => {
    const sql = readMigration("20260730180000_phase_i2_workforce_registry.sql");
    expect(sql).toMatch(/create table if not exists agent_role_archetypes/i);
    expect(sql).toMatch(/create table if not exists agent_capacity_seats/i);
    expect(sql).toMatch(/create table if not exists project_agent_instances/i);
    expect(sql).toMatch(/create table if not exists rate_limit_buckets/i);
    expect(sql).toMatch(/grant all on table agent_capacity_seats to service_role/i);
    expect(sql).not.toMatch(/drop table (?!if exists)/i);
    expect(sql).not.toMatch(/truncate /i);
    expect(sql).not.toMatch(/delete from /i);
  });

  it("phase_i3 workforce RLS migration is additive", () => {
    const sql = readMigration("20260730190000_phase_i3_workforce_rls.sql");
    expect(sql).toMatch(/enable row level security/i);
    expect(sql).toMatch(/agent_capacity_seats/i);
    expect(sql).not.toMatch(/truncate /i);
    expect(sql).not.toMatch(/delete from /i);
  });

  it("phase_b memory/learning migration is additive with RLS", () => {
    const sql = readMigration("20260728120000_phase_b_memory_learning.sql");
    expect(sql).toMatch(/create table if not exists memory_entries/i);
    expect(sql).toMatch(/create table if not exists learning_candidates/i);
    expect(sql).toMatch(/enable row level security/i);
    expect(sql).toMatch(/grant all on table memory_entries to service_role/i);
    expect(sql).toMatch(/grant all on table learning_candidates to service_role/i);
    expect(sql).not.toMatch(/drop table (?!if exists)/i);
    expect(sql).not.toMatch(/truncate /i);
    expect(sql).not.toMatch(/delete from /i);
  });

  it("phase_d execution engine migration is additive with RLS", () => {
    const sql = readMigration("20260728150000_phase_d_execution_engine.sql");
    expect(sql).toMatch(/create table if not exists companies/i);
    expect(sql).toMatch(/create table if not exists products/i);
    expect(sql).toMatch(/create table if not exists execution_programs/i);
    expect(sql).toMatch(/create table if not exists execution_items/i);
    expect(sql).toMatch(/create table if not exists execution_dependencies/i);
    expect(sql).toMatch(/create table if not exists workforce_allocations/i);
    expect(sql).toMatch(/create table if not exists execution_events/i);
    expect(sql).toMatch(/create table if not exists execution_checkpoints/i);
    expect(sql).toMatch(/enable row level security/i);
    expect(sql).toMatch(/grant all on table execution_programs to service_role/i);
    expect(sql).not.toMatch(/drop table (?!if exists)/i);
    expect(sql).not.toMatch(/truncate /i);
    expect(sql).not.toMatch(/delete from /i);
  });

  it("phase_e template intelligence migration is additive with RLS", () => {
    const sql = readMigration("20260728180000_phase_e_template_intelligence.sql");
    expect(sql).toMatch(/create table if not exists industry_templates/i);
    expect(sql).toMatch(/create table if not exists template_relations/i);
    expect(sql).toMatch(/create table if not exists template_versions/i);
    expect(sql).toMatch(/create table if not exists template_reviews/i);
    expect(sql).toMatch(/enable row level security/i);
    expect(sql).toMatch(/grant all on table industry_templates to service_role/i);
    expect(sql).toMatch(/DO NOT apply without Founder approval/i);
    expect(sql).not.toMatch(/^\s*drop table(?! if exists)/im);
    expect(sql).not.toMatch(/truncate /i);
    expect(sql).not.toMatch(/delete from /i);
  });

  it("phase_f planning intelligence migration is additive with RLS", () => {
    const sql = readMigration("20260728190000_phase_f_planning_intelligence.sql");
    expect(sql).toMatch(/create table if not exists planning_plans/i);
    expect(sql).toMatch(/create table if not exists planning_roadmaps/i);
    expect(sql).toMatch(/create table if not exists planning_capabilities/i);
    expect(sql).toMatch(/create table if not exists planning_milestones/i);
    expect(sql).toMatch(/create table if not exists planning_wbs_nodes/i);
    expect(sql).toMatch(/create table if not exists planning_dependencies/i);
    expect(sql).toMatch(/create table if not exists planning_approval_gates/i);
    expect(sql).toMatch(/create table if not exists planning_deliverables/i);
    expect(sql).toMatch(/create table if not exists planning_risks/i);
    expect(sql).toMatch(/create table if not exists planning_evidence/i);
    expect(sql).toMatch(/create table if not exists planning_execution_previews/i);
    expect(sql).toMatch(/create table if not exists planning_memory_links/i);
    expect(sql).toMatch(/create table if not exists planning_learning_proposals/i);
    expect(sql).toMatch(/create table if not exists planning_audit_events/i);
    expect(sql).toMatch(/enable row level security/i);
    expect(sql).toMatch(/grant all on table planning_plans to service_role/i);
    expect(sql).toMatch(/DO NOT apply without Founder approval/i);
    expect(sql).not.toMatch(/^\s*drop table(?! if exists)/im);
    expect(sql).not.toMatch(/truncate /i);
    expect(sql).not.toMatch(/delete from /i);
  });

  it("phase_g workforce runtime migration is additive with RLS", () => {
    const sql = readMigration("20260728200000_phase_g_workforce_runtime.sql");
    expect(sql).toMatch(/create table if not exists workforce_agent_states/i);
    expect(sql).toMatch(/create table if not exists workforce_execution_contexts/i);
    expect(sql).toMatch(/create table if not exists workforce_messages/i);
    expect(sql).toMatch(/create table if not exists workforce_delegations/i);
    expect(sql).toMatch(/create table if not exists workforce_collaborations/i);
    expect(sql).toMatch(/create table if not exists workforce_pipeline_events/i);
    expect(sql).toMatch(/create table if not exists workforce_memory_writes/i);
    expect(sql).toMatch(/create table if not exists workforce_learning_proposals/i);
    expect(sql).toMatch(/create table if not exists workforce_checkpoints/i);
    expect(sql).toMatch(/create table if not exists workforce_control_events/i);
    expect(sql).toMatch(/create table if not exists workforce_health_events/i);
    expect(sql).toMatch(/create table if not exists workforce_simulations/i);
    expect(sql).toMatch(/create table if not exists workforce_audit_events/i);
    expect(sql).toMatch(/enable row level security/i);
    expect(sql).toMatch(/grant all on table workforce_agent_states to service_role/i);
    expect(sql).toMatch(/DO NOT apply without Founder approval/i);
    expect(sql).not.toMatch(/^\s*drop table(?! if exists)/im);
    expect(sql).not.toMatch(/truncate /i);
    expect(sql).not.toMatch(/delete from /i);
  });

  it("phase_h integration runtime migration is additive with RLS", () => {
    const sql = readMigration("20260728210000_phase_h_integration_runtime.sql");
    expect(sql).toMatch(/create table if not exists integration_runs/i);
    expect(sql).toMatch(/create table if not exists integration_stage_events/i);
    expect(sql).toMatch(/create table if not exists integration_checkpoints/i);
    expect(sql).toMatch(/create table if not exists integration_evidence_manifests/i);
    expect(sql).toMatch(/create table if not exists integration_failure_events/i);
    expect(sql).toMatch(/enable row level security/i);
    expect(sql).toMatch(/grant all on table integration_runs to service_role/i);
    expect(sql).toMatch(/DO NOT apply without Founder approval/i);
    expect(sql).not.toMatch(/^\s*drop table(?! if exists)/im);
    expect(sql).not.toMatch(/truncate /i);
    expect(sql).not.toMatch(/delete from /i);
  });

  it("service_role grant migration is additive and non-destructive", () => {
    const sql = readMigration(
      "20260727120000_admin_memberships_service_role_grant.sql"
    );
    expect(sql).toMatch(/grant all privileges on table admin_memberships to service_role/i);
    expect(sql).not.toMatch(/drop table/i);
    expect(sql).not.toMatch(/truncate /i);
    expect(sql).not.toMatch(/delete from /i);
  });
});
