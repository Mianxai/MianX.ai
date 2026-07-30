# 445-Seat Capacity Registry Report

| Metric | Value |
|--------|------:|
| Authoritative capacity | 445 |
| Mapped seats | 445 |
| Orphan seats | 0 |
| Invalid seats | 0 |
| Primary seats | (named definition expansions) |
| Reserve pool seats | (department team pools) |
| Fabrications | 0 |

Every reserve seat maps to a department team pool archetype (`expansionCategory: department_team_capacity_pool`) sourced from `lib/workforce/departments.js` teams + AGENT-CAPACITY-BASELINE.

Department totals match Founder baseline (Leadership 11 … Analytics 16) summing to 445.

Compiler: `lib/core/workforce-i2/seats.js`  
Invariant check: `assertSeatRegistryInvariants()`
