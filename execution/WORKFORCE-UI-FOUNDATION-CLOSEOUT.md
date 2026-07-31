# Workforce UI foundation closeout

**Branch:** `cursor/workforce-ui-foundation-closeout`
**Base main:** `082a61dddf71a5689a85b488f1495beb0937ea60` (PR #71 merge)

## Verified Production bootstrap truth (do not mutate)

- persistedSeats / readyToAllocateSeats: 445
- allocated / activeInstances / liveTested: 0
- departments 20 · archetypes 148 · workflow families 13
- durable DB/queue/lease/rate-limit: true
- provider: none · liveExecutionReady: false

## Issues fixed

1. `/admin/workforce-activation` and `/admin/workforce-readiness` rendered
   `FounderPageLayout` without `AdminShell` — no left sidebar.
2. Checklist used `<ol>` CSS numbering **and** an explicit `N.` text prefix → `1. 1.`
3. Narrow `dl` metric column / sparse card spacing / Bootstrap still primary after 445 seats.

## Root causes

- **AdminShell:** pages omitted the shared shell (unlike Live Workforce client).
- **Numbering:** dual numbering mechanisms in activation checklist.

## Post-bootstrap action state

- Bootstrap button → disabled **Bootstrap complete**
- Idempotency Verification → recommended primary next step
- Preflight + Refresh remain available

## Founder verification after merge

1. Open Production `/admin/workforce-activation` — confirm sidebar + no `1. 1.`
2. Confirm metrics: persisted/ready 445 · allocated/active/live-tested 0 · provider unconfigured
3. Confirm Bootstrap complete (disabled) · Idempotency enabled
4. Open `/admin/workforce-readiness` — same shell · foundation vs live split
5. Do **not** run Production bootstrap again; optional: Founder may run Idempotency Verification manually after merge (not performed in this PR)
