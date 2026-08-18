create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  budget text,
  need text not null,
  status text default 'new',
  analysis jsonb,
  created_at timestamptz default now()
);

-- Only the server (service role) can read/write; the browser never reads
-- directly. RLS is enabled with no policies, so the anon key has no access.
alter table leads enable row level security;

-- The API routes use the service role key, which bypasses RLS. Grant it table
-- privileges explicitly. (Hosted Supabase grants these by default, so this is a
-- harmless no-op there but is required for the local dev stack.)
grant all privileges on table leads to service_role;
