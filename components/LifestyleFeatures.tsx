"use client";

import { useState, useEffect, useRef } from "react";
import { Paintbrush, ShieldCheck, Users2, Compass, PhoneCall, CheckCircle } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LifestyleFeaturesProps {
  isEn?: boolean;
}

export default function LifestyleFeatures({ isEn = false }: LifestyleFeaturesProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    project: "taj-city",
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".features-header",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".features-header",
            start: "top 85%",
            once: true,
          },
        }
      );

      const cards = sectionRef.current?.querySelectorAll(".feature-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 35, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      gsap.fromTo(
        ".consultation-box",
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".consultation-box",
            start: "top 85%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: isEn ? "Finishing" : "التشطيب",
      icon: Paintbrush,
      desc: isEn
        ? "We deliver your unit to the highest international finishing standards — ready to live in from day one."
        : "نسلّمك وحدتك بأعلى معايير التشطيب العالمية لتبدأ حياتك من اليوم الأول دون أي عناء.",
    },
    {
      title: isEn ? "Investment Security" : "الأمان الاستثماري",
      icon: ShieldCheck,
      desc: isEn
        ? "The Madinet Masr name is a real guarantee. Property value rising steadily in the most sought-after areas."
        : "اسم وتاريخ مدينة مصر ضمان حقيقي لأموالك، مع عائد استثماري متصاعد في أكثر مناطق القاهرة نمواً.",
    },
    {
      title: isEn ? "Integrated Community" : "مجتمع متكامل",
      icon: Users2,
      desc: isEn
        ? "International schools, universities, clubs, medical centers, and commercial areas — everything you need steps away."
        : "مدارس دولية، جامعات، نوادٍ رياضية واجتماعية، مراكز طبية، ومولات تجارية — كل احتياجاتك على بُعد خطوات.",
    },
    {
      title: isEn ? "International Design" : "تصميم عالمي",
      icon: Compass,
      desc: isEn
        ? "We partner with the world's leading consultancies to deliver architecture that combines beauty and innovation."
        : "نتعاون مع أكبر بيوت الخبرة العالمية (مثل Benoy و DDS) لنقدّم معماراً يجمع بين الجمال والابتكار والخصوصية.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) return;
    const msg = `مرحباً، أود الاستفسار عن مشاريع مدينة مصر:%0Aالاسم: ${encodeURIComponent(formData.name)}%0Aالهاتف: ${encodeURIComponent(formData.phone)}%0Aالمشروع: ${encodeURIComponent(formData.project)}`;
    window.open(`https://wa.me/201200603555?text=${msg}`, "_blank");
    setFormSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="features" className="relative py-24 sm:py-32 lg:py-40 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="features-header max-w-3xl mb-14 sm:mb-20">
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#980f0f] mb-3">
            {isEn ? "Features" : "المميزات"}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171410] tracking-tight">
            {isEn
              ? "More than a place to live. A lifestyle designed for you."
              : "أكثر من مجرد سكن. أسلوب حياة صُمم لأجلك."}
          </h2>
        </div>

        {/* Features 4-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="feature-card p-7 rounded-2xl bg-white border border-[#171410]/08 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-[#faf8f5] flex items-center justify-center text-[#980f0f] mb-6 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#171410] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#4a453e] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integrated Quick Booking Consultation Box */}
        <div className="consultation-box rounded-3xl bg-[#171410] text-white p-8 sm:p-12 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-[#980f0f]/40 text-[#f24155] border border-[#980f0f]/50 mb-4">
                {isEn ? "Direct Developer Sales" : "مبيعات معتمدة مباشرة"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                {isEn
                  ? "Book your consultation & get updated 2026 price list"
                  : "احجز استشارتك المجانية واستلم قائمة أسعار 2026 المحدثة"}
              </h3>
              <p className="text-sm sm:text-base text-[#d4cfc8] leading-relaxed">
                {isEn
                  ? "Speak directly with an authorized sales consultant to explore available units, cash discounts up to 54%, and flexible payment terms up to 15 years."
                  : "تحدث مباشرة مع مستشار مبيعات معتمد لمعرفة الوحدات المتاحة، وخصومات الكاش التي تصل لـ 54%، وأنظمة السداد المرنة حتى 15 سنة."}
              </p>
            </div>

            <div className="lg:col-span-6">
              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-white/10 border border-white/20 text-center">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <p className="text-lg font-bold text-white mb-2">
                    {isEn ? "Thank you for reaching out!" : "تم استلام طلبك بنجاح!"}
                  </p>
                  <p className="text-sm text-[#d4cfc8]">
                    {isEn
                      ? "A dedicated property advisor will contact you shortly."
                      : "سيقوم أحد مستشارينا بالتواصل معك عبر الهاتف أو الواتساب خلال دقائق."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder={isEn ? "Your Full Name" : "الاسم بالكامل"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#980f0f]"
                    />
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      placeholder={isEn ? "Phone (e.g. 010...)" : "رقم الهاتف (مثال: 010...)"}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#980f0f]"
                    />
                  </div>

                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#26221d] border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#980f0f]"
                  >
                    <option value="taj-city">{isEn ? "Taj City (New Cairo)" : "تاج سيتي (القاهرة الجديدة)"}</option>
                    <option value="sarai">{isEn ? "Sarai (Suez Road)" : "سراي (طريق السويس)"}</option>
                    <option value="butterfly">{isEn ? "Butterfly (Mostakbal City)" : "بترفلاي (مستقبل سيتي)"}</option>
                    <option value="talala">{isEn ? "Talala (New Heliopolis)" : "تلالا (هليوبوليس الجديدة)"}</option>
                    <option value="d2n">{isEn ? "D2N Commercial Mall" : "داي تو نايت D2N (تجاري وطبي)"}</option>
                  </select>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#980f0f] hover:bg-[#7b0c0c] text-white font-bold text-sm tracking-wide transition-all hover:shadow-[0_8px_30px_rgb(152,15,15,0.4)] flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{isEn ? "Request Consultation Now" : "طلب تواصل واستشارة مجانية"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
