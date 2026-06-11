import { PrismaClient } from "@prisma/client"

// On Vercel with the Neon integration, NEONSTORAGE_* vars are always
// authoritative (auto-injected by the integration). Use them unconditionally
// when present so build and runtime always connect to the same database,
// regardless of any manually set DATABASE_URL in Vercel's env vars.
if (process.env.NEONSTORAGE_POSTGRES_PRISMA_URL) {
  process.env.DATABASE_URL = process.env.NEONSTORAGE_POSTGRES_PRISMA_URL
}
if (process.env.NEONSTORAGE_POSTGRES_URL_NON_POOLING) {
  process.env.DIRECT_URL = process.env.NEONSTORAGE_POSTGRES_URL_NON_POOLING
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development"
      ? ["error", "warn"]
      : ["error"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

export default prisma
