---
title: Document Status Registry
document_status: review
implementation_status: partial
production_status: pilot
verification_status: partially_verified
authority_status: proposed
updated: 2026-08-03
classification: Internal
---

# Document Status Registry

## Status dimensions (separate — do not collapse)

| Dimension | Allowed values |
|-----------|----------------|
| `document_status` | `draft` \| `review` \| `approved` \| `superseded` |
| `implementation_status` | `not_started` \| `partial` \| `implemented` |
| `production_status` | `unavailable` \| `pilot` \| `operational` |
| `verification_status` | `unverified` \| `partially_verified` \| `verified` |
| `authority_status` | `proposed` \| `founder_approved` |

**Rule:** `document_status: approved` or “documentation complete” does **not** imply
`implementation_status: implemented` or `production_status: operational`.

## Registry entries

### doc/README.md

| Field | Value |
|-------|-------|
| document path | `doc/README.md` |
| canonical owner | Documentation / Founder (portal draft) |
| document_status | review |
| implementation_status | partial (describes many unimplemented domains) |
| production_status | pilot (docs accompany pilot platform) |
| verification_status | partially_verified |
| authority_status | proposed |
| source commit | `ed9f5994a8e7e8fa994e5979f888ced9ce416227` (upgrade snapshot) + Stage 1 truth corrections |
| evidence | Stage 1 front matter + current-state notice |
| last verified date | 2026-08-03 |
| next review date | 2026-08-17 |
| notes | Enterprise portal draft; not split in Stage 1; oversized structure is Stage 2 debt |

### doc/complete-roadmap.md

| Field | Value |
|-------|-------|
| document path | `doc/complete-roadmap.md` |
| canonical owner | Founder / Enterprise Architecture (planning) |
| document_status | review |
| implementation_status | partial (planning > built) |
| production_status | unavailable for most future stages |
| verification_status | partially_verified (banner + baseline only) |
| authority_status | proposed |
| source commit | upgrade snapshot on docs branch |
| evidence | Opening banner links to CURRENT-STATE |
| last verified date | 2026-08-03 |
| next review date | 2026-08-17 |
| notes | Master planning monolith; long-term sections are **planned future state**; not split in Stage 1 |

### doc/COMPLETE_PROJECT_TREE.txt

| Field | Value |
|-------|-------|
| document path | `doc/COMPLETE_PROJECT_TREE.txt` |
| canonical owner | Generated artifact (tooling) |
| document_status | draft |
| implementation_status | not_started (n/a — not a product) |
| production_status | unavailable |
| verification_status | unverified (point-in-time snapshot) |
| authority_status | proposed |
| source commit | docs upgrade snapshot |
| evidence | File header/classification in registry + canonical map |
| last verified date | 2026-08-03 |
| next review date | regenerate on demand |
| notes | **Generated artifact**; repository inventory snapshot; **non-canonical**; regenerable; subject to staleness; do not treat as architecture policy |

### AI Workforce

| Field | Value |
|-------|-------|
| document path | `doc/05-workforce/`, `doc/19-ai-workforce/`, capacity registry in code |
| canonical owner | Workforce / Core Runtime |
| document_status | review |
| implementation_status | partial |
| production_status | pilot |
| verification_status | partially_verified |
| authority_status | proposed |
| source commit | main tip including workforce foundation |
| evidence | capacity/persisted 445; allocated/active/live-tested **0** |
| last verified date | 2026-08-03 |
| next review date | 2026-08-17 |
| notes | 445 = planning seats, not active agents |

### AI Operating System

| Field | Value |
|-------|-------|
| document path | `doc/20-ai-operating-system/`, portal/roadmap narratives |
| canonical owner | Product / Architecture |
| document_status | draft |
| implementation_status | partial |
| production_status | pilot |
| verification_status | partially_verified |
| authority_status | proposed |
| evidence | Core runtime + Admin exist; not a fully operational enterprise OS |
| last verified date | 2026-08-03 |
| next review date | 2026-08-17 |
| notes | Do not label complete/autonomous enterprise |

### Memory Engine

