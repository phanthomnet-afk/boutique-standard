#!/usr/bin/env node
// Build entry point. On Vercel, NEONSTORAGE_* vars are always authoritative
// (auto-injected by the Neon integration). Override DATABASE_URL/DIRECT_URL
// unconditionally when present so prisma db push uses the same database
// that the runtime will connect to.
const { execSync } = require("child_process")

if (process.env.NEONSTORAGE_POSTGRES_PRISMA_URL) {
  process.env.DATABASE_URL = process.env.NEONSTORAGE_POSTGRES_PRISMA_URL
  console.log("[build] DATABASE_URL set from NEONSTORAGE_POSTGRES_PRISMA_URL")
}
if (process.env.NEONSTORAGE_POSTGRES_URL_NON_POOLING) {
  process.env.DIRECT_URL = process.env.NEONSTORAGE_POSTGRES_URL_NON_POOLING
  console.log("[build] DIRECT_URL set from NEONSTORAGE_POSTGRES_URL_NON_POOLING")
}

console.log("[build] DATABASE_URL host:", process.env.DATABASE_URL?.split("@")[1]?.split("/")[0] ?? "not set")

execSync("prisma generate && prisma db push && next build", { stdio: "inherit" })
