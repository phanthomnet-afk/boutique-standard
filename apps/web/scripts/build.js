#!/usr/bin/env node
// Build entry point for Vercel.
// On Vercel with the Neon integration, DATABASE_URL is not set explicitly -
// only NEONSTORAGE_* vars are injected. Map them before Prisma runs.
// Locally, these vars are absent, so Prisma reads DATABASE_URL from apps/web/.env as normal.
const { execSync } = require("child_process")

if (process.env.NEONSTORAGE_POSTGRES_PRISMA_URL && !process.env.DATABASE_URL) {
  process.env.DATABASE_URL = process.env.NEONSTORAGE_POSTGRES_PRISMA_URL
}
if (process.env.NEONSTORAGE_POSTGRES_URL_NON_POOLING && !process.env.DIRECT_URL) {
  process.env.DIRECT_URL = process.env.NEONSTORAGE_POSTGRES_URL_NON_POOLING
}

execSync("prisma generate && prisma db push && next build", { stdio: "inherit" })
