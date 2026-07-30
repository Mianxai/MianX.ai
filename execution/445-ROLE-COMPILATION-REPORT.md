# 445-Role Compilation Report

**Source:** `lib/workforce/definitions.js` + runtime catalogue (`lib/core/agents.js`)  
**Compiler:** `lib/core/real-agent/role-compilation.js`  
**Fabrications:** **0**

## Measured totals

| Metric | Value |
|--------|------:|
| Documented capacity (`PLANNED_ROLE_SLOT_TOTAL`) | 445 |
| Planned slot contribution (definitions sum) | 445 |
| Named definition count (non-reserve rows) | 54 |
| Capacity-reserve slots (unresolved named inventory) | 291 |
| Canonical role records compiled | 92 |
| — executive | 11 |
| — manager | 1 |
| — specialist | 45 |
| — runtime_catalogue | 35 |
| Named role slots covered (non-runtime) | 157 |
| Departments covered | 20 |
| Fabricated filler personas | 0 |

## Honest gap statement

Documentation supports **92** named/runtime role records covering **157** named slots.  
**291** capacity-reserve slots remain unresolved named inventory — reported as gaps, **not** invented personas.

Note: 157 + 291 = **448**, three above the 445 baseline, due to existing `capacitySlots` arithmetic on named definitions vs reserves. This PR does **not** invent or delete roles to force a cosmetic 445 named list.

## Each compiled role includes

stable ID, name, department, level, reportsTo, responsibilities, capabilities, tool permissions, prohibited tools, I/O/evidence contracts, memory/learning policy, provider requirements, risk limits, approval gates, project-instance support, source document references.

## Source references

- `doc/19-ai-workforce/` (capacity baseline, C-Suite registry, department materials)
- `doc/20-ai-operating-system/`
- Governance / Prompt OS materials as cited in definitions
- `lib/workforce/definitions.js`
- `lib/core/agents.js`
