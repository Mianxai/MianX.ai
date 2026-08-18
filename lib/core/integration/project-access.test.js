import { describe, it, expect } from "vitest";
import {
  filterProofSelectableProjects,
  isActiveProofProject,
} from "./project-access-shared.js";

describe("integration project-access helpers", () => {
  const activeA = {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    name: "MianX Internal Production Proof",
    slug: "mianx-internal-production-proof",
    status: "active",
  };
  const activeB = {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    name: "Mianxai",
    slug: "mianxai",
    status: "active",
  };
  const archived = {
    id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    name: "Old",
    status: "archived",
    archived_at: "2026-01-01T00:00:00Z",
  };
  const paused = {
    id: "dddddddd-dddd-dddd-dddd-dddddddddddd",
    name: "Paused",
    status: "paused",
  };

  it("returns unique non-archived projects for the selector", () => {
    const list = filterProofSelectableProjects([
      activeA,
      activeB,
      archived,
      paused,
      activeA,
      { id: null, name: "bad" },
    ]);
    expect(list.map((p) => p.id)).toEqual([activeA.id, activeB.id, paused.id]);
    expect(list.every((p) => p.id)).toBe(true);
  });

  it("only active projects are proof-start eligible", () => {
    expect(isActiveProofProject(activeA)).toBe(true);
    expect(isActiveProofProject(paused)).toBe(false);
    expect(isActiveProofProject(archived)).toBe(false);
    expect(isActiveProofProject(null)).toBe(false);
    expect(isActiveProofProject({})).toBe(false);
  });

  it("All projects / empty selection is not proof-eligible", () => {
    expect(isActiveProofProject(undefined)).toBe(false);
    expect(isActiveProofProject({ id: "", status: "active" })).toBe(false);
  });
});
