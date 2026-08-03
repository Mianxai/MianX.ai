import { describe, it, expect } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const MIGRATION = join(
  ROOT,
  "supabase/migrations/20260803120000_pilot_live_run_authorizations.sql"
);
const EXPECTED =
  "5258d5d432c3cf4928d152be674416857a89f9b389d575d993632f29a7f3ddf0";

describe("live-run authorization migration readiness", () => {
  it("manifest checksum matches migration file bytes", () => {
    const hex = createHash("sha256").update(readFileSync(MIGRATION)).digest("hex");
    expect(hex).toBe(EXPECTED);
    const manifest = readFileSync(
      join(ROOT, "doc/LIVE-RUN-AUTHORIZATION-MIGRATION-MANIFEST.md"),
      "utf8"
    );
    expect(manifest).toContain(EXPECTED);
    expect(manifest).toMatch(/migrationApplied \| \*\*no\*\*/);
  });

  it("pre-apply script exists and completes without mutation", () => {
    expect(existsSync(join(ROOT, "scripts/verify-live-run-auth-migration-preapply.mjs"))).toBe(
      true
    );
    const out = execFileSync(
      process.execPath,
      ["scripts/verify-live-run-auth-migration-preapply.mjs"],
      { cwd: ROOT, encoding: "utf8" }
    );
    expect(out).toContain("mutationPerformed: no");
    expect(out).toContain("RESULT: pre-apply checks complete");
    expect(out).toContain(EXPECTED);
  });

  it("runbook includes ordered Founder phases and rollback classes", () => {
    const rb = readFileSync(
      join(ROOT, "doc/LIVE-RUN-AUTHORIZATION-MIGRATION-RUNBOOK.md"),
      "utf8"
    );
    expect(rb).toMatch(/Phase 0/);
    expect(rb).toMatch(/Phase 5/);
    expect(rb).toMatch(/Phase 10/);
    expect(rb).toMatch(/Pre-use rollback/);
    expect(rb).toMatch(/Post-use rollback/);
    expect(rb).toMatch(/db push --linked --dry-run/);
    expect(rb).not.toMatch(/Migration applied: yes/);
  });
});
