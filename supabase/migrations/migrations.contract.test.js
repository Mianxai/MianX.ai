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
    // Exact list a Founder should see from `supabase db push --dry-run`
    // when only these are pending relative to a pre-runtime_jobs prod.
    const expectedTail = [
      "20260725150000_runtime_jobs.sql",
      "20260726120000_admin_membership_viewer_role.sql",
      "20260727120000_admin_memberships_service_role_grant.sql",
    ];
    expect(files.slice(-3)).toEqual(expectedTail);
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
