"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap } from "gsap";

interface HeroProps {
  isEn?: boolean;
}

export default function Hero({ isEn = false }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial GSAP states exactly matching original site
      gsap.set(".reveal-line", { yPercent: 130 });
      gsap.set([".reveal-eyebrow", ".reveal-sub", ".reveal-cta", ".reveal-meta"], {
        y: 24,
        autoAlpha: 0,
      });
      gsap.set(".reveal-image-mask", {
        clipPath: "inset(100% 0 0 0)",
      });
      gsap.set(".reveal-image-inner", { scale: 1.18 });

      // Exact GSAP Timeline Choreography
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });

      tl.to(".reveal-eyebrow", { y: 0, autoAlpha: 1, duration: 0.8 })
        .to(
          ".reveal-line",
          { yPercent: 0, duration: 1.2, stagger: 0.06, ease: "expo.out" },
          "-=0.5"
        )
        .to(".reveal-sub", { y: 0, autoAlpha: 1, duration: 0.9 }, "-=0.8")
        .to(".reveal-cta", { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.6")
        .to(".reveal-meta", { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.5")
        .to(
          ".reveal-image-mask",
          { clipPath: "inset(0% 0 0 0)", duration: 1.8, ease: "expo.out" },
          "-=1.6"
        )
        .to(
          ".reveal-image-inner",
          { scale: 1, duration: 2.2, ease: "expo.out" },
          "<"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-clip bg-[#faf8f5] text-[#171410]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-28 pb-10 sm:px-10 sm:pt-32 sm:pb-12 lg:px-14 lg:pt-36">
        {/* Main Text Content */}
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="reveal-eyebrow text-[11px] font-medium uppercase tracking-[0.32em] text-[#736d65] sm:text-xs">
            {isEn ? "Madinet Masr · Est. 1959" : "مدينة مصر · تأسست ١٩٥٩"}
          </p>

          <h1
            id="hero-title"
            aria-label={isEn ? "Building the Future For 65 Years." : "نبني المستقبل منذ ٦٥ عاماً."}
            className="mt-6 text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold leading-[1.0] tracking-tight text-[#171410] rtl:leading-[1.2] sm:mt-8 font-display"
          >
            <span className="block overflow-hidden py-[0.1em]">
              <span className="reveal-line block">
                {isEn ? "Building the Future" : "نبني المستقبل"}
              </span>
            </span>
            <span className="block overflow-hidden py-[0.1em]">
              <span
                className="reveal-line block italic text-[#980f0f]"
                style={{ fontStyle: "italic" }}
              >
                {isEn ? "For 65 Years." : "منذ ٦٥ عاماً."}
              </span>
            </span>
          </h1>

          <p className="reveal-sub mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[#4a453e] sm:mt-8 sm:text-base">
            {isEn
              ? "Since 1959, we build communities, not just units. Discover our premier developments in New Cairo, Mostakbal City, and New Heliopolis."
              : "منذ عام 1959، نبني مجتمعات لا مجرد وحدات. اكتشف أرقى مشاريعنا في قلب القاهرة الجديدة، مدينة المستقبل، وهليوبوليس الجديدة."}
          </p>

          <div className="reveal-cta mt-8 flex justify-center sm:mt-10">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 border-b border-[#171410]/80 pb-1.5 text-sm font-medium tracking-wide text-[#171410] transition-colors hover:border-[#980f0f] hover:text-[#980f0f]"
            >
              <span>{isEn ? "Discover Projects" : "اكتشف المشاريع"}</span>
              <svg
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100"
                fill="none"
                height="10"
                viewBox="0 0 22 10"
                width="22"
              >
                <path
                  d="M1 5h20m0 0L17 1m4 4l-4 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Hero Architectural Framed Image Showcase */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <figure className="relative">
            <div className="reveal-image-mask group relative block aspect-[16/9] w-full overflow-hidden rounded-xl shadow-2xl bg-[#eae5de]">
              <div className="reveal-image-inner absolute inset-0">
                <Image
                  src="https://res.cloudinary.com/izrnyvya/image/upload/f_auto,q_auto/yWWTX7lN__oJ.webp"
                  alt={isEn ? "Taj City — New Cairo" : "تاج سيتي — القاهرة الجديدة"}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>

            <figcaption className="reveal-meta mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-[#736d65]">
              <span className="font-semibold text-[#171410]">
                {isEn ? "Taj City — New Cairo" : "تاج سيتي — القاهرة الجديدة"}
              </span>
              <span className="font-mono text-[10px] tracking-wider text-[#980f0f]">
                {isEn ? "Live Community" : "مجتمع سكني متكامل"}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
