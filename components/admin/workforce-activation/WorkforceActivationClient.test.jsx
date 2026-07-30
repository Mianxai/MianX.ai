/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import WorkforceActivationClient from "./WorkforceActivationClient";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn(), replace: vi.fn() }),
  usePathname: () => "/admin/workforce-activation",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/lib/supabase", () => ({
  getSupabase: () => ({ auth: { signOut: vi.fn() } }),
}));

vi.mock("@/components/admin/AdminShell", () => ({
  default: ({ title, children, breadcrumbs }) => (
    <div data-testid="admin-shell">
      <aside aria-label="Admin navigation" data-testid="admin-sidebar">
        <nav>
          <a href="/admin/workforce-activation" aria-current="page">
            Workforce
          </a>
          <a href="/admin/workforce-readiness">Readiness detail</a>
        </nav>
      </aside>
      <main id="main-content">
        <h1 data-testid="shell-title">{title}</h1>
        {breadcrumbs ? (
          <nav aria-label="Breadcrumb" data-testid="shell-breadcrumbs">
            {breadcrumbs.map((b) => b.label).join(" / ")}
          </nav>
        ) : null}
        {children}
      </main>
    </div>
  ),
}));

vi.mock("@/components/admin/PageHeader", () => ({
  default: ({ title, description }) => (
    <header data-testid="page-header">
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  ),
}));

vi.mock("@/components/admin/StatusBadge", () => ({
  default: ({ children, tone }) => (
    <span data-testid="status-badge" data-tone={tone}>
      {children}
    </span>
  ),
}));

const postBootstrapSnap = {
  capacity: {
    compiledSeats: 445,
    persistedSeats: 445,
    readyToAllocate: 445,
    allocated: 0,
  },
  liveTested: 0,
  providerFreeMessage: "Workforce foundation ready.",
  verify: {
    activeInstances: 0,
    foundationReady: true,
    databaseReady: true,
    databaseDurable: true,
    queueDurable: true,
    leasesDurable: true,
    rateLimitDurable: true,
    providerReady: false,
  },
  foundationReady: true,
};

const postBootstrapPreflight = {
  preflight: {
    checks: {
      durableDatabase: true,
      openRouterKeyPresent: false,
      freeOnlyMode: true,
      queue: true,
      leases: true,
      durableRateLimiter: { durableReady: true },
    },
  },
  verifySummary: {
    activeInstances: 0,
    foundationReady: true,
    databaseReady: true,
    databaseDurable: true,
    queueDurable: true,
    leaseDurable: true,
    rateLimitDurable: true,
    persistedSeats: 445,
    readyToAllocateSeats: 445,
    providerReady: false,
    archetypeCount: 148,
  },
};

