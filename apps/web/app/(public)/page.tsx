import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { AuditTeaserSection } from "@/components/home/AuditTeaserSection";
import { ReportPreviewSection } from "@/components/home/ReportPreviewSection";
import { JournalStripSection } from "@/components/home/JournalStripSection";
import { InquirySection } from "@/components/home/InquirySection";

export const metadata: Metadata = {
  title: "The Boutique Standard",
  description:
    "Independent guest experience intelligence for boutique hotels. We evaluate the alignment between your promise and what your guests actually experience.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <AuditTeaserSection />
      <ReportPreviewSection />
      <JournalStripSection />
      <InquirySection />
    </>
  );
}
