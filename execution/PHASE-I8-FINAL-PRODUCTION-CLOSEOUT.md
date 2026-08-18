# Phase I.8 — Final current-build production closeout

**Branch:** `cursor/phase-i8-final-production-closeout`  
**Base main:** `7f213a70ceb0ba3d13e6b8a24644ec6c898bcfa2` (PR #74 merge)  
**Production:** https://mian-x-ai.vercel.app

---

## Screenshot findings (Founder Production walkthrough)

| # | Observation | Resolution |
|---|-------------|------------|
| 1 | `/admin/command-center` headed “Founder Home” | Split routes: Home vs Command Center |
| 2 | Sidebar “Home” with no distinct Command Center | Home → `/admin`; Advanced Ops → Command Center |
| 3 | Founder Proof “Memory & Learning — Upcoming” at Final Review | Stage progression wins; chip = Completed |
| 4 | Schedule Stale ~6h; counters 0/0/0 | Truthful no-op + GHA private-repo delivery gap |
| 5 | Execution provider-unconfigured, 0 programs | Tick disabled with visible reason |
| 6 | Workforce Readiness correct | Preserved (no regression) |

---

## Root cause — missing Command Center

Home and Command Center were conflated: nav “Home” pointed at `/admin/command-center`, and that page rendered Founder Home content under a “Founder Home” title. `/admin` was an orphan Overview.

## Final Home / Command Center architecture

| Route | Title | Purpose |
|-------|-------|---------|
| `/admin` | Founder Home | Project, next Founder action, Quick Start, concise guidance |
| `/admin/command-center` | Command Center | Ops overview, proof status, foundation 445 truth, scheduler, provider/runtime zeros, module links |

- `project_id` preserved via `withProjectQuery`
- AdminShell once; active nav distinct (`Home` exact; `Command Center` prefix under Advanced Ops)
- Quick Start only on Founder Home + Founder Proof (not Ops Command Center)

---

## Founder Proof contradiction and fix

**Canonical run:** `e8848aeb-388f-49b3-9b44-7ffbfa715110`  
**Expected:** `awaiting_final_review` / `founder_final_review`; Quick Start 8/9; Memory & Learning completed; Final Review waiting for Founder.

**Bug:** `deriveProgressSteps` early-returned to “simulation current” when `evidenceCount === 0`, and `assertProgressInvariants` demoted memory/learning completions without counts — even at Final Review.

**Fix:** When stage/status is Final Review, mark simulation/evidence/memory_learning **completed** and Final Review **waiting_for_founder**. Invariants skip demotion at Final Review. No auto-approve. No provider call.

---

## Scheduler stale root cause

| Fact | Value |
|------|-------|
| Workflow | `Runtime tick` |
| File | `.github/workflows/runtime-tick.yml` |
| Cron | `*/5 * * * *` + `workflow_dispatch` |
| Endpoint | `POST {RUNTIME_TICK_BASE_URL}/api/internal/runtime/tick` |
| Auth | Bearer `INTERNAL_RUNTIME_SECRET` (or `CRON_SECRET`) |
| Latest scheduled run (audit) | `30615878836` @ `2026-07-31T08:19:12Z` — **success**, HTTP **200**, claimed/succeeded/failed **0/0/0** |
| Gap to Founder walkthrough | ~6 hours without another scheduled delivery |

**Root cause:** GitHub Actions schedule delivery on a **private** repository is approximate and may gap for hours. The last tick **succeeded** as a truthful empty no-op. This is **not** a secret failure, endpoint failure, or fake healthy status. UI correctly labeled **Stale** after the 6× interval threshold.

**Code remediation:** Clearer Stale copy (no-op ≠ failure; GHA private-repo gaps); workflow comments updated. **No Production tick dispatched** from this PR.

**Founder action after merge (optional diagnostics):** Inspect Actions → Runtime tick; if gaps persist, Founder may `workflow_dispatch` once. Do not set secrets from agents. Confirm `RUNTIME_SCHEDULER_ACTIVE=1` remains set only after verified ticks (already Founder-owned).

---

## Execution acceptance

- Programs 0; provider unconfigured; best-effort persistence disclosed
- Run Orchestrator Tick **disabled** with visible reason when provider absent or no programs
- Company Builder link preserves `project_id`
- No fake success toast for blocked ticks

---

## Route acceptance matrix (summary)

All primary sidebar routes + `/admin` Home + Advanced Command Center: shells Verified operational with honest sources. Live AI execution remains **Blocked**.

---

## Remaining provider / live-execution blocker

- `providerName: none`
- `liveExecutionReady: false`
- No controlled live-agent activation
- Founder Proof Final Review remains Founder-only

---

## Acceptance sections

### A. Current non-provider application acceptance

Verified for Home/CC split, Founder Proof chip truth, Execution honesty, Workforce Readiness preserved, route sweep.

### B. Scheduler operational acceptance

Workflow config Verified; last tick Verified successful no-op; Stale UI Verified honest. **Automatic 5-minute delivery** remains a **GitHub platform** reliability concern for private repos — Founder monitors Actions.

### C. Live AI execution acceptance

**Blocked** — do not mark complete.

---

## Exact post-merge Founder verification steps

1. Open Preview/Production `/admin` — heading Founder Home; Quick Start present.
2. Advanced Ops → Command Center — heading Command Center; foundation 445; provider none; liveExecutionReady false; no Quick Start.
3. Founder Proof canonical project/run — Memory & Learning **Completed**; Final Review waiting; do **not** approve.
4. Schedule — if Stale, confirm Actions last success + no-op counters; do not invent healthy.
5. Execution — tick disabled when unconfigured / zero programs.
6. Workforce Readiness — 445 / 0 / catalogue split unchanged.
7. Do **not** configure provider, live-activate, bootstrap, or re-run Production idempotency unless separately authorized.
