import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import prisma from "@/lib/admin/prismaClient"
import { validateNeoApiKey, recordNeoApiCall } from "@/lib/admin/neoAuth"
import { fireWebhook } from "@/lib/admin/neoWebhook"
import { analyseWebsite } from "@/lib/admin/openaiAnalysis"
import { getReviews } from "@/lib/admin/dataForSeo"
import { detectGaps } from "@/lib/admin/gapDetection"
import { extractStructuredData } from "@/lib/admin/scrapeGraph"
import { calculateIcpScore } from "@/lib/admin/icpScoring"

export async function POST(req: NextRequest) {
  const valid = await validateNeoApiKey(req)
  if (!valid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  recordNeoApiCall()

  const body = await req.json()
  const { hotelId, force } = body

  if (!hotelId) return NextResponse.json({ error: "hotelId is required" }, { status: 400 })

  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
    include: { intelligence: true },
  })

  if (!hotel) return NextResponse.json({ error: "Hotel not found" }, { status: 404 })

  if (hotel.intelligence && hotel.intelligence.analysisVersion >= 1 && !force) {
    return NextResponse.json({
      success: true,
      status: "already_analysed",
      message: "Hotel already has intelligence. Use force=true to re-run.",
      icpScore: hotel.icpScore,
    })
  }

  const [websiteAnalysis, structuredData] = await Promise.all([
    analyseWebsite(hotel.website),
    extractStructuredData(hotel.website),
  ])

  let reviewData = { reviews: [] as { rating: number; text: string }[], reviewCount: 0, averageRating: null as number | null, raw: "" }
  if (hotel.googlePlaceId) {
    reviewData = await getReviews(hotel.name, hotel.location)
  }

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
          content: `Extract themes from these hotel reviews. Return JSON only:
{"positiveThemes":[],"negativeThemes":[],"frictionPatterns":[]}
Max 6 items per array.

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
    } catch { /* keep empty */ }
  }

  const gaps = detectGaps({
    brandPromises: websiteAnalysis.brandPromises,
    reviewNegativeThemes: negativeThemes,
    visualCoherenceScore: websiteAnalysis.visualCoherenceScore,
    localityStrength: websiteAnalysis.localityStrength,
    serviceLanguage: websiteAnalysis.serviceLanguage,
  })

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
          content: `Write one sentence summarising the most important gap. Hotel: ${hotel.name}. Top promise: ${topGap.promise}. Key friction: ${topGap.friction}.`,
        },
      ],
    })
    gapSummary = msg.content[0].type === "text" ? msg.content[0].text.trim() : ""
  }

  await prisma.hotelIntelligence.upsert({
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

  const icpResult = calculateIcpScore(
    {
      starRating: hotel.starRating,
      roomCountEstimate:
        structuredData.roomCount != null ? structuredData.roomCount : hotel.roomCountEstimate,
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

  const updatedHotel = await prisma.hotel.update({
    where: { id: hotel.id },
    data: { status: "enriched", icpScore: icpResult.score },
  })

  fireWebhook("hotel.analysed", updatedHotel, { icpScore: icpResult.score, gapCount: gaps.length }).catch(console.error)

  return NextResponse.json({ success: true, status: "completed", icpScore: icpResult.score })
}
