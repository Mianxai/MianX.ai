// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectsPage from "./page";

const push = vi.fn();
const refresh = vi.fn();
const replace = vi.fn();
const routerStub = { push, refresh, replace };

vi.mock("next/navigation", () => ({
  useRouter: () => routerStub,
  usePathname: () => "/admin/projects",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("@/lib/supabase", () => ({
  getSupabase: () => null,
}));

async function openModal(user) {
  // Initial project list load returns empty.
  await screen.findByRole("heading", { name: /no projects yet/i });
  // Two "New Project" buttons exist (header + empty state); use the header one.
  await user.click(screen.getAllByRole("button", { name: /^New Project$/i })[0]);
  return screen.getByRole("dialog");
}

describe("Projects page — New Project form", () => {
  beforeEach(() => {
    global.fetch = vi.fn(async (url, opts) => {
      if (url === "/api/core/projects" && (!opts || opts.method !== "POST")) {
        return { ok: true, status: 200, json: async () => ({ projects: [] }) };
      }
      return { ok: false, status: 500, json: async () => ({}) };
    });
    push.mockClear();
  });
  afterEach(() => vi.restoreAllMocks());

  it("auto-suggests a slug from the project name", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);
    const dialog = await openModal(user);
    await user.type(within(dialog).getByLabelText(/^Name/i), "Mianx Core");
    expect(within(dialog).getByLabelText(/Project slug/i)).toHaveValue("mianx-core");
  });

  it("preserves a manually edited slug (stops auto-suggesting)", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);
    const dialog = await openModal(user);
    const slug = within(dialog).getByLabelText(/Project slug/i);
    await user.type(slug, "custom-slug");
    await user.type(within(dialog).getByLabelText(/^Name/i), "Totally Different");
    expect(slug).toHaveValue("custom-slug");
  });

  it("normalizes spaces and case in the slug on blur", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);
    const dialog = await openModal(user);
    const slug = within(dialog).getByLabelText(/Project slug/i);
    await user.type(slug, "My Ops Space");
    await user.tab();
    expect(slug).toHaveValue("my-ops-space");
  });

  it("refuses a pasted production URL rather than coining an identifier", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);
    const dialog = await openModal(user);
    await user.type(within(dialog).getByLabelText(/^Name/i), "Core");
    const slug = within(dialog).getByLabelText(/Project slug/i);
    await user.clear(slug);
    await user.type(slug, "mian-x-ai.vercel.app");
    await user.tab();
    expect(within(dialog).getByRole("alert")).toHaveTextContent(/URL or domain/i);
    expect(slug).toHaveAttribute("aria-invalid", "true");
  });

  it("submits a normalized slug and prevents double submit", async () => {
    let postCount = 0;
    global.fetch = vi.fn(async (url, opts) => {
      if (url === "/api/core/projects" && opts?.method === "POST") {
        postCount += 1;
        await new Promise((r) => setTimeout(r, 20));
        return {
          ok: true,
          status: 201,
          json: async () => ({ project: { id: "p1", name: "Core", slug: "mianx-core" } }),
        };
      }
      return { ok: true, status: 200, json: async () => ({ projects: [] }) };
    });

    const user = userEvent.setup();
    render(<ProjectsPage />);
    const dialog = await openModal(user);
    await user.type(within(dialog).getByLabelText(/^Name/i), "Core");
    const slug = within(dialog).getByLabelText(/Project slug/i);
    await user.clear(slug);
    await user.type(slug, "mianx-core");

    const createBtn = within(dialog).getByRole("button", { name: /Create|Creating/i });
    await user.click(createBtn);
    await user.click(createBtn); // second click should be ignored

    await waitFor(() => expect(postCount).toBe(1));
    const body = JSON.parse(global.fetch.mock.calls.find((c) => c[1]?.method === "POST")[1].body);
    expect(body.slug).toBe("mianx-core");
  });

  it("restores a usable form when the request fails", async () => {
    global.fetch = vi.fn(async (url, opts) => {
      if (url === "/api/core/projects" && opts?.method === "POST") {
        return {
          ok: false,
          status: 409,
          json: async () => ({ error: { message: "A project with this slug already exists." } }),
        };
      }
      return { ok: true, status: 200, json: async () => ({ projects: [] }) };
    });

    const user = userEvent.setup();
    render(<ProjectsPage />);
    const dialog = await openModal(user);
    await user.type(within(dialog).getByLabelText(/^Name/i), "Core");
    await user.click(within(dialog).getByRole("button", { name: /Create/i }));

    expect(await within(dialog).findByText(/already exists/i)).toBeInTheDocument();
    // Values preserved, form still usable.
    expect(within(dialog).getByLabelText(/^Name/i)).toHaveValue("Core");
    expect(within(dialog).getByRole("button", { name: /Create/i })).toBeEnabled();
  });
});
