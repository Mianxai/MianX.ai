#!/usr/bin/env node
/**
 * Sequential runner for the browser geometry verifiers.
 *
 * Runs each verifier one at a time in its own process group, stops at the first
 * genuine failure, prints a compact pass/fail table and exits non-zero when any
 * verifier fails. Nothing runs in parallel, so two verifiers can never contend
 * for the same Chrome profile, CDP endpoint or application port.
 *
 * Usage: node scripts/verify-browser-harness.mjs
 */

import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { createRunId, redact } from "./lib/browser-harness.mjs";

export const DEFAULT_VERIFIERS = [
  { name: "navbar", script: "scripts/verify-navbar-geometry.mjs" },
  { name: "admin-loader", script: "scripts/verify-admin-loader-geometry.mjs" },
  { name: "login", script: "scripts/verify-login-geometry.mjs" },
  { name: "submission-badge", script: "scripts/verify-submission-badge-geometry.mjs" },
];

const VERIFIER_TIMEOUT_MS = Number(process.env.MIANX_VERIFIER_TIMEOUT_MS || 300000);

/** Runs one verifier to completion and guarantees its process group is gone. */
function runOne(verifier, { cwd, env, stdio, timeoutMs }) {
  return new Promise((resolveRun) => {
    const child = spawn(process.execPath, [resolve(cwd, verifier.script)], {
      cwd,
      env,
      stdio: stdio ?? "inherit",
      detached: true,
    });
    let output = "";
    if (stdio === "pipe") {
      child.stdout?.on("data", (d) => {
        output += d;
      });
      child.stderr?.on("data", (d) => {
        output += d;
      });
    }
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      try {
        process.kill(-child.pid, "SIGKILL");
      } catch {
        child.kill("SIGKILL");
      }
    }, timeoutMs);
    child.once("error", (error) => {
      clearTimeout(timer);
      resolveRun({ code: 1, pid: child.pid, output: `${output}\n${error.message}`, timedOut });
    });
    child.once("exit", (code, signal) => {
      clearTimeout(timer);
      resolveRun({
        code: code == null ? 1 : code,
        signal,
        pid: child.pid,
        output,
        timedOut,
      });
    });
  });
}

/**
 * Executes verifiers strictly one after another. `maxConcurrency` is measured,
 * not assumed, so a regression to parallel execution is detectable.
 */
export async function runSequential(verifiers = DEFAULT_VERIFIERS, options = {}) {
  const {
    runId = createRunId(),
    cwd = process.cwd(),
    env = process.env,
    stdio = "inherit",
    timeoutMs = VERIFIER_TIMEOUT_MS,
  } = options;

  const results = [];
  let active = 0;
  let maxConcurrency = 0;

  for (const verifier of verifiers) {
    const startedAt = Date.now();
    active += 1;
    maxConcurrency = Math.max(maxConcurrency, active);
    const outcome = await runOne(verifier, { cwd, env, stdio, timeoutMs });
    active -= 1;
    const endedAt = Date.now();
    results.push({
      name: verifier.name,
      script: verifier.script,
      pid: outcome.pid,
      code: outcome.code,
      ok: outcome.code === 0,
      timedOut: outcome.timedOut === true,
      startedAt,
      endedAt,
      durationMs: endedAt - startedAt,
      output: outcome.output,
    });
    if (outcome.code !== 0) break; // stop at the first genuine failure
  }

  const completed = results.length === verifiers.length;
  return {
    runId,
    results,
    maxConcurrency,
    ok: completed && results.every((r) => r.ok),
    skipped: verifiers.slice(results.length).map((v) => v.name),
  };
}

function printTable(summary) {
  const rows = summary.results.map((r) => ({
    verifier: r.name,
    result: r.ok ? "PASS" : r.timedOut ? "TIMEOUT" : "FAIL",
    exit: r.code,
    seconds: (r.durationMs / 1000).toFixed(1),
  }));
  for (const name of summary.skipped) {
    rows.push({ verifier: name, result: "SKIPPED", exit: "-", seconds: "-" });
  }
  console.log("");
  console.table(rows);
}

async function main() {
  const runId = createRunId();
  console.log(`MianX browser verification — run ${runId}`);
  const summary = await runSequential(DEFAULT_VERIFIERS, { runId });
  printTable(summary);
  if (summary.maxConcurrency > 1) {
    console.error(`FAIL: verifiers overlapped (max concurrency ${summary.maxConcurrency})`);
    process.exitCode = 1;
    return;
  }
  if (!summary.ok) {
    const failure = summary.results.find((r) => !r.ok);
    console.error(
      `FAIL: ${redact(failure?.name ?? "unknown")} exited ${failure?.code} (run ${runId})`
    );
    process.exitCode = 1;
    return;
  }
  console.log(`PASS: all ${summary.results.length} browser verifiers (run ${runId})`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const onSignal = () => {
    process.exitCode = 1;
    process.exit(1);
  };
  process.on("SIGINT", onSignal);
  process.on("SIGTERM", onSignal);
  await main();
}
