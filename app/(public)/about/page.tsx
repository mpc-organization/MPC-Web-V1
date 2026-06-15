"use client";

import { useEffect, useState } from "react";

type Locale = "en" | "km";
const LOCALE_STORAGE_KEY = "mpc-ui-locale";
const LOCALE_EVENT = "mpc-locale-change";

export default function AboutPage() {
  const [locale, setLocale] = useState<Locale>(
    typeof document !== "undefined" && document.documentElement.lang === "km" ? "km" : "en"
  );

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

  const aboutText = {
    en: {
      title: "About MPC",
      description:
        "Mlup Promviheathor Center (MPC) obtained registration permit at the Ministry of Interior on July 29, 2005. We are a non-profit and local NGO based in Sre Ambel district, Koh Kong Province. We work in partnership with communities and vulnerable groups to build a resilient society and free from poverty.",
    },
    km: {
      title: "អំពី MPC",
      description:
        "អង្គការមជ្ឈមណ្ឌលម្លប់ព្រហ្មវិហារធម៌ (MPC) បានចុះបញ្ជីជាមួយក្រសួងមហាផ្ទៃ កាលពីថ្ងៃទី២៩ កក្កដា ឆ្នាំ២០២៥។ យើងជាអង្គការក្នុងស្រុក មិនរកប្រាក់ចំណូល ដែលមានទីតាំងនៅស្រុកស្រែអំបិល ខេត្តកោះកុង។ យើងធ្វើការជាដៃគូជាមួយសហគមន៍ និងក្រុមងាយរងគ្រោះ ដើម្បីកសាងសង្គមដែលមានភាពធន់ និងរួចផុតពីភាពក្រីក្រ។",
    },
  } as const;

  const visionText = {
    en: {
      title: "Vision",
      description:
        "We want to see a society where all people, especially women, children, and vulnerable groups, are resilient, live with Brahmavihāra, and enjoy their rights with sustainable natural resources.",
    },
    km: {
      title: "ទស្សនវិស័យ",
      description:
        "យើងចង់ឃើញសង្គមមួយដែលប្រជាជនគ្រប់រូប ជាពិសេសស្រី កុមារ និងក្រុមងាយរងគ្រោះ មានភាពធន់ រស់នៅប្រកបដោយព្រហ្មវិហារធម៌ និងបានរីករាយជាមួយសិទ្ធិ និងធនធានធម្មជាតិប្រកបដោយចីរភិបាល។",
    },
  } as const;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{aboutText[locale].title}</h1>
      <p className="mt-3 text-zinc-600 dark:text-zinc-400">{aboutText[locale].description}</p>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-[#184D6C]">{visionText[locale].title}</h2>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">{visionText[locale].description}</p>
      </section>
    </div>
  );
}
