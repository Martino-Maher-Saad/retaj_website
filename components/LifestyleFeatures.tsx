"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ShieldCheck, Compass, Building2, Paintbrush } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WordScrubText from "@/components/WordScrubText";
import homeContent from "@/data/home_content.json";

interface LifestyleFeaturesProps {
  isEn?: boolean;
}

const ICONS = {
  Paintbrush,
  ShieldCheck,
  Building2,
  Compass,
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

      // Card reveals matching original chunk
      const cardEls = sectionRef.current?.querySelectorAll(".feature-card-item");
      cardEls?.forEach((card, idx) => {
        const mask = card.querySelector(".features-image-mask");
        const content = card.querySelector(".features-content");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
          delay: 0.08 * (idx % 2 !== 0 ? 1 : 0),
        });

        if (mask) {
          tl.fromTo(
            mask,
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "expo.out" }
          );
        }
        if (content) {
          tl.fromTo(
            content,
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, ease: "expo.out" },
            "-=0.6"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      aria-labelledby="features-headline"
      className="relative overflow-hidden bg-[#faf8f5] py-32 sm:py-48 lg:py-56 text-[#171410]"
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

        {/* 2x2 Feature Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-12">
          {featData.features.map((feat) => {
            const Icon = ICONS[feat.icon as keyof typeof ICONS] || ShieldCheck;
            return (
              <div key={feat.id} className="feature-card-item flex flex-col gap-4">
                {/* Image Box */}
                <div className="features-image-mask relative aspect-[16/10] overflow-hidden rounded-sm bg-neutral-100">
                  <Image
                    src={feat.image}
                    alt={feat.title[langKey]}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14110f]/60 via-transparent to-transparent"
                  />

                  {/* Icon badge top-start */}
                  <div className="absolute top-4 start-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#980f0f] shadow-md backdrop-blur-sm">
                    <Icon size={20} strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div className="features-content mt-2 flex flex-col gap-2">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-[#171410]">
                    {feat.title[langKey]}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-neutral-600">
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
