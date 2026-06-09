import { NextRequest, NextResponse } from "next/server"
import Papa from "papaparse"
import prisma from "@/lib/admin/prismaClient"
import { calculateIcpScore } from "@/lib/admin/icpScoring"

const COUNTRY_CODE_MAP: Record<string, string> = {
  Denmark: "DK",
  Sweden: "SE",
  Norway: "NO",
  France: "FR",
  Italy: "IT",
  Spain: "ES",
  Portugal: "PT",
  Greece: "GR",
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  const text = await file.text()

  const { data, errors: parseErrors } = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, "_"),
  })

  if (parseErrors.length > 0 && data.length === 0) {
    return NextResponse.json({ error: "Could not parse CSV file" }, { status: 400 })
  }

  let imported = 0
  let skipped = 0
  const rowErrors: string[] = []

  for (let i = 0; i < data.length; i++) {
    const row = data[i]
    const name = row.name?.trim()

    if (!name) {
      skipped++
      rowErrors.push(`Row ${i + 2}: missing name`)
      continue
    }

    const website = row.website?.trim() ?? ""
    const location = row.location?.trim() ?? ""
    const country = row.country?.trim() ?? ""
    const rawCode = row.countrycode ?? row.country_code ?? ""
    const countryCode = rawCode.trim() || COUNTRY_CODE_MAP[country] || country.substring(0, 2).toUpperCase()
    const starRating = row.starrating ?? row.star_rating
    const roomCount = row.roomcount ?? row.room_count
    const googlePlaceId = row.googleplaceid ?? row.google_place_id ?? null
    const email = row.email?.trim() ?? null

    try {
      const existing = await prisma.hotel.findFirst({ where: { name, location } })
      if (existing) { skipped++; continue }

      const icpResult = calculateIcpScore({
        starRating: starRating ? parseInt(starRating) : null,
        roomCountEstimate: roomCount ? parseInt(roomCount) : null,
      })

      const hotel = await prisma.hotel.create({
        data: {
          name,
          website,
          location,
          country,
          countryCode,
          starRating: starRating ? parseInt(starRating) : null,
          roomCountEstimate: roomCount ? parseInt(roomCount) : null,
          googlePlaceId: googlePlaceId || null,
          notes: row.notes?.trim() || null,
          status: "prospect",
          icpScore: icpResult.score,
        },
      })

      // Auto-create contact if email in CSV
      if (email) {
        await prisma.contact.create({
          data: {
            hotelId: hotel.id,
            email,
            source: "csv",
            verified: false,
          },
        })
      }

      imported++
    } catch (err) {
      rowErrors.push(`Row ${i + 2} (${name}): ${err}`)
      skipped++
    }
  }

  return NextResponse.json({ imported, skipped, errors: rowErrors })
}
