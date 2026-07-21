---
id: FEAT-005-DB
title: Permission Management Database Design
version: 1.0.0
status: Draft

feature: FEAT-005

owner:
  technical: Database Engineering Team
  architecture: Platform Architecture Team
  ai: Database AI

reviewers:
  - Platform Architecture Team
  - Database Team
  - Security Team

created: 2026-07-04
updated: 2026-07-04

category: Database

tags:
  - permission
  - database
  - authorization
  - rbac
---

# Permission Management Database Design

> This document defines the logical database design for the Permission Management module.

---

# Purpose

The Permission Management database acts as the central registry for all permission definitions across the Mianx.ai platform.

It stores permission metadata, categories, resources, actions, lifecycle information, and audit records.

---

# Design Principles

The database must be:

- Normalized
- Secure by Default
- Highly Scalable
- Extensible
- Auditable
- Cloud Ready

---

# Database Scope

The module stores:

- Permission Definitions
- Permission Categories
- Resources
- Actions
- Permission Metadata
- Audit Records

The module does **not** store:

- Role Assignments
- User Assignments
- Runtime Authorization Decisions

Those responsibilities belong to Role Management, Membership Management, and Authorization Service.

---

# Entity Relationship Overview

```text
Permission Category
        │
        │ 1:N
        ▼
    Permission
      ├────────────► Resource
      ├────────────► Action
      ├────────────► Permission Metadata
      └────────────► Permission Audit
```

---

# Core Entities

## Permission

Purpose

Stores permission definitions.

Primary Key

- permission_id

Suggested Fields

- permission_id
- permission_name
- permission_code
- resource_id
- action_id
- category_id
- description
- status
- is_system_permission
- created_by
- updated_by
- created_at
- updated_at

---

## Permission Category

Purpose

Stores reusable permission categories.

Suggested Fields

- category_id
- category_name
- description
- created_at
- updated_at

Examples

- Platform
- Organization
- Identity
- Project
- CRM
- HR
- Finance
- AI
- Custom

---

## Resource

Purpose

Stores application resources.

Suggested Fields

- resource_id
- resource_name
- resource_code
- description

Examples

- users
- roles
- permissions
- organizations
- projects
- tasks
- invoices

---

## Action

Purpose

Stores supported actions.

Suggested Fields

- action_id
- action_name
- action_code
- description

Examples

- create
- read
- update
- delete
- manage
- approve
- archive
- restore
- assign
- export

---

## Permission Metadata

Purpose

Stores system metadata.

Suggested Fields

- metadata_id
- permission_id
- version
- last_modified_at
- archived_at
- created_at
- updated_at

---

## Permission Audit

Purpose

Stores immutable audit records.

Suggested Fields

- audit_id
- permission_id
- actor_id
- event_type
- metadata
- created_at

Examples

- Permission Created
- Permission Updated
- Permission Archived
- Permission Restored
- Status Changed

---

# Relationships

```text
Permission Category
        │
        │ 1:N
        ▼
Permission
   ├────── N:1 ─────► Resource
   ├────── N:1 ─────► Action
   ├────── 1:1 ─────► Permission Metadata
   └────── 1:N ─────► Permission Audit
```

---

# Constraints

The database must enforce:

- Globally unique permission code
- Valid category reference
- Valid resource reference
- Valid action reference
- Immutable audit records
- Protected system permissions

---

# Indexing Strategy

Indexes should exist for:

- permission_id
- permission_code
- permission_name
- resource_id
- action_id
- category_id
- status
- created_at
- updated_at

Composite indexes:

- (resource_id, action_id)
- (category_id, status)
- (permission_code)

---

# Security Considerations

The database must:

- Protect reserved system permissions
- Prevent duplicate permission codes
- Validate foreign keys
- Maintain immutable audit records
- Support soft deletion for archived permissions

---

# Data Retention

Recommended retention:

| Data | Retention |
|------|-----------|
| Permission Definitions | Lifetime |
| Categories | Lifetime |
| Resources | Lifetime |
| Actions | Lifetime |
| Metadata | Lifetime |
| Audit Events | 7 Years |

---

# Scalability

The design must support:

- Thousands of permissions
- Millions of authorization requests (through cache)
- Billions of audit events
- Horizontal scaling
- Read replicas
- Database partitioning
- Distributed caching

---

# Migration Strategy

Database changes must:

- Be version controlled
- Support rollback
- Maintain backward compatibility
- Be tested before deployment

---

# Future Enhancements

Future versions may include:

- Permission Groups
- Wildcard Permissions
- Dynamic Permissions
- Policy-Based Permissions
- ABAC Attributes
- Multi-Tenant Permission Templates

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

Platform

- ../../../13-database/README.md

Security

- ../../../09-security/authorization.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|------------------------------|
| 1.0.0 | 2026-07-04 | Founder | Initial Permission Management Database Design |