# Mianx.ai

Autonomous AI agents for inbound sales. A public landing site captures leads,
a protected admin dashboard triages them, and an Anthropic-powered agent scores
each lead and drafts a reply — all server-side so the API key never reaches the
browser.

Built with **Next.js 14 (App Router)**, **Supabase (Postgres + Auth)**, and the
**Anthropic API**.

## Project structure

```
app/
  page.jsx                 landing page (public)
  admin/page.jsx           admin dashboard (protected)
  admin/login/page.jsx     admin login
  api/leads/route.js       GET (list, protected) + POST (create, public)
  api/leads/[id]/route.js  PATCH (update status/analysis, protected)
  api/analyze/route.js     POST -> calls Claude server-side (protected)
components/                canvas, ambient field, lead form, admin UI
lib/                       supabase clients + cookie auth helper
middleware.js              protects /admin/*
supabase/migrations/       leads table + RLS
```

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
```

Never commit `.env.local`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

For a fully local backend, use the Supabase CLI (`supabase start`) and point
`.env.local` at the printed local URL/keys. See `AGENTS.md` for the full local
setup, including creating an admin user.

## Deploy

Push to GitHub, import the repo in Vercel, add the four environment variables in
Vercel project settings, and deploy. Add your custom domain under
Settings → Domains.
