"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Landmark {
  name: { ar: string; en: string };
  time: string;
}

interface ProjectLocationProps {
  projectName: { ar: string; en: string };
  locationSection: {
    headline: { ar: string; en: string };
    description: { ar: string; en: string };
    landmarks: Landmark[];
  };
  isEn?: boolean;
}

export default function ProjectLocation({
  projectName,
  locationSection,
  isEn = false,
}: ProjectLocationProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const langKey = isEn ? "en" : "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(
        ".loc-text-elem",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Radar rings pulse in
      const rings = radarRef.current?.querySelectorAll(".radar-ring");
      const tags = radarRef.current?.querySelectorAll(".radar-landmark");

      if (rings && tags) {
        gsap.fromTo(
          rings,
          { scale: 0.6, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: radarRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          tags,
          { y: 15, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: radarRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pre-calculated orbital positions matching reference screenshot 3.PNG
  const orbitalPositions = [
    "top-[8%] start-[20%]",
    "top-[22%] end-[16%]",
    "top-[50%] end-[12%]",
    "bottom-[14%] end-[22%]",
    "bottom-[22%] start-[10%]",
    "top-[32%] start-[2%]",
    "top-[0%] start-[38%]",
  ];

  return (
    <section
      ref={sectionRef}
      id="location"
      className="relative py-24 sm:py-32 lg:py-40 bg-[#faf8f5] text-[#171410] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Radar Circles Visual Matching 3.PNG - 6 Cols */}
          <div
            ref={radarRef}
            className="order-2 lg:order-1 lg:col-span-6 flex items-center justify-center"
          >
            <div className="relative aspect-square w-full max-w-[500px] flex items-center justify-center">
              {/* Concentric Orbit Rings with delicate borders */}
              <div className="radar-ring absolute inset-0 rounded-full border border-neutral-300/60 shadow-xs" />
              <div className="radar-ring absolute inset-[12%] rounded-full border border-neutral-300/70" />
              <div className="radar-ring absolute inset-[24%] rounded-full border border-neutral-300/80" />
              <div className="radar-ring absolute inset-[36%] rounded-full border border-neutral-300/90" />
              <div className="radar-ring absolute inset-[48%] rounded-full border border-neutral-300" />

              {/* Center Core Circle with Project Name and Shadow */}
              <div className="relative z-20 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-[#171410] p-3 text-center text-white shadow-[0_10px_35px_rgba(0,0,0,0.35)]">
                <span className="font-display text-sm font-bold sm:text-base leading-tight">
                  {projectName[langKey]}
                </span>
              </div>

              {/* Orbiting Landmark Cards Matching 3.PNG */}
              {locationSection.landmarks.map((landmark, idx) => {
                const posClass = orbitalPositions[idx % orbitalPositions.length];

                return (
                  <div
                    key={idx}
                    className={`radar-landmark absolute z-10 flex flex-col items-center rounded-sm bg-white/95 px-3 py-2 shadow-sm border border-neutral-200/80 backdrop-blur-xs text-center transition-transform hover:scale-105 ${posClass}`}
                  >
                    <span className="font-display text-sm font-bold text-brand leading-none">
                      {landmark.time}
                    </span>
                    <span className="mt-1 text-[11px] font-medium text-neutral-700 max-w-[100px] leading-tight">
                      {landmark.name[langKey]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Text Description Matching 3.PNG - 6 Cols */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <span className="loc-text-elem text-xs font-semibold text-brand tracking-wider">
              {isEn ? "Location" : "الموقع"}
            </span>

            <h2 className="loc-text-elem font-display mt-3 text-[clamp(2.4rem,5.5vw,4.25rem)] font-bold leading-[1.08] tracking-tight text-[#171410]">
              {locationSection.headline[langKey]}
            </h2>

            <p className="loc-text-elem mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
              {locationSection.description[langKey]}
            </p>

            <div className="loc-text-elem mt-8">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#7b0c0c] hover:scale-105"
              >
                <span>{isEn ? "Explore Prices" : "اعرف الأسعار"}</span>
                <span aria-hidden="true" className="rtl:-scale-x-100">
                  ←
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
