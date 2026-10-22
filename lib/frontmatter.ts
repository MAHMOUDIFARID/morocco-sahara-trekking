import { parseDocument } from "yaml";

/** Read YAML metadata without interpreting delimiters in the MDX body. */
export function parseFrontmatter(source: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const input = source.replace(/^\uFEFF/, "");
  const opening = /^---[\t ]*\r?\n/.exec(input);
  if (!opening) return { data: {}, content: input };

  const remainder = input.slice(opening[0].length);
  const closing = /^---[\t ]*(?:\r?\n|$)/m.exec(remainder);
  if (!closing) throw new Error("Missing closing YAML frontmatter delimiter.");

  const document = parseDocument(remainder.slice(0, closing.index), {
    schema: "core",
    uniqueKeys: true,
    stringKeys: true,
  });
  const problem = document.errors[0] || document.warnings[0];
  if (problem) throw problem;

  const data: unknown = document.toJS({ maxAliasCount: 100 }) ?? {};
  if (typeof data !== "object" || Array.isArray(data)) {
    throw new Error("YAML frontmatter must be a mapping of field names to values.");
  }

  return {
    data: data as Record<string, unknown>,
    content: remainder.slice(closing.index + closing[0].length),
  };
}
