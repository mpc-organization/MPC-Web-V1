"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import logo from "@/public/assets/MPC_Logo.png";
import visionBanner from "@/public/assets/image/visionBanner.png";
import { STRATEGIES } from "@/shared/data/strategies";
import { TARGET_LOCATIONS } from "@/shared/data/targetLocations";
import { MpcOrganizationBanner } from "@/app/features/mpcOrganizationBanner";

const LOCALE_STORAGE_KEY = "mpc-ui-locale";

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
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm dark:bg-zinc-800 dark:text-zinc-200">
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

  const briefDescription =
    locale === "km"
      ? "យើងជាអង្គការក្នុងស្រុក មិនរកប្រាក់ចំណូល ដែលមានទីតាំង ស្ថិតនៅស្រុកស្រែអំបិល ខេត្តកោះកុងបានចុះបញ្ជីជាមួយក្រសួងមហាផ្ទៃ តាំងពីឆ្នាំ២០០៥ រហូតដល់បច្ចុប្បន្ន"
      : "Mluop Promviheathor Center Organization (MPC) supports families and communities through child protection, parenting support, and practical education to create safer, healthier futures for every child.";

    const briefTitle = locale === "km" ? "អំពី MPC" : "About MPC";

  const solveTitle =
    locale === "km" ? "អ្វីដែលយើងដោះស្រាយ" : "What we solve";

  const solveDescription =
    locale === "km"
      ? "យើងផ្តោតលើការបំពេញចន្លោះដែលគ្រួសារ និងសហគមន៍ជួបប្រទះ រួមមានការគាំទ្រការចិញ្ចឹមកូនដោយវិជ្ជាជីវៈ ការការពារកុមារ ការចូលប្រើចំណេះដឹងដែលងាយយល់ និងការសម្របសម្រួលរវាងដៃគូ ដើម្បីឲ្យកុមារទទួលបានការជួយទាន់ពេល និងរស់នៅក្នុងបរិយាកាសដែលមានសុវត្ថិភាព។"
      : "We focus on gaps families and communities face around positive parenting, child protection, access to practical knowledge, and coordinated local action—so children get timely support and grow in safer, more nurturing environments.";

  const solveHighlights: string[] = [];

  const solvePrimaryImage =
    "https://t3.ftcdn.net/jpg/03/06/95/14/360_F_306951450_kx2GkuvF2QS7BbClxTuRvEggUnezACyl.jpg";
  const solveSecondaryImage =
    "https://media.istockphoto.com/id/2096480418/photo/group-of-multi-cultural-children-friends-linking-arms-looking-down-into-camera.jpg?s=612x612&w=0&k=20&c=H0-_W5BfzoBd8VqKwsj353-25GCwsF5XRHVzitJ4ffQ=";

  const visionDescription =
    locale === "km"
      ? "យើងចង់ឃើញសង្គមមួយដែលប្រជាជនគ្រប់រូប ជាពិសេសស្រី្ត កុមារ និងក្រុមងាយដែលងាយរងគ្រោះ មានភាពធន់ក្នុងការរស់នៅប្រកបដោយ ព្រហ្មវិហារធម៌ ភាពរីករាយជាមួយសិទ្ធិ ផ្សារភ្ជាបទៅ់នឹងធនធានធម្មជាតិ ប្រកបដោយចីរភាព។"
      : "Our vision is a caring society where children are protected, families are informed, and communities are confident to take action together.";

  

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

  const footerLabels = {
    contact: locale === "km" ? "ទំនាក់ទំនង" : "Contact",
    social: locale === "km" ? "បណ្តាញសង្គម" : "Social Media",
    address:
      locale === "km"
        ? "អាសយដ្ឋាន៖ ភូមិ/សង្កាត់, រាជធានីភ្នំពេញ, កម្ពុជា"
        : "Address: Phnom Penh, Cambodia",
  };

  const ICON_SVGS = [
    (
      <svg
        key="parenting"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
        aria-hidden
      >
        <title>Parenting Education</title>
        <path d="M2 7h20" />
        <path d="M6 7v11a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7" />
        <path d="M9 7v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    (
      <svg
        key="shelter"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
        aria-hidden
      >
        <title>Free Refuge Shelter</title>
        <path d="M3 11l9-7 9 7v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    (
      <svg
        key="medical"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
        aria-hidden
      >
        <title>Medical and Blood</title>
        <path d="M21 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6" />
        <path d="M7 10V6a5 5 0 0 1 10 0v4" />
        <path d="M12 14v6" />
      </svg>
    ),
    (
      <svg
        key="advocacy"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
        aria-hidden
      >
        <title>Donate for Health</title>
        <path d="M21 12.7a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.5 8.5 8.5 0 0 1-7.6-4.5A8.38 8.38 0 0 1 3 12.7" />
        <path d="M16 6.3a4 4 0 0 1-8 0" />
        <path d="M12 11v6" />
      </svg>
    ),
  ];

  return (
    <div className="bg-[#f3f5f6] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <MpcOrganizationBanner
        briefTitle={briefTitle}
        briefDescription={briefDescription}
      />

      <main className="mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-6">
        <section
          className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-white min-h-[calc(100dvh-64px)] dark:bg-zinc-900"
          lang={locale === "km" ? "km" : "en"}
        >
          <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-[#184D6C]/8 blur-3xl" />
          <div className="absolute left-0 bottom-0 h-28 w-28 rounded-full bg-[#1FC9A5]/10 blur-3xl" />
          <div className="mx-auto flex min-h-[calc(100dvh-64px)] w-full max-w-7xl items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <div className="grid w-full items-center gap-10 md:grid-cols-[1fr_0.96fr] md:gap-12 lg:gap-16">
              <div className="space-y-6">
                <div className="space-y-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#184D6C]/10 px-4 py-2 text-sm font-semibold text-[#184D6C]">
                    <span className="h-2 w-2 rounded-full bg-[#1FC9A5]" />
                    {solveTitle}
                  </span>
                  <h2 className="max-w-xl text-3xl font-bold tracking-tight text-[#184D6C] sm:text-4xl lg:text-5xl">
                    {locale === "km"
                      ? "What we solve for families and communities"
                      : "What we solve for families and communities"}
                  </h2>
                  <p
                    className={`max-w-2xl text-base leading-8 text-zinc-700 sm:text-lg dark:text-zinc-300 ${
                      locale === "km" ? "sm:leading-9" : ""
                    }`}
                  >
                    {solveDescription}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
                  {solveHighlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-[#184D6C]/10 bg-[#184D6C]/5 px-4 py-3 text-sm font-semibold text-[#184D6C] shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/what-we-do"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#184D6C] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#184D6C]/20 transition-transform hover:-translate-y-0.5 hover:bg-[#163f59] active:scale-[0.98]"
                  >
                    What We Do <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[560px] md:max-w-none md:justify-self-end">
                <div className="absolute -left-5 top-8 h-28 w-28 rounded-[2rem] bg-[#184D6C] opacity-85 sm:-left-7 sm:h-32 sm:w-32" />
                <div className="absolute right-4 bottom-4 h-24 w-24 rounded-[1.5rem] bg-[#184D6C] opacity-90 sm:right-6 sm:h-28 sm:w-28" />

                <div className="relative z-10 grid gap-4 sm:gap-5">
                  <div className="group relative ml-auto aspect-[5/4] w-[92%] overflow-hidden rounded-[1.8rem] shadow-[0_18px_45px_rgba(0,0,0,0.18)] ring-8 ring-white dark:ring-zinc-900 sm:w-[88%] md:w-[90%] lg:w-[88%]">
                    <Image
                      src={solvePrimaryImage}
                      alt="Children standing together"
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 767px) 92vw, (max-width: 1023px) 90vw, 520px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#184D6C]/10 via-transparent to-transparent" />
                  </div>

                  <div className="group relative -mt-10 ml-0 aspect-[16/10] w-[84%] overflow-hidden rounded-[1.6rem] shadow-[0_18px_45px_rgba(0,0,0,0.18)] ring-8 ring-white dark:ring-zinc-900 sm:w-[82%] md:w-[84%] lg:-mt-14">
                    <Image
                      src={solveSecondaryImage}
                      alt="Children gathered in a community setting"
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 767px) 84vw, (max-width: 1023px) 84vw, 460px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#184D6C]/10 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        
          <section
            className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-white dark:bg-zinc-900"
            lang={locale === "km" ? "km" : "en"}
          >
            <div className="mx-auto grid w-full grid-cols-1 items-stretch gap-0 py-8 sm:grid-cols-[0.8fr_1.2fr] sm:py-12">
              <div className="relative overflow-hidden h-full">
                <Image
                  src={visionBanner}
                  alt="Vision banner"
                  fill
                  className="hidden sm:block object-cover object-center"
                  sizes="(min-width: 640px) 40vw, 100vw"
                  priority
                />
                <Image
                  src={solvePrimaryImage}
                  alt="Vision mobile"
                  fill
                  className="block sm:hidden object-cover object-center"
                  sizes="100vw"
                  priority
                />
              </div>

              <div className="flex items-stretch">
                <div className="relative w-full bg-[#184D6C] px-8 py-12 sm:px-14 sm:py-20">
                  <div className="z-10 max-w-lg">
                    <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
                      VISION
                    </h2>
                    <p className="mb-8 text-base text-white/90">
                      {visionDescription}
                    </p>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-base font-semibold text-[#184D6C] shadow-md"
                    >
                      About Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        </section>

        <section
          className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden bg-white py-10 dark:bg-zinc-900 sm:py-14"
          lang={locale === "km" ? "km" : "en"}
        >
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-[#184D6C] sm:text-4xl">
                {locale === "km" ? "អ្វីដែលយើងធ្វើ" : "What we do"}
              </h2>

              <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {STRATEGIES.map((strategy, index) => {

              return (
                <Link
                  key={strategy.slug}
                  href={`/strategies/${strategy.slug}`}
                  className="group flex flex-col items-center rounded-2xl bg-white p-8 sm:p-10 text-center border border-zinc-100 shadow-[0_12px_30px_rgba(16,24,40,0.06)] transition-transform hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(16,24,40,0.08)] min-h-[22rem]"
                >
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white ring-1 ring-[#fdeee0] text-[#c96f37] shadow-sm">
                      {ICON_SVGS[index % ICON_SVGS.length]}
                    </div>

                    <h3 className="mt-1 text-2xl font-extrabold text-[#184D6C] leading-snug tracking-tight">
                      {strategy.name}
                    </h3>

                    <p className="mt-6 text-base leading-7 text-zinc-600 max-w-xs">
                      {strategy.shortDescription}
                    </p>
                </Link>
              );
            })}
          </div>
            </div>
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