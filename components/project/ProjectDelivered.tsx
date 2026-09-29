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

interface ProjectDeliveredProps {
  projectName: { ar: string; en: string };
  deliveredTrackRecord: DeliveredItem[];
  fallbackImages: string[];
  isEn?: boolean;
}

export default function ProjectDelivered({
  projectName,
  deliveredTrackRecord,
  fallbackImages,
  isEn = false,
}: ProjectDeliveredProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const langKey = isEn ? "en" : "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".delivered-block");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 35, autoAlpha: 0 },
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!deliveredTrackRecord || deliveredTrackRecord.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-36 bg-[#faf8f5] text-[#171410] border-t border-neutral-200/70"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Section Header Matching 13.PNG */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold text-brand tracking-wider">
            {isEn ? `Delivered in ${projectName.en}` : `المستلم فعلاً في ${projectName.ar}`}
          </span>

          <h2 className="font-display mt-3 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-[#171410]">
            {isEn ? "Our Promises Have Addresses and Names" : "وعودنا لها عناوين وأسماء"}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            {isEn
              ? "Delivered developments and settled families — the true standard of success for Madinet Masr."
              : "مشاريع اكتملت وأُسر استقرت — هذا هو معيار النجاح الحقيقي لمدينة مصر."}
          </p>
        </div>

        {/* 2x2 Grid of Delivered Communities Matching 14.PNG */}
        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-12">
          {deliveredTrackRecord.map((item, idx) => {
            const imageSrc =
              item.image ||
              fallbackImages[idx % fallbackImages.length] ||
              "https://res.cloudinary.com/izrnyvya/image/upload/f_auto,q_auto/v1790080111/Tag_Sultan.webp";

            return (
              <div key={idx} className="delivered-block flex flex-col items-center">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md border border-neutral-200/80 bg-neutral-100 shadow-sm">
                  <Image
                    src={imageSrc}
                    alt={item.name[langKey]}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                </div>

                {/* Name Centered Below Matching 14.PNG */}
                <h3 className="font-display mt-5 text-2xl sm:text-3xl font-bold text-[#171410] text-center">
                  {item.name[langKey]}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
