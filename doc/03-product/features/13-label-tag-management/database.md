---
id: FEAT-013-DB
title: Label & Tag Management Database Design
version: 1.0.0
status: Draft

feature: FEAT-013

owner:
  technical: Platform Engineering Team
  database: Database Architecture Team
  ai: Database AI

reviewers:
  - Platform Architecture Team
  - Backend Team
  - Security Team

created: 2026-07-05
updated: 2026-07-05

category: Database

tags:
  - database
  - labels
  - tags
  - assignments
  - metadata
---

# Label & Tag Management Database Design

> This document defines the database schema, relationships, constraints, and storage model for the Label & Tag Management feature.

---

# Purpose

The Label & Tag Management database stores reusable labels, reusable tags, resource assignments, metadata, and audit information while supporting multi-tenant enterprise deployments.

---

# Design Principles

The schema must be:

- Normalized
- Multi-tenant
- Resource Agnostic
- Highly Scalable
- Search Friendly
- Auditable
- Extensible

---

# Core Tables

## labels

Stores reusable organization labels.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| workspace_id | UUID | Nullable FK → workspaces.id |
| name | VARCHAR(100) | Unique within scope |
| slug | VARCHAR(120) | Normalized identifier |
| color | VARCHAR(20) | HEX/RGB token |
| description | TEXT | Nullable |
| visibility | ENUM | organization, workspace |
| status | ENUM | active, archived, deleted |
| created_by | UUID | FK → users.id |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update |
| deleted_at | TIMESTAMP | Nullable |

---

## tags

Stores reusable tags.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| normalized_name | VARCHAR(120) | Lowercase unique value |
| display_name | VARCHAR(120) | User-facing value |
| description | TEXT | Nullable |
| usage_count | INTEGER | Cached usage count |
| created_by | UUID | FK → users.id |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update |
| deleted_at | TIMESTAMP | Nullable |

---

## label_assignments

Associates labels with resources.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| workspace_id | UUID | FK → workspaces.id |
| label_id | UUID | FK → labels.id |
| resource_type | VARCHAR(100) | Task, Project, etc. |
| resource_id | UUID | Resource identifier |
| assigned_by | UUID | FK → users.id |
| assigned_at | TIMESTAMP | Timestamp |

---

## tag_assignments

Associates tags with resources.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| workspace_id | UUID | FK → workspaces.id |
| tag_id | UUID | FK → tags.id |
| resource_type | VARCHAR(100) | Task, Project, etc. |
| resource_id | UUID | Resource identifier |
| assigned_by | UUID | FK → users.id |
| assigned_at | TIMESTAMP | Timestamp |

---

## label_activity_logs

Stores label lifecycle events.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| label_id | UUID | FK → labels.id |
| action | VARCHAR(100) | Event type |
| actor_id | UUID | FK → users.id |
| metadata | JSONB | Optional |
| created_at | TIMESTAMP | Timestamp |

---

## tag_activity_logs

Stores tag lifecycle events.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| tag_id | UUID | FK → tags.id |
| action | VARCHAR(100) | Event type |
| actor_id | UUID | FK → users.id |
| metadata | JSONB | Optional |
| created_at | TIMESTAMP | Timestamp |

---

# Relationships

```text
Organization
      │
      ▼
 ┌─────────────┐
 │             │
 ▼             ▼
Labels       Tags
 │             │
 ▼             ▼
Label      Tag
Assignments Assignments
 │             │
 └──────┬──────┘
        ▼
 Business Resources
(Project / Task / Subtask / Comment)
```

---

# Resource Association Model

Every assignment references:

- organization_id
- workspace_id
- resource_type
- resource_id

Supported resources (v1):

- Project
- Task
- Subtask
- Comment

Future resources:

- Issue
- Document
- Approval
- Milestone
- Knowledge Base Article
- AI Work Item

---

# Constraints

The database must enforce:

- Label names unique within organization/workspace scope
- Tag normalized names unique within organization
- One label assignment per label/resource pair
- One tag assignment per tag/resource pair
- Organization isolation
- Workspace isolation
- Valid status values
- Valid visibility values

---

# Recommended Indexes

Single-column indexes:

- organization_id
- workspace_id
- label_id
- tag_id
- resource_type
- resource_id
- status
- created_at

Composite indexes:

- (organization_id, slug)
- (organization_id, normalized_name)
- (resource_type, resource_id)
- (resource_type, resource_id, organization_id)
- (workspace_id, resource_type, resource_id)
- (label_id, resource_type, resource_id)
- (tag_id, resource_type, resource_id)

---

# Audit Fields

All primary tables should contain:

- created_at
- updated_at
- created_by
- updated_by

Soft deletion fields where applicable:

- deleted_at
- deleted_by

---

# Soft Delete Policy

Lifecycle:

Draft

↓

Active

↓

Archived

↓

Soft Deleted

↓

Permanent Cleanup (Retention Policy)

Assignments linked to archived labels remain for historical reporting but archived/deleted labels cannot receive new assignments.

---

# Data Integrity Rules

The database must ensure:

- Foreign key integrity
- Resource association consistency
- Organization ownership
- Workspace ownership
- Duplicate assignment prevention
- Valid enum values
- Immutable assignment history (unless explicitly removed)

Business authorization is enforced by the application layer.

---

# Scalability Strategy

The schema supports:

- Millions of resources
- Millions of assignments
- Thousands of labels
- Millions of tags
- Horizontal scaling
- Read replicas
- Future partitioning by organization
- JSONB extensibility

---

# Migration Guidelines

Future schema updates must:

- Preserve assignment history
- Preserve audit logs
- Include migration scripts
- Maintain backward compatibility where possible
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

- ../08-project-management/database.md
- ../09-task-management/database.md
- ../10-subtask-management/database.md
- ../11-comment-management/database.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|--------------------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Label & Tag Management Database Design |