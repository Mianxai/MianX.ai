---
title: Documentation Refactor Plan
document_status: review
implementation_status: partial
production_status: unavailable
verification_status: partially_verified
authority_status: proposed
updated: 2026-08-03
classification: Internal
---

# Documentation Refactor Plan

Controlled future work. **Only Phase 1 is executed in the Stage 1 PR.**
Phases 2–6 require separate Founder authorization.

## Phase 1 — Canonical map, status registry, current baseline

| Field | Content |
|-------|---------|
| Objective | Make docs navigable and truthful without splitting monoliths |
| Files affected | `CURRENT-STATE.md`, `DOCUMENT-STATUS-REGISTRY.md`, `CANONICAL-DOCUMENT-MAP.md`, `DOCUMENTATION-REFACTOR-PLAN.md`, truth banners in `README.md` + `complete-roadmap.md` |
| Migration method | Additive docs + metadata/banner edits only |
| Knowledge-loss prevention | No content deletion; backup branch untouched |
| Redirect/reference strategy | Root links among Stage 1 documents |
| Validation | `scripts/verify-docs-canonicalization-stage1.mjs` + existing npm gates |
| Rollback | Revert Stage 1 commit; restore prior front matter |
| Approval requirement | Founder review of Draft PR |

**Status:** in progress / this PR.

## Phase 2 — README reduction and navigation extraction

| Field | Content |
|-------|---------|
| Objective | Extract navigation/index from `doc/README.md` without knowledge loss |
| Files affected | `doc/README.md`, new nav index files under `doc/` |
| Migration method | Move sections to new files; leave stubs/links in README |
| Knowledge-loss prevention | Diff word-count floors; no orphaned section deletion |
| Redirect/reference strategy | README becomes portal + links |
| Validation | Link checker for extracted paths; registry update |
| Rollback | Restore monolith from git / backup branch |
| Approval requirement | Explicit Founder authorization |

**Do not execute in Stage 1.**

## Phase 3 — Master roadmap split into stage files

| Field | Content |
|-------|---------|
| Objective | Split `complete-roadmap.md` into stage-scoped files |
| Files affected | `complete-roadmap.md`, new `doc/roadmap/stage-*.md` (names TBD) |
| Migration method | Cut by stage headings; retain master TOC |
| Knowledge-loss prevention | Byte/section inventory before/after |
| Redirect/reference strategy | Master file becomes index |
| Validation | Stage files cover Stage 1–N headings; planned labels preserved |
| Rollback | Restore monolith from git / backup |
| Approval requirement | Explicit Founder authorization |

**Do not execute in Stage 1.**

## Phase 4 — Domain and industry roadmap extraction

| Field | Content |
|-------|---------|
| Objective | Extract industry/domain roadmaps (RestaurantOS, PoultryOS, marketplace, etc.) |
| Files affected | Roadmap extracts + domain folders |
| Migration method | Extract with ownership from canonical map |
| Knowledge-loss prevention | Registry entries before move |
| Redirect/reference strategy | Cross-links from stage files |
| Validation | Industry docs marked `not_started` / planned |
| Rollback | Restore from git |
| Approval requirement | Explicit Founder authorization |

**Do not execute in Stage 1.**

## Phase 5 — Deduplication and ownership enforcement

| Field | Content |
|-------|---------|
| Objective | Resolve duplicate domain pairs using the canonical map |
| Files affected | Overlapping `01`/`30`, `07`/`32`, etc. |
| Migration method | Designate canonical; mark superseded; **no silent deletes** |
| Knowledge-loss prevention | Supersession pointers required |
| Redirect/reference strategy | “See canonical” banners |
| Validation | Registry `superseded` rows + link integrity |
| Rollback | Restore superseded bodies from git |
| Approval requirement | Explicit Founder authorization |

**Do not execute in Stage 1.**

## Phase 6 — Automated documentation validation

| Field | Content |
|-------|---------|
| Objective | CI-friendly docs validation beyond Stage 1 script |
| Files affected | `scripts/`, CI workflow (Founder-approved) |
| Migration method | Expand validators; optional link/front-matter lint |
| Knowledge-loss prevention | Validators must not rewrite corpus |
| Redirect/reference strategy | n/a |
| Validation | CI job green on docs PRs |
| Rollback | Disable workflow job |
| Approval requirement | Explicit Founder authorization |

**Do not execute in Stage 1.**

## Stage 1 debt record (do not silently delete)

- `doc/README.md` is oversized; possible duplicate structural endings / completion markers remain in-body for Stage 2 extraction.
- `doc/complete-roadmap.md` remains a planning monolith (~hundreds of thousands of lines).
- Domain folder overlaps remain until Phase 5.
- `COMPLETE_PROJECT_TREE.txt` remains a stale-prone generated snapshot.
