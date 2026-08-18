# Action Icons

> Enterprise standards for selecting, designing, implementing, validating, and governing action icons across the Mianx.ai ecosystem.

---

# Document Information

| Item | Value |
|------|-------|
| Document Name | Action Icons |
| Folder | docs/18-assets/icons |
| File Name | action-icons.md |
| Version | 1.0.0 |
| Status | Approved |
| Owner | Design System, Product Design & Frontend Platform Department |
| Classification | Internal |
| Last Updated | 2026-07-10 |

---

# Purpose

This document defines the official standards for icons representing user, system, administrative, workflow, and automation actions across Mianx.ai products.

It ensures that action icons are:

- Clear
- Consistent
- Accessible
- Predictable
- Semantically accurate
- Reusable
- Theme-aware
- Safe for destructive workflows
- Suitable for automation
- Easy to maintain

---

# Objectives

- Standardize action icon meanings.
- Prevent semantic conflicts.
- Distinguish similar actions clearly.
- Improve user confidence.
- Reduce accidental destructive actions.
- Support accessible controls.
- Maintain consistent behavior across products.
- Define action-specific component states.
- Enable automated validation.
- Preserve version and audit history.

---

# Scope

These standards apply to icons representing:

- Add
- Create
- Edit
- Save
- Submit
- Delete
- Remove
- Archive
- Restore
- Approve
- Reject
- Publish
- Unpublish
- Upload
- Download
- Import
- Export
- Copy
- Duplicate
- Move
- Share
- Assign
- Unassign
- Link
- Unlink
- Refresh
- Retry
- Synchronize
- Run
- Stop
- Pause
- Resume
- Automate
- Schedule
- Escalate
- Lock
- Unlock
- Enable
- Disable
- Verify
- Revoke
- Merge
- Split
- Sort
- Filter
- Print

---

# Core Principle

An action icon must represent what will happen after activation.

It must not represent only:

- The current object
- The current page
- A decorative concept
- A vague visual metaphor
- An unrelated navigation destination

The icon, accessible label, visible text, and resulting behavior must all communicate the same action.

---

# Action Icon Categories

The action icon system includes:

- Creation Actions
- Modification Actions
- Persistence Actions
- Destructive Actions
- Lifecycle Actions
- Approval Actions
- Data Transfer Actions
- Clipboard Actions
- Sharing Actions
- Assignment Actions
- Relationship Actions
- System Actions
- Workflow Actions
- Automation Actions
- Security Actions
- Organization Actions
- Recovery Actions

---

# Creation Actions

Creation actions produce a new entity.

Examples:

- Add
- Create
- New
- Duplicate
- Clone
- Generate
- Invite
- Add Member
- Add File
- Add Task

---

# Add Action

The generic add icon is usually:

```text
Plus
```

Use it where the object is already clear from context.

Examples:

```text
Add Task

Add Member

Add Field
```

Do not use a generic plus icon without a label where the resulting object is unclear.

---

# Create Action

Create may use:

- Plus
- File Plus
- Folder Plus
- User Plus
- Project Plus
- Task Plus

Choose the most specific approved icon when the context benefits from it.

---

# Duplicate and Clone

Duplicate creates a copy of an existing object.

Recommended icon direction:

```text
Overlapping Documents or Squares
```

Duplicate must remain distinct from:

- Copy to clipboard
- Fork
- Import
- Create new

---

# Edit Actions

Edit actions modify existing content or configuration.

Examples:

- Edit
- Rename
- Configure
- Adjust
- Annotate
- Modify Properties

---

# Edit Icon

The standard edit icon is usually:

```text
Pencil
```

Use it for direct content editing.

Do not use the pencil icon for:

- System settings
- Filtering
- Technical maintenance
- Approval
- Commenting

---

# Configure Action

Recommended icon:

```text
Sliders
```

or:

```text
Gear
```

Use:

- Sliders for adjustable preferences or parameters.
- Gear for broader system configuration.

---

# Rename Action

Rename may use:

- Pencil with text context
- Text cursor
- Approved rename-specific icon

A text label is strongly recommended.

---

# Persistence Actions

Persistence actions save or commit changes.

Examples:

- Save
- Save As
- Submit
- Commit
- Apply
- Confirm

---

# Save Action

Use the save icon only when the user explicitly controls persistence.

Possible symbol:

```text
Disk or Approved Save Symbol
```

In autosave interfaces:

- Do not show a misleading save action.
- Show status such as `Saving` or `Saved`.
- Use text where necessary.
- Distinguish automatic from manual persistence.

---

# Save As

Save As creates a separate copy or version.

It must remain distinct from:

- Save
- Duplicate
- Export
- Download

Use a text label for clarity.

---

# Submit Action

Submit represents sending a form or request for processing.

Possible icon directions:

- Send
- Arrow Forward
- Check with contextual label

Submit should normally include visible text.

---

# Apply Action

Apply changes may use:

- Check
- Confirm
- Arrow to Target

The action must make clear whether the interface remains open or closes after application.

---

# Destructive Actions

Destructive actions may remove, revoke, terminate, or permanently alter data.

Examples:

- Delete
- Remove
- Revoke
- Disconnect
- Reset
- Clear All
- Terminate
- Cancel Subscription
- Purge
- Destroy

---

# Delete Action

