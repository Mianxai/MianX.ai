# AI Software House Acceptance Runbook

**Do not run from Cursor or CI until Founder authorizes a live disposable project.**

## Objective (fixed)

> Create a production-safe technical specification for a simple internal status-page module. Produce requirements, architecture, test plan, security review and release proposal. Do not deploy.

## Required route

1. Executive Orchestrator  
2. Product Owner  
3. Requirements Analyst  
4. Solution Architect  
5. Engineering Planner  
6. QA Reviewer  
7. Security Reviewer  
8. Release Readiness Reviewer  

## Exact steps

1. Complete controlled live activation check first (one smoke path).
2. Create a clearly labelled disposable project (e.g. `RC-E2E-SOFTWARE-HOUSE`).
3. Confirm budgets: requests ≤ configured cap, free-only, paid fallback false.
4. Run:
   ```bash
   npm run workforce:software-house-acceptance -- --project <uuid> --confirm
   ```
5. Review outputs: objective classification, team allocation, requirements, acceptance criteria, architecture, task graph, test plan, security review, QA verdict, release proposal, evidence pack, memory/learning candidates, Founder review package.
6. Deny or approve only protected decisions via Founder Inbox — never auto-approve release.
7. Delete/archive the disposable project when finished.

## Must not happen

- Modify a real production repository
- Deploy
- Send email / contact customers
- Spend beyond request/token budget
- Auto-approve release
- Mutate Founder Proof (`61d3b1fd-c260-479b-9289-0c75f977e892`) without explicit override
