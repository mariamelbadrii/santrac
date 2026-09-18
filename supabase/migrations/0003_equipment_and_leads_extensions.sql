-- Extends equipment, equipment_types, leads, and site_settings with the
-- fields needed for real inventory/category/lead management from
-- /admin, without forcing forklift-only fields onto other equipment types
-- (specifications stays a flexible jsonb object).

alter table equipment
  add column if not exists best_suited_for_en text,
  add column if not exists best_suited_for_ar text;

alter table equipment_types
  add column if not exists enabled boolean not null default true;

alter table leads
  add column if not exists source text;

alter table site_settings
  add column if not exists secondary_phone text,
  add column if not exists address_en text,
  add column if not exists address_ar text,
  add column if not exists tiktok_url text,
  add column if not exists youtube_url text,
  add column if not exists hours_en text,
  add column if not exists hours_ar text;
