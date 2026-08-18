---
id: FEAT-014-DB
title: Notification Management Database Design
version: 1.0.0
status: Draft

feature: FEAT-014

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
  - notifications
  - templates
  - delivery
  - queue
---

# Notification Management Database Design

> This document defines the database schema, relationships, constraints, and storage model for the Notification Management feature.

---

# Purpose

The Notification Management database stores notifications, templates, delivery attempts, user preferences, scheduling metadata, and audit information while supporting enterprise-scale, multi-tenant deployments.

---

# Design Principles

The schema must be:

- Multi-tenant
- Event Driven
- Normalized
- Highly Scalable
- Channel Agnostic
- Auditable
- Extensible

---

# Core Tables

## notifications

Stores notification records.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| workspace_id | UUID | Nullable FK → workspaces.id |
| recipient_id | UUID | FK → users.id |
| category | VARCHAR(100) | Notification category |
| priority | ENUM | critical, high, normal, low |
| title | VARCHAR(255) | Rendered title |
| body | TEXT | Rendered body |
| resource_type | VARCHAR(100) | Project, Task, etc. |
| resource_id | UUID | Related resource |
| status | ENUM | queued, processing, delivered, failed, archived, expired |
| scheduled_at | TIMESTAMP | Nullable |
| delivered_at | TIMESTAMP | Nullable |
| read_at | TIMESTAMP | Nullable |
| expires_at | TIMESTAMP | Nullable |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update |

---

## notification_templates

Stores reusable notification templates.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | Nullable (global templates allowed) |
| code | VARCHAR(100) | Unique template code |
| channel | ENUM | in_app, email, push, browser |
| language | VARCHAR(10) | Locale |
| subject | VARCHAR(255) | Nullable |
| title_template | TEXT | Template |
| body_template | TEXT | Template |
| status | ENUM | active, archived |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update |

---

## notification_deliveries

Stores delivery attempts.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| notification_id | UUID | FK → notifications.id |
| channel | ENUM | in_app, email, push, browser |
| provider | VARCHAR(100) | Delivery provider |
| status | ENUM | queued, processing, delivered, failed |
| attempt_number | INTEGER | Retry count |
| provider_reference | VARCHAR(255) | Nullable |
| error_message | TEXT | Nullable |
| delivered_at | TIMESTAMP | Nullable |
| created_at | TIMESTAMP | Timestamp |

---

## notification_preferences

Stores user notification settings.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| user_id | UUID | FK → users.id |
| organization_id | UUID | FK → organizations.id |
| in_app_enabled | BOOLEAN | Default TRUE |
| email_enabled | BOOLEAN | Default TRUE |
| push_enabled | BOOLEAN | Default TRUE |
| browser_enabled | BOOLEAN | Default TRUE |
| quiet_hours_enabled | BOOLEAN | Default FALSE |
| quiet_start | TIME | Nullable |
| quiet_end | TIME | Nullable |
| language | VARCHAR(10) | Preferred locale |
| digest_frequency | ENUM | instant, daily, weekly |
| updated_at | TIMESTAMP | Last update |

---

## notification_queue

Stores queued notifications.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| notification_id | UUID | FK → notifications.id |
| priority | ENUM | critical, high, normal, low |
| available_at | TIMESTAMP | Processing time |
| locked_at | TIMESTAMP | Nullable |
| worker_id | VARCHAR(100) | Nullable |
| status | ENUM | pending, processing, completed, failed |
| created_at | TIMESTAMP | Timestamp |

---

## notification_activity_logs

Stores notification lifecycle events.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| notification_id | UUID | FK → notifications.id |
| action | VARCHAR(100) | Event name |
| actor_id | UUID | Nullable FK → users.id |
| metadata | JSONB | Optional |
| created_at | TIMESTAMP | Timestamp |

---

# Relationships

```text
Organization
      │
      ▼
Notification Templates
      │
      ▼
Notifications
      │
 ┌────┼─────────────┐
 ▼    ▼             ▼
Queue Deliveries Activity Logs
      │
      ▼
 Recipient (User)
      │
      ▼
Notification Preferences
```

---

# Resource Association

Notifications may reference:

- Project
- Task
- Subtask
- Comment
- Attachment
- Workspace
- Membership
- Organization

Using:

- resource_type
- resource_id

This allows future resources without schema redesign.

---

# Constraints

The database must enforce:

- Valid notification status
- Valid priority
- Valid delivery channel
- Valid template code
- One preference record per user per organization
- Organization isolation
- Referential integrity

Business authorization is enforced by the application layer.

---

# Recommended Indexes

Single-column indexes:

- organization_id
- workspace_id
- recipient_id
- category
- status
- priority
- scheduled_at
- delivered_at
- read_at
- created_at

Composite indexes:

- (recipient_id, status)
- (recipient_id, read_at)
- (organization_id, category)
- (status, priority)
- (available_at, status)
- (notification_id, channel)
- (code, language)

---

# Audit Fields

All primary tables should include:

- created_at
- updated_at

Optional where applicable:

- created_by
- updated_by

Soft-delete fields (future support):

- deleted_at
- deleted_by

---

# Data Integrity Rules

The database must ensure:

- Valid foreign keys
- One notification belongs to one recipient
- Delivery attempts reference valid notifications
- Queue entries reference valid notifications
- Templates remain immutable for historical deliveries
- Preference uniqueness
- Consistent enum values

---

# Scalability Strategy

The schema supports:

- Millions of notifications
- Millions of delivery attempts
- High queue throughput
- Horizontal scaling
- Read replicas
- Queue partitioning
- Future sharding by organization
- JSONB metadata extensibility

---

# Retention Policy

Recommended defaults:

- Notification history: 12 months
- Delivery logs: 12 months
- Activity logs: 24 months
- Queue records: remove after successful processing (configurable)
- Templates: retained indefinitely unless archived

Retention periods should be configurable by organization policy.

---

# Migration Guidelines

Future schema updates must:

- Preserve delivery history
- Preserve audit records
- Preserve template references
- Include migration scripts
- Maintain backward compatibility where possible

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
- ../11-comment-management/database.md
- ../12-attachment-management/database.md

Platform

- ../../../04-platform/database-standards.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|---------------------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Notification Management Database Design |