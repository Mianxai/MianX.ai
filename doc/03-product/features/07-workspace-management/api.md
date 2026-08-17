---
id: FEAT-007-API
title: Workspace Management API Specification
version: 1.0.0
status: Draft

feature: FEAT-007

owner:
  technical: Backend Engineering Team
  api: Platform API Team
  ai: API AI

reviewers:
  - Platform Architecture Team
  - Security Team
  - Frontend Team

created: 2026-07-04
updated: 2026-07-04

category: API

tags:
  - workspace
  - api
  - organization
  - collaboration
  - multi-tenant
---

# Workspace Management API Specification

> This document defines the REST APIs for managing workspaces across the Mianx.ai platform.

---

# Purpose

The Workspace Management API provides endpoints for creating, updating, searching, archiving, restoring, deleting, and configuring workspaces.

These APIs are consumed by the Web Application, Mobile Application, Admin Portal, AI Workforce, and internal platform services.

---

# API Design Principles

The APIs must be:

- RESTful
- Stateless
- Versioned
- Secure by Default
- Predictable
- Consistent

---

# Base URL

```text
/api/v1/workspaces
```

Future versions

```text
/api/v2/workspaces
```

---

# Authentication

All endpoints require authentication.

```http
Authorization: Bearer <access_token>
```

---

# Standard Headers

```http
Content-Type: application/json
Accept: application/json
```

---

# API Endpoints

## Get Workspaces

```http
GET /
```

Returns a paginated list of workspaces.

Supports:

- Pagination
- Search
- Filtering
- Sorting

---

## Get Workspace

```http
GET /{workspace_id}
```

Returns complete workspace information.

---

## Create Workspace

```http
POST /
```

Example Request

```json
{
  "organization_id": "org_001",
  "name": "Engineering",
  "description": "Engineering Workspace",
  "visibility": "private",
  "timezone": "UTC",
  "language": "en"
}
```

---

## Update Workspace

```http
PUT /{workspace_id}
```

Editable fields:

- Name
- Description
- Visibility
- Logo
- Settings

Organization cannot be changed.

---

## Archive Workspace

```http
PATCH /{workspace_id}/archive
```

Archives the workspace.

---

## Restore Workspace

```http
PATCH /{workspace_id}/restore
```

Restores an archived workspace.

---

## Delete Workspace

```http
DELETE /{workspace_id}
```

Soft deletes the workspace according to retention policy.

---

# Workspace Settings APIs

## Get Settings

```http
GET /{workspace_id}/settings
```

Returns workspace configuration.

---

## Update Settings

```http
PUT /{workspace_id}/settings
```

Example Request

```json
{
  "timezone": "UTC",
  "language": "en",
  "date_format": "YYYY-MM-DD",
  "default_dashboard": "overview"
}
```

---

# Search APIs

Supports searching by:

- Workspace Name
- Description

Supports filtering by:

- Status
- Visibility
- Organization
- Owner
- Created Date

Supports sorting by:

- Name
- Created Date
- Updated Date

---

# Standard Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

---

# Standard Error Response

```json
{
  "success": false,
  "message": "Request could not be completed.",
  "errors": []
}
```

---

# HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

# Validation Rules

Organization

- Required
- Must exist

Workspace Name

- Required
- Unique within organization
- Maximum 100 characters

Visibility

Supported values:

- Private
- Internal
- Public

Status

Supported values:

- Draft
- Active
- Archived
- Deleted

---

# Rate Limiting

Recommended limits

| Endpoint | Limit |
|----------|-------|
| Create Workspace | 100 requests/hour |
| Update Workspace | 300 requests/hour |
| Archive Workspace | 100 requests/hour |
| Restore Workspace | 100 requests/hour |
| Search Workspaces | 1000 requests/hour |

Limits may vary according to subscription plans.

---

# Security Requirements

The API must:

- Require HTTPS
- Validate authentication
- Validate authorization
- Restrict cross-organization access
- Validate workspace ownership
- Generate audit logs
- Protect archived workspaces

---

# Error Codes

| Code | Description |
|------|-------------|
| WS-001 | Workspace Not Found |
| WS-002 | Duplicate Workspace Name |
| WS-003 | Invalid Organization |
| WS-004 | Invalid Workspace State |
| WS-005 | Workspace Already Archived |
| WS-006 | Workspace Already Deleted |
| WS-007 | Permission Denied |
| WS-008 | Validation Failed |
| WS-009 | Dependency Conflict |

---

# API Consumers

Internal

- Web Application
- Mobile Application
- Admin Portal
- AI Workforce

External

- Membership Service
- Authorization Service
- Audit Service
- Analytics Service
- Notification Service

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

Platform

- ../../../12-api/README.md

Security

- ../../../09-security/authorization.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|------------------------------|
| 1.0.0 | 2026-07-04 | Founder | Initial Workspace Management API Specification |