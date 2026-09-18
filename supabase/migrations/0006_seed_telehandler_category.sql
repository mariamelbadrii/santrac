-- Seeds the first equipment_types row so the admin category picker and
-- Arabic localization have something to resolve against (equipment_types
-- was empty, which is why the JCB 537's category = 'Telehandler' had no
-- name_ar to fall back to). Existing equipment rows whose category text
-- matches name_en resolve correctly as soon as this row exists — no
-- change to the equipment table needed.
insert into equipment_types (slug, name_en, name_ar, enabled)
values ('telehandler', 'Telehandler', 'تلي هاندلر', true)
on conflict (slug) do nothing;
