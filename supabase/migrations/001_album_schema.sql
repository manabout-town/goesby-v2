create table album_sessions (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  bride_name text not null,
  album_type text not null check (album_type in ('main', 'sub')),
  created_at timestamptz default now()
);

create table album_photos (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references album_sessions(id) on delete cascade,
  url text not null,
  source text not null check (source in ('gallery', 'upload')),
  page_number int,
  order_in_page int,
  created_at timestamptz default now()
);

alter table album_sessions enable row level security;
alter table album_photos enable row level security;

create policy "Anyone can read sessions by code"
  on album_sessions for select
  using (true);

create policy "Anyone can read photos for accessible sessions"
  on album_photos for select
  using (true);

create policy "Anyone can insert photos"
  on album_photos for insert
  with check (true);

create policy "Anyone can update photos"
  on album_photos for update
  using (true);
