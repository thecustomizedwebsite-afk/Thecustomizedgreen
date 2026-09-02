/*
# Create blog posts table (single-tenant, no auth)

1. New Tables
- `blog_posts`
  - `id` (uuid, primary key)
  - `title` (text, not null) — public article title
  - `excerpt` (text, not null) — short preview shown in the blog listing
  - `content` (text, not null) — full article body
  - `author` (text, not null) — displayed author name
  - `image_url` (text, nullable) — optional article image URL
  - `published` (boolean, default true) — whether the article is visible
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `blog_posts`.
- Allow anon + authenticated users to read published posts.
- Allow anon + authenticated users to create posts directly from the website.
- No public UPDATE or DELETE policies are added.

3. Notes
- This is a public, no-sign-in publishing flow as requested.
- User-entered article content is displayed as plain text to keep the page safe.
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  image_url text,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_published_blog_posts" ON blog_posts;
CREATE POLICY "anon_select_published_blog_posts"
ON blog_posts FOR SELECT
TO anon, authenticated
USING (published = true);

DROP POLICY IF EXISTS "anon_insert_blog_posts" ON blog_posts;
CREATE POLICY "anon_insert_blog_posts"
ON blog_posts FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts (created_at DESC);
