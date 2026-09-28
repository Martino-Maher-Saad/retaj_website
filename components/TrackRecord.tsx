"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homeContent from "@/data/home_content.json";

interface TrackRecordProps {
  isEn?: boolean;
}

export default function TrackRecord({ isEn = false }: TrackRecordProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeItem, setActiveItem] = useState(0);

  const trackData = homeContent.trackRecord;
  const langKey = isEn ? "en" : "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".track-eyebrow",
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

      gsap.fromTo(
        ".track-title",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".track-card-row",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".track-cards-list",
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
      id="track"
      ref={sectionRef}
      aria-labelledby="track-headline"
      className="relative overflow-hidden bg-[#faf8f5] py-28 sm:py-36 lg:py-48 text-[#171410]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Section Header matching video at 01:17 - 01:18 */}
        <div className="max-w-3xl">
          <p className="track-eyebrow text-[11px] font-medium uppercase tracking-[0.32em] text-neutral-500 sm:text-xs">
            {trackData.eyebrow[langKey]}
          </p>

          <h2
            id="track-headline"
            className="track-title mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-[#171410]"
          >
            <span className="block">{trackData.titleLine1[langKey]}</span>
            <span className="block italic text-[#980f0f]">{trackData.titleLine2[langKey]}</span>
          </h2>

          <p className="mt-6 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-neutral-700">
            {trackData.description[langKey]}
          </p>
        </div>

        {/* Vertical Stacked Cards Matching Video at 01:19 - 01:24 */}
        <div className="track-cards-list mt-14 sm:mt-20 flex flex-col gap-6 sm:gap-8">
          {trackData.communities.map((comm, idx) => {
            const isHovered = activeItem === idx;
            return (
              <div
                key={comm.num}
                onMouseEnter={() => setActiveItem(idx)}
                className={`track-card-row group relative overflow-hidden rounded-2xl bg-neutral-900 transition-all duration-700 cursor-pointer shadow-lg ${
                  isHovered
                    ? "h-[340px] sm:h-[440px] lg:h-[500px]"
                    : "h-[160px] sm:h-[220px] lg:h-[260px]"
                }`}
              >
                <Image
                  src={comm.image}
                  alt={comm.name[langKey]}
                  fill
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  priority={idx === 0}
                />

                {/* Vignette Gradients */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"
                />

                {/* Bottom Overlay Info Matching Video */}
                <div className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-10 flex items-end justify-between text-white">
                  <div>
                    <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md">
                      {comm.name[langKey]}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-black/40 border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-md">
                      {comm.location[langKey]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
