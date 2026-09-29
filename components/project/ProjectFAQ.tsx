"use client";

import { useState } from "react";
import Link from "next/link";

interface FaqItem {
  question: { ar: string; en: string };
  answer: { ar: string; en: string };
}

interface ProjectFAQProps {
  faqs: FaqItem[];
  isEn?: boolean;
}

export default function ProjectFAQ({ faqs, isEn = false }: ProjectFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const langKey = isEn ? "en" : "ar";

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 bg-white text-[#171410] border-t border-neutral-200/60">
      <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-neutral-500">
            FAQ
          </span>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,5vw,3.75rem)] font-bold leading-[1.1] tracking-tight text-[#171410]">
            {isEn ? "Frequently Asked Questions" : "أسئلة شائعة"}
          </h2>
        </div>

        {/* Accordion List Matching Reference Video */}
        <div className="mt-14 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="overflow-hidden rounded-sm border border-neutral-200 bg-white transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-6 text-start text-base sm:text-lg font-bold text-[#171410] transition-colors hover:text-brand focus:outline-none cursor-pointer"
                >
                  <span>{faq.question[langKey]}</span>
                  <span
                    className={`ms-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-sm font-semibold transition-transform duration-300 ${
                      isOpen ? "rotate-45 border-brand text-brand" : "text-neutral-500"
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-neutral-100 px-6 pb-6 pt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
                    {faq.answer[langKey]}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Link to Full FAQ */}
        <div className="mt-10 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-6 py-3 text-xs font-semibold text-neutral-700 transition-colors hover:border-brand hover:text-brand"
          >
            <span>{isEn ? "View All Questions" : "كل الأسئلة"}</span>
            <span aria-hidden="true" className="rtl:-scale-x-100">
              ←
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
