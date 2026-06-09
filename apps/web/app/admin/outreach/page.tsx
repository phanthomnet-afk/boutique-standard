import { getWeeklyLinkedinPlan } from "@/lib/admin/linkedinCalendar"
import OutreachPageClient from "./OutreachPageClient"

export default function OutreachPage() {
  const linkedin = getWeeklyLinkedinPlan()
  return <OutreachPageClient linkedin={linkedin} />
}
