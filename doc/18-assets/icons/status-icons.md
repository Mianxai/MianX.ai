# Status Icons

> Enterprise standards for selecting, designing, implementing, validating, and governing status icons across the Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | Status Icons |
| Folder | docs/18-assets/icons |
| File Name | status-icons.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Design System, Product Design, Platform Reliability & Accessibility Department |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines the official standards for icons representing system, business, workflow, lifecycle, security, validation, availability, and operational statuses across Mianx.ai products.

It ensures that status icons remain:

- Consistent
- Semantically accurate
- Accessible
- Recognizable
- Theme-aware
- Reusable
- Machine-readable
- Suitable for real-time interfaces
- Independent from color alone
- Governed across all products

---

# Objectives

- Standardize status meanings.
- Prevent semantic conflicts.
- Maintain one central status vocabulary.
- Improve accessibility.
- Distinguish status from action.
- Support operational monitoring.
- Support workflow and lifecycle states.
- Enable reusable status components.
- Support AI and automation systems.
- Preserve complete version and audit history.

---

# Scope

These standards apply to icons representing:

- Success
- Warning
- Error
- Information
- Pending
- In Progress
- Active
- Inactive
- Enabled
- Disabled
- Paused
- Completed
- Failed
- Cancelled
- Degraded
- Offline
- Online
- Unknown
- Draft
- Under Review
- Approved
- Rejected
- Published
- Archived
- Expired
- Scheduled
- Queued
- Running
- Blocked
- Escalated
- Verified
- Unverified
- Secure
- At Risk
- Maintenance
- Partial Success
- Synced
- Out of Sync

---

# Core Principle

A status icon communicates what is currently true.

It must not communicate:

- What action the user can perform
- Where the user can navigate
- A decorative concept
- A vague emotional meaning
- An unverified state
- A prediction presented as a fact

The icon, text label, semantic color, metadata, and system state must all describe the same status.

---

# Status Icon Categories

The status icon system includes:

- Semantic Status Icons
- Operational Status Icons
- Lifecycle Status Icons
- Workflow Status Icons
- Validation Status Icons
- Availability Status Icons
- Security Status Icons
- Synchronization Status Icons
- Review Status Icons
- Publication Status Icons
- AI Agent Status Icons
- Data Quality Status Icons

---

# Status vs Action

A status icon describes current state.

An action icon describes an available operation.

Example:

```text
Status:
Paused

Action:
Resume
```

Do not use the pause icon alone as both status and action without clear context.

---

# Status vs Notification

A status describes the state of an entity.

A notification informs the user about an event.

Example:

```text
Status:
Payment Failed

Notification:
Your payment failed five minutes ago
```

The same semantic icon may appear, but the component behavior is different.

---

# Status vs Badge

A status badge is a component containing:

- Status Icon
- Status Label
- Status Color
- Optional Supporting Text

Example:

```text
[Warning Icon] Degraded
```

The icon is only one part of the full status component.

---

# Core Semantic Statuses

The primary semantic status set includes:

- Success
- Warning
- Error
- Information
- Neutral
- Unknown

These meanings must remain consistent across all Mianx.ai products.

---

# Success Status

Success indicates that an operation, validation, workflow, or required state completed correctly.

Recommended icon direction:

```text
Check

Check Circle

Verified Check
```

Use for:

- Successful Operation
- Completed Validation
- Approved State
- Healthy Service
- Successful Payment
- Completed Workflow

---

# Success Restrictions

Do not use success for:

- Ordinary selection
- Current navigation
- Available action
- Informational confirmation without completion
- Unverified assumptions
- Temporary optimistic state before server confirmation

---

# Warning Status

Warning indicates potential risk, attention, limitation, or approaching failure.

Recommended icon direction:

```text
Warning Triangle

Exclamation Symbol
```

Use for:

- Expiring Access
- Partial Availability
- Configuration Risk
- Unsaved Changes
- Capacity Threshold
- Policy Warning
- Delayed Workflow

---

# Warning Restrictions

Warning does not mean:

- Complete failure
- Successful completion
- Ordinary information
- Required destructive action
- Emergency unless explicitly classified

---

# Error Status

Error indicates a failed, invalid, unavailable, or blocked state.

Recommended icon direction:

```text
X Circle

Error Octagon

Critical Alert
```

Use for:

- Failed Operation
- Invalid Input
- Service Failure
- Permission Failure
- Broken Integration
- Failed Deployment
- Corrupted Data

---

# Error Restrictions

Do not use error for:

- Warning
- Rejection without failure context
- Disabled state
- Offline state where offline is expected
- Destructive action button
- Close control

---

# Information Status

Information communicates non-critical context or explanation.

Recommended icon direction:

```text
Information Circle
```

Use for:

- System Notice
- Helpful Context
- Informational Message
- Policy Explanation
- Metadata Note
- Non-critical Update

---

# Neutral Status

Neutral represents a valid state without positive or negative meaning.

Possible icon directions:

```text
Dot

Dash

Neutral Circle
```

Use for:

- Not Started
- Not Applicable
- Unassigned
- No Change
- Default State

---

# Unknown Status

