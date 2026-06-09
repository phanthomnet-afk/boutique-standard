import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/admin/prismaClient"
import { validateNeoApiKey, recordNeoApiCall } from "@/lib/admin/neoAuth"
import { getWeeklyOutreachPlan } from "@/lib/admin/sequenceScheduler"

export const dynamic = "force-dynamic"

// Simple in-memory cache for dashboard data
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000

function getCached<T>(key: string): T | null {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key)
    return null
  }
  return entry.data as T
}

function setCached(key: string, data: unknown) {
  cache.set(key, { data, timestamp: Date.now() })
}

export async function GET(req: NextRequest) {
  const valid = await validateNeoApiKey(req)
  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  recordNeoApiCall()

  const cached = getCached<object>("dashboard")
  if (cached) {
    return NextResponse.json(cached)
  }

  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    hotels,
    statusCounts,
    recentOutreach,
    topProspects,
    emailsSentMonth,
    repliesMonth,
    bookedTotal,
    bookedMonth,
  ] = await Promise.all([
    prisma.hotel.count(),

    prisma.hotel.groupBy({ by: ["status"], _count: { status: true } }),

    prisma.outreach.findMany({
      where: { status: { in: ["sent", "replied"] } },
      include: { hotel: { select: { name: true, location: true } } },
      orderBy: { sentAt: "desc" },
      take: 15,
    }),

    prisma.hotel.findMany({
      where: { status: { in: ["enriched", "outreach-ready"] }, icpScore: { not: null } },
      include: {
        intelligence: { select: { gapSummary: true } },
        _count: { select: { contacts: true } },
      },
      orderBy: { icpScore: "desc" },
      take: 5,
    }),

    prisma.outreach.count({
      where: { channel: "email", status: { in: ["sent", "replied"] }, sentAt: { gte: monthStart } },
    }),

    prisma.outreach.count({ where: { status: "replied", repliedAt: { gte: monthStart } } }),

    prisma.hotel.count({ where: { status: "booked" } }),

    prisma.hotel.count({ where: { status: "booked", bookedAt: { gte: monthStart } } }),
  ])

  const plan = await getWeeklyOutreachPlan()

  const byStatus: Record<string, number> = {}
  for (const row of statusCounts) {
    byStatus[row.status] = row._count.status
  }

  const recentActivity = recentOutreach
    .filter((o) => o.sentAt)
    .map((o) => {
      const eventLabel =
        o.status === "replied"
          ? o.replySentiment
            ? `Reply received (${o.replySentiment})`
            : "Reply received"
          : `Touch ${o.sequencePosition} sent via ${o.channel}`

      return {
        hotelName: o.hotel.name,
        location: o.hotel.location,
        event: eventLabel,
        timestamp: (o.sentAt ?? o.repliedAt ?? o.generatedAt).toISOString(),
      }
    })
    .slice(0, 10)

  const replyRate =
    emailsSentMonth > 0 ? Math.round((repliesMonth / emailsSentMonth) * 100) : 0

  const data = {
    pipeline: {
      total: hotels,
      byStatus,
    },
    thisWeek: {
      overdue: plan.overdue.length,
      dueToday: plan.today.length,
      dueThisWeek: plan.thisWeek.length,
      readyToStart: plan.readyToStart.length,
    },
    recentActivity,
    topProspects: topProspects.map((h) => ({
      hotelId: h.id,
      hotelName: h.name,
      location: h.location,
      country: h.country,
      icpScore: h.icpScore ?? 0,
      status: h.status,
      gapSummary: h.intelligence?.gapSummary ?? null,
      hasContact: h._count.contacts > 0,
    })),
    stats: {
      emailsSentThisMonth: emailsSentMonth,
      repliesThisMonth: repliesMonth,
      replyRate,
      bookedTotal,
      bookedThisMonth: bookedMonth,
    },
    lastUpdated: new Date().toISOString(),
  }

  setCached("dashboard", data)

  return NextResponse.json(data)
}
