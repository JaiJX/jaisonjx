-- Photography likes schema for Neon Authorize.
-- Run once in the Neon SQL Editor against your database.
-- Neon Authorize must be enabled on the project (Console → Authorize).

CREATE TABLE IF NOT EXISTS public.photo_likes (
    photo_id TEXT    PRIMARY KEY,
    likes    INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.photo_likes ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including unauthenticated/anonymous) to read and update likes.
CREATE POLICY public_select ON public.photo_likes FOR SELECT USING (true);
CREATE POLICY public_insert ON public.photo_likes FOR INSERT WITH CHECK (true);
CREATE POLICY public_update ON public.photo_likes FOR UPDATE USING (true) WITH CHECK (true);
