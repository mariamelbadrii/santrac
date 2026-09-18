# SANTRAC database

This directory holds the SQL schema for SANTRAC's backend (Supabase /
Lovable Cloud). No live project is connected in this environment yet — see
the root-level chat summary for exactly what's needed to connect one.

## Migrations (apply in order)

1. `0001_init.sql` — `equipment_types`, `equipment`, `leads`, `user_roles`,
   `has_role()`, and the base RLS policies.
2. `0002_site_settings.sql` — the admin-editable `site_settings` singleton
   row (contact/social links).
3. `0003_equipment_and_leads_extensions.sql` — adds `best_suited_for_en/ar`
   to `equipment`, `enabled` to `equipment_types`, `source` to `leads`, and
   the remaining `site_settings` fields (secondary phone, address, hours,
   TikTok/YouTube).
4. `0004_equipment_image_storage.sql` — the `equipment-images` storage
   bucket and its public-read / admin-write policies.

## To connect a real backend

1. Create a Supabase project (directly, or via Lovable Cloud).
2. Apply all four migrations above, in order — via the Supabase SQL editor
   (paste each file's contents and run) or the CLI:
   ```
   supabase db push
   ```
3. Create 1–2 admin users in Supabase Auth (dashboard → Authentication →
   Users → Add user), then grant each the `admin` role:
   ```sql
   insert into user_roles (user_id, role) values ('<auth-user-uuid>', 'admin');
   ```
   There is no public admin signup and no self-promotion path — this
   insert, done by whoever has direct database access, is the only way to
   create an admin account.
4. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` (see
   `.env.example` at the repo root).
5. (Optional) Set up the new-lead email notification — see
   `supabase/functions/notify-new-lead/README.md`. Leads save correctly
   without this step; it only adds the email alert.

Until step 4, the site builds and runs, but any Supabase calls (equipment
listing, lead submission, admin login) fail gracefully rather than throw.

## Uploaded images

Equipment photos uploaded from `/admin/inventory` go to the
`equipment-images` storage bucket created by migration 0004. It's public
for reads (so equipment photos load on the public site) and locked to
admin accounts for writes.
