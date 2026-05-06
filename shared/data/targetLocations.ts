export const TARGET_LOCATIONS = [
  {
    id: "location1",
    status: "Active",
    title: "Phnom Penh",
    description: [
      "Urban program focus",
      "Community outreach centers",
      "School-based interventions"
    ]
  },
  {
    id: "location2",
    status: "Expanding",
    title: "Kampong Thom Province",
    description: [
      "Rural community engagement",
      "Parenting education programs",
      "Local partner capacity building",
      "Child protection networks",
      "Healthcare coordination systems"
    ]
  },
  {
    id: "location3",
    status: "Planning",
    title: "Siem Reap Province",
    description: [
      "Regional assessment phase",
      "Stakeholder mapping",
      "Community needs analysis",
      "Partnership development"
    ]
  }
] as const;

export type TargetLocationId = (typeof TARGET_LOCATIONS)[number]["id"];