The standard delete icon is:

```text
Trash
```

Use delete only when the item will be moved to Trash or permanently removed.

Do not use delete for:

- Archive
- Remove from list
- Disconnect
- Revoke permission
- Hide
- Close

---

# Remove Action

Remove means taking an item out of a collection or relationship.

Possible icon directions:

- Minus
- X
- User Minus
- Link Off

The label should explain what relationship is being removed.

---

# Archive Action

Archive preserves an item but removes it from active use.

Recommended symbol:

```text
Archive Box
```

Archive must remain clearly distinct from delete.

---

# Purge Action

Purge implies permanent and irreversible removal.

Requirements:

- Visible text label
- Strong warning
- Confirmation
- Clear impact description
- Restricted access where appropriate
- Audit record

Do not rely on an icon alone.

---

# Reset Action

Reset restores default values or clears configuration.

Possible icon directions:

- Circular Arrow
- Reset Arrow
- Restore Defaults

Reset must not be confused with refresh.

---

# Clear Action

Clear may mean:

- Clear input
- Clear filters
- Clear selection
- Clear history
- Clear all data

Use a text label or contextual accessible name.

---

# Close vs Delete

These actions are fundamentally different.

| Action | Meaning |
|--------|---------|
| Close | Dismiss interface |
| Delete | Remove data |
| Remove | Detach from context |
| Clear | Remove current value |
| Cancel | Stop current process |

The X icon must not automatically mean delete.

---

# Lifecycle Actions

Lifecycle actions change an entity’s operational state.

Examples:

- Activate
- Deactivate
- Enable
- Disable
- Start
- Stop
- Pause
- Resume
- Retire
- Restore
- Reopen

---

# Activate and Enable

Possible icon directions:

- Power
- Toggle On
- Play
- Check

The action label should clarify whether the entity becomes active, enabled, started, or published.

---

# Deactivate and Disable

Possible icon directions:

- Power Off
- Toggle Off
- Slash
- Pause

Deactivate must not be confused with delete or archive.

---

# Start Action

Recommended icon:

```text
Play
```

Use for:

- Starting jobs
- Running workflows
- Starting agents
- Beginning processes
- Launching executions

---

# Stop Action

Recommended icon:

```text
Square
```

Use when a currently running process will terminate.

Stopping may require confirmation if data or execution state may be lost.

---

# Pause and Resume

Recommended:

```text
Pause = Two Vertical Bars

Resume = Play
```

State and action must remain clear.

A paused object should show a paused status separately from the resume action.

---

# Restore Action

Restore may represent:

- Restore from Trash
- Restore archived item
- Restore previous version
- Restore default settings

The label must clarify the restore target.

---

# Approval Actions

Approval actions support governance and review workflows.

Examples:

- Approve
- Reject
- Request Changes
- Verify
- Sign Off
- Accept
- Decline
- Escalate

---

# Approve Action

Possible icon:

```text
Check
```

or:

```text
Check Circle
```

Approval must include:

- Clear text
- Correct authorization
- Confirmation for high-impact approvals
- Audit record
- Decision context

---

# Reject Action

Possible icon:

```text
X
```

or:

```text
X Circle
```

Rejection must not be confused with closing a dialog.

Use a visible label such as:

```text
Reject Request
```

---

# Request Changes

Possible icon directions:

- Comment
- Edit with Arrow
- Review Cycle

Use text because the meaning is usually complex.

---

# Verify Action

Verify may represent:

- Identity verification
- Data verification
- Compliance verification
- Source confirmation
- Technical validation

Do not use a verification icon to imply certification unless the status is formally approved.

---

# Revoke Action

Revoke removes previously granted authorization or access.

Possible icon directions:

- Shield Off
- Key Off
- User Minus
- Permission Removed

Revoke must remain distinct from delete.

---

# Data Transfer Actions

Data transfer actions include:

- Upload
- Download
- Import
- Export
- Sync
- Send
- Receive

---

# Upload Action

Upload moves data from a local or external source into the system.

Recommended icon:

```text
Arrow Up into a Tray or Cloud
```

Do not use upload for moving to a parent folder.

---

# Download Action

Download moves a file or generated artifact to the user’s device.

Recommended icon:

```text
Arrow Down into a Tray
```

Download must remain distinct from export.

---

# Import Action

Import brings structured data or configuration into the system.

Possible icon:

```text
Arrow Entering a Document or Database
```

The action should clearly state:

- Supported format
- Destination
- Validation behavior
- Conflict handling

---

# Export Action

Export generates or transforms data into another format.

Possible icon:

```text
Arrow Leaving a Document or Dataset
```

Export may lead to a later download, but the concepts remain separate.

---

# Sync Action

Synchronization aligns data across systems.

Possible icon:

```text
Two Circular Arrows
```

Sync must remain distinct from:

- Refresh
- Retry
- Restore
- Repeat

---

# Send Action

Send may apply to:

- Message
- Email
- Invitation
- Data
- Request
- Notification

Possible icon:

```text
Paper Plane or Directional Send Symbol
```

Use context-specific labels.

---

# Clipboard Actions

Clipboard actions include:

- Copy
- Paste
- Cut
- Duplicate
- Copy Link
- Copy ID

---

# Copy Action

Copy places content into the clipboard.

Possible icon:

