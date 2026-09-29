"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface ProjectHeroProps {
  project: {
    name: { ar: string; en: string };
    hero: {
      eyebrow: { ar: string; en: string };
      title: { ar: string; en: string };
      subtitle: { ar: string; en: string };
      startingPriceText: { ar: string; en: string };
      downPayment: string;
      installmentYears: number;
      deliveryYears: number;
      cashDiscount: string;
      heroImage: string;
      heroVideo?: string;
    };
  };
  isEn?: boolean;
}

export default function ProjectHero({ project, isEn = false }: ProjectHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const langKey = isEn ? "en" : "ar";
  const { hero } = project;

  const mediaUrl = hero.heroVideo || hero.heroImage;
  const isVideo =
    mediaUrl &&
    (mediaUrl.endsWith(".webm") ||
      mediaUrl.endsWith(".mp4") ||
      mediaUrl.includes("/video/upload/"));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll("[data-hero-item='true']");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.08,
            ease: "expo.out",
            delay: 0.1,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        aria-labelledby="project-hero-name"
        className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-clip bg-[#14110f] text-white sm:min-h-[100svh] pb-24 sm:pb-40"
      >
        {/* Absolute Background Media (Video or Optimized Image) */}
        <div className="absolute inset-0 -z-10">
          {isVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            >
              <source
                src={mediaUrl}
                type={mediaUrl.endsWith(".mp4") ? "video/mp4" : "video/webm"}
              />
            </video>
          ) : (
            <Image
              src={mediaUrl}
              alt={hero.title[langKey]}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
          {/* Exact linear gradient overlay matching live site */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,17,15,0.25)_0%,rgba(20,17,15,0.15)_35%,rgba(20,17,15,0.78)_100%)] pointer-events-none"
          />
        </div>

        {/* Content Container */}
        <div className="mx-auto w-full max-w-7xl px-6 pt-28 sm:px-10 sm:pt-40 lg:px-14">
          <div className="mx-auto max-w-3xl text-center sm:mx-0 sm:text-start">
            <p
              data-hero-item="true"
              className="inline-block rounded-sm bg-black/50 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.25em] rtl:tracking-[0.08em] text-white/90 border border-white/10"
            >
              {hero.eyebrow[langKey]}
            </p>

            <h1
              id="project-hero-name"
              aria-label={`${project.name[langKey]} — ${hero.title[langKey]}`}
              className="font-display mt-6 leading-[1.0] tracking-tight rtl:leading-[1.18] sm:mt-7"
            >
              <span
                data-hero-item="true"
                className="block text-[clamp(2.6rem,8.5vw,6.5rem)] font-semibold text-white"
              >
                {project.name[langKey]}
              </span>
              <span
                data-hero-item="true"
                className="mt-2.5 block text-[clamp(1.4rem,2.4vw,2.2rem)] font-normal italic leading-[1.25] text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:mt-3"
              >
                {hero.title[langKey]}
              </span>
            </h1>

            <p
              data-hero-item="true"
              className="mx-auto mt-6 max-w-xl rounded-sm bg-black/45 backdrop-blur-md px-4 py-3 text-[14px] sm:text-[15px] font-normal leading-relaxed text-white/90 sm:mx-0 sm:mt-7 border border-white/10"
            >
              {hero.subtitle[langKey]}
            </p>

            <div
              data-hero-item="true"
              className="mt-8 flex justify-center sm:mt-10 sm:justify-start"
            >
              <a
                href="#apartments-pricing"
                className="inline-flex items-center gap-3 rounded-full bg-brand px-7 py-3 text-xs font-medium uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:bg-brand-hover hover:scale-105 cursor-pointer"
              >
                <span>{isEn ? "Explore Prices" : "اعرف الأسعار"}</span>
                <span aria-hidden="true" className="rtl:-scale-x-100">
                  ←
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom Card Matching Live Reference Exactly */}
      <div className="relative z-10 mx-auto -mt-16 w-full max-w-7xl px-6 sm:-mt-24 sm:px-10 lg:px-14">
        <div
          data-hero-item="true"
          className="mx-auto max-w-3xl rounded-sm border border-black/[0.08] bg-white p-4 text-center text-[#171410] shadow-[0_24px_60px_-20px_rgba(20,17,15,0.2)] sm:mx-0 sm:p-7 sm:text-start"
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-neutral-500">
                {isEn
                  ? `${project.name.en} Prices 2026`
                  : `أسعار ${project.name.ar} القاهرة الجديدة 2026`}
              </p>
              <p className="font-display mt-1 text-[clamp(1.25rem,4vw,2.4rem)] leading-none tracking-tight text-brand font-semibold tabular-nums">
                {isEn
                  ? `Prices start from ${hero.startingPriceText.en}`
                  : `أسعار تبدأ من ${hero.startingPriceText.ar}`}
              </p>
            </div>
            <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-brand px-3.5 py-1.5 text-[11px] sm:text-[12px] font-medium text-white shadow-xs">
              {isEn
                ? `Up to ${hero.cashDiscount} Cash Discount`
                : `خصم يصل إلى ${hero.cashDiscount} كاش`}
            </span>
          </div>

          <div className="mt-4 flex flex-col items-center gap-3 border-t border-neutral-100 pt-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:pt-4">
            <ul className="flex flex-wrap justify-center gap-1.5 sm:justify-start sm:gap-2">
              <li className="rounded-full border border-neutral-200/90 bg-neutral-50/60 px-3 py-1 text-[11px] font-medium tracking-[0.02em] text-neutral-700">
                {isEn
                  ? `Down payment from ${hero.downPayment}`
                  : `مقدم يبدأ من ${hero.downPayment}`}
              </li>
              <li className="rounded-full border border-neutral-200/90 bg-neutral-50/60 px-3 py-1 text-[11px] font-medium tracking-[0.02em] text-neutral-700">
                {isEn
                  ? `Installments up to ${hero.installmentYears} years`
                  : `أقساط حتى ${hero.installmentYears} سنة`}
              </li>
              <li className="rounded-full border border-neutral-200/90 bg-neutral-50/60 px-3 py-1 text-[11px] font-medium tracking-[0.02em] text-neutral-700">
                {isEn
                  ? "Delivered phases & under construction"
                  : "مراحل متسلمة وأخرى قيد الإنشاء"}
              </li>
              <li className="rounded-full border border-neutral-200/90 bg-neutral-50/60 px-3 py-1 text-[11px] font-medium tracking-[0.02em] text-neutral-700">
                {isEn
                  ? `Delivery from ${hero.deliveryYears} to 4 years`
                  : `تسليم من سنة إلى 4 سنوات`}
              </li>
            </ul>
            <a
              href="#apartments-pricing"
              className="hidden items-center gap-2 text-[13px] font-medium text-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:inline-flex cursor-pointer"
            >
              <span>{isEn ? "Explore Prices" : "اعرف الأسعار"}</span>
              <span aria-hidden="true" className="rtl:-scale-x-100">
                ←
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
