/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WorkforceActivationClient from "./WorkforceActivationClient";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/admin/FounderPageLayout", () => ({
  default: ({ title, happening, attention, primaryAction, progress, results }) => (
    <div data-testid="founder-layout">
      <h1>{title}</h1>
      <div data-testid="happening">{happening}</div>
      <div data-testid="attention">{attention}</div>
      <div data-testid="primary">{primaryAction}</div>
      <div data-testid="progress">{progress}</div>
      <div data-testid="results">{results}</div>
    </div>
  ),
}));

const snap = {
  capacity: {
    compiledSeats: 445,
    persistedSeats: 0,
    readyToAllocate: 0,
    allocated: 0,
  },
  liveTested: 0,
  providerFreeMessage: "Workforce foundation ready.",
  verify: {
    activeInstances: 0,
    foundationReady: false,
    databaseDurable: false,
    queueDurable: false,
    leaseDurable: false,
  },
};

const preflight = {
  preflight: {
    checks: {
      durableDatabase: true,
      openRouterKeyPresent: false,
      freeOnlyMode: true,
      queue: true,
      leases: true,
      durableRateLimiter: { durableReady: false },
    },
  },
  verifySummary: {
    activeInstances: 0,
    foundationReady: false,
  },
};

describe("WorkforceActivationClient Phase I.5 UI", () => {
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
                persistedSeats: 0,
                schemaReady: true,
                bootstrapRequired: true,
                departmentCount: 20,
                archetypeCount: 120,
                workflowFamilyCount: 13,
                providerConfigured: false,
              }),
            };
          }
          return {
            ok: true,
            json: async () => ({
              ok: true,
              created: 445,
              persistedSeats: 445,
              readyToAllocateSeats: 445,
              liveTestedSeats: 0,
              providerConfigured: false,
            }),
          };
        }
        if (String(url).includes("preflight")) {
          return { ok: true, json: async () => preflight };
        }
        return { ok: true, json: async () => snap };
      })
    );
  });

  it("shows capacity truth cards without raw JSON primary UI", async () => {
    render(<WorkforceActivationClient />);
    await waitFor(() => expect(screen.getByTestId("wa-capacity")).toHaveTextContent("445"));
    expect(screen.getByTestId("wa-persisted")).toHaveTextContent("0");
    expect(screen.getByTestId("wa-provider")).toHaveTextContent(/AI provider unconfigured/i);
    expect(screen.getByTestId("wa-technical-details").tagName).toBe("DETAILS");
    const json = screen.getByTestId("wa-json");
    expect(json.closest("details")).toBeTruthy();
  });

  it("numbers checklist steps 10–12 correctly", async () => {
    render(<WorkforceActivationClient />);
    await waitFor(() => expect(screen.getByTestId("wa-item-knowledge")).toBeInTheDocument());
    expect(screen.getByTestId("wa-item-knowledge")).toHaveTextContent(/^10\./);
    expect(screen.getByTestId("wa-item-memory")).toHaveTextContent(/^11\./);
    expect(screen.getByTestId("wa-item-qa")).toHaveTextContent(/^12\./);
  });

  it("keeps apply disabled until preflight + exact confirmation", async () => {
    render(<WorkforceActivationClient />);
    await waitFor(() => expect(screen.getByTestId("wa-run-preflight")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("wa-run-preflight"));
    await waitFor(() => expect(screen.getByTestId("wa-preflight-panel")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("wa-open-bootstrap"));
    await waitFor(() => expect(screen.getByTestId("wa-confirm-modal")).toBeInTheDocument());
    const apply = screen.getByTestId("wa-confirm-apply");
    expect(apply).toBeDisabled();
    fireEvent.change(screen.getByTestId("wa-confirm-input"), {
      target: { value: "BOOTSTRAP 445" },
    });
    await waitFor(() => expect(apply).not.toBeDisabled());
  });

  it("renders successful apply result state", async () => {
    render(<WorkforceActivationClient />);
    await waitFor(() => expect(screen.getByTestId("wa-run-preflight")).toBeInTheDocument());
    fireEvent.click(screen.getByTestId("wa-run-preflight"));
    await waitFor(() => expect(screen.getByTestId("wa-open-bootstrap")).not.toBeDisabled());
    fireEvent.click(screen.getByTestId("wa-open-bootstrap"));
    fireEvent.change(screen.getByTestId("wa-confirm-input"), {
      target: { value: "BOOTSTRAP 445" },
    });
    fireEvent.click(screen.getByTestId("wa-confirm-apply"));
    await waitFor(() => expect(screen.getByTestId("wa-apply-panel")).toHaveTextContent(/Success/));
    expect(screen.getByTestId("wa-apply-panel")).toHaveTextContent(/Persisted 445/);
  });
});
