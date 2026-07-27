# Mianx.ai

Next.js 15 (App Router, JavaScript) app. Public landing page captures inbound
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
- The login flow stores the Supabase access token in an HttpOnly
  `sb-access-token` cookie via `POST /api/admin/session`; `middleware.js`
  rejects missing/expired cookie shapes and API routes validate the session
  with Supabase Auth plus UUID membership checks.
- Local anon/service_role keys printed by `supabase status` are shared
  insecure defaults — fine for local dev only, never production.

### AI Workforce canonical registry (organizational)

Source-controlled org registry (not runtime activation): `lib/workforce/`.
Defines 20 departments and **445 planned role slots**. This is capacity
planning — not 445 always-on processes. Executable agents remain in
`lib/core/agents.js`. Validate with `npx vitest run lib/workforce`.

Wave-1 executive control plane (active runtime): `lib/core/executive/` —
Executive Orchestrator + C-Suite advisors, `executive-readiness` workflow,
delegation safety. Founder approval is action/capability-based (protected
actions only) — advisory/read-only executive work completes without approval.

Wave-2 software delivery pod (active runtime): `lib/core/delivery/` —
Product → Architecture → Engineering → Review → independent QA
(`software-delivery` workflow). Structured planning artifacts only — no
autonomous repository writes or production deploys. Founder approval only
when a protected action is proposed.

Wave-3 platform + controlled coding (active runtime): `lib/core/platform/` +
`lib/core/coding/` — workspace-scoped coding executor, security/DevOps/infra/
data-AI readiness (`platform-candidate`, `controlled-delivery`). Never pushes,
merges, or deploys autonomously.

### Mianx Core runtime loop (local)

1. Apply migrations (`supabase db reset` or `supabase migration up`).
2. Insert Founder `admin_memberships` row for your Auth user UUID (not by email).
3. Start the app (`npm run dev` or production `npm run build && npm start`).
4. Enqueue work from Admin → Runtime / Queue (or workflows/tasks APIs).
5. Process the queue without claiming automatic cron:
   - Admin Queue UI → **Run tick** (`POST /api/admin/runtime/tick`, requires
     `manage_jobs`), or
   - `INTERNAL_RUNTIME_SECRET=<≥16 chars> npm run runtime:tick`
6. Provider calls use the hardened `lib/core/provider.js` path. Without
   `ANTHROPIC_API_KEY`, jobs fail with a controlled provider status; tests use
   the fake/deterministic provider.

### External scheduler adapter (not auto-configured)

Durability requires an external scheduler. This repo does **not** invent
background durability on Vercel serverless alone.

Recommended Founder setup (do not configure secrets from CI/agents):

1. Set `INTERNAL_RUNTIME_SECRET` or `CRON_SECRET` (≥16 chars) in the host.
2. Point a scheduler (Vercel Cron or equivalent) at
   `GET|POST /api/internal/runtime/tick` with
   `Authorization: Bearer <secret>` (and optional `x-request-id`).
3. Interval: **1 minute** is a practical starting point; each tick is
   bounded (`JOB_LIMITS.maxJobsPerTick` / `maxTickMs`) and uses job leases
   so overlapping ticks cannot double-run the same job.
4. Failure behaviour: transient provider errors requeue with backoff;
   exhausted attempts go to `dead_letter`. Tick HTTP failures should be
   retried by the scheduler.

#### Vercel Cron readiness (Founder configures — do not enable from agents)

When the deployment is on Vercel Pro (or another host that allows sub-daily
schedules), the Founder may add a cron that hits the internal tick endpoint.
This repository does **not** ship a production `vercel.json` cron and agents
must **not** configure production cron or secrets.

Example shape (illustrative only — Founder applies on the host):

```json
{
  "crons": [
    {
      "path": "/api/internal/runtime/tick",
      "schedule": "* * * * *"
    }
  ]
}
```

Authorize with `Authorization: Bearer <CRON_SECRET or INTERNAL_RUNTIME_SECRET>`.
Hobby plans reject sub-daily schedules; until a Pro/external scheduler is
configured, `runtimeConfigStatus().scheduler.automaticProcessing` stays
`false` and queue processing remains manual (`Run tick` / `npm run runtime:tick`).

#### Durable rate-limit adapter (optional)

Admin/API rate limiting defaults to **in-memory per process**
(`lib/core/ratelimit.js`) — honest for single-instance/dev. For multi-instance
production, the Founder may set both:

- `RATE_LIMIT_DURABLE_URL` — Upstash Redis REST URL
- `RATE_LIMIT_DURABLE_TOKEN` — Upstash REST token

`lib/core/ratelimit-upstash.js` builds an optional fetch-based adapter (no extra
npm dependency). If either env var is missing, the adapter is `null` and the
in-memory fallback remains. `rateLimitBackendStatus()` reports `durable: true`
only when an adapter is active — URL alone is never treated as durable.
Not required to pass development gates.

Pending hosted migrations must be applied by the Founder after
`npx supabase db push --dry-run` review — never auto-applied from CI.

## Founder production release checklist (manual — agents must not perform)

Repository closeout can ship code only. Remaining Founder-only actions:

1. **Migrations (pending on hosted):** review then apply
   `20260725150000_runtime_jobs.sql`,
   `20260726120000_admin_membership_viewer_role.sql`,
   `20260727120000_admin_memberships_service_role_grant.sql`
   via `npx supabase db push` after dry-run review.
2. **Scheduler secret:** set `INTERNAL_RUNTIME_SECRET` or `CRON_SECRET` (≥16 chars).
3. **Scheduler config:** Vercel Cron (or equivalent) →
   `GET|POST /api/internal/runtime/tick` with Bearer secret (see above).
4. **Optional Anthropic:** `ANTHROPIC_API_KEY` for live analysis; without it,
   `/api/analyze` returns 503 `ANTHROPIC_NOT_CONFIGURED`.
5. **Site URL:** `NEXT_PUBLIC_SITE_URL` for absolute links/OG when needed.
6. **Optional durable rate limit:** `RATE_LIMIT_DURABLE_URL` +
   `RATE_LIMIT_DURABLE_TOKEN` (Upstash REST). Until set, limiter is in-memory.
7. **Custom domain / legal content / CSP nonce phase:** only if Founder wants
   those production hardening steps.
8. **Production deploy + merge to main:** explicit Founder approval only.

Do **not** treat capacity_reserve slots as live agents. Maximum capacity is 445
planning slots; activation is pod-scoped via the Workforce Planner.

### Founder authenticated E2E checklist (production — disposable project only)

Do **not** use real customer data. Create a clearly labelled disposable test
project (e.g. `RC-E2E-DISPOSABLE`) then:

1. Login at `/admin/login`
2. Open Admin Control Center overview
3. Select/create the disposable project
4. Confirm Agents list shows active definitions (no secrets)
5. Start a safe workflow objective (e.g. `executive-readiness` or
   `software-delivery` with a non-production objective)
6. Observe Task → Queue job → Run progression (manual tick if cron unset)
7. Exercise an approval path if the workflow requests one — deny or approve
   only for the disposable project
8. Confirm Audit entries for the workflow
9. Logout
10. Delete/archive the disposable project when finished

Agents must never request Founder credentials to automate this path.

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
