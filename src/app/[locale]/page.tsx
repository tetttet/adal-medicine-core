import FounderStoryTeaser from "@/components/founder-story-teaser";
import Comments from "@/components/sections/Comments";
import { FaqsSection } from "@/components/sections/Faqs";
import Help from "@/components/sections/Help";
import { ImagesSliderDemo } from "@/components/sections/ImagesSliderDemo";
import PatientPage from "@/components/sections/PatientPage";
import ServicesPage from "@/components/sections/ServicesPage";
import { useLocale } from "next-intl";

export default function Home() {
  const locale = useLocale();
  return (
    <>
      <ImagesSliderDemo />
      <Help />
      <ServicesPage
        params={Promise.resolve({ locale: locale as "ru" | "en" | "kz" })}
      />
      <PatientPage />
      <FounderStoryTeaser locale={locale} />
      <FaqsSection />
      <Comments />
    </>
  );
}
