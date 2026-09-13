-- ============================================================
-- Amaya & Co. — Wedding Photography Studio
-- Full production schema for Supabase (Postgres)
-- Run this once in the Supabase SQL editor on a fresh project.
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- SINGLETON CONTENT TABLES ----------

create table if not exists site_settings (
  id int primary key default 1,
  site_name text not null default 'Amaya & Co.',
  tagline text not null default 'Wedding Photography Studio',
  phone text not null default '',
  email text not null default '',
  address text not null default '',
  instagram text not null default '',
  facebook text not null default '',
  youtube text not null default '',
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

create table if not exists seo_settings (
  id int primary key default 1,
  title text not null default 'Amaya & Co. — Wedding Photography',
  description text not null default '',
  keywords text not null default '',
  og_image text not null default '',
  updated_at timestamptz not null default now(),
  constraint seo_settings_singleton check (id = 1)
);

create table if not exists homepage_content (
  id int primary key default 1,
  hero_heading text not null default 'Stories of Love, Captured Forever.',
  hero_subheading text not null default '',
  hero_image text not null default '',
  hero_cta_primary text not null default 'View Our Stories',
  hero_cta_secondary text not null default 'Book a Consultation',
  cta_heading text not null default 'Have a date in mind?',
  cta_description text not null default '',
  cta_button_text text not null default 'Start Your Inquiry',
  updated_at timestamptz not null default now(),
  constraint homepage_content_singleton check (id = 1)
);

create table if not exists about_content (
  id int primary key default 1,
  heading text not null default 'A little about us',
  body text not null default '',
  image text not null default '',
  philosophy text not null default '',
  experience_years int not null default 0,
  updated_at timestamptz not null default now(),
  constraint about_content_singleton check (id = 1)
);

-- ---------- REPEATING CONTENT TABLES ----------

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  image text not null default '',
  price text not null default '',
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists portfolio_images (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  category text not null default 'Wedding'
    check (category in ('Wedding','Pre-Wedding','Engagement','Couple Portraits','Haldi','Mehndi','Sangeet','Reception')),
  caption text not null default '',
  alt_text text not null default '',
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists wedding_stories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  couple_name text not null,
  wedding_date date,
  location text not null default '',
  cover_image text not null default '',
  description text not null default '',
  gallery text[] not null default '{}',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image text not null default '',
  review text not null default '',
  rating int not null default 5 check (rating between 1 and 5),
  wedding_info text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null default '',
  wedding_date date,
  location text not null default '',
  event_type text not null default 'Wedding',
  guest_count int,
  message text not null default '',
  status text not null default 'New'
    check (status in ('New','Contacted','Follow-up','Confirmed','Closed')),
  created_at timestamptz not null default now()
);

-- seed the singleton rows so the app always has a row to read/upsert
insert into site_settings (id) values (1) on conflict (id) do nothing;
insert into seo_settings (id) values (1) on conflict (id) do nothing;
insert into homepage_content (id) values (1) on conflict (id) do nothing;
insert into about_content (id) values (1) on conflict (id) do nothing;

-- ---------- updated_at triggers ----------
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$
declare t text;
begin
  foreach t in array array['site_settings','seo_settings','homepage_content','about_content','services','wedding_stories']
  loop
    execute format('drop trigger if exists trg_set_updated_at on %I;', t);
    execute format('create trigger trg_set_updated_at before update on %I for each row execute function set_updated_at();', t);
  end loop;
end $$;

-- ============================================================
-- ROW LEVEL SECURITY
-- Public (anon) can read all content tables and insert inquiries.
-- Only authenticated users (the studio admin) can write content
-- and read/update inquiries. This app has a single admin account;
-- for multiple admin users, layer a `profiles`/role table on top.
-- ============================================================

alter table site_settings enable row level security;
alter table seo_settings enable row level security;
alter table homepage_content enable row level security;
alter table about_content enable row level security;
alter table services enable row level security;
alter table portfolio_images enable row level security;
alter table wedding_stories enable row level security;
alter table testimonials enable row level security;
alter table inquiries enable row level security;

-- Public read policies
create policy "public read site_settings" on site_settings for select using (true);
create policy "public read seo_settings" on seo_settings for select using (true);
create policy "public read homepage_content" on homepage_content for select using (true);
create policy "public read about_content" on about_content for select using (true);
create policy "public read services" on services for select using (true);
create policy "public read portfolio_images" on portfolio_images for select using (true);
create policy "public read wedding_stories" on wedding_stories for select using (true);
create policy "public read testimonials" on testimonials for select using (true);

-- Authenticated write policies (content tables)
create policy "auth write site_settings" on site_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write seo_settings" on seo_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write homepage_content" on homepage_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write about_content" on about_content for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write services" on services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write portfolio_images" on portfolio_images for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write wedding_stories" on wedding_stories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write testimonials" on testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Inquiries: anyone can submit; only authenticated (admin) can read/manage
create policy "public insert inquiries" on inquiries for insert with check (true);
create policy "auth read inquiries" on inquiries for select using (auth.role() = 'authenticated');
create policy "auth update inquiries" on inquiries for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth delete inquiries" on inquiries for delete using (auth.role() = 'authenticated');

create index if not exists idx_portfolio_category on portfolio_images (category);
create index if not exists idx_stories_slug on wedding_stories (slug);
create index if not exists idx_inquiries_status on inquiries (status);
