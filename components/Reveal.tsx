"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { mountReveal } from "@/lib/reveal";

/** Mounts the single reveal observer. One instance, in the root layout. */
export default function Reveal() {
  const pathname = usePathname();
  useEffect(() => mountReveal(), [pathname]);
  return null;
}
