# Environment Variables - The Boutique Standard

## Overview

All application environment variables live in `apps/web/.env.example`.
Copy it to `apps/web/.env.local` for local development - that file is gitignored and must never be committed.

Root `.env.example` exists as a placeholder; no root-level variables are currently required.

---

## Variable Reference

### Site

| Variable | Required | Visibility | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Public | Full URL of the deployed site. No trailing slash. |

**Local:** `http://localhost:3000`
**Production:** `https://theboutiquestandard.com`

---

### Sanity CMS (future)

| Variable | Required | Visibility | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | When Sanity is active | Public | Project ID from sanity.io |
| `NEXT_PUBLIC_SANITY_DATASET` | When Sanity is active | Public | Usually `production` |
| `SANITY_API_TOKEN` | When Sanity is active | **Server only** | Read/write token - never expose to browser |
| `SANITY_WEBHOOK_SECRET` | When Sanity is active | **Server only** | Validates revalidation webhook requests |

Find `NEXT_PUBLIC_SANITY_PROJECT_ID` at: sanity.io → your project → Settings → API.

Generate `SANITY_API_TOKEN` at: sanity.io → your project → Settings → API → Tokens → Add API token (Editor or Viewer permissions).

---

### Form Submission (future)

| Variable | Required | Visibility | Description |
|---|---|---|---|
| `RESEND_API_KEY` | When form is live | **Server only** | Resend.com API key for email delivery |
| `FORM_TO_EMAIL` | When form is live | **Server only** | Recipient address for audit enquiry submissions |

---

### Client Report Access (future)

| Variable | Required | Visibility | Description |
|---|---|---|---|
| `CLIENT_TOKEN_SECRET` | When client routes are live | **Server only** | Signs and verifies `/client/[token]/report` access tokens |

Generate a secure value:
```bash
openssl rand -hex 32
```

---

## Local Development Setup

```bash
cp apps/web/.env.example apps/web/.env.local
# Then fill in any variables you need for your local work
```

Only `NEXT_PUBLIC_SITE_URL` is needed to run the site locally. All Sanity, form, and client token variables are optional until those features are built.

---

## Vercel Configuration

### Adding variables in the Vercel dashboard

1. Open the project at vercel.com → your project → Settings → Environment Variables
2. Add each variable from `apps/web/.env.example` that has a non-empty value
3. Set the correct environment scope (see below)
4. **Redeploy after adding or changing any variable** - Vercel does not hot-reload env changes

### Environment scopes

| Scope | When to use |
|---|---|
| Production | Live site only (`theboutiquestandard.com`) |
| Preview | Branch and PR preview deploys |
| Development | Pulled via `vercel env pull` for local dev |

Recommended pattern: set `NEXT_PUBLIC_SITE_URL` to the preview URL pattern in Preview scope, and to the canonical URL in Production scope. All secret keys (Sanity, Resend, client token) should be Production + Preview, NOT Development (use `.env.local` locally instead).

### Monorepo root directory setting

Because this is an npm workspaces monorepo, Vercel must be pointed at the app subdirectory:

- **Root Directory:** `apps/web`
- **Build Command:** `next build` (Vercel default for Next.js)
- **Output Directory:** `.next` (Vercel default)

This is already correct if the Vercel project was created by importing `apps/web` directly.

### Preview vs Production differences

| Variable | Development | Preview | Production |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Preview deploy URL | `https://theboutiquestandard.com` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` or `staging` | `production` | `production` |
| All secrets | via `.env.local` | Vercel dashboard | Vercel dashboard |

---

## Security Rules

1. **Never commit `.env.local` or any file containing real values.** The root `.gitignore` excludes all `.env*` files except `.env.example`.
2. **`NEXT_PUBLIC_` variables are bundled into the browser.** Never put secrets (API keys, tokens) in a `NEXT_PUBLIC_` variable.
3. **Server-only secrets** (`SANITY_API_TOKEN`, `RESEND_API_KEY`, `CLIENT_TOKEN_SECRET`, `SANITY_WEBHOOK_SECRET`) must only be read in Server Components, API route handlers, or server actions - never in Client Components.
4. **Rotate any secret that is accidentally committed immediately.** Treat a committed secret as compromised regardless of whether the commit was pushed.

---

## Current Status

The site is currently fully static - no external APIs are connected. The only required variable for a working local or production build is `NEXT_PUBLIC_SITE_URL`.

All other variables are documented here for when features are built:
- Sanity CMS: needed before any content becomes CMS-managed
- Form email: needed before the enquiry form goes live
- Client token: needed before the `/client/[token]/report` route goes live
