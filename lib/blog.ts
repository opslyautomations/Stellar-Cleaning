import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { AREAS, SERVICES } from "./business";

/**
 * The blog. Each post is a Markdown file in `content/blog/<slug>.md` with a
 * single-line `key: value` frontmatter block.
 *
 * The Markdown is a deliberately small subset — `##`/`###` headings,
 * paragraphs, `- ` and `1. ` lists, `**bold**` and `[links](url)` — parsed
 * here rather than with a library. Anything outside that subset is a writing
 * error, so the parser throws instead of guessing.
 *
 * The section headed "Frequently asked questions" is lifted out of the body:
 * it renders as a RuledAccordion and is mirrored word for word into FAQPage
 * schema, the same as the service pages.
 *
 * Server-only: this reads the filesystem at build time.
 */

const DIR = join(process.cwd(), "content", "blog");
const FAQ_HEADING = "Frequently asked questions";

/** Every post carries this date: all 25 launched together with the blog. */
export const BLOG_LAUNCH_DATE = "2026-10-12";

export type Inline =
  | { kind: "text"; text: string }
  | { kind: "strong"; text: string }
  | { kind: "link"; text: string; href: string };

export type Block =
  | { kind: "h2"; text: string; id: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; content: Inline[] }
  | { kind: "ul" | "ol"; items: Inline[][] };

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  keyword: string;
  category: string;
  services: string[];
  areas: string[];
  excerpt: string;
  date: string;
  body: Block[];
  faqs: { q: string; a: string }[];
  words: number;
  readMinutes: number;
};

const REQUIRED = ["title", "metaTitle", "description", "keyword", "category", "excerpt"] as const;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** `**bold**` and `[text](href)`; everything else is plain text. */
export function parseInline(source: string): Inline[] {
  const out: Inline[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (const match of source.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) out.push({ kind: "text", text: source.slice(last, index) });
    if (match[1] !== undefined) out.push({ kind: "strong", text: match[1] });
    else out.push({ kind: "link", text: match[2], href: match[3] });
    last = index + match[0].length;
  }
  if (last < source.length) out.push({ kind: "text", text: source.slice(last) });
  return out;
}

/** Inline content flattened back to plain text, for schema and word counts. */
export function plainText(content: Inline[]): string {
  return content.map((part) => part.text).join("");
}

function parseFrontmatter(raw: string, file: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`${file}: missing frontmatter`);
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    if (!line.trim()) continue;
    const colon = line.indexOf(":");
    if (colon < 0) throw new Error(`${file}: bad frontmatter line "${line}"`);
    data[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  for (const key of REQUIRED) {
    if (!data[key]) throw new Error(`${file}: frontmatter is missing "${key}"`);
  }
  return { data, body: match[2] };
}

function parseBody(source: string, file: string): Block[] {
  const blocks: Block[] = [];
  const paragraphs = source.replace(/\r\n/g, "\n").split(/\n{2,}/);

  for (const chunk of paragraphs) {
    const text = chunk.trim();
    if (!text) continue;
    const lines = text.split("\n").map((line) => line.trim());

    if (lines.length === 1 && text.startsWith("### ")) {
      blocks.push({ kind: "h3", text: text.slice(4).trim() });
    } else if (lines.length === 1 && text.startsWith("## ")) {
      const heading = text.slice(3).trim();
      blocks.push({ kind: "h2", text: heading, id: slugify(heading) });
    } else if (lines.every((line) => line.startsWith("- "))) {
      blocks.push({ kind: "ul", items: lines.map((line) => parseInline(line.slice(2))) });
    } else if (lines.every((line) => /^\d+\.\s/.test(line))) {
      blocks.push({ kind: "ol", items: lines.map((line) => parseInline(line.replace(/^\d+\.\s+/, ""))) });
    } else if (/^(#|- |\d+\.\s)/.test(text) || lines.some((line) => /^(#|- |\d+\.\s)/.test(line))) {
      throw new Error(`${file}: a heading or list is mixed into a paragraph: "${text.slice(0, 60)}…"`);
    } else {
      blocks.push({ kind: "p", content: parseInline(lines.join(" ")) });
    }
  }
  return blocks;
}

/** Splits the FAQ section off the end of the body into q/a pairs. */
function extractFaqs(blocks: Block[], file: string) {
  const start = blocks.findIndex((block) => block.kind === "h2" && block.text === FAQ_HEADING);
  if (start < 0) return { body: blocks, faqs: [] };

  const faqs: { q: string; a: string }[] = [];
  for (const block of blocks.slice(start + 1)) {
    if (block.kind === "h3") faqs.push({ q: block.text, a: "" });
    else if (block.kind === "p" && faqs.length > 0) {
      const current = faqs[faqs.length - 1];
      current.a = current.a ? `${current.a} ${plainText(block.content)}` : plainText(block.content);
    } else {
      throw new Error(`${file}: the FAQ section may only contain ### questions and answer paragraphs`);
    }
  }
  return { body: blocks.slice(0, start), faqs };
}

function blockWords(block: Block): string {
  if (block.kind === "h2" || block.kind === "h3") return block.text;
  if (block.kind === "p") return plainText(block.content);
  return block.items.map(plainText).join(" ");
}

function list(value: string | undefined, valid: readonly string[], file: string, field: string): string[] {
  const items = (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  for (const item of items) {
    if (!valid.includes(item)) throw new Error(`${file}: unknown ${field} "${item}"`);
  }
  return items;
}

function loadPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const { data, body } = parseFrontmatter(readFileSync(join(DIR, file), "utf8"), file);
  const blocks = parseBody(body, file);
  const { body: content, faqs } = extractFaqs(blocks, file);
  const text = [...blocks.map(blockWords), ...faqs.map((faq) => faq.a)].join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title,
    metaTitle: data.metaTitle,
    description: data.description,
    keyword: data.keyword,
    category: data.category,
    services: list(data.services, SERVICES.map((s) => s.slug), file, "service"),
    areas: list(data.areas, AREAS.map((a) => a.slug), file, "area"),
    excerpt: data.excerpt,
    date: BLOG_LAUNCH_DATE,
    body: content,
    faqs,
    words,
    readMinutes: Math.max(1, Math.round(words / 230)),
  };
}

let cache: Post[] | null = null;

/** All posts, sorted by title so the order is stable across builds. */
export function getPosts(): Post[] {
  if (!cache) {
    cache = readdirSync(DIR)
      .filter((file) => file.endsWith(".md"))
      .map(loadPost)
      .sort((a, b) => a.title.localeCompare(b.title));
  }
  return cache;
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

/**
 * Related posts, scored by shared areas (2 points each), shared services
 * (1 point each) and same category (1 point). Ties keep title order.
 */
export function relatedPosts(post: Post, count = 3): Post[] {
  return getPosts()
    .filter((other) => other.slug !== post.slug)
    .map((other) => ({
      other,
      score:
        other.areas.filter((area) => post.areas.includes(area)).length * 2 +
        other.services.filter((service) => post.services.includes(service)).length +
        (other.category === post.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ other }) => other);
}

/** Posts that mention a given city — used to link area pages to the blog. */
export function postsForArea(areaSlug: string): Post[] {
  return getPosts().filter((post) => post.areas.includes(areaSlug));
}

/** Posts tagged with a given service — used to link service pages to the blog. */
export function postsForService(serviceSlug: string): Post[] {
  return getPosts().filter((post) => post.services.includes(serviceSlug));
}
