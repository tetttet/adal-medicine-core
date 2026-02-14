import Image from "next/image";
import { Blog } from "@/types/blog";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const { title, coverImage, slug } = blog;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex items-center gap-6 transition hover:bg-white/50"
    >
      {/* Image wrapper с фиксированным размером */}
      <div className="relative w-30 h-30 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={coverImage!}
          alt={title || "Blog cover image"}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Text wrapper с ограничением высоты */}
      <div className="flex flex-col justify-center">
        <h4 className="text-lg font-medium leading-snug line-clamp-2 group-hover:text-primary transition">
          {title}
        </h4>
      </div>
    </Link>
  );
};

export default BlogCard;
