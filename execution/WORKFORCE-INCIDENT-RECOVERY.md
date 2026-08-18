# Workforce Incident Recovery

## Symptoms → actions

1. **Queue stuck / no ticks** — confirm scheduler secret + Run tick; check `/api/core/health` runtime.lastTickAt.  
2. **Lease expiry** — overlapping ticks should not double-run; expired leases return seats to available. Re-run verify.  
3. **Provider 503 / not configured** — confirm `OPENROUTER_API_KEY` on host; free-only still true; paid fallback false.  
4. **No free model** — message must state no request was sent; do not enable paid fallback.  
5. **Cross-project access** — fail closed; audit log; do not widen RLS.  
6. **Self-approval attempt** — QA must use independent reviewer seat.  
7. **Bootstrap drift** — re-run `npm run workforce:bootstrap` (idempotent); second run created=0.  
8. **Live test accident in CI** — live commands refuse CI/Preview; rotate key if leaked (Founder).  

Never claim all 445 seats live-tested after one smoke test.
