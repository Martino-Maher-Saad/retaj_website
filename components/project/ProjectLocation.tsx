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

// Format time matching 3.PNG: "دقائق او دقيقة" in Arabic and "mins" in English
function formatMinutes(timeStr: string, isEn: boolean): string {
  const num = parseInt(timeStr.replace(/[^0-9]/g, "")) || 0;
  if (isEn) {
    return `${num} mins`;
  }
  if (num >= 3 && num <= 10) {
    return `${num} دقائق`;
  }
  return `${num} دقيقة`;
}

// 9 coordinates: exactly 3 landmarks per ring (3 concentric rings x 3 = 9 places),
// rotated and staggered so no two landmarks are on the same radial line or touching each other.
const radarCoordinates = [
  // --- Ring 1 (Inner Ring / الخط الأول: 3 أماكن) ---
  { left: "50%", top: "27%" }, // أعلى الدائرة الداخلية
  { left: "70%", top: "62%" }, // أسفل يمين الدائرة الداخلية
  { left: "30%", top: "62%" }, // أسفل يسار الدائرة الداخلية

  // --- Ring 2 (Middle Ring / الخط الثاني: 3 أماكن) ---
  { left: "78%", top: "29%" }, // أعلى يمين الدائرة الوسطى
  { left: "50%", top: "85%" }, // أسفل منتصف الدائرة الوسطى
  { left: "18%", top: "40%" }, // منتصف يسار الدائرة الوسطى

  // --- Ring 3 (Outer Ring / الخط الثالث: 3 أماكن) ---
  { left: "20%", top: "14%" }, // أعلى يسار الدائرة الخارجية
  { left: "87%", top: "55%" }, // منتصف يمين الدائرة الخارجية
  { left: "22%", top: "85%" }, // أسفل يسار الدائرة الخارجية
];

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
      const rings = radarRef.current?.querySelectorAll("[data-ring='true']");
      const chips = radarRef.current?.querySelectorAll("[data-chip='true']");

      if (rings && rings.length > 0) {
        gsap.fromTo(
          rings,
          { scale: 0.6, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: {
              trigger: radarRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      if (chips && chips.length > 0) {
        gsap.fromTo(
          chips,
          { y: 15, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            delay: 0.25,
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

  return (
    <section
      id="location"
      ref={sectionRef}
      aria-labelledby="location-heading"
      className="relative overflow-hidden bg-[#faf8f5] py-24 sm:py-32 lg:py-40"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-x-16 gap-y-14 px-6 sm:px-10 lg:grid-cols-2 lg:px-14">
        {/* Text Column (Right in RTL, Left in LTR) */}
        <div>
          <p
            data-copy="true"
            className="text-[11px] font-medium uppercase tracking-[0.25em] rtl:tracking-[0.08em] text-brand"
          >
            {isEn ? "Location" : "الموقع"}
          </p>

          <h2
            id="location-heading"
            data-copy="true"
            className="font-display mt-4 text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.1] tracking-tight text-foreground rtl:leading-[1.24] font-semibold"
          >
            {locationSection.headline[langKey]}
          </h2>

          <p
            data-copy="true"
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-600 sm:text-base font-normal"
          >
            {locationSection.description[langKey]}
          </p>

          <div data-copy="true" className="mt-8">
            <a
              href="#apartments-pricing"
              className="inline-flex items-center gap-3 rounded-full bg-brand px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-brand-hover hover:scale-105 shadow-md cursor-pointer"
            >
              <span>{isEn ? "Explore Prices" : "اعرف الأسعار"}</span>
              <span aria-hidden="true" className="rtl:rotate-180">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Radar Map Column (Left in RTL, Right in LTR) matching 3.PNG */}
        <div
          ref={radarRef}
          className="relative mx-auto aspect-square w-full max-w-[20rem] sm:max-w-[28rem] md:max-w-[34rem]"
        >
          {/* 3 Concentric Rings */}
          <div
            data-ring="true"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-300/70 pointer-events-none"
            style={{ width: "44%", height: "44%" }}
          />
          <div
            data-ring="true"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-300/70 pointer-events-none"
            style={{ width: "70%", height: "70%" }}
          />
          <div
            data-ring="true"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-300/70 pointer-events-none"
            style={{ width: "96%", height: "96%" }}
          />

          {/* Center Black Circle matching 3.PNG */}
          <div
            data-center="true"
            className="absolute left-1/2 top-1/2 flex size-[4.75rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#171410] text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:size-28 md:size-32 z-10"
          >
            <span className="font-display px-2 text-center text-xs sm:text-base md:text-lg font-medium">
              {projectName[langKey]}
            </span>
          </div>

          {/* Orbiting White Landmark Cards: 3 per ring, geometrically distributed */}
          <ul>
            {locationSection.landmarks.slice(0, 9).map((landmark, idx) => {
              const pos = radarCoordinates[idx % radarCoordinates.length];
              return (
                <li
                  key={idx}
                  data-chip="true"
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
                  style={{ left: pos.left, top: pos.top }}
                >
                  <div className="flex flex-col items-center rounded-md border border-neutral-100/90 bg-white px-3 py-1.5 text-center shadow-[0_6px_20px_rgba(0,0,0,0.08)] sm:px-3.5 sm:py-2 min-w-[85px] max-w-[115px] sm:min-w-[100px] sm:max-w-[135px] transition-transform duration-300 hover:scale-105 hover:shadow-md">
                    <span className="font-display text-xs sm:text-sm font-semibold text-brand tabular-nums">
                      {formatMinutes(landmark.time, isEn)}
                    </span>
                    <span className="mt-0.5 text-[10.5px] sm:text-xs font-medium text-neutral-800 leading-tight line-clamp-2 text-center">
                      {landmark.name[langKey]}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
