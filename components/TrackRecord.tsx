"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homeContent from "@/data/home_content.json";

interface TrackRecordProps {
  isEn?: boolean;
}

export default function TrackRecord({ isEn = false }: TrackRecordProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const trackData = homeContent.trackRecord;
  const langKey = isEn ? "en" : "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        ".track-headline",
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

      // Figure reveals
      const figures = sectionRef.current?.querySelectorAll(".track-figure");
      figures?.forEach((fig) => {
        const mask = fig.querySelector(".track-mask");
        const inner = fig.querySelector(".track-image-inner");
        const caption = fig.querySelector(".track-caption");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: fig,
            start: "top 82%",
            once: true,
          },
        });

        if (mask) {
          tl.fromTo(
            mask,
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "expo.out" }
          );
        }
        if (inner) {
          tl.fromTo(
            inner,
            { scale: 1.15 },
            { scale: 1, duration: 1.8, ease: "expo.out" },
            "<"
          );
        }
        if (caption) {
          tl.fromTo(
            caption,
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out" },
            "-=0.9"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="track"
      ref={sectionRef}
      aria-labelledby="track-headline"
      className="relative py-32 sm:py-48 lg:py-56 bg-background text-foreground"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Header matching reference site */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="track-eyebrow text-[11px] font-medium uppercase tracking-[0.25em] rtl:tracking-[0.08em] text-current/60">
            {trackData.eyebrow[langKey]}
          </p>
          <h2
            id="track-headline"
            className="track-headline font-display mt-4 text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.08] tracking-tight rtl:leading-[1.24] font-semibold"
          >
            <span className="block">{trackData.titleLine1[langKey]}</span>
            <span className="block text-brand italic font-normal">{trackData.titleLine2[langKey]}</span>
          </h2>
          <p className="track-description mt-6 max-w-2xl mx-auto text-[15px] leading-relaxed text-current/75 sm:text-base font-normal">
            {trackData.description[langKey]}
          </p>
        </header>

        {/* 3 Figures Layout matching reference site */}
        <div className="mt-16 space-y-14 sm:mt-24 sm:space-y-20 lg:mt-28 lg:space-y-24">
          {trackData.communities.map((comm) => (
            <figure key={comm.num} className="track-figure relative">
              <div className="track-mask relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-neutral-100 shadow-[0_16px_40px_rgba(0,0,0,0.06)] border border-black/[0.06]">
                <div className="track-image-inner absolute inset-0">
                  <Image
                    src={comm.image}
                    alt={comm.name[langKey]}
                    fill
                    sizes="(min-width: 1024px) 1120px, 90vw"
                    className="object-cover"
                    priority={comm.num === "01"}
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(20,17,15,0.75) 0%, rgba(20,17,15,0.15) 40%, transparent 70%)",
                  }}
                />
                <figcaption className="track-caption absolute bottom-6 start-6 end-6 flex flex-wrap items-end justify-between gap-4 text-white sm:bottom-8 sm:start-8 sm:end-8">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-brand tabular-nums">
                      {comm.num} · {comm.status[langKey]}
                    </p>
                    <h3 className="font-display mt-2 text-[clamp(1.85rem,4vw,3.25rem)] leading-tight tracking-tight rtl:leading-[1.15] font-semibold text-white">
                      {comm.name[langKey]}
                    </h3>
                  </div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-white/80">
                    {comm.location[langKey]}
                  </p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
