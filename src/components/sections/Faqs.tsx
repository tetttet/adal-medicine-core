import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems, faqItemsEn, faqItemsKz } from "@/constant/Info";
import { useLocale, useTranslations } from "next-intl";

export function FaqsSection() {
  const t = useTranslations("All.faqs");
  const locale = useLocale();
  let FAQS = faqItems;
  if (locale === "en") {
    FAQS = faqItemsEn;
  }
  if (locale === "kz") {
    FAQS = faqItemsKz;
  }
  return (
    <section className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 md:grid-cols-2 lg:border-x">
      <div className="px-4 pt-12 pb-6">
        <div className="space-y-5">
          <h2 className="text-balance font-bold text-4xl md:text-6xl lg:font-black">
            {t("title")}
          </h2>
          <p className="text-muted-foreground">{t("description")}</p>
          <p className="text-muted-foreground">
            {t("cannotFind")}
            <a className="text-primary hover:underline" href="#">
              {t("button")}
            </a>
          </p>
        </div>
      </div>
      <div className="relative place-content-center">
        {/* vertical guide line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 h-full w-px bg-border"
        />

        <Accordion collapsible type="single">
          {FAQS.map((item) => (
            <AccordionItem
              className="group relative border-b pl-2 first:border-t last:border-b"
              key={item.id}
              value={item.id}
            >
              <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="px-4 pb-4 text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
