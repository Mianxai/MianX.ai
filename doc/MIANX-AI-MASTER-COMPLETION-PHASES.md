# MianX.ai — Master Completion Phases

Status: Active planning  
As-of: 2026-08-03  
Repository: Mianxai/MianX.ai  

Locked product order remains:

```text
Mianx Core → AI Runtime → Project Factory → Founder Workspace →
10–12 Core Runtime Agents → End-to-end Beta →
Telepizza and Poultry later, as "Powered by Mianx.ai" products.
```

This document is the compact Founder master plan for completing the platform.
Only items with runtime evidence are marked complete.

---

## Phase 1 — Core Platform Security and Multi-Project Foundation

**Status:** In progress (Draft PR)

Goals:

- Honest single-tenant / multi-project truth documentation
- Trusted server-side tenant / project context
- Platform Admin vs tenant Admin separation
- Admin route authorization matrix
- Service-role inventory and fail-closed patterns
- Cross-tenant (cross-project) regression fixtures
- Optional membership scope migration (Draft only — not applied)
- RLS audit + migration decision without Production apply

Verified complete:

- [x] PR #89 no-credit fail-closed readiness merged (`70b9382…`)
- [x] Production redeploy Ready on merge SHA; `apiKeyConfigured: true` (boolean)
- [x] Live OpenAI execution remains paused (credits not_checked / not funded)
- [x] Phase 1 tenant/authz Draft PR #91 merged (`c7ee986…`); Production verified
- [x] Phase 1 membership-scoped data access PR #92 merged (`92897d6…`); Production verified
- [ ] Optional `admin_memberships` org/project scope migration Founder-applied
- [ ] Phase 1 Step 4 RLS/scope readiness Draft reviewed and merged
- [ ] Phase 1 Step 5 remaining Admin list/export/RLS closeout

Primary docs:

- `doc/PHASE-1-TENANT-ISOLATION-AND-ADMIN-AUTHORIZATION.md`
- `doc/PHASE-1-MEMBERSHIP-SCOPED-DATA-ACCESS.md`
- `doc/PHASE-1-RLS-SCOPE-MIGRATION-READINESS.md` (Step 4 Draft)
- `doc/PHASE-1-RLS-SCOPE-MIGRATION-RUNBOOK.md`
- `doc/CURRENT-STATE.md`

---

## Phase 2 — MianX.ai Operating System and Enterprise Operations

**Status:** Not started

Goals (preview only — do not execute in Phase 1):

- Project Factory and Founder Workspace operational depth
- Enterprise operations surfaces (approvals, audit, workforce ops) at multi-project scale
- Durable rate limits / scheduler honesty already present remain unchanged unless Founder expands
- Expand capability-gated Admin routes across `/api/admin/*` and `/api/core/*`

---

## Phase 3 — Live AI Activation, Pilot Proof and Production Completion

**Status:** Not started — blocked on OpenAI credits + separate Founder authorizations

Goals (preview only — do not execute in Phase 1):

- Separate Founder auth for Models API account-access check
- Billing credit verification (machine) after funding
- One-time live-run authorization + one pilot agent + one bounded task
- Exact one Responses generation under switches enable/disable order
- Evidence review before any live-tested claim
- Founder Final Review remains independent

Related readiness (merged, not activated):

- PR #88 first-live-run readiness packet
- PR #89 no-credit fail-closed billing blockers
- `doc/OPENAI-NO-CREDIT-SAFE-READINESS.md`
- `doc/ONE-AGENT-FIRST-LIVE-RUN-READINESS-PACKET.md`

---

## Hard stops (all phases)

- Never call OpenAI / Models API / Responses without explicit Founder authorization for that step
- Never enable live switches, allocate agents, queue pilot tasks, or create live-run authorizations from agents
- Never apply Production migrations without Founder dry-run + approval
- Never merge to `main` / deploy Production without Founder authorization for that PR
- Never expose API keys, env dumps, or service-role material
