export const dynamic = "force-dynamic"
export const revalidate = 0

import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 })
  }

  const isProd = process.env.NODE_ENV === "production"

  const cookieOptions = [
    "tbs_admin_session=authenticated",
    "Path=/",
    "HttpOnly",
    `Max-Age=${60 * 60 * 24}`,
    isProd ? "Secure" : "",
    isProd ? "SameSite=Strict" : "SameSite=Lax",
  ]
    .filter(Boolean)
    .join("; ")

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookieOptions,
    },
  })
}

export async function DELETE() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": "tbs_admin_session=; Path=/; HttpOnly; Max-Age=0",
    },
  })
}