describe("WorkforceActivationClient foundation closeout", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url, init) => {
        if (String(url).includes("/api/admin/workforce/bootstrap")) {
          const body = init?.body ? JSON.parse(init.body) : {};
          if (body.mode === "preflight") {
            return {
              ok: true,
              json: async () => ({
                ok: true,
                mode: "preflight",
                compiledSeats: 445,
                mappedSeats: 445,
                orphanSeats: 0,
                duplicateSeats: 0,
                persistedSeats: 445,
                readyToAllocateSeats: 445,
                schemaReady: true,
                bootstrapRequired: false,
                departmentCount: 20,
                archetypeCount: 148,
                workflowFamilyCount: 13,
                providerConfigured: false,
                liveExecutionReady: false,
              }),
            };
          }
          if (body.mode === "idempotency") {
            return {
              ok: true,
              json: async () => ({
                ok: true,
                mode: "idempotency",
                created: 0,
                duplicates: 0,
                orphanSeats: 0,
                persistedSeats: 445,
                readyToAllocateSeats: 445,
                allocatedSeats: 0,
                activeInstances: 0,
                liveTestedSeats: 0,
                providerConfigured: false,
                idempotent: true,
              }),
            };
          }
          return {
            ok: true,
            json: async () => ({
              ok: true,
              created: 0,
              persistedSeats: 445,
              readyToAllocateSeats: 445,
              liveTestedSeats: 0,
              providerConfigured: false,
            }),
          };
        }
        if (String(url).includes("preflight")) {
          return { ok: true, json: async () => postBootstrapPreflight };
        }
        return { ok: true, json: async () => postBootstrapSnap };
      })
    );
  });

  it("renders inside canonical AdminShell with sidebar", async () => {
    render(<WorkforceActivationClient />);
    await waitFor(() => expect(screen.getByTestId("admin-shell")).toBeInTheDocument());
    expect(screen.getByTestId("admin-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("workforce-activation")).toBeInTheDocument();
    expect(screen.getAllByTestId("admin-shell")).toHaveLength(1);
    expect(screen.getAllByTestId("admin-sidebar")).toHaveLength(1);
    expect(screen.getByRole("link", { name: "Workforce" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("shows post-bootstrap metric truth without raw JSON primary UI", async () => {
    render(<WorkforceActivationClient />);
    await waitFor(() => expect(screen.getByTestId("wa-persisted")).toHaveTextContent("445"));
    expect(screen.getByTestId("wa-ready")).toHaveTextContent("445");
    expect(screen.getByTestId("wa-allocated")).toHaveTextContent("0");
    expect(screen.getByTestId("wa-active")).toHaveTextContent("0");
    expect(screen.getByTestId("wa-live-tested")).toHaveTextContent("0");
    expect(screen.getByTestId("wa-db-durable")).toHaveTextContent(/Durable/i);
    expect(screen.getByTestId("wa-queue-durable")).toHaveTextContent(/Durable/i);
    expect(screen.getByTestId("wa-lease-durable")).toHaveTextContent(/Durable/i);
    expect(screen.getByTestId("wa-rate-durable")).toHaveTextContent(/Durable/i);
    expect(screen.getByTestId("wa-provider")).toHaveTextContent(/AI provider unconfigured/i);
    expect(screen.getByTestId("wa-live-exec")).toHaveTextContent(/Unavailable until provider/i);
    expect(screen.getByTestId("wa-truth-cards").className).toMatch(/workforce-status-grid/);
    const details = screen.getByTestId("wa-technical-details");
    expect(details.tagName).toBe("DETAILS");
    expect(details.open).toBe(false);
  });

  it("uses semantic ol numbering without duplicated prefixes", async () => {
    render(<WorkforceActivationClient />);
    await waitFor(() => expect(screen.getByTestId("wa-checklist")).toBeInTheDocument());
    const list = screen.getByTestId("wa-checklist");
    expect(list.tagName).toBe("OL");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(15);
    const text = list.textContent;
    expect(text).not.toMatch(/1\.\s*1\./);
    expect(text).not.toMatch(/10\.\s*10\./);
    expect(screen.getByTestId("wa-item-knowledge").textContent).not.toMatch(/^0/);
    expect(screen.getByTestId("wa-item-knowledge")).toHaveTextContent(/Knowledge/);
    expect(screen.getByTestId("wa-item-acceptance")).toHaveTextContent(/Blocked/);
    // Explicit numeric prefix must not appear inside list item text
    for (const item of items) {
      expect(item.textContent).not.toMatch(/^\d+\.\s*\d+\./);
      expect(item.textContent.trim()).not.toMatch(/^\d+\.\s/);
    }
  });

  it("shows Bootstrap complete and enables idempotency after 445 seats", async () => {
    render(<WorkforceActivationClient />);
    await waitFor(() => expect(screen.getByTestId("wa-open-bootstrap")).toBeDisabled());
    expect(screen.getByTestId("wa-open-bootstrap")).toHaveTextContent(/Bootstrap complete/i);
    expect(screen.getByTestId("wa-run-preflight")).not.toBeDisabled();
    expect(screen.getByTestId("wa-run-idempotency")).not.toBeDisabled();
    expect(screen.getByTestId("wa-next-action-hint")).toHaveTextContent(/Idempotency/i);
  });

  it("runs idempotency verification and labels the panel correctly", async () => {
    render(<WorkforceActivationClient />);
    await waitFor(() => expect(screen.getByTestId("wa-run-idempotency")).not.toBeDisabled());
    fireEvent.click(screen.getByTestId("wa-run-idempotency"));
    await waitFor(() =>
      expect(screen.getByTestId("wa-idempotency-panel")).toHaveTextContent(/Idempotency verification/)
    );
    expect(screen.getByTestId("wa-idempotency-panel")).toHaveTextContent(/Created 0/);
    expect(screen.getByTestId("wa-idempotency-panel")).toHaveTextContent(/Persisted 445/);
    const calls = vi.mocked(fetch).mock.calls.filter((c) =>
      String(c[0]).includes("/api/admin/workforce/bootstrap")
    );
    expect(calls.some((c) => JSON.parse(c[1].body).mode === "idempotency")).toBe(true);
  });

  it("keeps result cards compact without fixed min-height", async () => {
    render(<WorkforceActivationClient />);
    await waitFor(() => expect(screen.getByTestId("wa-run-preflight")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("wa-run-preflight"));
    await waitFor(() => expect(screen.getByTestId("wa-preflight-panel")).toBeInTheDocument());
    const card = screen.getByTestId("wa-preflight-panel");
    expect(getComputedStyle(card).minHeight === "" || getComputedStyle(card).minHeight === "0px" || getComputedStyle(card).minHeight === "auto").toBe(true);
  });
});
