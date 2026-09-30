"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Unit {
  id: string;
  type: { ar: string; en: string };
  phase: string;
  category: { ar: string; en: string };
  area: string | { ar?: string; en?: string };
  startingPriceText: { ar: string; en: string };
  downPayment: string;
  monthlyInstallment?: number;
  rooms?: { ar: string; en: string } | string;
  subText?: { ar: string; en: string } | string;
  delivery?: { ar: string; en: string } | string;
}

interface Phase {
  id: string;
  name: { ar: string; en: string };
  badge: { ar: string; en: string };
  description: { ar: string; en: string };
  startingPrice: number;
  downPayment: string;
  installments: number;
  delivery?: { ar: string; en: string } | string;
  deliveryFrom?: string;
  cashDiscount?: string | { ar?: string; en?: string };
}

interface ProjectPricingPhasesProps {
  projectSlug: string;
  projectName: { ar: string; en: string };
  pricingSection: {
    headline: { ar: string; en: string };
    description: { ar: string; en: string };
    cashDiscount: string;
    cashDiscountText?: { ar: string; en: string } | string;
    deliveryFrom?: string;
    delivery?: { ar: string; en: string } | string;
  };
  phases: Phase[];
  units: Unit[];
  isEn?: boolean;
}

// Format area dynamically: "م²" in Arabic and "m²" in English
function formatArea(area: unknown, isEn: boolean): string {
  if (!area) return "";
  if (typeof area === "object" && area !== null) {
    const obj = area as { ar?: string; en?: string };
    return isEn ? obj.en || obj.ar || "" : obj.ar || obj.en || "";
  }
  const str = String(area).trim();
  // Strip existing area suffixes (م², م2, m², m2, sqm, etc.)
  const numPart = str.replace(/\s*(م²|م2|m²|m2|sqm|sq\.m|متر|متراً)\s*/gi, "").trim();
  return isEn ? `${numPart} m²` : `${numPart} م²`;
}

// Get the 2nd line of the card dynamically from projects.json (rooms/subText) or auto-derive
function getUnitSecondLine(unit: Unit, isEn: boolean): string {
  const langKey = isEn ? "en" : "ar";

  // 1. Explicit subText in unit
  if (unit.subText) {
    if (typeof unit.subText === "object") return unit.subText[langKey] || "";
    return String(unit.subText);
  }

  // 2. Explicit rooms in unit
  if (unit.rooms) {
    if (typeof unit.rooms === "object") return unit.rooms[langKey] || "";
    return String(unit.rooms);
  }

  // 3. Auto-derived from unit.type
  const typeAr = unit.type?.ar || "";
  const typeEn = unit.type?.en || "";

  if (
    typeAr.includes("غرفة نوم واحدة") ||
    typeAr.includes("غرفة واحدة") ||
    typeEn.toLowerCase().includes("1 bedroom")
  ) {
    return isEn ? "1 Bedroom" : "غرفة واحدة";
  }
  if (
    typeAr.includes("غرفتين") ||
    typeAr.includes("2 غرفة") ||
    typeEn.toLowerCase().includes("2 bedroom")
  ) {
    return isEn ? "2 Bedrooms" : "غرفتين نوم";
  }
  if (
    typeAr.includes("3 غرف") ||
    typeAr.includes("ثلاث غرف") ||
    typeEn.toLowerCase().includes("3 bedroom")
  ) {
    return isEn ? "3 Bedrooms" : "3 غرف نوم";
  }
  if (
    typeAr.includes("4 غرف") ||
    typeAr.includes("أربع غرف") ||
    typeEn.toLowerCase().includes("4 bedroom")
  ) {
    return isEn ? "4 Bedrooms" : "4 غرف نوم";
  }
  if (typeAr.includes("تاون هاوس") || typeEn.toLowerCase().includes("townhouse")) {
    return isEn ? "Townhouse" : "تاون هاوس";
  }
  if (typeAr.includes("لوفت") || typeEn.toLowerCase().includes("loft")) {
    return isEn ? "Loft" : "لوفت بريميوم";
  }
  if (typeAr.includes("مكتب") || typeEn.toLowerCase().includes("office")) {
    return isEn ? "Office" : "مكتب إداري";
  }
  if (typeAr.includes("عيادة") || typeEn.toLowerCase().includes("clinic")) {
    return isEn ? "Clinic" : "عيادة طبية";
  }

  // 4. Fallback to monthlyInstallment or downPayment
  if (unit.monthlyInstallment) {
    return isEn
      ? `From EGP ${unit.monthlyInstallment.toLocaleString()}/mo`
      : `قسط يبدأ من ${unit.monthlyInstallment.toLocaleString()} ج/ش`;
  }
  if (unit.downPayment) {
    return isEn ? `Down payment ${unit.downPayment}` : `مقدم ${unit.downPayment}`;
  }

  return isEn ? "Available Unit" : "وحدة متاحة";
}

function formatDeliveryText(delivery?: string, isEn: boolean = false): string {
  if (!delivery) return isEn ? "1 - 3 Yrs" : "من سنة إلى 3 سنوات";
  const lower = delivery.toLowerCase();
  if (lower.includes("1 year") || lower === "1") return isEn ? "1 Year" : "سنة واحدة";
  if (lower.includes("2 year") || lower === "2") return isEn ? "2 Years" : "سنتين";
  if (lower.includes("3 year") || lower === "3") return isEn ? "3 Years" : "3 سنوات";
  if (lower.includes("4 year") || lower === "4") return isEn ? "4 Years" : "4 سنوات";
  return delivery;
}

