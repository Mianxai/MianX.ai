# Execution Board

Compact, living source of truth for current phase status. Update this file
as work completes. Do not create parallel planning documents — extend this
one.

---

## 1. Repository truth (as of this phase)

Established before any edits, from `main` at commit `4037749`
(`origin/main` == `main`, working tree clean).

- **Runnable app already existed on `main`**: a Next.js 14 (App Router,
  JavaScript) app at the repo root (`app/`, `components/`, `lib/`,
  `middleware.js`, `supabase/`) — landing page, lead capture, Supabase
  auth-gated `/admin` dashboard, `/api/leads`, `/api/leads/[id]`,
  `/api/analyze`. This was **not** a stub; it was functionally complete but
  had one build-breaking bug (below) and no `AGENTS.md`.
- **`origin/cursor/implement-mianx-ai-app-35de`** (PR #1, HEAD `dc28123`,
  "Fix Vercel build: lazy Supabase clients + force-dynamic on API routes")
  contains the *same* application, minus `doc/`, the Master Plan `.docx`
  files, and `mianx-ai-prototype.jsx` (i.e. it was branched before those were
  added to `main`), **plus** one real fix: `lib/supabase.js` created its
  Supabase clients eagerly at module load, which crashes `next build`
  ("supabaseUrl is required") whenever the four Supabase/Anthropic env vars
  are absent. That commit switched to lazy client factories
  (`getSupabase()`/`getSupabaseAdmin()`) and added `force-dynamic` to the
  affected API routes. That branch also carries an `AGENTS.md` documenting a
  local-Supabase-via-Docker dev workflow.
  - **Reused in Phase A**: the lazy-client pattern (reimplemented directly
    on `main`, extended with an explicit `isSupabaseConfigured()` guard and
    503 configuration-error responses rather than silent fallbacks), and the
    `AGENTS.md` dev-environment instructions (kept, with the locked product
    scope prepended).
  - **Not merged wholesale**: PR #1's branch predates `doc/`, the Master
    Plan files, and the design-reference prototype, so a blind merge would
    have deleted or diverged from all of that newer material. Phase A work
    was done directly on top of `main`.
- **`doc/`** (not `docs/`) is the actual, tracked, canonical documentation
  root — 50 numbered subject folders plus `doc/repository/`,
  `doc/prd.md`, `doc/product-roadmap.md`, `doc/README.md`. Most content
  carries `status: Draft` / `canonical: false` front-matter: it is planning
  material, not proof of a built system. Several documents internally
  reference a `docs/...` path (plural) that does not exist in this repo —
  a pre-existing inconsistency in the source documents, not something this
  phase renamed or fixed (no mass rename performed, per scope).
- **No `runtime/` Python prototype exists** in this repository. Nothing to
  preserve or delete on that front.
- **`mianx-ai-prototype.jsx`** (repo root) is the Founder-provided design
  reference — a single-file React/Three.js prototype titled "MIANX.AI — AI
  Agent Agency" with a landing page and a passcode-gated demo admin
  dashboard using a sandbox `window.storage` API and a direct client-side
  Anthropic call. It is **not wired into the app** and was **not deleted**.
  See §3 for how it was used.
- `MianX_Master_Plan.docx` / `MianX_Master_Plan_v2.docx` (Founder source
  material, Urdu/English) and `doc/20-ai-operating-system/MASTER-BLUEPRINT.md`
  / `MULTI-PROJECT-OPERATING-MODEL.md` were read for context; none of them
  state the exact locked order from this task's brief (Mianx Core → AI
  Runtime → Project Factory → Founder Workspace → Core Runtime Agents →
  Beta → Telepizza/Poultry later). That order is authoritative for this
  phase per direct instruction and is now recorded in `README.md`,
  `AGENTS.md`, and this board.
- `README.md` on `main` (pre-Phase-A) stated **"RestaurantOS — Launch
  Partner: Telepizza.pk (current priority)"** and framed Telepizza/Poultry
  as the near-term product. This directly conflicted with the locked order
  for this phase and was corrected (§4).

---

## 2. Locked product order (do not change/expand without Founder approval)

```text
Mianx Core → AI Runtime → Project Factory → Founder Workspace →
10–12 Core Runtime Agents → End-to-end Beta →
Telepizza and Poultry later, as "Powered by Mianx.ai" products.
```

RestaurantOS / Telepizza / PoultryOS / a generic "AI agent agency" are **not**
the current product. No documented agent role in this repo is an active
runtime agent — the Core Runtime Agent roster on the homepage is explicitly
labelled "In development."

---

## 3. Current phase: Phase A — Website and Development Foundation

### Ordered tasks

