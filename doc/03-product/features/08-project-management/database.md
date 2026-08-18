---
id: FEAT-008-DB
title: Project Management Database Design
version: 1.0.0
status: Draft

feature: FEAT-008

owner:
  technical: Platform Engineering Team
  database: Database Architecture Team
  ai: Database AI

reviewers:
  - Platform Architecture Team
  - Backend Team
  - Security Team

created: 2026-07-04
updated: 2026-07-04

category: Database

tags:
  - project
  - database
  - schema
  - workspace
  - multi-tenant
---

# Project Management Database Design

> This document defines the database schema, relationships, constraints, and data model for the Project Management feature.

---

# Purpose

The Project Management database stores project metadata, lifecycle information, settings, milestones, and audit references.

Business resources such as tasks, documents, files, comments, AI agents, and automations are managed by their own services and reference the project through `project_id`.

---

# Design Principles

The schema must be:

- Normalized
- Multi-tenant
- Secure
- Auditable
- Extensible
- Scalable

---

# Core Tables

## projects

Stores primary project information.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| workspace_id | UUID | FK → workspaces.id |
| owner_id | UUID | FK → users.id |
| name | VARCHAR(100) | Required, unique per workspace |
| slug | VARCHAR(120) | Unique per workspace |
| description | TEXT | Optional |
| logo_url | TEXT | Optional |
| color_theme | VARCHAR(30) | Optional |
| visibility | ENUM | private, internal, public |
| status | ENUM | draft, active, on_hold, completed, archived, deleted |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |
| created_by | UUID | FK → users.id |
| updated_by | UUID | FK → users.id |

---

## project_settings

Stores configurable project settings.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary Key |
| project_id | UUID | FK → projects.id |
| timezone | VARCHAR(50) | Default timezone |
| language | VARCHAR(10) | Default language |
| date_format | VARCHAR(30) | Date display format |
| default_workflow | VARCHAR(100) | Workflow template |
| notifications_enabled | BOOLEAN | Default TRUE |
| settings_json | JSONB | Extensible configuration |
| updated_at | TIMESTAMP | Last update |

---

## project_milestones

Stores milestones associated with a project.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary Key |
| project_id | UUID | FK → projects.id |
| title | VARCHAR(150) | Required |
| description | TEXT | Optional |
| due_date | DATE | Optional |
| status | ENUM | pending, active, completed, archived |
| created_at | TIMESTAMP | Creation timestamp |
| completed_at | TIMESTAMP | Nullable |

---

## project_metadata

Stores extensible metadata.

| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary Key |
| project_id | UUID | FK → projects.id |
| labels | JSONB | Labels array |
| tags | JSONB | Tags array |
| custom_fields | JSONB | Future extensions |
| updated_at | TIMESTAMP | Last update |

---

# Relationships

```text
Organization
      │
      ▼
Workspace
      │
      ▼
Project
 ├──────────────┐
 ▼              ▼
Settings     Milestones
 │
 ▼
Metadata

External References
────────────────────────────
Tasks
Files
Documents
Comments
AI Agents
Automations
Reports
```

---

# Constraints

- Project name must be unique within a workspace.
- Slug must be unique within a workspace.
- Every project belongs to exactly one workspace.
- Every workspace belongs to exactly one organization.
- Every project must have one active owner.
- Archived projects are read-only.
- Deleted projects are soft deleted.

---

# Indexes

Recommended indexes:

- organization_id
- workspace_id
- owner_id
- status
- visibility
- slug
- created_at
- updated_at

Composite indexes:

- (workspace_id, name)
- (workspace_id, slug)
- (workspace_id, status)
- (organization_id, workspace_id)

---

# Audit Fields

All tables should support:

- created_at
- updated_at
- created_by
- updated_by

Deletion should use:

- deleted_at
- deleted_by

where applicable.

---

# Soft Delete Policy

Projects are never immediately removed.

Lifecycle:

Active
→ Archived
→ Soft Deleted
→ Permanent Cleanup (Retention Policy)

---

# Data Integrity Rules

The database must enforce:

- Foreign key integrity
- Workspace ownership
- Organization ownership
- Valid enum values
- Required fields
- Unique project names
- Valid status transitions (application layer)

---

# Scalability Strategy

The schema supports:

- Millions of projects
- Large organizations
- Horizontal scaling
- Read replicas
- Partitioning by organization (future)
- JSONB extensibility

---

# Migration Guidelines

Future schema updates must:

- Preserve backward compatibility where possible.
- Include migration scripts.
- Maintain data integrity.
- Update related API and documentation.

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

Core Platform

- ../07-workspace-management/database.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|------------------------------|
| 1.0.0 | 2026-07-04 | Founder | Initial Project Management Database Design |