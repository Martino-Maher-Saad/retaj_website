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
        <header className="mb-20 text-center sm:mb-28 lg:mb-32">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-current/60">
            {whyData.eyebrow[langKey]}
          </p>
          <h2
            id="why-headline"
            className="why-headline font-display mx-auto mt-6 max-w-3xl text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-tight rtl:leading-[1.25] font-bold"
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
                    className={`group block w-full border-t border-current/15 py-8 text-start transition-opacity duration-500 cursor-pointer ${
                      idx === whyData.pillars.length - 1 ? "border-b" : ""
                    } ${isActive ? "opacity-100" : "opacity-40 hover:opacity-75"}`}
                  >
                    <div className="flex items-baseline gap-6">
                      <span className="font-mono text-xs tracking-[0.22em] text-brand font-bold">
                        {pillar.num}
                      </span>
                      <h3 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-tight rtl:leading-[1.2] font-bold text-foreground">
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
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-100 shadow-xl">
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
              <p className="max-w-xl text-[15px] leading-relaxed text-current/80 sm:text-base">
                {activePillar.content[langKey]}
              </p>

              {/* Badges for Delivery pillar */}
              {Boolean(activePillar.badges && activePillar.badges.length > 0) && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {activePillar.badges?.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="inline-flex items-center rounded-full border border-current/20 px-3 py-1 text-[10px] font-medium tracking-tight"
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
        <div className="space-y-20 lg:hidden">
          {(whyData.pillars as Pillar[]).map((pillar) => (
            <article key={pillar.num} className="why-pillar">
              <div className="flex items-baseline gap-5">
                <span className="font-mono text-[11px] tracking-[0.22em] text-brand font-bold">
                  {pillar.num}
                </span>
                <h3 className="font-display text-[clamp(2rem,7vw,3rem)] leading-[1.1] tracking-tight rtl:leading-[1.2] font-bold">
                  {pillar.title[langKey]}
                </h3>
              </div>

              <div className="why-mobile-image relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-sm bg-neutral-100">
                <Image
                  src={pillar.image}
                  alt={pillar.title[langKey]}
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
              </div>

              <p className="mt-6 text-[15px] leading-relaxed text-current/80">
                {pillar.content[langKey]}
              </p>

              {Boolean(pillar.badges && pillar.badges.length > 0) && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {pillar.badges?.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="inline-flex items-center rounded-full border border-current/20 px-3 py-1 text-[10px] font-medium tracking-tight"
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
