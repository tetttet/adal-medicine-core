// app/[locale]/me/page.tsx
import Image from "next/image";
import { getMeMdx } from "@/lib/me-mdx";

export default async function MePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { content, frontmatter } = await getMeMdx(locale);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10">
      {/* Hero */}
      <section className="overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-tr from-[#22374e] via-[#246567] to-[#479390]">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/10">
              <Image
                src={frontmatter.coverImage ?? "/images/me/kuangan.jpg"}
                alt={frontmatter.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-white/70">{frontmatter.title}</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              {frontmatter.name}
            </h1>
            <p className="mt-3 text-white/85">{frontmatter.role}</p>
            <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-white/90">
              {frontmatter.teaser}
            </p>
          </div>
        </div>
      </section>

      {/* MDX content */}
      <article className="mt-10 prose prose-neutral max-w-none rounded-[28px] px-6 py-8 dark:prose-invert bg-linear-to-b from-primary/5 via-background to-background">
        <div className="[&>*:first-child]:mt-0">{content}</div>
      </article>
    </div>
  );
}
