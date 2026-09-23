"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle2, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TrackRecordProps {
  isEn?: boolean;
}

export default function TrackRecord({ isEn = false }: TrackRecordProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".track-eyebrow",
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".track-eyebrow",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".track-title",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".track-title",
            start: "top 85%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".track-description",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".track-description",
            start: "top 85%",
            once: true,
          },
        }
      );

      const cards = sectionRef.current?.querySelectorAll(".track-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 82%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const communities = [
    {
      num: "01",
      name: isEn ? "Taj Sultan" : "تاج سلطان",
      location: isEn ? "Madinet Nasr" : "مدينة نصر",
      status: isEn ? "Delivered" : "متسلّم",
      image: "https://res.cloudinary.com/izrnyvya/image/upload/f_auto,q_auto/0IdzqYKISj-H.webp",
      desc: isEn
        ? "A premier community handed over and fully vibrant with residents enjoying full lifestyle amenities."
        : "مجتمع متكامل الخدمات متسلم بالكامل ومأهول بالسكان يعيشون فيه أرقى مستويات الحياة.",
    },
    {
      num: "02",
      name: isEn ? "Taj Real" : "تاج ريال",
      location: isEn ? "Madinet Nasr" : "مدينة نصر",
      status: isEn ? "Delivered" : "متسلّم",
      image: "https://res.cloudinary.com/izrnyvya/image/upload/f_auto,q_auto/yWWTX7lN__oJ.webp",
      desc: isEn
        ? "Luxury residential clusters delivered with exceptional architectural aesthetics and lush landscapes."
        : "أحياء سكنية راقية تم تسليمها بتصميمات معمارية فريدة ومساحات خضراء واسعة.",
    },
    {
      num: "03",
      name: isEn ? "Sarai" : "سراي",
      location: isEn ? "New Cairo — Suez Road" : "القاهرة الجديدة — طريق السويس",
      status: isEn ? "Delivered Phases" : "مراحل متسلمة",
      image: "https://res.cloudinary.com/izrnyvya/image/upload/f_auto,q_auto/0__TDByYu7hx.webp",
      desc: isEn
        ? "Handed-over phases around the Crystal Lagoon with active community clubs and families living peacefully."
        : "مراحل سكنية متسلمة حول الكريستال لاجون ونوادٍ مفعلة وعائلات تعيش باستقرار وفخر.",
    },
  ];

  return (
    <section ref={sectionRef} id="track" className="relative py-24 sm:py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 sm:mb-20">
          <p className="track-eyebrow text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#980f0f] mb-3">
            {isEn ? "Track Record" : "سابقة الأعمال"}
          </p>
          <h2 className="track-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171410] tracking-tight mb-4">
            {isEn
              ? "Our promises have addresses and names. Communities pulsing with life."
              : "وعودنا لها عناوين وأسماء. مجتمعات تنبض بالحياة."}
          </h2>
          <p className="track-description text-base sm:text-lg text-[#736d65]">
            {isEn
              ? "A celebrated record of delivered projects that became real communities — homes to thousands of proud families."
              : "سجل حافل من المشاريع المتسلمة التي أصبحت مجتمعات حقيقية يعيش فيها آلاف العائلات بفخر."}
          </p>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {communities.map((item) => (
            <div
              key={item.num}
              className="track-card group rounded-2xl overflow-hidden border border-[#171410]/08 bg-[#faf8f5] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eae5de]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 start-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-[#171410]">{item.name}</h3>
                    <span className="text-xs font-bold text-[#980f0f] tracking-widest">
                      {item.num}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#736d65] mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#980f0f]" />
                    <span>{item.location}</span>
                  </div>
                  <p className="text-sm text-[#4a453e] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