```text
Overlapping Documents
```

Use accessible labels such as:

```text
Copy API key
```

After successful copying, provide confirmation.

---

# Copy Link

Copy Link should use:

- Link icon
- Copy icon
- Combined approved treatment

The label should remain explicit.

---

# Paste Action

Paste inserts clipboard content.

Paste permissions and browser restrictions must be handled correctly.

---

# Cut Action

Cut removes content from the current location and places it on the clipboard.

Use carefully in systems where data loss may occur.

---

# Sharing Actions

Sharing actions include:

- Share
- Invite
- Publish Link
- Copy Link
- Send
- Grant Access

---

# Share Action

The share icon may vary by platform.

Use one approved Mianx.ai pattern per product family.

Share must clearly define whether it:

- Copies a link
- Opens sharing settings
- Invites users
- Publishes publicly
- Opens the system share sheet

---

# Invite Action

Invite usually creates or sends an access invitation.

Possible icon:

```text
User Plus
```

or:

```text
Envelope Plus
```

The label should specify who or what is being invited.

---

# Publish Action

Publishing makes content available to an intended audience.

Possible icon directions:

- Globe
- Upload-like publication arrow
- Send
- Broadcast

Publishing must include audience and visibility context.

---

# Unpublish Action

Unpublish removes public or active visibility without deleting the content.

It must remain distinct from:

- Delete
- Archive
- Disable
- Revoke

---

# Assignment Actions

Assignment actions include:

- Assign
- Unassign
- Transfer
- Delegate
- Reassign
- Claim

---

# Assign Action

Possible icon:

```text
User Check
```

or:

```text
Arrow to User
```

The label should identify the assignment target.

---

# Unassign Action

Possible icon:

```text
User Minus
```

Unassign must not imply deletion of the user.

---

# Transfer Action

Transfer moves responsibility, ownership, or data.

Possible icon:

```text
Bidirectional Arrow
```

Use clear labels such as:

```text
Transfer Ownership
```

---

# Delegate Action

Delegate assigns responsibility while preserving the original owner’s broader relationship.

Use text because the distinction from transfer may not be clear through iconography alone.

---

# Relationship Actions

Relationship actions include:

- Link
- Unlink
- Connect
- Disconnect
- Attach
- Detach
- Merge
- Split

---

# Link Action

The standard link icon may represent:

- Add relationship
- Copy or open URL
- Associate records
- Link integration

Use labels to clarify the intended behavior.

---

# Unlink Action

Possible icon:

```text
Broken Link
```

or:

```text
Link Off
```

Unlink should not imply deletion of the linked records.

---

# Connect and Disconnect

Use for:

- Integrations
- Services
- Devices
- Data Sources
- Accounts

Disconnect may have operational impact and should include confirmation where necessary.

---

# Attach and Detach

Attach may be represented by:

```text
Paperclip
```

Detach should use a distinct approved icon or clear label.

---

# Merge Action

Merge combines multiple entities.

Possible icon:

```text
Converging Arrows
```

Merge may be irreversible and should include:

- Preview
- Conflict handling
- Confirmation
- Audit record

---

# Split Action

Split separates one entity into multiple entities.

Possible icon:

```text
Diverging Arrows
```

Use labels and explanation.

---

# System Actions

System actions include:

- Refresh
- Reload
- Retry
- Restart
- Rebuild
- Recalculate
- Rescan
- Validate
- Run

---

# Refresh Action

Refresh reloads the current view or data.

Possible icon:

```text
Circular Arrow
```

Refresh should not:

- Change persistent data unexpectedly
- Restart a service
- Re-run a destructive workflow
- Reset settings

---

# Retry Action

Retry repeats a previously failed operation.

Possible icon:

```text
Circular Arrow with Failure Context
```

Retry should be available only when:

- The action is safe.
- Idempotency is understood.
- Duplicate side effects are controlled.
- Error context is available.

---

# Restart Action

Restart stops and starts a system or service.

Possible icon:

```text
Power Cycle
```

Restart usually requires stronger confirmation than refresh.

---

# Rebuild Action

Rebuild regenerates a system, index, package, or derived resource.

Use:

- Clear text
- Expected duration
- Impact warning
- Progress indication
- Audit record

---

# Recalculate Action

Recalculate recomputes values without necessarily changing source data.

Possible icon:

```text
Calculator with Refresh
```

Use labels for clarity.

---

# Workflow Actions

Workflow actions include:

- Run
- Execute
- Trigger
- Pause
- Resume
- Cancel
- Retry
- Skip
- Approve Step
- Reject Step
- Escalate

---

# Run and Execute

Recommended icon:

```text
Play
```

Use for:

- Workflow Execution
- Agent Execution
- Automation Execution
- Job Execution
- Test Execution

The control should state what will execute.

---

# Trigger Action

Trigger starts an event-driven or manual process.

Possible icon directions:

- Lightning
- Play
- Event Pulse

Use text because trigger may have a specialized meaning.

---

# Cancel Execution

Cancel stops a currently active process before completion.

Possible icon:

```text
X or Stop Symbol
```

The UI must clarify whether cancellation:

- Stops immediately
- Completes the current step
- Rolls back changes
- Preserves partial results

---

# Skip Action

Skip moves past an optional step.

Possible icon:

