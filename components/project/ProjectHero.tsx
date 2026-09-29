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
  const cardRef = useRef<HTMLDivElement>(null);
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
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".hero-text-elem",
        { y: 35, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, delay: 0.15 }
      ).fromTo(
        cardRef.current,
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.85, ease: "power3.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 bg-[#171410] text-white overflow-hidden"
    >
      {/* Background Media (Video or Image) */}
      <div className="absolute inset-0 z-0">
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-60"
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
            className="object-cover opacity-60 scale-105 transition-transform duration-1000 ease-out"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#171410]/80 via-black/40 to-black/60 pointer-events-none"
        />
      </div>

      {/* Main Hero Content Matching 1.PNG */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 flex-1 flex flex-col justify-center">
        {/* Eyebrow Tag as Dark Pill */}
        <div className="hero-text-elem inline-flex items-center">
          <span className="inline-flex items-center rounded-full bg-black/65 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md border border-white/10">
            {hero.eyebrow[langKey]}
          </span>
        </div>

        {/* Project Huge Display Title */}
        <h1 className="hero-text-elem font-display mt-5 max-w-4xl text-[clamp(3.5rem,8vw,6.5rem)] font-bold leading-none tracking-tight text-white drop-shadow-md">
          {project.name[langKey]}
        </h1>

        {/* Subtitle */}
        <p className="hero-text-elem font-display mt-3 max-w-3xl text-[clamp(1.5rem,3.2vw,2.5rem)] font-bold text-white drop-shadow-sm">
          {hero.title[langKey]}
        </p>

        {/* Description in Translucent Glass Box Matching 1.PNG */}
        <div className="hero-text-elem mt-6 max-w-xl rounded-lg bg-black/65 p-4 sm:p-5 backdrop-blur-md border border-white/15 text-xs sm:text-sm leading-relaxed text-white">
          {hero.subtitle[langKey]}
        </div>

        {/* Red CTA Button */}
        <div className="hero-text-elem mt-7">
          <a
            href="#pricing"
            className="inline-flex items-center gap-3 rounded-full bg-brand px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-xl transition-all duration-300 hover:bg-[#7b0c0c] hover:scale-105"
          >
            <span>{isEn ? "Explore Prices" : "اعرف الأسعار"}</span>
            <span aria-hidden="true" className="rtl:-scale-x-100">
              ←
            </span>
          </a>
        </div>
      </div>

      {/* Floating Bottom Card Matching 2.PNG */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 mt-12 sm:mt-16">
        <div
          ref={cardRef}
          className="rounded-md border border-neutral-100 bg-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-[#171410]"
        >
          {/* Top Line: Small Gray Text */}
          <p className="text-xs text-neutral-400">
            {isEn
              ? `${project.name.en} Prices 2026`
              : `أسعار ${project.name.ar} القاهرة الجديدة 2026`}
          </p>

          {/* Price Heading + Red Discount Badge Beside It */}
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-display text-3xl font-bold tracking-tight text-brand sm:text-5xl">
              {isEn
                ? `Prices start from ${hero.startingPriceText.en}`
                : `أسعار تبدأ من ${hero.startingPriceText.ar}`}
            </h2>

            <div className="inline-flex items-center self-start sm:self-auto rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-white shadow-md">
              {isEn
                ? `Up to ${hero.cashDiscount} Cash Discount`
                : `خصم يصل إلى ${hero.cashDiscount} كاش`}
            </div>
          </div>

          {/* Thin Separator */}
          <div className="my-5 h-px w-full bg-neutral-100" />

          {/* Bottom Row: Rounded Outline Terms Pills & Red Link on End */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-700">
              <span className="rounded-full border border-neutral-200 px-3.5 py-1.5 font-medium bg-neutral-50/50">
                {isEn
                  ? `Down payment from ${hero.downPayment}`
                  : `مقدم يبدأ من ${hero.downPayment}`}
              </span>
              <span className="rounded-full border border-neutral-200 px-3.5 py-1.5 font-medium bg-neutral-50/50">
                {isEn
                  ? `Installments up to ${hero.installmentYears} years`
                  : `أقساط حتى ${hero.installmentYears} سنة`}
              </span>
              <span className="rounded-full border border-neutral-200 px-3.5 py-1.5 font-medium bg-neutral-50/50">
                {isEn
                  ? "Delivered phases & under construction"
                  : "مراحل متسلمة وأخرى قيد الإنشاء"}
              </span>
              <span className="rounded-full border border-neutral-200 px-3.5 py-1.5 font-medium bg-neutral-50/50">
                {isEn
                  ? `Delivery from ${hero.deliveryYears} to 4 years`
                  : `تسليم من سنة إلى 4 سنوات`}
              </span>
            </div>

            <a
              href="#pricing"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
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
  );
}
