"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homeContent from "@/data/home_content.json";

interface WhyMadinetMasrProps {
  isEn?: boolean;
}

interface Pillar {
  num: string;
  title: { ar: string; en: string };
  content: { ar: string; en: string };
  image: string;
  badges?: string[];
}

export default function WhyMadinetMasr({ isEn = false }: WhyMadinetMasrProps) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const whyData = homeContent.whyMadinetMasr;
  const langKey = isEn ? "en" : "ar";
  const activePillar: Pillar = (whyData.pillars as Pillar[])[activeTab] || (whyData.pillars as Pillar[])[0];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-headline",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why"
      ref={sectionRef}
      aria-labelledby="why-headline"
      className="relative py-32 sm:py-48 lg:py-56 bg-background text-foreground"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Header */}
        <header className="mb-16 text-center sm:mb-24 lg:mb-28">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] rtl:tracking-[0.08em] text-current/60">
            {whyData.eyebrow[langKey]}
          </p>
          <h2
            id="why-headline"
            className="why-headline font-display mx-auto mt-4 max-w-3xl text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.08] tracking-tight rtl:leading-[1.24] font-semibold"
          >
            {whyData.title[langKey]}
          </h2>
        </header>

        {/* Desktop 12-Column Grid Layout Matching Reference Site */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column (5 cols): 3 Pillars List */}
          <ul className="lg:col-span-5">
            {whyData.pillars.map((pillar, idx) => {
              const isActive = activeTab === idx;
              return (
                <li key={pillar.num} className="why-pillar">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveTab(idx)}
                    className={`group block w-full border-t border-current/10 py-7 text-start transition-opacity duration-500 cursor-pointer ${
                      idx === whyData.pillars.length - 1 ? "border-b" : ""
                    } ${isActive ? "opacity-100" : "opacity-40 hover:opacity-75"}`}
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="text-xs font-medium tracking-[0.2em] text-brand tabular-nums">
                        {pillar.num}
                      </span>
                      <h3 className="font-display text-[clamp(1.85rem,3.5vw,3rem)] leading-[1.1] tracking-tight rtl:leading-[1.2] font-semibold text-foreground">
                        {pillar.title[langKey]}
                      </h3>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right Column (7 cols): Image Container & Content */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-100 shadow-[0_16px_40px_rgba(0,0,0,0.06)] border border-black/[0.06]">
              {whyData.pillars.map((pillar, idx) => (
                <div
                  key={pillar.num}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    activeTab === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={pillar.image}
                    alt={pillar.title[langKey]}
                    fill
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className="object-cover"
                    priority={idx === 0}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(20,17,15,0.40)] via-transparent to-transparent"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <p className="max-w-xl text-[15px] leading-relaxed text-current/75 sm:text-base font-normal">
                {activePillar.content[langKey]}
              </p>

              {/* Badges for Delivery pillar */}
              {Boolean(activePillar.badges && activePillar.badges.length > 0) && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {activePillar.badges?.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="inline-flex items-center rounded-full border border-current/15 px-3 py-1 text-[11px] font-medium tracking-[0.04em] text-current/80 bg-current/[0.02]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile View Matching Reference Site */}
        <div className="space-y-16 lg:hidden">
          {(whyData.pillars as Pillar[]).map((pillar) => (
            <article key={pillar.num} className="why-pillar">
              <div className="flex items-baseline gap-4">
                <span className="text-xs font-medium tracking-[0.2em] text-brand tabular-nums">
                  {pillar.num}
                </span>
                <h3 className="font-display text-[clamp(1.75rem,6vw,2.5rem)] leading-[1.1] tracking-tight rtl:leading-[1.2] font-semibold">
                  {pillar.title[langKey]}
                </h3>
              </div>

              <div className="why-mobile-image relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-sm bg-neutral-100 border border-black/[0.06]">
                <Image
                  src={pillar.image}
                  alt={pillar.title[langKey]}
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
              </div>

              <p className="mt-5 text-[15px] leading-relaxed text-current/75 font-normal">
                {pillar.content[langKey]}
              </p>

              {Boolean(pillar.badges && pillar.badges.length > 0) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {pillar.badges?.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="inline-flex items-center rounded-full border border-current/15 px-3 py-1 text-[11px] font-medium tracking-[0.04em] text-current/80 bg-current/[0.02]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
