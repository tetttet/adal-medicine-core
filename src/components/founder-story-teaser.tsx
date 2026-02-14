import Image from "next/image";
import Link from "next/link";
import { getMeMdx } from "@/lib/me-mdx";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, User2, Briefcase, MapPin } from "lucide-react";
import FounderStoryTeaserClient from "./founder-story-teaser.client";

// framer-motion можно юзать в Server Component через lazy client wrapper,
// но проще сделать маленький client-wrapper внутри файла.

export default async function FounderStoryTeaser({
  locale,
}: {
  locale: string;
}) {
  const { frontmatter } = await getMeMdx(locale);

  // Нормализуем поля (чтобы компонент не падал)
  const cover = frontmatter.coverImage ?? "/images/me/kuangan.jpg";
  const name = frontmatter.name ?? "Founder";
  const title = frontmatter.title ?? "";
  const role = frontmatter.role ?? "";
  const teaser = frontmatter.teaser ?? "";
  const buttonText = frontmatter.buttonText ?? "Подробнее";

  return (
    <div className="pb-20">
    <FounderStoryTeaserClient
      locale={locale}
      cover={cover}
      name={name}
      title={title}
      role={role}
      teaser={teaser}
      buttonText={buttonText}
    />
    </div>
  );
}
