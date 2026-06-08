import type { Metadata } from "next";
import { getContent, getLang } from "@/lib/getContent";
import type { AuditPageContent } from "@/lib/content/types";
import { PageHero } from "@/components/shared/PageHero";
import { MethodologySection } from "@/components/audit/MethodologySection";
import { ValuePropsSection } from "@/components/audit/ValuePropsSection";
import { ProcessSection } from "@/components/audit/ProcessSection";
import { ImageBreak } from "@/components/ui/ImageBreak";
import { ScopeSection } from "@/components/audit/ScopeSection";
import { DeliverablesSection } from "@/components/audit/DeliverablesSection";
import { PricingSection } from "@/components/audit/PricingSection";
import { ReviewsSection } from "@/components/audit/ReviewsSection";
import { FaqSection } from "@/components/audit/FaqSection";
import { PageCta } from "@/components/shared/PageCta";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const lang = getLang(params);
  const content = await getContent<AuditPageContent>("audit", lang);
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function AuditPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang = getLang(params);
  const content = await getContent<AuditPageContent>("audit", lang);

  return (
    <>
      <PageHero
        content={content.hero}
        variant="image"
        imageSrc="/images/website/hero/facade-golden-hour--hero--16x9.png"
        imageAlt="Hotel facade at golden hour, warm light on stone and glass"
      />
      <MethodologySection content={content.methodology} />
      <ValuePropsSection content={content.valueProps} />
      <ProcessSection content={content.process} />
      <ImageBreak
        src="/images/website/sections/breakfast-table--section--16x9.png"
        alt="Breakfast table set beside a window, morning light on local produce"
      />
      <ScopeSection content={content.scope} />
      <DeliverablesSection content={content.deliverables} />
      <ImageBreak
        src="/images/website/sections/pool-afternoon--section--16x9.jpg"
        alt="Boutique hotel pool at late afternoon, stone surround, still water"
      />
      <PricingSection content={content.pricing} />
      <ReviewsSection content={content.reviews} />
      <FaqSection content={content.faq} />
      <PageCta content={content.cta} />
    </>
  );
}
