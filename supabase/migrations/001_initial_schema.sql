-- Posts (blog); slug for URL-friendly routes
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null,
  image_url text,
  created_at timestamptz not null default now()
);

-- Destinations
create table public.destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text,
  description text,
  image_url text,
  created_at timestamptz not null default now()
);

-- Products (affiliate gear)
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  affiliate_link text,
  image_url text,
  category text,
  created_at timestamptz not null default now()
);

-- Indexes for common queries
create index posts_created_at_idx on public.posts (created_at desc);
create index posts_slug_idx on public.posts (slug);
create index products_created_at_idx on public.products (created_at desc);

-- RLS
alter table public.posts enable row level security;
alter table public.destinations enable row level security;
alter table public.products enable row level security;

-- Public read
create policy "Posts are viewable by everyone"
  on public.posts for select using (true);

create policy "Destinations are viewable by everyone"
  on public.destinations for select using (true);

create policy "Products are viewable by everyone"
  on public.products for select using (true);

-- Authenticated insert/update/delete (admin)
create policy "Authenticated can manage posts"
  on public.posts for all using (auth.role() = 'authenticated');

create policy "Authenticated can manage destinations"
  on public.destinations for all using (auth.role() = 'authenticated');

create policy "Authenticated can manage products"
  on public.products for all using (auth.role() = 'authenticated');
