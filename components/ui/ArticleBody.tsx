import type { ReactNode } from "react";
import Link from "next/link";
import Container from "./Container";
import { sectionClass, type Tone } from "./section";
import type { Block, Inline } from "@/lib/blog";

function renderInline(content: Inline[]): ReactNode {
  return content.map((part, i) => {
    if (part.kind === "strong") return <strong key={i}>{part.text}</strong>;
    if (part.kind === "link") {
      return part.href.startsWith("/") ? (
        <Link key={i} href={part.href}>
          {part.text}
        </Link>
      ) : (
        <a key={i} href={part.href} target="_blank" rel="noopener noreferrer">
          {part.text}
        </a>
      );
    }
    return part.text;
  });
}

/**
 * Long-form reading layout: a white prose column at a comfortable measure,
 * with a sticky aside holding the "in this guide" contents and whatever the
 * page puts in `aside` (the estimate card on blog posts). Under 980px the
 * aside drops above the prose as a plain card.
 */
export default function ArticleBody({
  blocks,
  meta,
  aside,
  tone = "paper",
}: {
  blocks: Block[];
  /** Short facts printed above the prose: date, reading time, cities. */
  meta?: ReactNode[];
  aside?: ReactNode;
  tone?: Tone;
}) {
  const toc = blocks.filter((block) => block.kind === "h2");

  return (
    <section data-component="ArticleBody" className={sectionClass(tone)}>
      <Container>
        <div className="article">
          <aside className="article__aside" aria-label="In this guide">
            {toc.length > 1 ? (
              <nav className="article__toc">
                <span className="article__toc-label">In this guide</span>
                <ol>
                  {toc.map((block) => (
                    <li key={block.id}>
                      <a href={`#${block.id}`}>{block.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
            {aside}
          </aside>

          <div className="article__prose">
            {meta?.length ? (
              <ul className="article__meta">
                {meta.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : null}
            {blocks.map((block, i) => {
              switch (block.kind) {
                case "h2":
                  return (
                    <h2 key={i} id={block.id}>
                      {block.text}
                    </h2>
                  );
                case "h3":
                  return <h3 key={i}>{block.text}</h3>;
                case "p":
                  return <p key={i}>{renderInline(block.content)}</p>;
                case "ul":
                case "ol": {
                  const List = block.kind;
                  return (
                    <List key={i}>
                      {block.items.map((item, j) => (
                        <li key={j}>{renderInline(item)}</li>
                      ))}
                    </List>
                  );
                }
              }
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
