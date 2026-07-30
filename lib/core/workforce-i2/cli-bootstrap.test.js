/**
 * CLI via vitest — avoids bare Node @/ path issues.
 * npm run workforce:bootstrap
 */
import { describe, it, expect } from "vitest";
import {
  bootstrapWorkforceRegistryDurable,
  assertSeatRegistryInvariants,
  compileCapacitySeats,
  compileRoleArchetypes,
  auditWorkforceSources,
  reconcileDepartmentBaseline,
  buildWorkforceActivationChecklist,
  recordReadinessSnapshot,
} from "./index";
import { auditRealAgentWorkflowCoverage } from "../real-agent/workflow-coverage";

describe("workforce:bootstrap", () => {
  it("bootstraps 445 seats idempotently", async () => {
    const sources = auditWorkforceSources();
    const archetypes = compileRoleArchetypes();
    const seats = compileCapacitySeats();
    const invariants = assertSeatRegistryInvariants(seats);
    expect(invariants.ok).toBe(true);
    const boot1 = await bootstrapWorkforceRegistryDurable();
    const boot2 = await bootstrapWorkforceRegistryDurable();
    expect(boot1.seats).toBe(445);
    expect(boot2.seats).toBe(445);
    const checklist = buildWorkforceActivationChecklist();
    recordReadinessSnapshot({
      capacitySeats: 445,
      mappedSeats: 445,
      readyToActivate: checklist.readiness.readyToActivateSeats,
      liveTested: 0,
    });
    const workflows = auditRealAgentWorkflowCoverage();
    // eslint-disable-next-line no-console
    console.log(
      JSON.stringify(
        {
          ok: true,
          sources: sources.entryCount,
          archetypes: archetypes.count,
          seats: seats.capacitySeats,
          mapped: seats.mappedSeats,
          orphan: seats.orphanSeats,
          departments: reconcileDepartmentBaseline().finalApprovedRegistryTotal,
          workflows: `${workflows.founderFamiliesMapped}/${workflows.founderFamiliesRequired}`,
          bootstrap: boot2.durableBackend,
          idempotent: boot1.seats === boot2.seats,
          liveTested: 0,
        },
        null,
        2
      )
    );
  });
});
