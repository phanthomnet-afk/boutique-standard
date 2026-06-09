import { NextResponse } from "next/server"
import { getWeeklyOutreachPlan } from "@/lib/admin/sequenceScheduler"

export const dynamic = "force-dynamic"

export async function GET() {
  const plan = await getWeeklyOutreachPlan()
  return NextResponse.json(plan)
}
