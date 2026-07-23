-- The public prototype's contact form collects phone and industry in addition
-- to the existing fields. Add them as nullable columns. (Grants on the table
-- already cover new columns for service_role.)
alter table leads add column if not exists phone text;
alter table leads add column if not exists industry text;
