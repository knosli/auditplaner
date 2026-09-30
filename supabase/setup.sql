-- ═══════════════════════════════════════════════════════════════════════════
-- Anliker Audit Planer – Einrichtung Datenbank (Supabase)
-- Im Supabase-Dashboard unter «SQL Editor» einfügen und «Run» klicken.
-- Das Skript kann gefahrlos mehrmals ausgeführt werden. Bestehende Daten bleiben unverändert.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1) Admins: Liste in der Datenbank (statt nur im App-Code)
create table if not exists public.app_admins (
  email text primary key
);
alter table public.app_admins enable row level security;
-- Keine Policies: die Liste ist nur hier im SQL Editor änderbar.
insert into public.app_admins (email) values ('matthias.knotz@anliker.ch')
  on conflict do nothing;

create or replace function public.is_app_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.app_admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_app_admin() from public, anon;
grant execute on function public.is_app_admin() to authenticated;

-- 2) Wer hat zuletzt gespeichert (für den Hinweis «X hat soeben … geändert»)
alter table public.audit_state add column if not exists updated_by text;

-- 3) Verlauf: automatische Sicherung früherer Stände
--    Vor einer Änderung wird der bisherige Stand gespeichert, höchstens einmal pro Stunde,
--    und zusätzlich immer vor grösseren Löschungen. Stände älter als 30 Tage werden entfernt.
create table if not exists public.audit_state_history (
  hid bigint generated always as identity primary key,
  changed_at timestamptz not null default now(),
  changed_by text,
  snapshot jsonb not null
);
create index if not exists audit_state_history_changed_at
  on public.audit_state_history (changed_at desc);
alter table public.audit_state_history enable row level security;
drop policy if exists "Admins can read history" on public.audit_state_history;
create policy "Admins can read history" on public.audit_state_history
  for select to authenticated using (public.is_app_admin());

create or replace function public.audit_state_keep_history() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  last_at timestamptz;
begin
  select max(changed_at) into last_at from public.audit_state_history;
  if tg_op = 'DELETE'
     or last_at is null
     or last_at < now() - interval '1 hour'
     or length(new::text) < length(old::text) * 0.9 then
    insert into public.audit_state_history (changed_by, snapshot)
    values (coalesce(auth.jwt() ->> 'email', 'System'), to_jsonb(old));
  end if;
  delete from public.audit_state_history where changed_at < now() - interval '30 days';
  if tg_op = 'DELETE' then return old; end if;
  return new;
end;
$$;
drop trigger if exists audit_state_history_trg on public.audit_state;
create trigger audit_state_history_trg
  before update or delete on public.audit_state
  for each row execute function public.audit_state_keep_history();

-- 4) Änderungsprotokoll: wer hat wann was geändert (nur für Admins lesbar)
create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  ts timestamptz not null default now(),
  user_email text default (auth.jwt() ->> 'email'),
  user_name text,
  summary text not null
);
create index if not exists audit_log_ts on public.audit_log (ts desc);
alter table public.audit_log enable row level security;
drop policy if exists "Authenticated users can write log" on public.audit_log;
create policy "Authenticated users can write log" on public.audit_log
  for insert to authenticated with check (user_email = auth.jwt() ->> 'email');
drop policy if exists "Admins can read log" on public.audit_log;
create policy "Admins can read log" on public.audit_log
  for select to authenticated using (public.is_app_admin());

-- 5) Kontrolle: sollte je eine Zeile pro Tabelle mit rls_enabled = true zeigen
select relname as tabelle, relrowsecurity as rls_enabled
from pg_class
where relnamespace = 'public'::regnamespace
  and relname in ('audit_state', 'presence', 'app_admins', 'audit_state_history', 'audit_log')
order by relname;
