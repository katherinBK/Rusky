-- Create profiles table for user data
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  current_streak int default 0,
  longest_streak int default 0,
  total_xp int default 0,
  level int default 1,
  last_activity_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = id);

-- Create conversation_sessions table to store chat history
create table if not exists public.conversation_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  mode text not null check (mode in ('teaching', 'conversation')),
  title text,
  messages jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.conversation_sessions enable row level security;

create policy "sessions_select_own" on public.conversation_sessions for select using (auth.uid() = user_id);
create policy "sessions_insert_own" on public.conversation_sessions for insert with check (auth.uid() = user_id);
create policy "sessions_update_own" on public.conversation_sessions for update using (auth.uid() = user_id);
create policy "sessions_delete_own" on public.conversation_sessions for delete using (auth.uid() = user_id);

-- Create grammar_progress table to track grammar lesson completion
create table if not exists public.grammar_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id text not null,
  completed boolean default false,
  score int default 0,
  attempts int default 0,
  last_attempt_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, topic_id)
);

alter table public.grammar_progress enable row level security;

create policy "grammar_select_own" on public.grammar_progress for select using (auth.uid() = user_id);
create policy "grammar_insert_own" on public.grammar_progress for insert with check (auth.uid() = user_id);
create policy "grammar_update_own" on public.grammar_progress for update using (auth.uid() = user_id);
create policy "grammar_delete_own" on public.grammar_progress for delete using (auth.uid() = user_id);

-- Create story_progress table to track story reading progress
create table if not exists public.story_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  story_id text not null,
  completed boolean default false,
  quiz_score int default 0,
  read_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, story_id)
);

alter table public.story_progress enable row level security;

create policy "story_select_own" on public.story_progress for select using (auth.uid() = user_id);
create policy "story_insert_own" on public.story_progress for insert with check (auth.uid() = user_id);
create policy "story_update_own" on public.story_progress for update using (auth.uid() = user_id);
create policy "story_delete_own" on public.story_progress for delete using (auth.uid() = user_id);

-- Create achievements table
create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  achievement_id text not null,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, achievement_id)
);

alter table public.achievements enable row level security;

create policy "achievements_select_own" on public.achievements for select using (auth.uid() = user_id);
create policy "achievements_insert_own" on public.achievements for insert with check (auth.uid() = user_id);
