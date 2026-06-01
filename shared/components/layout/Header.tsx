"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import logo from "@/public/assets/MPC_Logo.png";

const LOCALE_STORAGE_KEY = "mpc-ui-locale";
const LOCALE_EVENT = "mpc-locale-change";

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
      <title>Language</title>
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
      <title>Expand menu</title>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>("en");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuId = useId();
  const mobileMenuId = useId();

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "en" || stored === "km") {
      setLocale(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLocalePersist = (next: Locale) => {
    setLocale(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    document.documentElement.lang = next;
    window.dispatchEvent(new CustomEvent<Locale>(LOCALE_EVENT, { detail: next }));
  };

  const label = (en: string, km: string) => (locale === "en" ? en : km);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/90 shadow-[0_1px_5px_rgba(24,77,108,0.22)] backdrop-blur-md dark:bg-zinc-950/90 dark:shadow-[0_1px_5px_rgba(24,77,108,0.35)]">
      <div className="mx-auto flex min-h-16 flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:pl-[50px] lg:pr-[50px] lg:py-0">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#184D6C] transition-opacity hover:opacity-90 dark:text-[#5a9ab8] sm:gap-3"
        >
          <Image
            src={logo}
            alt="MPC Organization"
            width={60}
            height={80}
            className="h-11 w-auto shrink-0 object-contain sm:h-14"
            priority
          />
        </Link>

        <div className="ml-auto hidden flex-wrap items-center justify-end gap-2 sm:gap-3 md:flex">
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-end gap-4"
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
                    "group relative px-3 py-2 text-sm sm:text-base md:text-lg transition-colors",
                    active ? "text-[#184D6C] font-semibold" : "font-medium text-zinc-700 hover:text-[#184D6C] dark:text-zinc-300",
                  ].join(" ")}
                >
                  <span className={active ? "inline-block border-b-2 border-[#184D6C] pb-0.5" : "inline-block border-b-2 border-transparent group-hover:border-[#184D6C] pb-0.5"}>
                    {label(item.en, item.km)}
                  </span>
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
              className="flex cursor-pointer items-center gap-0.5 rounded-lg p-1.5 text-zinc-700 transition-colors hover:bg-zinc-100 sm:p-2 dark:text-zinc-200 dark:hover:bg-zinc-800"
              title="Language"
            >
              <TranslateIcon className="size-4 shrink-0 sm:size-5" />
              <ChevronDownIcon className="size-3.5 shrink-0 opacity-70 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180 sm:size-4" />
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

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls={mobileMenuId}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="ml-auto inline-flex items-center justify-center rounded-lg p-2 text-zinc-700 transition-colors hover:bg-zinc-100 md:hidden dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          {isMobileMenuOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 md:hidden ${isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <aside
        id={mobileMenuId}
        className={`fixed right-0 top-0 z-50 h-dvh w-[82vw] max-w-sm bg-white shadow-2xl transition-transform duration-200 md:hidden dark:bg-zinc-950 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex h-full flex-col px-4 pb-6 pt-4">
          <div className="flex items-center justify-between gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
            <Link href="/" className="flex items-center gap-2 text-[#184D6C] dark:text-[#5a9ab8]" onClick={() => setIsMobileMenuOpen(false)}>
              <Image src={logo} alt="MPC Organization" width={52} height={70} className="h-10 w-auto object-contain" priority />
            </Link>
            <button type="button" onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800" aria-label="Close menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="mt-4 flex flex-col gap-2" lang={locale === "km" ? "km" : "en"}>
            {NAV.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={[
                    "rounded-xl px-4 py-3 text-sm transition-colors",
                    active
                      ? "bg-[#184D6C] font-bold text-white dark:bg-[#2d6d8f]"
                      : "font-medium text-zinc-700 hover:bg-zinc-100 hover:text-[#184D6C] dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-[#7eb8d4]",
                  ].join(" ")}
                >
                  {label(item.en, item.km)}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <p className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Language</p>
            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => {
                  setLocalePersist("km");
                  setIsMobileMenuOpen(false);
                }}
                className={[
                  "flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors",
                  locale === "km"
                    ? "bg-zinc-100 font-bold text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                    : "font-medium text-zinc-800 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900",
                ].join(" ")}
              >
                <span lang="km">ភាសាខ្មែរ (Khmer)</span>
                {locale === "km" ? <span className="text-xs text-[#184D6C] dark:text-[#7eb8d4]" aria-hidden>✓</span> : null}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLocalePersist("en");
                  setIsMobileMenuOpen(false);
                }}
                className={[
                  "flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors",
                  locale === "en"
                    ? "bg-zinc-100 font-bold text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50"
                    : "font-medium text-zinc-800 hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-900",
                ].join(" ")}
              >
                <span lang="en">English</span>
                {locale === "en" ? <span className="text-xs text-[#184D6C] dark:text-[#7eb8d4]" aria-hidden>✓</span> : null}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
}