Unknown means the system cannot determine the current state.

Possible icon direction:

```text
Question Mark Circle
```

Use when:

- Data is missing.
- Monitoring is unavailable.
- State synchronization failed.
- A third-party system did not respond.
- The entity has not yet reported status.

Unknown must not be displayed as healthy.

---

# Operational Statuses

Operational statuses describe runtime or service behavior.

Approved examples:

- Online
- Offline
- Running
- Paused
- Stopped
- Degraded
- Maintenance
- Unavailable
- Unknown

---

# Online Status

Online means the service, user, device, or agent is connected and available.

Possible icon direction:

```text
Active Dot

Connected Signal

Online Indicator
```

Online must not imply:

- Healthy
- Authorized
- Idle
- Ready for every operation

---

# Offline Status

Offline indicates no active connection or availability.

Possible icon direction:

```text
Disconnected Signal

Offline Dot

Cloud Off
```

Offline may be expected or unexpected.

The text label should clarify where necessary.

---

# Running Status

Running means an execution, service, workflow, or agent is actively processing.

Possible icon direction:

```text
Activity

Spinner

Play in Status Container
```

Running status must remain distinct from the Run action.

---

# Paused Status

Paused means execution has stopped temporarily and may resume.

Possible icon:

```text
Pause in Status Container
```

Do not use the standalone pause action style without a status label.

---

# Stopped Status

Stopped indicates that execution is not currently running.

Possible icon direction:

```text
Square in Status Container
```

Stopped does not necessarily mean failed.

---

# Degraded Status

Degraded means the service remains partially available but is operating below expected quality.

Recommended treatment:

```text
Warning Icon

+

Degraded Label
```

Degraded must not be presented as fully healthy.

---

# Maintenance Status

Maintenance means the service or system is intentionally under maintenance.

Possible icon direction:

```text
Wrench

Tool

Maintenance Badge
```

Maintenance should include expected duration where available.

---

# Unavailable Status

Unavailable indicates that a required service or resource cannot currently be used.

Possible treatment:

```text
Error or Offline Symbol

+

Unavailable Label
```

Use a clear reason where possible.

---

# Workflow Statuses

Workflow status icons may represent:

- Draft
- Queued
- Scheduled
- Pending
- In Progress
- Waiting
- Blocked
- Escalated
- Completed
- Failed
- Cancelled
- Skipped
- Partial Success

---

# Draft Status

Draft means the entity is incomplete and not yet formally submitted or activated.

Possible icon direction:

```text
Pencil in Document

Draft Document
```

Draft must not appear as approved or published.

---

# Queued Status

Queued means the item is waiting for execution order.

Possible icon direction:

```text
List with Clock

Queue Lines
```

Queued is different from pending approval.

---

# Scheduled Status

Scheduled means execution is planned for a future time.

Possible icon:

```text
Calendar with Clock
```

The scheduled time should be displayed where useful.

---

# Pending Status

Pending indicates that the next required event has not yet occurred.

Possible icon direction:

```text
Clock

Hourglass

Pending Circle
```

The interface should clarify what is pending.

Examples:

- Pending Approval
- Pending Payment
- Pending Execution
- Pending Verification

---

# In-progress Status

In Progress indicates active work.

Possible icon:

```text
Progress Circle

Activity Indicator

Spinner
```

A progress value should be shown where available.

---

# Waiting Status

Waiting indicates that the process depends on another event or actor.

Possible icon:

```text
Clock

Pause with Dependency
```

The dependency should be documented.

---

# Blocked Status

Blocked means progress cannot continue until an issue is resolved.

Possible icon direction:

```text
Block Symbol

Lock

Stop Barrier
```

Blocked must include the blocking reason where possible.

---

# Escalated Status

Escalated means the item has been moved to a higher authority, priority, or review level.

Possible icon direction:

```text
Upward Alert

Escalation Arrow
```

The escalation owner should be visible.

---

# Completed Status

Completed means all required work finished successfully.

Recommended icon:

```text
Check Circle
```

Completed should not automatically mean approved, published, or verified.

---

# Failed Status

Failed means the workflow or operation did not complete successfully.

Recommended icon:

```text
X Circle
```

The interface should show:

- Failure reason
- Time
- Retry availability
- Impact
- Next step

---

# Cancelled Status

Cancelled means execution was intentionally stopped before completion.

Possible icon direction:

```text
Slash Circle

Cancelled Mark
```

Cancelled is different from failed.

---

# Skipped Status

Skipped means a step was intentionally bypassed.

Possible icon direction:

```text
Skip Forward in Status Container
```

The interface should clarify whether skipping was permitted.

---

# Partial Success

Partial Success means some parts completed while others failed or remain incomplete.

Recommended treatment:

```text
Split Check and Warning

or

Warning Icon with Partial Success Label
```

Do not present partial success as full success.

---

# Lifecycle Statuses

Lifecycle statuses describe the maturity or release state of an asset, product, document, agent, or system.

Approved examples:

- Proposed
- Draft
- Under Review
- Approved
- Active
- Published
- Deprecated
- Superseded
- Retired
- Archived
- Expired

---

# Proposed Status

