import { notFound } from "next/navigation";

import { STRATEGIES } from "@/shared/data/strategies";

import { StrategyDetail } from "./StrategyDetail";

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

  return <StrategyDetail strategy={strategy} />;
}
