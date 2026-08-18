# 445 Workforce — Production Deployment

## Exact Founder sequence

1. Merge the approved Phase I.3 Draft PR into `main` (expected-head protection).  
2. Pull `main` locally.  
3. Review migrations dry-run: `npx supabase db push --dry-run`  
4. Apply pending migrations only after review (I.2 registry + I.3 RLS).  
5. Deploy production host (Founder-operated).  
6. Confirm `/api/core/health` responds (no secrets).  
7. Run `npm run workforce:bootstrap` against production DB.  
8. Run `npm run workforce:verify` — expect 445/445, live-tested 0.  
9. Configure OpenRouter: `scripts/configure-openrouter-production.sh`  
10. Redeploy so env vars load.  
11. Run controlled activation: `scripts/run-controlled-workforce-activation.sh <disposable-uuid>`  
12. Optionally run software-house acceptance on another disposable project.  

Helper (interactive, Founder-only): `scripts/phase-i3-production-activation.sh`  
**Agents must not run this script.**

## Truth before live test

- 445 / 445 capacity seats ready to allocate  
- LIVE TESTED: 0  
- Blocked only by merge + migration + API key + controlled test  
