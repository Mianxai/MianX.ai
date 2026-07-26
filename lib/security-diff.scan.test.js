import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";

/**
 * Secret-pattern scan over the RC branch diff vs origin/main.
 * Catches accidental key material in the PR patch only.
 */
describe("PR secret-pattern scan", () => {
  it("diff against origin/main does not contain obvious secret assignments", () => {
    let diff = "";
    try {
      diff = execSync("git diff origin/main...HEAD", {
        encoding: "utf8",
        maxBuffer: 20 * 1024 * 1024,
      });
    } catch {
      // Uncommitted working tree — scan staged+unstaged against HEAD as well.
      diff = execSync("git diff origin/main", {
        encoding: "utf8",
        maxBuffer: 20 * 1024 * 1024,
      });
    }
    // Also include unstaged local edits for the current RC work.
    const dirty = execSync("git diff", {
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
    });
    const combined = `${diff}\n${dirty}`;

    const forbidden = [
      /^\+.*ANTHROPIC_API_KEY\s*=\s*['"]sk-[^'"]+/m,
      /^\+.*SUPABASE_SERVICE_ROLE_KEY\s*=\s*['"][^'"]{20,}/m,
      /^\+.*INTERNAL_RUNTIME_SECRET\s*=\s*['"][^'"]{8,}/m,
      /^\+.*CRON_SECRET\s*=\s*['"][^'"]{8,}/m,
      /^\+.*password\s*[:=]\s*['"][^'"]{6,}/im,
    ];
    for (const re of forbidden) {
      expect(combined).not.toMatch(re);
    }
  });
});
