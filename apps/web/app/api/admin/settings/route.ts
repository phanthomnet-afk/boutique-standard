import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"

export async function GET() {
  const settings = await prisma.settings.findUnique({ where: { id: "singleton" } })

  const defaults = {
    touch2DelayDays: 8,
    touch3DelayDays: 22,
    nurtureDelayDays: 60,
    linkedinTargets: [],
  }

  if (!settings) {
    return NextResponse.json(defaults)
  }

  let linkedinTargets: string[] = []
  try {
    linkedinTargets = JSON.parse(settings.linkedinTargets)
  } catch {
    linkedinTargets = []
  }

  return NextResponse.json({
    touch2DelayDays: settings.touch2DelayDays,
    touch3DelayDays: settings.touch3DelayDays,
    nurtureDelayDays: settings.nurtureDelayDays,
    linkedinTargets,
  })
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()

  const allowed = ["touch2DelayDays", "touch3DelayDays", "nurtureDelayDays", "linkedinTargets"]
  const data: Record<string, unknown> = {}

  for (const key of allowed) {
    if (key in body) {
      if (key === "linkedinTargets") {
        data[key] = JSON.stringify(body[key])
      } else {
        const val = Number(body[key])
        if (!isNaN(val) && val > 0) {
          data[key] = val
        }
      }
    }
  }

  const settings = await prisma.settings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...data },
    update: data,
  })

  return NextResponse.json(settings)
}