Proposed means an idea or entity has been submitted but not yet accepted.

Possible icon direction:

```text
Lightbulb

Document Plus
```

Use a text label because the concept can be ambiguous.

---

# Under-review Status

Under Review means formal evaluation is in progress.

Possible icon direction:

```text
Eye

Search over Document

Review Circle
```

Do not confuse with visible or viewed status.

---

# Approved Status

Approved means an authorized reviewer accepted the entity.

Possible icon:

```text
Check Circle

Approval Seal
```

Approval must be backed by a recorded approval decision.

---

# Rejected Status

Rejected means an authorized reviewer declined the entity.

Possible icon:

```text
X Circle
```

Rejected is not the same as failed.

---

# Active Status

Active means the entity is currently enabled for intended use.

Possible icon:

```text
Active Dot

Check Circle

Power Indicator
```

Active does not automatically mean online or healthy.

---

# Inactive Status

Inactive means the entity exists but is not currently active.

Possible icon:

```text
Neutral Dot

Paused Circle

Power Off
```

Inactive does not mean deleted.

---

# Published Status

Published means content or an asset is available to its intended audience.

Possible icon direction:

```text
Globe Check

Broadcast Check
```

Audience visibility should be clear.

---

# Deprecated Status

Deprecated means the entity remains available temporarily but should not be used for new work.

Possible icon direction:

```text
Warning with Archive

Deprecated Badge
```

A replacement should be identified.

---

# Superseded Status

Superseded means a newer approved version has replaced the current one.

Possible icon direction:

```text
Layers with Forward Arrow
```

The replacement version should be linked.

---

# Retired Status

Retired means the entity is no longer operational or supported.

Possible icon direction:

```text
Archive with Stop

Retired Badge
```

Retired records should remain available for history where required.

---

# Archived Status

Archived means the entity is preserved but removed from active use.

Recommended icon:

```text
Archive Box
```

Archived must remain distinct from deleted.

---

# Expired Status

Expired means validity or authorization ended based on time or policy.

Possible icon direction:

```text
Calendar X

Clock Alert
```

Expiration date should be visible where useful.

---

# Validation Statuses

Validation statuses may include:

- Valid
- Invalid
- Unverified
- Verified
- Needs Review
- Incomplete
- Conflicting
- Duplicate

---

# Valid Status

Valid means the value or entity satisfies defined validation rules.

Possible icon:

```text
Check Circle
```

Valid does not always mean approved.

---

# Invalid Status

Invalid means validation requirements were not satisfied.

Possible icon:

```text
X Circle
```

The validation message should explain the issue.

---

# Verified Status

Verified means a defined verification process completed successfully.

Possible icon:

```text
Verified Check
```

Verification must be linked to:

- Verifier
- Method
- Date
- Scope
- Evidence where required

---

# Unverified Status

Unverified means verification has not been completed.

Possible icon direction:

```text
Question Mark

Unverified Badge
```

Unverified does not automatically mean invalid.

---

# Needs-review Status

Needs Review indicates that human or automated review is required.

Possible icon:

```text
Eye with Alert
```

The required reviewer should be identified where possible.

---

# Incomplete Status

Incomplete means required fields, steps, or evidence are missing.

Possible icon:

```text
Incomplete Circle

Document Warning
```

The missing requirements should be shown.

---

# Conflicting Status

Conflicting means two or more values or records cannot be reconciled automatically.

Possible icon:

```text
Split Arrows with Warning
```

Conflict resolution should be available.

---

# Duplicate Status

Duplicate indicates a potentially repeated record or asset.

Possible icon:

```text
Overlapping Documents with Warning
```

The system should show the suspected match.

---

# Security Statuses

Security status icons may represent:

- Secure
- Insecure
- Protected
- Restricted
- Locked
- Unlocked
- Verified
- At Risk
- Compromised
- Quarantined
- Revoked

---

# Secure Status

Secure indicates that required security controls are active and verified.

Possible icon:

```text
Shield Check
```

Secure must not be displayed without evidence.

---

# At-risk Status

At Risk indicates a significant security or compliance concern requiring attention.

Possible icon:

```text
Shield Warning
```

The risk severity should be displayed separately.

---

# Compromised Status

Compromised indicates confirmed unauthorized access, integrity loss, or security breach.

Possible icon:

```text
Shield X

Critical Security Alert
```

This status requires escalation and incident handling.

---

# Quarantined Status

Quarantined means an entity is isolated to limit risk.

Possible icon:

```text
Shield with Isolation

Restricted Container
```

Quarantined is different from deleted or disabled.

---

# Revoked Status

Revoked means previously granted authorization is no longer valid.

Possible icon:

```text
Key Off

Shield Off
```

Revocation reason and date should be recorded.

---

# Synchronization Statuses

Synchronization statuses may include:

- Synced
- Syncing
- Out of Sync
- Conflict
- Sync Failed
- Offline Changes
- Pending Upload
- Pending Download

---

# Synced Status

Synced means the local and authoritative sources match.

Possible icon:

```text
Circular Arrows with Check
```

---

# Syncing Status

Syncing means synchronization is in progress.

Possible icon:

