---
title: Canonical Document Map
document_status: review
implementation_status: partial
production_status: pilot
verification_status: partially_verified
authority_status: proposed
updated: 2026-08-03
classification: Internal
---

# Canonical Document Map

## Purpose

Define documentation ownership, authority hierarchy, and duplicate-resolution
rules for the MianX.ai `doc/` tree **before** any large README or roadmap split.

This map does **not** merge, delete, or relocate domain folders. It makes the
current corpus navigable and truthful.

## Canonical source rules

1. **Implementation truth** beats aspirational documentation when they conflict.
2. **Verified Production facts** beat unverified planning claims.
3. **Founder-approved authority** beats proposed drafts for policy decisions.
4. **Generated artifacts** never override written policy or architecture.
5. **Elapsed calendar time** does not complete a stage.
6. **Documentation completeness** does not mean software is implemented or operational.

## Hierarchy of authority

| Rank | Source class | Examples |
|------|----------------|----------|
| 1 | Verified Production / runtime evidence | `/api/core/health`, Admin workforce metrics, scheduler contract, Applied migrations |
| 2 | Execution board + phase closeouts | `execution/EXECUTION-BOARD.md`, phase contracts |
| 3 | Current-state baseline | `doc/CURRENT-STATE.md` |
| 4 | Document status registry | `doc/DOCUMENT-STATUS-REGISTRY.md` |
| 5 | This canonical map | `doc/CANONICAL-DOCUMENT-MAP.md` |
| 6 | Domain READMEs (numbered folders) | `doc/01-governance/`, `doc/19-ai-workforce/`, … |
| 7 | Master planning monoliths | `doc/complete-roadmap.md`, enterprise portal draft `doc/README.md` |
| 8 | Generated inventories | `doc/COMPLETE_PROJECT_TREE.txt` |
| 9 | Archives / raw backups | `backup/docs-upgrade-raw-20260803` (branch; do not modify) |

## Root navigation documents

| Document | Role |
|----------|------|
| `doc/CURRENT-STATE.md` | Verified software + Production baseline |
| `doc/DOCUMENT-STATUS-REGISTRY.md` | Per-document maturity dimensions |
| `doc/CANONICAL-DOCUMENT-MAP.md` | Ownership and authority (this file) |
| `doc/DOCUMENTATION-REFACTOR-PLAN.md` | Controlled future refactor phases |
| `doc/README.md` | Enterprise documentation portal draft (not split in Stage 1) |
| `doc/complete-roadmap.md` | Master planning monolith (planned future state retained) |

## Domain ownership (overlapping pairs)

### 01 Governance vs 30 Enterprise Governance

| Field | Definition |
|-------|------------|
| Owns (01) | Foundational constitution, principles, vision, AI constitution |
| Does Not Own (01) | Day-to-day enterprise compliance operating procedures |
| Owns (30) | Enterprise governance operating model, controls, audit programs |
| Does Not Own (30) | Foundational company constitution |
| Canonical Source | Principles/constitution → `01-governance`; operating governance → `30-enterprise-governance` |
| Dependencies | 30 depends on 01 |
| Implementation Repository | App Admin membership/approvals; runtime audit — not full enterprise GRC product |
| Evidence Source | `CURRENT-STATE.md`, Admin audit surfaces |

### 07 Platform vs 32 Platform Services

| Field | Definition |
|-------|------------|
| Owns (07) | Core platform architecture narrative for Mianx Core |
| Does Not Own (07) | Catalog of every future platform microservice |
| Owns (32) | Broader platform-services catalogue and service boundaries |
| Does Not Own (32) | Claiming all listed services are Production-operational |
| Canonical Source | Runtime platform core → `07-platform` + code under `lib/core/`; service catalogue → `32-platform-services` |
| Dependencies | 32 extends 07 |
| Implementation Repository | `lib/core/`, Next.js app, Supabase |
| Evidence Source | Health API, runtime tick, phase closeouts |

### 08 Data vs 42 Data Platform

| Field | Definition |
|-------|------------|
| Owns (08) | Application data model concepts for current product |
| Does Not Own (08) | Enterprise data lake / warehouse claims |
| Owns (42) | Future enterprise data-platform design |
| Does Not Own (42) | Asserting warehouse/lake is live |
| Canonical Source | Current Postgres/Supabase model → migrations + `08-data`; future → `42-data-platform` |
| Dependencies | 42 depends on 08 for current truth |
| Implementation Repository | `supabase/migrations/` |
| Evidence Source | Migration status, schema health |

### 09 Security vs 41 Security Platform

