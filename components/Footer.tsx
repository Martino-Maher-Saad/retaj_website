import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import siteConfig from "@/data/site_config.json";

interface FooterProps {
  isEn?: boolean;
}

export default function Footer({ isEn = false }: FooterProps) {
  const phone = siteConfig.contact.display_phone || "01015626755";
  const rawPhone = siteConfig.contact.phone || "+201015626755";
  const whatsapp = siteConfig.contact.whatsapp || "+201146659065";
  const email = siteConfig.contact.email || "info@madinetmasr-sales.com";

  const navLinks = isEn ? siteConfig.nav.en : siteConfig.nav.ar;

  return (
    <footer className="relative isolate overflow-hidden bg-[#14110f] text-[#fdfcfb] pt-16 pb-24 sm:pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <Link href={isEn ? "/en" : "/"} className="inline-block mb-6">
              <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#980f0f]" />
                {isEn ? siteConfig.brand.name_en : siteConfig.brand.name_ar}
              </span>
            </Link>
            <p className="text-sm text-[#8c857b] leading-relaxed max-w-md mb-6">
              {isEn ? siteConfig.brand.tagline_en : siteConfig.brand.tagline_ar}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700/30 hover:bg-emerald-700/50 border border-emerald-600/40 text-emerald-400 text-xs font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isEn ? "WhatsApp Direct" : "تواصل واتساب"}</span>
              </a>
              <a
                href={`tel:${rawPhone}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/05 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-[#f24155]" />
                <span dir="ltr">{phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links from site_config.json */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              {isEn ? "Quick Links" : "روابط سريعة"}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#8c857b] hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Details from site_config.json */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              {isEn ? "Contact Information" : "معلومات التواصل"}
            </h4>
            <div className="space-y-4 text-sm text-[#8c857b]">
              <div>
                <p className="text-xs text-[#d4cfc8] mb-1">{isEn ? "Sales Direct" : "المبيعات"}</p>
                <a
                  href={`tel:${rawPhone}`}
                  className="text-white hover:text-[#f24155] font-semibold transition-colors block text-base"
                  dir="ltr"
                >
                  {phone}
                </a>
              </div>
              <div>
                <p className="text-xs text-[#d4cfc8] mb-1">{isEn ? "Email Support" : "البريد الإلكتروني"}</p>
                <a
                  href={`mailto:${email}`}
                  className="text-[#d4cfc8] hover:text-white transition-colors"
                >
                  {email}
                </a>
              </div>
              <div>
                <p className="text-xs text-[#d4cfc8] mb-1">{isEn ? "Head Office" : "المقر الرئيسي"}</p>
                <p className="text-[#8c857b]">
                  {isEn ? siteConfig.contact.address_en : siteConfig.contact.address_ar}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c857b]">
          <p>© 2026 {isEn ? siteConfig.brand.name_en : siteConfig.brand.name_ar}. {isEn ? "All rights reserved." : "جميع الحقوق محفوظة."}</p>
          <p className="text-[11px] text-[#736d65]">
            {isEn ? "Official Authorized Sales Partner" : "وكيل وموزع بيع معتمد"}
          </p>
        </div>
      </div>
    </footer>
  );
}
