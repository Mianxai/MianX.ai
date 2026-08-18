# Phase F — Planning Intelligence Engine

Status: Implemented in code. Migration **not applied**.

## Purpose

Transforms Template Intelligence into a Founder-gated planning layer that decides
**how** a company should be built — structure, roadmap, WBS, and execution preview —
without executing work or building industry products.

## Flow

Founder objective → Template Intelligence → Planning Intelligence →
(Founder approval) → Phase G Execution Intelligence (future)

## Key paths

- `lib/core/planning-intelligence/`
- `supabase/migrations/20260728190000_phase_f_planning_intelligence.sql`
- `/admin/planning` + `/api/admin/planning`
- Company Builder planning workspace tabs

## Rules

- Planning only — `executes: false`
- No fabricated agent runs
- No RestaurantOS / PoultryOS / HospitalOS / SchoolOS product builds
- Learning never auto-modifies approved plans
