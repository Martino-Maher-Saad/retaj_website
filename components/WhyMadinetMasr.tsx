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

  // Exact image swap animation from original chunk
  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(
      imgRef.current,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.55, ease: "expo.out" }
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

      // Left Image mask reveal
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
      className="relative overflow-hidden bg-[#171410] py-32 sm:py-48 lg:py-56 text-[#faf8f5]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="why-eyebrow text-[11px] font-medium uppercase tracking-[0.32em] text-[#b8b0a5] sm:text-xs">
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

        {/* 2-Column Interactive Pillars Layout */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Left Column: Dynamic Swapping Image & Content */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="why-image-mask relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#221d18]">
              <div ref={imgRef} className="relative h-full w-full">
                <Image
                  src={activePillar.image}
                  alt={activePillar.title[langKey]}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Description Text */}
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#b8b0a5] min-h-[4.5rem]">
              {activePillar.content[langKey]}
            </p>
          </div>

          {/* Right Column: 3 Clickable Pillar Titles */}
          <div className="lg:col-span-6 flex flex-col divide-y divide-white/10">
            {whyData.pillars.map((pillar, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={pillar.num}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className="group flex w-full items-start justify-between py-8 text-start transition-colors duration-300 focus:outline-none"
                >
                  <div className="flex items-start gap-6 sm:gap-8">
                    <span
                      className={`font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-300 ${
                        isActive ? "text-[#980f0f]" : "text-white/30 group-hover:text-white/60"
                      }`}
                    >
                      {pillar.num}
                    </span>

                    <div>
                      <h3
                        className={`font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight transition-all duration-300 ${
                          isActive
                            ? "text-white translate-x-1 rtl:-translate-x-1"
                            : "text-white/30 group-hover:text-white/70"
                        }`}
                      >
                        {pillar.title[langKey]}
                      </h3>

                      {/* Mobile inline content */}
                      {isActive && (
                        <p className="mt-4 text-sm leading-relaxed text-[#b8b0a5] lg:hidden">
                          {pillar.content[langKey]}
                        </p>
                      )}
                    </div>
                  </div>

                  <span
                    className={`text-lg transition-transform duration-300 ${
                      isActive
                        ? "text-[#980f0f] rotate-45"
                        : "text-white/20 group-hover:text-white/50"
                    }`}
                  >
                    +
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
