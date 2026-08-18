-- Additive, non-destructive migration for the final approved lead form/
-- admin dashboard design. No existing rows or columns are dropped.

-- New optional fields collected by the approved contact form.
alter table leads add column if not exists phone text;
alter table leads add column if not exists industry text;

-- Soft-delete support: the admin "Archive" action sets this instead of a
-- hard DELETE, so lead data is never destroyed from the dashboard.
alter table leads add column if not exists archived_at timestamptz;

-- Normalize any pre-existing status values to the locked status set before
-- adding the check constraint below. This repository has no production
-- traffic yet (Phase A/website-foundation stage), so this is a safe,
-- corrective backfill rather than a destructive change: no rows are
-- deleted, only a legacy label ("qualified", used by an earlier prototype
-- admin UI) is renamed to its closest equivalent in the locked set.
update leads set status = 'converted' where status = 'qualified';
update leads set status = 'new' where status is null;

alter table leads drop constraint if exists leads_status_check;
alter table leads add constraint leads_status_check
  check (status in ('new', 'contacted', 'converted', 'closed'));

alter table leads alter column status set default 'new';
