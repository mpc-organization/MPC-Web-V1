"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { STRATEGIES } from "@/shared/data/strategies";

type Locale = "en" | "km";
const LOCALE_STORAGE_KEY = "mpc-ui-locale";
const LOCALE_EVENT = "mpc-locale-change";

type Strategy = (typeof STRATEGIES)[number];

type StrategyDetailProps = {
  strategy: Strategy;
};

export function StrategyDetail({ strategy }: StrategyDetailProps) {
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

  const labels = {
    back: locale === "km" ? "ត្រឡប់ទៅទំព័រដើម" : "Back to home",
    section: locale === "km" ? "អ្វីដែលយើងធ្វើ" : "What we do",
    overview: locale === "km" ? "ទិដ្ឋភាពទូទៅ" : "Overview",
    more: locale === "km" ? "ផ្នែកផ្សេងទៀត" : "Explore more",
  };

  const otherStrategies = STRATEGIES.filter((item) => item.slug !== strategy.slug);

  return (
    <main
      className="min-h-screen bg-[#f3f5f6] text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100"
      lang={locale === "km" ? "km" : "en"}
    >
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#184D6C] transition-colors hover:text-[#163f59] dark:text-[#5a9ab8] dark:hover:text-[#7eb8d4]"
        >
          <span aria-hidden>←</span>
          {labels.back}
        </Link>

        <article className="mt-6 overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-[0_12px_30px_rgba(16,24,40,0.06)] dark:border-zinc-800 dark:bg-zinc-900">
          <div className="bg-[#184D6C] px-6 py-10 sm:px-10 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {labels.section}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
              {strategy.name}
            </h1>
            <p
              className={`mt-4 max-w-2xl text-base text-white/90 sm:text-lg ${
                locale === "km" ? "leading-8" : "leading-7"
              }`}
            >
              {strategy.shortDescription}
            </p>
          </div>

          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-[#184D6C]">
              {labels.overview}
            </h2>
            <p
              className={`mt-4 text-base text-zinc-700 dark:text-zinc-300 sm:text-lg ${
                locale === "km" ? "leading-8" : "leading-8"
              }`}
            >
              {strategy.description}
            </p>
          </div>
        </article>

        {otherStrategies.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-lg font-bold text-[#184D6C]">{labels.more}</h2>
            <ul className="mt-4 space-y-3">
              {otherStrategies.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/strategies/${item.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-5 py-4 transition-colors hover:border-[#184D6C]/20 hover:bg-[#184D6C]/5 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-[#184D6C]/30"
                  >
                    <div>
                      <p className="font-semibold text-[#184D6C] group-hover:text-[#163f59]">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {item.shortDescription}
                      </p>
                    </div>
                    <span
                      className="text-[#184D6C] transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}
