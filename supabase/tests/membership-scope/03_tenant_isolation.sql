-- Tenant A / Tenant B isolation + constraint rejection (disposable data).

do $$
declare
  org_a uuid := 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
  org_b uuid := 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
  proj_a uuid := 'aa111111-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
  proj_b uuid := 'bb222222-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
  user_a uuid := 'a0000000-0000-4000-8000-000000000001';
  user_b uuid := 'b0000000-0000-4000-8000-000000000001';
  cnt int;
begin
  insert into public.organizations (id, name, slug) values
    (org_a, 'Org A', 'org-a'),
    (org_b, 'Org B', 'org-b')
  on conflict (slug) do nothing;

  insert into public.projects (id, organization_id, name, slug) values
    (proj_a, org_a, 'Project A', 'project-a'),
    (proj_b, org_b, 'Project B', 'project-b')
  on conflict (organization_id, slug) do nothing;

  insert into public.admin_memberships (user_id, email, role, status, organization_id, project_id)
  values
    (user_a, 'a@example.test', 'admin', 'active', org_a, proj_a),
    (user_b, 'b@example.test', 'admin', 'active', org_b, proj_b);

  -- Isolation: membership A only sees org A project via filter.
  select count(*) into cnt
  from public.projects p
  join public.admin_memberships m on m.user_id = user_a
  where p.id = proj_b
    and (
      (m.project_id is not null and p.id = m.project_id)
      or (m.project_id is null and m.organization_id is not null and p.organization_id = m.organization_id)
    );
  if cnt <> 0 then
    raise exception 'ASSERT_FAIL: Tenant A filter leaked Project B';
  end if;

  select count(*) into cnt
  from public.projects p
  join public.admin_memberships m on m.user_id = user_a
  where p.id = proj_a
    and m.project_id = proj_a;
  if cnt <> 1 then
    raise exception 'ASSERT_FAIL: Tenant A cannot see Project A';
  end if;

  -- project_id without organization_id must fail.
  begin
    insert into public.admin_memberships (user_id, email, role, status, organization_id, project_id)
    values ('c0000000-0000-4000-8000-000000000001', 'c@example.test', 'viewer', 'active', null, proj_a);
    raise exception 'ASSERT_FAIL: project without org should be rejected';
  exception
    when check_violation then
      null; -- expected
  end;
end $$;

select 'isolation_ok' as status;
