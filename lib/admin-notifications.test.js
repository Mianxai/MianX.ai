import { describe, it, expect, beforeEach } from "vitest";
import {
  formatNewSubmissionsBadge,
  newSubmissionsAriaLabel,
  resetCachedNewSubmissions,
  setCachedNewSubmissions,
  getCachedNewSubmissions,
} from "./admin-notifications";

describe("admin-notifications helpers", () => {
  beforeEach(() => {
    resetCachedNewSubmissions();
  });

  it("hides the badge at 0 and formats 99+", () => {
    expect(formatNewSubmissionsBadge(0)).toBeNull();
    expect(formatNewSubmissionsBadge(-1)).toBeNull();
    expect(formatNewSubmissionsBadge(6)).toBe("6");
    expect(formatNewSubmissionsBadge(99)).toBe("99");
    expect(formatNewSubmissionsBadge(100)).toBe("99+");
    expect(formatNewSubmissionsBadge(250)).toBe("99+");
  });

  it("builds an accessible label with the count", () => {
    expect(newSubmissionsAriaLabel(1)).toBe("1 new submission");
    expect(newSubmissionsAriaLabel(6)).toBe("6 new submissions");
  });

  it("caches the last successful count", () => {
    expect(getCachedNewSubmissions()).toBeNull();
    setCachedNewSubmissions(4);
    expect(getCachedNewSubmissions()).toBe(4);
  });
});
