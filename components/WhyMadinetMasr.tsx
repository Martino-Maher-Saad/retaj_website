"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WordScrubText from "@/components/WordScrubText";
import homeContent from "@/data/home_content.json";

interface WhyMadinetMasrProps {
  isEn?: boolean;
}

export default function WhyMadinetMasr({ isEn = false }: WhyMadinetMasrProps) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const whyData = homeContent.whyMadinetMasr;
  const langKey = isEn ? "en" : "ar";
  const activePillar = whyData.pillars[activeTab] || whyData.pillars[0];

  // Image and text swap animation on tab switch
  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(
      imgRef.current,
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "expo.out" }
    );
    gsap.fromTo(
      ".why-content-text",
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.45, ease: "expo.out" }
    );
  }, [activeTab]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Eyebrow reveal
      gsap.fromTo(
        ".why-eyebrow",
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Image container reveal
      gsap.fromTo(
        ".why-image-mask",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.4,
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
      className="relative overflow-hidden bg-[#0d0c0b] py-28 sm:py-36 lg:py-48 text-[#faf8f5]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Header matching video */}
        <div className="max-w-3xl">
          <p className="why-eyebrow text-[11px] font-medium uppercase tracking-[0.32em] text-neutral-400 sm:text-xs">
            {whyData.eyebrow[langKey]}
          </p>

          <WordScrubText
            id="why-headline"
            as="h2"
            className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-white"
          >
            {whyData.title[langKey]}
          </WordScrubText>
        </div>

        {/* 2-Column Layout matching video at 01:11 - 01:16 */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Dynamic Display Side (Left in RTL, Right in LTR) */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
            <div className="why-image-mask relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#221d18] shadow-2xl border border-white/10">
              <div ref={imgRef} className="relative h-full w-full">
                <Image
                  src={activePillar.image}
                  alt={activePillar.title[langKey]}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Description Text */}
            <div className="why-content-text flex flex-col gap-4">
              <p className="text-[15px] sm:text-[17px] leading-relaxed text-neutral-300">
                {activePillar.content[langKey]}
              </p>

              {/* Delivered Community Badges (Shown when badges array exists, e.g. Pillar 3) */}
              {"badges" in activePillar && Array.isArray((activePillar as any).badges) && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {((activePillar as any).badges as string[]).map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="rounded-full border border-white/15 bg-white/05 px-3.5 py-1 text-xs font-medium text-neutral-300 backdrop-blur-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Clean Tabs Side (Right in RTL, Left in LTR) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 order-1 lg:order-2">
            {whyData.pillars.map((pillar, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={pillar.num}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className="group relative flex items-center justify-between text-start transition-all duration-300 focus:outline-none cursor-pointer py-2"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#980f0f] scale-100 shadow-[0_0_12px_#980f0f]"
                          : "bg-transparent scale-0"
                      }`}
                    />
                    <h3
                      className={`font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight transition-all duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-neutral-500 hover:text-neutral-300"
                      }`}
                    >
                      {pillar.title[langKey]}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
