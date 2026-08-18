#!/usr/bin/env node
/**
 * Pre-application read-only checks for pilot_live_run_authorizations.
 * NEVER applies, pushes, repairs, resets, or mutates remote schema.
 *
 * Exit 0 = checks completed (may still report pending migration).
 * Exit 2 = unsafe / unexpected state — stop.
 */

import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const MIGRATION = "supabase/migrations/20260803120000_pilot_live_run_authorizations.sql";
const PREV = "supabase/migrations/20260801120000_phase_ii1_live_agent_pilot.sql";
const ROLLBACK =
  "supabase/rollbacks/20260803120000_pilot_live_run_authorizations.rollback.sql";
const EXPECTED_CHECKSUM =
  "82b8223a1736467d6ee66b0ddf6c36192b6ac6b5d7108d9e8165adfd19e820b8";

function sh(cmd) {
  return execSync(cmd, { cwd: ROOT, encoding: "utf8" }).trim();
}

function fail(msg) {
  console.error("STOP:", msg);
  process.exit(2);
}

function main() {
  console.log("=== Live-run authorization migration — PRE-APPLY (read-only) ===");
  console.log("mutationPerformed: no");

  if (!existsSync(join(ROOT, MIGRATION))) fail(`missing ${MIGRATION}`);
  if (!existsSync(join(ROOT, PREV))) fail(`missing previous ${PREV}`);
  if (!existsSync(join(ROOT, ROLLBACK))) fail(`missing rollback ${ROLLBACK}`);

  const body = readFileSync(join(ROOT, MIGRATION));
  const checksum = createHash("sha256").update(body).digest("hex");
  console.log("migrationPath:", MIGRATION);
  console.log("migrationChecksumSha256:", checksum);
  if (checksum !== EXPECTED_CHECKSUM) {
    fail(`checksum mismatch (expected ${EXPECTED_CHECKSUM})`);
  }

  let mainSha;
  try {
    mainSha = sh("git rev-parse origin/main");
  } catch {
    fail("cannot resolve origin/main");
  }
  console.log("originMain:", mainSha);

  const sql = body.toString("utf8");
  for (const needle of [
    "pilot_live_run_authorizations",
    "consume_pilot_live_run_authorization",
    "enable row level security",
    "force row level security",
    "security definer",
    "set search_path = ''",
    "pg_catalog.now()",
    "migrationApplied: no",
  ]) {
    if (!sql.includes(needle)) fail(`migration missing required marker: ${needle}`);
  }
  if (/set search_path = public/i.test(sql)) {
    fail("insecure search_path=public still present");
  }
  if (/truncate |delete from /i.test(sql)) fail("destructive DML detected in migration");

  // Name collision static check against other migrations' create table names
  const files = sh("ls supabase/migrations/*.sql").split("\n").filter(Boolean);
  const creates = [];
  for (const f of files) {
    if (f.endsWith(MIGRATION.split("/").pop())) continue;
    const t = readFileSync(join(ROOT, f), "utf8");
    if (/create table if not exists\s+(?:public\.)?pilot_live_run_authorizations/i.test(t)) {
      fail(`name collision: ${f} also creates pilot_live_run_authorizations`);
    }
    creates.push(f);
  }
  console.log("otherMigrationsScanned:", creates.length);
  console.log("nameCollision: none");

  console.log("requiredRoles: service_role (grant); anon/authenticated revoked");
  console.log("backupPitrStatus: not queried (Founder confirms in Vercel/Supabase console)");

  let dryRun = null;
  if (process.env.MIANX_RUN_LINKED_DRY_RUN === "1") {
    try {
      dryRun = sh("npx supabase db push --linked --dry-run");
      console.log("dryRunExit: 0");
      console.log("dryRunOutput:");
      console.log(dryRun);
      if (!/20260803120000_pilot_live_run_authorizations\.sql/.test(dryRun)) {
        fail("dry-run did not list expected migration");
      }
      if (/Would push these migrations:[\s\S]*2026080(?!3120000)/.test(dryRun)) {
        // soft note only — unexpected siblings should be inspected
        console.warn("NOTE: inspect dry-run list for unexpected siblings");
      }
    } catch (err) {
      fail(`linked dry-run failed or unavailable: ${err.message}`);
    }
  } else {
    console.log(
      "dryRun: skipped (set MIANX_RUN_LINKED_DRY_RUN=1 to execute read-only linked dry-run)"
    );
  }

  console.log("RESULT: pre-apply checks complete — no mutation performed");
  console.log("NEXT: Founder Phase 0–5 in doc/LIVE-RUN-AUTHORIZATION-MIGRATION-RUNBOOK.md");
}

main();