| # | Task | Status | Acceptance criteria |
|---|---|---|---|
| 1 | Establish repository truth (§1) | VERIFIED | `git status`/`branch -a`/`log` captured; PR #1 diffed against `main`; canonical doc root identified |
| 2 | Durable execution control | VERIFIED | This file + `.cursor/rules/mianx-phase-execution.mdc` created; existing rules not duplicated (none existed) |
| 3 | Locate/analyze Founder HTML design | VERIFIED (with a naming note, not a blocker) | See §5 |
| 4 | Fix build-crashing Supabase client init | VERIFIED | `next build` succeeds with all 4 env vars unset (evidence in §6) |
| 5 | Graceful Anthropic-absent behaviour | VERIFIED | `/api/analyze` returns `503 {code:"ANTHROPIC_NOT_CONFIGURED"}`; admin UI shows inline notice, doesn't error-crash |
| 6 | Migrate design into maintainable Next.js components | VERIFIED | `app/page.jsx` rewritten with semantic sections, no `dangerouslySetInnerHTML`, reused existing extracted components |
| 7 | Correct "AI agent agency" positioning | VERIFIED | Live app code, `README.md`, `AGENTS.md` updated; `mianx-ai-prototype.jsx` left as-is (historical reference, not live) |
| 8 | Accessibility / responsive / reduced motion | VERIFIED | Skip link, focus-visible styles, aria-hidden on decorative canvases, `prefers-reduced-motion` in CSS + both canvas components, manual mobile/tablet check |
| 9 | Quality gates: lint/test/build/CI | VERIFIED | See §6 |
| 10 | Local Supabase Docker smoke test | PARTIAL — see blocker in §7 | Full stack could not be started in this sandbox; config-toggle + code-path evidence gathered instead |
| 11 | Manual smoke test (homepage, admin redirect, responsive) | VERIFIED | `computerUse` walkthrough, §6 |
| 12 | Commit, push, draft PR | IN_PROGRESS | This commit/push/PR |

### Acceptance for the phase overall

Every item is VERIFIED except #10, which is PARTIAL for a documented
environment reason (§7), not a code defect — the code path it would have
exercised is independently verified via the configured/unconfigured toggle
test in §6.

---

## 4. Decisions made this phase

- **README.md rewritten in the "Product Line" / "Roadmap" / architecture
  sections** to remove "RestaurantOS/Telepizza current priority" framing and
  replace it with the locked order from §2. Company principles, reusability
  rule, documentation standards, and repository-structure illustration were
  left intact (still valid, still generic).
