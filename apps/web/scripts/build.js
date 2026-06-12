#!/usr/bin/env node
// Build entry point. On Vercel, NEONSTORAGE_* vars are always authoritative
// (auto-injected by the Neon integration). Override DATABASE_URL/DIRECT_URL
// unconditionally when present so prisma generate uses the same database
// that the runtime will connect to.
const { execSync }                    = require("child_process")
const { mkdirSync, copyFileSync, readdirSync, existsSync } = require("fs")
const { join }                        = require("path")

if (process.env.NEONSTORAGE_POSTGRES_PRISMA_URL) {
  process.env.DATABASE_URL = process.env.NEONSTORAGE_POSTGRES_PRISMA_URL
  console.log("[build] DATABASE_URL set from NEONSTORAGE_POSTGRES_PRISMA_URL")
}
if (process.env.NEONSTORAGE_POSTGRES_URL_NON_POOLING) {
  process.env.DIRECT_URL = process.env.NEONSTORAGE_POSTGRES_URL_NON_POOLING
  console.log("[build] DIRECT_URL set from NEONSTORAGE_POSTGRES_URL_NON_POOLING")
}

console.log("[build] DATABASE_URL host:", process.env.DATABASE_URL?.split("@")[1]?.split("/")[0] ?? "not set")

// Copy report JSON files into the web app so they are available as
// TypeScript imports at build time (no file system access needed at runtime).
const srcDir  = join(__dirname, "../../../data/reports")
const destDir = join(__dirname, "../data/reports")

try {
  mkdirSync(destDir, { recursive: true })
  const files = readdirSync(srcDir).filter((f) => f.endsWith(".json"))
  for (const file of files) {
    copyFileSync(join(srcDir, file), join(destDir, file))
    console.log("[build] Copied report data:", file)
  }
} catch (e) {
  console.warn("[build] Could not copy data files:", e.message)
}

execSync("npx prisma generate", { stdio: "inherit" })
execSync("npx next build",      { stdio: "inherit" })
