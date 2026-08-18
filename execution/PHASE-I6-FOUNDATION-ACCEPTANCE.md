# Phase I.6 — Foundation acceptance matrix

**Branch:** `cursor/phase-i6-foundation-truth-closeout`
**Base main:** `dccec77b79376969d291939c6b4386b46b44d51a`

## A. Foundation acceptance

| Item | Status | Evidence |
|------|--------|----------|
| Canonical metric dictionary | Verified | `execution/PHASE-I6-FOUNDATION-METRIC-DICTIONARY.md` |
| Shared metrics builder | Verified | `lib/core/workforce-i2/foundation-metrics.js` + `phase-i6.test.js` |
| compiledSeats ≠ namedRoleRegistry (92) | Verified | contract test + Playwright readiness assertions |
| Catalogue 43 vs executable 38 labeled distinctly | Verified | UI cards `wr-catalogue-entries` / `wr-executable-count` |
| Cross-surface capacity invariants | Verified | `phase-i6.test.js` shared metrics fixture |
| Workforce Setup AdminShell + post-bootstrap truth | Verified | PR #72 + Playwright Setup route |
| Workforce Readiness AdminShell + capacity truth | Verified | client + Playwright readiness test |
| Core health foundation fields | Verified | health uses `buildFoundationMetrics` |
| Readiness refresh wording (no live implication) | Verified | “Refresh Foundation Readiness” + disclaimer |
| Readiness refresh no provider call / no DB mutation | Verified | API `providerCallsMade: false`, `mutatesDatabase: false` |
| Idempotency fixture (created 0 / persisted 445) | Verified | `phase-i6.test.js` |
| Auth route smoke (canonical admin routes) | Verified | Playwright `admin-routes.spec.js` |
| Lint / typecheck / build | Verified | quality gates |
| Browser harness 5/5 | Verified | `npm run verify:browser` |
| Playwright full suite | Verified | full run |
| Production audit 0 | Verified | `npm audit --omit=dev` |

## B. Live AI execution acceptance

| Item | Status | Note |
|------|--------|------|
| Provider configured | Blocked | OPENROUTER intentionally absent |
| Controlled real provider call | Blocked | not run |
| Durable queued live execution | Blocked | |
| Valid lease for live work | Blocked | |
| Safe tool call with evidence | Blocked | |
| Independent QA of live run | Blocked | |
| Isolation result for live run | Blocked | |
| liveExecutionReady true | Blocked | remains false |
| AI Software House live acceptance | Blocked | |

## Routes audited

### Founder

| Route | Status | Notes |
|-------|--------|-------|
| `/admin` → command-center | Verified | existing AdminShell |
| `/admin/projects` | Verified | smoke |
| `/admin/objectives` | Verified | smoke |
| `/admin/integration` (Founder Proof) | Verified | smoke |
| `/admin/inbox` | Verified | smoke |

### Workforce

| Route | Status | Notes |
|-------|--------|-------|
| `/admin/workforce-activation` | Verified | Setup; metrics already correct |
| `/admin/workforce-readiness` | Verified | **changed** — compiled seats + catalogue split |
| `/admin/workforce` (Live Workforce) | Verified | smoke / capacity cards |
| `/admin/agents` | Verified | smoke |
| `/admin/departments` | Verified | smoke |
| `/admin/workflows` | Verified | smoke |
| `/admin/schedule` | Verified | smoke |

### Results

| Route | Status |
|-------|--------|
| `/admin/outputs` | Verified |
| `/admin/analytics` | Verified |
| `/admin/knowledge` | Verified |
| `/admin/memory` | Verified |
| `/admin/learning` | Verified |
| `/admin/templates` | Verified |
| `/admin/planning` | Verified |

### Advanced Operations

Covered by Playwright canonical route sweep (`/admin/runtime*` , `/admin/settings`, `/admin/leads`, `/admin/company-builder`, `/admin/ceo-brief`).

## Routes changed in this PR

- Workforce Readiness client + API
- Real-agent readiness API (foundation attachment + naming)
- Workforce activation API (foundation builder)
- Core health (foundation builder)
- Shared `foundation-metrics.js`
- Playwright mocks/assertions for readiness truth

## Routes unchanged (already passing)

Live Workforce, Agents, Departments, Workflows, Schedule, Founder surfaces, Results surfaces — shell/nav already correct; no redesign.
