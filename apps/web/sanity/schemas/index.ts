import { heroSection } from "./sections/hero"
import { processSection } from "./sections/process"
import { faqSection } from "./sections/faq"
import { reviewsSection } from "./sections/reviews"
import { ctaSection } from "./sections/cta"
import { pricingSection } from "./sections/pricing"
import { richTextSection } from "./sections/richText"
import { twoColumnSection } from "./sections/twoColumn"
import { reportOverviewSection } from "./sections/reportOverview"
import { imageTextSection } from "./sections/imageText"
import { journalTeaserSection } from "./sections/shared/journalTeaser"
import { philosophyMethodSection } from "./sections/shared/philosophyMethod"
import { howWeWorkSection } from "./sections/shared/howWeWork"
import { theFrameworkSection } from "./sections/shared/theFramework"
import { sharedSection } from "./sharedSection"
import { page } from "./page"
import { localizedString, localizedText } from "./shared/localizedString"
import { seoFields } from "./shared/seo"
import { sectionImage } from "./shared/image"

export const schemaTypes = [
  // Shared primitives
  localizedString,
  localizedText,
  seoFields,
  sectionImage,
  // Section types
  heroSection,
  processSection,
  faqSection,
  reviewsSection,
  ctaSection,
  pricingSection,
  richTextSection,
  twoColumnSection,
  reportOverviewSection,
  imageTextSection,
  journalTeaserSection,
  philosophyMethodSection,
  howWeWorkSection,
  theFrameworkSection,
  // Documents
  sharedSection,
  page,
]
