# Phase 1 completion checklist

As-of: 2026-08-03  
Phase 1 status: **ready_for_final_verification**

Do **not** mark Phase 1 `complete` without explicit Founder sign-off after final verification.

| Gate | State |
|------|-------|
| Step 2 merged + deployed | yes (`c7ee986…`) |
| Step 3 merged + deployed | yes (`92897d6…`) |
| Step 4 merged + deployed | yes (`c6a273a…`) |
| Step 5 merged + deployed | yes (`2d9b486…` / PR #94) |
| Linked dry-run exit 0 (exact pending migration) | yes (pre-apply) |
| Scope migration applied on Production | **yes** (`20260803180000…`, checksum `6ae5e956…`) |
| Post-apply catalog / membership preservation | **yes** — see `doc/PHASE-1-POST-MIGRATION-VERIFICATION.md` |
| High-risk list endpoints require project scope | yes (runs/approvals/audit/jobs/analytics) |
| Remaining exports/search/job mutate-by-id | classified **B** (not active high-risk leak) |
| JWT membership RLS policies | classified **B** (absent; app authz remains) |
| Route matrix covers Admin tree (Vitest) | yes |
| Cross-tenant regression suite | yes (fixtures + handler + ephemeral SQL) |
| Audit ACCESS_DENIED action code present | yes (writes still optional/best-effort) |
| Production healthy post-migration | yes |
| OpenAI dependency / live switches | unchanged / off |
| Founder signs Phase 1 completion | **not signed** |

## Allowed status values

- `incomplete`
- `ready_for_migration_rollout`
- `ready_for_final_verification` ← **current**
- `complete` (Founder only after final verification + explicit sign-off)

## Next Founder actions

1. Review this post-migration final-verification Draft PR (do not self-merge as completion).
2. Confirm authenticated Admin smoke on Production when safe credentials are available.
3. Sign Phase 1 completion only when every gate above is accepted — this PR must not auto-approve sign-off.
4. Do **not** begin Phase 2 until Phase 1 is explicitly signed complete.
