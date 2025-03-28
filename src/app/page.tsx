import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import CoursesSection from "@/components/landing/courses-section";
import AlertsSection from "@/components/landing/alerts-section";
import LiveClassesSection from "@/components/landing/live-classes-section";
import NewsPreviewSection from "@/components/landing/news-preview-section";
import FAQSection from "@/components/landing/faq-section";
import CTASection from "@/components/landing/cta-section";
import LandingHeader from "@/components/landing/header";
import LandingFooter from "@/components/landing/footer";
import { getLandingData } from "@/actions/landing";

export default async function Home() {
  const data = await getLandingData();
  console.log(data);
  return (
    <>
      <LandingHeader />
      <main className="flex flex-col gap-3 w-full h-full">
        <HeroSection />
        <FeaturesSection />
        <CoursesSection />
        <AlertsSection />
        <LiveClassesSection />
        <NewsPreviewSection />
        <FAQSection />
        <CTASection />
      </main>
      <LandingFooter />
    </>
  );
}
