"use client";

import { useState, useEffect, useRef } from "react";
import { Award, FileCheck2, Home } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface WhyMadinetMasrProps {
  isEn?: boolean;
}

export default function WhyMadinetMasr({ isEn = false }: WhyMadinetMasrProps) {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-header",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".why-header",
            start: "top 85%",
            once: true,
          },
        }
      );

      const items = sectionRef.current?.querySelectorAll(".why-card");
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: items[0],
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      num: "01",
      title: isEn ? "Experience" : "الخبرة",
      icon: Award,
      content: isEn
        ? "Over 65 years of real-estate development — started in Madinet Nasr in 1959 and continuing today across the finest locations in New Cairo, Mostakbal City, and New Heliopolis."
        : "أكثر من 65 عاماً في التطوير العقاري، بدأت بتأسيس مدينة نصر في 1959 وتواصل اليوم في أرقى مواقع القاهرة الجديدة ومستقبل سيتي وهليوبوليس الجديدة.",
    },
    {
      num: "02",
      title: isEn ? "Transparency" : "الشفافية",
      icon: FileCheck2,
      content: isEn
        ? "A publicly-listed joint-stock company on the Egyptian Exchange (EGX) — our financial statements are fully audited, public, and our delivery track record is crystal clear."
        : "شركة مساهمة مدرجة في البورصة المصرية — أرقامنا وقوائمنا المالية علنية ومراجعة، وسجلنا العقاري واضح للجميع.",
    },
    {
      num: "03",
      title: isEn ? "Real Delivery" : "التسليم الحقيقي",
      icon: Home,
      content: isEn
        ? "Delivered communities with tens of thousands of residents actually living their daily lives proudly — not distant promises, an established living reality."
        : "أكثر من 32,000 وحدة سكنية متسلمة وناس عايشة ومستقرة فيها بالفعل — مش مجرد وعود وتصميمات، ده واقع حقيقي وملموس.",
    },
  ];

  return (
    <section ref={sectionRef} id="why" className="relative py-24 sm:py-32 lg:py-40 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="why-header max-w-3xl mb-14 sm:mb-20">
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#980f0f] mb-3">
            {isEn ? "Why Madinet Masr?" : "ليه مدينة مصر؟"}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171410] tracking-tight">
            {isEn
              ? "Why thousands of investors trust Madinet Masr."
              : "لماذا يثق آلاف المستثمرين في مدينة مصر؟"}
          </h2>
        </div>

        {/* 3 Interactive Cards / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = activeTab === idx;
            return (
              <div
                key={pillar.num}
                onClick={() => setActiveTab(idx)}
                className={`why-card cursor-pointer rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
                  isSelected
                    ? "bg-white border-[#980f0f]/40 shadow-xl ring-1 ring-[#980f0f]/20"
                    : "bg-white/70 border-[#171410]/08 hover:bg-white hover:border-[#171410]/15 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-sm font-bold tracking-widest text-[#980f0f]">
                    {pillar.num}
                  </span>
                  <div
                    className={`p-3 rounded-xl transition-colors ${
                      isSelected ? "bg-[#980f0f] text-white shadow-md" : "bg-[#faf8f5] text-[#736d65]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#171410] mb-4">
                  {pillar.title}
                </h3>
                <p className="text-base text-[#4a453e] leading-relaxed">
                  {pillar.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
