export const dynamic = "force-dynamic"
export const revalidate = 0

import { getWeeklyLinkedinPlan } from "@/lib/admin/linkedinCalendar"
import OutreachPageClient from "./OutreachPageClient"

export default function OutreachPage() {
  const linkedin = getWeeklyLinkedinPlan()
  return <OutreachPageClient linkedin={linkedin} />
}
