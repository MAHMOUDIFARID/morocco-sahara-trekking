import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import React from "react";

interface MDXContentProps {
  source: string;
}

const customComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-8 mb-4 text-2xl md:text-3xl font-bold text-structure border-b border-structure/10 pb-2 flex items-center gap-2 tracking-tight"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-6 mb-3 text-xl md:text-2xl font-bold text-structure tracking-tight"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 text-structure/80 leading-relaxed text-base md:text-lg" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-structure/80 marker:text-accent" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-structure/80 marker:text-accent" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-2 border-accent bg-canvas-subtle p-4 italic text-structure/80 rounded-r-lg"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-structure" {...props} />
  ),
  hr: () => <hr className="my-8 border-structure/10" />,
};

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose-custom max-w-none text-structure">
      <MDXRemote
        source={source}
        components={customComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
          },
        }}
      />
    </div>
  );
}
