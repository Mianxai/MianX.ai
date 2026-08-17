---
id: FEAT-016-API
title: Audit Log API Specification
version: 1.0.0
status: Draft

feature: FEAT-016

owner:
  technical: Platform Engineering Team
  backend: API Engineering Team
  security: Security Engineering Team
  ai: API Documentation AI

reviewers:
  - Platform Architecture Team
  - Security Team
  - Backend Team
  - QA Team

created: 2026-07-05
updated: 2026-07-05

category: API

tags:
  - api
  - rest
  - audit-log
  - security
  - compliance
---

# Audit Log API Specification

> This document defines the REST API contracts for the Audit Log feature.

---

# Purpose

The Audit Log APIs provide secure, authorized, paginated, and searchable access to immutable audit records for security, governance, compliance, and forensic investigations.

---

# API Principles

The APIs shall be:

- RESTful
- Read-only
- Versioned (`/api/v1`)
- JSON-based
- Stateless
- Multi-tenant aware
- RBAC protected
- Consistently paginated

---

# Authentication

All endpoints require authentication.

Supported:

- JWT Bearer Token
- OAuth2 (future)

Unauthenticated requests return:

```
401 Unauthorized
```

---

# Authorization

Access is restricted using RBAC.

Example permissions:

- audit.read
- audit.organization.read
- audit.workspace.read
- audit.security.read
- audit.admin

Only authorized administrators and compliance roles may access audit records.

---

# Base URL

```
/api/v1/audit-logs
```

---

# Audit APIs

## List Audit Records

GET /

Query Parameters:

| Name | Type | Description |
|------|------|-------------|
| page | integer | Page number |
| limit | integer | Page size |
| actor | UUID | Filter by actor |
| eventType | string | Audit event type |
| eventCategory | string | Authentication, Authorization, etc. |
| resourceType | string | Target resource type |
| resourceId | UUID | Target resource identifier |
| organizationId | UUID | Organization filter |
| workspaceId | UUID | Workspace filter |
| result | string | Success / Failure |
| startDate | datetime | Start date |
| endDate | datetime | End date |
| search | string | Free-text search |

Response:

```json
{
  "data": [],
  "pagination": {},
  "meta": {}
}
```

---

## Get Audit Record

GET /{auditId}

Returns a single immutable audit record.

---

## Organization Audit Timeline

GET /organizations/{organizationId}/audit-logs

Returns organization-scoped audit records.

---

## Workspace Audit Timeline

GET /workspaces/{workspaceId}/audit-logs

Returns workspace-scoped audit records.

---

## User Audit History

GET /users/{userId}/audit-logs

Returns audit history related to a specific user.

---

## Search Audit Records

GET /search

Supports searching by:

- Actor
- Event type
- Event category
- Resource
- IP address
- Session ID
- Request ID
- Description

Filters may be combined.

---

# Standard Response Format

Success:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "AUDIT_RECORD_NOT_FOUND",
    "message": "Audit record not found."
  }
}
```

---

# HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

# Validation Rules

The API shall validate:

- UUID formats
- Organization isolation
- Workspace authorization
- Valid date ranges
- Pagination limits
- Supported event categories
- Supported event types

---

# Pagination

Supported parameters:

- page
- limit

Default:

```
page=1
limit=20
```

Maximum:

```
limit=100
```

---

# Sorting

Supported fields:

- occurred_at
- created_at
- event_type
- actor

Default:

```
occurred_at DESC
```

---

# Rate Limiting

Recommended defaults:

| Endpoint | Limit |
|----------|------:|
| List audit records | 60/min |
| Search | 30/min |
| Timeline APIs | 60/min |

Administrative limits should be configurable.

---

# Security Requirements

The API shall enforce:

- JWT authentication
- RBAC authorization
- Organization isolation
- Workspace isolation
- Input validation
- Rate limiting
- Administrative audit logging
- Immutable response model

---

# API Versioning

Current version:

```
v1
```

Breaking changes require:

- New major version
- Migration guide
- Deprecation notice
- Compatibility window

---

# Out of Scope

Version 1 does not expose APIs for:

- Audit creation
- Audit updates
- Audit deletion
- Event publishing
- Record modification
- Export generation
- Compliance reporting
- SIEM integrations

These capabilities are internal or planned for future releases.

---

# Related Documents

Feature

- README.md
- requirements.md
- architecture.md
- workflow.md
- database.md
- ui.md
- testing.md
- changelog.md

Dependencies

- ../../../04-platform/api-standards.md
- ../../../05-platform/authentication.md
- ../../../05-platform/authorization.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|-------------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Audit Log API Specification |