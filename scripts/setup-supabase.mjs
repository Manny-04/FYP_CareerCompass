/**
 * CareerCompass — Supabase DB Setup Script
 * Runs the auth trigger + RLS policies via direct PostgreSQL connection.
 *
 * Usage:
 *   node --env-file=.env.local scripts/setup-supabase.mjs
 */

import pg from 'pg'

const { Client } = pg

const DIRECT_URL = process.env.DIRECT_URL

if (!DIRECT_URL) {
  console.error('ERROR: DIRECT_URL is not set in .env.local')
  process.exit(1)
}

const client = new Client({ connectionString: DIRECT_URL })

const steps = [
  {
    name: 'Create handle_new_user() function',
    sql: `
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
    `,
  },
  {
    name: 'Drop old trigger if exists',
    sql: `drop trigger if exists on_auth_user_created on auth.users;`,
  },
  {
    name: 'Create on_auth_user_created trigger',
    sql: `
      create trigger on_auth_user_created
        after insert on auth.users
        for each row execute procedure public.handle_new_user();
    `,
  },
  {
    name: 'Enable RLS on users',
    sql: `alter table public.users enable row level security;`,
  },
  {
    name: 'Enable RLS on quiz_sessions',
    sql: `alter table public.quiz_sessions enable row level security;`,
  },
  {
    name: 'Enable RLS on quiz_answers',
    sql: `alter table public.quiz_answers enable row level security;`,
  },
  {
    name: 'Enable RLS on career_recommendations',
    sql: `alter table public.career_recommendations enable row level security;`,
  },
  {
    name: 'Enable RLS on roadmaps',
    sql: `alter table public.roadmaps enable row level security;`,
  },
  {
    name: 'Enable RLS on roadmap_phases',
    sql: `alter table public.roadmap_phases enable row level security;`,
  },
  {
    name: 'Drop existing policies (idempotent re-run)',
    sql: `
      drop policy if exists "Users can view own profile" on public.users;
      drop policy if exists "Users can update own profile" on public.users;
      drop policy if exists "Users can view own quiz sessions" on public.quiz_sessions;
      drop policy if exists "Users can insert own quiz sessions" on public.quiz_sessions;
      drop policy if exists "Users can view own quiz answers" on public.quiz_answers;
      drop policy if exists "Users can insert own quiz answers" on public.quiz_answers;
      drop policy if exists "Users can view own career recommendations" on public.career_recommendations;
      drop policy if exists "Users can insert own career recommendations" on public.career_recommendations;
      drop policy if exists "Users can view own roadmaps" on public.roadmaps;
      drop policy if exists "Users can insert own roadmaps" on public.roadmaps;
      drop policy if exists "Users can update own roadmaps" on public.roadmaps;
      drop policy if exists "Users can view own roadmap phases" on public.roadmap_phases;
      drop policy if exists "Users can insert own roadmap phases" on public.roadmap_phases;
    `,
  },
  {
    name: 'RLS: users — select',
    sql: `
      create policy "Users can view own profile"
        on public.users for select
        using (auth.uid() = id);
    `,
  },
  {
    name: 'RLS: users — update',
    sql: `
      create policy "Users can update own profile"
        on public.users for update
        using (auth.uid() = id);
    `,
  },
  {
    name: 'RLS: quiz_sessions — select',
    sql: `
      create policy "Users can view own quiz sessions"
        on public.quiz_sessions for select
        using (auth.uid() = user_id);
    `,
  },
  {
    name: 'RLS: quiz_sessions — insert',
    sql: `
      create policy "Users can insert own quiz sessions"
        on public.quiz_sessions for insert
        with check (auth.uid() = user_id);
    `,
  },
  {
    name: 'RLS: quiz_answers — select',
    sql: `
      create policy "Users can view own quiz answers"
        on public.quiz_answers for select
        using (
          exists (
            select 1 from public.quiz_sessions
            where quiz_sessions.id = quiz_answers.session_id
            and quiz_sessions.user_id = auth.uid()
          )
        );
    `,
  },
  {
    name: 'RLS: quiz_answers — insert',
    sql: `
      create policy "Users can insert own quiz answers"
        on public.quiz_answers for insert
        with check (
          exists (
            select 1 from public.quiz_sessions
            where quiz_sessions.id = quiz_answers.session_id
            and quiz_sessions.user_id = auth.uid()
          )
        );
    `,
  },
  {
    name: 'RLS: career_recommendations — select',
    sql: `
      create policy "Users can view own career recommendations"
        on public.career_recommendations for select
        using (
          exists (
            select 1 from public.quiz_sessions
            where quiz_sessions.id = career_recommendations.session_id
            and quiz_sessions.user_id = auth.uid()
          )
        );
    `,
  },
  {
    name: 'RLS: career_recommendations — insert',
    sql: `
      create policy "Users can insert own career recommendations"
        on public.career_recommendations for insert
        with check (
          exists (
            select 1 from public.quiz_sessions
            where quiz_sessions.id = career_recommendations.session_id
            and quiz_sessions.user_id = auth.uid()
          )
        );
    `,
  },
  {
    name: 'RLS: roadmaps — select',
    sql: `
      create policy "Users can view own roadmaps"
        on public.roadmaps for select
        using (auth.uid() = user_id);
    `,
  },
  {
    name: 'RLS: roadmaps — insert',
    sql: `
      create policy "Users can insert own roadmaps"
        on public.roadmaps for insert
        with check (auth.uid() = user_id);
    `,
  },
  {
    name: 'RLS: roadmaps — update',
    sql: `
      create policy "Users can update own roadmaps"
        on public.roadmaps for update
        using (auth.uid() = user_id);
    `,
  },
  {
    name: 'RLS: roadmap_phases — select',
    sql: `
      create policy "Users can view own roadmap phases"
        on public.roadmap_phases for select
        using (
          exists (
            select 1 from public.roadmaps
            where roadmaps.id = roadmap_phases.roadmap_id
            and roadmaps.user_id = auth.uid()
          )
        );
    `,
  },
  {
    name: 'RLS: roadmap_phases — insert',
    sql: `
      create policy "Users can insert own roadmap phases"
        on public.roadmap_phases for insert
        with check (
          exists (
            select 1 from public.roadmaps
            where roadmaps.id = roadmap_phases.roadmap_id
            and roadmaps.user_id = auth.uid()
          )
        );
    `,
  },
]

async function run() {
  console.log('Connecting to Supabase...')
  await client.connect()
  console.log('Connected.\n')

  let passed = 0
  let failed = 0

  for (const step of steps) {
    try {
      await client.query(step.sql)
      console.log(`  [ok] ${step.name}`)
      passed++
    } catch (err) {
      console.error(`  [FAIL] ${step.name}`)
      console.error(`         ${err.message}\n`)
      failed++
    }
  }

  await client.end()

  console.log(`\nDone: ${passed} passed, ${failed} failed.`)

  if (failed > 0) {
    process.exit(1)
  }
}

run().catch(err => {
  console.error('Fatal error:', err.message)
  process.exit(1)
})
