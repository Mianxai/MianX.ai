/**
 * CLI bootstrap — respects WORKFORCE_BOOTSTRAP_MODE.
 */
import { describe, it, expect } from "vitest";
import { runWorkforceBootstrap, runWorkforceVerify } from "./bootstrap-runner";

describe("workforce:bootstrap", () => {
  it("runs bootstrap / dry-run / verify-only", async () => {
    const mode = process.env.WORKFORCE_BOOTSTRAP_MODE || "bootstrap";
    const result = await runWorkforceBootstrap({
      dryRun: mode === "dry-run",
      verifyOnly: mode === "verify-only",
    });
    expect(result.ok).toBe(true);
    if (mode === "bootstrap") {
      expect(result.seatCountAfterSecondRun).toBe(445);
      expect(result.secondRun.created).toBe(0);
      expect(result.secondRun.duplicates).toBe(0);
    } else {
      expect(result.seats.capacitySeats).toBe(445);
    }
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(result, null, 2));
  });
});

describe("workforce:verify", () => {
  it("prints Founder-readable verify report", () => {
    const report = runWorkforceVerify();
    expect(report.compiledSeats).toBe(445);
    expect(report.mappedSeats).toBe(445);
    expect(report.liveTestedCount).toBe(0);
    const founderReadable = [
      `Capacity baseline: ${report.capacityBaseline}`,
      `Compiled seats: ${report.compiledSeats}`,
      `Persisted seats: ${report.persistedSeats}`,
      `Mapped seats: ${report.mappedSeats}`,
      `Available seats: ${report.availableSeats}`,
      `Allocated seats: ${report.allocatedSeats}`,
      `Active instances: ${report.activeInstances}`,
      `Blocked seats: ${report.blockedSeats}`,
      `Archetypes: ${report.archetypeCount}`,
      `Departments: ${report.departmentCoverage}`,
      `Workflows: ${report.workflowCoverage}`,
      `Hierarchy: ${report.hierarchyStatus}`,
      `Live tested: ${report.liveTestedCount}`,
      `OK: ${report.ok}`,
    ].join("\n");
    // eslint-disable-next-line no-console
    console.log(founderReadable);
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(report, null, 2));
    expect(report.ok).toBe(true);
  });
});
