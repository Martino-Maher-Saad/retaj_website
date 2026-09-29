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
    <footer className="relative isolate overflow-hidden bg-[#14110f] text-background">
      <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-10 sm:px-10 sm:pt-32 lg:px-14 lg:pt-40">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-12 md:gap-16">
          {/* Logo & Platform Bio */}
          <div className="col-span-2 md:col-span-5">
            <Link href={isEn ? "/en" : "/"} className="inline-block">
              <Image
                src="/logo.svg"
                alt="Madinet Masr"
                width={160}
                height={58}
                className="h-9 w-auto sm:h-10 brightness-0 invert"
              />
            </Link>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-background/65 sm:text-[15px]">
              {footerData.about[langKey]}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-3">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.32em] text-background/55">
              {footerData.quickLinksTitle[langKey]}
            </h4>
            <ul className="mt-6 space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link inline-block text-[14px] text-background/85 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1 md:col-span-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.32em] text-background/55">
              {footerData.contactTitle[langKey]}
            </h4>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 shrink-0 text-brand h-4 w-4" strokeWidth={1.5} />
                <div className="text-[14px]">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-background/45">
                    {isEn ? "Sales" : "المبيعات"}
                  </p>
                  <a
                    dir="ltr"
                    href={`tel:${footerData.phone}`}
                    className="font-mono text-background/90 transition-colors hover:text-brand"
                  >
                    {footerData.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 shrink-0 text-brand h-4 w-4" strokeWidth={1.5} />
                <div className="text-[14px]">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-background/45">
                    {isEn ? "Email" : "البريد الإلكتروني"}
                  </p>
                  <a
                    href={`mailto:${footerData.email}`}
                    className="text-background/90 transition-colors hover:text-brand"
                  >
                    {footerData.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-brand h-4 w-4" strokeWidth={1.5} />
                <div className="text-[14px]">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-background/45">
                    {isEn ? "Location" : "الموقع"}
                  </p>
                  <span className="text-background/90">
                    {footerData.address[langKey]}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Disclaimer, Social, Copyright */}
        <div className="mt-20 flex flex-col gap-8 border-t border-background/10 pt-8 sm:mt-24 md:flex-row md:items-center md:justify-between lg:mt-28">
          <p className="order-2 max-w-md text-[11px] leading-relaxed text-background/45 md:order-1">
            {isEn
              ? "Official authorized platform for marketing Madinet Masr real estate developments."
              : "منصة متخصصة معتمدة لتسويق مشاريع مدينة مصر للتطوير العقاري."}
          </p>

          <div className="order-1 flex items-center gap-2 md:order-2">
            <span className="me-3 text-[10px] uppercase tracking-[0.32em] text-background/45">
              {isEn ? "Follow Us" : "تابعنا"}
            </span>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/madinetmasr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-background/15 text-background/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/MadinetMasrOfficialPage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-background/15 text-background/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M13.5 22v-8.5h2.85l.42-3.32h-3.27V8.06c0-.96.27-1.62 1.66-1.62h1.77V3.47A23.5 23.5 0 0 0 14.36 3.3c-2.55 0-4.3 1.56-4.3 4.4v2.48H7.2v3.32h2.86V22h3.44Z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/madinetmasr/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-background/15 text-background/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM5 8H0v15h5V8Zm7.95 0H8.05v15h4.9v-7.88c0-4.55 5.96-4.92 5.96 0V23H24v-9.55c0-7.61-8.7-7.33-11.05-3.58V8Z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@madinetmasr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-background/15 text-background/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M23.5 6.5c-.27-1.02-1.07-1.82-2.08-2.1C19.6 4 12 4 12 4s-7.6 0-9.42.4c-1 .28-1.81 1.08-2.08 2.1C0 8.34 0 12 0 12s0 3.66.5 5.5c.27 1.02 1.08 1.82 2.08 2.1C4.4 20 12 20 12 20s7.6 0 9.42-.4c1-.28 1.81-1.08 2.08-2.1.5-1.84.5-5.5.5-5.5s0-3.66-.5-5.5ZM9.6 15.6V8.4l6.24 3.6-6.24 3.6Z" />
              </svg>
            </a>
          </div>

          <p className="order-3 text-[11px] text-background/55">
            {isEn ? "All rights reserved © 2026 — Madinet Masr Sales Guide" : "جميع الحقوق محفوظة © 2026 — Madinet Masr Sales Guide"}
          </p>
        </div>
      </div>
    </footer>
  );
}
