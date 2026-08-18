// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LeadForm from "./LeadForm";

async function fillRequiredFields(user) {
  await user.type(screen.getByLabelText(/full name/i), "Jane Doe");
  await user.type(screen.getByLabelText(/email address/i), "jane@example.com");
  await user.selectOptions(screen.getByLabelText(/industry/i), "restaurant");
  await user.type(screen.getByLabelText(/tell us about your needs/i), "We need help.");
}

describe("LeadForm", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows client-side validation errors and does not call the API when required fields are empty", async () => {
    const user = userEvent.setup();
    render(<LeadForm />);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please select an industry/i)).toBeInTheDocument();
    expect(screen.getByText(/please tell us what you need/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("submits successfully and shows a success message", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "1" }),
    });
    const user = userEvent.setup();
    render(<LeadForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/your message has been received/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/leads",
      expect.objectContaining({ method: "POST" })
    );
    // Never promises a specific response time.
    expect(screen.queryByText(/within 24 hours/i)).not.toBeInTheDocument();
  });

  it("shows an error message and does not claim success when the API call fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: "db down" }),
    });
    const user = userEvent.setup();
    render(<LeadForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText("db down")).toBeInTheDocument();
    expect(screen.queryByText(/your message has been received/i)).not.toBeInTheDocument();
  });

  it("shows the controlled configuration-error message when Supabase is not configured (503)", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 503,
      json: async () => ({ error: "Configuration error: Supabase environment variables are not set." }),
    });
    const user = userEvent.setup();
    render(<LeadForm />);
    await fillRequiredFields(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/configuration error/i)).toBeInTheDocument();
  });

  it("disables the submit button while a submission is in flight (duplicate-submit protection)", async () => {
    let resolveFetch;
    global.fetch.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveFetch = resolve;
      })
    );
    const user = userEvent.setup();
    render(<LeadForm />);
    await fillRequiredFields(user);
    const button = screen.getByRole("button", { name: /send message/i });
    await user.click(button);

    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    resolveFetch({ ok: true, json: async () => ({ id: "1" }) });
    await waitFor(() => expect(screen.getByRole("button")).not.toBeDisabled());
  });
});
