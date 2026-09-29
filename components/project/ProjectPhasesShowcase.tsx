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
      const rows = sectionRef.current?.querySelectorAll(".unit-row");
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
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
      id="units"
      ref={sectionRef}
      aria-labelledby="units-heading"
      className="relative py-32 sm:py-40 lg:py-48"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
        <header className="mx-auto max-w-3xl text-center">
          <p className="units-eyebrow text-[11px] font-medium uppercase tracking-[0.25em] rtl:tracking-[0.08em] text-neutral-500">
            {isEn ? "Available Phases" : "المراحل المتاحة"}
          </p>
          <h2
            id="units-heading"
            className="units-heading font-display mt-4 text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.08] tracking-tight text-foreground rtl:leading-[1.24] font-semibold"
          >
            {isEn
              ? `Choose Your Unit in ${projectName.en}`
              : `اختر وحدتك في ${projectName.ar}`}
          </h2>
        </header>
      </div>

      <div className="mt-16 flex flex-col gap-20 sm:mt-20 sm:gap-24 lg:mt-24 lg:gap-28">
        {phases.map((phase, idx) => {
          const isEven = idx % 2 === 1;
          const counterCurrent = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;
          const counterTotal =
            phases.length < 10 ? `0${phases.length}` : `${phases.length}`;

          // Match unit image
          const matchedUnit = units.find(
            (u) =>
              u.phase.toLowerCase().includes(phase.id.replace("-", " ").toLowerCase()) ||
              phase.name.en.toLowerCase().includes(u.phase.toLowerCase())
          );
          const imageSrc =
            matchedUnit?.image || units[idx % units.length]?.image;

          return (
            <article
              key={phase.id}
              className="unit-row relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14"
            >
              <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <figure
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="unit-mask relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.14)] border border-black/[0.06]">
                    <div className="unit-image absolute inset-0">
                      {imageSrc && (
                        <Image
                          src={imageSrc}
                          alt={`${projectName[langKey]} — ${phase.name[langKey]}`}
                          fill
                          sizes="(min-width: 1024px) 58vw, 100vw"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                </figure>

                <div
                  className={`lg:col-span-5 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <p className="unit-line text-xs font-medium tracking-[0.2em] text-brand tabular-nums">
                    <span>{counterCurrent}</span>
                    <span className="mx-2 text-neutral-400 font-light">/</span>
                    <span className="text-neutral-400 font-light">{counterTotal}</span>
                  </p>

                  <h3 className="unit-name font-display mt-3 text-[clamp(1.85rem,3.8vw,3rem)] leading-[1.1] tracking-tight text-foreground rtl:leading-[1.2] font-semibold">
                    {phase.name[langKey]}
                  </h3>

                  <div className="unit-line mt-5 max-w-md text-[15px] leading-relaxed text-neutral-600 sm:text-base font-normal">
                    {phase.badge[langKey] && (
                      <p className="font-medium text-foreground mb-1.5 text-xs uppercase tracking-wider text-brand">
                        {phase.badge[langKey]}
                      </p>
                    )}
                    <p>{phase.description[langKey]}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* CTA Button matching live Section 4 */}
      <div className="mx-auto mt-20 flex w-full max-w-7xl justify-center px-6 sm:mt-24 sm:px-10 lg:px-14">
        <a
          href="#contact"
          className="units-cta group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-brand px-8 py-3.5 text-xs font-medium uppercase tracking-wider text-white transition-[background-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.5,0,0.1,1)] hover:-translate-y-[2px] hover:bg-brand-hover hover:shadow-[0_18px_40px_-12px_rgba(152,15,15,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand cursor-pointer"
        >
          <span className="relative block overflow-hidden leading-[1.2]">
            <span className="block transition-transform duration-500 ease-[cubic-bezier(0.5,0,0.1,1)] group-hover:-translate-y-full">
              {isEn ? "Learn More" : "اعرف أكثر"}
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.5,0,0.1,1)] group-hover:translate-y-0"
            >
              {isEn ? "Learn More" : "اعرف أكثر"}
            </span>
          </span>
          <svg
            width="20"
            height="10"
            viewBox="0 0 22 10"
            fill="none"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100"
          >
            <path
              d="M1 5h20m0 0L17 1m4 4l-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
