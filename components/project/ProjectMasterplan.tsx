"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Feature {
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
}

interface ProjectMasterplanProps {
  project: {
    name: { ar: string; en: string };
    area: { ar: string; en: string };
    status: { ar: string; en: string };
    location: { ar: string; en: string };
    hero: { heroImage: string };
    lifestyleSection: {
      headline: { ar: string; en: string };
      description: { ar: string; en: string };
      features: Feature[];
    };
  };
  isEn?: boolean;
}

export default function ProjectMasterplan({
  project,
  isEn = false,
}: ProjectMasterplanProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const langKey = isEn ? "en" : "ar";
  const { lifestyleSection } = project;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mp-elem",
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lifestyle"
      className="relative py-24 sm:py-32 lg:py-36 bg-[#faf8f5] text-[#171410] border-t border-neutral-200/70 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Centered Large Section Title Matching 4.PNG */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="mp-elem font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-[#171410]">
            {lifestyleSection.headline[langKey]}
          </h2>
          <span className="mp-elem inline-block h-2 w-2 rounded-full bg-brand mt-4" />
        </div>

        {/* Content Grid: Site Map Image & Description Matching 4.PNG */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Site Map Visual - 7 cols */}
          <div className="mp-elem lg:col-span-7">
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm">
              <Image
                src={project.hero.heroImage}
                alt={lifestyleSection.headline[langKey]}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Description Paragraph on Right - 5 cols */}
          <div className="mp-elem lg:col-span-5 flex flex-col justify-center">
            <p className="font-display text-lg sm:text-xl font-normal leading-relaxed text-neutral-800">
              {lifestyleSection.description[langKey]}
            </p>
          </div>
        </div>

        {/* Bottom Key Metrics Row Matching 5.PNG */}
        <div className="mp-elem mt-20 sm:mt-28 grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
          {/* Metric 01 */}
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-brand">0 1</span>
            <p className="text-xs text-neutral-400">
              {isEn ? "Phases" : "المراحل"}
            </p>
            <p className="font-display text-3xl sm:text-4xl font-bold text-[#171410] pt-1">
              +12
            </p>
          </div>

          {/* Metric 02 */}
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-brand">0 2</span>
            <p className="text-xs text-neutral-400">
              {isEn ? "Status" : "الحالة"}
            </p>
            <p className="font-display text-3xl sm:text-4xl font-bold text-[#171410] pt-1">
              {project.status[langKey]}
            </p>
          </div>

          {/* Metric 03 */}
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-brand">0 3</span>
            <p className="text-xs text-neutral-400">
              {isEn ? "Location" : "الموقع"}
            </p>
            <p className="font-display text-3xl sm:text-4xl font-bold text-[#171410] pt-1">
              {project.location[langKey]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
