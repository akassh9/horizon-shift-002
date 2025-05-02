// data/entertainmentContent.ts
import type { ForesightContent } from "./foresightContent";

export const entertainmentContent: ForesightContent = {
  /* ───────────────────────────────  INTRO  ─────────────────────────────── */
  introText: `[SYS-ARCHIVE v3.7]  •  NODE: CINCINNATI_EDU_NET
CATEGORY LOADED: Entertainment
Date Retrieved: 14 May 2040 | 09:17:33 EST
————————
You may choose one of the following three entertainment scenarios to explore further. Each scenario reveals how tech, culture, and fandom reshaped what it means to create—and consume—stories in 2034.

↓  Use the arrow keys (↑ / ↓) to navigate and press return/enter to dive into a scenario  ↓`,

  /* ────────────────────────  FILE‑LIST OPTIONS  ──────────────────────── */
  options: [
    {
      file: "The Fifth Wall: Immersive Participation",
      description: "Audiences leap from passive viewing to starring roles as VR, AR, and real‑world pop‑ups blur the line between story and life.",
    },
    {
      file: "When the AI Credits Roll: Generative Entertainment",
      description: "Scripts, songs, and even actors spring from algorithms—sparking legal fights, industry upheaval, and fears of a creativity crash.",
    },
    {
      file: "Artists Are King, Again: Authenticity Renaissance",
      description: "In a sea of formulaic, AI‑churned content, bold human visionaries reclaim the spotlight—driving IP mania, direct‑to‑fan models, and activist art.",
    },
  ],

  /* ─────────────────────────  SCENARIO DETAIL TEXTS  ───────────────────────── */
  detailTexts: [
    /* 0 — THE FIFTH WALL */
    `By 2034, spectatorship is obsolete. Flagship franchises now drop you inside the narrative—whether that means donning a neural‑synced haptic rig to feel a hero’s heartbeat or renting a screen‑perfect replica of Seinfeld’s apartment for the weekend. Stadium‑scale VR domes, location‑based AR quests, and city‑wide fandom festivals turn everyday spaces into stages. The upside: unforgettable, communal storytelling. The downside: “immersion withdrawal” and blurred reality lines that challenge mental‑health norms as audiences chase ever deeper escapes.`,

    /* 1 — WHEN THE AI CREDITS ROLL */
    `Generative models dominate studio backlots. AI storyboards green‑light themselves; synthetic voices croon chart‑toppers; de‑aged digital actors never age out of franchise roles. Tech giants pour billions into “Entertain‑AI‑ment,” betting human writers and animators are a redundancy. Early profits soar—until lawsuits, authenticity backlash, and investor skepticism spark an existential threat: Hollywood’s Big Bailout. Creatives scramble to relearn long‑dormant craft skills even as awards shows debate separate AI and human categories.`,

    /* 2 — ARTISTS ARE KING, AGAIN */
    `Saturated by algorithmic sameness, audiences pivot back to distinctive voices. Barbenheimer‑size anomalies prove big bets on auteur vision can beat content mills. Taylor‑scale tour phenomena turn concerts into GDP‑sized events. Musicians fence their catalogs behind artist‑owned apps, while indie filmmakers court VCs hungry for “creator equity.” Copyright wars escalate as artists seek protection down to half‑written verses and concept sketches. Authenticity becomes both commercial advantage and cultural rallying cry.`,
  ],

  /* ─────────────────────  HEADER TEMPLATE FOR DETAIL VIEW  ───────────────────── */
  detailHeaderTemplate: (file) =>
    `[SYS-ARCHIVE v3.7]  •  NODE: CINCINNATI_EDU_NET
└─ QUERY: "${file}"
Date Retrieved: 14 May 2040 | 09:17:33 EST`,

  /* ─────────────────────  “HOW DID THIS HAPPEN?” CONFIG  ───────────────────── */
  happenedConfig: [
    /* 0 — THE FIFTH WALL */
    {
      header: `[…The Fifth Wall: How did this happen?…]`,
      intro: `VR headsets, fandom pop‑ups, and touch‑everything art installations exploded between 2020 and 2025. Headlines below chart the tech—and desire—that shattered the old spectator model.`,
      options: [
        "Immersive VR/AR Platforms",
        "Experiential Installations & Pop‑Ups",
        "Wearables & Neural Feel‑Tech",
        "Fandom Tourism & Replica Sets",
        "Return to Entertainment Start",
      ],
    },

    /* 1 — WHEN THE AI CREDITS ROLL */
    {
      header: `[…When the AI Credits Roll: How did this happen?…]`,
      intro: `From record‑label lawsuits to AI‑generated movie trailers gone wrong, 2020‑2025 signaled that algorithms were storming the soundstage. Navigate the sparks that set Hollywood on edge.`,
      options: [
        "Generative‑AI Tool Investments",
        "AI Controversies & Legal Pushback",
        "Automation of Creative Roles",
        "Investor Uncertainty & Market Shifts",
        "Return to Entertainment Start",
      ],
    },

    /* 2 — ARTISTS ARE KING, AGAIN */
    {
      header: `[…Artists Are King, Again: How did this happen?…]`,
      intro: `Chart anomalies, billion‑dollar tours, and direct‑fan apps showed audiences craving authenticity in the mid‑2020s. The headlines below trace that pendulum swing.`,
      options: [
        "Authenticity & Phenomenon Tours",
        "Diverse Charts & Non‑Formulaic Hits",
        "Indie Success & VC Funding",
        "Direct‑to‑Fan Platforms & Monetization",
        "Return to Entertainment Start",
      ],
    },
  ],
};
