---
id: FEAT-010-WORKFLOW
title: Subtask Management Workflow
version: 1.0.0
status: Draft

feature: FEAT-010

owner:
  business: Product Team
  technical: Platform Engineering Team
  ai: Workflow AI

reviewers:
  - Platform Architecture Team
  - QA Team
  - Security Team

created: 2026-07-04
updated: 2026-07-04

category: Workflow

tags:
  - workflow
  - subtask
  - task
  - lifecycle
  - activity
---

# Subtask Management Workflow

> This document defines the operational workflows and lifecycle of the Subtask Management feature.

---

# Purpose

The Subtask Management workflow defines how subtasks are created, assigned, updated, completed, archived, restored, and deleted while maintaining a valid relationship with their parent task.

Every workflow ensures security validation, business rule enforcement, audit logging, and event publishing.

---

# Workflow Principles

Every workflow must:

- Require authentication
- Validate authorization
- Verify organization access
- Verify workspace access
- Verify project membership
- Validate parent task
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
Organization Validation
   │
   ▼
Workspace Validation
   │
   ▼
Project Validation
   │
   ▼
Parent Task Validation
   │
   ▼
Subtask Service
   │
   ├──────────────┐
   ▼              ▼
Database      Activity Log
   │              │
   ▼              ▼
Event Bus   Audit Service
   │
   ▼
Notifications
Automation
Reporting
AI Workforce
```

---

# Subtask Creation Workflow

```text
User

↓

Open Parent Task

↓

Click Create Subtask

↓

Enter Details

↓

Validate Request

↓

Validate Parent Task

↓

Create Subtask

↓

Update Parent Progress

↓

Record Activity

↓

Publish SubtaskCreated Event

↓

Return Success
```

Validation includes:

- Authentication
- Project membership
- Parent task exists
- Parent task is active
- Required fields
- Permission checks

---

# Assignment Workflow

```text
Select Subtask

↓

Choose Assignee(s)

↓

Validate User(s)

↓

Verify Project Membership

↓

Assign Users

↓

Update Assignment

↓

Record Activity

↓

Publish SubtaskAssigned Event

↓

Notify Assignee(s)
```

---

# Status Transition Workflow

```text
Draft

↓

Todo

↓

In Progress

↓

In Review

├─────────────┐
│             │
▼             ▼
Blocked   Completed
               │
               ▼
          Update Parent Progress
               │
               ▼
           Archived
               │
               ▼
           Deleted
```

Rules:

- Invalid transitions are rejected.
- Completed subtasks may be reopened only by authorized users.
- Archived subtasks are read-only.
- Deleted subtasks cannot be modified.

---

# Update Workflow

```text
Open Subtask

↓

Modify Details

↓

Validate Changes

↓

Save Updates

↓

Update Parent Progress

↓

Record Activity

↓

Publish SubtaskUpdated Event
```

Editable fields:

- Title
- Description
- Priority
- Status
- Due Date
- Labels
- Assignee(s)

---

# Completion Workflow

```text
Open Subtask

↓

Mark Complete

↓

Validate Current State

↓

Update Status

↓

Recalculate Parent Progress

↓

Record Activity

↓

Publish SubtaskCompleted Event

↓

Trigger Notifications
```

---

# Archive Workflow

```text
Select Archive

↓

Confirmation Dialog

↓

Archive Subtask

↓

Record Activity

↓

Publish SubtaskArchived Event
```

Archived subtasks remain searchable (subject to permissions) but cannot be edited.

---

# Restore Workflow

```text
Select Restore

↓

Validate Permission

↓

Restore Subtask

↓

Update Parent Progress

↓

Record Activity

↓

Publish SubtaskRestored Event
```

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

Update Parent Progress

↓

Record Audit

↓

Publish SubtaskDeleted Event
```

Deleted subtasks remain recoverable according to platform retention policies.

---

# Parent Progress Synchronization

Parent task progress is recalculated whenever:

- Subtask is created
- Subtask is completed
- Subtask is reopened
- Subtask is deleted
- Subtask is restored

Future versions may support weighted progress calculations.

---

# Search Workflow

```text
User Search

↓

Validate Access

↓

Apply Filters

↓

Execute Query

↓

Sort Results

↓

Paginate

↓

Return Response
```

Supported filters:

- Parent Task
- Status
- Priority
- Assignee
- Labels
- Due Date

---

# Activity Logging Workflow

The following actions generate activity records:

- Subtask created
- Subtask updated
- Assignment changed
- Status changed
- Priority changed
- Due date changed
- Completed
- Archived
- Restored
- Deleted

Each record includes:

- User ID
- Organization ID
- Workspace ID
- Project ID
- Parent Task ID
- Subtask ID
- Timestamp
- Action
- Result

---

# Event Publishing

The Subtask Management module publishes:

- SubtaskCreated
- SubtaskUpdated
- SubtaskAssigned
- SubtaskUnassigned
- SubtaskStatusChanged
- SubtaskCompleted
- SubtaskArchived
- SubtaskRestored
- SubtaskDeleted

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
- Missing parent task
- Invalid lifecycle transitions
- Invalid assignee
- Validation failures
- Concurrent updates
- Deleted parent task

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

---

# Revision History

| Version | Date | Author | Description |
|----------|------------|----------|------------------------------|
| 1.0.0 | 2026-07-04 | Founder | Initial Subtask Management Workflow |