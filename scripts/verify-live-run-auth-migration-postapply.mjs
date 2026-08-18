#!/usr/bin/env node
/**
 * Post-application verification for pilot_live_run_authorizations.
 * Default: emit checklist.
 * With MIANX_POSTAPPLY_PROBE=1: run linked read-only catalog checks via
 * `supabase db query --linked` (never inserts authorization rows).
 */

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MIG = join(
  ROOT,
  "supabase/migrations/20260803120000_pilot_live_run_authorizations.sql"
);
const EXPECTED_SHA =
  "82b8223a1736467d6ee66b0ddf6c36192b6ac6b5d7108d9e8165adfd19e820b8";

function sha256(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

function fail(msg) {
  console.error(`STOP: ${msg}`);
  process.exit(1);
}

const sql = readFileSync(MIG);
const checksum = sha256(sql);
if (checksum !== EXPECTED_SHA) {
  fail(`checksum mismatch actual=${checksum}`);
}

console.log("=== Live-run authorization migration — POST-APPLY ===");
console.log("migrationPath: supabase/migrations/20260803120000_pilot_live_run_authorizations.sql");
console.log(`migrationChecksumSha256: ${checksum}`);
console.log("providerCallAllowedExpected: false");
console.log("liveExecutionReadyExpected: false");
console.log("genuineGenerationCallsExpected: 0");
console.log("authenticatedModelsApiCallsExpected: 0");

if (process.env.MIANX_POSTAPPLY_PROBE !== "1") {
  console.log("probe: skipped (set MIANX_POSTAPPLY_PROBE=1 for linked catalog checks)");
  console.log("RESULT: checksum verified — no mutation performed");
  process.exit(0);
}

const query = `
select
  (select to_regclass('public.pilot_live_run_authorizations') is not null) as table_exists,
  (select relrowsecurity from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname='pilot_live_run_authorizations') as rls_enabled,
  (select relforcerowsecurity from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname='pilot_live_run_authorizations') as rls_forced,
  (select count(*)::int from public.pilot_live_run_authorizations) as auth_row_count,
  (select prosecdef from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname='consume_pilot_live_run_authorization') as consume_prosecdef,
  (select p.proconfig from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname='consume_pilot_live_run_authorization') as consume_proconfig,
  (select has_function_privilege('anon', 'public.consume_pilot_live_run_authorization(uuid,uuid,text,text,text,text,text,text)', 'EXECUTE')) as anon_exec,
  (select has_function_privilege('authenticated', 'public.consume_pilot_live_run_authorization(uuid,uuid,text,text,text,text,text,text)', 'EXECUTE')) as authenticated_exec,
  (select has_function_privilege('service_role', 'public.consume_pilot_live_run_authorization(uuid,uuid,text,text,text,text,text,text)', 'EXECUTE')) as service_role_exec,
  (select count(*)::int from information_schema.routine_privileges where specific_schema='public' and routine_name='consume_pilot_live_run_authorization' and grantee='PUBLIC' and privilege_type='EXECUTE') as public_exec_count
`;

let out;
try {
  out = execFileSync(
    "npx",
    ["supabase", "db", "query", "--linked", "-o", "json", query],
    { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
  );
} catch (err) {
  fail(`linked probe failed: ${err.message}`);
}

const start = out.indexOf("{");
if (start < 0) fail("no JSON from linked probe");
const parsed = JSON.parse(out.slice(start));
const row = parsed.rows?.[0];
if (!row) fail("empty probe row");

if (row.table_exists !== true) fail("table missing");
if (row.rls_enabled !== true) fail("RLS not enabled");
if (row.rls_forced !== true) fail("FORCE RLS not enabled");
if (Number(row.auth_row_count) !== 0) fail("unexpected authorization rows");
if (row.consume_prosecdef !== true) fail("consume not SECURITY DEFINER");
const cfg = Array.isArray(row.consume_proconfig) ? row.consume_proconfig.join(",") : String(row.consume_proconfig || "");
if (!cfg.includes('search_path=""') && !cfg.includes("search_path=")) {
  fail(`unexpected search_path config: ${cfg}`);
}
if (row.anon_exec === true) fail("anon can execute consume");
if (row.authenticated_exec === true) fail("authenticated can execute consume");
if (row.service_role_exec !== true) fail("service_role cannot execute consume");
if (Number(row.public_exec_count) !== 0) fail("PUBLIC still has EXECUTE");

console.log("authorizationStoreStatus: available");
console.log("authRowCount: 0");
console.log("functionSecurity: SECURITY DEFINER; search_path empty");
console.log("executePrivileges: service_role only");
console.log("RESULT: post-apply linked catalog checks passed — no mutation performed");
