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
  const figureRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const bfData = homeContent.butterflySpotlight;
  const langKey = isEn ? "en" : "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Eyebrow and text reveal
      gsap.fromTo(
        ".bf-eyebrow",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      // Title clipped reveal
      gsap.fromTo(
        ".bf-title",
        { yPercent: 130 },
        {
          yPercent: 0,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Subtitle and CTA
      gsap.fromTo(
        ".bf-description",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      // Setup initial image and badge states matching original chunk
      gsap.set(".butterfly-image-1", { clipPath: "inset(100% 0 0 0)" });
      gsap.set(".butterfly-image-2", { clipPath: "inset(0 0 100% 0)", autoAlpha: 0 });
      gsap.set(".butterfly-badge", { scale: 0, rotation: -22, autoAlpha: 0 });

      // Figure images & badge reveal timeline
      if (figureRef.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: figureRef.current,
              start: "top 78%",
              once: true,
            },
          })
          .to(".butterfly-image-1", {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.6,
            ease: "expo.out",
          })
          .to(
            ".butterfly-image-2",
            {
              clipPath: "inset(0 0 0% 0)",
              autoAlpha: 1,
              duration: 1.3,
              ease: "expo.out",
            },
            "-=1.0"
          )
          .to(
            ".butterfly-badge",
            {
              scale: 1,
              rotation: -6,
              autoAlpha: 1,
              duration: 1,
              ease: "back.out(1.8)",
            },
            "-=0.6"
          );
      }

      // Red Arc SVG draw animation on scrub
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
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.8,
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
      className="butterfly-section relative isolate overflow-hidden bg-[#171410] py-32 sm:py-48 lg:py-56 text-[#faf8f5]"
    >
      {/* Decorative Red Curved Arc SVG */}
      <div className="pointer-events-none absolute -top-10 end-0 h-[600px] w-[600px] opacity-40 sm:h-[800px] sm:w-[800px] lg:h-[1000px] lg:w-[1000px]">
        <svg
          viewBox="0 0 800 800"
          fill="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d="M 800,50 Q 500,200 400,500 T 50,800"
            stroke="#980f0f"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Top Text Content */}
        <div>
          <p className="bf-eyebrow text-[11px] font-medium uppercase tracking-[0.34em] text-[#b8b0a5]">
            {bfData.eyebrow[langKey]}
          </p>

          <div className="mt-4 overflow-hidden py-2">
            <h2
              id="butterfly-name"
              className="bf-title font-display text-[clamp(3.5rem,11vw,9rem)] font-bold leading-[0.95] tracking-tight text-white"
            >
              {bfData.title[langKey]}
            </h2>
          </div>
        </div>

        {/* Description + CTA */}
        <div className="bf-description relative z-10 mt-8 max-w-2xl sm:mt-10">
          <p className="text-[15px] sm:text-[17px] leading-relaxed text-[#b8b0a5]">
            {bfData.description[langKey]}
          </p>

          <Link
            href={isEn ? `/en${bfData.cta.href}` : bfData.cta.href}
            className="group mt-8 inline-flex items-center gap-3 border-b border-white/40 pb-1.5 text-sm font-medium text-white transition-colors hover:border-white hover:text-white/90"
          >
            <span>{bfData.cta.text[langKey]}</span>
            <svg
              aria-hidden="true"
              className={`transition-transform duration-300 ${
                isEn ? "group-hover:translate-x-1" : "group-hover:-translate-x-1 -scale-x-100"
              }`}
              fill="none"
              height="10"
              viewBox="0 0 22 10"
              width="22"
            >
              <path
                d="M1 5h20m0 0L17 1m4 4l-4 4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
        </div>

        {/* 2-Image Grid Layout Matching Original */}
        <div ref={figureRef} className="butterfly-figure relative z-10 mt-14 sm:mt-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {/* Image 1 with Cash Discount Badge */}
            <div className="butterfly-image-1 relative aspect-[4/3] overflow-hidden rounded-sm bg-[#221d18]">
              <Image
                src={bfData.images.img1}
                alt={bfData.title[langKey]}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />

              {/* Discount Circular Badge */}
              <div className="butterfly-badge absolute top-4 end-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#980f0f] text-center shadow-2xl sm:h-28 sm:w-28">
                <div>
                  <p className="text-xl font-extrabold leading-none text-white sm:text-2xl">
                    {bfData.badge.discount}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/90 sm:text-[11px]">
                    {bfData.badge.label[langKey]}
                  </p>
                </div>
              </div>
            </div>

            {/* Image 2 */}
            <div className="butterfly-image-2 relative aspect-[4/3] overflow-hidden rounded-sm bg-[#221d18]">
              <Image
                src={bfData.images.img2}
                alt={`${bfData.title[langKey]} interior`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
