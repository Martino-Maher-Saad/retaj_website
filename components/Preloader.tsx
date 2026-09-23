"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل سلسة وسريعة للعداد من 0 إلى 100 خلال 1.5 ثانية
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 300); // إخفاء بعد الاكتمال
          return 100;
        }
        const diff = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + diff, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all duration-700 ${
        progress === 100
          ? "opacity-0 pointer-events-none -translate-y-4"
          : "opacity-100"
      }`}
    >
      {/* 1. اللوجو في منتصف الشاشة */}
      <div className="flex items-center justify-center px-6">
        <Image
          src="/logo-dark.svg"
          alt="مدينة مصر"
          width={260}
          height={94}
          className="h-14 sm:h-16 lg:h-20 w-auto object-contain"
          priority
        />
      </div>

      {/* 2. شريط التحميل والعداد في الأسفل تماماً مثل الموقع الأصلي */}
      <div className="absolute inset-x-6 bottom-8 sm:inset-x-10 sm:bottom-10 lg:inset-x-14 lg:bottom-12 flex items-center gap-4 max-w-7xl mx-auto">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
          مدينة مصر
        </span>

        {/* شريط التقدم */}
        <div className="relative h-[1.5px] flex-1 overflow-hidden bg-neutral-200">
          <span
            className="loader-progress-fill block h-full origin-right bg-brand transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* العداد الرقمي */}
        <span className="font-mono text-[12px] tabular-nums tracking-normal text-[var(--text-primary)] w-7 text-left">
          {progress.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
