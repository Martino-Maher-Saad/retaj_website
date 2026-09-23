"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ProjectsShowcaseProps {
  isEn?: boolean;
}

export default function ProjectsShowcase({ isEn = false }: ProjectsShowcaseProps) {
  const [filter, setFilter] = useState<"all" | "residential" | "commercial">("all");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: "taj-city",
      name: isEn ? "Taj City" : "تاج سيتي",
      category: "residential",
      location: isEn ? "New Cairo — Suez Road" : "القاهرة الجديدة — طريق السويس",
      price: isEn ? "6,250,000" : "6,250,000",
      plan: isEn ? "1.5% down / 12 years" : "1.5% مقدم / 12 سنة",
      unitTypes: isEn ? ["Apartments", "Town houses", "Offices"] : ["شقق", "تاون هاوس", "مكاتب"],
      description: isEn
        ? "More than a compound — an integrated city in the heart of New Cairo, with delivered phases and new developments."
        : "ليست مجرد كمبوند — إنها مدينة متكاملة في قلب القاهرة الجديدة، بمشاريع متسلمة وأخرى قيد التطوير بأرقى المعايير.",
      image: "https://res.cloudinary.com/izrnyvya/image/upload/f_auto,q_auto/yWWTX7lN__oJ.webp",
      href: isEn ? "/en/taj-city" : "/taj-city",
    },
    {
      id: "sarai",
      name: isEn ? "Sarai" : "سراي",
      category: "residential",
      location: isEn ? "New Cairo — Suez Road" : "القاهرة الجديدة — طريق السويس",
      price: isEn ? "3,600,000" : "3,600,000",
      plan: isEn ? "1.5% down / 12 years" : "1.5% / 12 سنة",
      unitTypes: isEn ? ["Apartments", "Villas", "Town houses"] : ["شقق", "فيلات", "تاون هاوس"],
      description: isEn
        ? "1,400 acres, the largest Crystal Lagoon in the region, an international university, and an integrated community on Hope Axis."
        : "1,400 فدان، أكبر Crystal Lagoon في المنطقة، جامعة دولية، ومجتمع متكامل على محور الأمل.",
      image: "https://res.cloudinary.com/izrnyvya/image/upload/f_auto,q_auto/0IdzqYKISj-H.webp",
      href: isEn ? "/en/sarai" : "/sarai",
    },
    {
      id: "talala",
      name: isEn ? "Talala" : "تلالا",
      category: "residential",
      location: isEn ? "New Heliopolis" : "هليوبوليس الجديدة",
      price: isEn ? "4,600,000" : "4,600,000",
      plan: isEn ? "4% down / 15 years" : "4% مقدم / 15 سنة",
      unitTypes: isEn
        ? ["Apartments", "Standalone villas", "Town houses", "S-Villas"]
        : ["شقق", "فيلات مستقلة", "تاون هاوس", "فيلات S"],
      description: isEn
        ? "550 acres of fully-finished units — the smartest choice for a turnkey home with guaranteed investment."
        : "550 فدان بتشطيب كامل — الخيار الأذكى لمن يريد منزلاً جاهزاً باستثمار مضمون.",
      image: "https://res.cloudinary.com/izrnyvya/image/upload/f_auto,q_auto/0__TDByYu7hx.webp",
      href: isEn ? "/en/talala" : "/talala",
    },
    {
      id: "butterfly",
      name: isEn ? "Butterfly" : "بترفلاي",
      category: "residential",
      location: isEn ? "Mostakbal City" : "مستقبل سيتي",
      price: isEn ? "4,000,000" : "4,000,000",
      plan: isEn ? "1.5% down / 12 years" : "1.5% مقدم / 12 سنة",
      unitTypes: isEn
        ? ["Apartments", "Standalone villas", "Town houses"]
        : ["شقق", "فيلات مستقلة", "تاون هاوس"],
      description: isEn
        ? "235 acres of premium villas and apartments with 1.5% down and instalments up to 12 years."
        : "235 فدان من الفيلات والشقق الفاخرة بمقدم 1.5% وأقساط تصل لـ 12 سنة.",
      image: "https://res.cloudinary.com/izrnyvya/image/upload/f_auto,q_auto/-C7GOU192Xka.webp",
      href: isEn ? "/en/butterfly" : "/butterfly",
    },
    {
      id: "d2n",
      name: isEn ? "D2N" : "D2N",
      category: "commercial",
      location: isEn ? "Hope Axis — Inside Sarai" : "محور الأمل — داخل سراي",
      price: isEn ? "7,200,000" : "7,200,000",
      plan: isEn ? "10% down / 15 years" : "10% مقدم / 15 سنة",
      unitTypes: isEn ? ["Offices", "Clinics"] : ["أوفيسات", "عيادات"],
      description: isEn
        ? "The first fully-integrated commercial mall on the Hope Axis — a commercial, administrative, and medical opportunity."
        : "أول مول تجاري متكامل على محور الأمل — فرصة استثمارية تجارية وإدارية وطبية.",
      image: "https://res.cloudinary.com/izrnyvya/image/upload/f_auto,q_auto/1U7w-3GzG9aB.webp",
      href: isEn ? "/en/d2n" : "/d2n",
    },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-header",
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".projects-header",
            start: "top 85%",
            once: true,
          },
        }
      );

      const cards = gridRef.current?.querySelectorAll(".project-card");
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
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter change animation
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { scale: 0.96, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        }
      );
    }
  }, [filter]);

  const ArrowIcon = isEn ? ArrowRight : ArrowLeft;

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 sm:py-32 lg:py-40 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="projects-header max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#980f0f] mb-3">
            {isEn ? "Projects" : "المشاريع"}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171410] tracking-tight mb-4">
            {isEn ? "Choose your next home with Madinet Masr" : "اختر مشروعك القادم مع مدينة مصر"}
          </h2>
          <p className="text-base sm:text-lg text-[#736d65]">
            {isEn ? "Five communities. One that fits you." : "خمسة مجتمعات. واحد يليق بك."}
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mt-8 p-1.5 bg-[#eae5de]/60 rounded-full w-fit">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                filter === "all"
                  ? "bg-[#980f0f] text-white shadow-sm"
                  : "text-[#4a453e] hover:text-[#171410]"
              }`}
            >
              {isEn ? "All" : "الكل"}
            </button>
            <button
              onClick={() => setFilter("residential")}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                filter === "residential"
                  ? "bg-[#980f0f] text-white shadow-sm"
                  : "text-[#4a453e] hover:text-[#171410]"
              }`}
            >
              {isEn ? "Residential" : "سكني"}
            </button>
            <button
              onClick={() => setFilter("commercial")}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                filter === "commercial"
                  ? "bg-[#980f0f] text-white shadow-sm"
                  : "text-[#4a453e] hover:text-[#171410]"
              }`}
            >
              {isEn ? "Commercial" : "تجاري"}
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#171410]/08 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eae5de]">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 start-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-[#171410] shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#980f0f]" />
                    {project.location}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#171410] mb-2">{project.name}</h3>
                  <p className="text-sm text-[#736d65] line-clamp-2 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Financial & Plan Highlights */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#171410]/08 mb-6">
                    <div>
                      <p className="text-xs text-[#736d65] mb-1">
                        {isEn ? "From" : "يبدأ من"}
                      </p>
                      <p className="text-xl font-bold text-[#980f0f]">
                        {project.price}{" "}
                        <span className="text-xs font-normal text-[#171410]">
                          {isEn ? "EGP" : "جنيه"}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#736d65] mb-1">
                        {isEn ? "Payment plan" : "نظام السداد"}
                      </p>
                      <p className="text-sm font-semibold text-[#171410]">
                        {project.plan}
                      </p>
                    </div>
                  </div>

                  {/* Unit Types Tags */}
                  <div className="mb-6">
                    <p className="text-xs text-[#736d65] mb-2">
                      {isEn ? "Unit types" : "أنواع الوحدات"}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.unitTypes.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 bg-[#faf8f5] text-[#4a453e] rounded-md border border-[#171410]/05"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <Link
                  href={project.href}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#171410] hover:bg-[#980f0f] text-white text-sm font-semibold transition-colors shadow-sm"
                >
                  <span>{isEn ? "Discover project" : "اكتشف المشروع"}</span>
                  <ArrowIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
