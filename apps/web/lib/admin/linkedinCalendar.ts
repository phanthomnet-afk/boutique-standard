export interface LinkedinPost {
  hook: string
  angle: string
  cta: string
}

export interface LinkedinWeekPlan {
  weekNumber: number
  articleSlug: string
  articleTitle: string
  articleUrl: string
  post: LinkedinPost
}

interface ArticleCalendarEntry {
  slug: string
  title: string
  posts: LinkedinPost[]
}

// Hardcoded rotation of TBS journal articles with specific post angles per article
const ARTICLE_CALENDAR: ArticleCalendarEntry[] = [
  {
    slug: "boutique-hotel-guest-has-changed",
    title: "The Boutique Hotel Guest Has Changed. Most Properties Have Not.",
    posts: [
      {
        hook: "The guest reviewing your hotel on Tripadvisor is measuring something you can't photograph.",
        angle: "Boutique hotel guests no longer evaluate purely on design and amenities. They weight coherence - whether the experience matches the promise. Most properties market one thing and deliver another. That gap is measurable.",
        cta: "I wrote about this recently. The full piece is on The Boutique Standard journal.",
      },
      {
        hook: "Your hotel's most expensive marketing is the gap between your website copy and room 12 at 11pm.",
        angle: "Hotel brand promises are aspirational by design. But when the morning coffee doesn't match the 'unhurried luxury' in the headline, guests don't just feel disappointed - they feel misled. The disconnect is the real product failure.",
        cta: "The full analysis is in our latest journal piece.",
      },
      {
        hook: "I visited 4 boutique hotels last month. Two were memorable. Two were forgettable. The difference wasn't the room.",
        angle: "Coherence is the new luxury metric. A property with 3-star rooms and exceptional staff consistency outperforms a property with 5-star rooms and inconsistent service in guest loyalty. Yet most properties invest in the rooms, not the consistency.",
        cta: "Worth reading our take on what's actually driving boutique hotel loyalty right now.",
      },
    ],
  },
  {
    slug: "first-ten-minutes-hotel-stay",
    title: "The First Ten Minutes: Why Arrival Defines Everything That Follows",
    posts: [
      {
        hook: "A guest decides within 10 minutes whether they're going to love your hotel. The rest of the stay confirms or corrects that first impression.",
        angle: "The arrival sequence is the single highest-leverage moment in hospitality. Properties that obsess over the check-in process, the first sightline, the first staff interaction - they earn a forgiveness credit that carries through everything else.",
        cta: "Our journal has a full piece on the arrival architecture of memorable stays.",
      },
      {
        hook: "The most common mistake in boutique hospitality isn't a bad mattress. It's a forgettable arrival.",
        angle: "Guests can forgive slow service at dinner. They can overlook a small room. But they rarely recover from a cold, transactional arrival. The emotional tone is set in the first ten minutes and rarely shifts dramatically after.",
        cta: "We unpacked exactly why this happens - and what the best properties do differently.",
      },
      {
        hook: "I've started auditing hotels by their arrivals alone. You can predict almost everything from those first ten minutes.",
        angle: "The arrival sequence reveals a property's operational DNA. How the team communicates during handoff, whether they acknowledge context about the guest, how they introduce the space - it tells you whether the rest of the experience was designed or just assembled.",
        cta: "The full breakdown is in The Boutique Standard journal.",
      },
    ],
  },
  {
    slug: "qualities-boutique-hotels-memorable-first-to-go",
    title: "The Qualities That Make Boutique Hotels Memorable Are the First to Go",
    posts: [
      {
        hook: "Every boutique hotel opens with a strong identity. Most don't keep it past year three.",
        angle: "The pressures of occupancy optimisation, staff turnover, and cost management systematically erode the specific qualities that made a property distinctive. The independent hotel that opened with character ends up looking like a smaller version of a chain by year four.",
        cta: "The Boutique Standard journal has a full piece on why this happens and what it costs.",
      },
      {
        hook: "Boutique hotels face a particular challenge: the thing that earns your first wave of guests is exactly what's most at risk as you scale.",
        angle: "Character, specificity, the sense that someone cared about this particular guest in this particular room - these qualities require constant maintenance. They don't survive on autopilot. They're the first casualty of a staffing crisis or a cost-reduction review.",
        cta: "Worth reading if you're thinking about what makes boutique properties sustainable long-term.",
      },
      {
        hook: "The most common reason a boutique hotel loses its following isn't bad service. It's invisible drift.",
        angle: "Properties don't usually fail dramatically. They drift. The touches that made them distinctive gradually disappear because no one is measuring them. What gets measured gets maintained. What doesn't gets cut in the next budget review.",
        cta: "Our journal piece on this is worth 5 minutes of your morning.",
      },
    ],
  },
]

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

export function getWeeklyLinkedinPlan(): LinkedinWeekPlan {
  const weekNumber = getWeekNumber(new Date())
  const articleIndex = Math.floor(weekNumber / 2) % ARTICLE_CALENDAR.length
  const article = ARTICLE_CALENDAR[articleIndex]
  const postIndex = weekNumber % article.posts.length

  return {
    weekNumber,
    articleSlug: article.slug,
    articleTitle: article.title,
    articleUrl: `/journal/${article.slug}`,
    post: article.posts[postIndex],
  }
}
