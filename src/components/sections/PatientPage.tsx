import { getAllPosts } from "@/utils/markdown";
import BlogCard from "./blogCard";
import { useLocale, useTranslations } from "next-intl";

const PatientPage = () => {
  const lang = useLocale() as "ru" | "en" | "kz";
  const posts = getAllPosts(["title", "coverImage", "slug"], lang);
  const t = useTranslations("All.patients");

  return (
    <section className="lg:py-28 py-16 dark:bg-dark">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-44">
          {/* Левая часть — форма подписки */}
          <div data-aos="fade-left">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-6">{t("title")}</h2>
              <p className="text-base text-black/80 dark:text-white/80 mb-4">
                {t("description1")}
              </p>
              <p className="text-base text-black/80 dark:text-white/80 mb-4">
                {t("description2")}
              </p>
              <p className="text-base text-black/80 dark:text-white/80 mb-4">
                {t("underText")}
              </p>
            </div>
          </div>

          {/* Правая часть — блог */}
          <div className="lg:mt-0 mt-8">
            <div className="flex justify-between items-center border-b border-border dark:border-dark_border pb-6 mb-8">
              <h4 className="text-base mb-0 font-semibold">{t("lastCases")}</h4>
            </div>
            {posts.slice(0, 4).map((blog, i) => (
              <div
                key={i}
                className="lg:mb-10 mb-6"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="1000"
              >
                <BlogCard
                  blog={{
                    ...blog,
                    coverImage:
                      typeof blog.coverImage === "string"
                        ? blog.coverImage
                        : "",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientPage;
