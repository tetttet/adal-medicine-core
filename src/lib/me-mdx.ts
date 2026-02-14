// lib/me-mdx.ts
import fs from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";

export type MeFrontmatter = {
  title: string;
  name: string;
  role: string;
  buttonText?: string;
  coverImage?: string;
  teaser?: string;
};

export async function getMeMdx(locale: string) {
  const safeLocale = ["ru", "en", "kz"].includes(locale) ? locale : "ru";
  const filePath = path.join(process.cwd(), "public", "me", `${safeLocale}.mdx`);
  const source = await fs.readFile(filePath, "utf8");

  const { content, frontmatter } = await compileMDX<MeFrontmatter>({
    source,
    options: { parseFrontmatter: true },
    components: mdxComponents,
  });

  return { content, frontmatter };
}
