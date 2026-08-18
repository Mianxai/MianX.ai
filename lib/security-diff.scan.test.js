import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Resolve the git base used for the protected-diff secret scan.
 *
 * Priority:
 *   1. MIANX_DIFF_BASE (explicit SHA or ref set by CI)
 *   2. GITHUB_BASE_SHA (Actions PR payload, after the workflow fetches it)
 *   3. origin/main
 *   4. main
 *
 * Never silently skips the scan. Throws if no base can be verified.
 */
export function resolveProtectedDiffBase({
  env = process.env,
  revParse = (ref) =>
    execSync(`git rev-parse --verify ${ref}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim(),
} = {}) {
  const candidates = [
    env.MIANX_DIFF_BASE,
    env.GITHUB_BASE_SHA,
    "origin/main",
    "main",
  ].filter((v) => typeof v === "string" && v.trim().length > 0);

  const errors = [];
  for (const candidate of candidates) {
    try {
      const sha = revParse(candidate.trim());
      if (sha) return { ref: candidate.trim(), sha };
    } catch (error) {
      errors.push(`${candidate}: ${error?.message || error}`);
    }
  }
  throw new Error(
    `Protected-diff base could not be resolved. Set MIANX_DIFF_BASE to a fetched SHA/ref. Tried: ${candidates.join(", ") || "(none)"}. ${errors.join("; ")}`
  );
}

function gitDiff(range) {
  return execSync(`git diff ${range}`, {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });
}

describe("PR secret-pattern scan", () => {
  it("diff against the resolved base does not contain obvious secret assignments", () => {
    const { ref } = resolveProtectedDiffBase();
    let diff = "";
    try {
      diff = gitDiff(`${ref}...HEAD`);
    } catch {
      // Uncommitted / shallow edge: scan against the verified base tip.
      diff = gitDiff(`${ref}`);
    }
    const dirty = gitDiff("");
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

  it("fails closed when no base ref can be resolved (shallow-checkout regression)", () => {
    expect(() =>
      resolveProtectedDiffBase({
        env: {},
        revParse: () => {
          throw new Error("fatal: ambiguous argument");
        },
      })
    ).toThrow(/Protected-diff base could not be resolved/);
  });

  it("prefers MIANX_DIFF_BASE over a missing origin/main", () => {
    const resolved = resolveProtectedDiffBase({
      env: { MIANX_DIFF_BASE: "deadbeefcafebabe" },
      revParse: (ref) => {
        if (ref === "deadbeefcafebabe") return "deadbeefcafebabe";
        throw new Error(`unknown ${ref}`);
      },
    });
    expect(resolved).toEqual({
      ref: "deadbeefcafebabe",
      sha: "deadbeefcafebabe",
    });
  });

  it("CI workflow fetches the PR base SHA before tests run", () => {
    const workflow = readFileSync(
      resolve(process.cwd(), ".github/workflows/ci.yml"),
      "utf8"
    );
    expect(workflow).toMatch(/MIANX_DIFF_BASE/);
    expect(workflow).toMatch(/pull_request\.base\.sha|github\.event\.pull_request\.base\.sha/);
    expect(existsSync(resolve(process.cwd(), "lib/security-diff.scan.test.js"))).toBe(
      true
    );
  });
});