```text
Animated Circular Arrows
```

Include accessible progress text.

---

# Out-of-sync Status

Out of Sync means data differs between systems.

Possible icon:

```text
Circular Arrows with Warning
```

The system should identify the affected data.

---

# Sync-failed Status

Sync Failed means synchronization did not complete successfully.

Possible icon:

```text
Circular Arrows with X
```

Provide retry or resolution guidance.

---

# Availability Statuses

Availability statuses may include:

- Available
- Unavailable
- Busy
- Away
- Do Not Disturb
- Limited
- Reserved
- Occupied

These may apply to:

- Users
- AI Agents
- Resources
- Systems
- Rooms
- Services

---

# Available Status

Available means the entity can accept work or interaction.

Possible icon:

```text
Green-like Semantic Dot

Check Indicator
```

Color must not be the only signal.

---

# Busy Status

Busy means the entity is active but unavailable for additional work.

Possible icon:

```text
Busy Dot

Clock
```

---

# Away Status

Away means the entity is temporarily inactive or not present.

Possible icon:

```text
Clock

Away Indicator
```

---

# Do-not-disturb Status

Do Not Disturb means interruptions are intentionally restricted.

Possible icon:

```text
Minus Circle

Notification Off
```

---

# AI Agent Statuses

AI agent status icons may represent:

- Draft
- Testing
- Active
- Idle
- Running
- Waiting
- Paused
- Degraded
- Escalated
- Error
- Retired
- Archived

Runtime status must remain separate from permanent agent identity.

---

# Agent Idle Status

Idle means the agent is available but not currently executing work.

Possible icon:

```text
Neutral Activity Dot
```

Idle is not the same as offline.

---

# Agent Running Status

Running means the agent is currently executing a task.

Possible icon:

```text
Activity Indicator
```

---

# Agent Waiting Status

Waiting means the agent is blocked on input, dependency, approval, or another agent.

Possible icon:

```text
Clock or Dependency Indicator
```

---

# Agent Escalated Status

Escalated means the agent transferred the issue to:

- Human Reviewer
- Senior Agent
- Department Owner
- Security Team
- Governance Team

The escalation destination should be visible.

---

# Agent Degraded Status

Degraded means the agent can operate but with limited capability.

Examples:

- Model fallback active
- External tool unavailable
- Reduced permissions
- Partial memory access
- Rate limit applied

---

# Data Quality Statuses

Data quality icons may represent:

- Complete
- Incomplete
- Accurate
- Suspect
- Stale
- Duplicate
- Conflicting
- Missing
- Validated

---

# Stale Status

Stale indicates that data may no longer reflect the current state.

Possible icon:

```text
Clock Warning
```

The last-updated time should be displayed.

---

# Missing Status

Missing means expected data is unavailable.

Possible icon:

```text
Empty Document

Question Circle
```

---

# Severity Levels

Some status systems require severity.

Approved severity model:

| Severity | Meaning |
|----------|---------|
| Critical | Immediate action required |
| High | Significant risk or impact |
| Medium | Important issue requiring planned action |
| Low | Limited impact or informational concern |
| Informational | Context only |

Severity and status are separate dimensions.

Example:

```text
Status:
Degraded

Severity:
High
```

---

# Health Status Model

Recommended health statuses:

| Status | Meaning |
|--------|---------|
| Healthy | Operating normally |
| Degraded | Partially impaired |
| Unhealthy | Significant failure |
| Offline | Not connected or unavailable |
| Maintenance | Intentionally unavailable |
| Unknown | Health cannot be determined |

---

# Status Color System

Status icons should use approved semantic tokens.

Recommended token categories:

```text
status-color-success

status-color-warning

status-color-error

status-color-info

status-color-neutral

status-color-disabled

status-color-unknown
```

Exact color values must be defined in the color-palette documentation.

---

# Color Restrictions

Never:

- Use color as the only status signal.
- Assign random colors per product.
- Use success color for active navigation.
- Use error color for ordinary destructive buttons without context.
- Use warning color as decorative accent.
- Hardcode status colors inside reusable icons.

---

# Icon Shape and Color Pairing

Recommended semantic pairing:

| Meaning | Icon Shape | Color Token |
|---------|------------|-------------|
| Success | Check Circle | Success |
| Warning | Warning Triangle | Warning |
| Error | X Circle | Error |
| Information | Info Circle | Information |
| Pending | Clock | Neutral or Information |
| Unknown | Question Circle | Neutral |
| Disabled | Minus or Disabled Symbol | Disabled |

---

# Status Must Not Depend on Color Alone

A critical status should include at least two signals:

```text
Icon Shape

+

Text Label
```

Optional additional signal:

```text
Color

+

Container Style

+

Supporting Message
```

---

# Outline and Filled Variants

Status icons may use:

- Outline Variant
- Filled Variant
- Contained Variant
- Small Dot Variant
- Large Summary Variant

Filled variants may be used for:

- High-priority alerts
- Compact status badges
- Selected filters
- Monitoring dashboards

---

# Status Dot

A status dot may be used for compact interfaces.

It must include:

- Text label nearby, or
- Accessible status name, or
- Tooltip where appropriate

