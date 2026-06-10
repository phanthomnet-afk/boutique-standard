import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import prisma from "@/lib/admin/prismaClient"
import { analyseWebsite } from "@/lib/admin/openaiAnalysis"
import { getReviews } from "@/lib/admin/dataForSeo"
import { detectGaps } from "@/lib/admin/gapDetection"
import { extractStructuredData } from "@/lib/admin/scrapeGraph"
import { calculateIcpScore } from "@/lib/admin/icpScoring"
import { fireWebhook } from "@/lib/admin/neoWebhook"

interface Params {
  params: { id: string }
}

export async function POST(_req: NextRequest, { params }: Params) {
  const hotel = await prisma.hotel.findUnique({ where: { id: params.id } })

  if (!hotel) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  // Step 1: OpenAI website analysis + ScrapeGraphAI structured extraction (run in parallel)
  const [websiteAnalysis, structuredData] = await Promise.all([
    analyseWebsite(hotel.website),
    extractStructuredData(hotel.website),
  ])

  // Step 2: DataForSEO reviews (if google place id available - skip otherwise)
  let reviewData = { reviews: [] as any[], reviewCount: 0, averageRating: null as number | null, raw: "" }
  if (hotel.googlePlaceId) {
    try {
      reviewData = await getReviews(hotel.name, hotel.location)
    } catch (error) {
      console.log("Review fetch skipped:", error)
    }
  }

  // Step 3: AI signal extraction from reviews (Claude Haiku)
  let positiveThemes: string[] = []
  let negativeThemes: string[] = []
  let frictionPatterns: string[] = []

  if (reviewData.reviews.length > 0) {
    const reviewText = reviewData.reviews
      .slice(0, 30)
      .map((r) => `[${r.rating}/5] ${r.text}`)
      .join("\n\n")

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      messages: [
        {
          role: "user",
          content: `Extract themes from these hotel reviews.
Return JSON only:
{
  "positiveThemes": [],
  "negativeThemes": [],
  "frictionPatterns": []
}
Max 6 items per array. Be specific.

Reviews:
${reviewText}`,
        },
      ],
    })

    try {
      const raw = msg.content[0].type === "text" ? msg.content[0].text : ""
      const jsonMatch = raw.match(/\{[\s\S]*\}/)
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {}
      positiveThemes = parsed.positiveThemes ?? []
      negativeThemes = parsed.negativeThemes ?? []
      frictionPatterns = parsed.frictionPatterns ?? []
    } catch {
      // Keep empty arrays on parse failure
    }
  }

  // Step 4: Gap detection (pure logic - no AI)
  const gaps = detectGaps({
    brandPromises: websiteAnalysis.brandPromises,
    reviewNegativeThemes: negativeThemes,
    visualCoherenceScore: websiteAnalysis.visualCoherenceScore,
    localityStrength: websiteAnalysis.localityStrength,
    serviceLanguage: websiteAnalysis.serviceLanguage,
  })

  // Step 5: Gap summary (Claude Haiku)
  let gapSummary = ""

  if (gaps.length > 0) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const topGap = gaps[0]
    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: `Write one sentence summarising the most important gap between what this hotel promises and what guests actually report. Be specific. Use the hotel's own language where possible.

Hotel: ${hotel.name}
Top promise: ${topGap.promise}
Key friction: ${topGap.friction}
All gaps: ${gaps.map((g) => g.friction).join("; ")}`,
        },
      ],
    })
    gapSummary =
      msg.content[0].type === "text" ? msg.content[0].text.trim() : ""
  }

  // Upsert intelligence record
  const intelligence = await prisma.hotelIntelligence.upsert({
    where: { hotelId: hotel.id },
    create: {
      hotelId: hotel.id,
      brandPromises: JSON.stringify(websiteAnalysis.brandPromises),
      positioningSummary: websiteAnalysis.positioningSummary,
      visualCoherenceScore: websiteAnalysis.visualCoherenceScore,
      pricePointSignal: websiteAnalysis.pricePointSignal,
      websiteAnalysisRaw: websiteAnalysis.raw,
      reviewPositiveThemes: JSON.stringify(positiveThemes),
      reviewNegativeThemes: JSON.stringify(negativeThemes),
      reviewCount: reviewData.reviewCount,
      averageRating: reviewData.averageRating,
      reviewsRaw: reviewData.raw,
      gaps: JSON.stringify(gaps),
      gapSummary,
      analysedAt: new Date(),
      analysisVersion: 1,
    },
    update: {
      brandPromises: JSON.stringify(websiteAnalysis.brandPromises),
      positioningSummary: websiteAnalysis.positioningSummary,
      visualCoherenceScore: websiteAnalysis.visualCoherenceScore,
      pricePointSignal: websiteAnalysis.pricePointSignal,
      websiteAnalysisRaw: websiteAnalysis.raw,
      reviewPositiveThemes: JSON.stringify(positiveThemes),
      reviewNegativeThemes: JSON.stringify(negativeThemes),
      reviewCount: reviewData.reviewCount,
      averageRating: reviewData.averageRating,
      reviewsRaw: reviewData.raw,
      gaps: JSON.stringify(gaps),
      gapSummary,
      analysedAt: new Date(),
      analysisVersion: { increment: 1 },
    },
  })

  // Apply ScrapeGraphAI structured data to Hotel record
  const hotelUpdates: Record<string, unknown> = { status: "enriched" }

  if (structuredData.roomCount != null && hotel.roomCountEstimate == null) {
    hotelUpdates.roomCountEstimate = structuredData.roomCount
  }

  // Auto-create contact if email found and no contacts exist
  const existingContacts = await prisma.contact.count({ where: { hotelId: hotel.id } })
  if (structuredData.contactEmail && existingContacts === 0) {
    await prisma.contact.create({
      data: {
        hotelId: hotel.id,
        email: structuredData.contactEmail,
        name: structuredData.ownerName ?? null,
        source: "scraped",
        verified: false,
      },
    })
  }

  // Calculate ICP score with full intelligence
  const icpResult = calculateIcpScore(
    {
      starRating: hotel.starRating,
      roomCountEstimate: (hotelUpdates.roomCountEstimate as number | null) ?? hotel.roomCountEstimate,
      onBookingCom: hotel.onBookingCom,
      instagramHandle: hotel.instagramHandle,
      averageRating: reviewData.averageRating ?? undefined,
      reviewCount: reviewData.reviewCount,
    },
    {
      localityStrength: websiteAnalysis.localityStrength,
      visualCoherenceScore: websiteAnalysis.visualCoherenceScore,
      pricePointSignal: websiteAnalysis.pricePointSignal,
      gaps: JSON.stringify(gaps),
      brandPromises: JSON.stringify(websiteAnalysis.brandPromises),
    }
  )
  hotelUpdates.icpScore = icpResult.score

  await prisma.hotel.update({
    where: { id: hotel.id },
    data: hotelUpdates,
  })

  const updatedHotel = await prisma.hotel.findUnique({ where: { id: hotel.id } })
  if (updatedHotel) {
    fireWebhook("hotel.analysed", updatedHotel, { icpScore: updatedHotel.icpScore, gapCount: gaps.length }).catch(console.error)
  }

  return NextResponse.json(intelligence)
}
