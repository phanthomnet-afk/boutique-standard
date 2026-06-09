import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.hotelId) {
    return NextResponse.json({ error: "hotelId is required" }, { status: 400 })
  }

  const contact = await prisma.contact.create({
    data: {
      hotelId: body.hotelId,
      name: body.name ?? null,
      role: body.role ?? null,
      email: body.email ?? null,
      linkedinUrl: body.linkedinUrl ?? null,
      source: body.source ?? null,
      notes: body.notes ?? null,
    },
  })

  return NextResponse.json(contact, { status: 201 })
}
