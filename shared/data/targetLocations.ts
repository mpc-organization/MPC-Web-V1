export const TARGET_LOCATIONS = [
  {
    id: "location1",
    status: {
      en: "Active",
      km: "សកម្ម"
    },
    title: {
      en: "Phnom Penh",
      km: "ភ្នំពេញ"
    },
    description: {
      en: ["Urban program focus", "Community outreach centers", "School-based interventions"],
      km: ["ផ្ដោតលើកម្មវិធីក្នុងទីក្រុង", "មណ្ឌលចូលដល់សហគមន៍", "អន្តរាគមន៍នៅតាមសាលារៀន"]
    }
  },
  {
    id: "location2",
    status: {
      en: "Expanding",
      km: "កំពុងពង្រីក"
    },
    title: {
      en: "Kampong Thom Province",
      km: "ខេត្តកំពង់ធំ"
    },
    description: {
      en: [
        "Rural community engagement",
        "Parenting education programs",
        "Local partner capacity building",
        "Child protection networks",
        "Healthcare coordination systems"
      ],
      km: [
        "ការចូលរួមជាមួយសហគមន៍ជនបទ",
        "កម្មវិធីអប់រំការចិញ្ចឹមកូន",
        "ការពង្រឹងសមត្ថភាពដៃគូក្នុងស្រុក",
        "បណ្តាញការពារកុមារ",
        "ប្រព័ន្ធសម្របសម្រួលសុខាភិបាល"
      ]
    }
  },
  {
    id: "location3",
    status: {
      en: "Planning",
      km: "កំពុងរៀបចំ"
    },
    title: {
      en: "Siem Reap Province",
      km: "ខេត្តសៀមរាប"
    },
    description: {
      en: [
        "Regional assessment phase",
        "Stakeholder mapping",
        "Community needs analysis",
        "Partnership development"
      ],
      km: [
        "ដំណាក់កាលវាយតម្លៃតំបន់",
        "ការកំណត់ផែនទីអ្នកពាក់ព័ន្ធ",
        "ការវិភាគតម្រូវការសហគមន៍",
        "ការអភិវឌ្ឍភាពជាដៃគូ"
      ]
    }
  }
] as const;

export type TargetLocationId = (typeof TARGET_LOCATIONS)[number]["id"];
