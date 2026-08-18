---
id: FEAT-004-API
title: Role Management API Specification
version: 1.0.0
status: Draft

feature: FEAT-004

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
  - role
  - api
  - rbac
  - authorization
---

# Role Management API Specification

> This document defines the REST APIs for managing role definitions across the Mianx.ai platform.

---

# Purpose

The Role Management API provides endpoints for creating, updating, searching, archiving, and restoring roles.

The API serves Web, Mobile, Admin Portal, AI Agents, and internal platform services.

---

# API Design Principles

The APIs must be:

- RESTful
- Stateless
- Secure by Default
- Versioned
- Predictable
- Consistent

---

# Base URL

```text
/api/v1/roles
```

Future versions

```text
/api/v2/roles
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

## Get Roles

```http
GET /
```

Purpose

Returns paginated roles for the selected organization.

Supports:

- Pagination
- Search
- Filtering
- Sorting

---

## Get Role

```http
GET /{role_id}
```

Purpose

Returns details of a single role.

---

## Create Role

```http
POST /
```

Example Request

```json
{
  "role_name": "HR Manager",
  "role_code": "HR_MANAGER",
  "description": "Manages HR operations",
  "category": "Department"
}
```

---

## Update Role

```http
PUT /{role_id}
```

Updatable fields:

- role_name
- description
- category
- status

Role code cannot be modified after creation.

---

## Archive Role

```http
PATCH /{role_id}/archive
```

Purpose

Archives an existing role.

---

## Restore Role

```http
PATCH /{role_id}/restore
```

Purpose

Restores an archived role.

---

## Change Role Status

```http
PATCH /{role_id}/status
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

## Get Categories

```http
GET /categories
```

Returns all available role categories.

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

Role Name

- Required
- Unique within an organization

Role Code

- Required
- Unique within an organization
- Immutable after creation

Category

- Required
- Must exist

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
| Create Role | 30 requests/hour |
| Update Role | 60 requests/hour |
| Archive Role | 30 requests/hour |
| Restore Role | 30 requests/hour |
| Get Roles | 300 requests/hour |

Limits may vary according to subscription plans.

---

# Security Requirements

The API must:

- Require HTTPS
- Validate authentication
- Validate organization context
- Enforce authorization
- Protect system roles
- Log administrative actions

---

# Error Codes

| Code | Description |
|------|-------------|
| ROLE-001 | Role Not Found |
| ROLE-002 | Duplicate Role Name |
| ROLE-003 | Duplicate Role Code |
| ROLE-004 | Invalid Category |
| ROLE-005 | Invalid Status |
| ROLE-006 | Protected System Role |
| ROLE-007 | Permission Denied |
| ROLE-008 | Validation Failed |

---

# API Consumers

Internal

- Web Application
- Mobile Application
- Admin Portal
- AI Workforce

External

- Permission Management
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
| 1.0.0 | 2026-07-04 | Founder | Initial Role Management API Specification |