# Phase I.7 — Current build inventory

**Branch:** `cursor/phase-i7-current-build-operational-closeout`  
**Base main:** `b298fe3c669cbf6b41b7ad539c457c977967f9a2` (PR #73 merge)  
**Scope:** Inventory of functionality already present in the repository. No new business products. No live AI execution.

---

## 1. Production foundation truth (unchanged)

| Fact | Value |
|------|-------|
| capacitySeats / compiledSeats / persistedSeats / readyToAllocateSeats | 445 |
| duplicates / orphans | 0 |
| allocatedSeats / activeInstances / liveTestedSeats | 0 |
| departments / archetypes / workflowFamilies | 20 / 148 / 13 |
| catalogue / executable / non-executable | 43 / 38 / 5 |
| namedRoleRegistry / capacityReserveGaps | 92 / 291 |
| databaseReady / foundationReady / durables | true |
| providerName | none |
| liveExecutionReady | false |

Canonical Founder Proof (do not mutate): project `61d3b1fd-c260-479b-9289-0c75f977e892`, run `e8848aeb-388f-49b3-9b44-7ffbfa715110`.

---

## 2. Primary navigation (source: `components/admin/nav.js`)

### Founder Mode

| Route | Label | Page | Primary API(s) | Data source | Readiness |
|-------|-------|------|----------------|-------------|-----------|
| `/admin/command-center` | Home | `CommandCenterClient` | `/api/admin/command-center` | Durable + derived snapshot | Operational |
| `/admin/projects` | Projects | Projects list | `/api/core/projects` | Durable DB | Operational |
| `/admin/projects/[id]` | (detail) | Project detail | core projects + runtime links | Durable DB | Operational |
| `/admin/objectives` | Objectives | `ObjectivesClient` | `/api/admin/objectives` | Durable workflows/tasks | Operational (start gated by capability) |
| `/admin/integration` | Founder Proof | `IntegrationClient` | `/api/admin/integration` | Durable proof + deterministic simulation | Operational read; final review not auto-approved |
| `/admin/inbox` | Founder Inbox | `InboxClient` | `/api/admin/inbox` | Durable inbox | Operational |

### Workforce

| Route | Label | Page | Primary API(s) | Data source | Readiness |
|-------|-------|------|----------------|-------------|-----------|
| `/admin/workforce-activation` | Workforce | `WorkforceActivationClient` | `/api/admin/workforce-activation`, bootstrap | Foundation metrics + verify | Operational setup (no live activate) |
| `/admin/workforce-readiness` | Readiness detail | `WorkforceReadinessClient` | `/api/admin/workforce-readiness` | Foundation metrics | Operational |
| `/admin/agents` | Agents | `CommandCenterClient` (agents view) | command-center / agents | Definitions + project instances | Operational (definitions ≠ live agents) |
| `/admin/workforce` | Workforce ops | `WorkforceClient` | `/api/admin/workforce` | Durable + explicit simulation mode | Operational; live wording removed |
| `/admin/departments` | Departments | `DepartmentsClient` | command-center / workforce | Derived department rail | Operational |
| `/admin/workflows` | Workflows | `WorkflowsClient` | core workflows | Durable definitions | Operational |
| `/admin/schedule` | Schedule | `ScheduleClient` | command-center | Scheduler status; cadence **300000 ms** | Operational |

### Results

| Route | Label | Page | Primary API(s) | Data source | Readiness |
|-------|-------|------|----------------|-------------|-----------|
| `/admin/outputs` | Outputs | `OutputsClient` | `/api/admin/outputs` | Durable evidence/outputs | Operational |
| `/admin/analytics` | Analytics | analytics page | `/api/admin/analytics` | Durable / insufficient_data honest zeros | Operational |
| `/admin/knowledge` | Knowledge | `KnowledgeClient` | `/api/admin/knowledge` | Durable knowledge | Operational |
| `/admin/memory` | Memory | `MemoryClient` | `/api/admin/memory` | Durable candidates vs approved | Operational |
| `/admin/learning` | Learning | `LearningClient` | `/api/admin/learning` | Durable proposals; no auto policy rewrite | Operational |
| `/admin/templates` | Templates | `TemplatesClient` | `/api/admin/templates` | Deterministic seed catalog (API) | Operational (honest catalog label) |
| `/admin/planning` | Planning | `PlanningClient` | `/api/admin/planning` | Best-effort / `executes: false` | Operational with persistence honesty |

### Advanced Operations

| Route | Label | Page | Primary API(s) | Data source | Readiness |
|-------|-------|------|----------------|-------------|-----------|
| `/admin/runtime` (+ agents/tasks/queue/runs) | Runtime Overview | `RuntimeWorkspace` | core runtime APIs | Durable jobs/tasks | Operational |
| `/admin/runtime/approvals` | Runtime Approvals | Runtime workspace | approvals | Durable | Operational |
| `/admin/runtime/audit` | Full Audit | Runtime workspace | `/api/admin/audit/unified` | Durable | Operational |
| `/admin/execution` | Execution (Best-effort) | `ExecutionClient` | `/api/admin/execution` | In-process best-effort programs | Operational with honesty banner |
| `/admin/settings` | Technical Settings | settings page | `/api/admin/settings` | Config / readiness | Operational read |
| `/admin/company-builder` | Company Builder | `CompanyBuilderClient` | `/api/admin/company-builder` | Planning blueprints | Operational (planning engine) |
| `/admin/ceo-brief` | CEO Brief | `CeoBriefClient` | `/api/admin/ceo-brief` | Derived brief; no provider synthesis | Operational |
| `/admin/leads` | Leads | `LeadsClient` | leads APIs | Durable leads | Operational |

### Redirect / alias routes (not primary nav)

| Route | Behaviour |
|-------|-----------|
| `/admin` | Overview / redirect into Founder Mode surfaces |
| `/admin/login` | Auth |
| `/admin/agent-network` | → `/admin/agents` |
| `/admin/approvals` | → `/admin/runtime/approvals` |
| `/admin/audit` | → `/admin/runtime/audit` |
| `/admin/submissions`, `/admin/lead-pipeline` | → `/admin/leads` |

---

## 3. Admin API inventory (29 route files)

| Path | Methods | Auth | Project | Mutates | Notes |
|------|---------|------|---------|---------|-------|
| `/api/admin/analytics` | GET | requireAdmin | optional | no | Honest nulls |
| `/api/admin/audit/unified` | GET | requireAdmin | required | no | |
| `/api/admin/ceo-brief` | GET | requireAdmin | optional | no | `providerSynthesis: false` |
| `/api/admin/command-center` | GET | requireAdmin | optional | no | |
| `/api/admin/company-builder` | GET, POST | requireAdmin | scoped | yes | Planning only |
| `/api/admin/execution` | GET, POST | requireAdmin | scoped | yes | Best-effort; no invented tick success |
| `/api/admin/inbox` | GET | requireAdmin | optional | no | |
| `/api/admin/integration` | GET, POST | requireAdmin | scoped | yes | Deterministic simulation + durable proof |
| `/api/admin/integration/proof-diagnostics` | GET | requireAdmin | required | no | |
| `/api/admin/knowledge` | GET | requireAdmin | optional | no | |
| `/api/admin/learning` | GET, POST | requireAdmin | optional | yes | No auto policy rewrite |
| `/api/admin/memory` | GET, POST | requireAdmin | scoped POST | yes | |
| `/api/admin/notifications` | GET | requireAdmin | optional | no | Badges |
| `/api/admin/objectives` | GET, POST | GET admin; POST `START_WORKFLOWS` | required POST | yes | |
| `/api/admin/objectives/[id]` | GET | requireAdmin | required | no | |
| `/api/admin/operations/summary` | GET | requireAdmin | required | no | |
| `/api/admin/outputs` | GET | requireAdmin | optional | no | |
| `/api/admin/overview` | GET | requireAdmin | no | no | Excluded fake KPIs |
| `/api/admin/planning` | GET, POST | requireAdmin | scoped | yes | `executes: false` |
| `/api/admin/real-agent-readiness` | GET | requireAdmin | no | no | Test-double only when asked |
| `/api/admin/runtime/tick` | POST | `MANAGE_JOBS` | no | yes | Real worker tick |
| `/api/admin/session` | POST, DELETE | CSRF/rate-limit | no | yes | Cookie session |
| `/api/admin/settings` | GET | requireAdmin | no | no | |
| `/api/admin/templates` | GET, POST | requireAdmin | optional | yes | Seed catalog |
| `/api/admin/workforce` | GET, POST | requireAdmin | scoped | yes | Simulate flagged |
| `/api/admin/workforce-activation` | GET, POST | requireAdmin | no | plan_team only | Live activate rejected |
| `/api/admin/workforce-activation/preflight` | GET | requireAdmin | no | no | |
| `/api/admin/workforce-readiness` | GET | requireAdmin | no | no | |
| `/api/admin/workforce/bootstrap` | GET, POST | `MANAGE_AGENTS` | no | yes | Confirmation required |

---

## 4. Capability / auth matrix (summary)

| Surface | Unauthenticated | Authenticated admin | Capability-gated mutations |
|---------|-----------------|---------------------|----------------------------|
| All `/admin/*` except login | Redirect login (middleware) | Allowed | — |
| Most `/api/admin/*` | 401 | requireAdmin | — |
| Objectives start | 401 | — | `START_WORKFLOWS` |
| Runtime tick | 401 | — | `MANAGE_JOBS` |
| Workforce bootstrap apply | 401 | — | `MANAGE_AGENTS` |
| Founder Proof final review | 401 | Admin + policy | Manual only; never auto |
| Live provider execution | — | — | Blocked (`liveExecutionReady: false`) |

---

## 5. Actions audit (Phase I.7 changes)

| Finding | Disposition |
|---------|-------------|
| “Live Workforce” label implying live agents | Renamed **Workforce ops** |
| Hardcoded 38/43 fallbacks in Command Center / readiness | Prefer `"—"` when API missing |
| Objectives “PRODUCTION DEPLOY” option | Relabeled as gated metadata (does not deploy) |
| Planning / Execution ephemeral stores | Honesty banners in UI |
| Execution off primary nav | Added under Advanced Ops with **Best-effort** badge |
| Templates seed catalog | Honest catalogue label |
| Learning proposals | Persistence / no auto-apply note |
| Classic dead console-only buttons | None found in primary Admin UI |
| Provider-required actions | Remain disabled/blocked with truthful status |

---

## 6. Project context

- URL `project_id` is authority; `withProjectQuery` on all sidebar links.
- localStorage restores only when URL lacks `project_id`.
- Two-fixture isolation covered in `lib/core/phase-i7-operational-closeout.test.js`.
- Templates catalogue is global (explicitly labeled); project select is link context only.

---

## 7. Tests covering inventory

| Suite | Coverage |
|-------|----------|
| `components/admin/admin-ux-nav.test.js` | Nav uniqueness, Workforce ops, Execution |
| `lib/core/phase-i7-operational-closeout.test.js` | Project isolation, foundation truth, cadence |
| `lib/core/workforce-i2/phase-i6.test.js` | Metric invariants |
| `e2e/admin-routes.spec.js` | Full canonical sidebar Playwright sweep (includes `/admin/execution`) |
| Existing integration / founder-acceptance tests | Proof + multi-project isolation |

---

## 8. Counts (inventory)

| Category | Count |
|----------|-------|
| Primary sidebar routes | 27 (`primaryNavHrefs`) |
| Playwright canonical routes | 31 (includes runtime children) |
| Admin page files | 39 (incl. redirects) |
| Admin API route files | 29 |
| Capability-gated admin mutations | 3 |
| Migrations changed in I.7 | 0 |
