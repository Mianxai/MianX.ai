# Mianx.ai

Next.js 14 (App Router, JavaScript) app. Public landing page captures inbound
leads into Supabase Postgres; a protected admin dashboard triages them; a
server-side Anthropic call scores leads and drafts replies.

Standard scripts live in `package.json`: `npm run dev`, `npm run build`,
`npm run lint`, `npm start`.

## Cursor Cloud specific instructions

The dev environment uses a **local Supabase stack** (Docker) instead of a hosted
project, so no external secrets are needed to run/test lead capture, auth, and
the admin dashboard end to end. Docker and the Supabase CLI are already installed
in the VM image; `npm install` runs automatically on startup.

Bring the environment up (services are NOT auto-started on boot):

1. Start the Docker daemon if it isn't running, then make the socket usable
   without sudo:
   `sudo nohup dockerd > /tmp/dockerd.log 2>&1 &` then `sudo chmod 666 /var/run/docker.sock`
   (Docker 29 here is configured for `fuse-overlayfs` with the
   containerd-snapshotter feature disabled in `/etc/docker/daemon.json` — this is
   required in this VM; do not switch it back to overlay2.)
2. From the repo root: `supabase start` (first run pulls images). Get the local
   URL/keys anytime with `supabase status`.
3. Create `.env.local` (gitignored) with the local values:
   - `NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from supabase status>`
   - `SUPABASE_SERVICE_ROLE_KEY=<service_role key from supabase status>`
   - `ANTHROPIC_API_KEY=<optional, see below>`
4. Create the admin login (Supabase Auth has no users by default). Using the
   service_role key:
   `curl -X POST "$NEXT_PUBLIC_SUPABASE_URL/auth/v1/admin/users" -H "apikey: $SERVICE_ROLE" -H "Authorization: Bearer $SERVICE_ROLE" -H "Content-Type: application/json" -d '{"email":"admin@mianx.ai","password":"MianxAdmin2026!","email_confirm":true}'`
5. `npm run dev` → app on http://localhost:3000, admin at `/admin/login`.

Gotchas:
- **`supabase db reset` wipes auth users too**, not just table data. Recreate the
  admin user (step 4) after any reset.
- The `leads` migration includes `grant all on table leads to service_role`. This
  is required for the local stack (otherwise API routes get
  "permission denied for table leads"); it is a harmless no-op on hosted Supabase.
- `/api/analyze` calls Anthropic server-side and needs a real `ANTHROPIC_API_KEY`
  to return output; without one it returns HTTP 502. Everything else (lead
  capture, login, list, status updates, `/admin` route protection) works without it.
- The login flow stores the Supabase access token in a client-set
  `sb-access-token` cookie; `middleware.js` and the API routes read that cookie.
- Local anon/service_role keys printed by `supabase status` are shared insecure
  defaults — fine for local dev only, never production.
