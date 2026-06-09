import prisma from "./prismaClient"

export interface SequenceItem {
  hotelId: string
  hotelName: string
  location: string
  countryCode: string
  gapSummary: string | null
  contacts: Array<{ id: string; name: string | null; email: string | null; linkedinUrl: string | null }>
  nextPosition: 1 | 2 | 3 | "nurture"
  dueDate: Date
  lastSentAt: Date | null
  urgency: "overdue" | "today" | "thisWeek"
}

export interface ReadyItem {
  hotelId: string
  hotelName: string
  location: string
  countryCode: string
  gapSummary: string | null
  contacts: Array<{ id: string; name: string | null; email: string | null; linkedinUrl: string | null }>
  icpScore: number | null
}

export interface WeeklyPlan {
  overdue: SequenceItem[]
  today: SequenceItem[]
  thisWeek: SequenceItem[]
  readyToStart: ReadyItem[]
  stats: {
    totalHotels: number
    totalSent: number
    totalReplied: number
    totalBooked: number
  }
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function isToday(date: Date): boolean {
  const now = new Date()
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  )
}

function isThisWeek(date: Date): boolean {
  const now = new Date()
  const weekEnd = addDays(now, 7)
  return date > now && date <= weekEnd
}

export async function getWeeklyOutreachPlan(): Promise<WeeklyPlan> {
  const [settingsRaw, hotels, statCounts] = await Promise.all([
    prisma.settings.findUnique({ where: { id: "singleton" } }),
    prisma.hotel.findMany({
      where: { status: { notIn: ["dead", "booked"] } },
      include: {
        intelligence: { select: { gapSummary: true } },
        contacts: {
          select: { id: true, name: true, email: true, linkedinUrl: true },
          take: 5,
        },
        outreach: {
          where: { status: { in: ["sent", "replied"] } },
          orderBy: { sentAt: "asc" },
          select: { sequencePosition: true, sentAt: true, status: true, replySentiment: true },
        },
      },
    }),
    prisma.$transaction([
      prisma.hotel.count(),
      prisma.outreach.count({ where: { status: { in: ["sent", "replied"] } } }),
      prisma.outreach.count({ where: { status: "replied" } }),
      prisma.hotel.count({ where: { status: "booked" } }),
    ]),
  ])

  const touch2Delay = settingsRaw?.touch2DelayDays ?? 8
  const touch3Delay = settingsRaw?.touch3DelayDays ?? 22
  const nurtureDelay = settingsRaw?.nurtureDelayDays ?? 60

  const now = new Date()
  const overdue: SequenceItem[] = []
  const today: SequenceItem[] = []
  const thisWeek: SequenceItem[] = []
  const readyToStart: ReadyItem[] = []

  for (const hotel of hotels) {
    const contacts = hotel.contacts
    const sentTouches = hotel.outreach.filter((o) => o.sentAt)

    if (sentTouches.length === 0) {
      // No outreach sent yet
      if (hotel.intelligence) {
        readyToStart.push({
          hotelId: hotel.id,
          hotelName: hotel.name,
          location: hotel.location,
          countryCode: hotel.countryCode,
          gapSummary: hotel.intelligence.gapSummary ?? null,
          contacts,
          icpScore: hotel.icpScore,
        })
      }
      continue
    }

    // Skip if replied with booked sentiment
    const hasBooked = hotel.outreach.some((o) => o.replySentiment === "booked")
    if (hasBooked) continue

    // Skip if has an active positive reply that hasn't been followed up
    const hasPositiveReply = hotel.outreach.some(
      (o) => o.status === "replied" && o.replySentiment === "positive"
    )
    if (hasPositiveReply) continue

    const maxPosition = Math.max(...sentTouches.map((o) => o.sequencePosition))
    const lastTouch = sentTouches.find((o) => o.sequencePosition === maxPosition)
    if (!lastTouch?.sentAt) continue

    let nextPosition: 1 | 2 | 3 | "nurture"
    let dueDate: Date

    if (maxPosition === 1) {
      nextPosition = 2
      dueDate = addDays(lastTouch.sentAt, touch2Delay)
    } else if (maxPosition === 2) {
      nextPosition = 3
      dueDate = addDays(lastTouch.sentAt, touch3Delay)
    } else {
      nextPosition = "nurture"
      dueDate = addDays(lastTouch.sentAt, nurtureDelay)
    }

    const item: SequenceItem = {
      hotelId: hotel.id,
      hotelName: hotel.name,
      location: hotel.location,
      countryCode: hotel.countryCode,
      gapSummary: hotel.intelligence?.gapSummary ?? null,
      contacts,
      nextPosition,
      dueDate,
      lastSentAt: lastTouch.sentAt,
      urgency: dueDate < now ? "overdue" : isToday(dueDate) ? "today" : "thisWeek",
    }

    if (dueDate < now) {
      overdue.push(item)
    } else if (isToday(dueDate)) {
      today.push(item)
    } else if (isThisWeek(dueDate)) {
      thisWeek.push(item)
    }
  }

  // Sort overdue by most overdue first
  overdue.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
  // Sort readyToStart by ICP score desc
  readyToStart.sort((a, b) => (b.icpScore ?? 0) - (a.icpScore ?? 0))

  return {
    overdue,
    today,
    thisWeek,
    readyToStart,
    stats: {
      totalHotels: statCounts[0],
      totalSent: statCounts[1],
      totalReplied: statCounts[2],
      totalBooked: statCounts[3],
    },
  }
}
