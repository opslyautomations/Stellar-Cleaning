import type { ReactNode } from "react";
import Link from "next/link";
import Container from "./Container";

export type FooterLink = { href: string; label: string; external?: boolean };
export type FooterColumn = { label: string; links: FooterLink[]; split?: boolean };

/** Four-column dark footer with hairline column dividers; stacks on mobile. */
export default function FooterLedger({
  company,
  columns,
  bottomLeft,
  bottomRight,
}: {
  company: ReactNode;
  columns: FooterColumn[];
  bottomLeft: ReactNode;
  bottomRight: ReactNode;
}) {
  return (
    <footer className="footer tone--deep" data-component="FooterLedger">
      <Container>
        <div className="footer__grid">
          <div className="footer__col">{company}</div>
          {columns.map((column) => (
            <div className="footer__col" key={column.label}>
              <p className="footer__label">{column.label}</p>
              {column.split ? (
                <div className="footer__subgrid">
                  <ul className="footer__list">
                    {column.links.slice(0, Math.ceil(column.links.length / 2)).map((link) => (
                      <li key={link.href + link.label}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="footer__list">
                    {column.links.slice(Math.ceil(column.links.length / 2)).map((link) => (
                      <li key={link.href + link.label}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ul className="footer__list">
                  {column.links.map((link) =>
                    link.external ? (
                      <li key={link.href + link.label}>
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      </li>
                    ) : (
                      <li key={link.href + link.label}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Container>
      <Container>
        <div className="footer__bar">
          <span>{bottomLeft}</span>
          <span>{bottomRight}</span>
        </div>
      </Container>
    </footer>
  );
}
