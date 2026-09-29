"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Unit {
  id: string;
  type: { ar: string; en: string };
  phase: string;
  category: { ar: string; en: string };
  area: string;
  startingPriceText: { ar: string; en: string };
  downPayment: string;
  monthlyInstallment?: number;
}

interface Phase {
  id: string;
  name: { ar: string; en: string };
  badge: { ar: string; en: string };
  description: { ar: string; en: string };
  startingPrice: number;
  downPayment: string;
  installments: number;
}

interface ProjectPricingPhasesProps {
  projectSlug: string;
  projectName: { ar: string; en: string };
  pricingSection: {
    headline: { ar: string; en: string };
    description: { ar: string; en: string };
    cashDiscount: string;
  };
  phases: Phase[];
  units: Unit[];
  isEn?: boolean;
}

export default function ProjectPricingPhases({
  pricingSection,
  phases,
  units,
  isEn = false,
}: ProjectPricingPhasesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const langKey = isEn ? "en" : "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-card-item",
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="apartments-pricing"
      ref={sectionRef}
      aria-labelledby="pricing-heading"
      className="relative scroll-mt-24 bg-[#fafaf8] py-16 sm:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Header */}
        <header className="max-w-3xl">
          <h2
            id="pricing-heading"
            className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.08] tracking-tight text-foreground rtl:leading-[1.24] font-semibold"
          >
            {pricingSection.headline[langKey]}
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-600 sm:text-base font-normal whitespace-pre-line">
            {pricingSection.description[langKey]}
          </p>
        </header>

        <h3 className="mt-10 text-[11px] font-medium uppercase tracking-[0.25em] rtl:tracking-[0.08em] text-neutral-500 sm:mt-12">
          {isEn ? "Unit Types & Areas" : "أنواع وحدات تاج سيتي والمساحات"}
        </h3>

        {/* Phases & Units */}
        <div className="mt-6 space-y-12 sm:space-y-14">
          {phases.map((phase, pIdx) => {
            const phaseUnits = units.filter(
              (u) =>
                u.phase.toLowerCase().includes(phase.id.replace("-", " ").toLowerCase()) ||
                phase.name.en.toLowerCase().includes(u.phase.toLowerCase())
            );
            const displayUnits = phaseUnits.length > 0 ? phaseUnits : units.slice(0, 3);

            return (
              <div key={phase.id} className="pricing-card-item">
                <h4 className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] leading-tight tracking-tight text-foreground font-semibold">
                  {phase.name[langKey]}
                </h4>

                {/* Units List */}
                <ul className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                  {displayUnits.map((unit, uIdx) => {
                    const isFeatured = pIdx === 0 && uIdx === 0;

                    return (
                      <li
                        key={unit.id}
                        className={`relative flex flex-col rounded-sm border bg-background p-4 sm:p-6 transition-all duration-300 hover:shadow-lg ${
                          isFeatured
                            ? "border-brand/80 shadow-[0_16px_36px_-16px_rgba(152,15,15,0.25)]"
                            : "border-black/[0.08] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.1)]"
                        }`}
                      >
                        {isFeatured && (
                          <span className="absolute -top-3 inline-flex items-center rounded-full bg-brand px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em] rtl:tracking-[0.06em] text-white sm:px-3 sm:text-[10px]">
                            {isEn ? "Best Price" : "أفضل سعر"}
                          </span>
                        )}

                        <p className="font-display text-[clamp(1.15rem,2.2vw,1.75rem)] leading-tight tracking-tight text-foreground font-semibold">
                          {unit.type[langKey]}
                        </p>
                        <p className="mt-1 text-[12px] font-medium text-brand sm:text-[13px]">
                          {unit.category[langKey]}
                        </p>

                        <dl className="mt-3 space-y-1 text-[12px] text-neutral-600 sm:mt-4 sm:space-y-1.5 sm:text-[13px]">
                          <div className="flex items-center gap-2">
                            <dt className="text-neutral-400">◼</dt>
                            <dd>{unit.area}</dd>
                          </div>
                          <div className="flex items-center gap-2">
                            <dt className="text-neutral-400">◼</dt>
                            <dd>
                              {isEn ? "Options available" : "خيارات متعددة"}
                            </dd>
                          </div>
                        </dl>

                        <div className="mt-4 flex flex-1 flex-col justify-end border-t border-neutral-100 pt-3 sm:mt-5 sm:pt-4">
                          <p className="text-[10px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-neutral-500 sm:text-[11px]">
                            {isEn ? "Starts from" : "يبدأ من"}
                          </p>
                          <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0 sm:gap-2">
                            <span className="font-display text-[clamp(1.25rem,3.8vw,2.35rem)] leading-none tracking-tight tabular-nums text-foreground font-semibold">
                              {unit.startingPriceText[langKey]}
                            </span>
                            <span className="text-xs font-medium text-neutral-500 sm:text-sm">
                              {isEn ? "EGP" : "جنيه"}
                            </span>
                          </p>
                        </div>

                        <a
                          href="#contact"
                          className="mt-6 hidden w-full items-center justify-center rounded-full bg-brand px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition-all duration-300 hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:inline-flex cursor-pointer"
                        >
                          {isEn ? "Details" : "اعرف التفاصيل"}
                        </a>
                      </li>
                    );
                  })}
                </ul>

                {/* Terms Row matching live site */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:flex sm:flex-wrap sm:gap-5">
                  <div className="flex flex-col items-center rounded-sm border border-black/[0.06] bg-background px-4 py-4 text-center sm:min-w-[140px] sm:flex-1 sm:px-6 sm:py-5 shadow-xs">
                    <span className="font-display text-[clamp(1.3rem,3.5vw,2.25rem)] leading-none tracking-tight text-brand font-semibold tabular-nums">
                      {phase.downPayment}
                    </span>
                    <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-neutral-500 sm:text-[11px]">
                      {isEn ? "Down payment" : "مقدم"}
                    </span>
                  </div>

                  <div className="flex flex-col items-center rounded-sm border border-black/[0.06] bg-background px-4 py-4 text-center sm:min-w-[140px] sm:flex-1 sm:px-6 sm:py-5 shadow-xs">
                    <span className="font-display text-[clamp(1.3rem,3.5vw,2.25rem)] leading-none tracking-tight text-brand font-semibold tabular-nums">
                      {phase.installments} {isEn ? "Years" : "سنوات"}
                    </span>
                    <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-neutral-500 sm:text-[11px]">
                      {isEn ? "Installments" : "أقساط"}
                    </span>
                  </div>

                  <div className="flex flex-col items-center rounded-sm border border-black/[0.06] bg-background px-4 py-4 text-center sm:min-w-[140px] sm:flex-1 sm:px-6 sm:py-5 shadow-xs">
                    <span className="font-display text-[clamp(1.3rem,3.5vw,2.25rem)] leading-none tracking-tight text-brand font-semibold tabular-nums">
                      {isEn ? "2.5 - 4 Yrs" : "سنتين ونصف"}
                    </span>
                    <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-neutral-500 sm:text-[11px]">
                      {isEn ? "Delivery" : "التسليم"}
                    </span>
                  </div>

                  <div className="flex flex-col items-center rounded-sm border border-black/[0.06] bg-background px-4 py-4 text-center sm:min-w-[140px] sm:flex-1 sm:px-6 sm:py-5 shadow-xs">
                    <span className="font-display text-[clamp(1.3rem,3.5vw,2.25rem)] leading-none tracking-tight text-brand font-semibold tabular-nums">
                      {pricingSection.cashDiscount.includes("%")
                        ? `${isEn ? "Up to " : "يصل إلى "}${pricingSection.cashDiscount}`
                        : pricingSection.cashDiscount}
                    </span>
                    <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-neutral-500 sm:text-[11px]">
                      {isEn ? "Cash discount" : "خصم كاش"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 sm:mt-12">
          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center rounded-full bg-brand px-8 py-3.5 text-xs font-medium uppercase tracking-wider text-white transition-all duration-300 hover:bg-brand-hover hover:scale-[1.02] shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto cursor-pointer"
          >
            {isEn
              ? "Book a Site Visit & Get Full Price List"
              : "احجز معاينة واحصل على كامل الأسعار"}
          </a>
        </div>
      </div>
    </section>
  );
}
