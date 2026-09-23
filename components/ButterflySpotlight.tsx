"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ButterflySpotlightProps {
  isEn?: boolean;
}

export default function ButterflySpotlight({ isEn = false }: ButterflySpotlightProps) {
  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Text elements stagger entrance
      const beats = sectionRef.current?.querySelectorAll(".butterfly-beat");
      if (beats && beats.length > 0) {
        gsap.fromTo(
          beats,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // 2. Animated Image ClipPath Reveal
      if (image1Ref.current) {
        gsap.fromTo(
          image1Ref.current,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.6,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              once: true,
            },
          }
        );
      }

      // 3. Badge Pop & Rotation
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { scale: 0, rotation: -22, autoAlpha: 0 },
          {
            scale: 1,
            rotation: -4,
            autoAlpha: 1,
            duration: 1.1,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              once: true,
            },
          }
        );
      }

      // 4. Counter Animation from 0% to 54%
      if (counterRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 54,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: counterRef.current,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(obj.val)}%`;
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="butterfly"
      className="relative isolate py-28 sm:py-36 lg:py-44 overflow-hidden bg-[#171410] text-white"
    >
      {/* Background Hero Image with ClipPath animation */}
      <div
        ref={image1Ref}
        className="absolute inset-0 -z-10 [clip-path:inset(0%_0_0_0)]"
      >
        <Image
          src="https://res.cloudinary.com/izrnyvya/image/upload/f_auto,q_auto/-C7GOU192Xka.webp"
          alt="Butterfly Compound Mostakbal City"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171410] via-[#171410]/85 to-[#171410]/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#980f0f]/40 border border-[#f24155]/40 text-[#f24155] text-xs font-semibold mb-8 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isEn ? "The strongest offer in the market" : "العرض الأقوى في السوق"}
            </span>
          </div>

          {/* Heading */}
          <h2 className="butterfly-beat text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            {isEn ? "Butterfly" : "بترفلاي"}
          </h2>

          <p className="butterfly-beat text-lg sm:text-xl text-[#d4cfc8] leading-relaxed mb-10">
            {isEn
              ? "At Butterfly, the price adapts to you. Pay cash and enjoy the market's biggest discount — 54% — or start with 1.5% down and live in 2026."
              : "في بترفلاي، السعر بيتكيف معاك. ادفع كاش واستمتع بأكبر خصم في السوق 54%، أو ابدأ بـ 1.5% مقدم وعيش في 2026."}
          </p>

          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            <div className="butterfly-beat p-7 rounded-2xl bg-white/05 backdrop-blur-xl border border-white/10 shadow-xl">
              <p className="text-xs text-[#8c857b] uppercase tracking-wider mb-2">
                {isEn ? "Cash discount" : "خصم عند الدفع كاش"}
              </p>
              <p
                ref={counterRef}
                className="text-4xl sm:text-5xl font-extrabold text-[#f24155]"
              >
                0%
              </p>
            </div>
            <div className="butterfly-beat p-7 rounded-2xl bg-white/05 backdrop-blur-xl border border-white/10 shadow-xl">
              <p className="text-xs text-[#8c857b] uppercase tracking-wider mb-2">
                {isEn ? "Payment plan" : "نظام السداد"}
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {isEn ? "1.5% down · 12 years" : "1.5% مقدم · 12 سنة"}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="butterfly-beat">
            <Link
              href={isEn ? "/en/butterfly" : "/butterfly"}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#980f0f] hover:bg-[#7b0c0c] text-white text-base font-semibold transition-all hover:shadow-[0_8px_30px_rgb(152,15,15,0.4)] hover:-translate-y-0.5"
            >
              <span>{isEn ? "Get Butterfly details" : "اعرف تفاصيل بترفلاي"}</span>
              <ArrowIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
