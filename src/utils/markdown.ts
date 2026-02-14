import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "markdown/blog/");
export const getPostsDirectory = (lang: string) => join(postsDirectory, lang);

export function getPostSlugs(lang: string) {
  return fs.readdirSync(getPostsDirectory(lang));
}

export function getPostBySlug(slug: string, fields: string[] = [], lang: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  console.log("Posts directory:", getPostsDirectory(lang));
  const fullPath = join(getPostsDirectory(lang), `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    // [key: string]: string;
    [key: string]: string | object;
  };

  const items: Items = {};

  function processImages(content: string) {
    // You can modify this function to handle image processing
    // For example, replace image paths with actual HTML image tags
    return content.replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="" />');
  }

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      // You can modify the content here to include Images
      items[field] = processImages(content);
    }

    if (field === "metadata") {
      // Include metadata, including the image information
      items[field] = { ...data, coverImage: data.coverImage || null };
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = [], lang: string) {
  const slugs = getPostSlugs(lang);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields, lang))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}
