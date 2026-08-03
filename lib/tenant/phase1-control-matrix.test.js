import { describe, it, expect } from "vitest";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  PHASE1_STATUS,
  PHASE1_CONTROL_MATRIX,
} from "./phase1-control-matrix";
import { SERVICE_ROLE_INVENTORY } from "./service-role-inventory";
import { assertRouteInventoryCoversAdminTree } from "./route-inventory";

function walkAdminRoutes(dir, rel = "", out = []) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    const r = rel ? `${rel}/${name}` : name;
    if (statSync(abs).isDirectory()) walkAdminRoutes(abs, r, out);
    else if (name === "route.js") out.push(`app/api/admin/${r}`);
  }
  return out;
}

describe("Phase 1 Step 5 control + route matrix", () => {
  it("does not claim Phase 1 complete", () => {
    expect(PHASE1_STATUS).toBe("ready_for_migration_rollout");
    expect(PHASE1_STATUS).not.toBe("complete");
  });

  it("keeps control matrix non-empty with status fields", () => {
    expect(PHASE1_CONTROL_MATRIX.length).toBeGreaterThan(5);
    for (const row of PHASE1_CONTROL_MATRIX) {
      expect(row.control).toBeTruthy();
      expect(row.status).toBeTruthy();
    }
  });

  it("records Step 5 fixed service-role batch", () => {
    expect(
      SERVICE_ROLE_INVENTORY.remediation.fixed_in_step_5_draft.length
    ).toBeGreaterThan(0);
  });

  it("Admin API tree remains covered by route inventory", () => {
    const root = join(process.cwd(), "app/api/admin");
    const files = walkAdminRoutes(root);
    const result = assertRouteInventoryCoversAdminTree(files);
    expect(result.ok).toBe(true);
    expect(result.missing).toEqual([]);
  });

  it("route inventory integrity rejects duplicates and flags scope gaps", async () => {
    const { assertRouteInventoryIntegrity } = await import("./route-inventory");
    const integrity = assertRouteInventoryIntegrity();
    expect(integrity.duplicates).toEqual([]);
    expect(integrity.badRemediation).toEqual([]);
  });

  it("exact backlog rows have file and function", async () => {
    const { SERVICE_ROLE_BACKLOG, SERVICE_ROLE_HARDENED_STEP5 } = await import(
      "./service-role-backlog"
    );
    expect(SERVICE_ROLE_HARDENED_STEP5.length).toBeGreaterThan(5);
    for (const row of SERVICE_ROLE_BACKLOG) {
      expect(row.file).toBeTruthy();
      expect(row.function).toBeTruthy();
      expect(typeof row.blocksPhase1Completion).toBe("boolean");
    }
  });
});
