#!/usr/bin/env node
/**
 * Workforce bootstrap CLI (via vitest resolve path).
 * Flags: --dry-run | --verify-only
 */
import { createRequire } from "module";

const dryRun = process.argv.includes("--dry-run");
const verifyOnly = process.argv.includes("--verify-only");

process.env.WORKFORCE_BOOTSTRAP_MODE = dryRun
  ? "dry-run"
  : verifyOnly
    ? "verify-only"
    : "bootstrap";

const { spawnSync } = await import("child_process");
const r = spawnSync(
  "npx",
  ["vitest", "run", "lib/core/workforce-i2/cli-bootstrap.test.js", "--reporter=verbose"],
  { stdio: "inherit", env: process.env, cwd: process.cwd() }
);
process.exit(r.status ?? 1);
