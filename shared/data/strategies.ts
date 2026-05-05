import logo from "@/public/assets/MPC_Logo.png";

export const STRATEGIES = [
  {
    slug: "strategy1",
    name: "Parenting Education",
    shortDescription: "Support parents with practical positive parenting tools.",
    description:
      "We design and run education sessions that help caregivers build safe, nurturing, and development-focused home environments.",
    image: logo,
  },
  {
    slug: "strategy2",
    name: "Child Protection & Referral",
    shortDescription: "Connect vulnerable children to trusted support pathways.",
    description:
      "We work with local partners to identify risks early, strengthen referral links, and improve child protection response quality.",
    image: logo,
  },
  {
    slug: "strategy3",
    name: "Community Capacity Building",
    shortDescription:
      "Strengthen local leadership and coordination for child well-being.",
    description:
      "We equip community actors with skills, tools, and collaborative practices to sustain positive change at local level.",
    image: logo,
  },
  {
    slug: "strategy4",
    name: "Advocacy & Public Awareness",
    shortDescription:
      "Promote informed public action for stronger family and child outcomes.",
    description:
      "We raise awareness and advocate for policies and practices that prioritize child rights, healthy parenting, and social support systems.",
    image: logo,
  },
] as const;

export type StrategySlug = (typeof STRATEGIES)[number]["slug"];
