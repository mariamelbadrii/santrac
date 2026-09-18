-- PostgREST/Supabase API roles (anon, authenticated) had no explicit table
-- privileges on these tables, so every request failed at the Postgres
-- privilege check before RLS ever got a chance to evaluate ("permission
-- denied for table ..."). These grants only open the door at the table
-- level; the existing RLS policies remain the authorization layer that
-- decides which rows/actions are actually allowed.

grant usage on schema public to anon, authenticated;

grant select on table public.equipment
  to anon, authenticated;

grant insert, update, delete on table public.equipment
  to authenticated;

grant select on table public.equipment_types
  to anon, authenticated;

grant insert, update, delete on table public.equipment_types
  to authenticated;

grant insert on table public.leads
  to anon, authenticated;

grant select, update on table public.leads
  to authenticated;

grant select on table public.site_settings
  to anon, authenticated;

grant insert, update on table public.site_settings
  to authenticated;

grant select on table public.user_roles
  to authenticated;
