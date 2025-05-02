// data/educationContent.ts
import type { ForesightContent } from "./foresightContent";

export const educationContent: ForesightContent = {
  introText: `[SYS-ARCHIVE v3.7]  •  NODE: CINCINNATI_EDU_NET
CATEGORY LOADED: Education
Date Retrieved: 14 May 2040 | 09:17:33 EST
————————
You may choose one of the following three education scenarios to explore further. Each scenario spotlights forces now reshaping how—and why—we learn.

↓  Use the arrow keys (↑ / ↓) to navigate and press return/enter to dive into a scenario  ↓`,

  /* ────────────────────────────  FILE-LIST OPTIONS  ──────────────────────────── */
  options: [
    {
      file: "Education as an Ideological Expression",
      description: "Parents “shop” for schools that reflect their worldviews, while AI-powered learning devices channel students into personalized echo chambers—turning curricula into political battlegrounds and fracturing community cohesion.",
    },
    {
      file: "The Education Arms Race",
      description: "From redshirting preschoolers to hiring six-figure admissions strategists and subscribing to AI-driven test-prep platforms, families treat schooling like a high-stakes investment—driving grade inflation and excluding those who can’t afford the competition.",
    },
    {
      file: "The Enrollment Cliff",
      description: "Facing plunging birthrates and ROI skepticism, universities slash programs, merge under financial strain, or shift entirely online—while luxury dorms, corporate “mini-universities,” and underground scholar networks vie for a shrinking pool of students.",
    },
  ],
  

  /* ─────────────────────────────  SCENARIO DETAIL TEXTS  ───────────────────────────── */
  detailTexts: [
    `In 2034, education has become as much about ideology as instruction. Gone are the days when schools were judged solely on test scores or class sizes: today, parents “shop” for institutions that align with their worldviews, from hyper-partisan curriculums to self-selected homeschool pods. A handheld device grants every student instant access to tailored content, but also funnels them into echo chambers that reinforce their chosen beliefs. As school boards transform into local political battlegrounds, debates over textbooks and teachers’ personal values ignite community fracturing. The result is a generation whose foundational understanding of history, civics, and science is determined more by ideological fit than universal truth—raising urgent questions about shared identity and social cohesion.`,  
    `The race to get ahead in education has reached fever pitch. From “redshirting” kindergarteners to buying six-figure concierge coaching for college admissions, families treat schooling like a high-stakes investment portfolio. Third-party consultants charge the cost of a home to craft an applicant’s every extracurricular move, while Montessori-style micro-schools and AI-driven test prep startups proliferate. Grade inflation and padded transcripts have become so rampant that new authentication services now certify which achievements are “real.” Even parental leave policies stretch into elementary years, allowing moms and dads to shepherd their children through critical prep seasons. In this arms race, those who can’t keep up face systemic exclusion—fueling both economic stratification and widespread burnout among students and families alike.`,  
    `After a century of growth, U.S. college enrollments have plunged into a “cliff,” reshaping the higher-ed landscape. Shrinking birthrates collide with skepticism about the ROI of an expensive degree, prompting universities to slash humanities programs, merge under financial duress, or pivot entirely to online offerings. Campuses boast luxury dorms and glitzy rec centers to lure a dwindling pool of traditional students, even as vocational apprenticeships and corporate-run “mini-universities” siphon off potential applicants. International students temporarily buck the trend—adding billions in tuition revenue—but demographic headwinds persist. Surviving institutions eye mergers and market-based pricing tied to projected earning power, while underground scholar networks preserve endangered disciplines outside the mainstream academy.`,  
  ],  

  /* ─────────────────────  HEADER TEMPLATE FOR DETAIL VIEW  ───────────────────── */
  detailHeaderTemplate: (file) =>
    `[SYS-ARCHIVE v3.7]  •  NODE: CINCINNATI_EDU_NET
└─ QUERY: "${file}"
Date Retrieved: 14 May 2040 | 09:17:33 EST`,

  /* ───────────────────────  “HOW DID THIS HAPPEN?” CONFIG  ─────────────────────── */
  happenedConfig: [
    /* 0 ─ IDEOLOGICAL EXPRESSION */
    {
      header: `[…Education as Ideological Expression: How did this happen?…]`,
      intro: `From viral school-board clashes to the boom in values-aligned microschools, 2020-2025 laid the ideological fault-lines we navigate today.  Headlines below trace the shift.`,
      options: [
        "Curriculum Culture Wars",
        "Homeschool & Microschool Boom",
        "Teacher Exodus & Censorship",
        "Values‑Aligned School Choice",
        "Return to Education Start",
      ],
    },

    /* 1 ─ EDUCATION ARMS RACE */
    {
      header: `[…The Education Arms Race: How did this happen?…]`,
      intro: `Test-prep empires, Ivy-consultant invoices, and transcript inflation all spiked in the early 2020s.  Navigate the evidence that turned learning into contest.`,
      options: [
        "Redshirting & Early Advantage",
        "Pay-to-Play Admissions Consulting",
        "Credential Inflation & Verification",
        "AI‑Powered Test Prep & Digital Exams",
        "Return to Education Start",
      ],
    },

    /* 2 ─ ENROLLMENT CLIFF */
    {
      header: `[…The Enrollment Cliff: How did this happen?…]`,
      intro: `Declining birth-rates met skyrocketing tuition and alternative credentials.  The 2020-2025 headlines below chart higher-ed’s scramble for survival.`,
      options: [
        "Demographic Decline & Enrollment Drop",
        "Tuition Resets & Mergers",
        "Corporate & Online Campuses",
        "Market‑Priced Degrees & Alt Financing",
        "Return to Education Start",
      ],
    },
  ],
};
