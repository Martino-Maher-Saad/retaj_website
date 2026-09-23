"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import siteConfig from "@/data/site_config.json";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const navItems = isEn ? siteConfig.nav.en : siteConfig.nav.ar;
  const brandName = isEn ? siteConfig.brand.name_en : siteConfig.brand.name_ar;
  
  // Preserve sub-routes when switching language
  const langTarget = isEn
    ? pathname.replace(/^\/en/, "") || "/"
    : `/en${pathname === "/" ? "" : pathname}`;
  const langLabel = isEn ? "العربية" : "English";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[57] transition-[background-color,backdrop-filter,border-color,color] duration-150 border-b text-foreground ${
          isScrolled
            ? "border-neutral-200/80 bg-background/90 backdrop-blur-md shadow-xs"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-6 sm:h-[72px] sm:px-10 lg:px-14"
        >
          {/* Logo */}
          <Link
            href={isEn ? "/en" : "/"}
            aria-label={brandName}
            className="nav-logo relative inline-flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            <Image
              src="/logo-dark.svg"
              alt={brandName}
              width={130}
              height={47}
              className="h-7 w-auto sm:h-8 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navItems.map((item) => (
              <li key={item.href} className="nav-link-item">
                <Link
                  href={item.href}
                  className="nav-link text-[15px] font-medium tracking-tight text-foreground transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Controls */}
          <div className="nav-right flex items-center gap-3 sm:gap-4">
            <Link
              href={langTarget}
              aria-label="تبديل اللغة"
              className="nav-link hidden text-[15px] font-medium tracking-tight text-foreground transition-colors hover:text-brand sm:inline-block"
            >
              {langLabel}
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="relative -me-2 inline-flex h-10 w-10 items-center justify-center text-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:hidden cursor-pointer"
            >
              <span className="relative block h-[14px] w-5">
                <span
                  className={`absolute inset-x-0 top-0 block h-[2px] bg-current transition-transform duration-200 ${
                    isMobileMenuOpen ? "top-[6px] rotate-45" : ""
                  }`}
                  style={{ transformOrigin: "center" }}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 block h-[2px] bg-current transition-transform duration-200 ${
                    isMobileMenuOpen ? "bottom-[6px] -rotate-45" : ""
                  }`}
                  style={{ transformOrigin: "center" }}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen Mobile Menu */}
      <div
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-0 z-[56] flex flex-col bg-background pt-20 transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-6 pb-12 pt-8 sm:px-10">
          <ul className="flex flex-col gap-5">
            {navItems.map((item) => (
              <li key={item.href} className="mobile-link">
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display block text-[clamp(2.25rem,7vw,3.5rem)] leading-[1.05] tracking-tight text-foreground transition-colors hover:text-brand"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-link mt-10 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-6">
            <Link
              href={langTarget}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium tracking-wide text-foreground transition-colors hover:text-brand"
            >
              {langLabel}
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
              Madinet Masr
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
