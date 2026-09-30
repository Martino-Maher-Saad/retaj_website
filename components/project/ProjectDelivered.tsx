"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface DeliveredItem {
  name: { ar: string; en: string };
  status: { ar: string; en: string };
  image?: string;
}

export interface DeliveredSectionData {
  eyebrow?: { ar: string; en: string } | string;
  headline?: { ar: string; en: string } | string;
  title?: { ar: string; en: string } | string;
  description?: { ar: string; en: string } | string;
  subtitle?: { ar: string; en: string } | string;
}

interface ProjectDeliveredProps {
  projectName: { ar: string; en: string };
  deliveredTrackRecord: DeliveredItem[];
  fallbackImages: string[];
  deliveredSection?: DeliveredSectionData;
  isEn?: boolean;
}

export default function ProjectDelivered({
  deliveredTrackRecord,
  fallbackImages,
  deliveredSection,
  isEn = false,
}: ProjectDeliveredProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const langKey = isEn ? "en" : "ar";

  const getLocalized = (
    val?: { ar?: string; en?: string } | string,
    fallback: string = ""
  ): string => {
    if (!val) return fallback;
    if (typeof val === "object") return val[langKey] || val.ar || val.en || fallback;
    return String(val);
  };

  const defaultEyebrow = isEn ? "Delivered" : "المتسلم فعلاً";
  const defaultHeadline = isEn
    ? "Our Promises Have Addresses and Names"
    : "وعودنا لها عناوين وأسماء";
  const defaultDescription = isEn
    ? "Projects completed and families settled — this is the true standard of success."
    : "مشاريع اكتملت وأسر استقرت — هذا هو معيار النجاح الحقيقي لمدينة مصر.";

  const eyebrow = getLocalized(deliveredSection?.eyebrow, defaultEyebrow);
  const headline = getLocalized(
    deliveredSection?.headline || deliveredSection?.title,
    defaultHeadline
  );
  const description = getLocalized(
    deliveredSection?.description || deliveredSection?.subtitle,
    defaultDescription
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tiles = sectionRef.current?.querySelectorAll(".delivered-tile");
      if (tiles && tiles.length > 0) {
        gsap.fromTo(
          tiles,
          { y: 35, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.12,
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

  if (!deliveredTrackRecord || deliveredTrackRecord.length === 0) {
    return null;
  }

  return (
    <section
      id="delivered"
      ref={sectionRef}
      aria-labelledby="delivered-heading"
      className="relative py-32 sm:py-40 lg:py-48"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="delivered-eyebrow text-[11px] font-medium uppercase tracking-[0.25em] rtl:tracking-[0.08em] text-neutral-500">
            {eyebrow}
          </p>
          <h2
            id="delivered-heading"
            className="delivered-heading font-display mt-4 text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.08] tracking-tight text-foreground rtl:leading-[1.24] font-semibold"
          >
            {headline}
          </h2>
          <p className="delivered-body mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-600 sm:text-base font-normal">
            {description}
          </p>
        </header>

        {/* 2x2 Grid */}
        <ul className="mt-14 grid grid-cols-1 gap-10 sm:mt-18 sm:grid-cols-2 sm:gap-x-7 sm:gap-y-12 lg:mt-20 lg:gap-x-9 lg:gap-y-14">
          {deliveredTrackRecord.map((item, idx) => {
            const imageSrc =
              item.image ||
              fallbackImages[idx % fallbackImages.length] ||
              "https://res.cloudinary.com/izrnyvya/image/upload/f_auto,q_auto/v1790080111/Tag_Sultan.webp";

            return (
              <li key={idx} className="delivered-tile">
                <figure>
                  <div className="delivered-mask group relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-100 shadow-[0_16px_40px_rgba(0,0,0,0.06)] border border-black/[0.06]">
                    <div className="delivered-image absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]">
                      <Image
                        src={imageSrc}
                        alt={item.name[langKey]}
                        fill
                        sizes="(min-width: 640px) 46vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <figcaption className="delivered-name mt-4">
                    <p className="font-display text-[clamp(1.4rem,2.5vw,2rem)] leading-tight tracking-tight text-foreground rtl:leading-[1.2] font-semibold">
                      {item.name[langKey]}
                    </p>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
