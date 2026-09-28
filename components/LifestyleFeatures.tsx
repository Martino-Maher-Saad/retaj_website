"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ShieldCheck, Key, Building2, Users } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WordScrubText from "@/components/WordScrubText";
import homeContent from "@/data/home_content.json";

interface LifestyleFeaturesProps {
  isEn?: boolean;
}

const ICONS = {
  ShieldCheck,
  Key,
  Building2,
  Users,
};

export default function LifestyleFeatures({ isEn = false }: LifestyleFeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const featData = homeContent.lifestyleFeatures;
  const langKey = isEn ? "en" : "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Eyebrow reveal
      gsap.fromTo(
        ".features-eyebrow",
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

      // Card reveals
      const cardEls = sectionRef.current?.querySelectorAll(".feature-card-item");
      cardEls?.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { y: 35, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            delay: idx * 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      aria-labelledby="features-headline"
      className="relative overflow-hidden bg-[#faf8f5] py-28 sm:py-36 lg:py-48 text-[#171410]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="features-eyebrow text-[11px] font-medium uppercase tracking-[0.32em] text-neutral-500 sm:text-xs">
            {featData.eyebrow[langKey]}
          </p>

          <WordScrubText
            id="features-headline"
            as="h2"
            className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-[#171410]"
          >
            {featData.title[langKey]}
          </WordScrubText>
        </div>

        {/* 2x2 Feature Grid Matching Video at 01:26 - 01:31 */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {featData.features.map((feat) => {
            const Icon = ICONS[feat.icon as keyof typeof ICONS] || ShieldCheck;
            return (
              <div
                key={feat.id}
                className="feature-card-item group relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-900 shadow-xl border border-neutral-200"
              >
                {/* Background Image */}
                <Image
                  src={feat.image}
                  alt={feat.title[langKey]}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle Gradient Overlays */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"
                />

                {/* Red Circular Icon Badge at Top-End Corner matching video */}
                <div className="absolute top-5 end-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#980f0f] text-white shadow-lg shadow-[#980f0f]/40 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} strokeWidth={2.2} />
                </div>

                {/* Bottom Content Overlaid on Card */}
                <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8 text-white flex flex-col gap-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-md">
                    {feat.title[langKey]}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] leading-relaxed text-neutral-200/90 max-w-lg">
                    {feat.desc[langKey]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
