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

## 8. Next READY phase

**Phase B — Runtime Architecture ADR and Mianx Core foundation.**

Not started. Per instruction, no Telepizza/Poultry work and no bulk agent
generation begins until Phase B (and subsequent phases) are explicitly
approved and executed.
