#!/usr/bin/env node
/**
 * Workforce bootstrap CLI.
 * Production Sensitive Vercel env vars are NOT locally readable — do not use
 * vercel env pull/run for Production bootstrap. Use Admin Workforce Activation.
 *
 * Flags: --dry-run | --verify-only | --env-local | --fixture-mode
 */
import { loadWorkforceCliEnv } from "./lib/workforce-cli-env.mjs";
import { loadAppModule, closeAppLoader } from "./lib/load-app-module.mjs";

const argv = process.argv.slice(2);
const envMeta = loadWorkforceCliEnv(argv);
const dryRun = argv.includes("--dry-run");
const verifyOnly = argv.includes("--verify-only");
const fixtureMode = argv.includes("--fixture-mode");

try {
  const mod = await loadAppModule("/lib/core/workforce-i2/production-bootstrap.js");
  const runnerMod = await loadAppModule("/lib/core/workforce-i2/bootstrap-runner.js");

  if (!fixtureMode && !dryRun) {
    const blocked = mod.assertProductionPersistenceEnvOrExplain();
    if (blocked && !verifyOnly) {
      // verify-only / apply without readable env must not claim success
      console.log(blocked.message);
      console.log(JSON.stringify({ ...blocked, envLoad: envMeta }, null, 2));
      await closeAppLoader();
      process.exit(1);
    }
    if (blocked && verifyOnly) {
      console.log(blocked.message);
      console.log(JSON.stringify({ ...blocked, envLoad: envMeta }, null, 2));
      await closeAppLoader();
      process.exit(1);
    }
  }

  if (fixtureMode) {
    console.log("SIMULATION / FIXTURE MODE — NOT PRODUCTION PERSISTENCE");
  }

  if (dryRun) {
    const result = await runnerMod.runWorkforceBootstrap({ dryRun: true });
    console.log(
      [
        `Mode: dry-run`,
        `Compiled seats: ${result.compiledSeats}`,
        `Persisted seats (database): ${result.persistedSeats ?? "null"}`,
        `Would persist: false`,
        `OK: ${result.ok}`,
      ].join("\n")
    );
    console.log(JSON.stringify(result, null, 2));
    await closeAppLoader();
    process.exit(result.ok ? 0 : 1);
  }

  if (verifyOnly) {
    const result = await runnerMod.runWorkforceVerify({ productionMode: true });
    console.log(
      [
        `Compiled seats: ${result.compiledSeats}`,
        `Persisted seats (database): ${result.persistedSeats ?? "null"}`,
        `Foundation ready: ${result.foundationReady}`,
        `OK: ${result.ok}`,
      ].join("\n")
    );
    console.log(JSON.stringify(result, null, 2));
    await closeAppLoader();
    process.exit(result.ok ? 0 : 1);
  }

  // Normal bootstrap only when real env is available (non-placeholder)
  const result = await mod.runProductionBootstrapApply({
    confirmation: mod.BOOTSTRAP_CONFIRMATION,
  });
  console.log(JSON.stringify(result, null, 2));
  await closeAppLoader();
  process.exit(result.ok ? 0 : 1);
} catch (err) {
  console.error(err?.message || err);
  await closeAppLoader().catch(() => {});
  process.exit(1);
}
