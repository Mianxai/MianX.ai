# MianX AI Workforce Canonical Registry

Source-controlled organizational architecture for the MianX AI workforce.

## What this is

- **445 planned role slots** across **20 departments** (from `AGENT-CAPACITY-BASELINE.md`)
- Machine-readable departments, hierarchy, activation policy, and implementation waves
- Honest **capacity reserves** where named inventories do not yet exist

## What this is not

- Not 445 always-on processes
- Not a replacement for `lib/core/agents.js` (executable runtime agents)
- Not permission to invent filler specialist names
- Not a rewrite of the 4,466 historical `doc/` files

## Model

```text
Agent Definition (this registry)
  → Agent Instance (project-scoped activation)
    → Active Execution (temporary worker/run)
```

## Key modules

| File | Purpose |
|---|---|
| `departments.js` | 20 departments + missions/boundaries |
| `definitions.js` | Named roles + capacity reserves |
| `hierarchy.js` | L0–L5 reporting / cycle checks |
| `activation.js` | Project activation classes + safety |
| `waves.js` | Implementation waves 0–6 |
| `reconciliation.js` | 258+ vs 445 evidence |
| `validate.js` | Structural invariants |

## Validation

```bash
npx vitest run lib/workforce/workforce.test.js
```
