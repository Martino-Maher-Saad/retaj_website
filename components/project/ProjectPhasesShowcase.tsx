"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Phase {
  id: string;
  name: { ar: string; en: string };
  badge: { ar: string; en: string };
  description: { ar: string; en: string };
  startingPrice: number;
}

interface Unit {
  phase: string;
  image: string;
}

interface ProjectPhasesShowcaseProps {
  projectName: { ar: string; en: string };
  phases: Phase[];
  units: Unit[];
  isEn?: boolean;
}

export default function ProjectPhasesShowcase({
  projectName,
  phases,
  units,
  isEn = false,
}: ProjectPhasesShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const langKey = isEn ? "en" : "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".showcase-card-unit");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 35, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
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
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36 bg-[#faf8f5] text-[#171410] border-t border-neutral-200/70 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Showcase Alternating Cards Matching 10.PNG & 11.PNG */}
        <div className="space-y-28 sm:space-y-36">
          {phases.map((phase, idx) => {
            const isEven = idx % 2 === 1;
            const counter = `0${idx + 1} / 0${phases.length}`;

            // Match unit image from units
            const matchedUnit = units.find(
              (u) =>
                u.phase.toLowerCase().includes(phase.id.replace("-", " ").toLowerCase()) ||
                phase.name.en.toLowerCase().includes(u.phase.toLowerCase())
            );
            const imageSrc = matchedUnit?.image || units[idx % units.length]?.image;

            return (
              <div
                key={phase.id}
                className="showcase-card-unit grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
              >
                {/* Visual Image & Details Box Column */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-xs">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                      {imageSrc && (
                        <Image
                          src={imageSrc}
                          alt={`${projectName[langKey]} - ${phase.name[langKey]}`}
                          fill
                          sizes="(min-width: 1024px) 60vw, 100vw"
                          className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                        />
                      )}
                    </div>

                    {/* Warm Card Below Image Matching 10.PNG & 11.PNG */}
                    <div className="p-6 sm:p-7 text-center space-y-1.5 border-t border-neutral-100 bg-[#fdfbf9]">
                      <h4 className="font-display text-2xl font-bold text-[#171410]">
                        {phase.name[langKey]}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {phase.badge[langKey]}
                      </p>
                      <p className="font-display text-base font-bold text-brand pt-1">
                        {isEn ? "Starts from " : "تبدأ من "}
                        {phase.startingPrice.toLocaleString()}{" "}
                        {isEn ? "EGP" : "جنيه"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Text Description Column */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <span className="font-mono text-xs text-brand font-semibold">
                    {counter}
                  </span>

                  <h3 className="font-display mt-3 text-3xl sm:text-5xl font-bold tracking-tight text-[#171410] leading-[1.1]">
                    {phase.name[langKey]}
                  </h3>

                  <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
                    {phase.description[langKey]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Red CTA Matching 12.PNG */}
        <div className="mt-20 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105"
          >
            <span>{isEn ? "Learn More" : "اعرف أكثر"}</span>
            <span aria-hidden="true" className="rtl:-scale-x-100">
              ←
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
