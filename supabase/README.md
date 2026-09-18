# SANTRAC database

This directory holds the SQL schema for SANTRAC's backend (Supabase / Lovable
Cloud). No live project is connected in this environment yet.

## To connect a real backend

1. Create a Supabase project (directly, or via Lovable Cloud).
2. Apply `migrations/0001_init.sql` via the Supabase SQL editor or the
   Supabase CLI (`supabase db push`).
3. Create 1–2 admin users in Supabase Auth, then grant them the `admin` role:
   ```sql
   insert into user_roles (user_id, role) values ('<auth-user-uuid>', 'admin');
   ```
4. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` (see
   `.env.example` at the repo root).

Until then, the site builds and runs, but any Supabase calls (equipment
listing, lead submission, admin login) will fail gracefully rather than throw.
