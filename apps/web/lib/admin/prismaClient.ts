import { PrismaClient } from "@prisma/client"

// Fall back to Neon's auto-injected vars when explicit DATABASE_URL is not set.
// Handles Vercel deployments using the Neon Postgres integration.
if (!process.env.DATABASE_URL && process.env.NEONSTORAGE_POSTGRES_PRISMA_URL) {
  process.env.DATABASE_URL = process.env.NEONSTORAGE_POSTGRES_PRISMA_URL
}
if (!process.env.DIRECT_URL && process.env.NEONSTORAGE_POSTGRES_URL_NON_POOLING) {
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
