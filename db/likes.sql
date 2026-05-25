-- Photography "likes" schema for the Neon Data API.
-- Run this once in the Neon SQL Editor (or psql) against your project's database.
--
-- Security model: the public site sends requests with no Authorization header,
-- which the Data API maps to the `anonymous` role. That role can only:
--   * SELECT like counts
--   * call increment_like / decrement_like (which adjust a single counter by 1)
-- It cannot INSERT, UPDATE or DELETE rows directly. The counter mutations run
-- through SECURITY DEFINER functions owned by a privileged role.

create table if not exists public.photo_likes (
    photo_id text primary key,
    likes    integer not null default 0
);

-- Atomically add a like (creating the row on first like). Returns the new count.
create or replace function public.increment_like(pid text)
returns integer
language sql
security definer
set search_path = public
as $$
    insert into public.photo_likes (photo_id, likes)
    values (pid, 1)
    on conflict (photo_id)
    do update set likes = public.photo_likes.likes + 1
    returning likes;
$$;

-- Atomically remove a like, never going below zero. Returns the new count.
create or replace function public.decrement_like(pid text)
returns integer
language sql
security definer
set search_path = public
as $$
    update public.photo_likes
    set likes = greatest(likes - 1, 0)
    where photo_id = pid
    returning likes;
$$;

-- Grant the anonymous (unauthenticated) role exactly what the site needs.
grant usage on schema public to anonymous;
grant select on public.photo_likes to anonymous;
grant execute on function public.increment_like(text) to anonymous;
grant execute on function public.decrement_like(text) to anonymous;
