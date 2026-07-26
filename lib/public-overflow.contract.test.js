import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("public CSS overflow contract", () => {
  it("keeps auto-fit grids clamped for 360px viewports", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    expect(css).toMatch(
      /\.services-grid.*minmax\(min\(100%,\s*280px\),\s*1fr\)/s
    );
    expect(css).toMatch(
      /\.partners-grid.*minmax\(min\(100%,\s*280px\),\s*1fr\)/s
    );
  });
});
