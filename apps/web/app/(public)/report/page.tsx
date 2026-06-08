import type { Metadata } from "next";
import { getContent, getLang } from "@/lib/getContent";
import type { ReportPageContent } from "@/lib/content/types";
import { PageHero } from "@/components/shared/PageHero";
import { ValuePropsSection } from "@/components/report/ValuePropsSection";
import { ReportSectionsSection } from "@/components/report/ReportSectionsSection";
import { FormatSection } from "@/components/report/FormatSection";
import { CaseStudySection } from "@/components/report/CaseStudySection";
import { ReviewsSection } from "@/components/report/ReviewsSection";
import { PageCta } from "@/components/shared/PageCta";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const lang = getLang(params);
  const content = await getContent<ReportPageContent>("report", lang);
  return {
    title: content.meta.title,
    description: content.meta.description,
  };
}

export default async function ReportPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const lang = getLang(params);
  const content = await getContent<ReportPageContent>("report", lang);

  return (
    <>
      <PageHero
        content={content.hero}
        variant="image"
        imageSrc="/images/website/details/stone-corridor--detail--1x1.png"
        imageAlt="Stone corridor detail in a boutique property, warm light on worn surfaces"
      />
      <ValuePropsSection content={content.valueProps} />
      <ReportSectionsSection content={content.sections} />
      <FormatSection content={content.format} />
      <CaseStudySection content={content.caseStudy} />
      <ReviewsSection content={content.reviews} />
      <PageCta content={content.cta} />
    </>
  );
}
