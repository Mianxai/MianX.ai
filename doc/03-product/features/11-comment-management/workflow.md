---
id: FEAT-011-WORKFLOW
title: Comment Management Workflow
version: 1.0.0
status: Draft

feature: FEAT-011

owner:
  business: Product Team
  technical: Platform Engineering Team
  ai: Workflow AI

reviewers:
  - Platform Architecture Team
  - QA Team
  - Security Team

created: 2026-07-05
updated: 2026-07-05

category: Workflow

tags:
  - workflow
  - comments
  - collaboration
  - mentions
  - reactions
---

# Comment Management Workflow

> This document defines the operational workflows and lifecycle of the Comment Management feature.

---

# Purpose

The Comment Management workflow describes how comments are created, replied to, edited, reacted to, deleted, restored, and audited while remaining securely associated with supported platform resources.

Every workflow validates user permissions, resource accessibility, and business rules before executing any operation.

---

# Workflow Principles

Every workflow must:

- Require authentication
- Validate authorization
- Validate resource existence
- Validate organization access
- Validate workspace access
- Validate project membership (where applicable)
- Record audit logs
- Publish domain events
- Return standardized responses

---

# High-Level Workflow

```text
User
   │
   ▼
Authentication
   │
   ▼
Authorization
   │
   ▼
Resource Validation
   │
   ▼
Comment Service
   │
   ├────────────┬──────────────┐
   ▼            ▼              ▼
Thread Engine Mention Engine Reaction Engine
   │            │              │
   └────────────┼──────────────┘
                ▼
           Comment Store
                │
        ┌───────┼─────────┐
        ▼       ▼         ▼
Activity Log Event Bus Audit Service
                │
                ▼
Notifications / Automation / Analytics
```

---

# Comment Creation Workflow

```text
User

↓

Open Resource

↓

Open Comments

↓

Write Comment

↓

Validate Request

↓

Validate Resource

↓

Validate Permissions

↓

Store Comment

↓

Detect Mentions

↓

Record Activity

↓

Publish CommentCreated Event

↓

Return Success
```

Validation includes:

- Authentication
- Resource exists
- User has access
- Content is not empty
- Content length within limits

---

# Reply Workflow

```text
Open Thread

↓

Select Reply

↓

Write Reply

↓

Validate Parent Comment

↓

Validate Thread Depth

↓

Store Reply

↓

Detect Mentions

↓

Record Activity

↓

Publish CommentReplied Event

↓

Notify Participants
```

Business rules:

- Parent comment must exist.
- Maximum nesting depth must be enforced.
- Replies inherit visibility from the parent resource.

---

# Mention Workflow

```text
Submit Comment

↓

Parse @mentions

↓

Validate Users

↓

Remove Invalid Mentions

↓

Create Mention Records

↓

Publish MentionCreated Event

↓

Notify Mentioned Users
```

Rules:

- Mentioned users must have access to the same resource.
- Duplicate mentions within the same comment are ignored.

---

# Reaction Workflow

```text
Open Comment

↓

Select Reaction

↓

Validate Request

↓

Check Existing Reaction

↓

Add / Remove Reaction

↓

Update Counters

↓

Record Activity

↓

Publish Reaction Event
```

Rules:

- One reaction of the same type per user.
- Multiple reaction types may be supported.
- Deleted comments cannot receive reactions.

---

# Edit Workflow

```text
Open Comment

↓

Edit Content

↓

Validate Request

↓

Save Changes

↓

Update Edited Timestamp

↓

Record Activity

↓

Publish CommentUpdated Event
```

The system preserves edit history for audit purposes.

---

# Delete Workflow

Soft delete process:

```text
Delete Request

↓

Confirmation

↓

Permission Check

↓

Soft Delete

↓

Record Activity

↓

Publish CommentDeleted Event
```

Deleted comments display a placeholder message according to UI policy.

---

# Restore Workflow

```text
Restore Request

↓

Validate Permission

↓

Restore Comment

↓

Record Activity

↓

Publish CommentRestored Event
```

Restoration is only available within the configured retention period.

---

# Search Workflow

```text
User Search

↓

Validate Access

↓

Apply Filters

↓

Execute Search

↓

Sort Results

↓

Paginate

↓

Return Response
```

Supported filters:

- Resource Type
- Resource ID
- Author
- Mentioned User
- Date Range
- Content

---

# Activity Logging Workflow

The following actions generate activity records:

- Comment created
- Comment edited
- Comment deleted
- Comment restored
- Reply created
- Mention added
- Reaction added
- Reaction removed

Each record includes:

- User ID
- Organization ID
- Workspace ID
- Resource Type
- Resource ID
- Comment ID
- Timestamp
- Action
- Result

---

# Event Publishing

The Comment Management module publishes:

- CommentCreated
- CommentUpdated
- CommentDeleted
- CommentRestored
- CommentReplied
- MentionCreated
- ReactionAdded
- ReactionRemoved

Consumers:

- Notification Service
- Automation Engine
- Reporting
- Analytics
- Audit Service
- AI Workforce

---

# Exception Handling

The workflow must gracefully handle:

- Unauthorized requests
- Invalid permissions
- Missing resources
- Missing parent comments
- Invalid thread hierarchy
- Invalid mentions
- Duplicate reactions
- Validation failures
- Concurrent updates

---

# Related Documents

Feature

- README.md
- requirements.md
- architecture.md
- database.md
- api.md
- ui.md
- testing.md
- changelog.md

Dependencies

- ../09-task-management/workflow.md
- ../10-subtask-management/workflow.md

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|------------------------------|
| 1.0.0 | 2026-07-05 | Founder | Initial Comment Management Workflow |