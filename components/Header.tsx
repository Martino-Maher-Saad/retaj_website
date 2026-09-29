"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import siteConfig from "@/data/site_config.json";
import { useLoader } from "@/components/LoaderContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isCurtainGone } = useLoader();

  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const navItems = isEn ? siteConfig.nav.en : siteConfig.nav.ar;
  const brandName = isEn ? siteConfig.brand.name_en : siteConfig.brand.name_ar;

  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Preserve sub-routes when switching language
  const langTarget = isEn
    ? pathname.replace(/^\/en/, "") || "/"
    : `/en${pathname === "/" ? "" : pathname}`;
  const langLabel = isEn ? "العربية" : "English";

  // Dynamic scroll listener with RAF matching original site
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Entrance animation matching original site:
  // .nav-logo: y: -14 -> 0
  // .nav-link-item: y: 18 -> 0 (from below)
  // .nav-right > *: y: -14 -> 0
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set([".nav-logo", ".nav-link-item", ".nav-right > *"], { y: 0, autoAlpha: 1 });
      return;
    }

    if (!isCurtainGone) {
      // Set initial hidden positions
      gsap.set(".nav-logo", { y: -14, autoAlpha: 0 });
      gsap.set(".nav-link-item", { y: 18, autoAlpha: 0 });
      gsap.set(".nav-right > *", { y: -14, autoAlpha: 0 });
    } else {
      // Run the entrance timeline exactly matching original site timings
      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "expo.out" } });
      tl.to(".nav-logo", { y: 0, autoAlpha: 1, duration: 0.9 })
        .to(".nav-link-item", { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.07 }, "-=0.55")
        .to(".nav-right > *", { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08 }, "-=0.55");
    }
  }, [isCurtainGone]);

  // Language switch re-entrance animation
  useEffect(() => {
    if (!isCurtainGone) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      ".nav-link-item",
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.65, stagger: 0.05, ease: "expo.out" }
    );
    gsap.fromTo(
      ".nav-right > *",
      { y: -10, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out" }
    );
  }, [pathname, isCurtainGone]);

  // Mobile menu GSAP animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    const menuEl = mobileMenuRef.current;
    const links = menuEl.querySelectorAll(".mobile-link");

    const tl = gsap.timeline({ paused: true });
    tl.fromTo(
      menuEl,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
    ).fromTo(
      links,
      { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.06, ease: "expo.out" },
      "-=0.2"
    );

    mobileTimelineRef.current = tl;
  }, []);

  useEffect(() => {
    const tl = mobileTimelineRef.current;
    if (!tl) return;
    if (isMobileMenuOpen) {
      tl.play();
      document.body.style.overflow = "hidden";
    } else {
      tl.reverse();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLanguageSwitch = () => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-[57] transition-[background-color,backdrop-filter,border-color,color] duration-150 border-b border-neutral-200/80 bg-[#faf8f5]/95 text-foreground backdrop-blur-md ${
          isScrolled ? "shadow-sm" : "shadow-xs"
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
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && item.href !== "/en" && pathname.startsWith(item.href));
              return (
                <li key={item.href} className="nav-link-item">
                  <Link
                    href={item.href}
                    className={`nav-link text-[14px] xl:text-[15px] transition-colors py-1 tracking-tight ${
                      isActive
                        ? "text-brand font-semibold border-b-[1.5px] border-brand"
                        : "font-medium text-foreground/90 hover:text-brand"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Controls */}
          <div className="nav-right flex items-center gap-3 sm:gap-4">
            <Link
              href={langTarget}
              onClick={handleLanguageSwitch}
              aria-label="تبديل اللغة"
              className="nav-link hidden text-[14px] font-medium tracking-tight text-foreground/90 transition-colors hover:text-brand sm:inline-flex items-center cursor-pointer"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand me-2" />
              <span>{langLabel}</span>
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
        ref={mobileMenuRef}
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-0 z-[56] flex flex-col bg-background pt-20 transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-6 pb-12 pt-8 sm:px-10">
          <ul className="flex flex-col gap-5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="mobile-link">
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-display block text-[clamp(2rem,6.5vw,3.25rem)] leading-[1.1] tracking-tight transition-colors hover:text-brand font-medium ${
                      isActive ? "text-brand" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mobile-link mt-10 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-6">
            <Link
              href={langTarget}
              onClick={handleLanguageSwitch}
              className="text-sm font-medium tracking-wide text-foreground transition-colors hover:text-brand"
            >
              {langLabel}
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400">
              {brandName}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
