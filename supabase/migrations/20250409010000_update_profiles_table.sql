
-- Update profiles table to make wallet_address optional
ALTER TABLE public.profiles
ALTER COLUMN wallet_address DROP NOT NULL;
