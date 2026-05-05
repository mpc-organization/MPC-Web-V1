import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { STRATEGIES } from "@/shared/data/strategies";

type StrategyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return STRATEGIES.map((strategy) => ({ slug: strategy.slug }));
}

export default async function StrategyDetailPage({ params }: StrategyPageProps) {
  const { slug } = await params;
  const strategy = STRATEGIES.find((item) => item.slug === slug);

  if (!strategy) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <Link
        href="/"
        className="inline-flex text-sm font-medium text-[#184D6C] hover:underline"
      >
        ← Back to home
      </Link>

      <section className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#184D6C]">
          {strategy.slug}
        </p>
        <h1 className="mt-2 text-3xl font-bold">{strategy.name}</h1>

        <div className="mt-6 rounded-xl bg-zinc-100 p-6 dark:bg-zinc-800/50">
          <Image
            src={strategy.image}
            alt={strategy.name}
            className="mx-auto h-64 w-auto object-contain"
            priority
          />
        </div>

        <p className="mt-6 text-zinc-700 dark:text-zinc-300">
          {strategy.description}
        </p>
      </section>
    </main>
  );
}
