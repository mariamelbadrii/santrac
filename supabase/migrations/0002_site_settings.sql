-- Admin-editable contact/social settings, so the phone number, WhatsApp
-- number, email, and social links can be changed from /admin/settings
-- without a code deploy. Singleton row (id is always 1).

create table site_settings (
  id integer primary key default 1,
  whatsapp_number text,
  phone text,
  email text,
  facebook_url text,
  instagram_url text,
  linkedin_url text,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

alter table site_settings enable row level security;

create policy "public can read site settings"
  on site_settings for select
  using (true);

create policy "admins can manage site settings"
  on site_settings for all
  using (has_role(auth.uid(), 'admin'))
  with check (has_role(auth.uid(), 'admin'));

create trigger site_settings_set_updated_at
  before update on site_settings
  for each row execute function set_updated_at();

insert into site_settings (id) values (1)
  on conflict (id) do nothing;
