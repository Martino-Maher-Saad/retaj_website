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
        ".about-stat",
        { y: 25, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-stats-container",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-subheading"
      className="relative py-32 sm:py-40 lg:py-48"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Header matching live Section 2 */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="about-eyebrow text-[11px] font-medium uppercase tracking-[0.25em] rtl:tracking-[0.08em] text-neutral-500">
            {isEn ? `About ${project.name.en}` : `عن ${project.name.ar}`}
          </p>
          <h2
            id="about-subheading"
            className="about-subheading font-display mt-4 text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.08] tracking-tight text-foreground rtl:leading-[1.24] font-semibold"
          >
            {lifestyleSection.headline[langKey]}
          </h2>
        </header>

        {/* Content: 6 cols text, 6 cols masterplan image */}
        <div className="mt-14 grid grid-cols-1 items-center gap-12 sm:mt-18 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="about-body max-w-xl text-[15px] leading-relaxed text-neutral-600 sm:text-base font-normal">
              {lifestyleSection.description[langKey]}
            </p>
          </div>

          <figure className="lg:col-span-6">
            <div className="about-mask relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.12)] border border-black/[0.06]">
              <div className="about-image absolute inset-0">
                <Image
                  src={project.hero.heroImage}
                  alt={`${project.name[langKey]} — ${lifestyleSection.headline[langKey]}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </figure>
        </div>

        {/* Stats Row matching live Section 2 */}
        <div className="about-stats-container mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-neutral-200/80 pt-10 sm:mt-18 sm:gap-6 sm:pt-12 lg:mt-24 lg:gap-10 sm:grid-cols-3">
          <article className="about-stat">
            <p className="text-xs font-medium tracking-[0.2em] text-brand tabular-nums">01</p>
            <p className="mt-2.5 text-[10px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-neutral-500">
              {isEn ? "Phases" : "المراحل"}
            </p>
            <p className="font-display mt-1 text-[clamp(1.2rem,2.8vw,2.1rem)] leading-tight tracking-tight text-foreground font-semibold tabular-nums">
              +12
            </p>
          </article>

          <article className="about-stat">
            <p className="text-xs font-medium tracking-[0.2em] text-brand tabular-nums">02</p>
            <p className="mt-2.5 text-[10px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-neutral-500">
              {isEn ? "Status" : "الحالة"}
            </p>
            <p className="font-display mt-1 text-[clamp(1.2rem,2.8vw,2.1rem)] leading-tight tracking-tight text-foreground font-semibold">
              {project.status[langKey]}
            </p>
          </article>

          <article className="about-stat">
            <p className="text-xs font-medium tracking-[0.2em] text-brand tabular-nums">03</p>
            <p className="mt-2.5 text-[10px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-neutral-500">
              {isEn ? "Location" : "الموقع"}
            </p>
            <p className="font-display mt-1 text-[clamp(1.2rem,2.8vw,2.1rem)] leading-tight tracking-tight text-foreground font-semibold">
              {project.location[langKey]}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
