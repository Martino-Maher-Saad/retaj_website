"use client";

import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import siteConfig from "@/data/site_config.json";

interface FloatingActionBarProps {
  isEn?: boolean;
  onOpenModal?: () => void;
}

export default function FloatingActionBar({ isEn = false, onOpenModal }: FloatingActionBarProps) {
  const phone = siteConfig.contact.display_phone || "01200603555";
  const whatsapp = siteConfig.contact.whatsapp || "+201200603555";

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 p-1.5 bg-[#171410]/90 backdrop-blur-xl border border-white/15 rounded-full shadow-2xl">
        {/* Call Button */}
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
          title={isEn ? "Call Sales" : "اتصال فوري"}
        >
          <Phone className="w-3.5 h-3.5 text-[#f24155]" />
          <span className="hidden sm:inline">{isEn ? "Call" : "اتصل الآن"}</span>
          <span dir="ltr" className="sm:hidden">{phone}</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
            isEn ? "Hello, I would like to inquire about Madinet Masr projects." : "مرحباً، أود الاستفسار عن تفاصيل وأسعار مشاريع مدينة مصر."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{isEn ? "WhatsApp" : "واتساب"}</span>
        </a>

        {/* Register Interest / Consultation */}
        <a
          href="#features"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#980f0f] hover:bg-[#7b0c0c] text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>{isEn ? "Book Consultation" : "احجز استشارة"}</span>
        </a>
      </div>
    </aside>
  );
}
