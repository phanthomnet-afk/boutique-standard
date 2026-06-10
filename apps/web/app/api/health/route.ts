export const dynamic = "force-dynamic"

export async function GET() {
  return Response.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "not set",
    databaseConfigured: !!process.env.DATABASE_URL,
    adminPasswordConfigured: !!process.env.ADMIN_PASSWORD,
  })
}
