````markdown
---
id: FEAT-019-DB
title: Report Management Database Design
version: 1.0.0
status: Draft

feature: FEAT-019

owner:
  database: Database Engineering Team
  backend: Backend Engineering Team
  platform: Platform Engineering Team
  ai: Database Documentation AI

reviewers:
  - Platform Architecture Team
  - Backend Team
  - Product Team

created: 2026-07-05
updated: 2026-07-05

category: Database

tags:
  - database
  - reporting
  - exports
  - schema
  - enterprise
---

# Report Management Database Design

> This document defines the persistence model, database schema, relationships, indexing strategy, and storage rules for the Report Management feature.

---

# Purpose

The Report Management database stores report templates, execution history, generated report metadata, export artifacts, and future scheduling configuration.

The reporting engine itself remains stateless. Persistent storage is used only for reusable configuration, auditability, and report lifecycle management.

---

# Design Principles

The database shall be:

- Normalized
- Multi-Tenant Aware
- Extensible
- Provider Agnostic
- Audit Friendly
- Scalable
- Backward Compatible

---

# Core Tables

## report_templates

Stores reusable report definitions.

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary key |
| code | VARCHAR(100) | Unique template code |
| name | VARCHAR(255) | Report name |
| description | TEXT | Template description |
| resource_type | VARCHAR(100) | Target resource |
| parameters_json | JSONB | Supported parameters |
| columns_json | JSONB | Report columns |
| supported_formats | JSONB | Export formats |
| system_defined | BOOLEAN | Platform managed |
| active | BOOLEAN | Enabled status |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update |

Constraints:

- `code` must be unique.
- JSON fields must contain valid JSON.

---

## generated_reports

Stores metadata for generated reports.

| Column | Type |
|---------|------|
| id | UUID |
| template_id | UUID |
| organization_id | UUID |
| workspace_id | UUID |
| generated_by | UUID |
| export_format | VARCHAR |
| status | VARCHAR |
| file_name | VARCHAR |
| file_size | BIGINT |
| storage_path | VARCHAR |
| generated_at | TIMESTAMP |
| expires_at | TIMESTAMP |

Status values:

- Pending
- Processing
- Completed
- Failed
- Expired

---

## report_download_history

Tracks report downloads.

| Column | Type |
|---------|------|
| id | UUID |
| report_id | UUID |
| downloaded_by | UUID |
| downloaded_at | TIMESTAMP |
| ip_address | VARCHAR(45) |
| user_agent | TEXT |

---

## report_execution_history

Stores execution metadata.

| Column | Type |
|---------|------|
| id | UUID |
| report_id | UUID |
| execution_time_ms | INTEGER |
| rows_returned | INTEGER |
| provider | VARCHAR |
| status | VARCHAR |
| error_message | TEXT |

Execution history supports troubleshooting and performance analysis.

---

## report_schedules (Future)

Reserved for scheduled reporting.

| Column | Type |
|---------|------|
| id | UUID |
| organization_id | UUID |
| workspace_id | UUID |
| template_id | UUID |
| schedule_type | VARCHAR |
| cron_expression | VARCHAR |
| export_format | VARCHAR |
| delivery_method | VARCHAR |
| active | BOOLEAN |
| next_execution_at | TIMESTAMP |

Not implemented in Version 1.

---

## report_subscriptions (Future)

Stores user subscriptions to recurring reports.

| Column | Type |
|---------|------|
| id | UUID |
| user_id | UUID |
| schedule_id | UUID |
| subscribed_at | TIMESTAMP |

---

# Relationships

```text
report_templates
        │
        ▼
generated_reports
        │
        ├──────────────┐
        ▼              ▼
report_download_history
report_execution_history

(Future)

report_templates
        │
        ▼
report_schedules
        │
        ▼
report_subscriptions
```

---

# Multi-Tenant Strategy

Every generated report shall include:

- organization_id
- workspace_id
- generated_by

Templates remain platform-managed and globally available unless future customization is enabled.

---

# Storage Rules

Persisted metadata includes:

- Template used
- Parameters
- Export format
- File metadata
- Execution status
- Timing information

The underlying dataset is **not** stored after report generation unless explicitly required by a future archival feature.

---

# Validation Rules

The database shall enforce:

- Unique template codes
- Valid JSON structures
- Supported export formats
- Existing template references
- Valid status transitions

Invalid metadata shall not be persisted.

---

# Indexing Strategy

Recommended indexes:

- code
- resource_type
- active
- organization_id
- workspace_id
- generated_by
- generated_at
- status
- template_id

Composite indexes should optimize:

- Recent reports
- User report history
- Organization reports
- Workspace reports

---

# Data Integrity Rules

- Template codes are immutable.
- Generated reports must reference a valid template.
- Download history requires an existing generated report.
- Execution history cannot exist without a report.
- Expired reports shall not be downloadable.

---

# Retention Policy

Recommended defaults:

| Data | Retention |
|------|-----------|
| Report metadata | 1 year |
| Download history | 1 year |
| Execution history | 1 year |
| Generated files | Configurable (default 30 days) |

Retention periods should be configurable by platform administrators.

---

# Backup & Recovery

Requirements:

- Scheduled backups
- Point-in-time recovery
- Integrity verification
- Schema migration support

Configuration data must survive complete platform restoration.

---

# Scalability

The persistence model is designed to support:

- Millions of generated reports
- Large enterprise organizations
- High download volume
- Horizontal database scaling
- Future scheduling infrastructure

---

# Future Enhancements

Planned additions:

- Scheduled report persistence
- Email delivery metadata
- Cloud object storage integration
- Report versioning
- Template version history
- BI connector metadata
- Long-term archival
- Analytics warehouse integration

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
- ../../../05-platform/export-service.md
- ../../../05-platform/filter-management.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|---------------------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Report Management Database Design |
````
