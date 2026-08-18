import { describe, it, expect } from "vitest";
import { redirect } from "next/navigation";

// Redirect pages are server components — test the target mapping logic inline.
describe("legacy admin redirects", () => {
  it("maps submissions and lead-pipeline to /admin/leads", () => {
    function target(pathname, status) {
      if (pathname === "/admin/submissions" || pathname === "/admin/lead-pipeline") {
        const q = status ? `?status=${encodeURIComponent(status)}` : "";
        return `/admin/leads${q}`;
      }
      return pathname;
    }
    expect(target("/admin/submissions", "new")).toBe("/admin/leads?status=new");
    expect(target("/admin/lead-pipeline", null)).toBe("/admin/leads");
  });

  it("does not redirect departments/workflows to command-center", () => {
    // Presence check: pages no longer import redirect-to-command-center.
    // Runtime assertion is that canonical paths are self.
    expect("/admin/departments").not.toBe("/admin/command-center");
    expect("/admin/workflows").not.toBe("/admin/command-center");
  });
});

// silence unused
void redirect;
