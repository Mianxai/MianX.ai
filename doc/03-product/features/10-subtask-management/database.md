---
id: FEAT-010-DB
title: Subtask Management Database Design
version: 1.0.0
status: Draft

feature: FEAT-010

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
  - subtask
  - database
  - schema
  - task
  - multi-tenant
---

# Subtask Management Database Design

> This document defines the database schema, relationships, constraints, and storage model for the Subtask Management feature.

---

# Purpose

The Subtask Management database stores subtask metadata, assignments, lifecycle state, scheduling information, labels, and extensible metadata while maintaining a strict parent-child relationship with the Task Management module.

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

## subtasks

Stores primary subtask information.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| workspace_id | UUID | FK → workspaces.id |
| project_id | UUID | FK → projects.id |
| task_id | UUID | FK → tasks.id |
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

## subtask_assignments

Supports one or more assignees.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| subtask_id | UUID | FK → subtasks.id |
| user_id | UUID | FK → users.id |
| assigned_by | UUID | FK → users.id |
| assigned_at | TIMESTAMP | Assignment timestamp |
| active | BOOLEAN | Current assignment flag |

---

## subtask_labels

Stores labels associated with subtasks.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| subtask_id | UUID | FK → subtasks.id |
| label | VARCHAR(100) | Label name |
| color | VARCHAR(20) | UI display color |

---

## subtask_metadata

Stores extensible metadata.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| subtask_id | UUID | FK → subtasks.id |
| custom_fields | JSONB | Custom field values |
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
      │
      ▼
Subtask
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

- Every subtask belongs to exactly one task.
- Every task belongs to one project.
- Every project belongs to one workspace.
- Every workspace belongs to one organization.
- Parent task must exist before a subtask is created.
- Title is required.
- Subtask titles should be unique within the same parent task (recommended).
- Only active project members may be assigned.
- Archived subtasks are read-only.
- Deleted subtasks use soft delete.

---

# Indexes

Recommended indexes:

- organization_id
- workspace_id
- project_id
- task_id
- owner_id
- status
- priority
- due_date
- created_at
- updated_at

Composite indexes:

- (task_id, status)
- (task_id, priority)
- (task_id, due_date)
- (task_id, title)
- (project_id, task_id)

---

# Audit Fields

All tables should support:

- created_at
- updated_at
- created_by
- updated_by

Deletion metadata:

- deleted_at
- deleted_by

where applicable.

---

# Soft Delete Policy

Lifecycle:

Draft

↓

Todo

↓

In Progress

↓

In Review

↓

Completed

↓

Archived

↓

Soft Deleted

↓

Permanent Cleanup (Retention Policy)

---

# Data Integrity Rules

The database must enforce:

- Foreign key integrity
- Parent task integrity
- Organization ownership
- Workspace ownership
- Project ownership
- Valid enum values
- Required fields
- Assignment integrity

Business lifecycle transitions are enforced at the application layer.

---

# Progress Support

The schema supports parent task progress calculations using:

- Total subtasks
- Completed subtasks
- Active subtasks
- Archived subtasks

Weighted progress calculations may be introduced in future versions.

---

# Scalability Strategy

The schema supports:

- Millions of subtasks
- Large enterprise organizations
- Horizontal scaling
- Read replicas
- Future partitioning by organization
- JSONB extensibility

---

# Migration Guidelines

Future schema updates must:

- Preserve backward compatibility where possible
- Include migration scripts
- Maintain data integrity
- Update API and documentation

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

- ../09-task-management/database.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|------------------------------|
| 1.0.0 | 2026-07-04 | Founder | Initial Subtask Management Database Design |