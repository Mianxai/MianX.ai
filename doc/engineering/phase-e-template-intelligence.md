# Phase E — Template Intelligence Engine

Status: Implemented in code (catalog + engines + Admin UI). Migration **not applied**.

## Purpose

Reusable template intelligence for industries, business models, capabilities, modules,
workflows, compliance packs, architecture patterns, risks, and KPIs.

Does **not** build RestaurantOS, PoultryOS, HospitalOS, or any complete industry product.

## Flow

Founder objective → parse → template match → capabilities → departments → modules →
workflows → risks/compliance → CEO plan → department plans → backlog → approval

## Key paths

- `lib/core/template-intelligence/`
- `supabase/migrations/20260728180000_phase_e_template_intelligence.sql`
- `/admin/templates` + `/api/admin/templates`

## Provider

Deterministic catalog logic works without `ANTHROPIC_API_KEY`. Do not claim AI completion.
