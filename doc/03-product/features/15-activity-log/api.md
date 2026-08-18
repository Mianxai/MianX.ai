---
id: FEAT-015-API
title: Activity Log API Specification
version: 1.0.0
status: Draft

feature: FEAT-015

owner:
  technical: Platform Engineering Team
  backend: API Engineering Team
  ai: API Documentation AI

reviewers:
  - Platform Architecture Team
  - Backend Team
  - QA Team

created: 2026-07-05
updated: 2026-07-05

category: API

tags:
  - api
  - rest
  - activity-log
  - timeline
---

# Activity Log API Specification

> This document defines the REST API contracts for the Activity Log feature.

---

# Purpose

The Activity Log APIs provide authorized users with secure, paginated, searchable access to business activity timelines while preserving organization isolation and immutable historical records.

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

Permissions are enforced using RBAC.

Examples:

- activity.read
- activity.organization.read
- activity.workspace.read
- activity.project.read
- activity.user.read
- activity.admin

Users may access only activities for resources they are authorized to view.

---

# Base URL

```
/api/v1/activities
```

---

# Activity Timeline APIs

## List Activities

GET /

Query Parameters:

| Name | Type | Description |
|------|------|-------------|
| page | integer | Page number |
| limit | integer | Page size |
| actor | UUID | Filter by actor |
| activityType | string | Business event type |
| resourceType | string | Resource type |
| resourceId | UUID | Resource identifier |
| workspaceId | UUID | Workspace filter |
| projectId | UUID | Project filter |
| startDate | datetime | Start date |
| endDate | datetime | End date |
| search | string | Search keyword |

Response:

```json
{
  "data": [],
  "pagination": {},
  "meta": {}
}
```

---

## Get Activity

GET /{activityId}

Returns a single activity record.

Activities are immutable and read-only.

---

# Organization Timeline

GET /organizations/{organizationId}/activities

Returns organization-wide activity feed.

Supports pagination, search, filtering, and sorting.

---

# Workspace Timeline

GET /workspaces/{workspaceId}/activities

Returns activities for a specific workspace.

---

# Project Timeline

GET /projects/{projectId}/activities

Returns project-specific activity history.

---

# Task Timeline

GET /tasks/{taskId}/activities

Returns task-related activities.

---

# User Activity Timeline

GET /users/{userId}/activities

Returns activities performed by a specific user, subject to RBAC.

---

# Search API

GET /search

Supports searching by:

- Activity description
- Actor name
- Resource name
- Resource ID
- Activity type

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
    "code": "ACTIVITY_NOT_FOUND",
    "message": "Activity not found."
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
- Resource ownership
- Valid date ranges
- Pagination limits
- Supported activity types

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
- activity_type
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
| List activities | 120/min |
| Timeline APIs | 120/min |
| Search | 60/min |

Administrative endpoints may use configurable limits.

---

# Security Requirements

The API shall enforce:

- JWT authentication
- RBAC authorization
- Organization isolation
- Workspace isolation
- Input validation
- Rate limiting
- Audit logging of administrative access

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

- Manual activity creation
- Activity updates
- Activity deletion
- Event publishing
- Timeline replay
- Activity export
- Analytics
- AI summaries

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
|----------|------------|----------|--------------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Activity Log API Specification |