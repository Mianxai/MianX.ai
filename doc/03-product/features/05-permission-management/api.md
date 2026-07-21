---
id: FEAT-005-API
title: Permission Management API Specification
version: 1.0.0
status: Draft

feature: FEAT-005

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
  - permission
  - api
  - authorization
  - rbac
---

# Permission Management API Specification

> This document defines the REST APIs for managing permission definitions across the Mianx.ai platform.

---

# Purpose

The Permission Management API provides endpoints for creating, updating, searching, archiving, restoring, and managing permission definitions.

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
/api/v1/permissions
```

Future versions

```text
/api/v2/permissions
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

## Get Permissions

```http
GET /
```

Returns a paginated list of permissions.

Supports:

- Pagination
- Search
- Filtering
- Sorting

---

## Get Permission

```http
GET /{permission_id}
```

Returns a single permission definition.

---

## Create Permission

```http
POST /
```

Example Request

```json
{
  "permission_name": "Create User",
  "permission_code": "users.create",
  "resource": "users",
  "action": "create",
  "category": "Identity",
  "description": "Allows creation of users."
}
```

---

## Update Permission

```http
PUT /{permission_id}
```

Editable fields:

- permission_name
- description
- category
- status

Permission Code, Resource, and Action are immutable after creation.

---

## Archive Permission

```http
PATCH /{permission_id}/archive
```

Archives an existing permission.

---

## Restore Permission

```http
PATCH /{permission_id}/restore
```

Restores an archived permission.

---

## Change Permission Status

```http
PATCH /{permission_id}/status
```

Example Request

```json
{
  "status": "Active"
}
```

Supported values:

- Draft
- Active
- Disabled
- Archived

---

## Get Permission Categories

```http
GET /categories
```

Returns all permission categories.

---

## Get Resources

```http
GET /resources
```

Returns supported resources.

---

## Get Actions

```http
GET /actions
```

Returns supported actions.

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

Permission Name

- Required

Permission Code

- Required
- Globally unique
- Immutable after creation

Resource

- Required

Action

- Required

Category

- Required

Status

Allowed values:

- Draft
- Active
- Disabled
- Archived

---

# Rate Limiting

Recommended limits

| Endpoint | Limit |
|----------|-------|
| Create Permission | 30 requests/hour |
| Update Permission | 60 requests/hour |
| Archive Permission | 30 requests/hour |
| Restore Permission | 30 requests/hour |
| Get Permissions | 500 requests/hour |

Limits may vary according to subscription plans.

---

# Security Requirements

The API must:

- Require HTTPS
- Validate authentication
- Validate authorization
- Protect reserved system permissions
- Validate all input
- Generate audit logs

---

# Error Codes

| Code | Description |
|------|-------------|
| PERMISSION-001 | Permission Not Found |
| PERMISSION-002 | Duplicate Permission Code |
| PERMISSION-003 | Duplicate Permission Name |
| PERMISSION-004 | Invalid Resource |
| PERMISSION-005 | Invalid Action |
| PERMISSION-006 | Invalid Category |
| PERMISSION-007 | Protected System Permission |
| PERMISSION-008 | Permission Denied |
| PERMISSION-009 | Validation Failed |

---

# API Consumers

Internal

- Web Application
- Mobile Application
- Admin Portal
- AI Workforce

External

- Role Management
- Authorization Service
- Membership Management
- Audit Service
- Analytics Service

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
| 1.0.0 | 2026-07-04 | Founder | Initial Permission Management API Specification |