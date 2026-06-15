import Image from "next/image";

import logo from "@/public/assets/MPC_Logo.png";

export default function VisionPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#184D6C]">
          Vision
        </p>
        <h1 className="mt-2 text-3xl font-bold">
          A Future Where Every Child Can Thrive
        </h1>

        <div className="mt-6 rounded-xl bg-zinc-100 p-6 dark:bg-zinc-800/50">
          <Image
            src={logo}
            alt="MPC vision"
            className="mx-auto h-64 w-auto object-contain"
            priority
          />
        </div>

        <p className="mt-6 text-zinc-700 dark:text-zinc-300">
          Our vision is to build a caring society where families are empowered,
          children are protected, and communities have the knowledge and systems
          needed to support healthy development for every child.
        </p>
      </section>
    </main>
  );
}
