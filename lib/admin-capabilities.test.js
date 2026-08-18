import { describe, it, expect } from "vitest";
import {
  capabilitiesForRole,
  hasCapability,
  CAPABILITIES,
} from "./admin-capabilities";

describe("admin capabilities", () => {
  it("gives viewers read-only access", () => {
    const caps = capabilitiesForRole("viewer");
    expect(hasCapability(caps, CAPABILITIES.READ)).toBe(true);
    expect(hasCapability(caps, CAPABILITIES.DECIDE_APPROVALS)).toBe(false);
    expect(hasCapability(caps, CAPABILITIES.MANAGE_AGENTS)).toBe(false);
  });

  it("gives operators runtime ops without approvals or agent lifecycle", () => {
    const caps = capabilitiesForRole("operator");
    expect(hasCapability(caps, CAPABILITIES.MANAGE_JOBS)).toBe(true);
    expect(hasCapability(caps, CAPABILITIES.START_WORKFLOWS)).toBe(true);
    expect(hasCapability(caps, CAPABILITIES.DECIDE_APPROVALS)).toBe(false);
    expect(hasCapability(caps, CAPABILITIES.MANAGE_AGENTS)).toBe(false);
  });

  it("gives owners every capability", () => {
    const caps = capabilitiesForRole("owner");
    for (const c of Object.values(CAPABILITIES)) {
      expect(hasCapability(caps, c)).toBe(true);
    }
  });

  it("unknown and empty roles get zero capabilities (fail closed)", () => {
    expect(capabilitiesForRole("superuser")).toEqual([]);
    expect(capabilitiesForRole("")).toEqual([]);
    expect(capabilitiesForRole(null)).toEqual([]);
    expect(hasCapability(capabilitiesForRole("root"), CAPABILITIES.READ)).toBe(false);
  });
});
