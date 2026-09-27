"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoader } from "@/components/LoaderContext";

export default function Preloader() {
  const [isDone, setIsDone] = useState(false);
  const { setReady, setCurtainGone } = useLoader();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLSpanElement>(null);
  const counterNumRef = useRef<HTMLSpanElement>(null);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const counterObj = { val: 0 };

    const updateProgress = () => {
      const rounded = Math.floor(counterObj.val);
      if (counterNumRef.current) {
        counterNumRef.current.textContent = String(rounded).padStart(2, "0");
      }
      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${rounded / 100})`;
      }
    };

    // Initial state matching original site
    gsap.set(".loader-logo", { autoAlpha: 0, scale: 0.94, y: 8 });
    gsap.set(".loader-bottom > *", { autoAlpha: 0, y: 8 });
    gsap.set(".loader-progress-fill", { scaleX: 0 });

    const introTl = gsap.timeline({ defaults: { ease: "expo.out" } });
    introTl
      .to(".loader-logo", { autoAlpha: 1, scale: 1, y: 0, duration: 1.1 }, 0)
      .to(".loader-bottom > *", { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.35);

    // Subtle gentle breathing pulse on logo
    const pulseTween = gsap.to(".loader-logo", {
      scale: 1.015,
      duration: 2.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Smooth counter to 92
    progressTweenRef.current = gsap.to(counterObj, {
      val: 92,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: updateProgress,
      onComplete: () => {
        // Complete to 100 and exit
        const exitTl = gsap.timeline();
        exitTl
          .to(counterObj, {
            val: 100,
            duration: 0.45,
            ease: "expo.out",
            onUpdate: updateProgress,
          })
          .to({}, { duration: 0.15 })
          .add(() => {
            setReady();
            window.dispatchEvent(new CustomEvent("preloaderComplete"));
          })
          .to(".loader-logo", { autoAlpha: 0, y: -16, duration: 0.6, ease: "power2.in" }, "+=0")
          .to(
            ".loader-bottom > *",
            { autoAlpha: 0, y: -10, duration: 0.5, stagger: 0.05, ease: "power2.in" },
            "<"
          )
          .to(
            container,
            {
              yPercent: -100,
              duration: 1.25,
              ease: "expo.inOut",
              onComplete: () => {
                setCurtainGone();
                setIsDone(true);
                ScrollTrigger.refresh();
              },
            },
            "-=0.25"
          );
      },
    });

    return () => {
      introTl.kill();
      pulseTween.kill();
      progressTweenRef.current?.kill();
    };
  }, [setReady, setCurtainGone]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="مدينة مصر"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#faf8f5] text-[#171410] will-change-transform select-none"
    >
      {/* Centered Brand Logo */}
      <div className="loader-logo flex items-center justify-center px-6">
        <Image
          src="/logo-dark.svg"
          alt="مدينة مصر"
          width={260}
          height={94}
          priority
          className="h-14 w-auto sm:h-16 lg:h-20 object-contain"
        />
      </div>

      {/* Bottom Loading Bar and Numbers matching original exact DOM */}
      <div className="loader-bottom absolute inset-x-6 bottom-8 flex items-center gap-4 sm:inset-x-10 sm:bottom-10 lg:inset-x-14 lg:bottom-12 max-w-7xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
          Madinet Masr · 2026
        </span>

        {/* Progress Line */}
        <div className="relative h-[1.5px] flex-1 overflow-hidden bg-neutral-200">
          <span
            ref={progressFillRef}
            className="loader-progress-fill block h-full origin-left rtl:origin-right bg-[#980f0f] will-change-transform"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Tabular Digits */}
        <span
          ref={counterNumRef}
          className="font-mono text-[11px] tabular-nums tracking-wider text-neutral-500 w-6 text-end"
        >
          00
        </span>
      </div>
    </div>
  );
}