```text
Forward Skip
```

Use only when the workflow supports skipping safely.

---

# Escalate Action

Escalation sends an item to a higher authority or priority path.

Possible icon:

```text
Upward Arrow with Alert
```

Use visible text and record the escalation reason.

---

# Automation Actions

Automation actions include:

- Automate
- Schedule
- Trigger
- Run Automatically
- Disable Automation
- Create Rule
- Execute Agent
- Orchestrate

---

# Automate Action

Possible icon directions:

- Gear with Lightning
- Workflow Nodes
- Spark with Gear
- Approved Automation Symbol

Automation icons must not rely on vague “magic” metaphors without explanation.

---

# Schedule Action

Possible icon:

```text
Calendar with Clock
```

Use for:

- Scheduled Jobs
- Future Execution
- Recurring Workflow
- Delayed Action

---

# Orchestrate Action

Possible icon:

```text
Connected Workflow Nodes
```

Use for coordinating multiple agents, services, or workflow steps.

---

# Agent Execution

AI agent execution controls may include:

- Run Agent
- Pause Agent
- Stop Agent
- Retry Task
- Escalate
- Human Review
- Approve Output

The action icon must not replace the required agent identity and audit metadata.

---

# Security Actions

Security actions include:

- Lock
- Unlock
- Grant Access
- Revoke Access
- Rotate Key
- Reset Password
- Verify
- Block
- Unblock

---

# Lock and Unlock

Lock may mean:

- Restrict editing
- Restrict access
- Lock account
- Lock resource
- Secure data

The label must clarify the target.

Unlock does not always mean granting broad access.

---

# Grant and Revoke Access

Possible icons:

- Key Plus
- Key Off
- User Check
- Shield Check
- Shield Off

Access changes must be logged.

---

# Rotate Key

Key rotation is a technical security action.

Use:

- Text label
- Confirmation
- Impact details
- Audit record
- Restricted permissions

A key icon alone is insufficient.

---

# Block and Unblock

Use for:

- User Accounts
- IP Addresses
- Integrations
- Devices
- Senders

Blocking must remain distinct from deleting or disabling.

---

# Organization Actions

Organization actions include:

- Move
- Reorder
- Sort
- Group
- Ungroup
- Pin
- Unpin
- Archive
- Categorize

---

# Move Action

Possible icon:

```text
Four-direction Arrow
```

or:

```text
Arrow to Folder
```

The icon depends on whether the action means:

- Dragging position
- Moving to another folder
- Moving between workflows
- Changing ownership

---

# Reorder Action

Possible icon:

```text
Drag Handle
```

The control should support keyboard alternatives.

---

# Sort Action

Sort icons should represent:

- Ascending
- Descending
- Custom Sort
- Unsorted

The interface should clearly show the current order.

---

# Group Action

Grouping combines items under a shared category or view.

Possible icon:

```text
Grouped Layers or Brackets
```

Use labels where the meaning is unfamiliar.

---

# Pin and Unpin

Pin may represent:

- Keep at top
- Keep visible
- Fix location
- Pin navigation

The active pinned state must remain clear.

---

# Recovery Actions

Recovery actions include:

- Undo
- Redo
- Restore
- Rollback
- Recover
- Reopen
- Revert Version

---

# Undo and Redo

Undo reverses the most recent supported action.

Redo reapplies an undone action.

Directional icons must support RTL behavior where appropriate.

---

# Rollback Action

Rollback restores a previous system or release state.

Use:

- Text label
- Version reference
- Impact summary
- Confirmation
- Audit record

Rollback must remain distinct from simple undo.

---

# Recover Action

Recover may apply to:

- Deleted Data
- Failed Workflow
- Lost File
- Corrupted Source
- Account Access

Use context-specific labels.

---

# Revert Version

Revert Version creates or restores content based on a previous version.

The interface should clarify whether history is preserved.

---

# Action Icon vs Status Icon

An action icon tells the user what can be done.

A status icon tells the user what is currently true.

Example:

```text
Play Button = Start Action

Running Indicator = Current Status
```

Do not use the same visual treatment without context.

---

# Action Icon vs Navigation Icon

An action changes state or data.

Navigation changes location.

Example:

```text
Open User Profile = Navigation

Edit User Profile = Action
```

---

# Action Icon vs Object Icon

An object icon identifies the item.

An action icon represents what happens to it.

Example:

```text
File Icon = File Object

File Plus Icon = Create File

File Download Icon = Download File
```

---

# Action Hierarchy

Actions should be categorized as:

- Primary
- Secondary
- Tertiary
- Destructive
- Contextual
- Bulk
- Administrative
- Automated

The icon treatment must align with the action hierarchy.

---

# Primary Actions

Primary actions should normally include:

- Visible text
- Strong visual emphasis
- Optional supporting icon

Examples:

```text
Create Project

Save Changes

Run Workflow
```

Icon-only primary actions should be rare.

---

# Secondary Actions

Secondary actions may include:

- Duplicate
- Export
- Share
- Archive
- Configure

These may appear as text buttons or toolbar actions.

---

# Tertiary Actions

Tertiary actions may include:

- Copy ID
- Open Details
- Download Log
- View Metadata

These may appear in menus or compact controls.

---

# Bulk Actions

Bulk actions apply to multiple selected items.

Examples:

