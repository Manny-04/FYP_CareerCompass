-- ============================================================
-- CareerCompass — Supabase SQL Editor Setup
-- Run this in Supabase SQL Editor after running `npx prisma db push`
-- ============================================================

-- 1. Auto-create user in public.users when someone signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, created_at, updated_at)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    now(),
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Drop trigger if it already exists, then recreate
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. Enable Row Level Security on all public tables
alter table public.users enable row level security;
alter table public.quiz_sessions enable row level security;
alter table public.quiz_answers enable row level security;
alter table public.career_recommendations enable row level security;
alter table public.roadmaps enable row level security;
alter table public.roadmap_phases enable row level security;


-- 3. RLS Policies

-- users: users can only read/update their own row
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);


-- quiz_sessions: users can only see their own sessions
create policy "Users can view own quiz sessions"
  on public.quiz_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert own quiz sessions"
  on public.quiz_sessions for insert
  with check (auth.uid() = user_id);


-- quiz_answers: accessible via parent session ownership
create policy "Users can view own quiz answers"
  on public.quiz_answers for select
  using (
    exists (
      select 1 from public.quiz_sessions
      where quiz_sessions.id = quiz_answers.session_id
      and quiz_sessions.user_id = auth.uid()
    )
  );

create policy "Users can insert own quiz answers"
  on public.quiz_answers for insert
  with check (
    exists (
      select 1 from public.quiz_sessions
      where quiz_sessions.id = quiz_answers.session_id
      and quiz_sessions.user_id = auth.uid()
    )
  );


-- career_recommendations: accessible via parent session ownership
create policy "Users can view own career recommendations"
  on public.career_recommendations for select
  using (
    exists (
      select 1 from public.quiz_sessions
      where quiz_sessions.id = career_recommendations.session_id
      and quiz_sessions.user_id = auth.uid()
    )
  );

create policy "Users can insert own career recommendations"
  on public.career_recommendations for insert
  with check (
    exists (
      select 1 from public.quiz_sessions
      where quiz_sessions.id = career_recommendations.session_id
      and quiz_sessions.user_id = auth.uid()
    )
  );


-- roadmaps: users can only see/modify their own roadmaps
create policy "Users can view own roadmaps"
  on public.roadmaps for select
  using (auth.uid() = user_id);

create policy "Users can insert own roadmaps"
  on public.roadmaps for insert
  with check (auth.uid() = user_id);

create policy "Users can update own roadmaps"
  on public.roadmaps for update
  using (auth.uid() = user_id);


-- roadmap_phases: accessible via parent roadmap ownership
create policy "Users can view own roadmap phases"
  on public.roadmap_phases for select
  using (
    exists (
      select 1 from public.roadmaps
      where roadmaps.id = roadmap_phases.roadmap_id
      and roadmaps.user_id = auth.uid()
    )
  );

create policy "Users can insert own roadmap phases"
  on public.roadmap_phases for insert
  with check (
    exists (
      select 1 from public.roadmaps
      where roadmaps.id = roadmap_phases.roadmap_id
      and roadmaps.user_id = auth.uid()
    )
  );
