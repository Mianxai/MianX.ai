# Mianx.ai

Next.js 14 (App Router, JavaScript) app. Public landing page captures inbound
leads into Supabase Postgres; a protected admin dashboard triages them; an
optional server-side Anthropic call scores leads and drafts replies.

Standard scripts live in `package.json`: `npm run dev`, `npm run build`,
`npm run lint`, `npm run test` (Vitest — env-guard and validation unit
tests), `npm start`.

## Locked product scope — read before making product decisions

Mianx.ai is an AI-native Business Operating System, AI Workforce platform,
and Project Factory. The locked build order is:

```text
Mianx Core → AI Runtime → Project Factory → Founder Workspace →
10–12 Core Runtime Agents → End-to-end Beta →
Telepizza and Poultry later, as "Powered by Mianx.ai" products.
```

- Do not make RestaurantOS, Telepizza, PoultryOS, or a generic
  "AI agent agency" the current product in code, copy, or docs.
- Do not expand or reorder this roadmap. Follow-on phases are proposed in
  `execution/EXECUTION-BOARD.md`, not invented ad hoc.
- Do not claim a documented/planned agent role is an active runtime agent.
  Active-agent claims require runtime evidence, not a role description.
- Full company/product context: `README.md` and `doc/` (see below).

## Cursor Cloud specific instructions

The dev environment uses a **local Supabase stack** (Docker) instead of a
hosted project, so no external secrets are needed to run/test lead capture,
auth, and the admin dashboard end to end. Docker and the Supabase CLI are
already installed in the VM image; `npm install` runs automatically on
startup.

Bring the environment up (services are NOT auto-started on boot):

1. Start the Docker daemon if it isn't running, then make the socket usable
   without sudo:
   `sudo nohup dockerd > /tmp/dockerd.log 2>&1 &` then `sudo chmod 666 /var/run/docker.sock`
   (Docker here may be configured for `fuse-overlayfs` with the
   containerd-snapshotter feature disabled in `/etc/docker/daemon.json` —
   if so, this is required in this VM; do not switch it back to overlay2.)
2. From the repo root: `supabase start` (first run pulls images). Get the
   local URL/keys anytime with `supabase status`.
3. Create `.env.local` (gitignored) with the local values:
   - `NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from supabase status>`
   - `SUPABASE_SERVICE_ROLE_KEY=<service_role key from supabase status>`
   - `ANTHROPIC_API_KEY=<optional, see below>`
4. Create the admin login (Supabase Auth has no users by default). Using
   the service_role key:
   `curl -X POST "$NEXT_PUBLIC_SUPABASE_URL/auth/v1/admin/users" -H "apikey: $SERVICE_ROLE" -H "Authorization: Bearer $SERVICE_ROLE" -H "Content-Type: application/json" -d '{"email":"admin@mianx.ai","password":"MianxAdmin2026!","email_confirm":true}'`
5. `npm run dev` → app on http://localhost:3000, admin at `/admin/login`.

Gotchas:
- **`supabase db reset` wipes auth users too**, not just table data. Recreate
  the admin user (step 4) after any reset.
- The `leads` migration includes `grant all on table leads to service_role`.
  This is required for the local stack (otherwise API routes get
  "permission denied for table leads"); it is a harmless no-op on hosted
  Supabase.
- `/api/analyze` calls Anthropic server-side and needs a real
  `ANTHROPIC_API_KEY` to return output; without one it returns HTTP 503 with
  `code: "ANTHROPIC_NOT_CONFIGURED"` and the admin UI shows an inline notice
  instead of erroring. Everything else (lead capture, login, list, status
  updates, `/admin` route protection) works without it.
- `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`/
  `SUPABASE_SERVICE_ROLE_KEY` are all optional for `npm run build` and for
  booting the app — Supabase-backed routes return a controlled 503
  configuration error instead of crashing when they are absent (see
  `lib/supabase.js`).
- The login flow stores the Supabase access token in a client-set
  `sb-access-token` cookie; `middleware.js` and the API routes read that
  cookie.
- Local anon/service_role keys printed by `supabase status` are shared
  insecure defaults — fine for local dev only, never production.

## Repository map

- `app/`, `components/`, `lib/`, `middleware.js` — the Next.js app.
- `design/approved/final-website/` — the Founder-approved final HTML designs
  (`mianx_website_public.html` for `/`, `mianx_admin_dashboard.html` for
  `/admin`). Visual reference only — not imported by the app, do not delete
  or restore any older/rejected design in its place (an earlier
  `mianx-ai-prototype.jsx` was superseded by these and removed).
- `doc/` — canonical long-form enterprise documentation (governance,
  architecture, product, engineering, etc.). Most of it is `status: Draft`,
  `canonical: false` planning material, not proof of a built system — read
  only what a task actually needs.
- `execution/EXECUTION-BOARD.md` — the live, compact source of truth for
  current phase, task status, and evidence. Update it as work completes;
  do not create parallel planning documents.
- `supabase/` — local Supabase config and SQL migrations.

## Working autonomously in this repo

- Continue all READY tasks inside the currently approved phase without
  stopping after every file to ask "what next?".
- Verify changes (lint/build/tests/manual checks) before marking a task
  VERIFIED in `execution/EXECUTION-BOARD.md`.
- Keep scope platform-first: Mianx Core / AI Runtime / Project Factory /
  Founder Workspace / Core Runtime Agents, not industry verticals.
- Never commit secrets or request real API keys in code or docs.
- Never deploy to production, change the production domain, or merge into
  `main` without explicit Founder approval.
