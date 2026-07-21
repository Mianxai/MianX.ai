 ---
id: FEAT-013-API
title: Label & Tag Management API Specification
version: 1.0.0
status: Draft

feature: FEAT-013

owner:
  technical: Platform Engineering Team
  api: Platform API Team
  ai: API AI

reviewers:
  - Platform Architecture Team
  - Security Team
  - Frontend Team

created: 2026-07-05
updated: 2026-07-05

category: API

tags:
  - api
  - labels
  - tags
  - assignments
  - rest
---

# Label & Tag Management API Specification

> This document defines the REST API contract for the Label & Tag Management feature.

---

# Purpose

The API enables secure creation, management, assignment, removal, searching, and bulk operations for labels and tags across all supported platform resources.

---

# API Design Principles

The APIs must be:

- RESTful
- Stateless
- Versioned
- Resource Agnostic
- Consistent
- Secure by Default
- Predictable
- Backward Compatible

---

# Base URL

```text
/api/v1
```

Resources:

```text
/api/v1/labels
/api/v1/tags
/api/v1/assignments
```

Future versions:

```text
/api/v2
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

# Resource Model

Assignments reference business resources using:

```json
{
  "resource_type": "task",
  "resource_id": "task_001"
}
```

Supported resource types:

- project
- task
- subtask
- comment

Future:

- issue
- document
- approval
- milestone

---

# Label APIs

## List Labels

```http
GET /labels
```

Query parameters:

- search
- status
- visibility
- workspace_id
- page
- limit
- sort

---

## Get Label

```http
GET /labels/{label_id}
```

Returns complete label details.

---

## Create Label

```http
POST /labels
```

Example Request

```json
{
  "name": "High Priority",
  "color": "#EF4444",
  "description": "Requires immediate attention",
  "visibility": "organization"
}
```

---

## Update Label

```http
PUT /labels/{label_id}
```

Editable fields:

- name
- color
- description
- visibility

---

## Archive Label

```http
PATCH /labels/{label_id}/archive
```

Archived labels remain visible on existing resources but cannot be newly assigned.

---

## Restore Label

```http
PATCH /labels/{label_id}/restore
```

---

## Delete Label

```http
DELETE /labels/{label_id}
```

Deletion follows organization retention policy.

---

# Tag APIs

## List Tags

```http
GET /tags
```

Supports:

- search
- usage_count
- page
- limit
- sort

---

## Get Tag

```http
GET /tags/{tag_id}
```

---

## Create Tag

```http
POST /tags
```

Example Request

```json
{
  "name": "backend"
}
```

---

## Update Tag

```http
PUT /tags/{tag_id}
```

Editable:

- display_name
- description

---

## Delete Tag

```http
DELETE /tags/{tag_id}
```

Unused tags may be deleted according to policy.

---

# Assignment APIs

## Assign Labels

```http
POST /assignments/labels
```

Example Request

```json
{
  "resource_type": "task",
  "resource_id": "task_001",
  "label_ids": [
    "label_001",
    "label_002"
  ]
}
```

---

## Remove Labels

```http
DELETE /assignments/labels
```

---

## Assign Tags

```http
POST /assignments/tags
```

Example Request

```json
{
  "resource_type": "task",
  "resource_id": "task_001",
  "tag_ids": [
    "tag_001",
    "tag_002"
  ]
}
```

---

## Remove Tags

```http
DELETE /assignments/tags
```

---

## Bulk Assignment

```http
POST /assignments/bulk
```

Example Request

```json
{
  "resource_ids": [
    "task_001",
    "task_002",
    "task_003"
  ],
  "resource_type": "task",
  "label_ids": [
    "label_001"
  ],
  "tag_ids": [
    "tag_001",
    "tag_002"
  ]
}
```

---

# Search API

```http
GET /assignments/search
```

Supported filters:

- label
- tag
- resource_type
- workspace
- project
- creator
- status
- created_after
- created_before

Supports:

- pagination
- sorting

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

## Labels

- Name is required
- Name must be unique within scope
- Valid color required
- Valid visibility required

---

## Tags

- Name is required
- Duplicate names prohibited (case-insensitive)
- Reserved names rejected

---

## Assignments

- Resource must exist
- User must have access
- Organization must match
- Workspace must match
- Duplicate assignments rejected
- Archived labels cannot be assigned

---

# Rate Limiting

Recommended limits:

| Endpoint | Limit |
|----------|-------|
| Create Label | 200 requests/hour |
| Update Label | 500 requests/hour |
| Create Tag | 500 requests/hour |
| Assignment APIs | 2,000 requests/hour |
| Bulk Assignment | 200 requests/hour |
| Search | 5,000 requests/hour |

Limits may vary by subscription plan.

---

# Security Requirements

The API must:

- Require HTTPS
- Validate JWT authentication
- Enforce RBAC authorization
- Enforce organization isolation
- Enforce workspace isolation
- Validate resource ownership
- Record audit logs
- Publish domain events

---

# Error Codes

| Code | Description |
|------|-------------|
| LABEL-001 | Label Not Found |
| LABEL-002 | Duplicate Label Name |
| LABEL-003 | Label Archived |
| LABEL-004 | Invalid Label Color |
| LABEL-005 | Label Assignment Failed |
| TAG-001 | Tag Not Found |
| TAG-002 | Duplicate Tag Name |
| TAG-003 | Invalid Tag |
| ASSIGNMENT-001 | Resource Not Found |
| ASSIGNMENT-002 | Duplicate Assignment |
| ASSIGNMENT-003 | Permission Denied |
| ASSIGNMENT-004 | Workspace Mismatch |
| ASSIGNMENT-005 | Organization Mismatch |

---

# API Consumers

Internal

- Web Application
- Mobile Application
- Admin Portal
- AI Workforce

External

- Search Service
- Notification Service
- Automation Engine
- Audit Service
- Analytics
- Reporting

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

- ../08-project-management/api.md
- ../09-task-management/api.md
- ../10-subtask-management/api.md
- ../11-comment-management/api.md

Platform

- ../../../12-api/README.md

Security

- ../../../09-security/authorization.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|---------------------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Label & Tag Management API Specification |