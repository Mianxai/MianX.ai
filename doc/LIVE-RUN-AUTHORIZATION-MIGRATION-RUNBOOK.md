---
title: Live-Run Authorization Migration Runbook
document_status: active
implementation_status: applied
production_status: applied
verification_status: verified_post_apply
authority_status: founder_applied
as_of: 2026-08-03
classification: Internal
---

# Live-run authorization storage — migration application runbook

Migration **applied** to linked Production on 2026-08-03 under explicit Founder
authorization. Checksum
`82b8223a1736467d6ee66b0ddf6c36192b6ac6b5d7108d9e8165adfd19e820b8`.
Provider remains `none`. No real authorization rows. Switches remain off.

**Do not re-apply.** Linked dry-run after apply reports `upToDate: true`.

Historical phases below remain for audit. Post-apply truth: store available,
provider none, Models/generation 0, switches false, agents 0/0/0, Founder
Proof unchanged, Founder Final Review not approved.

Manifest: `doc/LIVE-RUN-AUTHORIZATION-MIGRATION-MANIFEST.md`  
Checksum: `82b8223a1736467d6ee66b0ddf6c36192b6ac6b5d7108d9e8165adfd19e820b8`  
Pre-apply script: `node scripts/verify-live-run-auth-migration-preapply.mjs`  
Post-apply script: `node scripts/verify-live-run-auth-migration-postapply.mjs`  
Ephemeral CI: `.github/workflows/ci.yml` job `Live-run Auth Migration DB`  
Rollback SQL: `supabase/rollbacks/20260803120000_pilot_live_run_authorizations.rollback.sql`

## Phase 0 — Founder approval

| Field | Value |
|-------|-------|
| Authorization | Founder explicit approve to apply this single migration |
| Mutation | None yet |
| Stop | Approval missing |
| Evidence | Written Founder approval referencing checksum `82b8223a…` |

## Phase 1 — Exact main / deployment verification

Confirm Production alias https://mian-x-ai.vercel.app serves the intended
merge commit that includes the fail-closed control plane (PR #85 lineage).
Confirm app reports `authorization_store_unavailable` / `not_applied`.

## Phase 2 — Database backup / PITR confirmation

Founder confirms Supabase PITR / backup posture in the host console.
Agents must not claim backup status without a safe queryable source.

## Phase 3 — Read-only migration dry-run

```bash
npx supabase db push --linked --dry-run
# or
MIANX_RUN_LINKED_DRY_RUN=1 node scripts/verify-live-run-auth-migration-preapply.mjs
```

Expect exactly one pending migration:
`20260803120000_pilot_live_run_authorizations.sql`

Stop on unexpected pending migrations or history inconsistency.

## Phase 4 — Maintenance and switch-off confirmation

Confirm `LIVE_AGENT_EXECUTION_ENABLED` and `LIVE_AGENT_PILOT_ENABLED` are off.
Arm kill switch if any pilot work could be in flight.
No OpenAI key required for this migration.

## Phase 5 — Apply exactly one migration

Founder-only. Example (Founder runs, not agents):

```bash
npx supabase db push --linked
```

Apply **only** after dry-run review. Do not repair history. Do not reset.

## Phase 6 — Schema / RLS / grant verification

Verify table, CHECKs, partial unique index, RLS enabled, anon/authenticated
revoked, service_role grants, SECURITY DEFINER consume function + search_path.

## Phase 7 — Application health verification

Public `/api/core/health` remains healthy. Scheduler remains
`supabase_cron` / `supabase_primary_active` / healthy.

## Phase 8 — Authorization-store availability verification

```bash
node scripts/verify-live-run-auth-migration-postapply.mjs
```

Expect store `available` only after apply. Still `providerCallAllowed: false`.

## Phase 9 — No-provider / no-agent state verification

| Item | Required |
|------|----------|
| providerName | none |
| Models API calls | 0 |
| generation calls | 0 |
| switches | false |
| allocated/active/live-tested | 0/0/0 |
| Founder Proof | awaiting_final_review |
| Founder Final Review | not approved |

## Phase 10 — Rollback or acceptance decision

See rollback classes below. Prefer acceptance when Phases 6–9 pass.
Prefer forward-fix after first real authorization row exists.

---

## Rollback classes

### 1. Pre-use rollback (no real authorization rows)

- Switch-off confirmed
- Write freeze (no Admin authorization issuance)
- Run rollback SQL (refuses if table non-empty)
- Re-verify fail-closed `authorization_store_unavailable`
- App remains compatible

### 2. Post-use rollback (authorization/evidence rows exist)

- **Do not drop** evidence-bearing tables without archival/export plan
- Prefer forward-fix
- Export authorization + related pilot_runs/evidence first
- Incident owner: Founder
- Verification: provider still none; no second consume possible

Manual switch-off (app cannot mutate Vercel env):

1. Unset/set false `LIVE_AGENT_EXECUTION_ENABLED` and `LIVE_AGENT_PILOT_ENABLED`
2. Arm Admin kill switch
3. Retain historical evidence
4. Do not un-consume authorizations
