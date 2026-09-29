"use client";

import { useState } from "react";
import siteConfig from "@/data/site_config.json";

interface ProjectLeadSectionProps {
  projectName: { ar: string; en: string };
  projectSlug: string;
  isEn?: boolean;
}

export default function ProjectLeadSection({
  projectName,
  projectSlug,
  isEn = false,
}: ProjectLeadSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    project: projectSlug,
  });
  const [submitted, setSubmitted] = useState(false);
  const langKey = isEn ? "en" : "ar";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Direct WhatsApp lead trigger with project name
    const text = encodeURIComponent(
      `مرحباً، أريد الاستفسار عن مشروع ${projectName[langKey]}.\nالاسم: ${formData.name}\nالموبايل: ${formData.phone}`
    );
    window.open(
      `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${text}`,
      "_blank"
    );
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-[#14110f] py-32 text-white sm:py-40 lg:py-48"
    >
      {/* Top Divider SVG matching live Section 7 */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-full max-w-7xl"
        viewBox="0 0 1280 1"
        preserveAspectRatio="none"
        fill="none"
      >
        <line
          className="contact-rule"
          x1="0"
          y1="0.5"
          x2="1280"
          y2="0.5"
          stroke="#980f0f"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
      </svg>

      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14">
        <header className="mx-auto max-w-2xl text-center">
          <p className="contact-eyebrow text-brand text-[11px] font-medium uppercase tracking-[0.25em] rtl:tracking-[0.08em]">
            {isEn ? "Contact Form" : "نموذج التواصل"}
          </p>
          <h2
            id="contact-heading"
            className="contact-heading font-display mt-4 text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.08] tracking-tight text-white rtl:leading-[1.24] font-semibold"
          >
            {isEn
              ? `Start Your Journey in ${projectName.en} Today`
              : `ابدأ رحلتك في ${projectName.ar} اليوم`}
          </h2>
          <p className="contact-body mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-400 sm:text-base font-normal">
            {isEn
              ? "Our consultants are ready to answer all your questions and help you choose the ideal unit."
              : "خبراؤنا جاهزون للإجابة على كل أسئلتك ومساعدتك في اختيار الوحدة المثالية."}
          </p>
        </header>

        {submitted ? (
          <div className="mx-auto mt-16 max-w-xl rounded-sm border border-brand/40 bg-brand/10 p-8 text-center sm:mt-20">
            <span className="font-display text-2xl font-semibold text-white">
              {isEn
                ? "Thank you! Your request has been sent."
                : "شكراً لك! تم استلام طلبك بنجاح."}
            </span>
            <p className="mt-2 text-sm text-neutral-300">
              {isEn
                ? "Our sales consultant will get in touch with you shortly."
                : "سيتواصل معك مستشار المبيعات في أقرب وقت لتزويدك بكافة التفاصيل."}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-xl flex-col gap-8 mt-14 sm:mt-18"
          >
            <div className="contact-row">
              <label
                htmlFor="lead-name"
                className="block text-[11px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-brand"
              >
                {isEn ? "Name" : "الاسم"}
              </label>
              <div className="mt-2">
                <input
                  id="lead-name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder={isEn ? "Your Full Name" : "اسمك بالكامل"}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-transparent py-3 text-[15px] text-white placeholder:text-neutral-500 focus:outline-none transition-colors border-b border-white/20 focus:border-brand"
                />
              </div>
            </div>

            <div className="contact-row">
              <label
                htmlFor="lead-phone"
                className="block text-[11px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-brand"
              >
                {isEn ? "Mobile Number" : "رقم الموبايل"}
              </label>
              <div className="mt-2">
                <input
                  id="lead-phone"
                  type="tel"
                  dir="ltr"
                  autoComplete="tel"
                  inputMode="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-transparent py-3 text-[15px] text-white placeholder:text-neutral-500 focus:outline-none transition-colors border-b border-white/20 focus:border-brand text-start"
                />
              </div>
            </div>

            <div className="contact-row">
              <label
                htmlFor="lead-project"
                className="block text-[11px] font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-brand"
              >
                {isEn ? "Interested Project" : "المشروع المهتم به"}
              </label>
              <div className="mt-2">
                <select
                  id="lead-project"
                  value={formData.project}
                  onChange={(e) =>
                    setFormData({ ...formData, project: e.target.value })
                  }
                  className="w-full bg-transparent py-3 text-[15px] text-white placeholder:text-neutral-500 focus:outline-none transition-colors border-b border-white/20 focus:border-brand cursor-pointer appearance-none pe-8"
                >
                  <option value="taj-city" className="bg-[#14110f] text-white">
                    تاج سيتي — Taj City
                  </option>
                  <option value="sarai" className="bg-[#14110f] text-white">
                    سراي — Sarai
                  </option>
                  <option value="butterfly" className="bg-[#14110f] text-white">
                    بترفلاي — Butterfly
                  </option>
                  <option value="talala" className="bg-[#14110f] text-white">
                    تلالا — Talala
                  </option>
                  <option value="d2n" className="bg-[#14110f] text-white">
                    D2N مول — D2N
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="rounded-full bg-brand px-10 py-3.5 text-xs font-medium uppercase tracking-wider text-white shadow-xl transition-all duration-300 hover:bg-brand-hover hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand cursor-pointer"
              >
                {isEn ? "Submit Request" : "إرسال الطلب"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Bottom Divider SVG */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px w-full max-w-7xl"
        viewBox="0 0 1280 1"
        preserveAspectRatio="none"
        fill="none"
      >
        <line
          className="contact-rule"
          x1="0"
          y1="0.5"
          x2="1280"
          y2="0.5"
          stroke="#980f0f"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
      </svg>
    </section>
  );
}
