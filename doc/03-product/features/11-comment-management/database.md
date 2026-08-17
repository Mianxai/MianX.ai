---
id: FEAT-011-DB
title: Comment Management Database Design
version: 1.0.0
status: Draft

feature: FEAT-011

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
  - comments
  - database
  - schema
  - mentions
  - reactions
---

# Comment Management Database Design

> This document defines the database schema, relationships, constraints, and storage model for the Comment Management feature.

---

# Purpose

The Comment Management database stores comments, threaded replies, mentions, reactions, edit history, and extensible metadata while remaining reusable across multiple platform resources.

---

# Design Principles

The schema must be:

- Normalized
- Multi-tenant
- Resource Agnostic
- Auditable
- Extensible
- Scalable

---

# Core Tables

## comments

Stores primary comment information.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| workspace_id | UUID | FK → workspaces.id |
| project_id | UUID | FK → projects.id (nullable for non-project resources) |
| resource_type | VARCHAR(100) | Task, Subtask, etc. |
| resource_id | UUID | ID of associated resource |
| parent_comment_id | UUID | FK → comments.id (nullable) |
| author_id | UUID | FK → users.id |
| content | TEXT | Markdown supported |
| status | ENUM | active, edited, deleted, archived |
| edited_at | TIMESTAMP | Nullable |
| deleted_at | TIMESTAMP | Nullable |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update |

---

## comment_mentions

Stores user mentions.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| comment_id | UUID | FK → comments.id |
| user_id | UUID | FK → users.id |
| mentioned_at | TIMESTAMP | Timestamp |

---

## comment_reactions

Stores emoji reactions.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| comment_id | UUID | FK → comments.id |
| user_id | UUID | FK → users.id |
| reaction | VARCHAR(50) | Emoji or reaction key |
| created_at | TIMESTAMP | Timestamp |

Unique constraint:

```
(comment_id, user_id, reaction)
```

---

## comment_history

Stores edit history.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| comment_id | UUID | FK → comments.id |
| previous_content | TEXT | Original content |
| edited_by | UUID | FK → users.id |
| edited_at | TIMESTAMP | Timestamp |

---

## comment_metadata

Stores extensible metadata.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| comment_id | UUID | FK → comments.id |
| metadata | JSONB | Structured metadata |
| custom_fields | JSONB | Future extensions |
| updated_at | TIMESTAMP | Timestamp |

---

# Relationships

```text
Organization
      │
      ▼
Workspace
      │
      ▼
Project (optional)
      │
      ▼
Comments
      │
 ┌────┼───────────────┬──────────────┐
 ▼    ▼               ▼              ▼
Replies Mentions   Reactions   Edit History
                    │
                    ▼
                Metadata

External References
──────────────────────────
Notifications
Audit Logs
Activity Logs
Automation
Analytics
```

---

# Resource Association Model

Every comment references a business resource using:

- resource_type
- resource_id

Supported (v1):

- Task
- Subtask

Future:

- Project
- Issue
- Document
- Approval
- Milestone

This abstraction keeps the schema reusable and avoids feature-specific tables.

---

# Constraints

- Every comment belongs to exactly one resource.
- Replies must reference an existing parent comment.
- Parent and child comments must belong to the same resource.
- Resource type must be valid.
- Content is required.
- Deleted comments cannot receive new reactions.
- Duplicate reactions are prohibited.
- Mentioned users must be valid users.

---

# Indexes

Recommended indexes:

- organization_id
- workspace_id
- project_id
- resource_type
- resource_id
- parent_comment_id
- author_id
- status
- created_at
- updated_at

Composite indexes:

- (resource_type, resource_id)
- (resource_type, resource_id, created_at)
- (parent_comment_id, created_at)
- (author_id, created_at)

---

# Audit Fields

All tables should support:

- created_at
- updated_at
- created_by
- updated_by

Deletion metadata where applicable:

- deleted_at
- deleted_by

---

# Soft Delete Policy

Lifecycle:

Active

↓

Edited

↓

Archived

↓

Soft Deleted

↓

Permanent Cleanup (Retention Policy)

Replies to deleted comments remain intact unless platform policy specifies cascading behavior.

---

# Data Integrity Rules

The database must enforce:

- Foreign key integrity
- Thread hierarchy integrity
- Organization ownership
- Workspace ownership
- Resource association
- Valid enum values
- Required fields
- Unique reaction constraint

Business permissions are enforced at the application layer.

---

# Scalability Strategy

The schema supports:

- Millions of comments
- Large discussion threads
- High concurrency
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
- ../10-subtask-management/database.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Comment Management Database Design |