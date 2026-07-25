import { describe, it, expect } from "vitest";
import {
  canTransitionTask,
  assertTaskTransition,
  validateTaskCreate,
  buildTaskPatch,
} from "./tasks";

const UUID = "11111111-1111-4111-8111-111111111111";

describe("task transitions", () => {
  it("allows legal transitions", () => {
    expect(canTransitionTask("pending", "validated")).toBe(true);
    expect(canTransitionTask("validated", "running")).toBe(true);
    expect(canTransitionTask("running", "completed")).toBe(true);
    expect(canTransitionTask("failed", "running")).toBe(true); // retry
  });
  it("rejects illegal transitions", () => {
    expect(canTransitionTask("pending", "completed")).toBe(false);
    expect(canTransitionTask("completed", "running")).toBe(false);
    expect(canTransitionTask("cancelled", "running")).toBe(false);
    expect(canTransitionTask("bogus", "running")).toBe(false);
  });
  it("assertTaskTransition throws a 409 on illegal moves", () => {
    expect(() => assertTaskTransition("completed", "running")).toThrowError(
      /Cannot move task/
    );
    try {
      assertTaskTransition("completed", "running");
    } catch (e) {
      expect(e.status).toBe(409);
    }
  });
});

describe("validateTaskCreate", () => {
  it("normalizes a valid payload", () => {
    const row = validateTaskCreate({
      project_id: UUID,
      title: "  Score a lead  ",
      priority: "high",
      input: { email: "a@b.co", message: "hi" },
    });
    expect(row.title).toBe("Score a lead");
    expect(row.priority).toBe("high");
    expect(row.status).toBe("pending");
    expect(row.input).toEqual({ email: "a@b.co", message: "hi" });
  });
  it("rejects missing title/project_id", () => {
    try {
      validateTaskCreate({ input: {} });
    } catch (e) {
      expect(e.status).toBe(400);
      expect(e.details.title).toBeTruthy();
      expect(e.details.project_id).toBeTruthy();
    }
  });
  it("rejects an invalid priority", () => {
    expect(() =>
      validateTaskCreate({ project_id: UUID, title: "x", priority: "nuclear" })
    ).toThrowError(/fix the highlighted/i);
  });
  it("ignores unknown/dangerous fields (no mass assignment)", () => {
    const row = validateTaskCreate({
      project_id: UUID,
      title: "x",
      id: "attacker-controlled",
      status: "completed",
      created_at: "1999",
    });
    expect(row.id).toBeUndefined();
    expect(row.status).toBe("pending");
    expect(row.created_at).toBeUndefined();
  });
});

describe("buildTaskPatch", () => {
  it("allows a legal status transition", () => {
    expect(buildTaskPatch("pending", { status: "validated" })).toEqual({
      status: "validated",
    });
  });
  it("throws on an illegal status transition", () => {
    expect(() => buildTaskPatch("completed", { status: "running" })).toThrowError(
      /Cannot move task/
    );
  });
  it("blocks mass assignment of non-allowlisted fields", () => {
    expect(() =>
      buildTaskPatch("pending", { id: "x", project_id: "y", created_at: "z" })
    ).toThrowError(/No valid fields/);
  });
  it("updates description and priority", () => {
    const patch = buildTaskPatch("pending", { description: "d", priority: "low" });
    expect(patch).toEqual({ description: "d", priority: "low" });
  });
});
