"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import logo from "@/public/assets/MPC_Logo.png";
import orgBriefBanner from "@/public/assets/image/orgBrief_Banner.png";
import { STRATEGIES } from "@/shared/data/strategies";

const LOCALE_STORAGE_KEY = "mpc-ui-locale";
const LOCALE_EVENT = "mpc-locale-change";

type Locale = "en" | "km";

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
      ? "អំពីអង្គការមជ្ឈមណ្ឌលម្លប់ព្រហ្មវិហារធម៌"
      : "About Mluop Promviheathor Center Organization";

  const briefDescription =
    locale === "km"
      ? "អង្គការ MPC គាំទ្រគ្រួសារ និងសហគមន៍ តាមរយៈការការពារកុមារ ការគាំទ្រការចិញ្ចឹមកូន និងការអប់រំជាក់ស្តែង ដើម្បីបង្កើតអនាគតដែលមានសុវត្ថិភាព និងសុខុមាលភាពល្អសម្រាប់កុមារគ្រប់រូប។"
      : "Mluop Promviheathor Center Organization (MPC) supports families and communities through child protection, parenting support, and practical education to create safer, healthier futures for every child.";

  return (
    <div className="bg-[#f3f5f6] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <section className="relative flex min-h-[calc(100vh-64px)] w-full items-center overflow-hidden px-4 py-10 sm:px-8">
        <Image
          src={orgBriefBanner}
          alt="Briefly about organization banner"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/25" />
        <div className="mx-auto w-full max-w-6xl">
          <div className="relative max-w-xl rounded-2xl bg-white/75 p-5 shadow-lg backdrop-blur-sm sm:p-6">
            <h1 className="text-2xl font-bold text-[#184D6C] sm:text-3xl">
              {briefTitle}
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-700 sm:text-base">
              {briefDescription}
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:py-14">
        <section className="space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8 dark:bg-zinc-900">
          <h2 className="text-2xl font-bold text-[#184D6C]">អ្វីដែលយើងដោះស្រាយ</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h3 className="font-semibold">Parenting Challenges</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                We guide caregivers with practical methods for positive
                parenting and child development.
              </p>
            </article>
            <article className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h3 className="font-semibold">Child Protection Gaps</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                We connect families and communities to support systems that keep
                children safe.
              </p>
            </article>
            <article className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h3 className="font-semibold">Limited Access To Knowledge</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                We provide easy-to-understand resources in local context and
                language.
              </p>
            </article>
            <article className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-700">
              <h3 className="font-semibold">Weak Community Coordination</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                We bring stakeholders together to respond earlier and better for
                every child.
              </p>
            </article>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#dae7ee] via-[#eaf2f6] to-[#cfe1ea] p-6 sm:p-8">
          <div className="pointer-events-none absolute -left-8 top-8 opacity-25">
            <Image
              src={logo}
              alt=""
              className="h-52 w-auto object-contain"
              aria-hidden
            />
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#dae7ee] via-[#eaf2f6] to-[#cfe1ea] p-6 sm:p-8">
          <div className="pointer-events-none absolute -left-8 top-8 opacity-25">
            <Image src={logo} alt="" className="h-52 w-auto object-contain" aria-hidden />
          </div>
          <div className="relative ml-auto max-w-xl rounded-2xl bg-white/85 p-5 shadow-lg backdrop-blur-sm sm:p-6">
            <h2 className="text-2xl font-bold text-[#184D6C] sm:text-3xl">
              ទស្សនវិស័យ
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-700 sm:text-base">
              Our vision is a caring society where children are protected,
              families are informed, and communities are confident to take
              action together.
            </p>
            <Link
              href="/vision"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#184D6C] underline-offset-4 hover:underline"
            >
              Learn more <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-[#184D6C]">អ្វីដែលយើងធ្វើ</h2>
          <p className="text-zinc-600 dark:text-zinc-300">
            Four focus strategies that drive our impact.
          </p>
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
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#184D6C]">
                  Strategy {index + 1}
                </p>
                <h3 className="mt-1 text-base font-bold text-zinc-900 group-hover:text-[#184D6C] dark:text-zinc-100">
                  {strategy.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {strategy.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}