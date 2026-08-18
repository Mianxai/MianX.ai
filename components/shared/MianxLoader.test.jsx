// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { StrictMode } from "react";
import { render, screen } from "@testing-library/react";
import MianxLoader, { MIANX_LOADER_NODE_COUNT } from "./MianxLoader";

describe("MianxLoader", () => {
  it("renders the approved MX logo asset for non-inline variants", () => {
    const { container } = render(<MianxLoader variant="page" />);
    const img = container.querySelector("img.mx-loader-logo");
    expect(img).not.toBeNull();
    expect(img.getAttribute("src")).toBe("/mianx-logo.png");
  });

  it("exposes a single accessible status with the label text", () => {
    render(<MianxLoader variant="section" label="Loading agents…" />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("Loading agents…");
    // Exactly one text source → no duplicate announcement.
    expect(screen.getAllByText("Loading agents…")).toHaveLength(1);
  });

  it("supports page, section, inline and overlay variants", () => {
    const { container: page } = render(<MianxLoader variant="page" />);
    expect(page.querySelector(".mx-loader-page")).not.toBeNull();

    const { container: section } = render(<MianxLoader variant="section" />);
    expect(section.querySelector(".mx-loader-section")).not.toBeNull();

    const { container: inline } = render(<MianxLoader variant="inline" />);
    expect(inline.querySelector(".mx-loader-inline")).not.toBeNull();
    // Inline is ring-only: no logo.
    expect(inline.querySelector("img.mx-loader-logo")).toBeNull();

    const { container: overlay } = render(<MianxLoader variant="overlay" />);
    expect(overlay.querySelector(".mx-loader-overlay-wrap")).not.toBeNull();
  });

  it("falls back to the section variant for an unknown variant", () => {
    const { container } = render(<MianxLoader variant="bogus" />);
    expect(container.querySelector(".mx-loader-section")).not.toBeNull();
  });

  it("renders a custom label", () => {
    render(<MianxLoader variant="page" label="Creating project…" />);
    expect(screen.getByText("Creating project…")).toBeInTheDocument();
  });

  it("renders exactly the configured node count", () => {
    const { container } = render(<MianxLoader />);
    expect(container.querySelectorAll(".mx-loader-node")).toHaveLength(
      MIANX_LOADER_NODE_COUNT
    );
    expect(MIANX_LOADER_NODE_COUNT).toBeGreaterThanOrEqual(10);
    expect(MIANX_LOADER_NODE_COUNT).toBeLessThanOrEqual(12);
  });

  it("does not steal focus", () => {
    const before = document.activeElement;
    render(<MianxLoader variant="page" />);
    expect(document.activeElement).toBe(before);
  });

  it("is stable under React Strict Mode (no throw, single status)", () => {
    render(
      <StrictMode>
        <MianxLoader variant="section" label="Loading…" />
      </StrictMode>
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("hides decorative visuals from assistive tech", () => {
    const { container } = render(<MianxLoader variant="page" />);
    expect(container.querySelector(".mx-loader-stage")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });
});
