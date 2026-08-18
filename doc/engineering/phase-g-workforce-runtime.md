# Phase G — Real Autonomous Workforce Activation

Status: Implemented in code. Migration **not applied**.

## Purpose

Activate the existing **36 executable agents** as a collaborative workforce with
lifecycle, delegation, collaboration, simulation, and Founder control.

Does **not** invent filler agents. Does **not** auto-complete Founder approvals.
Simulation never calls a paid provider or mutates production.

## Key paths

- `lib/core/workforce-runtime/`
- `supabase/migrations/20260728200000_phase_g_workforce_runtime.sql`
- `/admin/workforce` + `/api/admin/workforce`

## Flow

Planning (Phase F) → Workforce Runtime (Phase G) → Founder gates → (future live provider)
