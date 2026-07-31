// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import FounderHomePage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/admin",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/components/admin/command-center/CommandCenterClient", () => ({
  default: function MockFounderHome({ title, basePath }) {
    return (
      <div data-testid="founder-home-client">
        <h1>{title}</h1>
        <span data-testid="founder-home-base">{basePath}</span>
      </div>
    );
  },
}));

describe("Founder Home page (/admin)", () => {
  it("mounts Founder Home CommandCenterClient at /admin", async () => {
    render(<FounderHomePage />);
    expect(await screen.findByTestId("founder-home-client")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^Founder Home$/i })).toBeInTheDocument();
    expect(screen.getByTestId("founder-home-base")).toHaveTextContent("/admin");
  });
});