- Delete Selected
- Archive Selected
- Export Selected
- Assign Selected
- Approve Selected

Bulk actions must:

- Show selection count.
- Confirm high-impact operations.
- Explain partial failures.
- Record results.
- Remain disabled when no items are selected.

---

# Contextual Actions

Contextual actions appear only when relevant.

Examples:

- Retry Failed Job
- Restore Archived Item
- Revoke Active Token
- Pause Running Workflow

Contextual icons must match the actual current state.

---

# Reversible and Irreversible Actions

Actions should be classified as:

| Type | Example |
|------|---------|
| Easily Reversible | Pin, Favorite, Mute |
| Reversible with Process | Archive, Disable |
| Difficult to Reverse | Merge, Transfer Ownership |
| Irreversible | Purge, Permanent Delete |

Higher-risk actions require stronger labels and confirmation.

---

# Confirmation Requirements

Confirmation is recommended when an action:

- Deletes important data.
- Affects many records.
- Changes permissions.
- Publishes externally.
- Stops production systems.
- Triggers financial impact.
- Executes irreversible automation.
- Removes access.
- Replaces approved assets.

---

# Confirmation Dialog

A confirmation dialog should include:

- Action name
- Affected object
- Impact
- Reversibility
- Required acknowledgement
- Confirm button
- Cancel button

The destructive button should include a clear text label.

---

# Action Feedback

After activation, the interface should provide appropriate feedback.

Possible outcomes:

- Success Message
- Error Message
- Progress Indicator
- Updated State
- Undo Option
- Audit Reference
- Partial-success Summary

---

# Success Feedback

Example:

```text
Project archived successfully.
```

Do not rely only on a green check icon.

---

# Error Feedback

Example:

```text
Export failed. Retry or review the error details.
```

Provide an actionable next step.

---

# Loading State

During action execution:

- Disable duplicate activation where necessary.
- Show progress or loading state.
- Preserve layout stability.
- Provide status text.
- Support cancellation where safe.

---

# Optimistic Actions

Optimistic UI may update before server confirmation.

Requirements:

- Clear rollback behavior
- Error recovery
- Stable state
- Duplicate prevention
- Audit consistency

---

# Action States

Every interactive action icon should support:

| State | Requirement |
|-------|-------------|
| Default | Clear and available |
| Hover | Interaction visible |
| Focus | Keyboard focus visible |
| Pressed | Activation visible |
| Loading | Progress understandable |
| Success | Completion confirmed |
| Error | Failure communicated |
| Disabled | Unavailable and understandable |
| Selected | Toggle state visible where applicable |

---

# Disabled Actions

Disabled actions should:

- Explain why they are unavailable where useful.
- Remain visually readable.
- Not receive activation.
- Use correct disabled semantics.
- Avoid appearing like a missing permission silently.

---

# Permission-restricted Actions

Where the user lacks permission:

- Hide the action only if disclosure is inappropriate.
- Otherwise show it disabled with explanation.
- Avoid false error states.
- Maintain consistent authorization.
- Log sensitive attempts where required.

---

# Action Icon Sizes

Recommended sizes:

| Context | Icon Size |
|---------|-----------|
| Dense Table Action | 16 px |
| Compact Button | 16 px |
| Standard Button | 20 px |
| Toolbar Action | 20 px |
| Large Button | 24 px |
| Empty-state Action | 32 px |
| Mobile Primary Action | 24 px |

---

# Interactive Targets

Recommended relationships:

| Icon Size | Minimum Target |
|-----------|----------------|
| 16 px | 32 px |
| 20 px | 40 px |
| 24 px | 44–48 px |

High-risk actions should not be placed too close to common actions.

---

# Icon and Label Order

Recommended default:

```text
[Icon] Action Label
```

Examples:

```text
[Plus] Add Task

[Download] Download Report

[Archive] Archive Project
```

Trailing action icons may be used only where component conventions define them.

---

# RTL Behavior

Actions with directional meaning may need mirroring.

Icons that may mirror:

- Undo
- Redo
- Send, depending on visual direction
- Move Left
- Move Right
- Indent
- Outdent
- Previous Step
- Next Step

Icons that normally remain fixed:

- Add
- Delete
- Save
- Archive
- Lock
- Unlock
- Upload
- Download
- Refresh
- Settings
- Approve
- Reject

---

# Action Icon Naming

Use semantic lowercase kebab-case.

Pattern:

```text
action-{verb}-{object}-{variant}
```

Examples:

```text
action-add-outline

action-user-add-outline

action-delete-outline

action-project-archive-outline

action-download-outline

action-workflow-run-filled
```

---

# Naming Rules

Names should:

- Start with an action verb.
- Include an object where needed.
- Describe meaning rather than shape.
- Remain stable.
- Avoid vague terms.
- Avoid UI-location names.
- Avoid version numbers in system names.

---

# Approved Action Verbs

Examples:

```text
add
create
edit
save
delete
remove
archive
restore
approve
reject
upload
download
import
export
copy
share
assign
link
unlink
refresh
retry
run
stop
pause
resume
schedule
lock
unlock
verify
revoke
merge
split
move
sort
filter
```

---

# Action Icon Identifier

Recommended pattern:

```text
ICON-ACTION-{VERB-CODE}-{NUMBER}
```

