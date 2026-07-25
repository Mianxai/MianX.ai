import { describe, it, expect } from "vitest";
import {
  normalizeSlug,
  slugFromName,
  looksLikeUrl,
  extractSlugFromUrl,
  evaluateSlugInput,
} from "./slug";

describe("normalizeSlug", () => {
  it("suggests mianx-core from a plain project name", () => {
    expect(slugFromName("Mianx Core")).toBe("mianx-core");
  });

  it("strips dots (unsupported) when deriving from a dotted name", () => {
    expect(slugFromName("Mianx.ai Core")).toBe("mianxai-core");
  });

  it("lowercases and converts spaces to hyphens", () => {
    expect(normalizeSlug("My New Project")).toBe("my-new-project");
  });

  it("converts underscores to hyphens", () => {
    expect(normalizeSlug("core_platform_v2")).toBe("core-platform-v2");
  });

  it("collapses repeated hyphens", () => {
    expect(normalizeSlug("core---platform")).toBe("core-platform");
  });

  it("strips unsupported characters", () => {
    expect(normalizeSlug("Café / Ops!! #1")).toBe("caf-ops-1");
  });

  it("trims leading and trailing hyphens", () => {
    expect(normalizeSlug("--core--")).toBe("core");
  });

  it("returns empty string for non-strings", () => {
    expect(normalizeSlug(null)).toBe("");
    expect(normalizeSlug(undefined)).toBe("");
  });
});

describe("looksLikeUrl", () => {
  it("detects full URLs", () => {
    expect(looksLikeUrl("https://mian-x-ai.vercel.app")).toBe(true);
  });
  it("detects bare domains", () => {
    expect(looksLikeUrl("mian-x-ai.vercel.app")).toBe(true);
  });
  it("detects paths", () => {
    expect(looksLikeUrl("foo/bar")).toBe(true);
  });
  it("does not flag a plain slug", () => {
    expect(looksLikeUrl("mianx-core")).toBe(false);
  });
});

describe("extractSlugFromUrl", () => {
  it("returns null for a bare domain (ambiguous)", () => {
    expect(extractSlugFromUrl("mian-x-ai.vercel.app")).toBeNull();
  });
  it("extracts the final path segment when unambiguous", () => {
    expect(extractSlugFromUrl("https://example.com/projects/mianx-core")).toBe(
      "mianx-core"
    );
  });
});

describe("evaluateSlugInput", () => {
  it("accepts a valid slug", () => {
    expect(evaluateSlugInput("mianx-core")).toEqual({ ok: true, slug: "mianx-core" });
  });

  it("normalizes and accepts messy but non-URL input", () => {
    expect(evaluateSlugInput("Mianx Core")).toEqual({ ok: true, slug: "mianx-core" });
  });

  it("rejects a bare production domain rather than coining an identifier", () => {
    const result = evaluateSlugInput("mian-x-ai.vercel.app");
    expect(result.ok).toBe(false);
    expect(result.reason).toBe("url_bare");
  });

  it("suggests a safe segment when a URL with a path is pasted", () => {
    const result = evaluateSlugInput("https://example.com/projects/mianx-core");
    expect(result.ok).toBe(false);
    expect(result.reason).toBe("url_with_path");
    expect(result.suggestion).toBe("mianx-core");
  });

  it("reports empty input", () => {
    expect(evaluateSlugInput("").reason).toBe("empty");
  });
});
