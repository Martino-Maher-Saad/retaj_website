import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import siteConfig from "@/data/site_config.json";

interface FooterProps {
  isEn?: boolean;
}

export default function Footer({ isEn = false }: FooterProps) {
  const phone = siteConfig.contact.display_phone || "01200603555";
  const whatsapp = siteConfig.contact.whatsapp || "+201200603555";
  const email = siteConfig.contact.email || "info@madinetmasr-sales.com";

  const quickLinks = [
    { name: isEn ? "Taj City" : "تاج سيتي", href: isEn ? "/en/taj-city" : "/taj-city" },
    { name: isEn ? "Sarai" : "سراي", href: isEn ? "/en/sarai" : "/sarai" },
    { name: isEn ? "Butterfly" : "بترفلاي", href: isEn ? "/en/butterfly" : "/butterfly" },
    { name: isEn ? "Talala" : "تلالا", href: isEn ? "/en/talala" : "/talala" },
    { name: isEn ? "D2N" : "D2N", href: isEn ? "/en/d2n" : "/d2n" },
    { name: isEn ? "Gallery" : "الجاليري", href: isEn ? "/en/gallery" : "/gallery" },
    { name: isEn ? "Blog" : "المدونة", href: isEn ? "/en/blog" : "/blog" },
    { name: isEn ? "FAQ" : "الأسئلة الشائعة", href: isEn ? "/en/faq" : "/faq" },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-[#14110f] text-[#fdfcfb] pt-16 pb-24 sm:pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <Link href={isEn ? "/en" : "/"} className="inline-block mb-6">
              <span className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#980f0f]" />
                {isEn ? "Madinet Masr" : "مدينة مصر"}
              </span>
            </Link>
            <p className="text-sm text-[#8c857b] leading-relaxed max-w-md mb-6">
              {isEn
                ? "A dedicated platform for showcasing and marketing Madinet Masr Real Estate Development's projects. We provide clients with full pricing details, cash discounts, and investment opportunities across New Cairo, Mostakbal City, and New Heliopolis."
                : "منصة متخصصة لعرض وتسويق مشاريع مدينة مصر للتطوير العقاري. هدفنا تزويد عملائنا بكافة المعلومات والفرص الاستثمارية في أرقى مشاريع القاهرة الجديدة وهليوبوليس الجديدة ومدينة المستقبل."}
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
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/05 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-[#f24155]" />
                <span dir="ltr">{phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              {isEn ? "Quick Links" : "روابط سريعة"}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-[#8c857b] hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">
              {isEn ? "Contact Information" : "معلومات التواصل"}
            </h4>
            <div className="space-y-4 text-sm text-[#8c857b]">
              <div>
                <p className="text-xs text-[#d4cfc8] mb-1">{isEn ? "Sales Direct" : "المبيعات"}</p>
                <a
                  href={`tel:${phone}`}
                  dir="ltr"
                  className="text-base font-bold text-white hover:text-[#f24155] transition-colors block"
                >
                  {phone}
                </a>
              </div>
              <div>
                <p className="text-xs text-[#d4cfc8] mb-1">{isEn ? "Email" : "البريد الإلكتروني"}</p>
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-white hover:text-[#f24155] transition-colors"
                >
                  {email}
                </a>
              </div>
              <div>
                <p className="text-xs text-[#d4cfc8] mb-1">{isEn ? "Location" : "الموقع"}</p>
                <p className="text-sm text-white">
                  {isEn ? siteConfig.contact.address_en : siteConfig.contact.address_ar}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736d65]">
          <p>
            {isEn
              ? "An authorized dedicated platform for marketing Madinet Masr Real Estate Development's projects."
              : "منصة متخصصة معتمدة لتسويق مشاريع مدينة مصر للتطوير العقاري."}
          </p>
          <p>
            {isEn
              ? "All rights reserved © 2026 — Madinet Masr Sales Guide"
              : "جميع الحقوق محفوظة © 2026 — Madinet Masr Sales Guide"}
          </p>
        </div>
      </div>
    </footer>
  );
}
