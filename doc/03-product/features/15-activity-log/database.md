---
id: FEAT-015-DB
title: Activity Log Database Design
version: 1.0.0
status: Draft

feature: FEAT-015

owner:
  technical: Platform Engineering Team
  database: Database Architecture Team
  ai: Database Documentation AI

reviewers:
  - Platform Architecture Team
  - Backend Team
  - Security Team

created: 2026-07-05
updated: 2026-07-05

category: Database

tags:
  - database
  - activity-log
  - timeline
  - event-storage
---

# Activity Log Database Design

> This document defines the database schema, relationships, indexing strategy, constraints, and storage model for the Activity Log feature.

---

# Purpose

The Activity Log database stores immutable business activity records generated from domain events. It provides efficient timeline retrieval, filtering, search, and long-term historical storage while maintaining strict tenant isolation.

---

# Design Principles

The schema shall be:

- Append Only
- Immutable
- Multi-Tenant
- Event Driven
- Highly Scalable
- Optimized for Reads
- Normalized where appropriate
- Auditable

---

# Core Tables

## activities

Stores immutable activity records.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| workspace_id | UUID | Nullable FK → workspaces.id |
| actor_id | UUID | FK → users.id |
| activity_type | VARCHAR(100) | Business event type |
| description | TEXT | Human-readable activity |
| resource_type | VARCHAR(100) | Project, Task, Comment, etc. |
| resource_id | UUID | Related resource |
| metadata | JSONB | Additional event metadata |
| event_id | UUID | Source event identifier |
| idempotency_key | VARCHAR(255) | Prevent duplicate activities |
| occurred_at | TIMESTAMP | Business event timestamp |
| created_at | TIMESTAMP | Record creation timestamp |

Activity records are immutable after insertion.

---

## activity_metadata

Stores optional structured metadata for large or extensible payloads.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| activity_id | UUID | FK → activities.id |
| key | VARCHAR(100) | Metadata key |
| value | JSONB | Metadata value |
| created_at | TIMESTAMP | Timestamp |

---

## activity_retention

Stores retention and archival configuration.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| retention_days | INTEGER | Retention period |
| archive_enabled | BOOLEAN | Archive policy |
| created_at | TIMESTAMP | Timestamp |
| updated_at | TIMESTAMP | Timestamp |

---

# Relationships

```text
Organization
      │
      ▼
 Activities
      │
 ┌────┴─────────┐
 ▼              ▼
Actor(User)   Metadata
```

Activities may reference resources including:

- Organization
- Workspace
- Project
- Task
- Subtask
- Comment
- Attachment
- Label
- Notification

through:

- resource_type
- resource_id

---

# Constraints

The database shall enforce:

- Valid foreign keys
- Unique event_id
- Unique idempotency_key
- Valid organization ownership
- Immutable activity records
- Non-null timestamps
- Referential integrity

Business authorization is enforced by the application layer.

---

# Recommended Indexes

Single-column indexes:

- organization_id
- workspace_id
- actor_id
- activity_type
- resource_type
- resource_id
- occurred_at
- created_at

Composite indexes:

- (organization_id, occurred_at)
- (workspace_id, occurred_at)
- (resource_type, resource_id)
- (actor_id, occurred_at)
- (activity_type, occurred_at)

Unique indexes:

- event_id
- idempotency_key

---

# Partitioning Strategy

Recommended partition key:

- organization_id

Optional secondary partition:

- occurred_at (monthly)

This supports:

- High write throughput
- Efficient archival
- Faster timeline queries
- Future horizontal scaling

---

# Data Integrity Rules

The database shall ensure:

- Every activity belongs to one organization.
- Every activity references a valid actor.
- Duplicate event IDs are rejected.
- Activity timestamps are preserved.
- Metadata remains associated with its activity.
- Historical records remain immutable.

---

# Retention Policy

Recommended defaults:

- Active timeline: 12 months
- Archived timeline: Configurable
- Metadata retention follows parent activity
- Soft deletion is not supported

Archival must not modify existing records.

---

# Audit Fields

Primary tables include:

- created_at

Activities intentionally omit:

- updated_at
- deleted_at

to preserve immutability.

Administrative tables may include:

- updated_at

---

# Scalability Strategy

The schema supports:

- Millions of activities
- High write throughput
- Read replicas
- Horizontal partitioning
- Efficient timeline queries
- JSONB extensibility

---

# Migration Guidelines

Future schema changes must:

- Preserve historical data
- Maintain event ordering
- Avoid destructive migrations
- Include backward-compatible migration scripts
- Preserve idempotency guarantees

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

- ../07-workspace-management/database.md
- ../08-project-management/database.md
- ../09-task-management/database.md
- ../14-notification-management/database.md

Platform

- ../../../04-platform/database-standards.md
- ../../../04-platform/event-bus.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|-----------------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Activity Log Database Design |