Examples:

```text
ICON-ACTION-ADD-001

ICON-ACTION-DELETE-001

ICON-ACTION-ARCHIVE-001

ICON-ACTION-RUN-001
```

---

# Required Metadata

Every action icon should include:

| Field | Description |
|------|-------------|
| Icon ID | Unique icon identifier |
| System Name | Stable machine-readable name |
| Display Name | Human-readable name |
| Action Verb | Approved action verb |
| Object | Target object where applicable |
| Primary Meaning | Exact action meaning |
| Risk Level | Low, Medium, High, or Critical |
| Reversible | Yes, Partially, or No |
| Confirmation Required | Yes or No |
| Allowed Contexts | Approved contexts |
| Restricted Contexts | Prohibited contexts |
| Default Size | Recommended size |
| Variant | Outline, filled, or other |
| RTL Behavior | Mirror or Fixed |
| Accessible Label | Suggested action label |
| Source Path | Master source location |
| Component Name | Code component name |
| Version | Current version |
| Status | Approved, deprecated, or archived |
| Replacement | Replacement icon |
| Owner | Responsible team |
| License | Licensing status |

---

# Metadata Example

```json
{
  "icon_id": "ICON-ACTION-ARCHIVE-001",
  "system_name": "action-archive",
  "display_name": "Archive",
  "action_verb": "archive",
  "primary_meaning": "Move an active item into archived storage",
  "risk_level": "Medium",
  "reversible": "Yes",
  "confirmation_required": false,
  "allowed_contexts": [
    "Project Actions",
    "Document Actions",
    "Record Actions"
  ],
  "restricted_contexts": [
    "Permanent Deletion"
  ],
  "default_size": 20,
  "rtl_behavior": "Fixed",
  "version": "1.0.0",
  "status": "Approved"
}
```

---

# Action Risk Levels

| Level | Description |
|-------|-------------|
| Low | Easily reversible and limited impact |
| Medium | Operational impact but recoverable |
| High | Broad, sensitive, or difficult-to-reverse impact |
| Critical | Irreversible, security-sensitive, financial, or production impact |

---

# Component Naming

Recommended components:

```text
AddIcon

EditIcon

SaveIcon

DeleteIcon

ArchiveIcon

RestoreIcon

ApproveIcon

RejectIcon

UploadIcon

DownloadIcon

CopyIcon

ShareIcon

RefreshIcon

RetryIcon

RunIcon

StopIcon
```

---

# Component API

Recommended action icon API:

```tsx
type ActionIconProps = {
  size?: 16 | 20 | 24 | 32;
  variant?: "outline" | "filled";
  title?: string;
  className?: string;
  destructive?: boolean;
};
```

The `destructive` property should affect approved styling, not icon geometry.

---

# Component Example

```tsx
import { ArchiveIcon } from "@mianx/icons";

export function ArchiveProjectButton() {
  return (
    <button
      type="button"
      aria-label="Archive project"
    >
      <ArchiveIcon
        size={20}
        aria-hidden="true"
      />
      <span>Archive</span>
    </button>
  );
}
```

---

# Destructive Component Example

```tsx
import { DeleteIcon } from "@mianx/icons";

export function DeleteProjectButton() {
  return (
    <button
      type="button"
      aria-label="Delete project permanently"
      data-variant="destructive"
    >
      <DeleteIcon
        size={20}
        aria-hidden="true"
      />
      <span>Delete permanently</span>
    </button>
  );
}
```

---

# Source Structure

Recommended structure:

```text
icons/

└── actions/
    ├── create/
    ├── edit/
    ├── persistence/
    ├── destructive/
    ├── lifecycle/
    ├── approval/
    ├── transfer/
    ├── clipboard/
    ├── sharing/
    ├── assignment/
    ├── relationship/
    ├── system/
    ├── workflow/
    ├── automation/
    ├── security/
    ├── organization/
    ├── recovery/
    ├── metadata/
    ├── exports/
    └── source-files/
```

Create folders only when corresponding assets exist.

---

# File Naming

Pattern:

```text
action-{verb}-{object}-{variant}-{size}-v{version}.{extension}
```

Examples:

```text
action-add-outline-20-v1.svg

action-project-delete-outline-20-v1.svg

action-workflow-run-filled-24-v1.svg

action-user-assign-outline-20-v1.svg

action-export-outline-20-v1.svg
```

Avoid:

```text
delete-final.svg

run-new.svg

action-icon-latest.svg

plus-fixed-2.svg
```

---

# Action Icon Registry

| Icon ID | System Name | Meaning | Risk | Reversible | Status |
|---------|-------------|---------|------|------------|--------|
| TBD | action-add | Create or add an item | Low | Yes | Planned |
| TBD | action-edit | Modify existing content | Low | Yes | Planned |
| TBD | action-save | Persist changes | Medium | Partially | Planned |
| TBD | action-delete | Delete an item | High | Depends | Planned |
| TBD | action-archive | Remove from active use | Medium | Yes | Planned |
| TBD | action-approve | Approve a request or state | High | Depends | Planned |
| TBD | action-reject | Reject a request or state | High | Depends | Planned |
| TBD | action-upload | Upload data | Medium | Depends | Planned |
| TBD | action-download | Download an artifact | Low | Yes | Planned |
| TBD | action-run | Execute a process | Medium | Depends | Planned |