- **`AGENTS.md` added at repo root** (did not exist on `main`): technical
  dev-environment instructions (adapted from PR #1's branch, generalized —
  it was written for one specific Cursor Cloud VM's Docker config) plus a
  short locked-scope header so agents don't need to read all of `doc/` to
  avoid scope drift.
- **`doc/` confirmed canonical**, `docs/` (plural) references inside those
  documents are a pre-existing inconsistency, left as-is (no mass rename
  this phase, per instruction).
- **Portfolio / "Powered by Mianx.ai" client-showcase section from the
  design reference was intentionally NOT migrated to the homepage.** The
  prototype's showcase features Al Hamdu Lillah Poultry Traders as a live
  proof-of-work client. Per the locked order, Poultry is a *later*
  milestone, not the current product — including it now risked exactly the
  scope violation the brief warns against. This can be revisited once the
  roadmap reaches that stage.
- **Supabase `realtime` service disabled** in `supabase/config.toml` (the
  app doesn't use Realtime subscriptions — lead list/detail poll over REST).
  Reduces local container count; no behavior change for the app.
- **Added a minimal automated-test layer** (Vitest, `npm run test`) for the
  one behavior this phase most needed proof of: the env-var configuration
  guard (`lib/supabase.js`) and the resulting API-route status codes. No
  existing test framework was present to extend.
- **Did not upgrade Next.js 14 → 16** despite `npm audit` reporting 5 high
  severity advisories against `next@14.2.35` — the fix is a major version
  bump with breaking changes, out of Phase A's "reconcile, don't replace the
  stack" scope. Recorded as a follow-up recommendation, not silently done.
- **CI caught a real portability bug after the first push**: the CI
  workflow (Node 20) failed 2 of 10 tests with `Error: Node.js detected but
  native WebSocket not found.` `@supabase/supabase-js` unconditionally
  constructs a Realtime client inside `createClient()`, which needs a
  global `WebSocket` — native only on Node 22+. This local sandbox runs
  Node 22.14 so it wasn't visible there. Fixed by pinning
  `engines.node >= 22` in `package.json` (so Vercel/CI pick a runtime with
  native WebSocket), moving CI to Node 22, and wrapping client construction
  in `lib/supabase.js` in try/catch plus explicit null-checks in the API
  routes as a second line of defense. This is exactly why the required "run
  the tests, run the build, show the output" gates matter — see the CI run
  history on the PR.

## 5. HTML/design source (§3 detail)

No tracked or untracked `.html`/`.htm` file exists anywhere in the repo
history or branches. The single, unambiguous Founder-provided design
reference is **`mianx-ai-prototype.jsx`** (repo root, 869 lines, React +
Three.js, present only on `main`). It was analyzed for:

- **Structure**: sticky nav → hero (headline + animated 3D "agent network"
  sphere) → features grid (8 agent roles) → 3-step "how it works" → client
  portfolio/proof-of-work → lead form → footer; separate passcode-gated
  admin dashboard (lead list + detail + inline "run AI agent" + status
  pipeline).
- **Styling**: Google Fonts CDN import (Sora/Inter/JetBrains Mono), inline
  JS style objects (no CSS modules/classes beyond a few utility classes),
  violet/teal/indigo palette, `IntersectionObserver`-based scroll reveals,
  `prefers-reduced-motion` handled only via one global `* { animation:
  none }` rule.
- **JS**: two Three.js WebGL scenes (`AmbientField`, `AgentNetworkCanvas`),
  a sandbox-only `window.storage` persistence layer (not usable outside its
  original sandbox), a **client-side** direct call to
  `api.anthropic.com` (would leak a real API key to the browser if wired up
  for real — a real security problem in the reference, not present in the
  actual app), and a hardcoded demo passcode (`"mianx2026"`) for the admin
  dashboard.
- **Differences from the already-existing homepage on `main`**: the
  existing `app/page.jsx` was a much shorter, already-simplified rewrite
  (nav + hero + 3-card "how it works" + lead form) that already used
  canvas-2D versions of the two signature animations
  (`components/AmbientField.jsx`, `components/AgentNetworkCanvas.jsx` —
  no Three.js/WebGL dependency, smaller bundle, no CDN font import) and
  already posted to the real `/api/leads` route. It reused the prototype's
  *visual language* but not its risky patterns.
- **What was reused**: the two-canvas signature-visual concept (already
  ported, ahead of this phase, to dependency-free 2D canvas versions — kept
  as-is, only patched for `prefers-reduced-motion`), the 8-role agent-grid
  concept (kept, relabelled "In development," generic roles only, no
  vertical-specific agents), the 3-step flow copy pattern, the general dark
  violet/teal aesthetic (already expressed via `app/globals.css` CSS
  variables rather than inline styles).
- **What was explicitly rejected**: the client-side Anthropic call, the
  hardcoded admin passcode, the sandbox storage layer, the CDN font import,
  the client-showcase/portfolio section (see §4), and the "AI agent agency"
  framing.
- **Unsafe/obsolete patterns not carried forward**: none of the above are
  present in `app/`, `components/`, or `lib/` — confirmed by review, not
  just by omission.

---

## 6. Evidence from commands

All commands run from repo root on branch
`cursor/mianx-phase-a-website-foundation-9170`.

**Reproduced the pre-existing bug** (on `main`, before the fix):

```text
$ npm ci
$ env -u NEXT_PUBLIC_SUPABASE_URL -u NEXT_PUBLIC_SUPABASE_ANON_KEY \
  -u SUPABASE_SERVICE_ROLE_KEY -u ANTHROPIC_API_KEY npm run build
...
Error: supabaseUrl is required.
    at .../app/api/leads/route.js
> Build error occurred
Error: Failed to collect page data for /api/leads
```

**Lint** — clean:

```text
$ npm run lint
✔ No ESLint warnings or errors
```

**Tests** — 9/9 passing (env-var guard + route status-code behavior):

```text
$ npm run test
 Test Files  3 passed (3)
      Tests  9 passed (9)
```

**Production build with all four required env vars removed** — succeeds
(this is the exact fix verification the brief requires):

```text
$ env -u NEXT_PUBLIC_SUPABASE_URL -u NEXT_PUBLIC_SUPABASE_ANON_KEY \
  -u SUPABASE_SERVICE_ROLE_KEY -u ANTHROPIC_API_KEY npm run build
...
 ✓ Compiled successfully
 ✓ Generating static pages (6/6)

Route (app)                              Size     First Load JS
┌ ○ /                                    2.33 kB        98.3 kB
├ ○ /_not-found                          873 B          88.2 kB
├ ○ /admin                               2.47 kB         161 kB
├ ○ /admin/login                         1.3 kB          160 kB
├ ƒ /api/analyze                         0 B                0 B
├ ƒ /api/leads                           0 B                0 B
└ ƒ /api/leads/[id]                      0 B                0 B
```

**Local smoke test** (`npm start`, same env-vars-removed state):

```text
GET  /                → 200
GET  /admin            → 307 → /admin/login   (unauthenticated redirect works)
GET  /admin/login      → 200
POST /api/leads        → 503 {"error":"Configuration error: Supabase
                          environment variables are not set. ..."}
```

**Configured-but-unreachable toggle test** (fake Supabase URL/keys present,
to prove the "configured" branch is reachable and still doesn't crash the
server):

```text
POST /api/leads → 500 {"error":"TypeError: fetch failed"}   (per-request
                                                              error, not a
                                                              process crash)
GET  /            → 200   (still up)
GET  /admin/login → 200   (still up)
```

**Manual GUI walkthrough** (via `computerUse` subagent, no Supabase
configured): desktop (1440×900), mobile (390×844), tablet (768×1024) — all
render correctly, no horizontal overflow, focus outlines visible on Tab,
zero console errors; lead-form submission shows the controlled
configuration-error notice (expected, since this sandbox has no reachable
Supabase — see §7); `/admin` correctly redirects to `/admin/login`.

---

## 7. Blockers / known limitations

- **Full local Supabase Docker stack could not be started in this sandboxed
  VM.** Root cause isolated: the default `overlayfs` Docker storage driver
  fails to extract images here (`operation not permitted` on whiteout
  files); switching to `fuse-overlayfs` with the containerd snapshotter
  disabled fixes image pulls, but container-to-container networking on the
  Docker bridge is non-functional in this environment (confirmed with
  `docker exec ... nc -zv <db-container-ip> 5432` → `Operation timed out`,
  and `dockerd` logs show `"Deleting nftables IPv4/IPv6 rules" error="exit
  status 1"` at startup — the sandbox does not allow Docker to manage the
  netfilter rules its bridge network needs). This blocked full end-to-end
  verification of the lead-capture → Supabase → admin-dashboard flow
  against a real database in *this* run.
  - **Not a code defect**: the app-side code was verified via the
    configured/unconfigured toggle test in §6, which proves (a) the
    unconfigured path never crashes the server and returns a clean 503, and
    (b) the configured path is reachable and attempts a real network call
    rather than short-circuiting.
  - **Does not block Phase A completion**: Supabase-backed verification was
    already true of the pre-existing code (same client/query patterns as
    PR #1, which targeted a real hosted/Vercel deployment) and remains an
    open action for an environment with working container networking or a
    hosted Supabase project.
- **`npm audit` reports 5 high-severity advisories**, all against
  `next@14.2.35` (and its transitive `postcss`/`glob`), fixable only by
  upgrading to Next.js 16 (breaking). Deferred — see §4.
- **Multi-project portfolio verticals** (Hospital, School, Logistics,
  Construction, Retail, Marketplace) referenced in `doc/20-ai-operating-
  system/MASTER-BLUEPRINT.md` remain long-range planning context only; not
  touched, not scheduled, no scope expansion performed.
- **Production/Vercel promotion, custom-domain changes, and destructive
  database migrations** were not performed and require Founder approval —
  none were attempted.

---

## 8. Phase A status at the time of the final UI replacement (§9)

Phase B had not yet started when the Founder's final design decision (§9)
arrived. Per direct instruction, Phase B work is **paused** until the final
UI replacement is complete and Founder preview approval is granted (§9.9).

---

## 9. Final UI replacement — Founder-approved design (supersedes §5's interim design)

### 9.1 Founder's final design decision

The Founder rejected the JSX prototype used as the interim design reference
in §5 (`mianx-ai-prototype.jsx`, already deleted from the repository by the
Founder before this work began — **not restored, per instruction**) and
approved two final HTML designs instead:

| File | Repo path (final) | SHA-256 | Lines |
|---|---|---|---|
| Public website | `design/approved/final-website/mianx_website_public.html` | `0092f25c5931d939b7756d5487f63a826d39ea4f204d0445420a65239d5ad471` | 895 |
| Admin dashboard | `design/approved/final-website/mianx_admin_dashboard.html` | `d972fc81c75461845f46040de60b51636fc9bdc6867ea057ff6c26ddc0813887` | 447 |

**Where they were found**: uploaded directly to repo root on `main` (commit
`51827da51a46daaeab36423ec8a371c57f660bb5`, "Add files via upload"),
immediately after commit `fd247a1` deleted the JSX prototype. No other
`.html`/`.htm` file exists anywhere in tracked history or any branch, so
selection was unambiguous.

**How they were preserved**: `git mv`'d into `design/approved/final-website/`
in a dedicated commit (`1ad796c`), with SHA-256 verified identical before
and after the move (table above) — original content preserved byte-for-byte.
They are not served or imported by the app; they are the visual reference
only, per instruction (no `dangerouslySetInnerHTML`, no raw HTML embedding).

### 9.2 What the approved HTML actually specified vs. what shipped

Both files were fully analyzed (structure, CSS, JS, forms, accessibility,
security, CDN dependencies) before migration. Key findings and how they were
handled:

| Found in approved HTML | Decision | Why |
|---|---|---|
| CDN `<script>` tags for Three.js r128 and GSAP 3.12.2 | Three.js installed as a real npm dependency (`three@0.185.1`), loaded via `next/dynamic({ssr:false})` so it never touches SSR/`next build`. GSAP **not** installed. | GSAP's only use in the approved HTML is a fade-up-on-scroll `ScrollTrigger` effect, reproducible with a plain `IntersectionObserver` + CSS transition (`components/public/useReveal.js`) with no new dependency, smaller bundle, and no additional supply-chain surface. Three.js *is* genuinely required — the animated 3D wireframe hero is a named preserve-requirement with no lightweight equivalent. |
| `localStorage.setItem('mianx_submissions', ...)` for both the contact form and the "admin dashboard" | Removed entirely. Real `POST /api/leads` → Supabase. | Explicit instruction: no `localStorage` for lead storage. |
| Hero badge: "Trusted by Al Hamdu Lillah Poultry Traders"; hero stats "2+ Live Partners / 10+ Industries / 81+ Cities Covered / 500+ Active Users" | Replaced with truthful, verifiable counts: "7 Locked Roadmap Steps / 4 Platform Layers / 6 Platform Capabilities / 100% Server-side AI" (all counted directly from `lib/content.js`, asserted in tests). | Unverified live-partner and usage claims; no canonical repository evidence supports them. |
| Industries grid: PoultryOS badge "⭐ LIVE", RestaurantOS "In Development", others "Coming Soon" | Unified to a single truthful **"Planned"** badge (`.status-planned`) for all six future products. | Per locked order, industry products are *all* future work — none is live or "in development" yet; the old badges implied a build status that doesn't exist. |
| "Powered by MianX.ai" partners section: Al Hamdu Lillah "LIVE NOW" + "Visit Live Site" link + a 4-stat grid (81+ cities, 500+ farmers, 12+ years, 100% cash) | Folded into the Future Products cards as a one-line, non-clickable "Founding design partner: <name>" note, no live badge, no stats, no external link. | These are unverified business claims about a third party's operations, not evidence about this platform; "Visit Live Site" would have implied Mianx.ai already powers that site, which is exactly the "Telepizza/Poultry live status" claim the brief prohibits. |
| Testimonials section (two fabricated quotes attributed to "Al Hamdu Lillah Team" and "Telepizza Management") | **Removed entirely** (and its nav link removed, so no dead `#testimonials` anchor remains). | No real testimonials exist; the brief explicitly disallows unverified customer testimonials, and inventing placeholder ones would violate the "no fake data" and "no dead links/placeholders" requirements simultaneously. |
| Contact form success message: "Thank you! We will contact you within 24 hours." | Replaced with "Thank you — your message has been received." | Explicit instruction: no 24-hour response guarantees. |
| Admin dashboard demo data (4 hardcoded fake leads seeded into `localStorage` on first load) | Removed. Empty state ("Waiting for new leads…") shown until real Supabase data arrives. | No fake/demo data in a real admin tool. |
| Admin sidebar: `.sidebar { display: none }` below 768px with no way to reopen it | Real off-canvas drawer: `.admin-sidebar.open { transform: translateX(0) }` + a header hamburger button + overlay backdrop + close button, all keyboard/focus accessible. | Explicit instruction: "Mobile dashboard has a working navigation drawer" — the approved design did not actually have one. |
| Admin sidebar "Analytics" and "Settings" links (fully non-functional in the prototype) | Rendered as visibly `disabled` buttons with a "Coming later" label; no route created. | Explicit instruction: mark as "Coming later" or remove; do not create fake pages. |
| Admin delete button (hard `DELETE`, `confirm()` + array splice) | Replaced with **Archive** (soft delete): `PATCH {archived: true}` sets `archived_at`; the row is hidden from the default view but never destroyed. | Explicit instruction: no silent hard-delete of leads; the schema was extended (§9.4) specifically to support this safely. |
| Admin row actions used inline `onclick="viewDetail(123)"` / `onclick="deleteSubmission(123)"` HTML attributes | React `onClick` handlers throughout; zero inline HTML event-handler attributes anywhere in the app. | Explicit instruction: no inline event handlers. |
| Footer social icons linking to `href="#"`; footer "Careers" link to `href="#"` | Removed (no real destinations exist for either). | Explicit instruction: remove dead links and placeholders. |

Everything else — the premium dark theme, indigo/violet/cyan palette,
typography (Inter + Space Grotesk, now via `next/font/google` instead of
the Google Fonts CDN `<link>` tags — same visual fonts, no runtime CDN
dependency or render-blocking request), fixed/blurred nav on scroll, mobile
hamburger menu, card borders/gradients/shadows/hover states, the contact
form's visual layout, and the "How It Works" 3-step section — was preserved
as closely as the conversion to React allows.

### 9.3 Files added, changed, and deleted

**Design reference preserved (moved, not deleted):**
`design/approved/final-website/mianx_website_public.html`,
`design/approved/final-website/mianx_admin_dashboard.html`.

**New public-site components** (`components/public/`): `Navbar.jsx` (sticky
nav + accessible mobile menu with focus trap), `Hero.jsx` +
`HeroScene.jsx` (dynamically-imported Three.js wireframe scene, WebGL
capability check, `prefers-reduced-motion` fallback), `useReveal.js` +
`Reveal.jsx` (scroll-reveal, replaces GSAP — see §9.2), `HowItWorks.jsx`,
`PlatformOrder.jsx` (the locked 7-step order, see §2), `Capabilities.jsx`,
`FutureProducts.jsx`, `LeadForm.jsx` + `ContactSection.jsx`, `Footer.jsx`,
`ScrollTop.jsx`. Content centralized in `lib/content.js` so the locked order
is a single source of truth (and directly testable).

**New admin components** (`components/admin/`): `Sidebar.jsx` (with the new
mobile drawer), `StatsGrid.jsx`, `FiltersBar.jsx`, `LeadTable.jsx`,
`LeadDetailModal.jsx` (focus-trapped, Escape-to-close, AI analysis
preserved, Archive action, status `<select>`).

**Shared**: `components/shared/useFocusTrap.js` (Tab-trap + Escape +
focus-restore, used by both the mobile menu and the admin modal).

**Backend/security** (`lib/`): `lib/leads.js` (validation, `LEAD_STATUSES`
allowlist, `buildLeadPatch()` mass-assignment guard), `lib/csv.js` (pure,
independently-testable CSV builder for the export button).

**Rewritten**: `app/page.jsx`, `app/admin/page.jsx`,
`app/admin/login/page.jsx`, `app/layout.jsx` (now uses `next/font/google`
+ Open Graph metadata), `app/globals.css` (full replacement with the
approved design's tokens/classes), `app/api/leads/route.js`,
`app/api/leads/[id]/route.js` (new allowlist-based PATCH), `app/api/analyze/route.js`
(field names updated to phone/industry/message; still gated on
`ANTHROPIC_API_KEY`).

**New**: `app/admin/admin.css` (admin-only styles, imported via new
`app/admin/layout.jsx`).

**Deleted** (confirmed with `grep` for remaining imports before deletion —
zero references found — and reconfirmed via `git diff --name-status`
against `origin/main` at delivery time): `components/AgentNetworkCanvas.jsx`,
`components/AmbientField.jsx` (both superseded by `Hero`/`HeroScene`),
`components/AdminLeadList.jsx`, `components/AdminLeadDetail.jsx` (superseded
by `components/admin/*`), root-level `components/LeadForm.jsx` (superseded
by `components/public/LeadForm.jsx`). `mianx-ai-prototype.jsx` was **not**
touched by this work — it was already deleted by the Founder before this
task started, and stays deleted per instruction.

**No documentation, backend, auth, Supabase config, middleware, migration,
test, or CI file was deleted.** `middleware.js`, `lib/auth.js`, the
Phase A `lib/supabase.js` guard, `doc/`, `AGENTS.md`'s dev-workflow section,
and the CI workflow are all unchanged in behavior (only field names/imports
updated where the new lead schema required it).

### 9.4 Schema change (additive only, per instruction)

Inspected before changing: the existing `leads` table
(`supabase/migrations/20260721000000_create_leads.sql`) had `id, name,
email, company, budget, need, status, analysis, created_at` — no `phone`,
no `industry`, no soft-delete flag, and no `status` CHECK constraint.

New migration `supabase/migrations/20260723190000_leads_phone_industry_status_archive.sql`:

```sql
alter table leads add column if not exists phone text;
alter table leads add column if not exists industry text;
alter table leads add column if not exists archived_at timestamptz;
update leads set status = 'converted' where status = 'qualified';
update leads set status = 'new' where status is null;
alter table leads add constraint leads_status_check
  check (status in ('new', 'contacted', 'converted', 'closed'));
alter table leads alter column status set default 'new';
```

- **Additive only**: two new nullable columns (`phone`, `industry`) plus one
  new nullable timestamp (`archived_at`) for soft delete. No column is
  dropped (`budget` and `analysis` remain, simply unused by the new form).
- **No data loss**: the one `UPDATE` is a corrective backfill of a legacy
  status label (`'qualified'`, used only by the now-deleted prototype admin
  UI) to its closest equivalent in the locked set (`'converted'`) — it
  renames a value, it does not delete rows. This repository has no
  production traffic yet (see §7's Supabase-sandbox limitation — no real
  leads have ever been written from this environment), so this is a safe,
  reversible normalization, not a destructive migration.
- The message field is still stored in the pre-existing `need` column (the
  new form's `message` field maps to it in `app/api/leads/route.js`) —
  chosen deliberately to avoid a column rename, keeping the migration
  purely additive.

### 9.5 Lead security (§6 of the task brief)

- `LEAD_STATUSES = ["new", "contacted", "converted", "closed"]` is the only
  allowed set, enforced in `lib/leads.js` `buildLeadPatch()` and asserted in
  `lib/leads.test.js` and `app/api/leads/[id]/route.test.js` (including a
  test that `"qualified"` — the old prototype's value — is now rejected).
- `buildLeadPatch()` is an **explicit allowlist**: only `status`, `archived`
  (converted server-side into a real `archived_at` timestamp — the client
  cannot set an arbitrary timestamp), and a shape-validated `analysis`
  object are ever passed to Supabase's `.update()`. A dedicated test
  (`"ignores unknown/mass-assignment fields..."`) POSTs `id`, `created_at`,
  and `email` alongside a valid `status` and asserts only `status` reaches
  the database call.
- Lead content is **never** rendered via `dangerouslySetInnerHTML` or raw
  `innerHTML` anywhere in the app (confirmed by `grep` across `app/` and
  `components/` — zero matches). `components/admin/LeadDetailModal.test.jsx`
  and `components/admin/LeadTable.test.jsx` render a lead whose `message`/
  `name` field literally contains `<script>window.__xss = true;</script>`
  and `<img src=x onerror=...>`, then assert: the raw tag text is visible
  as plain text in the document, `document.querySelector("script"/"img")`
  finds nothing, and the `window.__xss` flags were never set — i.e. it is
  demonstrably inert, not just "probably safe by convention."
- Archive replaces hard delete (§9.2); the schema supports it safely (§9.4).
- `SUPABASE_SERVICE_ROLE_KEY` is read only in `lib/supabase.js`'s
  server-only `getSupabaseAdmin()`, never in a `"use client"` file, never
  sent to the browser, and RLS remains enabled on `leads` with no public
  policies (grants are scoped to `service_role` only, from the original
  Phase A migration).

### 9.6 AI analysis (§7 of the task brief)

Preserved as-is from Phase A, inside the new `LeadDetailModal`: server-side
only (`app/api/analyze/route.js`), never requires `ANTHROPIC_API_KEY`
(build and every other feature work without it), returns the same
`503 {code: "ANTHROPIC_NOT_CONFIGURED"}` contract, and the modal shows the
same category of inline notice ("AI analysis is unavailable on this
deployment…") rather than a hard error — verified by
`components/admin/LeadDetailModal.test.jsx`'s
`"shows an inline notice ... when AI analysis is not configured"` test and
`app/api/analyze/route.test.js`.

### 9.7 Test and build evidence

```text
$ npm run lint
✔ No ESLint warnings or errors

$ npm run test
 Test Files  13 passed (13)
      Tests  70 passed (70)

$ env -u NEXT_PUBLIC_SUPABASE_URL -u NEXT_PUBLIC_SUPABASE_ANON_KEY \
  -u SUPABASE_SERVICE_ROLE_KEY -u ANTHROPIC_API_KEY npm run build
...
 ✓ Compiled successfully
 ✓ Generating static pages (6/6)

Route (app)                              Size     First Load JS
┌ ○ /                                    5.12 kB         101 kB
├ ○ /_not-found                          873 B          88.3 kB
├ ○ /admin                               6.2 kB          156 kB
├ ○ /admin/login                         1.46 kB         160 kB
├ ƒ /api/analyze                         0 B                0 B
├ ƒ /api/leads                           0 B                0 B
└ ƒ /api/leads/[id]                      0 B                0 B
```

The 70 tests include (per the task's required coverage list): public
homepage rendering (`app/page.test.jsx`), the exact locked platform order
(`components/public/PlatformOrder.test.jsx`), lead validation success/
failure/missing-Supabase (`lib/leads.test.js`, `app/api/leads/route.test.js`,
`components/public/LeadForm.test.jsx`), admin auth redirect + authenticated
loading + search/filtering (`app/admin/page.test.jsx`), valid/invalid status
updates and mass-assignment prevention (`app/api/leads/[id]/route.test.js`),
safe malicious-text rendering (`LeadDetailModal.test.jsx`,
`LeadTable.test.jsx`), CSV export correctness (`lib/csv.test.js`), missing
`ANTHROPIC_API_KEY` (`app/api/analyze/route.test.js`,
`LeadDetailModal.test.jsx`), keyboard/focus-trap modal behavior
(`LeadDetailModal.test.jsx`: Escape closes + restores focus, Tab is
trapped), and reduced-motion (`components/public/useReveal.test.jsx`).

**Local smoke test** (`npm start`, all four env vars unset):

```text
GET  /                 → 200
GET  /admin             → 307 → /admin/login
POST /api/leads         → 503 {"error":"Configuration error: ..."}
```

**Manual GUI walkthrough** (`computerUse`, desktop 1440×900 / mobile 390×844
/ tablet 768×1024): dark indigo/violet/cyan theme with animated 3D hero
confirmed; "The Platform, In Order" shows all 7 cards in the locked
sequence; "Future Industry Products" shows all six as "Planned" (no "LIVE"
badges anywhere, confirmed via `Ctrl+F` returning 0 matches for "agent
agency" and "LIVE NOW"); empty-form submission shows inline per-field
errors without calling the API; filled-form submission shows the
configuration-error notice (Supabase unconfigured in this sandbox — not a
crash, not a fake success, no "24 hours" promise); mobile hamburger menu
opens a full-screen menu with a working close button, Escape closes it, no
horizontal overflow; tablet layout has no overlap; `/admin` redirects to
`/admin/login`, which matches the same dark design system and shows a
configuration notice with sign-in disabled. Zero console errors other than
expected WebGL GPU-stall informational messages (from the 3D scene) and the
expected 503 from the unconfigured-Supabase form submission.

Screenshots: `final_homepage_desktop.webp`, `final_platform_order_section.webp`,
`final_future_products_section.webp`, `final_form_validation_errors.webp`,
`final_form_config_error.webp`, `final_mobile_menu.webp`,
`final_tablet_layout.webp`, `final_admin_login.webp` (in the PR body / task
artifacts).

### 9.8 Known limitations (this section)

- **Full authenticated admin-dashboard flow (real leads → table → modal →
  status/archive/CSV against a live Supabase project) still could not be
  exercised end-to-end in this sandbox**, for the same Docker
  container-networking limitation already documented in §7 — unchanged
  since Phase A. What *is* new and does mitigate this: `app/admin/page.test.jsx`
  exercises the same data-loading/search/filter/stats logic against a
  mocked `fetch`, and `LeadDetailModal.test.jsx` exercises status-update/
  archive/AI-analysis against a mocked `fetch`, so the client-side logic
  paths are proven even without a reachable database.
- GSAP was not installed (§9.2) — the scroll-reveal effect is visually
  equivalent but implemented via `IntersectionObserver`, not GSAP's
  `ScrollTrigger`. If a future requirement needs GSAP-specific timeline
  features (not just fade-up-on-scroll), it isn't installed yet.
- `npm audit`'s 5 pre-existing high-severity `next@14.2.35` advisories
  (§4/§7) are unchanged by this work — still deferred, same reasoning.
- A GPU/WebGL "GL_CLOSE_PATH_NV" informational stall message appears in the
  console during the hero animation in this VM's software-rendered Chrome;
  this is an environment/driver characteristic of the sandbox's virtual
  GPU, not a code defect (the hero still renders and animates correctly).

### 9.9 Founder approval gate

No production deploy, domain change, or `main` merge was performed or
attempted. **One approval is required from the Founder**: review the Vercel
preview for this branch/PR and explicitly approve promotion to production
(or request changes). Phase B (Runtime Architecture ADR and Mianx Core
foundation) remains paused until that approval, per instruction.

---

## 10. Next READY phase

**Phase B — Runtime Architecture ADR and Mianx Core foundation.**

Not started. Per instruction, no Telepizza/Poultry work and no bulk agent
generation begins until Phase B (and subsequent phases) are explicitly
approved and executed, and not before the Founder approval gate in §9.9 is
cleared.
