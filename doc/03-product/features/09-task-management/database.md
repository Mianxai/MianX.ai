---
id: FEAT-009-DB
title: Task Management Database Design
version: 1.0.0
status: Draft

feature: FEAT-009

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
  - task
  - database
  - schema
  - project
  - multi-tenant
---

# Task Management Database Design

> This document defines the database schema, relationships, constraints, and storage model for the Task Management feature.

---

# Purpose

The Task Management database stores task metadata, assignment information, lifecycle status, priorities, scheduling, labels, and extensible metadata.

Business resources such as comments, attachments, activity logs, notifications, automation, and time tracking are managed by separate services using `task_id` as their reference.

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

## tasks

Stores primary task information.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| workspace_id | UUID | FK → workspaces.id |
| project_id | UUID | FK → projects.id |
| created_by | UUID | FK → users.id |
| owner_id | UUID | FK → users.id |
| title | VARCHAR(200) | Required |
| description | TEXT | Markdown supported |
| priority | ENUM | critical, high, medium, low |
| status | ENUM | draft, todo, in_progress, in_review, blocked, completed, archived, deleted |
| start_date | TIMESTAMP | Optional |
| due_date | TIMESTAMP | Optional |
| completed_at | TIMESTAMP | Nullable |
| estimated_hours | DECIMAL(6,2) | Optional |
| actual_hours | DECIMAL(6,2) | Optional |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update |

---

## task_assignments

Supports single or multiple assignees.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| task_id | UUID | FK → tasks.id |
| user_id | UUID | FK → users.id |
| assigned_by | UUID | FK → users.id |
| assigned_at | TIMESTAMP | Assignment time |
| active | BOOLEAN | Current assignment flag |

---

## task_labels

Stores labels linked to tasks.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| task_id | UUID | FK → tasks.id |
| label | VARCHAR(100) | Label name |
| color | VARCHAR(20) | Display color |

---

## task_metadata

Stores extensible metadata.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| task_id | UUID | FK → tasks.id |
| custom_fields | JSONB | Custom attributes |
| tags | JSONB | Tags array |
| metadata | JSONB | Additional structured metadata |
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
      │
      ▼
Task
 ├────────────┬──────────────┐
 ▼            ▼              ▼
Assignments Labels      Metadata

External References
────────────────────────────
Comments
Attachments
Activity Logs
Notifications
Automation
Time Tracking
AI Workforce
```

---

# Constraints

- Every task belongs to exactly one project.
- Every project belongs to one workspace.
- Every workspace belongs to one organization.
- Task title is required.
- Task titles should be unique within a project (recommended).
- Only project members may be assigned.
- Archived tasks are read-only.
- Deleted tasks are soft deleted.

---

# Indexes

Recommended indexes:

- organization_id
- workspace_id
- project_id
- owner_id
- status
- priority
- due_date
- created_at
- updated_at

Composite indexes:

- (project_id, status)
- (project_id, priority)
- (project_id, due_date)
- (project_id, title)
- (workspace_id, project_id)

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

Tasks are never permanently removed immediately.

Lifecycle:

Draft
→ Todo
→ In Progress
→ In Review
→ Completed
→ Archived
→ Soft Deleted
→ Permanent Cleanup (Retention Policy)

---

# Data Integrity Rules

The database must enforce:

- Foreign key integrity
- Organization ownership
- Workspace ownership
- Project ownership
- Valid enum values
- Required fields
- Assignment integrity
- Lifecycle consistency

Business transition rules are enforced at the application layer.

---

# Scalability Strategy

The schema supports:

- Millions of tasks
- Large enterprise projects
- Horizontal scaling
- Read replicas
- Partitioning by organization (future)
- JSONB extensibility

---

# Migration Guidelines

Future schema updates must:

- Preserve backward compatibility where possible
- Include migration scripts
- Maintain data integrity
- Update related API and documentation

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

- ../08-project-management/database.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|------------------------------|
| 1.0.0 | 2026-07-04 | Founder | Initial Task Management Database Design |