---

# Action Usage Matrix

| Action | Approved Icon Direction | Key Restriction |
|--------|-------------------------|-----------------|
| Add | Plus | Context must identify object |
| Edit | Pencil | Not for configuration |
| Save | Save Symbol | Avoid in autosave-only interfaces |
| Delete | Trash | Not for archive |
| Remove | Minus or X | Must identify relationship |
| Archive | Archive Box | Must preserve recoverability |
| Approve | Check | Must not mean ordinary selection |
| Reject | X Circle | Must not mean close |
| Upload | Arrow into system | Not for up-level navigation |
| Download | Arrow to device | Not equal to export |
| Copy | Overlapping documents | Clipboard meaning |
| Share | Approved share symbol | Must define sharing behavior |
| Refresh | Circular arrow | Must not restart systems |
| Retry | Circular arrow with failure context | Must control duplicate effects |
| Run | Play | Must identify execution target |
| Stop | Square | Must explain impact |
| Pause | Pause | Current process required |
| Restore | Recovery arrow | Must identify restore source |

---

# Duplicate Prevention

Before creating a new action icon:

- Search the action registry.
- Review approved verbs.
- Check UI icons.
- Check navigation icons.
- Check status icons.
- Review synonyms.
- Confirm the action is semantically distinct.
- Document why an existing action icon cannot be reused.

---

# Common Semantic Conflicts

Review carefully:

```text
Delete vs Remove

Archive vs Delete

Close vs Cancel

Refresh vs Retry

Refresh vs Restart

Download vs Export

Upload vs Import

Copy vs Duplicate

Share vs Copy Link

Approve vs Verify

Disable vs Deactivate

Restore vs Undo

Undo vs Rollback

Run vs Trigger

Pause vs Stop
```

---

# Custom Action Icon Request

A request should include:

- Request ID
- Action Verb
- Target Object
- Intended Outcome
- Risk Level
- Reversibility
- Confirmation Requirement
- Required Sizes
- Required Variants
- Existing Icons Reviewed
- Accessible Label
- Product Owner
- Target Release
- Business Justification

---

# Approval Workflow

```text
Action Requirement Identified

↓

Existing Action Library Searched

↓

Action Verb Confirmed

↓

Risk and Reversibility Classified

↓

Icon Selected or Designed

↓

Component Context Tested

↓

Destructive-action Review Where Required

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
| Product Designer | Defines action requirement |
| Product Owner | Confirms business effect |
| Icon Designer | Creates or selects icon |
| UX Architect | Confirms semantic meaning |
| Design-system Lead | Ensures visual consistency |
| Accessibility Reviewer | Reviews interaction and labeling |
| Security Reviewer | Reviews high-risk access actions |
| Frontend Engineer | Validates component behavior |
| Asset Manager | Registers and publishes asset |
| Governance Team | Reviews critical exceptions |

---

# Testing Requirements

Every action icon should be tested in:

- Default State
- Hover State
- Focus State
- Pressed State
- Loading State
- Success State
- Error State
- Disabled State
- Light Theme
- Dark Theme
- High-contrast Mode
- 16 px
- 20 px
- 24 px
- Keyboard Interface
- Touch Interface
- Screen-reader Context
- RTL Layout where applicable

---

# Action Component Testing

Tests should verify:

- Correct action outcome
- Correct accessible label
- Correct loading behavior
- Duplicate-click prevention
- Confirmation behavior
- Disabled behavior
- Permission behavior
- Error recovery
- Success feedback
- Keyboard activation
- Touch target size
- Destructive styling
- Audit event where required

---

# Destructive-action Testing

High-risk actions should test:

- Confirmation copy
- Object identification
- Reversibility statement
- Permission requirement
- Audit logging
- Cancellation behavior
- Error handling
- Partial-failure handling
- Recovery path
- Bulk-action impact

---

# Visual Regression Testing

Automated tests should detect:

- Path changes
- Stroke changes
- Icon substitution
- View-box changes
- Alignment shifts
- Color-token failures
- Incorrect destructive treatment
- Theme failures
- Clipping
- Active-state changes

---

# SVG Validation

Every production SVG must be checked for:

- Correct view box
- Correct stroke or fill
- No unsafe scripts
- No event handlers
- No external resources
- No hidden content
- No hardcoded unapproved colors
- Correct file naming
- Correct metadata
- Minimal path complexity

---

# Accessibility

Action controls must include:

- Accessible name
- Visible label where meaning is not universal
- Keyboard support
- Visible focus
- Sufficient target size
- Correct disabled semantics
- Status feedback
- Confirmation where necessary

---

# Icon-only Action Controls

Icon-only actions should be limited to:

- Familiar low-risk actions
- Repeated compact interfaces
- Toolbars with tooltips
- Dense tables
- Mobile controls with clear context

High-risk actions should normally include visible text.

---

# Tooltips

Tooltips should:

- Describe the action.
- Appear on hover and focus.
- Remain concise.
- Not replace accessible labels.
- Avoid vague text such as `Action`.

Examples:

```text
Archive project

Copy API key

