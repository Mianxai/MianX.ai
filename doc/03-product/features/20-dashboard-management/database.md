````markdown
---
id: FEAT-020-DB
title: Dashboard Management Database Design
version: 1.0.0
status: Draft

feature: FEAT-020

owner:
  database: Database Engineering Team
  backend: Backend Engineering Team
  platform: Platform Engineering Team

reviewers:
  - Product Team
  - Platform Architecture Team
  - Backend Team
  - QA Team

created: 2026-07-05
updated: 2026-07-05

category: Database

tags:
  - dashboard
  - database
  - widgets
  - personalization
  - enterprise
---

# Dashboard Management Database Design

> This document defines the persistence model, schema, relationships, indexing strategy, validation rules, and scalability considerations for Dashboard Management.

---

# Purpose

Dashboard Management stores dashboard definitions, widget configurations, user personalization, layouts, refresh preferences, and dashboard metadata.

Business data displayed inside widgets remains owned by the originating modules (Projects, Tasks, Reports, Notifications, etc.). The dashboard database stores only configuration and presentation metadata.

---

# Design Principles

The persistence layer shall be:

- Normalized
- Multi-Tenant Aware
- Extensible
- Versionable
- Audit Friendly
- Scalable
- Backward Compatible

---

# Core Tables

## dashboards

Stores dashboard definitions.

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary key |
| code | VARCHAR(100) | Unique dashboard identifier |
| name | VARCHAR(255) | Dashboard name |
| description | TEXT | Dashboard description |
| dashboard_type | VARCHAR(50) | Personal, Workspace, Organization, Project |
| default_role | VARCHAR(100) | Optional default role |
| is_system | BOOLEAN | Platform-managed dashboard |
| active | BOOLEAN | Enabled status |
| version | INTEGER | Configuration version |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update |

---

## dashboard_widgets

Stores widget definitions attached to dashboards.

| Column | Type |
|---------|------|
| id | UUID |
| dashboard_id | UUID |
| widget_type | VARCHAR |
| widget_key | VARCHAR |
| title | VARCHAR |
| data_source | VARCHAR |
| configuration_json | JSONB |
| refresh_interval | INTEGER |
| default_position | JSONB |
| default_size | JSONB |
| active | BOOLEAN |
| created_at | TIMESTAMP |

---

## user_dashboard_preferences

Stores per-user dashboard personalization.

| Column | Type |
|---------|------|
| id | UUID |
| user_id | UUID |
| dashboard_id | UUID |
| layout_json | JSONB |
| visible_widgets | JSONB |
| widget_order | JSONB |
| default_dashboard | BOOLEAN |
| updated_at | TIMESTAMP |

Each user has isolated dashboard preferences.

---

## dashboard_filter_presets

Stores reusable dashboard filter presets.

| Column | Type |
|---------|------|
| id | UUID |
| user_id | UUID |
| dashboard_id | UUID |
| preset_name | VARCHAR |
| filters_json | JSONB |
| created_at | TIMESTAMP |

---

## widget_refresh_history

Stores widget refresh metadata.

| Column | Type |
|---------|------|
| id | UUID |
| widget_id | UUID |
| refreshed_by | UUID |
| refresh_type | VARCHAR |
| duration_ms | INTEGER |
| status | VARCHAR |
| refreshed_at | TIMESTAMP |

---

## dashboard_views

Stores dashboard access statistics.

| Column | Type |
|---------|------|
| id | UUID |
| dashboard_id | UUID |
| viewed_by | UUID |
| viewed_at | TIMESTAMP |
| session_id | UUID |

Supports future usage analytics.

---

## shared_dashboards (Future)

Reserved for dashboard sharing.

| Column | Type |
|---------|------|
| id | UUID |
| dashboard_id | UUID |
| shared_by | UUID |
| shared_with | UUID |
| permission | VARCHAR |
| created_at | TIMESTAMP |

Not implemented in Version 1.

---

## dashboard_templates (Future)

Stores reusable dashboard templates.

| Column | Type |
|---------|------|
| id | UUID |
| name | VARCHAR |
| template_json | JSONB |
| created_at | TIMESTAMP |

---

# Relationships

```text
dashboards
      │
      ├───────────────┐
      ▼               ▼
dashboard_widgets   user_dashboard_preferences
      │               │
      ▼               ▼
widget_refresh_history
      │
      ▼
dashboard_views

(Future)

dashboards
      │
      ├───────────────┐
      ▼               ▼
shared_dashboards   dashboard_templates
```

---

# Multi-Tenant Strategy

Every user-specific configuration shall be scoped by:

- organization_id (where applicable)
- workspace_id (where applicable)
- user_id

System dashboards remain globally available but only display authorized data.

---

# Validation Rules

The database shall enforce:

- Unique dashboard codes
- Existing dashboard references
- Existing widget references
- Valid JSON structures
- Supported widget types
- Positive refresh intervals

Invalid dashboard configurations shall not be stored.

---

# Storage Rules

Persist:

- Dashboard metadata
- Widget configuration
- Layout configuration
- Personalization settings
- Filter presets
- Refresh metadata

Do **not** persist widget business data.

Widgets always retrieve fresh data from their source systems.

---

# Indexing Strategy

Recommended indexes:

- code
- dashboard_type
- active
- user_id
- dashboard_id
- widget_type
- viewed_at
- refreshed_at

Composite indexes:

- (dashboard_id, active)
- (user_id, dashboard_id)
- (dashboard_id, widget_type)

---

# Data Integrity Rules

- Dashboard codes are immutable.
- Widgets must reference existing dashboards.
- Preferences require an existing dashboard.
- Refresh history requires an existing widget.
- Deleted dashboards cascade according to retention policy.

---

# Retention Policy

Recommended defaults:

| Data | Retention |
|------|-----------|
| Dashboard definitions | Permanent |
| Personalization | Permanent |
| Filter presets | Permanent |
| Refresh history | 180 days |
| Dashboard views | 365 days |

Retention periods shall be configurable.

---

# Backup & Recovery

Requirements:

- Scheduled backups
- Point-in-time recovery
- Configuration integrity validation
- Schema migration support

Dashboard configurations shall survive complete platform restoration.

---

# Scalability

Designed to support:

- Millions of dashboard views
- Thousands of widgets
- Large enterprise organizations
- Multiple workspaces
- Horizontal database scaling

---

# Future Enhancements

Planned additions:

- Shared dashboard persistence
- Dashboard templates
- Widget versioning
- Dashboard version history
- AI-generated layouts
- Widget recommendation metadata
- Dashboard analytics warehouse integration

---

# Related Documents

Feature

- README.md
- requirements.md
- architecture.md
- workflow.md
- api.md
- ui.md
- testing.md
- changelog.md

Dependencies

- ../../../04-platform/database-standards.md
- ../../../05-platform/report-management.md
- ../../../05-platform/filter-management.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|---------------------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Dashboard Management Database Design |
````
