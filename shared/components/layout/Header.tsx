"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import logo from "@/public/assets/MPC_Logo.png";

const LOCALE_STORAGE_KEY = "mpc-ui-locale";

type Locale = "en" | "km";

const NAV = [
  { href: "/", en: "Home", km: "ទំព័រដើម" },
  { href: "/about", en: "About Us", km: "អំពីយើង" },
  { href: "/what-we-do", en: "What We Do", km: "អ្វីដែលយើងធ្វើ" },
  { href: "/contact", en: "Contact", km: "ទំនាក់ទំនង" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/" || pathname === "/home";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function TranslateIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>("en");
  const menuId = useId();

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "en" || stored === "km") {
      setLocale(stored);
    }
  }, []);

  const setLocalePersist = (next: Locale) => {
    setLocale(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  };

  const label = (en: string, km: string) => (locale === "en" ? en : km);

  return (
    <header className="sticky top-0 z-50 bg-white/90 shadow-[0_1px_5px_rgba(24,77,108,0.22)] backdrop-blur-md dark:bg-zinc-950/90 dark:shadow-[0_1px_5px_rgba(24,77,108,0.35)]">
      <div className="mx-auto flex h-16 flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-[#184D6C] transition-opacity hover:opacity-90 dark:text-[#5a9ab8]"
        >
          <Image
            src={logo}
            alt="MPC Organization"
            width={60}
            height={80}
            className="h-14 w-auto shrink-0 object-contain"
            priority
          />
          <span className="hidden text-sm font-semibold tracking-wide sm:inline">
            MPC ORG
          </span>
        </Link>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-2 sm:gap-3">
          <nav
            aria-label="Main navigation"
            className="flex flex-wrap items-center justify-end gap-1 sm:gap-2"
            lang={locale === "km" ? "km" : "en"}
          >
            {NAV.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "rounded-full px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-[#184D6C] font-bold text-white dark:bg-[#2d6d8f]"
                      : "font-medium text-zinc-700 hover:bg-zinc-100 hover:text-[#184D6C] dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-[#7eb8d4]",
                  ].join(" ")}
                >
                  {label(item.en, item.km)}
                </Link>
              );
            })}
          </nav>

          <div className="group relative shrink-0">
            <button
              type="button"
              id={`${menuId}-trigger`}
              aria-haspopup="menu"
              aria-controls={`${menuId}-menu`}
              className="flex cursor-pointer items-center gap-0.5 rounded-lg p-2 text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              title="Language"
            >
              <TranslateIcon className="size-5 shrink-0" />
              <ChevronDownIcon className="size-4 shrink-0 opacity-70 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>

            <div
              id={`${menuId}-menu`}
              role="menu"
              aria-labelledby={`${menuId}-trigger`}
              className="pointer-events-none invisible absolute right-0 top-full z-60 pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100"
            >
              <div className="min-w-54 rounded-xl border border-zinc-200/90 bg-white p-2 shadow-lg shadow-zinc-200/50 ring-1 ring-black/5 dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-black/40 dark:ring-white/10">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={locale === "km"}
                  onClick={() => setLocalePersist("km")}
                  className={[
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    locale === "km"
                      ? "cursor-pointer bg-zinc-100 font-bold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                      : "cursor-pointer font-medium text-zinc-800 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800/80",
                  ].join(" ")}
                >
                  <span lang="km">ភាសាខ្មែរ (Khmer)</span>
                  {locale === "km" ? (
                    <span className="text-xs text-[#184D6C] dark:text-[#7eb8d4]" aria-hidden>
                      ✓
                    </span>
                  ) : null}
                </button>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={locale === "en"}
                  onClick={() => setLocalePersist("en")}
                  className={[
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                    locale === "en"
                      ? "cursor-pointer bg-zinc-100 font-bold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                      : "cursor-pointer font-medium text-zinc-800 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800/80",
                  ].join(" ")}
                >
                  <span lang="en">English</span>
                  {locale === "en" ? (
                    <span className="text-xs text-[#184D6C] dark:text-[#7eb8d4]" aria-hidden>
                      ✓
                    </span>
                  ) : null}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