A colored dot alone is insufficient for critical workflows.

---

# Status Badge

Recommended structure:

```text
[Status Icon] Status Label
```

Example:

```text
[Check Circle] Completed
```

Optional elements:

- Severity
- Timestamp
- Count
- Tooltip
- Supporting reason

---

# Status Badge Sizes

Recommended sizes:

| Context | Icon Size |
|---------|-----------|
| Dense Table | 12–16 px |
| Standard Badge | 16 px |
| Card Status | 16–20 px |
| Monitoring Panel | 20–24 px |
| Empty State or Incident Summary | 32–48 px |

---

# Status Icon Sizes

Recommended defaults:

```text
12 px

16 px

20 px

24 px

32 px
```

Detailed status icons must be simplified for compact sizes.

---

# Status and Timestamp

Time-sensitive statuses should show:

- Current Status
- Last Updated Time
- Duration
- Expected Resolution Time where available
- Status Source

Example:

```text
Degraded

Updated 2 minutes ago
```

---

# Status Freshness

A status may become stale.

The system should track:

- Status Timestamp
- Source Timestamp
- Refresh Interval
- Expiration Threshold
- Stale Indicator

A stale status must not continue to appear current without indication.

---

# Real-time Status

Real-time status components should support:

- Live Updates
- Reconnection
- Stale Detection
- Loading State
- Unknown State
- Error Recovery
- Accessible Announcements

---

# Status Transition

Status changes should follow defined transitions.

Example:

```text
Queued

↓

Running

↓

Completed
```

or:

```text
Queued

↓

Running

↓

Failed
```

Invalid transitions should be blocked or audited.

---

# Lifecycle Transition Example

```text
Draft

↓

Under Review

↓

Approved

↓

Published

↓

Deprecated

↓

Archived
```

---

# Transition Metadata

Each status system should document:

| Field | Description |
|------|-------------|
| Current Status | Present state |
| Previous Status | Prior state |
| Changed At | Transition time |
| Changed By | Actor or system |
| Reason | Transition reason |
| Source | Source system |
| Allowed Next Statuses | Valid transitions |

---

# Status History

Critical entities should maintain status history.

Examples:

- Deployments
- Payments
- AI Agents
- Approvals
- Incidents
- Documents
- Partner Permissions
- Assets
- Workflows

---

# Status Icon Naming

Use semantic lowercase kebab-case.

Pattern:

```text
status-{meaning}-{variant}
```

Examples:

```text
status-success-outline

status-warning-filled

status-error-outline

status-pending-outline

status-degraded-filled

status-offline-outline
```

---

# Status Identifier

Recommended pattern:

```text
ICON-STATUS-{MEANING-CODE}-{NUMBER}
```

Examples:

```text
ICON-STATUS-SUCCESS-001

ICON-STATUS-WARNING-001

ICON-STATUS-ERROR-001

ICON-STATUS-PENDING-001
```

---

# Required Metadata

Every status icon should include:

| Field | Description |
|------|-------------|
| Icon ID | Unique icon identifier |
| System Name | Stable machine-readable name |
| Display Name | Human-readable status |
| Category | Semantic, Operational, Workflow, Lifecycle, or other |
| Primary Meaning | Exact status meaning |
| Severity | Optional severity mapping |
| Terminal State | Yes or No |
| Positive | Yes, No, or Neutral |
| Allowed Contexts | Approved usage contexts |
| Restricted Contexts | Prohibited usage contexts |
| Default Color Token | Semantic token |
| Default Size | Recommended size |
| Variant | Outline, filled, dot, or other |
| Accessible Label | Recommended label |
| Source Path | Master source location |
| Component Name | Code component |
| Version | Current version |
| Status | Approved, deprecated, or archived |
| Replacement | Replacement icon |
| Owner | Responsible team |
| License | Licensing status |

---

# Metadata Example

```json
{
  "icon_id": "ICON-STATUS-DEGRADED-001",
  "system_name": "status-degraded",
  "display_name": "Degraded",
  "category": "Operational",
  "primary_meaning": "Operating with reduced capability or performance",
  "severity": "Medium",
  "terminal_state": false,
  "positive": "No",
  "allowed_contexts": [
    "Service Health",
    "Agent Health",
    "Integration Health"
  ],
  "default_color_token": "status-color-warning",
  "default_size": 16,
  "variant": "filled",
  "version": "1.0.0",
  "status": "Approved"
}
```

---

# Status Registry

Maintain a central status registry.

| Status ID | System Name | Category | Meaning | Color Token | Terminal |
|-----------|-------------|----------|---------|-------------|----------|
| TBD | status-success | Semantic | Successful state | status-color-success | Depends |
| TBD | status-warning | Semantic | Attention required | status-color-warning | No |
| TBD | status-error | Semantic | Failed or invalid state | status-color-error | Depends |
| TBD | status-pending | Workflow | Waiting for next event | status-color-neutral | No |
| TBD | status-running | Operational | Active execution | status-color-info | No |
| TBD | status-completed | Workflow | Finished successfully | status-color-success | Yes |
| TBD | status-failed | Workflow | Execution failed | status-color-error | Yes |
| TBD | status-degraded | Operational | Reduced capability | status-color-warning | No |
| TBD | status-offline | Availability | Not connected | status-color-neutral | No |
| TBD | status-unknown | Semantic | State cannot be determined | status-color-unknown | No |

