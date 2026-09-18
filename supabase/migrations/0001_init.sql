-- SANTRAC schema baseline.
-- Apply this once a Supabase (Lovable Cloud) project is connected:
--   supabase db push   (or run via the Supabase SQL editor)

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Roles
-- ---------------------------------------------------------------------------
create type app_role as enum ('admin');

create table user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table user_roles enable row level security;

-- Security-definer function so RLS policies can check roles without
-- recursively querying user_roles under RLS.
create or replace function has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "admins can read roles"
  on user_roles for select
  using (has_role(auth.uid(), 'admin'));

-- ---------------------------------------------------------------------------
-- Equipment types (catalog categories)
-- ---------------------------------------------------------------------------
create table equipment_types (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_ar text not null,
  created_at timestamptz not null default now()
);

alter table equipment_types enable row level security;

create policy "public can read equipment types"
  on equipment_types for select
  using (true);

create policy "admins can manage equipment types"
  on equipment_types for all
  using (has_role(auth.uid(), 'admin'))
  with check (has_role(auth.uid(), 'admin'));

-- ---------------------------------------------------------------------------
-- Equipment (general inventory model — supersedes the old forklift-only table)
-- ---------------------------------------------------------------------------
create type equipment_condition as enum ('new', 'used', 'refurbished');
create type equipment_availability as enum ('in_stock', 'incoming', 'sold');
create type equipment_price_mode as enum ('fixed', 'on_request');
create type equipment_status as enum ('draft', 'published', 'sold', 'archived');

create table equipment (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null,
  brand text not null,
  model text not null,
  year int,
  condition equipment_condition not null default 'used',
  location text,
  availability equipment_availability not null default 'in_stock',
  price_mode equipment_price_mode not null default 'on_request',
  price numeric,
  main_image text,
  additional_images text[] not null default '{}',
  description_en text,
  description_ar text,
  specifications jsonb not null default '{}'::jsonb,
  featured boolean not null default false,
  published boolean not null default false,
  status equipment_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table equipment enable row level security;

create policy "public can read published equipment"
  on equipment for select
  using (published = true or has_role(auth.uid(), 'admin'));

create policy "admins can manage equipment"
  on equipment for all
  using (has_role(auth.uid(), 'admin'))
  with check (has_role(auth.uid(), 'admin'));

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger equipment_set_updated_at
  before update on equipment
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Leads
-- ---------------------------------------------------------------------------
create type lead_status as enum (
  'new', 'contacted', 'qualified', 'quoted', 'negotiating', 'won', 'lost'
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  equipment_need text not null,
  location text not null,
  company text,
  email text,
  brand_model_preference text,
  additional_requirements text,
  equipment_id uuid references equipment (id) on delete set null,
  status lead_status not null default 'new',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  created_at timestamptz not null default now()
);

alter table leads enable row level security;

create policy "public can submit leads"
  on leads for insert
  with check (true);

create policy "admins can read leads"
  on leads for select
  using (has_role(auth.uid(), 'admin'));

create policy "admins can update leads"
  on leads for update
  using (has_role(auth.uid(), 'admin'))
  with check (has_role(auth.uid(), 'admin'));
