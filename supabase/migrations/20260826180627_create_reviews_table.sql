/*
# Create reviews table (single-tenant, no auth)

1. New Tables
- `reviews`
  - `id` (uuid, primary key)
  - `name` (text, not null) — reviewer's display name
  - `location` (text, nullable) — optional city/area
  - `rating` (integer, not null, 1-5) — star rating
  - `text` (text, not null) — review body
  - `service` (text, nullable) — which service the review is about
  - `approved` (boolean, default true) — whether the review is visible on the site
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `reviews`.
- Allow anon + authenticated to SELECT approved reviews (public visibility).
- Allow anon + authenticated to INSERT new reviews (public submission).
- No UPDATE or DELETE from the anon key — only the server/service role can moderate.

3. Notes
- This is a no-auth public review system. Anyone visiting the site can submit a review.
- Reviews are visible immediately (approved defaults to true). The `approved` column exists for future moderation if needed.
- A CHECK constraint enforces rating between 1 and 5.
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL,
  service text,
  approved boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_approved_reviews" ON reviews;
CREATE POLICY "anon_select_approved_reviews"
ON reviews FOR SELECT
TO anon, authenticated
USING (approved = true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews"
ON reviews FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews (created_at DESC);
