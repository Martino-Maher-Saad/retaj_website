"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import galleryData from "@/data/gallery.json";
import siteConfig from "@/data/site_config.json";

interface GalleryViewProps {
  isEn?: boolean;
}

export default function GalleryView({ isEn = false }: GalleryViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const langKey = isEn ? "en" : "ar";

  const filteredItems = useMemo(() => {
    if (selectedFilter === "all") return galleryData.items;
    return galleryData.items.filter((item) => item.project === selectedFilter);
  }, [selectedFilter]);

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : 0
    );
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
    );
  }, [lightboxIndex, filteredItems.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        if (isEn) handleNext();
        else handlePrev();
      }
      if (e.key === "ArrowLeft") {
        if (isEn) handlePrev();
        else handleNext();
      }
    },
    [lightboxIndex, isEn, handleNext, handlePrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    isEn
      ? "Hello, I would like to receive the masterplans and high-resolution brochure for Madinet Masr projects."
      : "مرحباً، أود الحصول على المخططات الهندسية والبروشور بجودة عالية لمشاريع مدينة مصر."
  )}`;

  return (
    <div className="bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Page Header */}
        <header className="text-center max-w-4xl mx-auto">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] rtl:tracking-[0.08em] text-brand">
            {isEn ? "Visual Showcase" : "معرض الصور والمخططات"}
          </p>
          <h1 className="font-display mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] font-semibold leading-[1.08] tracking-tight text-foreground rtl:leading-[1.24]">
            {isEn
              ? "A Visual Journey Across Madinet Masr"
              : "جولة بصرية في أرقى مجتمعات مدينة مصر"}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-600 sm:text-base font-normal">
            {isEn
              ? "Explore high-resolution masterplans, architectural designs, villa renderings, and delivered communities across our premier developments."
              : "استكشف صور التصميمات المعمارية، المخططات الهندسية، نماذج الفيلات والشقق، والمراحل المتسلمة على أرض الواقع."}
          </p>
        </header>

        {/* Filter Pills */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-2">
          {galleryData.filters.map((filter) => {
            const isActive = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => {
                  setSelectedFilter(filter.id);
                  setLightboxIndex(null);
                }}
                className={`rounded-full px-5 py-2 text-xs font-medium tracking-normal transition-all cursor-pointer ${
                  isActive
                    ? "bg-brand text-white shadow-xs"
                    : "border border-neutral-200/90 bg-white text-neutral-600 hover:border-brand/40 hover:text-brand"
                }`}
              >
                {filter.name[langKey]}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative cursor-pointer overflow-hidden rounded-sm border border-black/[0.06] bg-white shadow-xs transition-all duration-300 hover:shadow-lg hover:border-black/15"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <Image
                  src={item.image}
                  alt={item.title[langKey]}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover Dark Overlay & Expand Icon */}
                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full bg-white/90 text-[#14110f] shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Maximize2 className="h-5 w-5" />
                  </div>
                </div>

                {/* Top Badge */}
                <span className="absolute start-3 top-3 rounded-full bg-[#14110f]/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md">
                  {item.projectName[langKey]}
                </span>
              </div>

              {/* Caption */}
              <div className="p-4 sm:p-5">
                <span className="text-[11px] font-medium uppercase tracking-wider text-brand">
                  {item.tag[langKey]}
                </span>
                <h3 className="font-display mt-1 text-base sm:text-lg font-semibold text-foreground">
                  {item.title[langKey]}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Brochure Download CTA Box */}
        <div className="mt-20 rounded-sm border border-black/[0.06] bg-[#fdfbf9] p-8 text-center sm:p-14 shadow-xs">
          <span className="text-xs font-medium uppercase tracking-[0.2em] rtl:tracking-[0.06em] text-brand">
            {isEn ? "Full Sales Kit & Brochure" : "البروشور الكامل ومخططات المشاريع"}
          </span>
          <h2 className="font-display mt-2 text-2xl sm:text-4xl font-semibold text-foreground">
            {isEn
              ? "Download Full High-Resolution PDF Brochure"
              : "احصل على البروشور الكامل والمخططات الهندسية بجودة عالية"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base font-normal">
            {isEn
              ? "Connect with us on WhatsApp to receive the complete sales kit with architectural layouts, unit specifications, and current price lists."
              : "تواصل مع فريق المبيعات مباشرة عبر واتساب لاستلام الكتالوج الشامل، المخططات الهندسية للأدوار، وقوائم الأسعار المحدثة."}
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-brand px-8 py-3 text-xs font-medium uppercase tracking-wider text-white shadow-md hover:bg-brand-hover hover:scale-105 transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>{isEn ? "Request Sales Kit on WhatsApp" : "اطلب البروشور عبر واتساب"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
        >
          {/* Top Bar with Counter and Close */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-6 text-white z-20">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-brand px-3 py-1 text-xs font-medium uppercase tracking-wider">
                {activeLightboxItem.projectName[langKey]}
              </span>
              <span className="text-xs text-neutral-400 font-normal">
                {activeLightboxItem.tag[langKey]}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-neutral-400 font-medium tabular-nums">
                {(lightboxIndex ?? 0) + 1} / {filteredItems.length}
              </span>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setLightboxIndex(null)}
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Prev Button */}
          <button
            type="button"
            aria-label="Previous image"
            onClick={handlePrev}
            className="absolute start-4 top-1/2 -translate-y-1/2 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6 rtl:rotate-180" />
          </button>

          {/* Main Lightbox Image */}
          <div className="relative aspect-[16/10] max-h-[82vh] w-full max-w-5xl overflow-hidden rounded-sm">
            <Image
              src={activeLightboxItem.image}
              alt={activeLightboxItem.title[langKey]}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Next Button */}
          <button
            type="button"
            aria-label="Next image"
            onClick={handleNext}
            className="absolute end-4 top-1/2 -translate-y-1/2 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6 rtl:rotate-180" />
          </button>

          {/* Bottom Caption */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-center text-white z-20 bg-gradient-to-t from-black/80 to-transparent">
            <p className="font-display text-lg sm:text-xl font-semibold">
              {activeLightboxItem.title[langKey]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
