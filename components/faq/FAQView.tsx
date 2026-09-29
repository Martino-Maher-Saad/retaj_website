"use client";

import { useState, useMemo } from "react";
import { Search, MessageSquare } from "lucide-react";
import faqsData from "@/data/faqs.json";
import siteConfig from "@/data/site_config.json";

interface FAQViewProps {
  isEn?: boolean;
}

export default function FAQView({ isEn = false }: FAQViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ "faq-1": true });

  const langKey = isEn ? "en" : "ar";

  const categories = useMemo(() => {
    const allLabel = isEn ? "All" : "الكل";
    return [{ id: "all", name: { ar: allLabel, en: allLabel } }, ...faqsData.categories];
  }, [isEn]);

  const filteredFaqs = useMemo(() => {
    return faqsData.items.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      if (!searchQuery.trim()) return matchesCategory;

      const q = searchQuery.toLowerCase();
      const questionText = item.question[langKey].toLowerCase();
      const answerText = item.answer[langKey].toLowerCase();
      return matchesCategory && (questionText.includes(q) || answerText.includes(q));
    });
  }, [selectedCategory, searchQuery, langKey]);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    isEn
      ? "Hello, I have an inquiry regarding Madinet Masr projects."
      : "مرحباً، لدي استفسار بخصوص مشاريع مدينة مصر."
  )}`;

  return (
    <div className="bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-10 lg:px-14">
        {/* Page Header */}
        <header className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] rtl:tracking-[0.08em] text-brand">
            {isEn ? "Questions & Answers" : "الأسئلة الشائعة"}
          </p>
          <h1 className="font-display mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.08] tracking-tight text-foreground rtl:leading-[1.24]">
            {isEn
              ? "Everything You Need to Know About Madinet Masr"
              : "كل ما تريد معرفته عن مشاريع مدينة مصر"}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-600 sm:text-base font-normal">
            {isEn
              ? "Clear, transparent answers on 2026 prices, down payments, payment plans, delivery timelines, and cash discounts."
              : "إجابات شفافة ودقيقة حول أسعار 2026، أنظمة السداد، نسب المقدم، فترات التقسيط، ومواعيد التسليم لجميع المشروعات."}
          </p>
        </header>

        {/* Live Search Bar */}
        <div className="mx-auto mt-10 max-w-xl">
          <div className="relative">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? "Search by keyword, project, or price..." : "ابحث عن مشروع، سؤال، أو نظام سداد..."}
              className="w-full rounded-full border border-neutral-300/80 bg-white py-3.5 pe-6 ps-12 text-sm text-foreground shadow-xs placeholder-neutral-400 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/20 transition-all font-normal"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute end-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 hover:text-foreground cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-5 py-2 text-xs font-medium tracking-normal transition-all cursor-pointer ${
                  isActive
                    ? "bg-brand text-white shadow-xs"
                    : "border border-neutral-200/90 bg-white text-neutral-600 hover:border-brand/40 hover:text-brand"
                }`}
              >
                {cat.name[langKey]}
              </button>
            );
          })}
        </div>

        {/* Questions Accordion List */}
        <div className="mt-12 space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="rounded-sm border border-neutral-200/80 bg-white p-12 text-center">
              <p className="font-display text-lg font-semibold text-foreground">
                {isEn ? "No matching questions found" : "لم نجد نتائج مطابقة لبحثك"}
              </p>
              <p className="mt-2 text-sm text-neutral-500 font-normal">
                {isEn
                  ? "Try searching with different terms or contact our consultants directly."
                  : "جرب البحث بكلمات مختلفة أو تواصل مباشرة مع مستشارينا للإجابة عن استفسارك."}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white shadow-xs hover:bg-brand-hover transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{isEn ? "Ask on WhatsApp" : "اسألنا عبر واتساب"}</span>
              </a>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = Boolean(openIds[faq.id]);
              return (
                <div
                  key={faq.id}
                  className={`overflow-hidden rounded-sm border bg-white transition-all duration-200 ${
                    isOpen ? "border-brand/40 shadow-xs" : "border-black/[0.06] hover:border-black/15"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-start cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 text-xs font-medium text-brand">
                        [{faq.categoryName[langKey]}]
                      </span>
                      <h2 className="font-display text-[15px] font-semibold text-foreground sm:text-[17px] tracking-tight">
                        {faq.question[langKey]}
                      </h2>
                    </div>

                    <span
                      aria-hidden="true"
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full text-sm transition-transform duration-300 ${
                        isOpen
                          ? "bg-brand text-white rotate-45"
                          : "bg-brand/10 text-brand"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-neutral-100 px-5 pb-6 pt-4 text-[14px] leading-relaxed text-neutral-600 sm:px-6 sm:text-[15px] whitespace-pre-line font-normal">
                      {faq.answer[langKey]}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* WhatsApp Call to Action Box */}
        <div className="mt-16 rounded-sm border border-black/[0.06] bg-[#fdfbf9] p-8 text-center sm:p-12 shadow-xs">
          <span className="text-xs font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-brand">
            {isEn ? "Direct Consultation" : "استشارة مباشرة"}
          </span>
          <h3 className="font-display mt-2 text-2xl sm:text-3xl font-semibold text-foreground">
            {isEn ? "Have a question not answered here?" : "هل لديك سؤال آخر لم تجد إجابته؟"}
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base font-normal">
            {isEn
              ? "Our real estate consultants are available 24/7 to provide project details, brochures, and payment schedules."
              : "فريق المبيعات جاهز فوراً لمساعدتك وإرسال البروشورات الرسمية وجداول الأقساط المحدثة."}
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-brand px-8 py-3 text-xs font-medium uppercase tracking-wider text-white shadow-md hover:bg-brand-hover hover:scale-105 transition-all cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{isEn ? "Chat with Consultant" : "تحدث مع مستشار المبيعات الآن"}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
