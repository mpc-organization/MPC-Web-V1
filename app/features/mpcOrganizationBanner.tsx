"use client";

import Image from "next/image";
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
    <section className="relative flex h-[calc(100dvh-64px)] min-h-[calc(100vh-64px)] w-full overflow-hidden">
      <Image
        src={orgBriefBanner}
        alt="Briefly about organization banner"
        fill
        priority
        className="border-0 object-cover object-center outline-none ring-0 scale-[1.02]"
      />
      <div className="absolute inset-0 bg-white/25" />
      <div className="absolute z-10 left-[50px] top-1/2 -translate-y-1/2 w-[700px]">
        <div
          className="rounded-2xl bg-white/75 p-5 shadow-lg backdrop-blur-sm sm:p-6"
          style={{ fontFamily: "'Kantumruy Pro', sans-serif" }}
        >
          <h1
            className={`font-semibold text-[#184D6C] ${
              locale === "km"
                ? "text-[45px] leading-[1.35] sm:leading-[1.3]"
                : "text-[30px]"
            }`}
          >
            {briefTitle}
          </h1>
          <p
            className={`mt-6 font-base text-[#184D6C] ${
              locale === "km"
                ? "text-[25px] leading-10 sm:leading-[2.2rem]"
                : "text-[18px]"
            }`}
          >
            {briefDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
