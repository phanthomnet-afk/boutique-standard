// TODO (Phase 3): Add Resend email integration for tracking opens and replies.
// TODO (Phase 4): Add NEO webhook to sync outreach status.

import Anthropic from "@anthropic-ai/sdk"

interface OutreachInput {
  hotelName: string
  location: string
  brandPromises: string[]
  positioningSummary: string
  gapSummary: string
  channel: "email" | "linkedin"
  sequencePosition: 1 | 2 | 3
}

const OUTREACH_RULES = {
  neverSay: [
    "audit",
    "undercover",
    "mystery",
    "anonymous",
    "price",
    "cost",
    "fee",
    "investment",
    "EUR",
    "kr.",
    "I wanted to reach out",
    "I hope this finds you well",
    "just checking in",
    "I'd love to",
    "pick your brain",
  ],
  alwaysFocus: [
    "loyal guests",
    "review scores",
    "guest experience",
    "what guests actually experience",
    "repeat visits",
    "what guests remember",
  ],
  tone: [
    "observational not critical",
    "specific not generic",
    "warm but professional",
    "confident not pushy",
    "peer not vendor",
  ],
}

const SYSTEM_PROMPT = `You write outreach for The Boutique Standard, an independent guest experience intelligence studio.

Your tone is: observational, specific, warm, confident.

Never use: ${OUTREACH_RULES.neverSay.map((s) => `"${s}"`).join(", ")}.

Always focus on: ${OUTREACH_RULES.alwaysFocus.join(", ")}.

Tone principles: ${OUTREACH_RULES.tone.join("; ")}.

Every message must feel like it was written specifically for this one property.`

function buildUserPrompt(input: OutreachInput): string {
  const { hotelName, location, brandPromises, positioningSummary, gapSummary, channel, sequencePosition } = input
  const channelNote = channel === "linkedin"
    ? "LinkedIn message (max 300 characters, very short)"
    : "email (include a subject line, 3-4 short paragraphs maximum)"

  if (sequencePosition === 1) {
    return `Write a ${channelNote} to the owner or GM of ${hotelName} in ${location}.

Hotel promises: ${brandPromises.join("; ")}
Their positioning: ${positioningSummary}
Key gap identified: ${gapSummary}

The message should:
- Open with one specific observation about their property
- Reference the gap without being critical or accusatory
- Connect it to loyal guests and review scores
- End with a soft, low-pressure question

Do not pitch. Do not mention a report or service. Just start a conversation.`
  }

  if (sequencePosition === 2) {
    return `Write follow-up ${channelNote} touch 2 for ${hotelName}.
They did not reply to touch 1.
Reference a similar boutique coastal property (do not name it) where guest journey mapping revealed three quiet gaps that were affecting repeat visits.
One specific insight: ${gapSummary}
End with: happy to share what that looked like, if relevant.
Keep it shorter than touch 1.`
  }

  return `Write the final touch for ${hotelName} via ${channelNote}.
Be honest and direct. Briefly introduce The Boutique Standard as an independent guest experience intelligence studio.
Offer to share what a report looks like.
No pressure framing. If the timing is not right, fine.
Very short. Maximum 150 words for email, 150 characters for LinkedIn.`
}

export async function generateDraft(input: OutreachInput): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  // Use Sonnet for touch 3 (higher stakes, direct intro), Haiku for 1-2
  const model =
    input.sequencePosition === 3
      ? "claude-sonnet-4-6"
      : "claude-haiku-4-5-20251001"

  const message = await client.messages.create({
    model,
    max_tokens: 600,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserPrompt(input) }],
  })

  const block = message.content[0]
  return block.type === "text" ? block.text : ""
}