---

# Status Mapping Matrix

| Business Meaning | Approved Status |
|------------------|-----------------|
| Operation finished correctly | Completed or Success |
| Waiting for approval | Pending Approval |
| Waiting for execution | Queued |
| Currently executing | Running |
| Execution stopped temporarily | Paused |
| Execution did not complete | Failed |
| Intentionally stopped | Cancelled |
| Service partially working | Degraded |
| Service unreachable | Offline or Unavailable |
| State cannot be verified | Unknown |
| Content accepted | Approved |
| Content publicly available | Published |
| Old asset replaced | Superseded |
| Asset discouraged for new use | Deprecated |

---

# Status Component Naming

Recommended components:

```text
SuccessStatusIcon

WarningStatusIcon

ErrorStatusIcon

InfoStatusIcon

PendingStatusIcon

RunningStatusIcon

PausedStatusIcon

CompletedStatusIcon

FailedStatusIcon

DegradedStatusIcon

OfflineStatusIcon

UnknownStatusIcon
```

---

# Component API

Recommended status component API:

```tsx
type StatusIconProps = {
  size?: 12 | 16 | 20 | 24 | 32;
  status:
    | "success"
    | "warning"
    | "error"
    | "info"
    | "pending"
    | "running"
    | "paused"
    | "completed"
    | "failed"
    | "degraded"
    | "offline"
    | "unknown";
  title?: string;
  className?: string;
  animated?: boolean;
};
```

---

# Status Badge Component

Recommended API:

```tsx
type StatusBadgeProps = {
  status: string;
  label: string;
  severity?: "critical" | "high" | "medium" | "low";
  updatedAt?: string;
};
```

---

# Component Example

```tsx
import { StatusBadge } from "@mianx/design-system";

export function ServiceStatus() {
  return (
    <StatusBadge
      status="degraded"
      label="Degraded"
      severity="medium"
      updatedAt="2026-07-10T10:00:00Z"
    />
  );
}
```

---

# Accessible Status Example

```tsx
<div role="status" aria-live="polite">
  <CompletedStatusIcon aria-hidden="true" />
  <span>Workflow completed successfully</span>
</div>
```

---

# Critical Alert Example

```tsx
<div role="alert">
  <ErrorStatusIcon aria-hidden="true" />
  <span>Deployment failed. Review the deployment logs.</span>
</div>
```

---

# Decorative Status Icons

A status icon is rarely purely decorative when it communicates system state.

If the visible label already provides the complete status, the icon may be hidden from assistive technology.

Example:

```tsx
<span>
  <WarningStatusIcon aria-hidden="true" />
  Degraded
</span>
```

---

# Live Status Announcements

Live updates should be announced only when useful.

Use:

```text
aria-live="polite"
```

for non-critical updates.

Use:

```text
role="alert"
```

for urgent errors requiring immediate attention.

Avoid announcing every rapid status refresh.

---

# Loading and Animated Statuses

Animated statuses may include:

- Loading
- Syncing
- Running
- Processing
- Connecting

Animations must:

- Respect reduced-motion preferences.
- Include accessible text.
- Avoid excessive speed.
- Avoid flashing.
- Stop when status changes.
- Not be the only indicator.

---

# Reduced Motion

Example:

```css
@media (prefers-reduced-motion: reduce) {
  .status-icon--animated {
    animation: none;
  }
}
```

A static status alternative must remain visible.

---

# RTL Behavior

Most status icons should remain fixed in RTL layouts.

Normally fixed:

- Success
- Warning
- Error
- Information
- Pending
- Completed
- Failed
- Offline
- Verified
- Secure

Potentially directional statuses requiring review:

- Escalated
- Imported
- Exported
- Transferred
- Moved
- Previous-version Restored

---

# Theme Support

Status icons must support:

- Light Theme
- Dark Theme
- High-contrast Theme
- Monochrome Print
- Disabled Context
- Inverse Backgrounds

---

# High-contrast Mode

Status meaning must remain recognizable when semantic colors are replaced or unavailable.

Required signals:

- Distinct icon shape
- Text label
- Container or border where needed
- Accessible status description

---

# Monochrome Statuses

In monochrome contexts, statuses should remain distinguishable through:

- Shape
- Fill
- Border
- Pattern
- Text Label

Do not rely on grayscale shade alone.

---

# Source Structure

Recommended structure:

```text
icons/

└── status/
    ├── semantic/
    ├── operational/
    ├── workflow/
    ├── lifecycle/
    ├── validation/
    ├── security/
    ├── synchronization/
    ├── availability/
    ├── ai-workforce/
    ├── data-quality/
    ├── metadata/
    ├── exports/
    └── source-files/
```

Create folders only when corresponding assets exist.

---

# File Naming

Pattern:

```text
status-{meaning}-{variant}-{size}-v{version}.{extension}
```

Examples:

