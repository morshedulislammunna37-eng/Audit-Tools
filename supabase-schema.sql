create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  username text unique,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  address text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  company_id uuid references public.companies(id) on delete set null,
  template_id text not null,
  title text not null,
  data jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft','generated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.documents enable row level security;

create policy "Users manage their profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users manage their companies" on public.companies
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users manage their documents" on public.documents
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, username, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    lower(nullif(trim(new.raw_user_meta_data->>'username'), '')),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    username = coalesce(excluded.username, public.profiles.username),
    avatar_url = excluded.avatar_url;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles add column if not exists username text;
create unique index if not exists profiles_username_unique on public.profiles (lower(username));

create or replace function public.get_login_email(lookup_username text)
returns text
language sql
security definer
set search_path = public
as $$
  select u.email
  from public.profiles p
  join auth.users u on u.id = p.id
  where lower(p.username) = lower(trim(lookup_username))
  limit 1;
$$;

revoke all on function public.get_login_email(text) from public;
grant execute on function public.get_login_email(text) to anon, authenticated;
