"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import homeContent from "@/data/home_content.json";

interface ButterflySpotlightProps {
  isEn?: boolean;
}

export default function ButterflySpotlight({ isEn = false }: ButterflySpotlightProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const bfData = homeContent.butterflySpotlight;
  const langKey = isEn ? "en" : "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered beat entrance
      const beats = sectionRef.current?.querySelectorAll(".butterfly-beat");
      if (beats && beats.length > 0) {
        gsap.from(beats, {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }

      // Figure reveal & badge bounce
      if (figureRef.current) {
        gsap.from(".butterfly-badge", {
          scale: 0,
          rotation: -25,
          autoAlpha: 0,
          duration: 1.2,
          ease: "back.out(1.8)",
          delay: 0.4,
          scrollTrigger: {
            trigger: figureRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }

      // Draw SVG serpentine line along scroll
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="butterfly"
      ref={sectionRef}
      aria-labelledby="butterfly-name"
      className="butterfly-section relative isolate overflow-hidden bg-[#14110f] py-40 sm:py-56 lg:py-72 text-[#faf8f5]"
    >
      {/* Exact Serpentine Red Path from Reference Site */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          ref={pathRef}
          d="M 50 0 C 95 12, 92 24, 50 32 C 8 40, 5 52, 50 60 C 95 68, 92 80, 50 88 L 50 100"
          stroke="var(--brand-primary)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Top Header Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 text-center sm:px-10">
        <p className="butterfly-beat text-[11px] font-medium uppercase tracking-[0.32em] text-current/60">
          {bfData.eyebrow[langKey]}
        </p>

        <p className="butterfly-beat mt-20 font-display text-[clamp(2rem,5vw,3.75rem)] italic leading-tight text-brand sm:mt-28">
          {bfData.titleLine?.[langKey] || (isEn ? "The Strongest Offer in the Market" : "العرض الأقوى في السوق")}
        </p>

        <h2
          id="butterfly-name"
          className="butterfly-name butterfly-beat mt-24 font-display text-[clamp(4.5rem,14vw,11rem)] leading-[1.0] tracking-tight rtl:leading-[1.2] sm:mt-32 font-bold text-white"
        >
          {bfData.title[langKey]}
        </h2>

        <p className="butterfly-beat mt-16 max-w-xl text-[15px] leading-relaxed text-current/80 sm:mt-24 sm:text-base">
          {bfData.description[langKey]}
        </p>
      </div>

      {/* Overlapping Images with Badge Matching Reference Site */}
      <div className="relative z-10 mx-auto mt-24 w-full max-w-4xl px-6 sm:mt-32 sm:px-10">
        <figure ref={figureRef} className="butterfly-figure butterfly-beat relative">
          {/* Main Image 1 */}
          <div className="butterfly-image-1 relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-[#221d18]">
            <Image
              src={bfData.images.img1}
              alt={bfData.title[langKey]}
              fill
              sizes="(min-width: 1024px) 880px, 90vw"
              className="object-cover"
              priority
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(20,17,15,0.40)] via-transparent to-transparent"
            />
          </div>

          {/* Overlapping Image 2 */}
          <div className="butterfly-image-2 absolute -bottom-8 end-[-1rem] aspect-[16/9] w-[58%] overflow-hidden rounded-sm shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:-bottom-12 sm:end-[-2rem] sm:w-[54%] bg-[#221d18] border border-white/10">
            <Image
              src={bfData.images.img2}
              alt={`${bfData.title[langKey]} interior`}
              fill
              sizes="(min-width: 1024px) 480px, 55vw"
              className="object-cover"
            />
          </div>

          {/* Circular Discount Badge */}
          <div
            className="butterfly-badge absolute -top-8 start-[-12px] flex h-32 w-32 items-center justify-center rounded-full bg-brand text-center text-white shadow-[0_18px_50px_rgba(152,15,15,0.45)] sm:-top-10 sm:start-[-24px] sm:h-40 sm:w-40 z-20"
            style={{ transformOrigin: "center" }}
          >
            <span className="font-display px-3 text-[clamp(0.95rem,1.6vw,1.25rem)] leading-tight font-bold">
              {isEn ? "54% Cash Discount" : "خصم 54% كاش"}
            </span>
          </div>
        </figure>
      </div>

      {/* Stats Box & Pills & CTA Matching Reference Site */}
      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 text-center sm:px-10">
        <div className="butterfly-beat mt-32 w-full max-w-2xl sm:mt-40">
          <div className="flex items-stretch rounded-sm border border-current/15 bg-current/[0.04] backdrop-blur-sm">
            {/* Cash Discount Column */}
            <div className="flex flex-1 flex-col items-start justify-between gap-6 p-6 text-start sm:p-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-current/60">
                {isEn ? "Cash Discount" : "خصم عند الدفع كاش"}
              </p>
              <p className="font-display leading-none tracking-tight text-brand">
                <span
                  className="butterfly-discount-counter text-[clamp(3.5rem,9vw,6rem)] tabular-nums font-bold"
                  aria-label="54%"
                >
                  54%
                </span>
              </p>
            </div>

            <div className="mx-2 w-px self-stretch bg-current/20 sm:mx-4" />

            {/* Payment Plan Column */}
            <div className="flex flex-1 flex-col items-start justify-between gap-6 p-6 text-start sm:p-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-current/60">
                {isEn ? "Payment Plan" : "نظام السداد"}
              </p>
              <div>
                <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-none tracking-tight font-bold">
                  {isEn ? "1.5% Down" : "1.5% مقدم"}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.28em] text-current/70">
                  {isEn ? "12 Years" : "12 سنة"}
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center rounded-full bg-brand px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white shadow-sm">
              {isEn ? "235 Acres" : "235 فدان"}
            </span>
            <span className="inline-flex items-center rounded-full border border-current/20 px-4 py-1.5 text-[11px] font-medium tracking-tight text-current/85">
              {isEn ? "Apartments" : "شقق"}
            </span>
            <span className="inline-flex items-center rounded-full border border-current/20 px-4 py-1.5 text-[11px] font-medium tracking-tight text-current/85">
              {isEn ? "Standalone Villas" : "فيلات مستقلة"}
            </span>
            <span className="inline-flex items-center rounded-full border border-current/20 px-4 py-1.5 text-[11px] font-medium tracking-tight text-current/85">
              {isEn ? "Townhouses" : "تاون هاوس"}
            </span>
          </div>
        </div>

        {/* CTA Button with Sliding Text Animation */}
        <div className="butterfly-beat mt-20 sm:mt-28">
          <Link
            href={isEn ? `/en${bfData.cta.href}` : bfData.cta.href}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-brand px-8 py-4 text-sm font-medium text-white transition-[background-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.5,0,0.1,1)] hover:-translate-y-[2px] hover:bg-brand-hover hover:shadow-[0_18px_40px_-12px_rgba(152,15,15,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand cursor-pointer"
          >
            <span className="relative block overflow-hidden leading-[1.2]">
              <span className="block transition-transform duration-500 ease-[cubic-bezier(0.5,0,0.1,1)] group-hover:-translate-y-full">
                {bfData.cta.text[langKey]}
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.5,0,0.1,1)] group-hover:translate-y-0"
              >
                {bfData.cta.text[langKey]}
              </span>
            </span>
            <svg
              width="22"
              height="10"
              viewBox="0 0 22 10"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-500 ease-[cubic-bezier(0.5,0,0.1,1)] group-hover:translate-x-2 rtl:-scale-x-100 rtl:group-hover:-translate-x-2"
            >
              <path
                d="M1 5h20m0 0L17 1m4 4l-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
