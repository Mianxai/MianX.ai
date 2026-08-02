---
title: Admin Workforce Responsibility Map
document_status: review
implementation_status: partial
production_status: pilot
verification_status: partially_verified
updated: 2026-08-03
pr: draft
---

# Admin Workforce Responsibility Map

Canonical ownership for Founder-facing Workforce Admin surfaces.  
**Routes are not deleted or redirected by this document.** Consolidation is recommended only as a later Founder-approved phase.

Current Production truth (health, 2026-08-03 after PR #80 merge deploy):

| Counter | Value |
|---------|-------|
| Registered capacity | 445 |
| Persisted definitions | 445 |
| Ready to allocate | 445 |
| Allocated | 0 |
| Active | 0 |
| Live-tested | 0 |
| Provider | none |
| liveExecutionReady | false |

**445 is capacity planning — not 445 active or live-tested agents.**

Shared code:

- Metrics: `lib/core/workforce-i2/foundation-metrics.js`
- Capacity UI normalize: `lib/core/workforce-i2/ui-truth.js`
- Terminology: `lib/core/workforce-i2/terminology.js`

---

## 1. Workforce Setup (`/admin/workforce-activation`)

| Field | Value |
|------|--------|
| **Owns** | Enterprise workforce capacity bootstrap; persisted seat inventory; foundation checklist |
| **Does not own** | Runtime job queues; live provider execution; agent catalogue UX; Founder Proof |
| **Canonical metrics** | capacitySeats, compiledSeats, persistedSeats, readyToAllocateSeats, allocatedSeats, activeInstances, liveTestedSeats |
| **Canonical API** | `GET /api/admin/workforce-activation`, `GET …/preflight`, `POST /api/admin/workforce/bootstrap` |
| **Dependencies** | `buildFoundationMetrics`, bootstrap runner, Supabase seat tables |
| **Allowed actions** | Preflight, bootstrap (confirm phrase), refresh foundation snapshot |
| **Prohibited implications** | Must not imply 445 active/live-tested agents; must not imply provider configured when unconfigured |
| **Current overlap** | Shares foundation metrics with Readiness and Workforce Ops |
| **Recommended future consolidation** | Keep Setup as inventory/bootstrap home; link to Readiness for gates |
| **Migration risk** | Medium if routes renamed — nav labels only for now |

**Page component:** `app/admin/workforce-activation/page.jsx` → `WorkforceActivationClient.jsx`

---

## 2. Readiness (`/admin/workforce-readiness`)

| Field | Value |
|------|--------|
| **Owns** | Readiness gates; allocation eligibility; provider/safety prerequisites; executable catalogue vs capacity explanation |
| **Does not own** | Bootstrap apply; runtime simulation controls; always-on agent claims |
| **Canonical metrics** | Same foundation counters + executable catalogue subset metrics |
| **Canonical API** | `GET /api/admin/workforce-readiness`, `GET /api/admin/real-agent-readiness` |
| **Dependencies** | foundation-metrics, completion matrix, real-agent readiness report |
| **Allowed actions** | Readiness refresh (no provider call / no mutation) |
| **Prohibited implications** | Readiness ≠ activation; provider unconfigured must stay visible |
| **Current overlap** | Foundation metric cards duplicate Setup |
| **Recommended future consolidation** | Setup = inventory; Readiness = gates/eligibility deep dive |
| **Migration risk** | Low for copy; medium if APIs merge |

**Page component:** `app/admin/workforce-readiness/page.jsx` → `WorkforceReadinessClient.jsx`

---

## 3. Workforce Ops (`/admin/workforce`)

| Field | Value |
|------|--------|
| **Owns** | Project-scoped runtime operational status; simulation; operational incidents; allocation/activation execution evidence |
| **Does not own** | Static enterprise seat registry as the product; pretending inventory is always-on |
| **Canonical metrics** | Foundation capacity truth + runtime `counts.*` + liveTested |
| **Canonical API** | `GET/POST /api/admin/workforce` |
| **Dependencies** | `normalizeCapacityTruth`, workforce-runtime dashboard, ops summary |
| **Allowed actions** | Simulate / approve simulation / pause / resume (Founder-gated as implemented) |
| **Prohibited implications** | “Real Autonomous Workforce” must not be read as 445 live agents |
| **Current overlap** | Agents tab vs `/admin/agents` vs runtime agents |
| **Recommended future consolidation** | Ops owns runtime only; Agents owns catalogue |
| **Migration risk** | High if tabs removed — out of scope now |

**Page component:** `app/admin/workforce/page.jsx` → `WorkforceClient.jsx`

---

## 4. Agents (`/admin/agents`)

| Field | Value |
|------|--------|
| **Owns** | Individual agent catalogue records; role/department; capability metadata; agent-level detail |
| **Does not own** | Enterprise-wide runtime health summaries; bootstrap |
| **Canonical metrics** | Executable / Routable / Active / Idle (catalogue inventory — not 445 seats) |
| **Canonical API** | `GET /api/admin/command-center` |
| **Dependencies** | command-center snapshot, visible-agents |
| **Allowed actions** | Browse/filter agents; open detail |
| **Prohibited implications** | Must not show capacity slots as live agents |
| **Current overlap** | Naming collision with Workforce Ops “Agents” tab and Runtime Agent Instances |
| **Recommended future consolidation** | Clarify labels only until Founder approves IA change |
| **Migration risk** | Medium for IA |

**Page component:** `app/admin/agents/page.jsx` → `CommandCenterClient.jsx`

---

## 5. Runtime Agent Instances (`/admin/runtime/agents`) — Advanced

| Field | Value |
|------|--------|
| **Owns** | Project-scoped registered instances; technical lifecycle |
| **Does not own** | Enterprise capacity planning UX |
| **Canonical metrics** | Catalogue totals + instance active/idle + Capacity Inventory (445 planning only) |
| **Canonical API** | `/api/core/agents` |
| **Prohibited implications** | Capacity Inventory ≠ running agents |

---

## Navigation clarity (no route deletion)

| Nav label (updated) | Route | Surface |
|---------------------|-------|---------|
| Workforce Setup | `/admin/workforce-activation` | Setup / inventory |
| Readiness | `/admin/workforce-readiness` | Gates / eligibility |
| Agents | `/admin/agents` | Catalogue |
| Workforce Ops | `/admin/workforce` | Runtime ops |

---

## Terminology contract (summary)

See `lib/core/workforce-i2/terminology.js`:

- **registered / capacity** — planning seats  
- **persisted** — durable DB seats  
- **ready** — allocatable, not active  
- **allocated / active / live-tested** — operational evidence counters (currently 0/0/0 in Production)  
- **Missing data → Unavailable**; **zero → 0**

---

## Recommended next implementation phase (not this PR)

1. Extract shared foundation metric card component fed only by `buildFoundationMetrics`.  
2. Remove duplicate “Agents” runtime list from Ops or rename to “Runtime states”.  
3. Optional IA: collapse Setup+Readiness under one shell with tabs — Founder approval required.  
4. Do **not** auto-consolidate without explicit Founder authorization.
