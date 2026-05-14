"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import orgBriefBanner from "@/public/assets/image/orgBrief_Banner.png";

type Locale = "en" | "km";

const LOCALE_STORAGE_KEY = "mpc-ui-locale";
const LOCALE_EVENT = "mpc-locale-change";

interface MpcOrganizationBannerProps {
  briefTitle: string;
  briefDescription: string;
}

export function MpcOrganizationBanner({
  briefTitle,
  briefDescription,
}: MpcOrganizationBannerProps) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "en" || stored === "km") {
      setLocale(stored);
      return;
    }

    setLocale(document.documentElement.lang === "km" ? "km" : "en");
  }, []);

  useEffect(() => {
    const onLocaleChange = (event: Event) => {
      const localeEvent = event as CustomEvent<Locale>;
      if (localeEvent.detail === "en" || localeEvent.detail === "km") {
        setLocale(localeEvent.detail);
      }
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key !== LOCALE_STORAGE_KEY) return;
      if (event.newValue === "en" || event.newValue === "km") {
        setLocale(event.newValue);
      }
    };

    window.addEventListener(LOCALE_EVENT, onLocaleChange as EventListener);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(LOCALE_EVENT, onLocaleChange as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <section className="relative flex h-[calc(100vh-64px)] w-full overflow-hidden bg-[#2c3e50]">
      {/* Background Image */}
      <Image
        src={orgBriefBanner}
        alt="Briefly about organization banner"
        fill
        priority
        className="border-0 object-cover object-center outline-none ring-0 scale-[1.02]"
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#000000]/50" />
      
      {/* Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Left Content */}
        <div className="w-full md:w-1/2 lg:pr-8">
          {/* Heart Icon and Label */}

          {/* Main Heading */}
          <h1
            className={`font-bold text-white ${
              locale === "km"
                ? "text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl md:leading-[1.1]"
                : "text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl md:leading-[1.1]"
            }`}
          >
            {briefTitle}
          </h1>

          {/* Description */}
          <p
            className={`mt-4 font-medium text-white/90 md:mt-6 ${
              locale === "km"
                ? "text-base leading-7 sm:text-lg md:text-xl md:leading-8"
                : "text-base leading-7 sm:text-lg md:text-xl md:leading-8"
            }`}
          >
            {briefDescription}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8 md:gap-4">
            <Link
              href="/donation"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ffffff] px-6 py-3 font-semibold text-[#184D6C] transition-all hover:bg-[#ffffff]/80 active:scale-95 md:px-8 md:py-3"
            >
              About Us <span aria-hidden>→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-all hover:bg-white/10 active:scale-95 md:px-8 md:py-3"
            >
              Contact Now <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
