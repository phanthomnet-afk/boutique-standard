// TODO (Phase 2): Add structured extraction via ScrapeGraphAI for properties that
// block crawlers or require JS rendering.

import OpenAI from "openai"

export interface WebsiteAnalysis {
  brandPromises: string[]
  positioningSummary: string
  visualCoherenceScore: number | null
  pricePointSignal: string | null
  taglines: string[]
  targetGuestDescription: string
  localityStrength: string
  serviceLanguage: string[]
  weaknesses: string[]
  raw: string
}

const SYSTEM_PROMPT = `You are an expert at analysing boutique hotel brand positioning.
Analyse this hotel's website thoroughly and extract structured intelligence.
Be specific and precise. Quote actual language from the website where relevant.`

export async function analyseWebsite(website: string): Promise<WebsiteAnalysis> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const userPrompt = `Analyse the boutique hotel at ${website}.
Browse their homepage, about page, rooms page, and any dining or experience pages.

Return a JSON object with these exact fields:
{
  "brandPromises": ["string"],
  "positioningSummary": "string",
  "visualCoherenceScore": 1-5,
  "pricePointSignal": "luxury|premium|boutique|unclear",
  "taglines": ["string"],
  "targetGuestDescription": "string",
  "localityStrength": "strong|moderate|weak",
  "serviceLanguage": ["string"],
  "weaknesses": ["string"]
}

Return only valid JSON. No markdown, no explanation.`

  const response = await (client as any).responses.create({
    model: "gpt-4o-mini",
    tools: [{ type: "web_search_preview" }],
    input: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
  })

  const raw = response.output_text ?? JSON.stringify(response)

  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {}

    return {
      brandPromises: parsed.brandPromises ?? [],
      positioningSummary: parsed.positioningSummary ?? "",
      visualCoherenceScore: parsed.visualCoherenceScore ?? null,
      pricePointSignal: parsed.pricePointSignal ?? null,
      taglines: parsed.taglines ?? [],
      targetGuestDescription: parsed.targetGuestDescription ?? "",
      localityStrength: parsed.localityStrength ?? "unclear",
      serviceLanguage: parsed.serviceLanguage ?? [],
      weaknesses: parsed.weaknesses ?? [],
      raw,
    }
  } catch {
    return {
      brandPromises: [],
      positioningSummary: "",
      visualCoherenceScore: null,
      pricePointSignal: null,
      taglines: [],
      targetGuestDescription: "",
      localityStrength: "unclear",
      serviceLanguage: [],
      weaknesses: [],
      raw,
    }
  }
}
