import { Metadata } from "next"
import { getAllArticles, getArticlesByCategory } from "@/lib/journal/getAllArticles"
import { JournalHub } from "@/components/journal/JournalHub"

export const metadata: Metadata = {
  title: "Journal - The Boutique Standard",
  description:
    "Observations on guest experience, boutique hospitality, and what makes a property worth returning to.",
}

interface Props {
  searchParams: { category?: string }
}

export default function JournalPage({ searchParams }: Props) {
  const { category } = searchParams
  const articles = category ? getArticlesByCategory(category) : getAllArticles()
  return <JournalHub articles={articles} selectedCategory={category} />
}
