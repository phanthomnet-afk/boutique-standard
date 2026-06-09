import { timingSafeEqual, createHmac } from "crypto"
import prisma from "./prismaClient"

export async function validateNeoApiKey(request: Request): Promise<boolean> {
  const providedKey = request.headers.get("X-Neo-Api-Key")
  if (!providedKey) return false

  const settings = await prisma.settings.findUnique({ where: { id: "singleton" } })
  if (!settings?.neoEnabled || !settings?.neoApiKey) return false

  try {
    const provided = Buffer.from(providedKey)
    const expected = Buffer.from(settings.neoApiKey)
    if (provided.length !== expected.length) return false
    return timingSafeEqual(provided, expected)
  } catch {
    return false
  }
}

export function signWebhookPayload(payload: object, secret: string): string {
  return createHmac("sha256", secret)
    .update(JSON.stringify(payload))
    .digest("hex")
}

// Fire and forget - update the last API call timestamp
export function recordNeoApiCall(): void {
  prisma.settings
    .update({ where: { id: "singleton" }, data: { neoLastApiCallAt: new Date() } })
    .catch(console.error)
}
