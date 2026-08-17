---
id: FEAT-012-DB
title: Attachment Management Database Design
version: 1.0.0
status: Draft

feature: FEAT-012

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
  - attachments
  - database
  - storage
  - metadata
  - versioning
---

# Attachment Management Database Design

> This document defines the database schema, relationships, constraints, and storage model for the Attachment Management feature.

---

# Purpose

The Attachment Management database stores attachment metadata, version history, storage references, malware scan results, and resource associations while delegating binary file storage to external storage providers.

---

# Design Principles

The schema must be:

- Normalized
- Multi-tenant
- Provider Agnostic
- Resource Agnostic
- Auditable
- Extensible
- Scalable

---

# Core Tables

## attachments

Stores attachment metadata.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| organization_id | UUID | FK → organizations.id |
| workspace_id | UUID | FK → workspaces.id |
| project_id | UUID | FK → projects.id (nullable) |
| resource_type | VARCHAR(100) | Task, Subtask, Comment, etc. |
| resource_id | UUID | Associated resource |
| uploaded_by | UUID | FK → users.id |
| current_version_id | UUID | FK → attachment_versions.id |
| display_name | VARCHAR(255) | User-visible filename |
| original_name | VARCHAR(255) | Original uploaded filename |
| status | ENUM | active, archived, deleted, quarantined |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update |
| deleted_at | TIMESTAMP | Nullable |

---

## attachment_versions

Stores immutable file versions.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| attachment_id | UUID | FK → attachments.id |
| version_number | INTEGER | Sequential version |
| storage_provider | VARCHAR(100) | Local, S3, Azure, GCS |
| storage_key | TEXT | Provider object key/path |
| mime_type | VARCHAR(150) | MIME type |
| file_extension | VARCHAR(25) | Extension |
| file_size_bytes | BIGINT | File size |
| checksum | VARCHAR(128) | SHA-256 or configured algorithm |
| uploaded_by | UUID | FK → users.id |
| uploaded_at | TIMESTAMP | Upload timestamp |

---

## attachment_scan_results

Stores malware scan results.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| attachment_version_id | UUID | FK → attachment_versions.id |
| scan_engine | VARCHAR(100) | Scanner identifier |
| scan_status | ENUM | pending, clean, infected, failed |
| detected_threat | VARCHAR(255) | Nullable |
| scanned_at | TIMESTAMP | Timestamp |

---

## attachment_metadata

Stores extensible metadata.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| attachment_id | UUID | FK → attachments.id |
| metadata | JSONB | Structured metadata |
| custom_fields | JSONB | Future extensions |
| updated_at | TIMESTAMP | Timestamp |

---

## attachment_download_logs

Stores download activity.

| Column | Type | Notes |
|---------|------|-------|
| id | UUID | Primary Key |
| attachment_id | UUID | FK → attachments.id |
| version_id | UUID | FK → attachment_versions.id |
| downloaded_by | UUID | FK → users.id |
| downloaded_at | TIMESTAMP | Timestamp |
| client_ip | INET | Optional |
| user_agent | TEXT | Optional |

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
Attachments
      │
 ┌────┼──────────────┬──────────────┐
 ▼    ▼              ▼              ▼
Versions Metadata Scan Results Download Logs
```

---

# Resource Association Model

Each attachment references a business resource through:

- resource_type
- resource_id

Supported resources (v1):

- Task
- Subtask
- Comment

Future resources:

- Project
- Issue
- Document
- Approval
- Milestone
- Knowledge Base Article

---

# Constraints

- Every attachment belongs to exactly one resource.
- Every version belongs to exactly one attachment.
- Version numbers must be unique per attachment.
- Only one current version may exist.
- Deleted attachments cannot be downloaded.
- Quarantined versions cannot be accessed.
- Checksum must be unique per version.

---

# Indexes

Recommended indexes:

- organization_id
- workspace_id
- project_id
- resource_type
- resource_id
- uploaded_by
- status
- created_at
- updated_at

Composite indexes:

- (resource_type, resource_id)
- (resource_type, resource_id, created_at)
- (attachment_id, version_number)
- (attachment_id, status)
- (uploaded_by, created_at)

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

Draft Upload

↓

Scanning

↓

Active

↓

Archived

↓

Soft Deleted

↓

Permanent Cleanup (Retention Policy)

Binary cleanup may occur asynchronously after metadata retention expires.

---

# Data Integrity Rules

The database must enforce:

- Foreign key integrity
- Version consistency
- Organization ownership
- Workspace ownership
- Resource association
- Valid enum values
- Required metadata
- Unique version numbers

Business authorization is enforced at the application layer.

---

# Scalability Strategy

The schema supports:

- Millions of attachments
- Billions of file versions
- Multi-terabyte object storage
- Horizontal scaling
- Read replicas
- Future partitioning by organization
- JSONB extensibility

---

# Migration Guidelines

Future schema updates must:

- Preserve version history
- Preserve metadata integrity
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

- ../09-task-management/database.md
- ../10-subtask-management/database.md
- ../11-comment-management/database.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|-----------------------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Attachment Management Database Design |