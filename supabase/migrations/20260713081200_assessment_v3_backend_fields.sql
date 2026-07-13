alter table public.assessment_submissions
  add column if not exists role_key text not null default 'general',
  add column if not exists raw_total_score integer,
  add column if not exists project_bonus integer not null default 0,
  add column if not exists project_upgrade jsonb,
  add column if not exists section_scores jsonb,
  add column if not exists ai_engine text;

alter table public.assessment_sessions
  alter column assessment_version set default 'assessment-v3';