| Field | Value |
|-------|-------|
| document path | `doc/21-memory-engine/` |
| canonical owner | AI Platform |
| document_status | draft |
| implementation_status | partial |
| production_status | unavailable |
| verification_status | unverified as operational product |
| authority_status | proposed |
| evidence | Admin memory surfaces exist; not an operational Memory Engine product |
| last verified date | 2026-08-03 |
| next review date | 2026-08-17 |
| notes | **Not operational** |

### Agent Framework

| Field | Value |
|-------|-------|
| document path | `doc/22-agent-framework/`, `lib/core/agents.js` |
| canonical owner | Core Runtime |
| document_status | review |
| implementation_status | partial |
| production_status | pilot |
| verification_status | partially_verified |
| authority_status | proposed |
| evidence | Executable agent definitions exist; activeInstances 0; pilot path disabled |
| last verified date | 2026-08-03 |
| next review date | 2026-08-17 |
| notes | Framework ≠ 445 live agents |

### Scheduler

| Field | Value |
|-------|-------|
| document path | `execution/PHASE-I9-*`, health scheduler contract |
| canonical owner | Platform / Runtime |
| document_status | review |
| implementation_status | implemented (primary path) |
| production_status | operational (Supabase Cron primary) |
| verification_status | verified (primary); GHA fallback delivery pending |
| authority_status | proposed |
| evidence | `supabase_primary_active`, healthy |
| last verified date | 2026-08-03 |
| next review date | 2026-08-17 |
| notes | Do not claim GitHub scheduled delivery verified |

### One-agent OpenAI pilot path

| Field | Value |
|-------|-------|
| document path | `execution/PHASE-II2-OPENAI-LIVE-PILOT-PATH.md`, `lib/core/live-pilot/` |
| canonical owner | Core Runtime / Founder |
| document_status | review |
| implementation_status | implemented (code path) |
| production_status | pilot (disabled) |
| verification_status | partially_verified (code+tests; zero genuine calls) |
| authority_status | proposed |
| evidence | providerName none; genuine calls 0; liveExecutionReady false |
| last verified date | 2026-08-03 |
| next review date | 2026-08-17 |
| notes | Merged path ≠ live run |

### RestaurantOS

| Field | Value |
|-------|-------|
| document path | planning references in roadmap/docs |
| canonical owner | Future industry product |
| document_status | draft |
| implementation_status | not_started (as current product) |
| production_status | unavailable |
| verification_status | unverified |
| authority_status | proposed |
| evidence | Locked order: later “Powered by Mianx.ai” |
| last verified date | 2026-08-03 |
| next review date | TBD |
| notes | Not the current product |

### PoultryOS

| Field | Value |
|-------|-------|
| document path | planning references |
| canonical owner | Future industry product |
| document_status | draft |
| implementation_status | not_started (as current product) |
| production_status | unavailable |
| verification_status | unverified |
| authority_status | proposed |
| evidence | Locked order later |
| last verified date | 2026-08-03 |
| next review date | TBD |
| notes | Not the current product |

### Marketplace

| Field | Value |
|-------|-------|
| document path | `doc/33-marketplace/` |
| canonical owner | Future platform |
| document_status | draft |
| implementation_status | not_started |
| production_status | unavailable |
| verification_status | unverified |
| authority_status | proposed |
| evidence | No operational marketplace |
| last verified date | 2026-08-03 |
| next review date | TBD |
| notes | Planned future capability |

### Global enterprise expansion

| Field | Value |
|-------|-------|
| document path | roadmap long-term sections |
| canonical owner | Founder strategy |
| document_status | draft |
| implementation_status | not_started |
| production_status | unavailable |
| verification_status | unverified |
| authority_status | proposed |
| evidence | Planning only |
| last verified date | 2026-08-03 |
| next review date | TBD |
| notes | Planned future state — not implemented |

## Related

- `doc/CURRENT-STATE.md`
- `doc/CANONICAL-DOCUMENT-MAP.md`
- `doc/DOCUMENTATION-REFACTOR-PLAN.md`
