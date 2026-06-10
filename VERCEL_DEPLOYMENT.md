# Vercel Deployment Guide

## Vercel Project Settings

In the Vercel dashboard for this project:

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Root Directory | `apps/web` |
| Build Command | `prisma generate && next build` |
| Install Command | `npm install` |
| Output Directory | (leave default) |
| Node.js Version | 20.x |

## Database Setup (Required Before First Deploy)

1. Vercel dashboard - Storage - Create Database - Postgres (powered by Neon)
2. Connect it to your project
3. Vercel auto-injects `DATABASE_URL` and `DIRECT_URL` into all environments

After connecting, run the initial migration from your local machine:

```bash
vercel env pull .env.production.local
npx prisma migrate deploy
```

Or use Vercel CLI to run it after deploy:

```bash
vercel run npx prisma migrate deploy
```

## Required Environment Variables

Set all of these in Vercel dashboard: Settings - Environment Variables - Production + Preview

### Required (app will not work without these)

| Variable | Value |
|----------|-------|
| `ADMIN_PASSWORD` | Your chosen admin password |
| `DATABASE_URL` | Auto-injected by Vercel Postgres |
| `DIRECT_URL` | Auto-injected by Vercel Postgres |
| `NEXT_PUBLIC_SITE_URL` | `https://boutiquestandard.com` |

### Required for outreach (add when ready to use)

| Variable | Value |
|----------|-------|
| `OPENAI_API_KEY` | platform.openai.com/api-keys |
| `ANTHROPIC_API_KEY` | console.anthropic.com/keys |
| `RESEND_API_KEY` | resend.com/api-keys |
| `OUTREACH_FROM_EMAIL` | `hello@boutiquestandard.com` |
| `OUTREACH_FROM_NAME` | `The Boutique Standard` |
| `SEND_EMAILS_ENABLED` | `false` until ready to send |

### Required for prospecting (add when ready to use)

| Variable | Value |
|----------|-------|
| `DATAFORSEO_LOGIN` | Your DataForSEO email |
| `DATAFORSEO_PASSWORD` | Your DataForSEO password |
| `SCRAPEGRAPH_API_KEY` | scrapegraphai.com/dashboard |
| `GOOGLE_PLACES_API_KEY` | console.cloud.google.com |

NEO API keys are managed in /admin/settings UI - not as environment variables.

## Local Development with PostgreSQL

The schema requires PostgreSQL (SQLite is not supported on Vercel).

Start a local Postgres instance via Docker:

```bash
docker run --name tbs-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=boutique_standard \
  -p 5432:5432 -d postgres
```

Then push the schema:

```bash
cd apps/web
npx prisma db push
npm run seed:report
```

Local `.env.local` should contain:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/boutique_standard"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/boutique_standard"
ADMIN_PASSWORD=changeme
```

## After Each Schema Change

- Local: `npx prisma db push`
- Production: `npx prisma migrate deploy` (via Vercel CLI)

## Minimum to Deploy

The following must be set for the build to succeed and basic admin access to work:

1. `ADMIN_PASSWORD`
2. `DATABASE_URL` (from Vercel Postgres)
3. `DIRECT_URL` (from Vercel Postgres)

All other variables can be added after the initial deploy. Missing API keys throw errors only when their features are actually used - not at build time.

---

## Post-Deploy Testing Sequence

Test in this order after each deploy. Document any failures with step number and error.

1. **Homepage** - visit boutiquestandard.com - page loads, no console errors
2. **Admin login** - visit boutiquestandard.com/admin/login - enter `ADMIN_PASSWORD` - redirects to /admin/hotels
3. **System health** - admin Settings - click "Run health check" - database should show green, configured APIs green, dataforseo grey (skipped)
4. **Test email** - admin Settings - send test email to casper@boutiquestandard.com - check inbox
5. **Audit request form** - visit boutiquestandard.com/request - fill in form and submit - check leads@boutiquestandard.com for notification
6. **Hotel analysis** - admin Hotels - add hotel manually (Name: Test Hotel Copenhagen, Website: https://cphhospitality.dk, Location: Copenhagen DK) - click Analyse - wait for intelligence to populate
7. **Outreach generation** - from hotel detail, generate Touch 1 outreach - email and LinkedIn drafts should appear
8. **Client report** - visit boutiquestandard.com/client/ad7555f70c08bd269ddfa81d085981ca/report - password: rivage2027 - all 13 sections render - keyboard navigation works
9. **Journal** - visit boutiquestandard.com/journal - 3 articles visible and clickable
10. **Public pages** - visit /audit, /about, /report - all load correctly
