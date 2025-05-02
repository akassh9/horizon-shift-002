// data/healthContent.ts
import type { ForesightContent } from "./foresightContent";

export const entertainmentContent: ForesightContent = {
  introText: `[SYS-ARCHIVE v3.7]  •  NODE: CINCINNATI_EDU_NET
CATEGORY LOADED: Health
Date Retrieved: 14 May 2040 | 09:17:33 EST
————————
You may choose one of the following three health scenarios to explore further. Each scenario focuses on key developments reshaping healthcare in 2034.

↓  Use the arrow keys (↑ / ↓) to dive into a scenario  ↓`,

  options: [
    {
      file: "Dr. Me: The Era of Personal Health Autonomy",
      description: "Individuals now manage their health independently, driven by wearable tech, holistic medicine, and monetization of personal health data.",
    },
    {
      file: "Profit Over Patient: Healthcare’s New Marketplace",
      description: "Economic pressures transform healthcare into a cost-driven marketplace featuring DIY treatments, healthcare cryptocurrencies, and consumer comparison platforms.",
    },
    {
      file: "A 'Whole' New World: Human Enhancement and Ethical Frontiers",
      description: "Biomedical advancements redefine human potential, extending lifespans, enabling genetic modifications, and challenging ethical and legal norms.",
    },
  ],

  detailTexts: [
    `By 2034, personal health responsibility has profoundly reshaped healthcare. Driven by frustration with traditional medicine and empowered by advancements in wearable technology, individuals now manage their health independently, continuously monitoring vital signs and health metrics once available only during doctor visits. This era of unprecedented health data access empowers proactive health decisions but has introduced new anxieties stemming from constant vigilance and the potential misinterpretation of minor health fluctuations.

Meanwhile, holistic and alternative treatments—ranging from herbal medicine and acupuncture to psychedelic-assisted therapies—have become mainstream. Traditional insurance providers, pressured by public demand, have expanded their coverage models or face competition from specialized holistic-care insurers. Health education has also transformed radically, equipping new generations of patients and healthcare providers alike with the tools needed to navigate this increasingly complex landscape.

Finally, health data itself has emerged as a valuable personal asset, leading to a thriving economy where individuals actively sell or lease detailed biometric data to companies, researchers, and healthcare startups, fundamentally altering privacy norms and economic structures in healthcare.`,

    `By 2034, the price tag on every medical decision is impossible to ignore. Sky-high costs and decades of deregulation have turned healthcare into a consumer marketplace where survival often depends on a family’s credit limit rather than a doctor’s skill. Faced with bankrupting hospital bills, many patients now design their own treatment plans at home: AI coaches guide bespoke physical-therapy regimens, countertop compounding kits mix personalized medications, and online forums swap raw pharmaceutical ingredients as casually as recipes.

Financial despair has also normalized once-taboo choices. Physician-assisted death—marketed as a “compassionate debt-relief option”—is now a line item in many hospital brochures, sparking fierce ethical debate. Meanwhile, “crypto-health” tokens let clinics and patients bypass insurers entirely; a single scan of a QR-tattoo can settle a surgery bill or unlock an upgrade to premium post-op care.

Comparison shopping platforms round out the landscape: with a few taps, users can sort heart-bypass packages by price, location, and recovery rating, much like booking flights or hotels in the early 2000s. Bargain hunters fly abroad for cut-rate procedures, while luxury hospitals advertise concierge gene therapies to the ultra-wealthy. In this marketplace, access to healing—and even the right to die—has become just another transaction.`,

    `In 2034 the line between healing and upgrading has vanished. Gene-editing kiosks in suburban malls promise sharper memories or age-reversal enzyme packs; construction firms advertise “exo-muscle” implants that let workers hoist steel beams bare-handed. Lifespans have sprinted past a century, straining housing, pensions, and even food systems as governments scramble to accommodate populations that simply don’t retire—or die—on schedule.

The next generation may never know chance genetics at all. Prospective parents select embryo traits from glossy catalogs—disease immunity, height presets, perfect-pitch bundles—while bioethicists warn of a coming monoculture of designer children. Black-market labs push further, offering unauthorized CRISPR mods for IQ or extreme-sport endurance, leaving regulators in perpetual catch-up.

Legal definitions of “human” lag behind the tech. Courts debate whether enhanced firefighters with heat-shielded skin qualify for the same labor protections as unmodified peers. Insurance actuaries rewrite risk tables daily as augmented vision, sub-dermal armor, and neural-speech chips hit the market. Each breakthrough forces society to choose between access and equity, progress and identity—constantly redrawing the frontier of what bodies can, and should, become.`,
  ],

  detailHeaderTemplate: (file) =>
    `[SYS-ARCHIVE v3.7]  •  NODE: CINCINNATI_EDU_NET
└─ QUERY: "${file}"
Date Retrieved: 14 May 2040 | 09:17:33 EST`,

  happenedConfig: [
    {
      header: `[…Dr. Me: How did this happen?…]`,
      intro: `To understand the Dr. Me revolution, we rewind to the early 2020s—a time of rapid innovation in wearable sensors, telehealth protocols, and consumer genomics that laid the groundwork for today’s hyper-personalized care.
      
In your terminal you’ll now see headlines from those watershed years. Use the arrow keys (↑ / ↓) to navigate, then open any item to dive deeper.`,
      options: [
        "Wearable & Continuous-Monitoring Tech",
        "Regulatory Health Pilots",
        "Consumer Genomics Boom",
        "Return to Health Start",
      ],
    },
    {
      header: `[…Profit Over Patient: How did this happen?…]`,
      intro: `The transformation into a marketplace didn’t happen overnight. Between 2020 and 2025, escalating costs, regulatory shifts, and venture-backed health startups collided to redefine value and access.

Below, you’ll find policy memos, market analyses, and launch-day reports—each a spark that ignited today’s “Profit Over Patient.”`,
      options: [
        "Hospital Consolidation Trends",
        "Outcome-Based Contracts",
        "Investor-Backed Health Startups",
        "Return to Health Start",
      ],
    },
    {
      header: `[…A ‘Whole’ New World: How did this happen?…]`,
      intro: `Human enhancement reached critical mass when first-in-human CRISPR trials and exoskeleton rollouts went mainstream between 2021 and 2024. Those breakthroughs blurred the line between therapy and upgrade.

Navigate the timeline below to see the milestones that made today’s “Whole New World” possible.`,
      options: [
        "Life-Extension & Longevity",
        "Human Enhancement & Prosthetics",
        "Genetic Editing & Designer Babies",
        "Return to Health Start",
      ],
    },
  ],
};