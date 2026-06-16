import logo from "@/public/assets/MPC_Logo.png";

export const STRATEGIES = [
  {
    slug: "strategy1",
    name: {
      en: "National Resources and Agriculture sectors linked to climate change",
      km: "វិស័យធនធានធម្មជាតិ និងកសិកម្ម ផ្សារភ្ជាប់ការប្រែប្រួលអាកាសធាតុ",
    },
    shortDescription: {
      en: "Support parents with practical positive parenting tools.",
      km: "គាំទ្រឪពុកម្តាយដោយឧបករណ៍ចិញ្ចឹមកូនវិជ្ជមានជាការណ៍។",
    },
    description: {
      en: "We design and run education sessions that help caregivers build safe, nurturing, and development-focused home environments.",
      km: "យើងរៀបចំ និងអនុវត្តវគ្គសិក្សាដែលជួយអ្នកថែទាំកុមារកសាងបរិស្ថានផ្ទះដែលមានសុវត្ថិភាព មានការថែទាំ និងផ្ដោតលើការអភិវឌ្ឍន៍។",
    },
    image: logo,
  },
  {
    slug: "strategy2",
    name: {
      en: "Public services are linked to gender inclusion",
      km: "វិស័យសាធារណៈ ផ្សារភ្ជាប់នឹងយេនឌ័រប្រកបដោយបរិយាបន្ន",
    },
    shortDescription: {
      en: "Connect vulnerable children to trusted support pathways.",
      km: "តភ្ជាប់កុមារងាយរងគ្រោះទៅកាន់ផ្លូវជំនួយដែលអាចទុកចិត្តបាន។",
    },
    description: {
      en: "We work with local partners to identify risks early, strengthen referral links, and improve child protection response quality.",
      km: "យើងធ្វើការជាមួយដៃគូក្នុងស្រុកដើម្បីកំណត់ហើយគ្រោះថ្នាក់ឱ្យបានឆាប់រហ័ស ពង្រឹងការតភ្ជាប់បញ្ជូន និងកែលម្អគុណភាពការឆ្លើយតបការពារកុមារ។",
    },
    image: logo,
  },
  {
    slug: "strategy3",
    name: {
      en: "Education Sector link with Digital",
      km: "វិស័យអប់រំផ្សារភ្ជាប់នឹងឌីជីថល",
    },
    shortDescription: {
      en: "Strengthen local leadership and coordination for child well-being.",
      km: "ពង្រឹងភាពជាអ្នកដឹកនាំក្នុងស្រុក និងការសម្របសម្រួលសម្រាប់សុខភាពសុខមុខកុមារ។",
    },
    description: {
      en: "We equip community actors with skills, tools, and collaborative practices to sustain positive change at local level.",
      km: "យើងផ្តល់ជំនាញ ឧបករណ៍ និងការអនុវត្តសហការដល់តួអង្គសហគមន៍ ដើម្បីរក្សាការផ្លាស់ប្តូរវិជ្ជមាននៅកម្រិតមូលដ្ឋាន។",
    },
    image: logo,
  },
] as const;

export type StrategySlug = (typeof STRATEGIES)[number]["slug"];
export type StrategyLocale = "en" | "km";