| Field | Definition |
|-------|------------|
| Owns (09) | Application security baseline (auth, RLS, secrets hygiene) |
| Does Not Own (09) | Full enterprise security platform product |
| Owns (41) | Future security-platform expansion |
| Does Not Own (41) | Claiming SOC/enterprise suite complete |
| Canonical Source | App security → `09-security` + `middleware.js` / auth libs; future → `41-security-platform` |
| Dependencies | 41 depends on 09 |
| Implementation Repository | `lib/admin-auth.js`, `lib/core/auth.js`, RLS migrations |
| Evidence Source | Auth tests, RLS migrations, audit reports |

### 10 DevOps vs 39 Deployment vs 40 Enterprise Operations

| Field | Definition |
|-------|------------|
| Owns (10) | Engineering DevOps practices for this repo |
| Owns (39) | Deployment topology and release procedures |
| Owns (40) | Broader enterprise operations maturity model |
| Does Not Own (any) | Claiming global multi-region enterprise ops are live |
| Canonical Source | CI/release for this app → `10-devops` + `39-deployment`; ops maturity planning → `40-enterprise-operations` |
| Dependencies | 40 depends on 10+39 |
| Implementation Repository | GitHub Actions, Vercel, Supabase Cron |
| Evidence Source | Scheduler health, CI workflows, Production URL |

### 13 API vs 37 API Platform

| Field | Definition |
|-------|------------|
| Owns (13) | Current product/admin/core HTTP APIs |
| Does Not Own (13) | Public developer platform / multi-tenant API marketplace |
| Owns (37) | Future API platform productization |
| Does Not Own (37) | Claiming public API platform operational |
| Canonical Source | Implemented routes → `app/api/` + `13-api`; future platform → `37-api-platform` |
| Dependencies | 37 depends on 13 |
| Implementation Repository | `app/api/` |
| Evidence Source | Route inventory, API tests |

### 14 Quality vs 46 Enterprise Quality

| Field | Definition |
|-------|------------|
| Owns (14) | Engineering quality for this codebase (lint/test/e2e) |
| Does Not Own (14) | Full enterprise quality management system |
| Owns (46) | Future enterprise quality framework |
| Does Not Own (46) | Claiming enterprise QMS operational |
| Canonical Source | Repo quality gates → `14-quality` + CI; future → `46-enterprise-quality` |
| Dependencies | 46 depends on 14 |
| Implementation Repository | Vitest, Playwright, lint/typecheck/build |
| Evidence Source | CI results, local gate runs |

### 17 Templates vs 50 Enterprise Templates

| Field | Definition |
|-------|------------|
| Owns (17 / templates areas) | Practical templates used by contributors and Admin templates surface |
| Does Not Own | Claiming every enterprise template library is Production-complete |
| Owns (50) | Broader enterprise template catalogue planning |
| Canonical Source | In-app templates → Admin Templates + relevant `doc/` template folders; enterprise catalogue → `50-enterprise-templates` |
| Dependencies | 50 extends practical templates |
| Implementation Repository | `lib/` templates + Admin UI |
| Evidence Source | Admin Templates page, tests |

## Implementation truth sources

- `doc/CURRENT-STATE.md`
- `execution/EXECUTION-BOARD.md`
- Runtime health / Admin workforce / scheduler view models
- `supabase/migrations/` (applied vs pending)
- Phase contracts under `execution/`

## Roadmap truth sources

- Current stage and blockers → `CURRENT-STATE.md` + execution board
- Long-term planned stages → `doc/complete-roadmap.md` (planned future state)
- Locked product build order → root `README.md` / `AGENTS.md` (platform-first)

## Generated artifacts

| Artifact | Classification |
|----------|----------------|
| `doc/COMPLETE_PROJECT_TREE.txt` | Generated repository inventory snapshot; **non-canonical**; regenerable; subject to staleness |

## Archives

| Archive | Rule |
|---------|------|
| `backup/docs-upgrade-raw-20260803` | Raw preserved upgrade; **do not modify or delete** |

## Evidence sources

- Production: https://mian-x-ai.vercel.app
- Scheduler: Supabase Cron primary (`supabase_primary_active`)
- Workforce metrics: capacity/persisted/allocated/active/live-tested
- Provider: `providerName: none` until Founder configures
- Founder Proof: `awaiting_final_review`

## Supersession rules

1. A document marked `document_status: superseded` must name its successor.
2. Implementation claims require `verification_status` of `partially_verified` or `verified` plus evidence.
3. Planning monoliths may remain large; they cannot silently override `CURRENT-STATE.md`.
4. Duplicate domain folders are **not** deleted in Stage 1 — ownership is declared here first.

## Duplicate-resolution procedure

1. Identify the overlapping pair in this map.
2. Read **Owns / Does Not Own / Canonical Source**.
3. Prefer implementation evidence for “is it built?” questions.
4. Prefer the canonical owner for “where should new content go?”
5. Record conflicts in `DOCUMENT-STATUS-REGISTRY.md` notes.
6. Defer physical merges/splits to later refactor phases in `DOCUMENTATION-REFACTOR-PLAN.md`.
