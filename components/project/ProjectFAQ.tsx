"use client";

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
  const langKey = isEn ? "en" : "ar";

  if (!faqs || faqs.length === 0) return null;

  return (
    <section
      id="quick_faq"
      aria-labelledby="quick-faq-heading"
      className="relative bg-background py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-3xl">
          <h2
            id="quick-faq-heading"
            className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.08] tracking-tight text-foreground rtl:leading-[1.24] font-semibold"
          >
            {isEn ? "Frequently Asked Questions" : "أسئلة شائعة"}
          </h2>

          <div className="mt-8 sm:mt-10 flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="group rounded-sm border border-black/[0.06] bg-white px-6 py-5 transition-all duration-300 open:border-brand/40 hover:border-black/15 shadow-xs"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[15px] font-medium text-foreground sm:text-[17px] tracking-tight">
                    {faq.question[langKey]}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand text-sm transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 whitespace-pre-line text-[14px] sm:text-[15px] leading-relaxed text-neutral-600 font-normal">
                  {faq.answer[langKey]}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href={isEn ? "/en/faq" : "/faq"}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-foreground transition-all duration-300 hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand cursor-pointer"
            >
              <span>{isEn ? "All Questions" : "كل الأسئلة"}</span>
              <span aria-hidden="true" className="rtl:rotate-180">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
