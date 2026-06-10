import { PrismaClient } from "@prisma/client"
import { createHash, randomBytes } from "crypto"
import { resolve } from "path"

// Set DATABASE_URL if not already set (when running from repo root)
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = `file:${resolve(process.cwd(), "apps/web/prisma/prisma/dev.db")}`
}

const prisma = new PrismaClient()

async function main() {
  const token = randomBytes(16).toString("hex")
  const password = "rivage2027"
  const passwordHash = createHash("sha256").update(password).digest("hex")

  const report = await prisma.clientReport.upsert({
    where: { slug: "maison-du-rivage" },
    update: {},
    create: {
      slug: "maison-du-rivage",
      token,
      passwordHash,
      hotelName: "Maison du Rivage",
      location: "Antibes, French Riviera",
      language: "en",
      dataPath: "maison-du-rivage.json",
      isActive: true,
    },
  })

  console.log("\nReport seeded:")
  console.log("  URL:      /client/" + report.token + "/report")
  console.log("  Password: rivage2027")
  console.log("  Token:    " + report.token)
  console.log("")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
