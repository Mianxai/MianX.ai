---
id: FEAT-003-API
title: User Management API Specification
version: 1.0.0
status: Draft

feature: FEAT-003

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
  - user
  - profile
  - api
---

# User Management API Specification

> This document defines the REST APIs for managing user profiles, preferences, avatars, and account information.

---

# Purpose

The User Management API provides a consistent interface for managing user profile data across the Mianx.ai platform.

These APIs are consumed by Web, Mobile, Desktop (future), AI Agents, and internal platform services.

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
/api/v1/users
```

Future versions

```text
/api/v2/users
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

## Get My Profile

```http
GET /me
```

Purpose

Returns the authenticated user's profile.

---

## Update My Profile

```http
PUT /me
```

Example Request

```json
{
  "first_name": "Ali",
  "last_name": "Khan",
  "display_name": "Ali Khan",
  "phone_number": "+923001234567",
  "biography": "Founder of Mianx.ai"
}
```

---

## Get User Profile

```http
GET /{user_id}
```

Purpose

Returns profile information for an authorized user.

---

## Update User Status

```http
PATCH /{user_id}/status
```

Supported Status

- Active
- Pending Verification
- Suspended
- Archived
- Disabled

---

# Preferences

## Get Preferences

```http
GET /me/preferences
```

---

## Update Preferences

```http
PUT /me/preferences
```

Example Request

```json
{
  "language": "en",
  "timezone": "Asia/Karachi",
  "theme": "dark",
  "date_format": "YYYY-MM-DD",
  "time_format": "24h"
}
```

---

# Avatar

## Upload Avatar

```http
POST /me/avatar
```

Content Type

```text
multipart/form-data
```

---

## Replace Avatar

```http
PUT /me/avatar
```

---

## Delete Avatar

```http
DELETE /me/avatar
```

---

# Profile Completion

## Get Profile Completion

```http
GET /me/profile-completion
```

Example Response

```json
{
  "completion": 85,
  "missing_fields": [
    "phone_number",
    "avatar"
  ]
}
```

---

# Metadata

## Get Profile Metadata

```http
GET /me/metadata
```

Returns

- Created Date
- Updated Date
- Last Login
- Profile Completion
- Account Status

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

Profile

- First Name is required.
- Last Name is required.
- Display Name is required.

Avatar

- Supported image formats only.
- Maximum file size follows platform standards.
- Invalid files must be rejected.

Preferences

- Language must be supported.
- Timezone must be valid.
- Theme must match platform options.

---

# Rate Limiting

Recommended limits

| Endpoint | Limit |
|----------|-------|
| Update Profile | 60 requests/hour |
| Upload Avatar | 20 requests/hour |
| Update Preferences | 60 requests/hour |
| Get Profile | 300 requests/hour |

Limits may vary according to subscription plans.

---

# Security Requirements

The API must:

- Require HTTPS
- Validate authentication
- Enforce authorization
- Protect user privacy
- Prevent unauthorized updates
- Log critical profile changes

---

# Error Codes

| Code | Description |
|------|-------------|
| USER-001 | User Not Found |
| USER-002 | Profile Not Found |
| USER-003 | Invalid Profile Data |
| USER-004 | Invalid Avatar |
| USER-005 | Invalid Preferences |
| USER-006 | Permission Denied |
| USER-007 | Account Suspended |
| USER-008 | Validation Failed |

---

# API Consumers

Internal

- Web Application
- Mobile Application
- AI Workforce
- Admin Portal

External

- Notification Service
- Analytics Service
- CRM
- ERP
- HR

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
| 1.0.0 | 2026-07-04 | Founder | Initial User Management API Specification |