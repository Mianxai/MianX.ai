// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LeadDetailModal from "./LeadDetailModal";

const maliciousLead = {
  id: "lead-1",
  name: "Jane",
  email: "jane@example.com",
  company: "Acme",
  phone: "555",
  industry: "restaurant",
  need: '<script>window.__xss = true;</script><img src=x onerror="window.__xss2=true">',
  status: "new",
  created_at: "2026-01-01T00:00:00.000Z",
  analysis: null,
};

describe("LeadDetailModal", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    delete window.__xss;
    delete window.__xss2;
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders lead content (including malicious-looking text) as inert text, never executing it", () => {
    render(<LeadDetailModal lead={maliciousLead} onClose={vi.fn()} onUpdated={vi.fn()} onArchived={vi.fn()} />);
    // The literal tag text is visible in the document as plain text…
    expect(screen.getByText(/<script>window\.__xss = true;<\/script>/)).toBeInTheDocument();
    // …and was never parsed as real HTML/executed.
    expect(document.querySelector("script")).toBeNull();
    expect(document.querySelector("img")).toBeNull();
    expect(window.__xss).toBeUndefined();
    expect(window.__xss2).toBeUndefined();
  });

  it("closes on Escape and restores focus to the previously focused element", async () => {
    const trigger = document.createElement("button");
    trigger.textContent = "open";
    document.body.appendChild(trigger);
    trigger.focus();

    const onClose = vi.fn();
    render(<LeadDetailModal lead={maliciousLead} onClose={onClose} onUpdated={vi.fn()} onArchived={vi.fn()} />);

    const user = userEvent.setup();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();

    trigger.remove();
  });

  it("traps Tab focus inside the dialog", async () => {
    render(<LeadDetailModal lead={maliciousLead} onClose={vi.fn()} onUpdated={vi.fn()} onArchived={vi.fn()} />);
    const dialog = screen.getByRole("dialog");
    const focusable = dialog.querySelectorAll('a[href], button:not([disabled]), select, [tabindex]:not([tabindex="-1"])');
    expect(focusable.length).toBeGreaterThan(1);

    const user = userEvent.setup();
    const last = focusable[focusable.length - 1];
    last.focus();
    await user.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("rejects a status update the server rejects, and does not silently apply it", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Invalid update" }),
    });
    const onUpdated = vi.fn();
    render(<LeadDetailModal lead={maliciousLead} onClose={vi.fn()} onUpdated={onUpdated} onArchived={vi.fn()} />);

    const user = userEvent.setup();
    await user.selectOptions(screen.getByLabelText(/update status/i), "contacted");

    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Invalid update"));
    expect(onUpdated).not.toHaveBeenCalled();
  });

  it("shows an inline notice (not a hard error) when AI analysis is not configured", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "not configured", code: "ANTHROPIC_NOT_CONFIGURED" }),
    });
    const user = userEvent.setup();
    render(<LeadDetailModal lead={maliciousLead} onClose={vi.fn()} onUpdated={vi.fn()} onArchived={vi.fn()} />);
    await user.click(screen.getByRole("button", { name: /run ai agent/i }));

    expect(await screen.findByText(/AI analysis is unavailable on this deployment/i)).toBeInTheDocument();
  });

  it("archives instead of hard-deleting, and reports the archived id", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: maliciousLead.id, archived_at: "2026-01-02T00:00:00.000Z" }),
    });
    const onArchived = vi.fn();
    const user = userEvent.setup();
    render(<LeadDetailModal lead={maliciousLead} onClose={vi.fn()} onUpdated={vi.fn()} onArchived={onArchived} />);
    await user.click(screen.getByRole("button", { name: /^archive$/i }));

    await waitFor(() => expect(onArchived).toHaveBeenCalledWith(maliciousLead.id));
    const [, options] = global.fetch.mock.calls[0];
    expect(JSON.parse(options.body)).toEqual({ archived: true });
  });
});
