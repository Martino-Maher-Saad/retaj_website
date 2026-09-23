"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DirectionManager() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");

  useEffect(() => {
    const html = document.documentElement;
    // Strict Light Mode across site
    html.classList.remove("dark");

    if (isEn) {
      html.setAttribute("lang", "en");
      html.setAttribute("dir", "ltr");
    } else {
      html.setAttribute("lang", "ar");
      html.setAttribute("dir", "rtl");
    }
  }, [isEn]);

  return null;
}
