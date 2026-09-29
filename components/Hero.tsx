"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useLoader } from "@/components/LoaderContext";
import homeContent from "@/data/home_content.json";

interface HeroProps {
  isEn?: boolean;
}

export default function Hero({ isEn = false }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { isCurtainGone } = useLoader();
  const [activeSlide, setActiveSlide] = useState(0);

  const heroData = homeContent.hero;
  const langKey = isEn ? "en" : "ar";
  const currentSlide = heroData.slides[activeSlide] || heroData.slides[0];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroData.slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroData.slides.length]);

  // Exact reveal timeline matching reference site
  useEffect(() => {
    let tl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const lines = containerRef.current?.querySelectorAll(".reveal-line");

      if (!isCurtainGone) {
        if (lines) gsap.set(lines, { yPercent: 130 });
        gsap.set([".reveal-eyebrow", ".reveal-sub", ".reveal-cta", ".reveal-meta"], {
          y: 24,
          autoAlpha: 0,
        });
        gsap.set(".reveal-image-mask", { clipPath: "inset(100% 0 0 0)" });
        gsap.set(".reveal-image-inner", { scale: 1.18 });
      } else {
        tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });

        tl.to(".reveal-eyebrow", { y: 0, autoAlpha: 1, duration: 0.8 })
          .to(
            lines || [],
            { yPercent: 0, duration: 1.2, stagger: 0.045, ease: "expo.out" },
            "-=0.8"
          )
          .to(".reveal-sub", { y: 0, autoAlpha: 1, duration: 0.8 }, "-=0.8")
          .to(".reveal-cta", { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.6")
          .to(".reveal-meta", { y: 0, autoAlpha: 1, duration: 0.7 }, "-=0.5")
          .to(
            ".reveal-image-mask",
            { clipPath: "inset(0% 0 0 0)", duration: 1.8, ease: "expo.out" },
            "-=1.6"
          )
          .to(".reveal-image-inner", { scale: 1, duration: 2.2, ease: "expo.out" }, "<");
      }
    }, containerRef);

    return () => {
      tl?.kill();
      ctx.revert();
    };
  }, [isCurtainGone]);

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-clip bg-background text-foreground"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-24 pb-10 sm:px-10 sm:pt-28 sm:pb-12 lg:px-14 lg:pt-32">
        {/* Main Text Content */}
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="reveal-eyebrow text-[11px] font-medium uppercase tracking-[0.32em] text-neutral-500 sm:text-xs">
            {heroData.eyebrow[langKey]}
          </p>

          <h1
            id="hero-title"
            aria-label={`${heroData.titleLine1[langKey]} ${heroData.titleLine2[langKey]}`}
            className="font-display mt-6 text-[clamp(2.5rem,6.5vw,5.75rem)] leading-[1.02] tracking-tight text-foreground rtl:leading-[1.22] sm:mt-8 font-medium sm:font-semibold"
          >
            <span className="block overflow-hidden py-[0.2em]">
              <span className="reveal-line block">
                {heroData.titleLine1[langKey]}
              </span>
            </span>
            <span className="block overflow-hidden py-[0.2em]">
              <span className="reveal-line block italic text-brand" style={{ fontStyle: "italic" }}>
                {heroData.titleLine2[langKey]}
              </span>
            </span>
          </h1>

          <p className="reveal-sub mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-neutral-600 sm:mt-8 sm:text-base">
            {heroData.description[langKey]}
          </p>

          <div className="reveal-cta mt-8 flex justify-center sm:mt-10">
            <a
              href={heroData.ctaLink}
              className="group inline-flex items-center gap-3 border-b border-foreground/70 pb-1.5 text-sm font-medium tracking-wide text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand cursor-pointer"
            >
              <span>{heroData.ctaText[langKey]}</span>
              <svg
                width="22"
                height="10"
                viewBox="0 0 22 10"
                fill="none"
                aria-hidden="true"
                className={`transition-transform duration-300 ${
                  isEn ? "group-hover:translate-x-1" : "-scale-x-100 group-hover:-translate-x-1"
                }`}
              >
                <path
                  d="M1 5h20m0 0L17 1m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Hero Preview Figure matching reference site */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <figure className="relative">
            <div className="reveal-image-mask group relative block aspect-[16/9] w-full overflow-hidden rounded-sm bg-neutral-100 shadow-sm">
              <div className="reveal-image-inner absolute inset-0">
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title[langKey]}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 90vw, 100vw"
                  className="object-cover transition-opacity duration-700 ease-out"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(20,17,15,0.18) 0%, transparent 35%)",
                  }}
                />
              </div>
            </div>

            {/* Slide Navigation Bars */}
            <div className="reveal-meta mt-4 flex gap-1.5" role="tablist" aria-label="أبرز المشاريع">
              {heroData.slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === idx}
                  aria-label={s.title[langKey]}
                  onClick={() => setActiveSlide(idx)}
                  className="group relative h-[3px] flex-1 overflow-hidden rounded-full bg-neutral-200/80 transition-colors hover:bg-neutral-300 focus-visible:outline-2 focus-visible:outline-brand cursor-pointer"
                >
                  <span
                    className={`block h-full origin-left rtl:origin-right transition-transform duration-500 ${
                      activeSlide === idx ? "bg-brand scale-x-100" : "bg-transparent scale-x-0"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Caption & Counter */}
            <figcaption className="reveal-meta mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-neutral-500">
              <span className="font-medium text-foreground">{currentSlide.title[langKey]}</span>
              <span className="font-mono text-[10px] tracking-normal">{currentSlide.counter}</span>
            </figcaption>
          </figure>
        </div>

        {/* Hero Footer Meta */}
        <div className="reveal-meta mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-6 text-[11px] uppercase tracking-[0.22em] text-neutral-500 sm:mt-16">
          <span className="font-mono text-[10px] tracking-normal text-neutral-300">
            © <span className="text-neutral-500">{heroData.copyright}</span>
          </span>
          <span className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-neutral-300" aria-hidden="true" />
            {heroData.scrollHint[langKey]}
          </span>
        </div>
      </div>
    </section>
  );
}
