---
id: FEAT-011-API
title: Comment Management API Specification
version: 1.0.0
status: Draft

feature: FEAT-011

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
  - comments
  - api
  - collaboration
  - mentions
  - reactions
---

# Comment Management API Specification

> This document defines the REST API contract for the Comment Management module.

---

# Purpose

The Comment Management API enables clients to create, retrieve, update, delete, restore, search, and manage comments, threaded replies, mentions, and emoji reactions across supported platform resources.

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
/api/v1/comments
```

Future versions

```text
/api/v2/comments
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

# Resource Context

Every create and search request operates within a resource.

Supported resource types:

- Task
- Subtask

Example:

```json
{
  "resource_type": "task",
  "resource_id": "task_001"
}
```

Future resource types may include Project, Issue, Document, Approval, and Milestone.

---

# API Endpoints

## List Comments

```http
GET /
```

Supported query parameters:

- resource_type
- resource_id
- author_id
- mentioned_user
- status
- page
- limit
- sort

---

## Get Comment

```http
GET /{comment_id}
```

Returns a single comment with replies, mentions, reactions, and metadata.

---

## Create Comment

```http
POST /
```

Example Request

```json
{
  "resource_type": "task",
  "resource_id": "task_001",
  "content": "Please review the latest implementation.",
  "mentions": [
    "user_001",
    "user_002"
  ]
}
```

Validation:

- Resource exists
- User has access
- Content is required

---

## Reply to Comment

```http
POST /{comment_id}/replies
```

Example Request

```json
{
  "content": "I'll review it today."
}
```

Validation:

- Parent comment exists
- Thread depth limit not exceeded

---

## Update Comment

```http
PUT /{comment_id}
```

Editable fields:

- Content

The system automatically updates edit history.

---

## Delete Comment

```http
DELETE /{comment_id}
```

Performs a soft delete.

---

## Restore Comment

```http
PATCH /{comment_id}/restore
```

Restores a previously deleted comment if retention policy allows.

---

# Mention APIs

## List Mentions

```http
GET /{comment_id}/mentions
```

Returns all valid mentions for the comment.

---

# Reaction APIs

## List Reactions

```http
GET /{comment_id}/reactions
```

---

## Add Reaction

```http
POST /{comment_id}/reactions
```

Example Request

```json
{
  "reaction": "👍"
}
```

---

## Remove Reaction

```http
DELETE /{comment_id}/reactions/{reaction}
```

Removes the current user's specified reaction.

---

# Search APIs

Supports searching by:

- Content
- Author
- Mentioned User

Supports filtering by:

- Resource Type
- Resource ID
- Status
- Date Range

Supports sorting by:

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

## Resource

- Resource type is required
- Resource ID is required
- Resource must exist
- User must have access

---

## Content

- Required
- Markdown supported
- Maximum length defined by platform configuration

---

## Reply

- Parent comment must exist
- Parent must belong to the same resource
- Maximum nesting depth must not be exceeded

---

## Mentions

- Mentioned users must exist
- Mentioned users must have access to the resource
- Duplicate mentions are ignored

---

## Reactions

- Only configured reaction types are allowed
- One identical reaction per user per comment

---

# Rate Limiting

Recommended limits:

| Endpoint | Limit |
|----------|-------|
| Create Comment | 1000 requests/hour |
| Update Comment | 1000 requests/hour |
| Add Reaction | 5000 requests/hour |
| Search Comments | 5000 requests/hour |

Limits may vary according to subscription plans.

---

# Security Requirements

The API must:

- Require HTTPS
- Validate authentication
- Validate RBAC permissions
- Validate resource authorization
- Enforce organization isolation
- Enforce workspace isolation
- Record audit logs
- Publish domain events

---

# Error Codes

| Code | Description |
|------|-------------|
| COMMENT-001 | Comment Not Found |
| COMMENT-002 | Resource Not Found |
| COMMENT-003 | Invalid Resource Type |
| COMMENT-004 | Parent Comment Not Found |
| COMMENT-005 | Thread Depth Exceeded |
| COMMENT-006 | Invalid Mention |
| COMMENT-007 | Duplicate Reaction |
| COMMENT-008 | Permission Denied |
| COMMENT-009 | Validation Failed |
| COMMENT-010 | Comment Already Deleted |

---

# API Consumers

Internal

- Web Application
- Mobile Application
- Admin Portal
- AI Workforce

External

- Notification Service
- Audit Service
- Activity Service
- Automation Engine
- Reporting
- Analytics

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
- ../10-subtask-management/api.md

Platform

- ../../../12-api/README.md

Security

- ../../../09-security/authorization.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Comment Management API Specification |