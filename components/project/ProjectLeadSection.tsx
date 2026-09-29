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
    <section className="relative py-24 sm:py-32 bg-[#0e0c0a] text-white">
      <div className="mx-auto max-w-xl px-6 sm:px-10">
        {/* Centered Heading & Subtitle Matching 15.PNG */}
        <div className="text-center">
          <p className="text-sm sm:text-base leading-relaxed text-neutral-300">
            {isEn
              ? "Our consultants are ready to answer all your questions and help you choose the ideal unit."
              : "خبراؤنا جاهزون للإجابة على كل أسئلتك ومساعدتك في اختيار الوحدة المثالية."}
          </p>
        </div>

        {submitted ? (
          <div className="mt-12 rounded-sm border border-brand/40 bg-brand/10 p-8 text-center">
            <span className="font-display text-2xl font-bold text-white">
              {isEn ? "Thank you! Your request has been sent." : "شكراً لك! تم استلام طلبك بنجاح."}
            </span>
            <p className="mt-2 text-sm text-neutral-300">
              {isEn
                ? "Our sales consultant will get in touch with you shortly."
                : "سيتواصل معك مستشار المبيعات في أقرب وقت لتزويدك بكافة التفاصيل."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-12 space-y-8">
            {/* Name Input with Red Label Matching 15.PNG */}
            <div>
              <label htmlFor="lead-name" className="block text-xs font-semibold text-brand">
                {isEn ? "Name" : "الاسم"}
              </label>
              <input
                id="lead-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-2 block w-full border-b border-neutral-700 bg-transparent py-2.5 text-sm text-white placeholder-neutral-500 focus:border-brand focus:outline-none"
                placeholder={isEn ? "Full Name" : "اسمك بالكامل"}
              />
            </div>

            {/* Phone Input with Red Label Matching 15.PNG */}
            <div>
              <label htmlFor="lead-phone" className="block text-xs font-semibold text-brand">
                {isEn ? "Mobile Number" : "رقم الموبايل"}
              </label>
              <input
                id="lead-phone"
                type="tel"
                required
                dir="ltr"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-2 block w-full border-b border-neutral-700 bg-transparent py-2.5 text-sm text-white placeholder-neutral-500 text-start focus:border-brand focus:outline-none"
                placeholder="01XXXXXXXXX"
              />
            </div>

            {/* Project Select with Red Label Matching 15.PNG */}
            <div>
              <label htmlFor="lead-project" className="block text-xs font-semibold text-brand">
                {isEn ? "Interested Project" : "المشروع المهتم به"}
              </label>
              <select
                id="lead-project"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="mt-2 block w-full border-b border-neutral-700 bg-transparent py-2.5 text-sm text-white focus:border-brand focus:outline-none cursor-pointer"
              >
                <option value={projectSlug} className="bg-[#171410] text-white">
                  {projectName[langKey]}
                </option>
                <option value="taj-city" className="bg-[#171410] text-white">
                  تاج سيتي — Taj City
                </option>
                <option value="sarai" className="bg-[#171410] text-white">
                  سراي — Sarai
                </option>
                <option value="butterfly" className="bg-[#171410] text-white">
                  بترفلاي — Butterfly
                </option>
                <option value="talala" className="bg-[#171410] text-white">
                  تلالا — Talala
                </option>
                <option value="d2n" className="bg-[#171410] text-white">
                  D2N مول — D2N
                </option>
              </select>
            </div>

            {/* Red Pill Submit Button Matching 15.PNG */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-brand px-12 py-3 text-sm font-bold text-white shadow-xl transition-all hover:bg-[#7b0c0c] hover:scale-105 cursor-pointer"
              >
                {isEn ? "Submit Request" : "إرسال الطلب"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
