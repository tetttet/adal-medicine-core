// components/mdx-components.tsx
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      {...props}
      className="mt-2 scroll-m-20 text-3xl font-semibold tracking-tight text-foreground"
    />
  ),
  h2: (props) => (
    <h2
      {...props}
      className="mt-10 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight text-foreground"
    />
  ),
  h3: (props) => (
    <h3
      {...props}
      className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-foreground"
    />
  ),
  p: (props) => (
    <p {...props} className="leading-7  not-first:mt-4" />
  ),
  a: (props) => (
    <a
      {...props}
      className="font-medium text-teal-600 underline underline-offset-4 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
    />
  ),
  ul: (props) => <ul {...props} className="my-4 ml-6 list-disc text-muted-foreground" />,
  ol: (props) => <ol {...props} className="my-4 ml-6 list-decimal text-muted-foreground" />,
  li: (props) => <li {...props} className="mt-2" />,
  blockquote: (props) => (
    <blockquote
      {...props}
      className="my-6 border-l-4 border-teal-500/60 bg-teal-500/5 px-4 py-3 text-muted-foreground"
    />
  ),
  hr: (props) => <hr {...props} className="my-10 border-border" />,
  strong: (props) => <strong {...props} className="text-foreground" />,
};
