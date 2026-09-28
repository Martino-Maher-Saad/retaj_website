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
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Subtitle
      gsap.fromTo(
        ".bf-description",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      // Setup initial image states
      gsap.set(".butterfly-image-1", { clipPath: "inset(100% 0 0 0)" });
      gsap.set(".butterfly-image-2", { clipPath: "inset(0 0 100% 0)", autoAlpha: 0 });

      // Figure images reveal
      if (figureRef.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: figureRef.current,
              start: "top 80%",
              once: true,
            },
          })
          .to(".butterfly-image-1", {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.5,
            ease: "expo.out",
          })
          .to(
            ".butterfly-image-2",
            {
              clipPath: "inset(0 0 0% 0)",
              autoAlpha: 1,
              duration: 1.2,
              ease: "expo.out",
            },
            "-=0.9"
          );
      }

      // Stats and pills reveal
      gsap.fromTo(
        ".bf-stat-card",
        { y: 35, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".bf-stats-container",
            start: "top 88%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".bf-pill-tag",
        { scale: 0.85, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".bf-pills-container",
            start: "top 90%",
            once: true,
          },
        }
      );

      // Red Arc SVG draw animation on scroll
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
            start: "top 75%",
            end: "bottom 25%",
            scrub: 1,
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
      className="butterfly-section relative isolate overflow-hidden bg-[#0d0c0b] py-28 sm:py-36 lg:py-44 text-[#faf8f5]"
    >
      {/* Dynamic Animated Red Arc Path */}
      <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden opacity-60">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d="M -100,200 C 400,600 900,-100 1540,750"
            stroke="#980f0f"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Top Text Content matching video at 01:03 - 01:05 */}
        <div className="text-center mx-auto max-w-3xl">
          <p className="bf-eyebrow text-[11px] font-medium uppercase tracking-[0.34em] text-neutral-400">
            {bfData.eyebrow[langKey]}
          </p>

          <div className="mt-3 overflow-hidden py-1">
            <h3 className="bf-eyebrow font-display text-2xl sm:text-3xl text-[#980f0f] font-semibold">
              {bfData.titleLine?.[langKey] || (isEn ? "The Strongest Offer in the Market" : "العرض الأقوى في السوق")}
            </h3>
          </div>

          <div className="mt-1 overflow-hidden py-1">
            <h2
              id="butterfly-name"
              className="bf-title font-display text-[clamp(3.5rem,10vw,8.5rem)] font-bold leading-[0.95] tracking-tight text-white"
            >
              {bfData.title[langKey]}
            </h2>
          </div>

          <p className="bf-description mt-6 text-[15px] sm:text-[17px] leading-relaxed text-neutral-300">
            {bfData.description[langKey]}
          </p>
        </div>

        {/* 2-Image Grid Layout Matching Video at 01:06 */}
        <div ref={figureRef} className="butterfly-figure relative z-10 mt-12 sm:mt-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 max-w-5xl mx-auto">
            <div className="butterfly-image-1 relative aspect-[16/11] overflow-hidden rounded-xl bg-[#221d18] shadow-2xl border border-white/10">
              <Image
                src={bfData.images.img1}
                alt={bfData.title[langKey]}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="butterfly-image-2 relative aspect-[16/11] overflow-hidden rounded-xl bg-[#221d18] shadow-2xl border border-white/10">
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

        {/* Stats Cards Matching Video at 01:07 - 01:08 */}
        <div className="bf-stats-container mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {bfData.stats.map((st, idx) => (
            <div
              key={idx}
              className="bf-stat-card flex flex-col items-center justify-center min-w-[170px] sm:min-w-[200px] rounded-2xl border border-white/10 bg-[#171410]/80 px-6 py-4 backdrop-blur-md"
            >
              <span
                className={`text-2xl sm:text-3xl font-extrabold ${
                  st.value === "54%" ? "text-[#f24155]" : "text-white"
                }`}
              >
                {isEn ? st.value_en || st.value : st.value}
              </span>
              <span className="mt-1 text-xs text-neutral-400 font-medium">
                {isEn ? st.sub_en || st.sub : st.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Feature Pills Matching Video at 01:08 */}
        <div className="bf-pills-container mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {bfData.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`bf-pill-tag rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-transform hover:scale-105 ${
                tag.highlight
                  ? "bg-[#980f0f] text-white shadow-md shadow-[#980f0f]/30"
                  : "bg-white/10 text-white/90 border border-white/15"
              }`}
            >
              {tag.label[langKey]}
            </span>
          ))}
        </div>

        {/* Red CTA Button Matching Video at 01:09 */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <Link
            href={isEn ? `/en${bfData.cta.href}` : bfData.cta.href}
            className="group inline-flex items-center gap-3 rounded-full bg-[#980f0f] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#980f0f]/30 transition-all hover:bg-[#7b0c0c] hover:scale-105 active:scale-95"
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
      </div>
    </section>
  );
}
