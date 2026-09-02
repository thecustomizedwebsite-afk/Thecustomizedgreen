/*
# Create contact_messages table (single-tenant, no auth)

1. New Tables
- `contact_messages`
  - `id` (uuid, primary key)
  - `name` (text, not null) — sender's full name
  - `email` (text, not null) — sender's email address
  - `phone` (text, nullable) — optional phone number
  - `service` (text, nullable) — which service the visitor is interested in
  - `message` (text, not null) — the message body
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `contact_messages`.
- Allow anon + authenticated to INSERT new messages (public submission form).
- No SELECT, UPDATE, or DELETE from the anon key — only the server/service role can read and manage messages.

3. Notes
- This is a no-auth contact form. Anyone visiting the site can submit a message.
- Messages are stored in the database and also emailed to the company inbox via an edge function.
- No public read access — message contents are private to the site owner.
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
CREATE POLICY "anon_insert_contact_messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages (created_at DESC);
