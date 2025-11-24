# Supabase Database Setup

This document contains the SQL schemas and setup instructions for the SwapSkill Supabase database.

## Tables to Create

### 1. Users Table

This table stores user profile information linked to Supabase Auth users.

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  uid UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  bio TEXT,
  location TEXT,
  avatar_url TEXT,
  skill_tags TEXT[]
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create index on uid for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_uid ON users(uid);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own data
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = uid);

-- Policy: Users can update their own data
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = uid);

-- Policy: Users can insert their own data (for signup)
CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = uid);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on row update
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 2. Skills Table

This table stores skill listings posted by users.

**Note:** Column names use snake_case (SQL convention). The code automatically maps these to camelCase for TypeScript.

```sql
-- Create Skills table
CREATE TABLE IF NOT EXISTS "Skills" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  price NUMERIC(10, 2) DEFAULT 0,
  level TEXT,
  location TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  exchange_type TEXT,
  image_url TEXT,
  approved BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_skills_approved ON "Skills"(approved);
CREATE INDEX IF NOT EXISTS idx_skills_user_id ON "Skills"(user_id);
CREATE INDEX IF NOT EXISTS idx_skills_category ON "Skills"(category);
CREATE INDEX IF NOT EXISTS idx_skills_created_at ON "Skills"(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_skills_tags ON "Skills" USING GIN(tags);

-- Enable Row Level Security
ALTER TABLE "Skills" ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view approved skills
CREATE POLICY "Anyone can view approved skills"
  ON "Skills" FOR SELECT
  USING (approved = true);

-- Policy: Users can view their own skills (even if not approved)
CREATE POLICY "Users can view own skills"
  ON "Skills" FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Authenticated users can create skills
CREATE POLICY "Authenticated users can create skills"
  ON "Skills" FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own skills
CREATE POLICY "Users can update own skills"
  ON "Skills" FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own skills
CREATE POLICY "Users can delete own skills"
  ON "Skills" FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger to update updated_at on row update
CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON "Skills"
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Setup Instructions

### Step 1: Create Tables in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the SQL code above (start with the `users` table, then `Skills` table)
4. Execute each SQL block

### Step 2: Verify Tables

1. Go to **Table Editor** in Supabase
2. Verify that both `users` and `Skills` tables are created
3. Check that indexes and RLS policies are applied

### Step 3: Configure Authentication

1. Go to **Authentication** → **Settings**
2. Enable **Email** provider
3. Configure email templates if needed
4. Set up email confirmation settings (optional but recommended)

### Step 4: Test the Setup

1. Try signing up a new user through your app
2. Verify that a user record is created in the `users` table
3. Try creating a skill listing
4. Verify that the skill appears in the `Skills` table

## Column Mappings

### Users Table
- `uid` → Maps to Supabase Auth `user.id`
- `full_name` → User's full name
- `email` → User's email (synced with auth)
- `created_at` → Account creation timestamp
- `last_login_at` → Last login timestamp
- `updated_at` → Last update timestamp

### Skills Table
- `id` → Unique skill identifier (UUID)
- `title` → Skill title
- `description` → Skill description
- `category` → Skill category
- `user_id` → Foreign key to `users.uid`
- `user_name` → Display name of the user
- `user_avatar` → URL to user's avatar image
- `created_at` → Skill creation timestamp
- `price` → Price (numeric)
- `level` → Skill level (e.g., "Beginner", "Intermediate", "Advanced")
- `location` → Location where skill is offered
- `tags` → Array of tags (TEXT[])
- `exchange_type` → Type of exchange (e.g., "Paid", "Free", "Trade")
- `image_url` → URL to skill image
- `approved` → Boolean flag for admin approval
- `updated_at` → Last update timestamp

## Notes

- The `Skills` table name is in quotes to preserve case sensitivity (matching your TypeScript code)
- Row Level Security (RLS) is enabled for both tables
- The `users` table uses `uid` as the primary key to match Supabase Auth
- Tags are stored as a PostgreSQL array type for efficient querying
- The `approved` field defaults to `false` - you may want to create an admin interface to approve skills

## Optional: Admin Role

If you want to add admin functionality for approving skills:

```sql
-- Create admin role (optional)
CREATE ROLE admin;

-- Grant admin permissions
GRANT ALL ON "Skills" TO admin;

-- Policy: Admins can update any skill
CREATE POLICY "Admins can update any skill"
  ON "Skills" FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.uid = auth.uid()
      AND users.email = 'admin@example.com' -- Replace with your admin email
    )
  );
```

