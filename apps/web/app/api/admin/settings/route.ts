import { NextRequest, NextResponse } from "next/server"
import { randomBytes } from "crypto"
import prisma from "@/lib/admin/prismaClient"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  const settings = await prisma.settings.findUnique({ where: { id: "singleton" } })

  if (!settings) {
    return NextResponse.json({
      touch2DelayDays: 8,
      touch3DelayDays: 22,
      nurtureDelayDays: 60,
      linkedinTargets: [],
      neoEnabled: false,
      neoWebhookUrl: null,
      neoApiKeySet: false,
      neoApiKeyPrefix: null,
      neoWebhookSecretSet: false,
      neoLastWebhookFiredAt: null,
      neoLastApiCallAt: null,
    })
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
    neoEnabled: settings.neoEnabled,
    neoWebhookUrl: settings.neoWebhookUrl ?? null,
    neoApiKeySet: !!settings.neoApiKey,
    neoApiKeyPrefix: settings.neoApiKey ? settings.neoApiKey.substring(0, 8) : null,
    neoWebhookSecretSet: !!settings.neoWebhookSecret,
    neoWebhookSecretPrefix: settings.neoWebhookSecret ? settings.neoWebhookSecret.substring(0, 8) : null,
    neoLastWebhookFiredAt: settings.neoLastWebhookFiredAt?.toISOString() ?? null,
    neoLastApiCallAt: settings.neoLastApiCallAt?.toISOString() ?? null,
  })
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()

  const allowed = ["touch2DelayDays", "touch3DelayDays", "nurtureDelayDays", "linkedinTargets", "neoEnabled", "neoWebhookUrl"]
  const data: Record<string, unknown> = {}

  for (const key of allowed) {
    if (key in body) {
      if (key === "linkedinTargets") {
        data[key] = JSON.stringify(body[key])
      } else if (key === "neoEnabled") {
        data[key] = Boolean(body[key])
      } else if (key === "neoWebhookUrl") {
        data[key] = body[key] || null
      } else {
        const val = Number(body[key])
        if (!isNaN(val) && val > 0) {
          data[key] = val
        }
      }
    }
  }

  let newNeoApiKey: string | undefined
  let newNeoWebhookSecret: string | undefined

  if (body.regenerateNeoApiKey === true) {
    newNeoApiKey = randomBytes(32).toString("hex")
    data.neoApiKey = newNeoApiKey
  }

  if (body.regenerateNeoWebhookSecret === true) {
    newNeoWebhookSecret = randomBytes(32).toString("hex")
    data.neoWebhookSecret = newNeoWebhookSecret
  }

  const settings = await prisma.settings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...data },
    update: data,
  })

  return NextResponse.json({
    touch2DelayDays: settings.touch2DelayDays,
    touch3DelayDays: settings.touch3DelayDays,
    nurtureDelayDays: settings.nurtureDelayDays,
    neoEnabled: settings.neoEnabled,
    neoWebhookUrl: settings.neoWebhookUrl ?? null,
    neoApiKeySet: !!settings.neoApiKey,
    neoApiKeyPrefix: settings.neoApiKey ? settings.neoApiKey.substring(0, 8) : null,
    neoWebhookSecretSet: !!settings.neoWebhookSecret,
    neoWebhookSecretPrefix: settings.neoWebhookSecret ? settings.neoWebhookSecret.substring(0, 8) : null,
    // Full keys returned ONCE at generation time only:
    newNeoApiKey,
    newNeoWebhookSecret,
  })
}