function getDeliveryDisplay(
  phase: Phase,
  pricingSection: { deliveryFrom?: string; delivery?: { ar: string; en: string } | string },
  isEn: boolean
): string {
  const langKey = isEn ? "en" : "ar";
  if (phase.delivery) {
    if (typeof phase.delivery === "object") return phase.delivery[langKey] || "";
    return formatDeliveryText(phase.delivery, isEn);
  }
  if (pricingSection.delivery) {
    if (typeof pricingSection.delivery === "object") return pricingSection.delivery[langKey] || "";
    return formatDeliveryText(pricingSection.delivery, isEn);
  }
  return formatDeliveryText(pricingSection.deliveryFrom, isEn);
}

function getCashDiscountDisplay(
  phase: Phase,
  pricingSection: { cashDiscount?: string; cashDiscountText?: { ar: string; en: string } | string },
  isEn: boolean
): string {
  const langKey = isEn ? "en" : "ar";
  // 1. Phase-level cashDiscount (e.g. "50%" or { ar: "خصم 50%", en: "50% Discount" })
  if (phase.cashDiscount) {
    if (typeof phase.cashDiscount === "object") return phase.cashDiscount[langKey] || "";
    const cd = String(phase.cashDiscount);
    return cd.includes("%") ? `${isEn ? "Up to " : "يصل إلى "}${cd}` : cd;
  }
  // 2. Section-level cashDiscountText
  if (pricingSection.cashDiscountText) {
    if (typeof pricingSection.cashDiscountText === "object") return pricingSection.cashDiscountText[langKey] || "";
    return String(pricingSection.cashDiscountText);
  }
  // 3. Fallback to section-level cashDiscount
  const fallback = pricingSection.cashDiscount || "";
  if (fallback.includes("%")) {
    return `${isEn ? "Up to " : "يصل إلى "}${fallback}`;
  }
  return fallback;
}

export default function ProjectPricingPhases({
  projectName,
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
          {isEn
            ? `Unit Types & Areas — ${projectName.en}`
            : `أنواع وحدات ${projectName.ar} والمساحات`}
        </h3>

        {/* Phases & Units */}
        <div className="mt-6 space-y-12 sm:space-y-14">
          {phases.map((phase, pIdx) => {
            const phaseUnits = units.filter((u) => {
              const uPhase = (u.phase || "").toLowerCase().replace(/[\s-_]+/g, "");
              const pId = (phase.id || "").toLowerCase().replace(/[\s-_]+/g, "");
              const pNameEn = (phase.name?.en || "").toLowerCase().replace(/[\s-_]+/g, "");
              return uPhase === pId || uPhase === pNameEn || (uPhase === "kinda" && pId === "kindaoffices");
            });
            if (phaseUnits.length === 0) return null;
            const displayUnits = phaseUnits;

            return (
              <div key={phase.id} className="pricing-card-item">
                <h4 className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] leading-tight tracking-tight text-foreground font-semibold">
                  {phase.name[langKey]}
                </h4>

                {/* Units List */}
                <ul className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                  {displayUnits.map((unit, uIdx) => {
                    const isFeatured = pIdx === 0 && uIdx === 0;
                    const rawPrice = unit.startingPriceText[langKey] || "";
                    const hasCurrency = /جنيه|egp/i.test(rawPrice);

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
                            <dd>{formatArea(unit.area, isEn)}</dd>
                          </div>
                          <div className="flex items-center gap-2">
                            <dt className="text-neutral-400">◼</dt>
                            <dd>{getUnitSecondLine(unit, isEn)}</dd>
                          </div>
                        </dl>

                        <div className="mt-4 flex flex-1 flex-col justify-end border-t border-neutral-100 pt-3 sm:mt-5 sm:pt-4">
                          <p className="text-[10px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-neutral-500 sm:text-[11px]">
                            {isEn ? "Starts from" : "يبدأ من"}
                          </p>
                          <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 gap-y-0 sm:gap-2">
                            <span className="font-display text-[clamp(1.25rem,3.8vw,2.35rem)] leading-none tracking-tight tabular-nums text-foreground font-semibold">
                              {rawPrice}
                            </span>
                            {!hasCurrency && (
                              <span className="text-xs font-medium text-neutral-500 sm:text-sm">
                                {isEn ? "EGP" : "جنيه"}
                              </span>
                            )}
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
                      {getDeliveryDisplay(phase, pricingSection, isEn)}
                    </span>
                    <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-neutral-500 sm:text-[11px]">
                      {isEn ? "Delivery" : "التسليم"}
                    </span>
                  </div>

                  <div className="flex flex-col items-center rounded-sm border border-black/[0.06] bg-background px-4 py-4 text-center sm:min-w-[140px] sm:flex-1 sm:px-6 sm:py-5 shadow-xs">
                    <span className="font-display text-[clamp(1.3rem,3.5vw,2.25rem)] leading-none tracking-tight text-brand font-semibold tabular-nums">
                      {getCashDiscountDisplay(phase, pricingSection, isEn)}
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
