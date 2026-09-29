"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface WordScrubTextProps {
  text?: string;
  children?: React.ReactNode;
  id?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  start?: string;
  end?: string;
}

export default function WordScrubText({
  text,
  children,
  id,
  className = "",
  as = "h2",
  start = "top 85%",
  end = "top 35%",
}: WordScrubTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  const rawText = text || (typeof children === "string" ? children : "");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const words = el.querySelectorAll(".scrub-word");
    if (words.length === 0) return;

    // Initial dimmed state matching original site SplitText opacity: 0.15
    gsap.set(words, { opacity: 0.15 });

    const anim = gsap.to(words, {
      opacity: 1,
      stagger: 0.02,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: start,
        end: end,
        scrub: 0.6,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [rawText, start, end]);

  const words = rawText.split(" ");
  const content = words.map((word, idx) => (
    <span
      key={idx}
      className="scrub-word inline-block mr-[0.22em] rtl:ml-[0.22em] rtl:mr-0 will-change-[opacity]"
    >
      {word}
    </span>
  ));

  const setRef = (el: HTMLElement | null) => {
    containerRef.current = el;
  };

  switch (as) {
    case "h1":
      return (
        <h1 ref={setRef} id={id} className={className}>
          {content}
        </h1>
      );
    case "h3":
      return (
        <h3 ref={setRef} id={id} className={className}>
          {content}
        </h3>
      );
    case "p":
      return (
        <p ref={setRef} id={id} className={className}>
          {content}
        </p>
      );
    case "h2":
    default:
      return (
        <h2 ref={setRef} id={id} className={className}>
          {content}
        </h2>
      );
  }
}
