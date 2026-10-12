-- =====================================================================
-- Portfolio — schéma Supabase
-- À exécuter une fois dans Supabase > SQL Editor (projet "Portfolio").
-- Ré-exécutable : les objets existants sont conservés.
-- =====================================================================

-- ---------- Tables ----------
create table if not exists public.periods (
    id          integer primary key,
    title       text not null,
    subtitle    text,
    description text,
    summary     text,
    start_month date not null,              -- 1er jour du mois de début
    end_month   date not null,              -- 1er jour du mois de fin
    highlights  text[] not null default '{}',
    created_at  timestamptz not null default now(),
    check (end_month > start_month)
);

create table if not exists public.categories (
    id        text primary key,             -- 'dev', 'visual', ...
    title     text not null,
    short     text not null,
    icon      text,                          -- nom d'icône lucide : 'Code', 'Palette'...
    color     text,
    position  integer not null default 0
);

create table if not exists public.projects (
    id          text primary key,           -- slug : 'memorial-website'
    category_id text not null references public.categories(id) on update cascade,
    title       text not null,
    tag         text,
    link        text,
    featured    boolean not null default false,
    position    integer not null default 0,  -- ordre (plus grand = plus récent)
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

create table if not exists public.phases (
    id          bigint generated always as identity primary key,
    project_id  text not null references public.projects(id) on delete cascade on update cascade,
    period_id   integer not null references public.periods(id) on delete restrict,
    dates       text,
    description text not null default '',
    metrics     text,
    tech        text[] not null default '{}',
    unique (project_id, period_id)
);

create table if not exists public.project_images (
    id          bigint generated always as identity primary key,
    project_id  text not null references public.projects(id) on delete cascade on update cascade,
    path        text not null,               -- chemin dans le bucket "portfolio"
    full_path   text,                        -- version grand format facultative
    description text,
    category    text,
    position    integer not null default 0
);

create index if not exists phases_project_idx on public.phases(project_id);
create index if not exists phases_period_idx  on public.phases(period_id);
create index if not exists images_project_idx on public.project_images(project_id, position);

-- updated_at automatique
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists projects_touch on public.projects;
create trigger projects_touch before update on public.projects
    for each row execute function public.touch_updated_at();

-- ---------- Administrateurs ----------
-- Seuls les comptes listés ici peuvent écrire. Ajoute ton user_id après avoir créé ton compte.
create table if not exists public.admins (
    user_id uuid primary key references auth.users(id) on delete cascade
);

create or replace function public.is_admin() returns boolean
    language sql stable security definer set search_path = public as $$
    select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------- Sécurité (RLS) : lecture publique, écriture admin ----------
do $$
declare t text;
begin
    foreach t in array array['periods','categories','projects','phases','project_images'] loop
        execute format('alter table public.%I enable row level security', t);
        execute format('drop policy if exists "public read" on public.%I', t);
        execute format('create policy "public read" on public.%I for select using (true)', t);
        execute format('drop policy if exists "admin write" on public.%I', t);
        execute format('create policy "admin write" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
    end loop;
end $$;

alter table public.admins enable row level security;
drop policy if exists "self read" on public.admins;
create policy "self read" on public.admins for select to authenticated using (user_id = auth.uid());

-- ---------- Stockage des images ----------
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;

drop policy if exists "portfolio public read" on storage.objects;
create policy "portfolio public read" on storage.objects
    for select using (bucket_id = 'portfolio');

drop policy if exists "portfolio admin write" on storage.objects;
create policy "portfolio admin write" on storage.objects
    for all to authenticated
    using (bucket_id = 'portfolio' and public.is_admin())
    with check (bucket_id = 'portfolio' and public.is_admin());
