"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LeadModal from "@/components/LeadModal";

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
  projectSlug,
  pricingSection,
  phases,
  units,
  isEn = false,
}: ProjectPricingPhasesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const langKey = isEn ? "en" : "ar";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-fade-elem",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "expo.out",
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
      ref={sectionRef}
      id="pricing"
      className="relative py-24 sm:py-32 lg:py-36 bg-[#faf8f5] text-[#171410] border-t border-neutral-200/70"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Main Section Header Matching 5.PNG */}
        <div className="max-w-4xl">
          <h2 className="pricing-fade-elem font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-[#171410]">
            {pricingSection.headline[langKey]}
          </h2>

          <p className="pricing-fade-elem mt-6 text-base leading-relaxed text-neutral-600 sm:text-lg">
            {pricingSection.description[langKey]}
          </p>
        </div>

        {/* Phases & Units List Matching 6.PNG, 7.PNG, 8.PNG, 9.PNG */}
        <div className="mt-20 space-y-28">
          {phases.map((phase) => {
            // Units belonging to this phase
            const phaseUnits = units.filter(
              (u) =>
                u.phase.toLowerCase().includes(phase.id.replace("-", " ").toLowerCase()) ||
                phase.name.en.toLowerCase().includes(u.phase.toLowerCase())
            );
            const displayUnits = phaseUnits.length > 0 ? phaseUnits : units.slice(0, 2);

            return (
              <div key={phase.id} className="pricing-fade-elem space-y-8">
                {/* Phase Header with Red Accent */}
                <div>
                  <span className="text-[11px] font-medium text-neutral-400">
                    {isEn ? "Unit Types & Areas" : "أنواع وحدات ومساحات"}
                  </span>
                  <div className="mt-2 flex items-center justify-between">
                    <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#171410]">
                      {phase.name[langKey]}
                    </h3>
                    <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-brand" />
                  </div>
                </div>

                {/* Units Cards Grid Matching 6.PNG & 7.PNG */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayUnits.map((unit, uIdx) => (
                    <div
                      key={unit.id}
                      className="group relative flex flex-col justify-between rounded-md border border-neutral-200/90 bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] hover:border-brand/40"
                    >
                      {/* Top Red Badge if applicable */}
                      {uIdx === 0 && (
                        <span className="absolute -top-3 end-6 rounded-full bg-brand px-3 py-0.5 text-[11px] font-bold text-white shadow-xs">
                          {isEn ? "Best Price" : "أفضل سعر"}
                        </span>
                      )}

                      <div>
                        <h4 className="font-display text-2xl font-bold text-[#171410]">
                          {unit.type[langKey]}
                        </h4>
                        <p className="mt-1 text-xs font-semibold text-brand">
                          {unit.category[langKey]}
                        </p>

                        <div className="mt-5 space-y-1.5 text-xs text-neutral-500">
                          <p className="flex items-center gap-2">
                            <span className="text-neutral-400">▪</span>
                            <span>{unit.area}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-neutral-400">▪</span>
                            <span>
                              {isEn ? "Single / Multi Room Options" : "غرفة واحدة ومساحات متعددة"}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 border-t border-neutral-100 pt-5">
                        <span className="text-[11px] text-neutral-400">
                          {isEn ? "Starts from" : "يبدأ من"}
                        </span>
                        <p className="font-display text-2xl sm:text-3xl font-bold text-[#171410] mt-1">
                          {unit.startingPriceText[langKey]}
                        </p>

                        <button
                          type="button"
                          onClick={() => setModalOpen(true)}
                          className="mt-5 w-full rounded-sm bg-brand py-3.5 text-center text-xs font-bold text-white shadow-xs transition-all hover:bg-[#7b0c0c] hover:shadow-md cursor-pointer"
                        >
                          {isEn ? "View Details" : "اعرف التفاصيل"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Terms Row Matching 6.PNG & 7.PNG with Big Red Numbers */}
                <div className="grid grid-cols-2 gap-4 rounded-md border border-neutral-200/80 bg-white p-6 sm:grid-cols-4 sm:p-7 text-center shadow-xs">
                  <div>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-brand">
                      {phase.downPayment}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {isEn ? "Down payment" : "مقدم"}
                    </p>
                  </div>

                  <div>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-[#171410]">
                      {phase.installments} {isEn ? "Years" : "سنوات"}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {isEn ? "Equal installments" : "أقساط متأخرة"}
                    </p>
                  </div>

                  <div>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-[#171410]">
                      {isEn ? "2.5 - 4 Yrs" : "سنتين ونصف"}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {isEn ? "Delivery" : "التسليم"}
                    </p>
                  </div>

                  <div>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-brand">
                      {pricingSection.cashDiscount.includes("%")
                        ? `${isEn ? "Up to " : "يصل إلى "}${pricingSection.cashDiscount}`
                        : pricingSection.cashDiscount}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {isEn ? "Cash discount" : "خصم كاش"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Main CTA */}
        <div className="mt-20 text-center">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-3 rounded-full bg-brand px-10 py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-[#7b0c0c] hover:scale-105 cursor-pointer"
          >
            <span>
              {isEn
                ? "Book a Site Visit & Get Full Price List"
                : "احجز معاينة واحصل على كامل الأسعار"}
            </span>
            <span aria-hidden="true" className="rtl:-scale-x-100">
              ←
            </span>
          </button>
        </div>
      </div>

      {/* Lead Booking Modal */}
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isEn={isEn}
        initialProject={projectSlug}
      />
    </section>
  );
}
