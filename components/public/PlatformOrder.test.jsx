// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PlatformOrder from "./PlatformOrder";
import { LOCKED_SEQUENCE } from "@/lib/content";

describe("PlatformOrder (locked platform section)", () => {
  it("renders every step of the locked sequence, in the exact locked order", () => {
    render(<PlatformOrder />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual(LOCKED_SEQUENCE.map((s) => s.title));
  });

  it("matches the exact required locked order text", () => {
    render(<PlatformOrder />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual([
      "Mianx Core",
      "AI Runtime",
      "Project Factory",
      "Founder Workspace",
      "Core Runtime Agents",
      "End-to-End Beta",
      "Industry Products",
    ]);
  });

  it("never claims Telepizza/Poultry as currently live", () => {
    render(<PlatformOrder />);
    expect(screen.queryByText(/live now/i)).not.toBeInTheDocument();
  });
});
