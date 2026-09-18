-- Storage bucket for equipment photos, uploaded from /admin/inventory and
-- served on public equipment pages.

insert into storage.buckets (id, name, public)
values ('equipment-images', 'equipment-images', true)
on conflict (id) do nothing;

create policy "public can read equipment images"
  on storage.objects for select
  using (bucket_id = 'equipment-images');

create policy "admins can upload equipment images"
  on storage.objects for insert
  with check (bucket_id = 'equipment-images' and has_role(auth.uid(), 'admin'));

create policy "admins can update equipment images"
  on storage.objects for update
  using (bucket_id = 'equipment-images' and has_role(auth.uid(), 'admin'));

create policy "admins can delete equipment images"
  on storage.objects for delete
  using (bucket_id = 'equipment-images' and has_role(auth.uid(), 'admin'));
