// app/[locale]/services/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  getAllServiceSlugs,
  getServiceBySlug,
  type Locale,
  LOCALES,
} from "@/lib/services-mdx";
import { WhenTreatmentAbroadRecommended } from "@/components/sections/WhenTreatmentAbroadRecommended";
import { AdalMedicineAdvantages } from "@/components/sections/AdalMedicineAdvantages";
import { ContactCardDemo } from "@/components/contact-card";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const all: Array<{ locale: Locale; slug: string }> = [];
  for (const locale of LOCALES) {
    const slugs = getAllServiceSlugs(locale);
    for (const slug of slugs) all.push({ locale, slug });
  }
  return all;
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  const compiled = await getServiceBySlug(locale, slug);
  if (!compiled) return notFound();

  const { frontmatter, content } = compiled;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      <div className="overflow-hidden rounded-3xl border shadow-none border-border/70 bg-background/60">
        <div className="relative">
          {frontmatter?.coverImage ? (
            <div className="relative aspect-16/7 w-full">
              <Image
                src={frontmatter.coverImage}
                alt={frontmatter?.title ?? slug}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 900px"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-teal-500/10" />
            </div>
          ) : (
            <div className="h-44 w-full bg-linear-to-br from-teal-500/15 via-background to-slate-950/10" />
          )}

          <div className="absolute inset-x-0 bottom-0 p-6">
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {frontmatter?.title ?? slug}
            </h1>
          </div>
        </div>

        <article className="prose prose-neutral max-w-none px-6 py-8 dark:prose-invert bg-linear-to-b from-primary/5 via-background to-background">
          <div className="[&>*:first-child]:mt-0">{content}</div>
        </article>
      </div>

      {/* <div className="mt-8 text-sm text-muted-foreground">
        Файл:{" "}
        <span className="font-mono">{`public/markdown/${locale}/${slug}.mdx`}</span>
      </div> */}
      <WhenTreatmentAbroadRecommended className="mt-8" />
      <AdalMedicineAdvantages className="mt-10" />
      <ContactCardDemo />
    </div>
  );
}
