"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import WordScrubText from "@/components/WordScrubText";
import homeContent from "@/data/home_content.json";

interface TrackRecordProps {
  isEn?: boolean;
}

export default function TrackRecord({ isEn = false }: TrackRecordProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<any>(null);

  const trackData = homeContent.trackRecord;
  const langKey = isEn ? "en" : "ar";

  const calculateBounds = useCallback(() => {
    const el = sliderRef.current;
    if (!el || !el.parentElement) return null;
    const maxDrag = Math.max(0, el.scrollWidth - el.parentElement.clientWidth);
    return isEn ? { minX: -maxDrag, maxX: 0 } : { minX: 0, maxX: maxDrag };
  }, [isEn]);

  const initDraggable = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const bounds = calculateBounds();
    if (!bounds) return;

    if (draggableRef.current) draggableRef.current.kill();

    const instances = Draggable.create(el, {
      type: "x",
      inertia: true,
      bounds: bounds,
      edgeResistance: 0.85,
      cursor: "grab",
      activeCursor: "grabbing",
      allowNativeTouchScrolling: false,
    });

    draggableRef.current = instances[0];
  }, [calculateBounds]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable);

    const onResize = () => {
      requestAnimationFrame(initDraggable);
    };

    window.addEventListener("resize", onResize);
    requestAnimationFrame(initDraggable);

    const ctx = gsap.context(() => {
      // Eyebrow reveal
      gsap.fromTo(
        ".track-eyebrow",
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Card reveals matching original chunk
      const cards = sectionRef.current?.querySelectorAll(".track-card-item");
      cards?.forEach((card) => {
        const mask = card.querySelector(".track-image-mask");
        const inner = card.querySelector(".track-image-inner");
        const caption = card.querySelector(".track-caption");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            once: true,
          },
        });

        if (mask) {
          tl.fromTo(
            mask,
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1.6, ease: "expo.out" }
          );
        }
        if (inner) {
          tl.fromTo(
            inner,
            { scale: 1.15 },
            { scale: 1, duration: 2, ease: "expo.out" },
            "<"
          );
        }
        if (caption) {
          tl.fromTo(
            caption,
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out" },
            "-=1.0"
          );
        }
      });
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", onResize);
      if (draggableRef.current) draggableRef.current.kill();
      ctx.revert();
    };
  }, [initDraggable]);

  return (
    <section
      id="track"
      ref={sectionRef}
      aria-labelledby="track-headline"
      className="relative overflow-hidden bg-[#faf8f5] py-32 sm:py-48 lg:py-56 text-[#171410]"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="track-eyebrow text-[11px] font-medium uppercase tracking-[0.32em] text-neutral-500 sm:text-xs">
            {trackData.eyebrow[langKey]}
          </p>

          <WordScrubText
            id="track-headline"
            as="h2"
            className="mt-4 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-[#171410]"
          >
            {trackData.title[langKey]}
          </WordScrubText>

          <p className="mt-6 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-neutral-600">
            {trackData.description[langKey]}
          </p>
        </div>
      </div>

      {/* Draggable Track Record Cards Slider */}
      <div className="relative mt-14 sm:mt-20 overflow-hidden">
        <div
          ref={sliderRef}
          data-cursor="drag"
          className="flex cursor-grab gap-6 px-6 will-change-transform select-none active:cursor-grabbing sm:gap-8 sm:px-10 lg:px-14"
          style={{ touchAction: "pan-y" }}
        >
          {trackData.communities.map((comm) => (
            <div
              key={comm.num}
              className="track-card-item flex-shrink-0 w-[84vw] max-w-[620px] sm:w-[500px] lg:w-[580px]"
            >
              {/* Card Image Mask */}
              <div className="track-image-mask relative aspect-[16/10] overflow-hidden rounded-sm bg-neutral-100">
                <div className="track-image-inner relative h-full w-full">
                  <Image
                    src={comm.image}
                    alt={comm.name[langKey]}
                    fill
                    sizes="(min-width: 1024px) 580px, 84vw"
                    className="object-cover"
                    draggable={false}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14110f]/40 via-transparent to-transparent"
                  />
                </div>
              </div>

              {/* Caption Below Image */}
              <div className="track-caption mt-4 flex items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs font-semibold text-[#980f0f]">
                    {comm.num} · {comm.status[langKey]}
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-[#171410]">
                    {comm.name[langKey]}
                  </h3>
                </div>

                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  {comm.location[langKey]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