```text
status-success-outline-16-v1.svg

status-warning-filled-16-v1.svg

status-error-outline-20-v1.svg

status-degraded-filled-16-v1.svg

status-offline-outline-16-v1.svg
```

Avoid:

```text
green-check.svg

red-error-final.svg

status-new.svg

warning-latest-2.svg
```

---

# Status Token Naming

Recommended token pattern:

```text
status.{meaning}.{property}
```

Examples:

```text
status.success.icon

status.success.text

status.success.background

status.warning.icon

status.error.border

status.unknown.text
```

---

# Duplicate Prevention

Before creating a new status icon:

- Search the status registry.
- Review semantic statuses.
- Review workflow statuses.
- Review lifecycle statuses.
- Review operational statuses.
- Compare synonyms.
- Confirm the meaning is unique.
- Confirm a label or badge can solve the need.
- Document the difference.

---

# Common Semantic Conflicts

Review carefully:

```text
Success vs Completed

Approved vs Verified

Failed vs Rejected

Warning vs Degraded

Offline vs Unavailable

Pending vs Queued

Paused vs Waiting

Inactive vs Disabled

Deprecated vs Archived

Expired vs Revoked

Cancelled vs Failed

Unknown vs Unverified
```

---

# Status Creation Workflow

```text
Status Requirement Identified

↓

Existing Status Registry Searched

↓

Meaning Defined

↓

Category Assigned

↓

Transition Rules Defined

↓

Severity Reviewed

↓

Icon Selected or Designed

↓

Color Token Assigned

↓

Accessibility Review

↓

Technical Validation

↓

Design-system Approval

↓

Metadata Registered

↓

Component Package Released
```

---

# Approval Roles

| Role | Responsibility |
|------|----------------|
| Product Designer | Defines interface usage |
| Product Owner | Confirms business meaning |
| Platform Owner | Confirms operational meaning |
| Icon Designer | Creates or selects status icon |
| UX Architect | Reviews semantic consistency |
| Design-system Lead | Maintains visual system |
| Accessibility Reviewer | Reviews non-color communication |
| Reliability Engineer | Reviews health and incident statuses |
| Frontend Engineer | Validates component behavior |
| Asset Manager | Registers and publishes asset |
| Governance Team | Reviews critical exceptions |

---

# Testing Requirements

Every status icon should be tested in:

- Light Theme
- Dark Theme
- High-contrast Mode
- Monochrome
- 12 px
- 16 px
- 20 px
- 24 px
- Table Row
- Badge
- Card
- Dashboard
- Alert
- Screen-reader Context
- Live-update Context
- Reduced-motion Mode
- Stale-data Scenario

---

# Status Component Testing

Tests should verify:

- Correct icon mapping
- Correct text label
- Correct semantic color
- No color-only communication
- Correct ARIA behavior
- Correct live announcement behavior
- Correct animation state
- Reduced-motion support
- Correct stale handling
- Correct unknown-state fallback
- Correct terminal-state behavior
- Correct transition handling

---

# Transition Testing

Status transition tests should verify:

- Allowed transitions succeed.
- Invalid transitions fail.
- Previous status is preserved.
- Transition reason is recorded.
- Time is recorded.
- Actor is recorded.
- UI updates correctly.
- Audit events are generated.

---

# Visual Regression Testing

Automated tests should detect:

- Incorrect icon substitution
- Color-token changes
- Shape changes
- Filled/outline mismatch
- View-box changes
- Alignment shifts
- Missing labels
- Theme failures
- High-contrast failures
- Animation regressions

---

# SVG Validation

Every production status SVG must be checked for:

- Correct view box
- Correct shape
- Correct `currentColor` behavior
- No unsafe scripts
- No event handlers
- No external resources
- No hidden content
- No hardcoded unapproved colors
- Correct metadata
- Correct naming
- Minimal path complexity

---

# Status Data Contract

Status values used in APIs and databases must be stable.

Example:

```json
{
  "status": "degraded",
  "severity": "medium",
  "updated_at": "2026-07-10T10:00:00Z",
  "reason": "Primary provider unavailable",
  "source": "monitoring-service"
}
```

---

# API Status Mapping

Frontend components should map API values through one approved status registry.

Example:

```ts
const statusMap = {
  healthy: "success",
  degraded: "warning",
  failed: "error",
  unknown: "unknown",
} as const;
```

Do not create page-specific status mappings without governance.

---

# Unknown-value Handling

When an unrecognized status value is received:

- Display `Unknown`.
- Use the approved unknown icon.
- Log the mapping issue.
- Avoid defaulting to success.
- Preserve the original raw value for debugging.
- Notify the owning team where required.

---

# Status Localization

Status labels must support localization.

Requirements:

- Use stable system values.
- Localize visible labels.
- Localize tooltips.
- Avoid embedding text inside SVG assets.
- Test long translations.
- Preserve semantic meaning.

---

# Status History and Audit

Critical status changes should record:

- Entity ID
- Previous Status
- New Status
- Timestamp
- Actor
- Reason
- Source
- Severity
- Related Incident
- Related Workflow
- Approval where required

---

# AI Workforce Usage

