-- Migration: Add profile fields to users table
-- Run this if you already have a users table and need to add the new fields

-- Add new columns if they don't exist
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS skill_tags TEXT[];

-- Update RLS policies to allow reading bio and location for all users (optional)
-- This allows users to see each other's profiles
CREATE POLICY "Users can view all profiles" 
ON users FOR SELECT
USING (true);

-- Note: The existing policies for UPDATE and INSERT remain the same
-- Users can still only update their own profiles

