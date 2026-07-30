# Production Readiness Checklist (Phase I)

## CORE

- [ ] Database / Supabase configured
- [ ] Authentication + admin memberships
- [ ] Project isolation enforced
- [ ] Audit trail writable
- [ ] Health endpoint truthful

## WORKFORCE

- [x] Agent definitions catalogued (43)
- [x] Executable coverage (38) — no filler agents
- [x] Routing paths for all canonical workflows
- [x] Instance lifecycle (proposed → archived)
- [x] Hierarchical delegation bounds + tests

## AUTOMATION

- [ ] Scheduler secret configured (Founder)
- [ ] External/Vercel cron → `/api/internal/runtime/tick` (Founder)
- [x] Queue claim/lease/retry/dead-letter implemented
- [ ] Durable rate limit (`RATE_LIMIT_DURABLE_URL` + token) optional — honest when unset

## INTELLIGENCE

- [ ] Anthropic optional — Level-1 works without it
- [x] Memory lifecycle (candidate → archived)
- [x] Learning lifecycle (proposed → promoted/rejected)
- [x] Templates + planning intelligence present

## GOVERNANCE

- [x] Founder approvals required for protected actions
- [x] `production_deployment` Founder-only
- [x] Evidence / Proof Pack human summary
- [x] Security + project isolation tests

## Quality gates (run before merge)

- [ ] `npx vitest run`
- [ ] Browser harness / Chrome harness (as applicable)
- [ ] `npx playwright test`
- [ ] `npm run lint`
- [ ] typecheck (if configured)
- [ ] `npm run build`
- [ ] `npm audit --omit=dev`
- [ ] `npm audit` (full, no --force)

## Agent must never

- Merge to main / deploy production without Founder approval
- Mutate production Founder Proof
- Approve/reject Founder Final Review
- Configure or call Anthropic from this phase
- Apply production migrations
