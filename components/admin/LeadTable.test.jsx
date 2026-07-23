// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import LeadTable from "./LeadTable";

describe("LeadTable", () => {
  it("shows an empty state message when there are no leads", () => {
    render(<LeadTable leads={[]} onSelect={vi.fn()} emptyMessage="Nothing here yet." />);
    expect(screen.getByText("Nothing here yet.")).toBeInTheDocument();
  });

  it("renders a malicious lead name as literal text, never as executable HTML", () => {
    render(
      <LeadTable
        leads={[{ id: "1", name: "<img src=x onerror=alert(1)>", email: "a@b.com", status: "new", created_at: "2026-01-01" }]}
        onSelect={vi.fn()}
        emptyMessage=""
      />
    );
    expect(screen.getByText("<img src=x onerror=alert(1)>")).toBeInTheDocument();
    expect(document.querySelector("img")).toBeNull();
  });

  it("calls onSelect with the clicked lead", async () => {
    const onSelect = vi.fn();
    const lead = { id: "1", name: "Jane", email: "jane@example.com", status: "new", created_at: "2026-01-01" };
    render(<LeadTable leads={[lead]} onSelect={onSelect} emptyMessage="" />);
    screen.getByText("Jane").closest("button").click();
    expect(onSelect).toHaveBeenCalledWith(lead);
  });
});
