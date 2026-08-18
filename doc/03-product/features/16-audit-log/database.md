---
id: FEAT-016-DB
title: Audit Log Database Design
version: 1.0.0
status: Draft

feature: FEAT-016

owner:
  technical: Platform Engineering Team
  database: Database Architecture Team
  security: Security Engineering Team
  ai: Database Documentation AI

reviewers:
  - Platform Architecture Team
  - Database Team
  - Security Team

created: 2026-07-05
updated: 2026-07-05

category: Database

tags:
  - database
  - audit-log
  - compliance
  - immutable
  - security
---

# Audit Log Database Design

> This document defines the database schema, relationships, indexing strategy, integrity model, and storage architecture for the Audit Log feature.

---

# Purpose

The Audit Log database provides secure, immutable, append-only storage for security and compliance events. It is optimized for forensic investigations, regulatory compliance, long-term retention, and enterprise-scale querying.

---

# Design Principles

The schema shall be:

- Append Only
- Immutable
- Tamper Evident
- Multi-Tenant
- Event Driven
- Highly Scalable
- Read Optimized
- Compliance Ready

---

# Core Tables

## audit_logs

Stores immutable audit records.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| workspace_id | UUID | Nullable FK → workspaces.id |
| actor_id | UUID | Nullable FK → users.id |
| actor_type | VARCHAR(50) | User, System, Service Account |
| event_type | VARCHAR(100) | Login, RoleAssigned, APIKeyRevoked, etc. |
| event_category | VARCHAR(100) | Authentication, Authorization, Administration |
| resource_type | VARCHAR(100) | User, Workspace, API Key, etc. |
| resource_id | UUID | Related resource |
| result | VARCHAR(20) | Success / Failure |
| ip_address | INET | Client IP |
| user_agent | TEXT | Client user agent |
| session_id | UUID | Session identifier |
| request_id | UUID | Request correlation ID |
| event_id | UUID | Source event identifier |
| idempotency_key | VARCHAR(255) | Duplicate prevention |
| metadata | JSONB | Structured event metadata |
| integrity_hash | VARCHAR(255) | Tamper-evidence hash |
| occurred_at | TIMESTAMP | Event timestamp |
| created_at | TIMESTAMP | Record creation timestamp |

Audit records are immutable after insertion.

---

## audit_metadata

Stores optional extended metadata.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| audit_log_id | UUID | FK → audit_logs.id |
| key | VARCHAR(100) | Metadata key |
| value | JSONB | Metadata value |
| created_at | TIMESTAMP | Timestamp |

---

## audit_retention

Stores retention configuration.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| retention_days | INTEGER | Retention period |
| archive_enabled | BOOLEAN | Archive policy |
| legal_hold | BOOLEAN | Prevent archival/deletion |
| created_at | TIMESTAMP | Timestamp |
| updated_at | TIMESTAMP | Timestamp |

---

# Relationships

```text
Organization
      │
      ▼
 Audit Logs
      │
 ┌────┴──────────┐
 ▼               ▼
Actor(User)   Audit Metadata
```

Audit records may reference:

- User
- Organization
- Workspace
- API Key
- Configuration
- Feature Flag
- Role
- Permission
- Session

using:

- resource_type
- resource_id

---

# Constraints

The database shall enforce:

- Valid foreign keys
- Unique event_id
- Unique idempotency_key
- Valid tenant ownership
- Immutable audit records
- Non-null timestamps
- Referential integrity

Application-level authorization remains outside the database.

---

# Recommended Indexes

Single-column indexes:

- organization_id
- workspace_id
- actor_id
- event_type
- event_category
- resource_type
- resource_id
- result
- occurred_at
- created_at

Composite indexes:

- (organization_id, occurred_at)
- (workspace_id, occurred_at)
- (actor_id, occurred_at)
- (event_category, occurred_at)
- (event_type, occurred_at)
- (resource_type, resource_id)

Unique indexes:

- event_id
- idempotency_key

---

# Partitioning Strategy

Primary partition:

- organization_id

Optional secondary partition:

- occurred_at (monthly)

Benefits:

- High write throughput
- Efficient archival
- Fast compliance queries
- Horizontal scalability

---

# Integrity Model

Each audit record includes:

- event_id
- idempotency_key
- integrity_hash

Future versions may extend integrity with:

- Hash chaining
- Digital signatures
- WORM-compatible verification
- External integrity attestations

---

# Data Integrity Rules

The database shall ensure:

- Every audit record belongs to one organization.
- Every event has a unique identifier.
- Duplicate event IDs are rejected.
- Integrity hashes remain unchanged.
- Metadata remains linked to its parent record.
- Historical records are never modified.

---

# Retention Policy

Recommended defaults:

- Standard retention: 365 days
- Enterprise retention: Configurable
- Legal hold overrides archival/deletion
- Archived records remain immutable

Retention policies shall never rewrite historical data.

---

# Audit Fields

Primary tables include:

- created_at

Audit records intentionally omit:

- updated_at
- deleted_at

to preserve immutability.

Administrative configuration tables may include:

- updated_at

---

# Scalability Strategy

The schema supports:

- Tens of millions of audit records
- High-frequency writes
- Read replicas
- Horizontal partitioning
- Long-term archival
- Efficient forensic queries

---

# Migration Guidelines

Future schema changes must:

- Preserve historical records
- Maintain integrity guarantees
- Avoid destructive migrations
- Support backward compatibility
- Preserve idempotency

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
- ../../../04-platform/event-bus.md
- ../../../05-platform/security-standards.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|--------------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Audit Log Database Design |