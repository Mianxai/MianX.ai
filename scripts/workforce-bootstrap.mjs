#!/usr/bin/env node
/**
 * Real workforce bootstrap CLI (application code via Vite SSR loader — not Vitest).
 * Flags: --dry-run | --verify-only | --env-local | --env-file <path>
 */
import { loadWorkforceCliEnv } from "./lib/workforce-cli-env.mjs";
import { loadAppModule, closeAppLoader } from "./lib/load-app-module.mjs";

const argv = process.argv.slice(2);
const envMeta = loadWorkforceCliEnv(argv);
const dryRun = argv.includes("--dry-run");
const verifyOnly = argv.includes("--verify-only");

try {
  const mod = await loadAppModule("/lib/core/workforce-i2/bootstrap-runner.js");
  const result = await mod.runWorkforceBootstrap({ dryRun, verifyOnly });

  const founderLines = [
    `Mode: ${result.mode}`,
    `Compilation ready: ${result.compilationReady}`,
    `Database ready: ${result.databaseReady}`,
    `Compiled seats: ${result.compiledSeats}`,
    `Persisted seats (database): ${result.persistedSeats === null || result.persistedSeats === undefined ? "null (no database)" : result.persistedSeats}`,
    `Would persist: ${result.wouldPersist}`,
    `Created: ${result.created ?? result.firstRun?.created ?? 0}`,
    `Updated: ${result.updated ?? result.firstRun?.updated ?? 0}`,
    `Second-run created: ${result.secondRun?.created ?? "n/a"}`,
    `Live tested: ${result.liveTestedSeats ?? 0}`,
    `OK: ${result.ok}`,
    result.code ? `Code: ${result.code}` : null,
  ].filter(Boolean);

  console.log(founderLines.join("\n"));
  console.log(
    JSON.stringify(
      {
        ...result,
        envLoad: { files: envMeta.loadedFiles.map((f) => f.path), note: envMeta.note },
      },
      null,
      2
    )
  );
  await closeAppLoader();
  process.exit(result.ok ? 0 : 1);
} catch (err) {
  console.error(err?.message || err);
  await closeAppLoader().catch(() => {});
  process.exit(1);
}
