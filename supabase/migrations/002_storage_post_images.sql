-- Supabase Storage bucket + policies for post image uploads
-- Run this in Supabase SQL Editor after enabling Storage in your project.

-- Create a public bucket for post images (safe to run multiple times)
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

-- Policies (Storage tables use RLS)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public read post-images'
  ) then
    create policy "Public read post-images"
      on storage.objects
      for select
      using (bucket_id = 'post-images');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated upload post-images'
  ) then
    create policy "Authenticated upload post-images"
      on storage.objects
      for insert
      to authenticated
      with check (bucket_id = 'post-images');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated update post-images'
  ) then
    create policy "Authenticated update post-images"
      on storage.objects
      for update
      to authenticated
      using (bucket_id = 'post-images')
      with check (bucket_id = 'post-images');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated delete post-images'
  ) then
    create policy "Authenticated delete post-images"
      on storage.objects
      for delete
      to authenticated
      using (bucket_id = 'post-images');
  end if;
end $$;

