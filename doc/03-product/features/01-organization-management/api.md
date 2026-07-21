---
id: FEAT-002-API
title: Organization Management API Specification
version: 1.0.0
status: Draft

feature: FEAT-002

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
  - organization
  - api
  - multi-tenant
  - workspace
---

# Organization Management API Specification

> This document defines the public and internal APIs for the Organization Management module.

---

# Purpose

This document defines the API contract for creating, managing, and maintaining organizations across the Mianx.ai platform.

The APIs are consumed by Web, Mobile, Desktop (future), AI Agents, and internal platform services.

---

# API Design Principles

The APIs must be:

- RESTful
- Stateless
- Secure by Default
- Versioned
- Predictable
- Consistent
- Backward Compatible where possible

---

# Base URL

```text
/api/v1/organizations
```

Future versions:

```text
/api/v2/organizations
```

---

# Authentication

All endpoints require authentication unless explicitly documented otherwise.

Authorization Header

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

## Create Organization

```http
POST /
```

Purpose

Create a new organization.

Request

```json
{
  "legal_name": "Mianx Technologies",
  "display_name": "Mianx",
  "industry": "Software",
  "timezone": "Asia/Karachi",
  "language": "en"
}
```

Success Response

```json
{
  "success": true,
  "data": {
    "organization_id": "org_xxxxxxxxx"
  }
}
```

---

## Get Organization

```http
GET /{organization_id}
```

Purpose

Retrieve organization details.

---

## Update Organization

```http
PUT /{organization_id}
```

Purpose

Update organization profile and configuration.

---

## Archive Organization

```http
POST /{organization_id}/archive
```

Purpose

Archive an organization.

---

## Restore Organization

```http
POST /{organization_id}/restore
```

Purpose

Restore an archived organization.

---

## Transfer Ownership

```http
POST /{organization_id}/transfer-ownership
```

Purpose

Transfer organization ownership to another eligible member.

---

## Organization Settings

### Get Settings

```http
GET /{organization_id}/settings
```

### Update Settings

```http
PUT /{organization_id}/settings
```

Purpose

Manage organization configuration.

---

## Workspaces

### List Workspaces

```http
GET /{organization_id}/workspaces
```

### Create Workspace

```http
POST /{organization_id}/workspaces
```

### Update Workspace

```http
PUT /workspaces/{workspace_id}
```

### Archive Workspace

```http
POST /workspaces/{workspace_id}/archive
```

---

## Membership Overview

Membership lifecycle is managed by the Membership Management feature.

Current endpoints:

```http
GET /{organization_id}/members
```

```http
POST /{organization_id}/members/invite
```

```http
DELETE /{organization_id}/members/{membership_id}
```

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

Organization Name

- Required
- Maximum length defined by platform standards
- Must not contain prohibited characters

Timezone

- Required
- Must be a supported timezone

Language

- Must be a supported language

Workspace Name

- Required
- Unique within the organization

---

# Rate Limiting

Recommended limits:

| Endpoint | Limit |
|----------|-------|
| Create Organization | 5 requests/hour |
| Update Organization | 60 requests/hour |
| Create Workspace | 20 requests/hour |
| Invite Member | 100 requests/hour |

Limits may vary based on subscription plans.

---

# Security Requirements

The API must:

- Require HTTPS
- Validate authenticated identity
- Validate organization membership
- Validate permissions
- Prevent cross-tenant access
- Log critical actions
- Return safe error messages

---

# Versioning Strategy

Current Version

```text
v1
```

Future

```text
v2
v3
```

Breaking changes require a new API version.

---

# Error Codes

| Code | Description |
|------|-------------|
| ORG-001 | Organization Not Found |
| ORG-002 | Organization Already Exists |
| ORG-003 | Organization Suspended |
| ORG-004 | Organization Archived |
| ORG-005 | Invalid Owner |
| ORG-006 | Workspace Already Exists |
| ORG-007 | Permission Denied |
| ORG-008 | Membership Required |

---

# API Consumers

Internal

- Web Application
- Mobile Application
- Admin Portal
- AI Workforce

External

- Enterprise Integrations
- Billing Service
- Notification Service
- Identity Service

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
| 1.0.0 | 2026-07-04 | Founder | Initial Organization Management API Specification |