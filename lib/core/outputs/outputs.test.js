import { describe, it, expect } from "vitest";
import { buildOutputsView } from "./build";

describe("outputs view", () => {
  it("requires project scope and does not invent rows", async () => {
    const empty = await buildOutputsView({});
    expect(empty.available).toBe(false);
    expect(empty.items).toEqual([]);
    expect(empty.label).toMatch(/unavailable/i);
  });
});
