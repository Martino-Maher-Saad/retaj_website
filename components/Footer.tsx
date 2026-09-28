import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import siteConfig from "@/data/site_config.json";
import homeContent from "@/data/home_content.json";

interface FooterProps {
  isEn?: boolean;
}

export default function Footer({ isEn = false }: FooterProps) {
  const footerData = homeContent.footer;
  const langKey = isEn ? "en" : "ar";
  const navLinks = isEn ? siteConfig.nav.en : siteConfig.nav.ar;

  return (
    <footer className="relative isolate overflow-hidden bg-[#0d0c0b] text-[#fdfcfb] pt-16 pb-28 sm:pb-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-white/10">
          {/* Brand Info Column (Right in RTL, Left in LTR) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link href={isEn ? "/en" : "/"} className="inline-block">
              <Image
                src="/logo-dark.svg"
                alt="مدينة مصر"
                width={160}
                height={58}
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-md mt-2">
              {footerData.about[langKey]}
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold text-white mb-5">
              {footerData.quickLinksTitle[langKey]}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white mb-5">
              {footerData.contactTitle[langKey]}
            </h4>
            <div className="flex flex-col gap-4 text-sm text-neutral-400">
              <a
                href={`tel:${footerData.phone}`}
                className="inline-flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
                dir="ltr"
              >
                <Phone className="w-4 h-4 text-[#980f0f] shrink-0" />
                <span>{footerData.phone}</span>
              </a>

              <a
                href={`mailto:${footerData.email}`}
                className="inline-flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#980f0f] shrink-0" />
                <span>{footerData.email}</span>
              </a>

              <div className="inline-flex items-center gap-3 text-neutral-300">
                <MapPin className="w-4 h-4 text-[#980f0f] shrink-0" />
                <span>{footerData.address[langKey]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>{footerData.copyright[langKey]} © 2026</p>
          <p className="text-[11px] text-neutral-500 text-center md:text-end max-w-xl">
            {footerData.disclaimer[langKey]}
          </p>
        </div>
      </div>
    </footer>
  );
}
