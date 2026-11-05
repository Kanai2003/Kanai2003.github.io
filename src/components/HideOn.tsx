"use client";

import { usePathname } from "next/navigation";

/** Renders children everywhere except the given paths. */
export default function HideOn({ paths, children }: { paths: string[]; children: React.ReactNode }) {
  const path = usePathname();
  return paths.includes(path) ? null : <>{children}</>;
}