Retry failed job
```

---

# Destructive Accessible Labels

Use explicit labels.

Good:

```text
Delete project permanently
```

Weak:

```text
Delete
```

Ambiguous:

```text
Remove
```

---

# Action Feedback Accessibility

Dynamic feedback should be announced where appropriate.

Example:

```html
<div role="status">
  Report exported successfully.
</div>
```

Critical errors may require an alert pattern.

---

# Permission and Governance

Actions affecting:

- Security
- Billing
- Production
- Legal Records
- Agent Permissions
- Partner Assets
- Public Publishing
- Data Deletion

must follow authorization and audit requirements.

The icon does not grant permission.

---

# Audit Requirements

Action audits should verify:

- Semantic consistency
- Correct destructive-action usage
- Accessible labels
- Confirmation patterns
- Permission enforcement
- Duplicate meanings
- Mixed icon families
- Incorrect color usage
- Deprecated icons
- Missing metadata
- Unsafe SVGs
- Missing feedback
- Small interaction targets
- Missing audit events

Recommended frequency:

```text
Monthly Automated Validation

Quarterly Product Action Audit

Annual Action Semantics Review
```

---

# AI Workforce Usage

AI agents may:

- Select approved action icons.
- Suggest semantic action labels.
- Classify action risk.
- Detect delete/archive conflicts.
- Detect duplicate action meanings.
- Generate metadata drafts.
- Identify missing confirmations.
- Detect deprecated usage.
- Produce action usage reports.
- Recommend accessible labels.

AI agents must not:

- Approve destructive actions autonomously.
- Change action meanings.
- publish unreviewed icons.
- remove confirmation requirements.
- bypass permissions.
- replace production icons silently.
- treat status icons as actions.
- approve their own changes.

---

# Automation Requirements

The icon platform should eventually support:

- Action-verb validation
- Risk-level validation
- Duplicate semantic detection
- Destructive-action linting
- Accessible-label suggestions
- Confirmation-pattern checks
- SVG security scanning
- Component generation
- Permission metadata checks
- Deprecated-usage detection
- Visual regression testing
- Usage inventory
- Release manifest generation

---

# Quality Checklist

Before approving an action icon:

- [ ] Action requirement documented
- [ ] Existing library searched
- [ ] Duplicate check completed
- [ ] Action verb approved
- [ ] Target object documented
- [ ] Primary meaning confirmed
- [ ] Risk level classified
- [ ] Reversibility classified
- [ ] Confirmation requirement defined
- [ ] Allowed contexts documented
- [ ] Restricted contexts documented
- [ ] Icon ID assigned
- [ ] System name approved
- [ ] Visual family verified
- [ ] Grid verified
- [ ] Stroke verified
- [ ] Optical balance reviewed
- [ ] Small-size test completed
- [ ] Light-theme test completed
- [ ] Dark-theme test completed
- [ ] High-contrast test completed
- [ ] RTL behavior documented
- [ ] Accessible label documented
- [ ] Tooltip requirement reviewed
- [ ] SVG security scan passed
- [ ] Component generated
- [ ] Metadata completed
- [ ] Source file preserved
- [ ] Design-system approval recorded

---

# Action Review Checklist

Before releasing an action control:

- [ ] Correct icon selected
- [ ] Icon meaning matches behavior
- [ ] Visible label included where required
- [ ] Accessible name included
- [ ] Risk level reviewed
- [ ] Confirmation implemented where required
- [ ] Reversibility communicated
- [ ] Loading state implemented
- [ ] Success feedback implemented
- [ ] Error feedback implemented
- [ ] Duplicate activation prevented
- [ ] Keyboard support verified
- [ ] Focus state verified
- [ ] Touch target verified
- [ ] Permission behavior verified
- [ ] Audit logging verified where required
- [ ] Deprecated icon not used

---

# Common Mistakes

Avoid:

- Using delete and archive interchangeably.
- Using X for delete without context.
- Using refresh for retry or restart.
- Using download for export.
- Using copy for duplicate.
- Using approve icons for ordinary selection.
- Using action icons as navigation.
- Using icon-only controls for critical actions.
- Omitting confirmation for irreversible actions.
- Hiding action risk behind vague labels.
- Using hardcoded destructive colors.
- Failing to provide loading and result feedback.
- Allowing repeated activation during execution.
- Using tiny touch targets.
- Publishing unvalidated SVG files.
- Creating new action icons without checking approved verbs.

---

# Related Documents

- `README.md`
- `icon-system.md`
- `ui-icons.md`
- `navigation-icons.md`
- `status-icons.md`
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
- `../../15-ui-ux/README.md`
- `../../23-multi-agent-system/README.md`
- `../../24-automation-engine/README.md`
- `../../46-enterprise-quality/README.md`

---

# Best Practices

- Name actions with clear verbs.
- Match the icon to the actual result.
- Keep delete, remove, archive, and close distinct.
- Use visible text for high-risk actions.
- Classify risk and reversibility.
- Provide confirmation for irreversible changes.
- Show loading, success, and error feedback.
- Use design tokens for size, color, and state.
- Keep action meanings stable across products.
- Search the registry before requesting a new icon.
- Generate components from approved SVG sources.
- Keep design, behavior, permissions, accessibility, and audit records synchronized.

---

# Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-07-10 | Initial enterprise action icon standard established |

---

# Next Document

```text
docs/
└── 18-assets/
    └── icons/
        └── status-icons.md
```

---

**End of Document**