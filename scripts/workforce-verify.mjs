#!/usr/bin/env node
/**
 * Real workforce verify CLI — distinguishes compiled vs persisted database seats.
 * Exit non-zero for production verification when database foundation is missing.
 */
import { loadWorkforceCliEnv } from "./lib/workforce-cli-env.mjs";
import { loadAppModule, closeAppLoader } from "./lib/load-app-module.mjs";

const argv = process.argv.slice(2);
const envMeta = loadWorkforceCliEnv(argv);

try {
  const mod = await loadAppModule("/lib/core/workforce-i2/bootstrap-runner.js");
  const report = await mod.runWorkforceVerify({ productionMode: true });

  const founderLines = [
    `Capacity baseline: ${report.capacityBaseline}`,
    `Compiled seats: ${report.compiledSeats}`,
    `Persisted seats (database): ${report.persistedSeats === null || report.persistedSeats === undefined ? "null (no database)" : report.persistedSeats}`,
    `Ready to allocate: ${report.readyToAllocateSeats}`,
    `Allocated seats: ${report.allocatedSeats}`,
    `Active instances: ${report.activeInstances}`,
    `Live tested seats: ${report.liveTestedSeats}`,
    `Compilation ready: ${report.compilationReady}`,
    `Database ready: ${report.databaseReady}`,
    `Runtime ready: ${report.runtimeReady}`,
    `Provider ready: ${report.providerReady}`,
    `Live ready: ${report.liveReady}`,
    `Foundation ready: ${report.foundationReady}`,
    `Production ready: ${report.productionReady}`,
    `Database durable: ${report.databaseDurable}`,
    `Queue durable: ${report.queueDurable}`,
    `Leases durable: ${report.leasesDurable}`,
    `Rate-limit durable: ${report.rateLimitDurable}`,
    `Bootstrap status: ${report.bootstrapStatus}`,
    report.providerFreeMessage,
    `OK: ${report.ok}`,
    report.code ? `Code: ${report.code}` : null,
  ].filter(Boolean);

  console.log(founderLines.join("\n"));
  console.log(
    JSON.stringify(
      {
        ...report,
        envLoad: { files: envMeta.loadedFiles.map((f) => f.path), note: envMeta.note },
      },
      null,
      2
    )
  );
  await closeAppLoader();
  process.exit(report.ok ? 0 : 1);
} catch (err) {
  console.error(err?.message || err);
  await closeAppLoader().catch(() => {});
  process.exit(1);
}
