// lib/services-mdx.ts
import fs from "node:fs";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/mdx-components";

export const LOCALES = ["ru", "en", "kz"] as const;
export type Locale = (typeof LOCALES)[number];

export type ServiceFrontmatter = {
  title: string;
  coverImage?: string;
  buttonText?: string;
};

export type ServiceListItem = {
  slug: string;
  frontmatter: ServiceFrontmatter;
};

function contentDir(locale: Locale) {
  return path.join(process.cwd(), "public", "markdown", locale);
}

function getMdxFilenames(locale: Locale): string[] {
  const dir = contentDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function getAllServiceSlugs(locale: Locale): string[] {
  return getMdxFilenames(locale).map((f) => f.replace(/\.mdx?$/, ""));
}

export async function getServiceList(locale: Locale): Promise<ServiceListItem[]> {
  const dir = contentDir(locale);
  const files = getMdxFilenames(locale);

  const items = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const fullPath = path.join(dir, file);
      const source = fs.readFileSync(fullPath, "utf-8");

      const { frontmatter } = await compileMDX<ServiceFrontmatter>({
        source,
        options: {
          parseFrontmatter: true,
          mdxOptions: { remarkPlugins: [remarkGfm] },
        },
        // components можно не давать для списка, но можно и дать — не мешает
        components: mdxComponents,
      });

      return {
        slug,
        frontmatter: {
          title: frontmatter?.title ?? slug,
          coverImage: frontmatter?.coverImage,
          buttonText: frontmatter?.buttonText ?? "Подробнее",
        },
      };
    }),
  );

  items.sort((a, b) =>
    (a.frontmatter.title ?? "").localeCompare(b.frontmatter.title ?? "", locale),
  );

  return items;
}

export async function getServiceBySlug(locale: Locale, slug: string) {
  const dir = contentDir(locale);

  const fullPathMdx = path.join(dir, `${slug}.mdx`);
  const fullPathMd = path.join(dir, `${slug}.md`);

  const fullPath = fs.existsSync(fullPathMdx)
    ? fullPathMdx
    : fs.existsSync(fullPathMd)
      ? fullPathMd
      : null;

  if (!fullPath) return null;

  const source = fs.readFileSync(fullPath, "utf-8");

  // ВАЖНО: components передаем сюда,
  // чтобы "content" сразу был готовым ReactNode
  return compileMDX<ServiceFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
    components: mdxComponents,
  });
}
