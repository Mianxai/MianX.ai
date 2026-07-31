# Phase I.7 — Current build acceptance matrix

**Branch:** `cursor/phase-i7-current-build-operational-closeout`  
**Base main:** `b298fe3c669cbf6b41b7ad539c457c977967f9a2`  
**Docs:** `execution/PHASE-I7-CURRENT-BUILD-INVENTORY.md`

Statuses: **Verified** | **Blocked** | **Hidden until implemented** | **Not applicable**

---

## A. Current application operational acceptance

| Item | Status | Evidence | Real data source | Remaining limitation | Production verification |
|------|--------|----------|------------------|----------------------|-------------------------|
| Auth login / logout / middleware | Verified | existing session + e2e cookie path | Supabase Auth cookie | Hosted Auth config Founder-owned | Login `/admin/login`; logout clears cookie |
| AdminShell single render + active nav | Verified | Playwright route sweep | Nav source | — | Spot-check sidebar on Home |
| Project context `project_id` | Verified | `withProjectQuery` + I.7 isolation tests | URL + optional localStorage restore | Templates catalogue global by design | Switch project; refresh; confirm URL |
| Two-project isolation (nav/query) | Verified | `phase-i7-operational-closeout.test.js` | Fixtures A/B | Full durable leak suite remains integration | Open two projects in two tabs |
| Founder Home / Projects / Objectives | Verified | Playwright + APIs | Durable | Create/delete only if API supports | List + open project |
| Founder Proof read path | Verified | Integration UI + diagnostics | Durable proof | Final review manual only | Confirm awaiting_final_review; do **not** approve |
| Founder Inbox | Verified | Inbox API | Durable | — | Open inbox for proof project |
| Workforce Setup / Readiness | Verified | I.6 metrics + I.7 honesty | Foundation builder | No live activation | Confirm 445/0/provider none |
| Agents / Departments / Workflows / Schedule | Verified | Playwright + cadence 300000 | Definitions + scheduler | No “445 active agents” | Schedule shows every 5 minutes |
| Workforce ops (ex Live Workforce) | Verified | Nav rename + client | Durable + labeled simulation | Provider blocked | Confirm label Workforce ops |
| Outputs / Analytics / Knowledge | Verified | Result APIs | Durable / honest zeros | Analytics never invents cost | Empty project → zeros |
| Memory / Learning | Verified | Decide APIs + honesty notes | Durable candidates | No auto promotion/policy rewrite | Approve/reject only intentionally |
| Templates | Verified | Templates API + catalogue label | Deterministic seed catalog | In-process seed on first load | Refresh catalogue |
| Planning | Verified | Planning API `executes: false` + banner | Best-effort plan store | Not durable Production job store | Create plan; confirm no fake Start |
| Execution (Advanced) | Verified | Nav badge Best-effort + banner | In-process programs | Redeploy may clear | Tick only against ephemeral engine |
| Runtime / Approvals / Audit / Settings | Verified | Runtime workspace + settings GET | Durable / config | Tick needs `MANAGE_JOBS` | Run tick only if intended |
| Company Builder / CEO Brief / Leads | Verified | Existing clients | Planning / brief / leads | Brief no provider synthesis | Open Advanced section |
| Dead primary buttons (console-only) | Verified | Code audit — none found | — | Keep auditing new UI | Click primary CTAs |
| Hardcoded catalogue fallbacks | Verified | Command Center / readiness use `"—"` | API | — | Break API in preview → dashes |
| Cross-surface foundation metrics | Verified | I.6 + I.7 tests | Shared builder | — | Health vs Readiness agree |
| Lint / typecheck / build / Vitest / Playwright / browser / audit | Verified | Quality gates in PR | — | Documented skips only | Re-run after merge on CI |

### Route status totals (visible primary + Advanced)

| Status | Count | Notes |
|--------|------:|-------|
| Verified (operational shell + real or honestly labeled source) | 27 primary + 4 runtime children in Playwright sweep (31) | All `primaryNavHrefs()` plus `/admin/runtime/{agents,tasks,queue,runs}` |
| Blocked (live AI / provider execution) | — | Tracked in section B, not as route shells |
| Hidden until implemented | 0 | No primary nav items hidden in this PR |
| Not applicable | redirects | Aliases only |

Honest nuance: Planning/Execution/Templates are **Verified as operational with disclosed persistence model**, not as durable Production AI execution.

---

## B. Live AI execution acceptance

| Item | Status | Note |
|------|--------|------|
| Provider configured | Blocked | Provider intentionally none |
| Controlled real provider call | Blocked | Not run in I.7 |
| liveExecutionReady true | Blocked | Remains false |
| Controlled live-agent activation | Blocked | Forbidden |
| Fabricated live progress | Blocked / refused | Simulation labeled only |
| Founder Proof auto-approve final review | Blocked | Must remain manual |
| AI Software House fully live | Blocked | Do not claim |

---

## C. Module results (operational)

| Module | Status | Notes |
|--------|--------|-------|
| Projects | Verified | List/detail; no destructive delete invented |
| Objectives | Verified | Protected options labeled gated |
| Founder Proof | Verified (read/governance) | Expected awaiting_final_review; no auto-approve |
| Founder Inbox | Verified | |
| Workforce / Readiness / ops | Verified | Capacity ≠ active |
| Agents | Verified | Definitions ≠ live instances |
| Departments / Workflows / Schedule | Verified | Cadence 5 min |
| Outputs / Analytics / Knowledge | Verified | |
| Memory / Learning | Verified | |
| Templates / Planning | Verified (honest source) | |
| Advanced Operations | Verified (honest Best-effort where needed) | |
| Production mocks as fake success | Verified fixed / none remaining in primary UI | Deterministic simulation retained labeled |

---

## D. Founder steps after merge (do not auto-run)

1. Confirm Preview/Production still reports foundation truth (445 / 0 / provider none / `liveExecutionReady: false`).
2. Walk every sidebar route authenticated; confirm no 404 and single AdminShell.
3. Open Founder Proof for project `61d3b1fd-…`; confirm status unchanged; **do not** final-approve.
4. Confirm Schedule shows **every 5 minutes** (300000 ms).
5. Confirm nav shows **Workforce ops**, not Live Workforce; Execution under Advanced with Best-effort.
6. Spot-check Planning/Execution honesty banners.
7. Do **not** configure a paid provider, run controlled live activation, or re-run Production bootstrap/idempotency unless separately authorized.
8. Only after separate authorization: provider config → controlled live run → live AI acceptance.

---

## E. Explicit non-claims

- Migrations: **not changed** in I.7.
- Production DB: **not mutated** by this PR’s development/tests.
- Provider calls: **none** intended.
- Controlled live runs: **none**.
- Complete AI Software House live: **not claimed**.
