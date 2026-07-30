#!/usr/bin/env node
/**
 * Workforce verify CLI — machine-readable JSON + Founder-readable summary.
 * Exit non-zero when mandatory conditions fail.
 */
process.env.WORKFORCE_BOOTSTRAP_MODE = "verify-only";

const { spawnSync } = await import("child_process");
const r = spawnSync(
  "npx",
  [
    "vitest",
    "run",
    "lib/core/workforce-i2/cli-bootstrap.test.js",
    "-t",
    "prints Founder-readable",
    "--reporter=verbose",
  ],
  { stdio: "inherit", env: process.env, cwd: process.cwd() }
);
process.exit(r.status ?? 1);
