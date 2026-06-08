import type { Metadata } from "next";
import { getContent, getLang } from "@/lib/getContent";
import type { ReportPageContent } from "@/lib/content/types";
import { PageHero } from "@/components/shared/PageHero";
import { ReportIntroSection } from "@/components/report/ReportIntroSection";
import { ReportSectionsSection } from "@/components/report/ReportSectionsSection";
import { CaseStudySection } from "@/components/report/CaseStudySection";
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
      <PageHero content={content.hero} variant="image" />
      <ReportIntroSection content={content.intro} />
      <ReportSectionsSection content={content.sections} />
      <CaseStudySection content={content.caseStudy} />
      <PageCta content={content.cta} />
    </>
  );
}
