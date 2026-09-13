-- ============================================================
-- Supabase Storage — run after schema.sql
-- Creates a public "media" bucket for hero/portfolio/story/
-- testimonial images uploaded from the admin panel.
-- ============================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Anyone can view files (bucket is public, but policy is still required for select via API)
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');

-- Only authenticated users (the admin) can upload, replace, or delete
create policy "auth upload media" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "auth update media" on storage.objects
  for update using (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "auth delete media" on storage.objects
  for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
