export const dynamic = "force-dynamic"

import { revalidatePath } from "next/cache"
import { type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-sanity-webhook-secret")
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return Response.json({ error: "Invalid secret" }, { status: 401 })
  }

  const body = await request.json()
  const slug = body?.slug?.current

  if (slug === "home") {
    revalidatePath("/")
  } else if (slug) {
    revalidatePath(`/${slug}`)
  }

  // Shared sections can appear on any page - revalidate all
  if (body._type === "sharedSection") {
    revalidatePath("/")
    revalidatePath("/audit")
    revalidatePath("/report")
    revalidatePath("/philosophy")
    revalidatePath("/request")
  }

  return Response.json({ revalidated: true, slug: slug || null })
}
