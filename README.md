# MianX.ai

AI-Powered **Industry Operating Systems**. A public marketing site captures
inbound demo requests (leads) into Postgres, and a protected admin dashboard
lets the team triage submissions — view details, update status, delete, search,
and export CSV.

Built with **Next.js 14 (App Router)**, **Supabase (Postgres + Auth)**,
**Three.js**/**GSAP** for the animated hero, and an optional **Anthropic API**
lead-analysis route.

## Project structure

```
app/
  page.jsx                 landing page (renders components/PublicSite)
  admin/page.jsx           admin dashboard (protected) — stats, table, modal
  admin/login/page.jsx     admin login (Supabase email/password)
  api/leads/route.js       GET (list, protected) + POST (create, public)
  api/leads/[id]/route.js  PATCH (status/analysis) + DELETE, protected
  api/analyze/route.js     POST -> calls Claude server-side (protected, optional)
components/
  PublicSite.jsx           full marketing site (nav, hero, sections, contact form)
  HeroCanvas.jsx           Three.js animated hero background
lib/                       lazy Supabase clients + cookie auth helper
middleware.js              protects /admin/*
supabase/migrations/       leads table + phone/industry columns + RLS
```

Leads columns: `name, email, company, phone, industry, need (message), budget,
status, analysis, created_at`.

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=        # optional — only for /api/analyze
```

Never commit `.env.local`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000  (admin at /admin/login)
npm run lint
npm run build
```

For a fully local backend, use the Supabase CLI (`supabase start`) and point
`.env.local` at the printed local URL/keys. See `AGENTS.md` for the full local
setup, including creating an admin user.

## Deploy

Push to GitHub, import the repo in Vercel, add the environment variables in
Vercel project settings, and deploy. Add your custom domain under
Settings → Domains. Run the SQL in `supabase/migrations/` against your hosted
Supabase project (or `supabase db push`).
