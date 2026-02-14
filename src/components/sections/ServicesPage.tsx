// app/[locale]/services/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getServiceList, type Locale, LOCALES } from "@/lib/services-mdx";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Title from "../ui/title";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const services = await getServiceList(locale);

  // ✅ server-safe, не hook
  const t = await getTranslations({ locale, namespace: "All.service" });

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <div className="text-center">
        <Title title={t("title")} subtitle={t("description")} />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:grid-cols-6 lg:items-stretch">
        {services.map(({ slug, frontmatter }, index) => {
          const isLastTwo =
            services.length % 3 === 2 && index >= services.length - 2;

          return (
            <Card
              key={slug}
              className={[
                "group overflow-hidden rounded-[24px] border border-white/10",
                "bg-linear-to-tr from-[#2a435e] via-[#246567] to-[#479390]",
                "transition hover:-translate-y-1",
                isLastTwo ? "lg:col-span-3" : "lg:col-span-2",
              ].join(" ")}
            >
              <div className="flex h-full flex-col px-8 pt-2 sm:px-9 sm:pt-4">
                <h3 className="text-[24px] leading-tight tracking-tight text-white sm:text-[30px] line-clamp-2">
                  {frontmatter.title}
                </h3>

                <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
                  <div className="relative h-[190px] w-full sm:h-[220px] lg:h-[210px]">
                    {frontmatter.coverImage ? (
                      <>
                        <Image
                          src={frontmatter.coverImage}
                          alt={frontmatter.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/25" />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-teal-500/25 via-slate-950/40 to-slate-950/70" />
                    )}
                  </div>
                </div>

                <CardContent className="mt-auto px-0 pb-8 pt-8">
                  <Button
                    asChild
                    className={[
                      "h-14 w-full rounded-full bg-white text-slate-900",
                      "text-lg font-medium",
                      "hover:bg-white/90",
                      "focus-visible:ring-2 focus-visible:ring-white/40",
                    ].join(" ")}
                  >
                    <Link href={`/${locale}/services/${slug}`}>
                      {frontmatter.buttonText ?? t("button")}
                    </Link>
                  </Button>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>

      {services.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
          Нет mdx в{" "}
          <code className="rounded bg-muted px-2 py-1">{`public/markdown/${locale}`}</code>
        </div>
      )}
    </div>
  );
}
