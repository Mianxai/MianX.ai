---
id: FEAT-006-API
title: Membership Management API Specification
version: 1.0.0
status: Draft

feature: FEAT-006

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
  - membership
  - api
  - organization
  - workspace
  - invitation
  - rbac
---

# Membership Management API Specification

> This document defines the REST APIs for managing memberships, invitations, and role assignments across the Mianx.ai platform.

---

# Purpose

The Membership Management API provides endpoints for managing organization memberships, workspace memberships, invitations, role assignments, membership lifecycle, and search operations.

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
/api/v1/memberships
```

Future versions

```text
/api/v2/memberships
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

## Get Memberships

```http
GET /
```

Returns a paginated list of memberships.

Supports:

- Pagination
- Search
- Filtering
- Sorting

---

## Get Membership

```http
GET /{membership_id}
```

Returns details of a specific membership.

---

## Create Membership

```http
POST /
```

Example Request

```json
{
  "organization_id": "org_001",
  "workspace_id": "ws_001",
  "user_id": "user_001",
  "roles": [
    "role_member"
  ]
}
```

---

## Update Membership

```http
PUT /{membership_id}
```

Editable fields:

- Workspace
- Membership Status
- Assigned Roles

Organization and User cannot be changed after creation.

---

## Remove Membership

```http
DELETE /{membership_id}
```

Removes the membership.

Owner memberships cannot be removed unless ownership has been transferred.

---

## Suspend Membership

```http
PATCH /{membership_id}/suspend
```

Suspends an active membership.

---

## Restore Membership

```http
PATCH /{membership_id}/restore
```

Restores a suspended membership.

---

# Invitation APIs

## Send Invitation

```http
POST /invitations
```

Example Request

```json
{
  "organization_id": "org_001",
  "workspace_id": "ws_001",
  "email": "user@example.com",
  "roles": [
    "role_member"
  ]
}
```

---

## Accept Invitation

```http
POST /invitations/{token}/accept
```

---

## Reject Invitation

```http
POST /invitations/{token}/reject
```

---

## Resend Invitation

```http
POST /invitations/{invitation_id}/resend
```

---

## Cancel Invitation

```http
DELETE /invitations/{invitation_id}
```

---

# Role Assignment APIs

## Assign Roles

```http
POST /{membership_id}/roles
```

Example Request

```json
{
  "roles": [
    "role_admin",
    "role_manager"
  ]
}
```

---

## Remove Role

```http
DELETE /{membership_id}/roles/{role_id}
```

---

## Replace Roles

```http
PUT /{membership_id}/roles
```

Replaces all existing role assignments.

---

# Search APIs

Supports searching by:

- User Name
- Email
- Organization
- Workspace

Supports filtering by:

- Membership Status
- Invitation Status
- Organization
- Workspace
- Assigned Role

Supports sorting by:

- User Name
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

User

- Required

Workspace

- Optional

Roles

- At least one role is recommended
- All roles must belong to the selected organization

Invitation Email

- Required
- Valid email format

Membership Status

Supported values:

- Pending
- Active
- Suspended
- Removed

Invitation Status

Supported values:

- Pending
- Accepted
- Rejected
- Cancelled
- Expired

---

# Rate Limiting

Recommended limits

| Endpoint | Limit |
|----------|-------|
| Create Membership | 100 requests/hour |
| Send Invitation | 100 requests/hour |
| Assign Roles | 300 requests/hour |
| Update Membership | 300 requests/hour |
| Search Memberships | 1000 requests/hour |

Limits may vary according to subscription plans.

---

# Security Requirements

The API must:

- Require HTTPS
- Validate authentication
- Validate authorization
- Validate organization ownership
- Protect owner memberships
- Validate invitation tokens
- Generate audit logs

---

# Error Codes

| Code | Description |
|------|-------------|
| MEMBER-001 | Membership Not Found |
| MEMBER-002 | Duplicate Membership |
| MEMBER-003 | Invitation Not Found |
| MEMBER-004 | Invitation Expired |
| MEMBER-005 | Invalid Invitation Token |
| MEMBER-006 | Invalid Role Assignment |
| MEMBER-007 | Protected Owner Membership |
| MEMBER-008 | Permission Denied |
| MEMBER-009 | Validation Failed |

---

# API Consumers

Internal

- Web Application
- Mobile Application
- Admin Portal
- AI Workforce

External

- Authentication Service
- Authorization Service
- Audit Service
- Analytics Service
- CRM
- ERP

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
| 1.0.0 | 2026-07-04 | Founder | Initial Membership Management API Specification |