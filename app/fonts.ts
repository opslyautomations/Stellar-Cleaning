import { Bricolage_Grotesque, Public_Sans } from "next/font/google";

/** Headings, large pull quotes, oversized numerals. Never body copy. */
export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/** All body copy, buttons, form labels, nav links, footer. Never headings. */
export const body = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
