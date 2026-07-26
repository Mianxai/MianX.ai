import { describe, it, expect } from "vitest";
import {
  capabilitiesForRole,
  hasCapability,
  CAPABILITIES,
} from "@/lib/admin-capabilities";

const MUTATION_CAPS = [
  CAPABILITIES.MANAGE_LEADS,
  CAPABILITIES.MANAGE_PROJECTS,
  CAPABILITIES.MANAGE_AGENTS,
  CAPABILITIES.MANAGE_TASKS,
  CAPABILITIES.MANAGE_JOBS,
  CAPABILITIES.DECIDE_APPROVALS,
  CAPABILITIES.START_WORKFLOWS,
];

describe("role capability matrix (server-side authorization contract)", () => {
  it("owner has every control capability", () => {
    const caps = capabilitiesForRole("owner");
    for (const c of Object.values(CAPABILITIES)) {
      expect(hasCapability(caps, c)).toBe(true);
    }
  });

  it("admin has administrative mutations including approvals and agents", () => {
    const caps = capabilitiesForRole("admin");
    expect(hasCapability(caps, CAPABILITIES.DECIDE_APPROVALS)).toBe(true);
    expect(hasCapability(caps, CAPABILITIES.MANAGE_AGENTS)).toBe(true);
    expect(hasCapability(caps, CAPABILITIES.START_WORKFLOWS)).toBe(true);
  });

  it("operator can operate runtime but cannot decide approvals or manage agents", () => {
    const caps = capabilitiesForRole("operator");
    expect(hasCapability(caps, CAPABILITIES.MANAGE_JOBS)).toBe(true);
    expect(hasCapability(caps, CAPABILITIES.MANAGE_TASKS)).toBe(true);
    expect(hasCapability(caps, CAPABILITIES.START_WORKFLOWS)).toBe(true);
    expect(hasCapability(caps, CAPABILITIES.DECIDE_APPROVALS)).toBe(false);
    expect(hasCapability(caps, CAPABILITIES.MANAGE_AGENTS)).toBe(false);
  });

  it("viewer is read-only — denied every mutation capability", () => {
    const caps = capabilitiesForRole("viewer");
    expect(hasCapability(caps, CAPABILITIES.READ)).toBe(true);
    for (const c of MUTATION_CAPS) {
      expect(hasCapability(caps, c)).toBe(false);
    }
  });
});
