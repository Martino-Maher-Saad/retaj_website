"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import WordScrubText from "@/components/WordScrubText";
import LeadModal from "@/components/LeadModal";
import homeContent from "@/data/home_content.json";

interface ProjectsShowcaseProps {
  isEn?: boolean;
}

interface ProjectData {
  id: string;
  category: string;
  tag: string;
  name: string;
  location: string;
  price: string;
  priceLabelKey: string;
  payment: string;
  unitTypes: string[];
  description: string;
  image: string;
  href: string;
}

function ProjectCard({
  project,
  isEn,
  labels,
  onBook,
}: {
  project: ProjectData;
  isEn: boolean;
  labels: typeof homeContent.projectsSection.labels;
  onBook: (projectId: string) => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const langKey = isEn ? "en" : "ar";
  const isCommercial = project.category === "commercial";
  const pricePrefix =
    project.priceLabelKey === "perMeter"
      ? labels.perMeter[langKey]
      : labels.from[langKey];

  return (
    <article
      className="project-card group flex-shrink-0"
      data-category={project.category}
      data-project-id={project.id}
    >
      <div className="relative w-[86vw] max-w-[760px] sm:w-[560px] lg:w-[680px] xl:w-[760px]">
        {/* Main Image Box */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-neutral-100">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(min-width: 1280px) 760px, (min-width: 1024px) 680px, (min-width: 640px) 560px, 86vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            draggable={false}
          />

          {/* Hover Book Button in Center matching video */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onBook(project.id);
              }}
              className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-[#980f0f] px-5 py-2 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{labels.book?.[langKey] || (isEn ? "Book" : "احجز")}</span>
            </button>
          </div>

          {/* Category Tag Top-Start */}
          <span
            className={`absolute top-4 start-4 inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur-md ${
              isCommercial
                ? "bg-[#171410]/85 text-white"
                : "bg-white/85 text-[#171410]"
            }`}
          >
            {project.tag}
          </span>

          {/* 3D Flip Card Bottom-End */}
          <div
            className="absolute bottom-3 end-3 w-[54%] max-w-[260px] sm:bottom-4 sm:end-4 sm:w-[44%]"
            style={{ perspective: "900px" }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
          >
            <button
              type="button"
              onClick={() => setIsFlipped((prev) => !prev)}
              aria-label={labels.tapForMore[langKey]}
              aria-pressed={isFlipped}
              className="block w-full text-start focus:outline-none"
            >
              <div
                className="relative aspect-[1.5/1] w-full transition-transform duration-700 sm:aspect-[1.7/1]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  transitionTimingFunction: "cubic-bezier(0.5, 0, 0.1, 1)",
                }}
              >
                {/* Front Face: Starting Price & Payment */}
                <div
                  className="absolute inset-0 flex flex-col justify-between rounded-sm bg-white/95 backdrop-blur-md p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] sm:p-4"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-500 sm:text-[10px]">
                      {pricePrefix}
                    </p>
                    <p className="font-display mt-0.5 text-[clamp(1.05rem,2.2vw,1.75rem)] leading-none tracking-tight text-[#171410] sm:mt-1 font-bold">
                      {project.price}
                    </p>
                    <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-neutral-500 sm:mt-1 sm:text-[10px]">
                      {labels.currency[langKey]}
                    </p>
                  </div>

                  <div className="border-t border-neutral-200 pt-1.5 sm:pt-2">
                    <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-500 sm:text-[10px]">
                      {labels.paymentSystem[langKey]}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium text-[#171410] sm:text-xs">
                      {project.payment}
                    </p>
                  </div>
                </div>

                {/* Back Face: Unit Types & Quick Action */}
                <div
                  className="absolute inset-0 flex flex-col justify-between rounded-sm bg-[#171410] p-2.5 text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:p-4"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#980f0f] sm:text-[10px]">
                      {labels.unitTypes[langKey]}
                    </p>
                    <ul className="mt-1 space-y-0.5 text-[10px] text-white/90 sm:text-xs">
                      {project.unitTypes.map((u, i) => (
                        <li key={i} className="truncate">
                          · {u}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                    {labels.tapForMore[langKey]} ↗
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Content Below Image */}
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="leading-none tracking-tight text-[#171410] font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold">
              {project.name}
            </h3>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
              {project.location}
            </span>
          </div>

          <p className="text-[14px] leading-relaxed text-neutral-700 sm:text-[15px]">
            {project.description}
          </p>

          <Link
            href={isEn ? `/en${project.href}` : project.href}
            className="group/cta mt-2 inline-flex items-center gap-3 self-start border-b border-[#171410]/30 pb-1.5 text-[13px] font-medium tracking-tight text-[#171410] transition-colors hover:border-[#980f0f] hover:text-[#980f0f]"
          >
            <span>{labels.discover[langKey]}</span>
            <svg
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/cta:translate-x-1 rtl:-scale-x-100 rtl:group-hover/cta:-translate-x-1"
              fill="none"
              height="10"
              viewBox="0 0 22 10"
              width="20"
            >
              <path
                d="M1 5h20m0 0L17 1m4 4l-4 4"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsShowcase({ isEn = false }: ProjectsShowcaseProps) {
  const [filter, setFilter] = useState<"all" | "residential" | "commercial">("all");
  const [showDragHint, setShowDragHint] = useState(true);
  const [filterTick, setFilterTick] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalProject, setModalProject] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<Draggable | null>(null);

  const sectionData = homeContent.projectsSection;
  const langKey = isEn ? "en" : "ar";

  // Map projects data from json
  const allProjects: ProjectData[] = sectionData.projects.map((p) => ({
    id: p.id,
    category: p.category,
    tag: p.tag[langKey],
    name: p.name[langKey],
    location: p.location[langKey],
    price: p.price,
    priceLabelKey: p.priceLabelKey,
    payment: p.payment[langKey],
    unitTypes: p.unitTypes[langKey],
    description: p.description[langKey],
    image: p.image,
    href: p.href,
  }));

  const filteredProjects =
    filter === "all" ? allProjects : allProjects.filter((p) => p.category === filter);

  // Exact bounds calculation from original site
  const calculateBounds = useCallback(() => {
    const el = sliderRef.current;
    if (!el || !el.parentElement) return null;
    const maxDrag = Math.max(0, el.scrollWidth - el.parentElement.clientWidth);
    return isEn ? { minX: -maxDrag, maxX: 0 } : { minX: 0, maxX: maxDrag };
  }, [isEn]);

  // Create / Re-init Draggable
  const initDraggable = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const bounds = calculateBounds();
    if (!bounds) return;

    if (draggableRef.current) {
      draggableRef.current.kill();
    }

    const instances = Draggable.create(el, {
      type: "x",
      inertia: true,
      bounds: bounds,
      edgeResistance: 0.85,
      cursor: "grab",
      activeCursor: "grabbing",
      allowNativeTouchScrolling: false,
      onPress: () => setShowDragHint(false),
    });

    draggableRef.current = instances[0];
  }, [calculateBounds]);

  // Register GSAP plugins & Initial Draggable setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Draggable);

    const onResize = () => {
      requestAnimationFrame(initDraggable);
    };

    window.addEventListener("resize", onResize);
    requestAnimationFrame(initDraggable);

    return () => {
      window.removeEventListener("resize", onResize);
      if (draggableRef.current) draggableRef.current.kill();
    };
  }, [initDraggable]);

  // Initial scroll reveal for project cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".project-card");
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          y: 60,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter change animation
  const handleFilterChange = (newFilter: "all" | "residential" | "commercial") => {
    if (newFilter === filter || isTransitioning) return;
    setIsTransitioning(true);

    const slider = sliderRef.current;
    const cards = slider?.querySelectorAll(".project-card");

    if (cards && cards.length > 0) {
      gsap.to(cards, {
        y: -24,
        autoAlpha: 0,
        duration: 0.32,
        stagger: 0.025,
        ease: "power2.in",
        onComplete: () => {
          setFilter(newFilter);
          setFilterTick((t) => t + 1);
        },
      });
    } else {
      setFilter(newFilter);
      setFilterTick((t) => t + 1);
    }
  };

  // Re-animate new cards after filter change
  useEffect(() => {
    if (filterTick === 0) return;

    const slider = sliderRef.current;
    const cards = slider?.querySelectorAll(".project-card");

    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "expo.out",
          onComplete: () => {
            setIsTransitioning(false);
            requestAnimationFrame(() => {
              const bounds = calculateBounds();
              if (bounds && draggableRef.current) {
                draggableRef.current.applyBounds(bounds);
              }
              if (slider) {
                gsap.to(slider, { x: 0, duration: 0.5, ease: "expo.out" });
              }
            });
          },
        }
      );
    } else {
      setIsTransitioning(false);
    }
  }, [filterTick, calculateBounds]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-title"
      className="relative py-24 sm:py-32 lg:py-40 bg-[#faf8f5] text-[#171410] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col gap-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-neutral-500 sm:text-xs">
            {sectionData.eyebrow[langKey]}
          </p>

          <WordScrubText
            id="projects-title"
            as="h2"
            className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-[#171410]"
          >
            {sectionData.title[langKey]}
          </WordScrubText>

          <p className="mt-2 text-base text-neutral-600 sm:text-lg">
            {sectionData.subtitle[langKey]}
          </p>
        </div>

        {/* Filters and Drag Hint Header Row */}
        <div className="mt-12 flex items-center justify-between gap-4 border-b border-neutral-200 pb-6 sm:mt-16">
          {/* Filter Pills */}
          <div
            role="tablist"
            aria-label="Filter projects"
            className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white p-1 shadow-sm"
          >
            {(["all", "residential", "commercial"] as const).map((key) => {
              const isActive = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleFilterChange(key)}
                  className={`relative inline-flex items-center justify-center rounded-full px-5 py-2 text-[13px] font-medium tracking-tight transition-colors duration-300 ${
                    isActive
                      ? "bg-[#980f0f] text-white"
                      : "text-neutral-700 hover:text-[#980f0f]"
                  }`}
                >
                  {sectionData.filters[key][langKey]}
                </button>
              );
            })}
          </div>

          {/* Drag Indicator */}
          <span
            className={`font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500 transition-opacity duration-500 select-none ${
              showDragHint ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!showDragHint}
          >
            ← {sectionData.dragHint[langKey]} →
          </span>
        </div>
      </div>

      {/* Draggable Projects Slider */}
      <div className="relative mt-8 sm:mt-12 overflow-hidden">
        <div
          ref={sliderRef}
          data-cursor="drag"
          className="flex cursor-grab gap-6 px-6 will-change-transform select-none active:cursor-grabbing sm:gap-8 sm:px-10 lg:px-14"
          style={{ touchAction: "pan-y" }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isEn={isEn}
              labels={sectionData.labels}
              onBook={(id) => setModalProject(id)}
            />
          ))}
        </div>
      </div>

      <LeadModal
        isOpen={modalProject !== null}
        onClose={() => setModalProject(null)}
        isEn={isEn}
        initialProject={modalProject || "taj-city"}
      />
    </section>
  );
}
