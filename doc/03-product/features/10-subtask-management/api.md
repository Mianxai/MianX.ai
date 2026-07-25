---
id: FEAT-010-API
title: Subtask Management API Specification
version: 1.0.0
status: Draft

feature: FEAT-010

owner:
  technical: Platform Engineering Team
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
  - subtask
  - api
  - task
  - workflow
  - collaboration
---

# Subtask Management API Specification

> This document defines the REST API contract for the Subtask Management module.

---

# Purpose

The Subtask Management API enables clients to create, manage, assign, update, complete, archive, restore, delete, and search subtasks while maintaining parent task integrity and enforcing authentication, authorization, and project membership rules.

---

# API Design Principles

The APIs must be:

- RESTful
- Stateless
- Versioned
- Secure by Default
- Consistent
- Predictable

---

# Base URL

```text
/api/v1/subtasks
```

Future versions

```text
/api/v2/subtasks
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

## List Subtasks

```http
GET /
```

Supports:

- Pagination
- Search
- Filtering
- Sorting

Optional query parameters:

- task_id
- project_id
- status
- priority
- assignee
- label
- due_date
- page
- limit

---

## Get Subtask

```http
GET /{subtask_id}
```

Returns complete subtask details.

---

## Create Subtask

```http
POST /
```

Example Request

```json
{
  "task_id": "task_001",
  "title": "Create Login Form",
  "description": "Build responsive login form UI.",
  "priority": "high",
  "status": "todo",
  "assignees": [
    "user_001"
  ],
  "due_date": "2026-08-20"
}
```

Parent task validation is mandatory before creation.

---

## Update Subtask

```http
PUT /{subtask_id}
```

Editable fields:

- Title
- Description
- Priority
- Status
- Due Date
- Labels

---

## Complete Subtask

```http
PATCH /{subtask_id}/complete
```

Marks the subtask as completed and triggers parent progress recalculation.

---

## Archive Subtask

```http
PATCH /{subtask_id}/archive
```

Archives the subtask.

---

## Restore Subtask

```http
PATCH /{subtask_id}/restore
```

Restores an archived subtask.

---

## Delete Subtask

```http
DELETE /{subtask_id}
```

Performs a soft delete.

---

# Assignment APIs

## List Assignees

```http
GET /{subtask_id}/assignees
```

---

## Assign Users

```http
POST /{subtask_id}/assignees
```

Example Request

```json
{
  "users": [
    "user_001",
    "user_002"
  ]
}
```

---

## Remove Assignee

```http
DELETE /{subtask_id}/assignees/{user_id}
```

---

# Label APIs

## List Labels

```http
GET /{subtask_id}/labels
```

---

## Add Label

```http
POST /{subtask_id}/labels
```

Example Request

```json
{
  "label": "Frontend",
  "color": "#3B82F6"
}
```

---

## Remove Label

```http
DELETE /{subtask_id}/labels/{label_id}
```

---

# Search APIs

Supports searching by:

- Title
- Description

Supports filtering by:

- Parent Task
- Project
- Status
- Priority
- Assignee
- Due Date
- Labels
- Creator

Supports sorting by:

- Created Date
- Updated Date
- Due Date
- Priority
- Status

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

## Parent Task

- Required
- Must exist
- Must be active
- Must belong to the selected project

---

## Title

- Required
- Maximum 200 characters

---

## Description

- Optional
- Markdown supported

---

## Priority

Allowed values:

- Critical
- High
- Medium
- Low

---

## Status

Allowed values:

- Draft
- Todo
- In Progress
- In Review
- Blocked
- Completed
- Archived
- Deleted

---

## Assignee

- Must exist
- Must be an active project member

---

## Due Date

- Optional
- Must satisfy parent task constraints if configured

---

# Rate Limiting

Recommended limits:

| Endpoint | Limit |
|----------|-------|
| Create Subtask | 500 requests/hour |
| Update Subtask | 1000 requests/hour |
| Assignment APIs | 1000 requests/hour |
| Search Subtasks | 5000 requests/hour |

Limits may vary according to subscription plans.

---

# Security Requirements

The API must:

- Require HTTPS
- Validate authentication
- Validate RBAC permissions
- Verify project membership
- Verify parent task ownership
- Enforce workspace isolation
- Enforce organization isolation
- Generate audit logs

---

# Error Codes

| Code | Description |
|------|-------------|
| SUBTASK-001 | Subtask Not Found |
| SUBTASK-002 | Parent Task Not Found |
| SUBTASK-003 | Parent Task Archived |
| SUBTASK-004 | Invalid Lifecycle Transition |
| SUBTASK-005 | Invalid Assignee |
| SUBTASK-006 | Subtask Already Archived |
| SUBTASK-007 | Subtask Already Deleted |
| SUBTASK-008 | Permission Denied |
| SUBTASK-009 | Validation Failed |
| SUBTASK-010 | Label Not Found |

---

# API Consumers

Internal

- Web Application
- Mobile Application
- Admin Portal
- AI Workforce

External

- Comment Management
- Attachment Management
- Notification Service
- Automation Engine
- Reporting
- Analytics
- Audit Service

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

- ../09-task-management/api.md

Platform

- ../../../12-api/README.md

Security

- ../../../09-security/authorization.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|------------------------------|
| 1.0.0 | 2026-07-04 | Founder | Initial Subtask Management API Specification |