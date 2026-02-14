import InstagramEmbed from "@/components/sections/InstagramEmbed";
import { getPostBySlug } from "@/utils/markdown";
import markdownToHtml from "@/utils/markdownToHtml";

export type paramsType = Promise<{ slug: string; locale: string }>;

export default async function Post(props: { params: paramsType }) {
  const { slug, locale } = await props.params;
  const lang = locale as "ru" | "en" | "kz";
  const post = getPostBySlug(
    slug,
    ["title", "coverImage", "link", "content"],
    lang,
  );

  const content = await markdownToHtml(
    typeof post.content === "string" ? post.content : "",
  );

  return (
    <>
      <section className="pb-10 pt-10 dark:bg-dark lg:pb-20 lg:pt-22 px-4">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              {/* <div className="z-20 mb-16 h-80 overflow-hidden rounded-sm md:h-45">
                <Image
                  src={
                    typeof post.coverImage === "string" ? post.coverImage : ""
                  }
                  alt="image"
                  width={1170}
                  height={766}
                  quality={100}
                  className="h-full w-full object-cover object-center rounded-3xl"
                />
              </div> */}
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 lg:w-8/12">
                  <div className="blog-details markdown xl:pr-10">
                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                  </div>
                </div>

                <InstagramEmbed permalink={typeof post.link === "string" ? post.link : ""} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
