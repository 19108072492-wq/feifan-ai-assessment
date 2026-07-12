create table public.assessment_sessions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^[A-Z0-9]{6}$'),
  title text not null check (char_length(title) between 1 and 60),
  cohort text not null default '' check (char_length(cohort) <= 60),
  status text not null default 'open' check (status in ('open', 'closed')),
  assessment_version text not null default 'assessment-v1',
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create table public.assessment_submissions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.assessment_sessions(id) on delete cascade,
  report_token text not null unique,
  participant_name text not null check (char_length(participant_name) between 1 and 30),
  participant_role text not null check (char_length(participant_role) between 1 and 30),
  answers jsonb not null,
  open_prompt text not null check (char_length(open_prompt) between 30 and 2000),
  idempotency_key text not null check (char_length(idempotency_key) between 3 and 100),
  choice_score integer,
  open_score integer,
  total_score integer,
  level_code text,
  level_name text,
  style_code text,
  style_name text,
  dimension_scores jsonb,
  style_data jsonb,
  ai_status text not null default 'pending' check (ai_status in ('pending', 'processing', 'complete', 'failed')),
  ai_analysis jsonb,
  ai_error text,
  ai_attempts integer not null default 0,
  submitted_at timestamptz not null default now(),
  unique (session_id, idempotency_key)
);

create table public.assessment_login_attempts (
  ip_hash text primary key,
  window_started_at timestamptz not null default now(),
  attempts integer not null default 0 check (attempts >= 0),
  blocked_until timestamptz
);

create index assessment_submissions_session_time_idx
  on public.assessment_submissions(session_id, submitted_at);
create index assessment_submissions_report_token_idx
  on public.assessment_submissions(report_token);
create index assessment_sessions_status_idx
  on public.assessment_sessions(status, created_at desc);

alter table public.assessment_sessions enable row level security;
alter table public.assessment_submissions enable row level security;
alter table public.assessment_login_attempts enable row level security;

revoke all on table public.assessment_sessions from anon, authenticated;
revoke all on table public.assessment_submissions from anon, authenticated;
revoke all on table public.assessment_login_attempts from anon, authenticated;