AI agents may:

- Map system states to approved statuses.
- Suggest accessible status labels.
- Detect unknown status values.
- Detect semantic conflicts.
- Generate metadata drafts.
- Validate status transitions.
- Detect deprecated statuses.
- Produce status audit reports.
- Recommend stale-state handling.

AI agents must not:

- Mark unverified systems as healthy.
- Change status semantics.
- invent production status values without approval.
- remove text labels from critical statuses.
- bypass transition rules.
- hide unknown states.
- approve their own status changes.
- replace critical statuses silently.

---

# Automation Requirements

The status platform should eventually support:

- Status registry validation
- API-to-UI mapping checks
- Semantic color validation
- Non-color accessibility checks
- Transition validation
- Stale-status detection
- Unknown-value alerts
- Icon-component generation
- Live-region validation
- Reduced-motion testing
- Deprecated-status detection
- Status history reports
- Release manifest generation

---

# Quality Checklist

Before approving a status icon:

- [ ] Status requirement documented
- [ ] Existing registry searched
- [ ] Duplicate check completed
- [ ] Primary meaning confirmed
- [ ] Category assigned
- [ ] Severity reviewed
- [ ] Terminal-state behavior documented
- [ ] Positive, negative, or neutral classification defined
- [ ] Allowed contexts documented
- [ ] Restricted contexts documented
- [ ] Icon ID assigned
- [ ] System name approved
- [ ] Shape selected
- [ ] Semantic color token assigned
- [ ] Text label defined
- [ ] High-contrast behavior tested
- [ ] Monochrome behavior tested
- [ ] Small-size test completed
- [ ] Light-theme test completed
- [ ] Dark-theme test completed
- [ ] Accessibility guidance added
- [ ] Live-update behavior reviewed
- [ ] Reduced-motion behavior reviewed
- [ ] SVG security validation passed
- [ ] Component generated
- [ ] Metadata completed
- [ ] Source file preserved
- [ ] Design-system approval recorded

---

# Status Component Review Checklist

Before releasing a status component:

- [ ] Correct icon mapped
- [ ] Correct label displayed
- [ ] Correct semantic color applied
- [ ] Text included for critical status
- [ ] No color-only meaning
- [ ] Accessible name included
- [ ] Live announcement behavior correct
- [ ] Timestamp shown where required
- [ ] Stale-state behavior implemented
- [ ] Unknown-state fallback implemented
- [ ] Animation reviewed
- [ ] Reduced-motion supported
- [ ] Theme behavior verified
- [ ] Transition rules verified
- [ ] Audit logging verified where required
- [ ] Deprecated status not used

---

# Audit Requirements

Status icon audits should verify:

- Semantic consistency
- Correct color mapping
- Text-label availability
- Unknown-state handling
- Stale-status handling
- Invalid transitions
- Missing status history
- Mixed icon families
- Hardcoded colors
- Deprecated statuses
- Inaccessible status dots
- Missing metadata
- Unsafe SVG files
- Incorrect terminal-state mapping
- Confusion between action and status

Recommended frequency:

```text
Monthly Automated Validation

Quarterly Product Status Audit

Annual Enterprise Status Vocabulary Review
```

---

# Common Mistakes

Avoid:

- Using color as the only status signal.
- Treating completed and approved as identical.
- Treating failed and rejected as identical.
- Displaying unknown systems as healthy.
- Using action icons as status indicators.
- Using a status icon without text in critical workflows.
- Mixing pending, queued, and waiting.
- Treating offline as failed automatically.
- Using inactive and disabled interchangeably.
- Showing stale status as current.
- Hardcoding status colors.
- Embedding runtime state inside permanent identity assets.
- Using one generic dot for all statuses.
- Omitting transition history.
- Creating product-specific status meanings without registry review.

---

# Related Documents

- `README.md`
- `icon-system.md`
- `ui-icons.md`
- `navigation-icons.md`
- `action-icons.md`
- `department-icons.md`
- `ai-workforce-icons.md`
- `file-and-content-icons.md`
- `icon-exports.md`
- `icon-source-files.md`
- `../assets-guidelines.md`
- `../naming-conventions.md`
- `../branding/color-palette.md`
- `../design-system/README.md`
- `../../09-security/README.md`
- `../../19-ai-workforce/README.md`
- `../../24-automation-engine/README.md`
- `../../29-observability-platform/README.md`
- `../../46-enterprise-quality/README.md`

---

# Best Practices

- Use one centralized status vocabulary.
- Keep status and action semantics separate.
- Pair icon shape with a text label.
- Use semantic color only as an additional signal.
- Distinguish success, completed, approved, and verified.
- Distinguish warning, degraded, error, and offline.
- Define valid status transitions.
- Preserve unknown and stale states honestly.
- Show timestamps for time-sensitive statuses.
- Use accessible live announcements carefully.
- Generate components from approved status mappings.
- Keep API values, design tokens, icons, labels, transitions, and audit records synchronized.

---

# Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-07-10 | Initial enterprise status icon standard established |

---

# Next Document

```text
docs/
└── 18-assets/
    └── icons/
        └── department-icons.md
```

---

**End of Document**