import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ADMIN_NAV_GROUPS } from "@/components/admin/nav";
import {
  WORKFORCE_SURFACE_PURPOSE,
  WORKFORCE_SURFACE_IDS,
  containsForbiddenWorkforceClaim,
  assertCurrentWorkforceTruthContract,
} from "./terminology.js";

const ROOT = join(process.cwd());

function read(rel) {
  return readFileSync(join(ROOT, rel), "utf8");
}

describe("workforce Admin responsibility surfaces", () => {
  it("nav maps Setup / Readiness / Ops / Agents without deleting routes", () => {
    const wf = ADMIN_NAV_GROUPS.find((g) => g.id === "workforce");
    const byHref = Object.fromEntries(wf.items.map((i) => [i.href, i.label]));
    expect(byHref["/admin/workforce-activation"]).toBe("Workforce Setup");
    expect(byHref["/admin/workforce-readiness"]).toBe("Readiness");
    expect(byHref["/admin/workforce"]).toBe("Workforce Ops");
    expect(byHref["/admin/agents"]).toBe("Agents");
  });

  it("page truth headers prohibit 445-active implications", () => {
    const sources = [
      "components/admin/workforce/WorkforceClient.jsx",
      "components/admin/workforce-activation/WorkforceActivationClient.jsx",
      "components/admin/workforce-readiness/WorkforceReadinessClient.jsx",
      "components/admin/command-center/CommandCenterClient.jsx",
    ];
    for (const rel of sources) {
      expect(containsForbiddenWorkforceClaim(read(rel))).toBe(false);
    }
  });

  it("responsibility map documents all four primary surfaces", () => {
    const map = read("doc/ADMIN-WORKFORCE-RESPONSIBILITY-MAP.md");
    expect(map).toMatch(/Workforce Setup/);
    expect(map).toMatch(/Readiness/);
    expect(map).toMatch(/Workforce Ops/);
    expect(map).toMatch(/\/admin\/agents/);
    expect(map).toMatch(/routes are not deleted/i);
  });

  it("surface purpose registry matches current Production counter truth", () => {
    expect(WORKFORCE_SURFACE_PURPOSE[WORKFORCE_SURFACE_IDS.SETUP].doesNotProve).toMatch(
      /live-tested/i
    );
    const r = assertCurrentWorkforceTruthContract({
      capacitySeats: 445,
      persistedSeats: 445,
      readyToAllocateSeats: 445,
      allocatedSeats: 0,
      activeInstances: 0,
      liveTestedSeats: 0,
      providerName: "none",
      liveExecutionReady: false,
    });
    expect(r.ok).toBe(true);
  });
});
