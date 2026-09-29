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
          <p className="track-eyebrow text-[11px] font-medium uppercase tracking-[0.32em] text-current/60">
            {trackData.eyebrow[langKey]}
          </p>
          <h2
            id="track-headline"
            className="track-headline font-display mt-6 text-[clamp(2rem,5vw,4rem)] leading-[1.15] tracking-tight rtl:leading-[1.3] font-bold"
          >
            <span className="block">{trackData.titleLine1[langKey]}</span>
            <span className="block text-brand italic">{trackData.titleLine2[langKey]}</span>
          </h2>
          <p className="track-description mt-8 text-[15px] leading-relaxed text-current/75 sm:text-base">
            {trackData.description[langKey]}
          </p>
        </header>

        {/* 3 Figures Layout matching reference site */}
        <div className="mt-20 space-y-16 sm:mt-28 sm:space-y-24 lg:mt-32 lg:space-y-32">
          {trackData.communities.map((comm) => (
            <figure key={comm.num} className="track-figure relative">
              <div className="track-mask relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-neutral-100 shadow-xl">
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
                    <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-brand font-bold">
                      {comm.num} · {comm.status[langKey]}
                    </p>
                    <h3 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.75rem)] leading-none tracking-tight rtl:leading-[1.15] font-bold text-white">
                      {comm.name[langKey]}
                    </h3>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/80">
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
