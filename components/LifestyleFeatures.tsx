"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Key, ShieldCheck, Building2, Landmark } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homeContent from "@/data/home_content.json";

interface LifestyleFeaturesProps {
  isEn?: boolean;
}

const ICONS = {
  finishing: Key,
  security: ShieldCheck,
  community: Building2,
  design: Landmark,
};

export default function LifestyleFeatures({ isEn = false }: LifestyleFeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const featData = homeContent.lifestyleFeatures;
  const langKey = isEn ? "en" : "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".features-headline",
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

      const tiles = sectionRef.current?.querySelectorAll(".features-tile");
      tiles?.forEach((tile, idx) => {
        gsap.fromTo(
          tile,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            delay: (idx % 2) * 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: tile,
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
      className="relative py-32 sm:py-48 lg:py-56 bg-background text-foreground"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Header matching reference site */}
        <header className="mx-auto mb-16 max-w-3xl text-center sm:mb-24 lg:mb-28">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] rtl:tracking-[0.08em] text-current/60">
            {featData.eyebrow[langKey]}
          </p>
          <h2
            id="features-headline"
            className="features-headline font-display mt-4 text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.08] tracking-tight rtl:leading-[1.24] font-semibold"
          >
            {featData.title[langKey]}
          </h2>
        </header>

        {/* 2x2 Grid Tiles matching reference site */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:gap-10">
          {featData.features.map((feat) => {
            const Icon = ICONS[feat.id as keyof typeof ICONS] || ShieldCheck;
            return (
              <article
                key={feat.id}
                className="features-tile group relative aspect-[4/3] overflow-hidden rounded-sm bg-neutral-900 shadow-[0_16px_40px_rgba(0,0,0,0.08)] border border-black/[0.08]"
              >
                <div className="features-mask absolute inset-0">
                  <Image
                    src={feat.image}
                    alt={feat.title[langKey]}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(20,17,15,0.88) 0%, rgba(20,17,15,0.45) 45%, rgba(20,17,15,0.08) 80%, transparent 100%)",
                    }}
                  />
                </div>

                {/* Circular Brand Badge at top-6 start-6 */}
                <span
                  aria-hidden="true"
                  className="absolute top-6 start-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_24px_rgba(152,15,15,0.35)] sm:top-8 sm:start-8 sm:h-13 sm:w-13 transition-transform duration-300 group-hover:scale-105"
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                </span>

                {/* Overlaid Content at bottom-6 start-6 end-6 */}
                <div className="features-content absolute bottom-6 start-6 end-6 text-white sm:bottom-8 sm:start-8 sm:end-8">
                  <h3 className="font-display text-[clamp(1.4rem,2.2vw,2rem)] leading-tight tracking-tight rtl:leading-[1.2] font-semibold">
                    {feat.title[langKey]}
                  </h3>
                  <p className="mt-2.5 max-w-md text-[14px] leading-relaxed text-white/80 font-normal sm:text-[15px]">
                    {feat.desc[langKey]}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
