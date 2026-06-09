import { NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import { signWebhookPayload } from "@/lib/admin/neoAuth"

export async function POST() {
  const settings = await prisma.settings.findUnique({ where: { id: "singleton" } })

  if (!settings?.neoEnabled) {
    return NextResponse.json({ error: "NEO integration is not enabled" }, { status: 422 })
  }

  if (!settings.neoWebhookUrl) {
    return NextResponse.json({ error: "NEO webhook URL is not configured" }, { status: 422 })
  }

  const unsigned = {
    event: "test.ping",
    timestamp: new Date().toISOString(),
    data: { message: "TBS webhook test - connection verified", source: "The Boutique Standard" },
  }

  const signature = settings.neoWebhookSecret
    ? signWebhookPayload(unsigned, settings.neoWebhookSecret)
    : ""

  const payload = { ...unsigned, signature }

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
        event: "test.ping",
        payload: JSON.stringify(payload),
        status: "delivered",
        statusCode: response.status,
      },
    })

    await prisma.settings.update({
      where: { id: "singleton" },
      data: { neoLastWebhookFiredAt: new Date() },
    })

    return NextResponse.json({ success: true, statusCode: response.status })
  } catch (err) {
    clearTimeout(timeout)
    const errorMsg = err instanceof Error ? err.message : String(err)

    await prisma.webhookLog.create({
      data: {
        event: "test.ping",
        payload: JSON.stringify(payload),
        status: "failed",
        error: errorMsg,
      },
    })

    return NextResponse.json({ error: errorMsg }, { status: 502 })
  }
}
