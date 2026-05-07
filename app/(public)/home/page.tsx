"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import orgBriefBanner from "@/public/assets/image/orgBrief_Banner.png";
import logo from "@/public/assets/MPC_Logo.png";
import visionBanner from "@/public/assets/image/visionBanner.png";
import { STRATEGIES } from "@/shared/data/strategies";
import { TARGET_LOCATIONS } from "@/shared/data/targetLocations";

const LOCALE_STORAGE_KEY = "mpc-ui-locale";
const LOCALE_EVENT = "mpc-locale-change";

type Locale = "en" | "km";

function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
      {children}
    </span>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 transition-colors group-hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-300 dark:group-hover:bg-zinc-600">
      {children}
    </span>
  );
}

export default function HomePage() {
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

  const briefTitle =
    locale === "km"
      ? "អង្គការមជ្ឈមណ្ឌលម្លប់ព្រហ្មវិហារធម៌"
      : "About Mluop Promviheathor Center Organization";

  const briefDescription =
    locale === "km"
      ? "អង្គការ MPC គាំទ្រគ្រួសារ និងសហគមន៍ តាមរយៈការការពារកុមារ ការគាំទ្រការចិញ្ចឹមកូន និងការអប់រំជាក់ស្តែង ដើម្បីបង្កើតអនាគតដែលមានសុវត្ថិភាព និងសុខុមាលភាពល្អសម្រាប់កុមារគ្រប់រូប។"
      : "Mluop Promviheathor Center Organization (MPC) supports families and communities through child protection, parenting support, and practical education to create safer, healthier futures for every child.";

  const solveTitle =
    locale === "km" ? "អ្វីដែលយើងដោះស្រាយ" : "What we solve";

  const solveDescription =
    locale === "km"
      ? "យើងផ្តោតលើការបំពេញចន្លោះដែលគ្រួសារ និងសហគមន៍ជួបប្រទះ រួមមានការគាំទ្រការចិញ្ចឹមកូនដោយវិជ្ជាជីវៈ ការការពារកុមារ ការចូលប្រើចំណេះដឹងដែលងាយយល់ និងការសម្របសម្រួលរវាងដៃគូ ដើម្បីឲ្យកុមារទទួលបានការជួយទាន់ពេល និងរស់នៅក្នុងបរិយាកាសដែលមានសុវត្ថិភាព។"
      : "We focus on gaps families and communities face around positive parenting, child protection, access to practical knowledge, and coordinated local action—so children get timely support and grow in safer, more nurturing environments.";

  const visionTitle = locale === "km" ? "ទស្សនវិស័យ" : "Vision";

  const visionDescription =
    locale === "km"
      ? "យើងមានទស្សនវិស័យចង់បានសង្គមមួយដែលពោរពេញដោយការយកចិត្តទុកដាក់ ដែលកុមារត្រូវបានការពារ គ្រួសារមានចំណេះដឹង និងសហគមន៍មានទំនុកចិត្តរួមគ្នាចាត់វិធានកម្ម។"
      : "Our vision is a caring society where children are protected, families are informed, and communities are confident to take action together.";

  const visionLearnMore = locale === "km" ? "ស្វែងយល់បន្ថែម" : "Learn more";

  const targetLocationsTitle = locale === "km" ? "ទីតាំងគោលដៅ" : "Target Locations";

  const targetLocationsSubtitle =
    locale === "km" ? "សមតថភាពបង្កើត" : "Capacity Building";

  const locationBullets =
    locale === "km"
      ? [
          "ការវាយតម្លៃលម្អិត",
          "ការសហការជាមួយដៃគូ",
          "ការលើកកម្ពស់ការយល់ដឹង"
        ]
      : [
          "Detailed assessment",
          "Partner collaboration",
          "Community awareness promotion"
        ];

  const footerCopyright = locale === "km"
    ? "© ២០២៦ មជ្ឈមណ្ឌលម្លប់ព្រហ្មវិហារធម៌ (MPC)។ សិទ្ធិគ្រប់យ៉ាងរក្សាទុក។"
    : "© 2026 Mluop Promviheathor Center Organization (MPC). All rights reserved.";

  const strategyLabel = locale === "km" ? "យុទ្ធសាស្ត្រ" : "Strategy";

  const footerLabels = {
    contact: locale === "km" ? "ទំនាក់ទំនង" : "Contact",
    social: locale === "km" ? "បណ្តាញសង្គម" : "Social Media",
    address:
      locale === "km"
        ? "អាសយដ្ឋាន៖ ភូមិ/សង្កាត់, រាជធានីភ្នំពេញ, កម្ពុជា"
        : "Address: Phnom Penh, Cambodia",
  };

  return (
    <div className="bg-[#f3f5f6] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
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
          <div className="rounded-2xl bg-white/75 p-5 shadow-lg backdrop-blur-sm sm:p-6">
            <h1 className={`text-[45px] font-semibold text-[#184D6C] ${locale === "km" ? "leading-[1.35] sm:leading-[1.3]" : ""}`}>
              {briefTitle}
            </h1>
            <p className={`mt-6 text-[25px] font-medium text-[#184D6C] ${locale === "km" ? "leading-10 sm:leading-[2.2rem]" : ""}`}>
              {briefDescription}
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pt-10 sm:px-6 lg:pt-14">
        <section
          className="space-y-5 rounded-2xl bg-white p-8 shadow-sm sm:p-10 dark:bg-zinc-900"
          lang={locale === "km" ? "km" : "en"}
        >
          <h2 className="text-3xl font-bold text-[#184D6C] sm:text-4xl">
            {solveTitle}
          </h2>
          <p className={`max-w-3xl text-lg text-zinc-700 sm:text-xl dark:text-zinc-300 ${locale === "km" ? "leading-10 sm:leading-[2.2rem]" : ""}`}>
            {solveDescription}
          </p>
        </section>

        <section
          className="relative left-1/2 flex h-[calc(100dvh-64px)] min-h-[calc(100vh-64px)] w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden"
          lang={locale === "km" ? "km" : "en"}
        >
          <Image
            src={visionBanner}
            alt="Vision banner"
            fill
            className="border-0 object-cover object-center outline-none ring-0 scale-[1.02]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-white/25" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl items-center px-4 py-8 sm:px-8">
            <div className="relative ml-auto max-w-xl rounded-2xl bg-white/75 p-5 shadow-lg backdrop-blur-sm sm:p-6">
              <h2 className="text-3xl font-bold text-[#184D6C] sm:text-4xl">
                {visionTitle}
              </h2>
              <p className={`mt-4 text-lg text-zinc-700 sm:text-xl ${locale === "km" ? "leading-10 sm:leading-[2.2rem]" : ""}`}>
                {visionDescription}
              </p>
              <Link
                href="/vision"
                className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-[#184D6C] underline-offset-4 hover:underline"
              >
                {visionLearnMore} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-3xl font-bold text-[#184D6C] sm:text-4xl">
            {locale === "km" ? "អ្វីដែលយើងធ្វើ" : "What we do"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STRATEGIES.map((strategy, index) => (
              <Link
                key={strategy.slug}
                href={`/strategies/${strategy.slug}`}
                className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
              >
                <div className="rounded-xl bg-linear-to-br from-[#e7eff3] to-[#d5e3ea] p-4">
                  <Image
                    src={strategy.image}
                    alt={strategy.name}
                    className="mx-auto h-28 w-auto object-contain"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#184D6C]">
                  {strategyLabel} {index + 1}
                </p>
                <h3 className="mt-1 text-xl font-bold text-zinc-900 group-hover:text-[#184D6C] dark:text-zinc-100">
                  {strategy.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-zinc-600 dark:text-zinc-300">
                  {strategy.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 bg-white py-10 dark:bg-zinc-900 sm:py-14"
          lang={locale === "km" ? "km" : "en"}
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:py-0">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-[#184D6C] sm:text-4xl">
                {targetLocationsTitle}
              </h2>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300">
                  {targetLocationsSubtitle}
                </h3>
                <ul className={`list-inside list-disc space-y-3 text-lg text-zinc-600 dark:text-zinc-400 ${locale === "km" ? "leading-10" : ""}`}>
                  {locationBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {TARGET_LOCATIONS.map((location) => (
                <div
                  key={location.id}
                  className="rounded-xl border-2 border-zinc-200 p-6 dark:border-zinc-700"
                >
                  <div className="mb-4 inline-block rounded-full bg-[#184D6C] px-4 py-1 text-sm font-semibold text-white">
                    {location.status[locale]}
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-[#184D6C] sm:text-2xl">
                    {location.title[locale]}
                  </h3>
                  <ul className={`mt-4 list-inside list-disc space-y-3 text-base text-zinc-600 dark:text-zinc-400 ${locale === "km" ? "leading-9" : ""}`}>
                    {location.description[locale].map((desc) => (
                      <li key={desc}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mx-auto w-full px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col items-center gap-4 text-center text-zinc-900 dark:text-zinc-100">
              <Image
                src={logo}
                alt="MPC Organization logo"
                className="mx-auto h-56 w-56 object-contain"
              />
            </div>

            <div className="flex flex-col gap-4 text-center text-zinc-900 dark:text-zinc-100 md:text-left">
              <h3 className="text-lg font-bold">{footerLabels.contact}</h3>
              <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center justify-center gap-3 md:justify-start">
                  <ContactIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                      <title>Phone</title>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.3 19.3 0 0 1-6-6A19.8 19.8 0 0 1 2.09 3.18 2 2 0 0 1 4.11 1h3a2 2 0 0 1 2 1.72c.12.89.32 1.75.59 2.58a2 2 0 0 1-.45 2.11L8.1 8.56a16 16 0 0 0 6.34 6.34l1.15-1.15a2 2 0 0 1 2.11-.45c.83.27 1.69.47 2.58.59A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </ContactIcon>
                  <a href="tel:+85512345678" className="hover:underline">
                    +855 12 345 678
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3 md:justify-start">
                  <ContactIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                      <title>Email</title>
                      <path d="M4 4h16v16H4z" />
                      <path d="m22 6-10 7L2 6" />
                    </svg>
                  </ContactIcon>
                  <a href="mailto:mlobpromviheathor@gmail.com" className="hover:underline">
                    mlobpromviheathor@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center gap-3 md:justify-start">
                  <ContactIcon>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                      <title>Location</title>
                      <path d="M12 21s6-5.33 6-10a6 6 0 1 0-12 0c0 4.67 6 10 6 10z" />
                      <circle cx="12" cy="11" r="2" />
                    </svg>
                  </ContactIcon>
                  <span>{footerLabels.address}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 text-center text-zinc-900 dark:text-zinc-100 md:text-left">
              <h3 className="text-lg font-bold">{footerLabels.social}</h3>
              <div className="flex items-center justify-center gap-4 md:justify-start">
                <a href="https://www.facebook.com" aria-label="Facebook" className="group">
                  <SocialIcon>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <title>Facebook</title>
                      <path d="M13 22v-8h2.7l.4-3H13V9.1c0-.9.3-1.5 1.6-1.5H16V5a22 22 0 0 0-2.2-.1C11.6 4.9 10 6.6 10 9v2H7v3h3v8h3z" />
                    </svg>
                  </SocialIcon>
                </a>
                <a href="https://www.youtube.com" aria-label="YouTube" className="group">
                  <SocialIcon>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <title>YouTube</title>
                      <path d="M21.8 8.5s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C16.1 5.2 12 5.2 12 5.2h0s-4.1 0-6.9.3c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2 10.1 2 11.6v.9c0 1.5.2 3.1.2 3.1s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.8.2 7.6.3 7.6.3s4.1 0 6.9-.3c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.6.2-3.1v-.9c0-1.5-.2-3.1-.2-3.1zM10 14.7V8.9l5.6 2.9-5.6 2.9z" />
                    </svg>
                  </SocialIcon>
                </a>
                <a href="https://www.linkedin.com" aria-label="LinkedIn" className="group">
                  <SocialIcon>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <title>LinkedIn</title>
                      <path d="M6.94 6.5a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88ZM5.2 8.2h3.5V20H5.2V8.2Zm5.6 0h3.4v1.6h.1c.5-1 1.7-1.9 3.5-1.9 3.7 0 4.4 2.4 4.4 5.5V20h-3.5v-5.2c0-1.2 0-2.8-1.8-2.8s-2 1.4-2 2.7V20h-3.5V8.2Z" />
                    </svg>
                  </SocialIcon>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 bg-[#184D6C] text-white dark:border-zinc-700 dark:bg-zinc-950">
          <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-xs text-white/70">{footerCopyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}