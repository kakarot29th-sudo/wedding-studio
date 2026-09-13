# Amaya & Co. — Wedding Photography Website + Admin CMS

Production Next.js (App Router) + Supabase build. Same design, pages, database
structure, and admin functionality as the original single-file prototype —
now backed by a real Postgres database, real authentication, and real image
storage, with admin edits reflecting on the live site immediately (no rebuild).

## Stack
- Next.js 14 (App Router, Server Components, Server Actions), TypeScript, Tailwind CSS
- Supabase: Postgres + Row Level Security, Auth, Storage
- Fonts: Fraunces (serif) + Inter (sans), via `next/font/google`

## 1. Create the Supabase project
1. Create a new project at supabase.com.
2. In the SQL Editor, run `supabase/schema.sql`, then `supabase/storage.sql`.
3. In Authentication → Users, create your admin account (email + password) —
   this is the only login the site needs; every authenticated user can manage
   content, per the RLS policies in `schema.sql`.

## 2. Configure environment variables
```
cp .env.local.example .env.local
```
Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from
Project Settings → API. Add `SUPABASE_SERVICE_ROLE_KEY` (also from Project
Settings → API) only if you plan to run the demo seed script — never expose
this key to the browser or commit it.

## 3. Install and run
```
npm install
npm run seed     # optional: populates realistic demo content
npm run dev
```
Visit http://localhost:3000 for the public site and
http://localhost:3000/admin/login to sign in with the Supabase user you created.

## 4. Deploy
Deploy to Vercel (or any Node host). Set the same environment variables in
your hosting provider's dashboard, plus `NEXT_PUBLIC_SITE_URL` for the
sitemap/robots routes to point at your real domain.

## Project structure
```
app/(site)/                Public pages — Server Components, revalidate = 0
app/admin/login/            Public login page — deliberately OUTSIDE the
                             (protected) route group below
app/admin/actions.ts        Shared login/logout Server Actions
app/admin/(protected)/      Every other admin route (dashboard, content,
                             services, portfolio, stories, testimonials,
                             inquiries, settings). layout.tsx here does the
                             server-side auth check + renders the Sidebar.
                             The (protected) segment is a route group, so it
                             adds no path: app/admin/(protected)/services
                             still serves /admin/services.
components/site/     Nav, Footer, Lightbox, PortfolioGrid, StoryGallery, ContactForm
components/admin/    Sidebar, ImageUploader, EntityForm/ActionForm, DeleteButton
lib/supabase/        Browser client, server client, session middleware helper
supabase/schema.sql  Full Postgres schema + RLS policies
supabase/storage.sql Public "media" storage bucket + policies
scripts/seed.ts      Realistic demo content (services, portfolio, stories, testimonials)
```

### Why login is a route group, not just a plain page
`app/admin/layout.tsx` used to wrap *every* route under `/admin`, including
`/admin/login` itself. Since that layout redirects unauthenticated visitors
to `/admin/login`, visiting the login page re-triggered the same redirect
forever (`ERR_TOO_MANY_REDIRECTS`). Moving the authenticated layout into
`app/admin/(protected)/layout.tsx` means it only wraps routes inside that
group — `/admin/login` now renders with just the root layout and is never
redirect-checked. `middleware.ts` already special-cased `/admin/login`
correctly; the loop was purely from the nested layout, not the middleware.

Sign-in flow: middleware appends `?redirectTo=<original path>` when it
bounces an unauthenticated request to `/admin/login`; the login page reads
that and submits it with the form; the `login` Server Action redirects there
(falling back to `/admin`, and refusing anything that isn't a same-app
`/admin...` path, as a basic open-redirect guard).

## How admin edits reach the public site
Every public page is a Server Component with `export const revalidate = 0`,
so it always reads fresh data straight from Supabase on each request. Every
admin write goes through a Server Action that also calls `revalidatePath()`
for the relevant public route, so caches never go stale — an admin saving the
homepage hero or adding a portfolio image is reflected on the live site the
moment the request completes.

## Security notes
- `/admin/*` (except `/admin/login`) is protected in two layers:
  `middleware.ts` redirects unauthenticated requests, and
  `app/admin/(protected)/layout.tsx` re-checks the session server-side
  (never trust client-side checks alone). `/admin/login` sits outside the
  `(protected)` route group so it stays reachable regardless of auth state.
- RLS policies in `schema.sql` are the real authorization boundary: public
  (anon) can only `select` from content tables and `insert` into `inquiries`;
  all writes require an authenticated Supabase session.
- Image uploads go straight from the browser to a public Supabase Storage
  bucket using the admin's authenticated session — validated server-side by
  the storage RLS policies in `storage.sql`, not by client-side trust.
- This app assumes a single studio/admin. For multiple staff accounts with
  different permissions, add a `profiles` table with a `role` column and
  extend the RLS policies to check it.

## What's not included
- Automated tests
- CI/CD pipeline config
- A visual page for changing image display order via drag-and-drop (currently
  a numeric "Display order" field) — swap in a drag-and-drop list component
  if you want that specific interaction.
