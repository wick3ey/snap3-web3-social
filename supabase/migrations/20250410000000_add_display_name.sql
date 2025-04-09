
-- Add display_name column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Create a storage bucket for profile images
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES ('profile-images', 'profile-images', true, false, 5242880, ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp']::text[])
ON CONFLICT (id) DO NOTHING;

-- Create a policy to allow authenticated users to upload their own avatar
CREATE POLICY "Users can upload their own avatar"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-images' AND (storage.foldername(name))[1] = 'avatars' AND auth.uid()::text = (regexp_match(name, '^avatars/([a-f0-9\-]+)-.+$'))[1]);

-- Create a policy to allow users to update their own avatar
CREATE POLICY "Users can update their own avatar"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-images' AND (storage.foldername(name))[1] = 'avatars' AND auth.uid()::text = (regexp_match(name, '^avatars/([a-f0-9\-]+)-.+$'))[1]);

-- Create a policy to allow users to delete their own avatar
CREATE POLICY "Users can delete their own avatar"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'profile-images' AND (storage.foldername(name))[1] = 'avatars' AND auth.uid()::text = (regexp_match(name, '^avatars/([a-f0-9\-]+)-.+$'))[1]);

-- Create a policy to allow public access to avatars for reading
CREATE POLICY "Public read access for avatars"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'profile-images' AND (storage.foldername(name))[1] = 'avatars');
