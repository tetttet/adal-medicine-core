import { useTranslations } from "next-intl";
import Title from "../ui/title";

const Help = () => {
  const t = useTranslations("Help");

  const helpdata = [
    {
      icon: "/images/help/donation.svg",
      title: t("items.0.title"),
      text: t("items.0.text"),
    },
    {
      icon: "/images/help/volunteer.svg",
      title: t("items.1.title"),
      text: t("items.1.text"),
    },
    {
      icon: "/images/help/food-supply.svg",
      title: t("items.2.title"),
      text: t("items.2.text"),
    },
  ];

  return (
    <section className="lg:py-28 py-16 bg-white">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="text-center">
          <Title title={t("sectionTitle")} subtitle={t("sectionDescription")} />

          {/* Cards */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
            {helpdata.map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={`${index * 150}`}
                className={[
                  "group relative overflow-hidden",
                  "rounded-[28px] p-8 md:p-10",
                  "bg-[#f4f4f4]",
                  "transition-transform duration-200",
                  "hover:-translate-y-1",
                ].join(" ")}
              >
                {/* мягкий блик как в современном UI */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-white/70 blur-2xl opacity-60" />

                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-[#36C3AE]">
                  {item.title}
                </h3>

                <div className="my-6 h-px w-full bg-black/10" />

                <p className="text-[14px] md:text-[16px] leading-relaxed text-neutral-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;
