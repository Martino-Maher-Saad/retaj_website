"use client";

import { useState, useEffect } from "react";
import { UserPlus, Phone } from "lucide-react";
import { gsap } from "gsap";
import LeadModal from "@/components/LeadModal";
import homeContent from "@/data/home_content.json";

interface FloatingActionBarProps {
  isEn?: boolean;
}

export default function FloatingActionBar({ isEn = false }: FloatingActionBarProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const floatData = homeContent.floating;
  const langKey = isEn ? "en" : "ar";

  const phone = floatData.phone;
  const rawPhone = `+20${phone.replace(/^0/, "")}`;
  const whatsapp = floatData.whatsapp.replace(/[^0-9]/g, "");
  const waText = encodeURIComponent(floatData.whatsappMessage[langKey]);

  // Slide in after small delay on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const bar = document.getElementById("float-bar");
    if (!bar) return;
    if (visible) {
      gsap.fromTo(
        bar,
        { y: 80, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out" }
      );
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-4 z-[55] flex justify-center px-4 md:bottom-6 pointer-events-none">
        <div id="float-bar" className="relative pointer-events-auto" style={{ opacity: 0 }}>
          {/* Main Floating Pill */}
          <div className="relative flex items-center gap-2 rounded-full border border-white/15 bg-[#171410]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-md">
            {/* Book Now — red pill button */}
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              aria-label={floatData.bookNow[langKey]}
              id="float-book-btn"
              className="flex items-center gap-2 rounded-full bg-[#980f0f] px-5 py-3 text-sm font-semibold text-white transition-[transform,background-color] hover:scale-[1.03] hover:bg-[#7b0c0c] active:scale-95 md:px-6 shadow-sm"
            >
              <UserPlus className="h-4 w-4 stroke-[2.2]" />
              <span>{floatData.bookNow[langKey]}</span>
            </button>

            {/* WhatsApp — green circle */}
            <a
              href={`https://wa.me/2${whatsapp}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={floatData.whatsappLabel[langKey]}
              id="float-whatsapp-btn"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105 active:scale-95 shadow-sm"
            >
              <svg aria-hidden="true" fill="currentColor" height="22" viewBox="0 0 24 24" width="22">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>

            {/* Phone — red circle with call-ring animation */}
            <a
              href={`tel:${rawPhone}`}
              aria-label={floatData.callLabel[langKey]}
              id="float-phone-btn"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#980f0f] text-white transition-transform hover:scale-105 active:scale-95 shadow-sm"
            >
              <Phone className="call-ring h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} isEn={isEn} />
    </>
  );
}
