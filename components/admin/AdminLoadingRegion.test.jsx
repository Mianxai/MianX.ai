// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/admin",
}));

vi.mock("@/lib/supabase", () => ({
  getSupabase: () => null,
}));

import AdminShell from "./AdminShell";
import AdminLoadingRegion from "./AdminLoadingRegion";
import MianxLoader from "@/components/shared/MianxLoader";

describe("AdminLoadingRegion geometry contract", () => {
  it("places the loader inside admin-body, not covering the page heading", () => {
    const { container } = render(
      <AdminShell title="Overview">
        <AdminLoadingRegion>
          <MianxLoader variant="section" label="Loading overview…" />
        </AdminLoadingRegion>
      </AdminShell>
    );

    const header = container.querySelector(".admin-header");
    const body = container.querySelector(".admin-body");
    const region = container.querySelector("[data-testid='admin-loading-region']");
    const loader = container.querySelector(".mx-loader");

    expect(header).not.toBeNull();
    expect(body).not.toBeNull();
    expect(region).not.toBeNull();
    expect(loader).not.toBeNull();

    expect(header.contains(loader)).toBe(false);
    expect(body.contains(region)).toBe(true);
    expect(region.contains(loader)).toBe(true);
    expect(header.querySelector("h1")).toHaveTextContent("Overview");
  });

  it("does not place the loader over the sidebar", () => {
    const { container } = render(
      <AdminShell title="Overview">
        <AdminLoadingRegion>
          <MianxLoader variant="section" label="Loading overview…" />
        </AdminLoadingRegion>
      </AdminShell>
    );
    const sidebar = container.querySelector(".admin-sidebar");
    const loader = container.querySelector(".mx-loader");
    expect(sidebar.contains(loader)).toBe(false);
  });
});
