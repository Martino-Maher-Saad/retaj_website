"use client";

import { useEffect, useRef, useState } from "react";
import { X, CheckCircle, PhoneCall } from "lucide-react";
import { gsap } from "gsap";
import siteConfig from "@/data/site_config.json";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEn?: boolean;
  initialProject?: string;
}

export default function LeadModal({
  isOpen,
  onClose,
  isEn = false,
  initialProject = "taj-city",
}: LeadModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    project: initialProject,
  });
  const [submitted, setSubmitted] = useState(false);

  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, project: initialProject }));
  }, [initialProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const card = cardRef.current;
    if (!backdrop || !card) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(backdrop, { autoAlpha: 1, pointerEvents: "auto" });
      gsap.fromTo(
        backdrop,
        { backgroundColor: "rgba(20, 16, 14, 0)" },
        { backgroundColor: "rgba(20, 16, 14, 0.78)", duration: 0.45, ease: "power2.out" }
      );
      gsap.fromTo(
        card,
        { y: 30, autoAlpha: 0, scale: 0.96 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.55, ease: "expo.out", delay: 0.05 }
      );
    } else {
      gsap.to(card, { y: 30, autoAlpha: 0, scale: 0.96, duration: 0.3, ease: "power2.in" });
      gsap.to(backdrop, {
        autoAlpha: 0,
        backgroundColor: "rgba(20, 16, 14, 0)",
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          document.body.style.overflow = "";
          setSubmitted(false);
        },
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) return;

    const whatsapp = siteConfig.contact.whatsapp.replace(/[^0-9]/g, "");
    const msg = isEn
      ? `Hello, I would like to inquire about Madinet Masr projects:%0AName: ${encodeURIComponent(formData.name)}%0APhone: ${encodeURIComponent(formData.phone)}%0AProject: ${encodeURIComponent(formData.project)}`
      : `مرحباً، أود حجز استشارة والاستفسار عن مشاريع مدينة مصر:%0Aالاسم: ${encodeURIComponent(formData.name)}%0Aالهاتف: ${encodeURIComponent(formData.phone)}%0Aالمشروع: ${encodeURIComponent(formData.project)}`;

    window.open(`https://wa.me/${whatsapp}?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? "Book Now" : "احجز الآن"}
      className="fixed inset-0 z-[80] flex items-center justify-center px-4 sm:px-6 pointer-events-none opacity-0 invisible"
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-md rounded-2xl bg-white p-7 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.35)] border border-[#171410]/08"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={isEn ? "Close" : "إغلاق"}
          className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-[#171410] transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-[#980f0f]"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-[#171410] mb-2">
              {isEn ? "Request Received Successfully!" : "تم استلام طلبك بنجاح!"}
            </h4>
            <p className="text-sm text-[#736d65]">
              {isEn
                ? "Our senior property consultant will get in touch with you shortly."
                : "سيقوم مستشار المبيعات بالتواصل معك فوراً عبر الهاتف أو الواتساب."}
            </p>
          </div>
        ) : (
          <>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-neutral-500">
              {isEn ? "Register your interest" : "سجل بياناتك للحصول على التفاصيل"}
            </p>
            <h3 className="font-display mt-3 text-3xl font-bold leading-tight tracking-tight text-[#171410] sm:text-4xl">
              {isEn ? "Book Now" : "احجز الآن"}
            </h3>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                  {isEn ? "Full Name" : "اسمك بالكامل"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isEn ? "Full Name" : "اسمك بالكامل"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-b border-neutral-300 bg-transparent py-2.5 text-sm text-[#171410] placeholder:text-neutral-400 focus:border-[#980f0f] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                  {isEn ? "Phone Number" : "رقم الموبايل"}
                </label>
                <input
                  type="tel"
                  required
                  dir="ltr"
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border-b border-neutral-300 bg-transparent py-2.5 text-sm text-[#171410] placeholder:text-neutral-400 focus:border-[#980f0f] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-600 mb-1.5">
                  {isEn ? "Interested Project" : "المشروع المهتم به"}
                </label>
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full border-b border-neutral-300 bg-transparent py-2.5 text-sm text-[#171410] focus:border-[#980f0f] focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="">{isEn ? "Choose a project" : "اختر مشروعاً"}</option>
                  <option value="taj-city">{isEn ? "Taj City" : "تاج سيتي"}</option>
                  <option value="sarai">{isEn ? "Sarai" : "سراي"}</option>
                  <option value="butterfly">{isEn ? "Butterfly" : "بترفلاي"}</option>
                  <option value="talala">{isEn ? "Talala" : "تلالا"}</option>
                  <option value="d2n">{isEn ? "D2N" : "D2N"}</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-4 w-full py-3.5 rounded-xl bg-[#980f0f] hover:bg-[#7b0c0c] text-white font-bold text-sm tracking-wide transition-all shadow-[0_4px_18px_rgba(152,15,15,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>{isEn ? "Submit Request" : "إرسال الطلب"}</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
