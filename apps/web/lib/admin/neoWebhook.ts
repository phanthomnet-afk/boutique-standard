import prisma from "./prismaClient"
import { signWebhookPayload } from "./neoAuth"

export type WebhookEventType =
  | "hotel.created"
  | "hotel.analysed"
  | "hotel.status_changed"
  | "outreach.generated"
  | "outreach.sent"
  | "outreach.replied"
  | "hotel.booked"
  | "test.ping"

export interface WebhookHotel {
  id: string
  name: string
  location: string
  country: string
  icpScore: number | null
  status: string
}

export interface WebhookPayload {
  event: WebhookEventType
  timestamp: string
  data: {
    hotelId: string
    hotelName: string
    location: string
    country: string
    icpScore: number | null
    status: string
    metadata?: Record<string, unknown>
  }
  signature: string
}

export async function fireWebhook(
  event: WebhookEventType,
  hotel: WebhookHotel,
  metadata?: Record<string, unknown>
): Promise<void> {
  const settings = await prisma.settings.findUnique({ where: { id: "singleton" } })

  if (!settings?.neoEnabled || !settings?.neoWebhookUrl) {
    await prisma.webhookLog.create({
      data: {
        event,
        hotelId: hotel.id,
        hotelName: hotel.name,
        payload: JSON.stringify({ event, hotelId: hotel.id }),
        status: "skipped",
      },
    })
    return
  }

  const unsigned = {
    event,
    timestamp: new Date().toISOString(),
    data: {
      hotelId: hotel.id,
      hotelName: hotel.name,
      location: hotel.location,
      country: hotel.country,
      icpScore: hotel.icpScore ?? null,
      status: hotel.status,
      metadata,
    },
  }

  const signature = settings.neoWebhookSecret
    ? signWebhookPayload(unsigned, settings.neoWebhookSecret)
    : ""

  const payload: WebhookPayload = { ...unsigned, signature }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  try {
    const response = await fetch(settings.neoWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Tbs-Webhook-Secret": settings.neoWebhookSecret ?? "",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    clearTimeout(timeout)

    await prisma.webhookLog.create({
      data: {
        event,
        hotelId: hotel.id,
        hotelName: hotel.name,
        payload: JSON.stringify(payload),
        status: "delivered",
        statusCode: response.status,
      },
    })

    await prisma.settings.update({
      where: { id: "singleton" },
      data: { neoLastWebhookFiredAt: new Date() },
    })

    console.log(`[NEO webhook] ${event} → ${response.status}`)
  } catch (err) {
    clearTimeout(timeout)
    const errorMsg = err instanceof Error ? err.message : String(err)

    await prisma.webhookLog.create({
      data: {
        event,
        hotelId: hotel.id,
        hotelName: hotel.name,
        payload: JSON.stringify(payload),
        status: "failed",
        error: errorMsg,
      },
    })

    console.error(`[NEO webhook] ${event} failed: ${errorMsg}`)
  }
}
