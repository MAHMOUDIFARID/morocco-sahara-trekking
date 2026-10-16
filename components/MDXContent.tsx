import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import React from "react";
import { ChevronDown } from "lucide-react";
import type { Root, RootContent } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx-jsx";

interface MDXContentProps {
  source: string;
}

// Wrap each day and all of its content without changing the source MDX.
function remarkTrekDays() {
  return (tree: Root) => {
    const children: RootContent[] = [];
    let firstDay = true;
    for (let index = 0; index < tree.children.length; index++) {
      const node = tree.children[index];
      if (node.type === "heading" && node.depth === 2 &&
          node.children.some((child) => child.type === "text" && /^Programme/i.test(child.value))) {
        node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id: "programme" } };
      }
      if (node.type !== "heading" || node.depth !== 3 ||
          !node.children.some((child) => child.type === "text" && /^Jour\s+\d/i.test(child.value))) {
        children.push(node);
        continue;
      }

      const body: RootContent[] = [];
      while (index + 1 < tree.children.length) {
        const next = tree.children[index + 1];
        if (next.type === "heading" && next.depth <= 3) break;
        body.push(next);
        index++;
      }

      const details: MdxJsxFlowElement = {
        type: "mdxJsxFlowElement",
        name: "details",
        attributes: firstDay ? [{ type: "mdxJsxAttribute", name: "open", value: null }] : [],
        children: [
          { type: "mdxJsxFlowElement", name: "summary", attributes: [], children: [node] },
          ...body,
        ] as MdxJsxFlowElement["children"],
      };
      children.push(details);
      firstDay = false;
    }
    tree.children = children;
  };
}

const customComponents = {
  details: (props: React.DetailsHTMLAttributes<HTMLDetailsElement>) => (
    <details className="group border-b border-[#E4DDD4] first-of-type:border-t [&>p:last-child]:pb-4" {...props} />
  ),
  summary: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden [&_h3]:m-0 [&_h3]:text-lg" {...props}>
      {children}
      <ChevronDown size={18} strokeWidth={1.5} aria-hidden="true" className="mt-1 shrink-0 text-[#625C55] group-open:rotate-180" />
    </summary>
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mb-6 mt-14 scroll-mt-28 font-display text-3xl font-medium leading-tight tracking-tight text-[#1C1917] first:mt-0"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mb-3 mt-6 font-display text-xl font-medium leading-snug tracking-tight text-[#1C1917]"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 text-base leading-7 text-[#625C55]" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 ml-4 list-disc space-y-4 text-[#625C55] marker:text-[#B8ADA1]" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-structure/80 marker:text-accent" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-2 border-accent bg-canvas-subtle p-4 text-structure/80 rounded-r-lg"
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
    <div className="max-w-none text-structure">
      <MDXRemote
        source={source}
        components={customComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkTrekDays],
            rehypePlugins: [rehypeSlug],
          },
        }}
      />
    </div>
  );
}
