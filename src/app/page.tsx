"use client";

import { useState, useEffect } from "react";
import { DraggableWindow } from '../../components/DraggableWindow';
import { TextEditWindow } from '../../components/TextEditWindow';
import { MacMenuBar } from '../../components/MacMenuBar';
import Image from 'next/image';
import { AnimatePresence, motion } from "framer-motion";
import { healthContent } from "../../data/healthContent";
import { educationContent } from "../../data/educationContent";
import { entertainmentContent } from "../../data/entertainmentContent";
import type { WindowConfig } from '../types/window';
import { windows } from '../data/windows';


// --- hyperlinks for special draggables ---
const linkMap: Record<string, string> = {
  wearable1: "https://www.tandfonline.com/doi/full/10.1080/08164622.2025.2492761?utm_source=chatgpt.com",
  wearable2: "https://time.com/6304107/full-body-mri-health-scan/?utm_source=chatgpt.com",
  wearable3: "https://www.gssiweb.org/sports-science-exchange/article/gx-sweat-patch-and-app-for-personalized-hydration",
  healthassist1: "https://nextdigitalhealth.com/healthcaretechnology/connected-health/symptomate-review-2024-check-your-symptoms-online/?utm_source=chatgpt.com",
  healthassist2: "https://www.tctmd.com/news/fda-clears-ai-ecg-screening-tools-cv-care-whats-next-grabs?utm_source=chatgpt.com",
  healthassist3: "https://www.washingtonpost.com/opinions/2025/04/22/ai-health-care-expert-opinions/?utm_source=chatgpt.com",
  marketplace1: "https://blockchainhealthcaretoday.com/index.php/journal/article/view/338?utm_source=chatgpt.com",
  marketplace3: "https://kms-healthcare.com/blog/data-monetization-in-healthcare/?utm_source=chatgpt.com",
  marketplace2: "https://time.com/7271463/23andme-data-ai-bankruptcy/?utm_source=chatgpt.com",
  hollistic1: "https://www.fairhealth.org/article/getting-covered-for-alternative-medicine-2023?utm_source=chatgpt.com",
  hollistic2: "https://www.verywellhealth.com/fda-panel-rejects-mdma-therapy-for-ptsd-8659953?utm_source=chatgpt.com",
  hollistic3: "https://www.medicare.gov/coverage/acupuncture?utm_source=chatgpt.com",
  diy1:"https://www.mpo-mag.com/exclusives/ai-assisted-physical-therapy-empowers-patients-on-the-road-to-recovery/?utm_source=chatgpt.com",
  diy2:"https://phys.org/news/2024-05-easy-pill-swallow-3d-paves.html?utm_source=chatgpt.com",
  diy3:"https://www.wired.com/story/glp-1-compounding-fda-lawsuits/?utm_source=chatgpt.com",
  debt1:"https://www.kff.org/health-costs/issue-brief/the-burden-of-medical-debt-in-the-united-states/?utm_source=chatgpt.com",
  debt2:"https://www.npr.org/sections/health-shots/2023/06/26/1184105496/were-not-doing-that-a-black-couple-wont-crowdfund-to-pay-medical-debt?utm_source=chatgpt.com",
  debt3:"https://www.npr.org/sections/health-shots/2024/05/21/1252428534/he-fell-ill-on-a-cruise-before-he-boarded-the-rescue-boat-they-handed-him-the-bi?utm_source=chatgpt.com",
  crypto1:"https://pmc.ncbi.nlm.nih.gov/articles/PMC11281776/?utm_source=chatgpt.com",
  crypto2:"https://www.einpresswire.com/article/746323248/garm-clinic-now-accepts-cryptocurrency-for-patient-services?utm_source=chatgpt.com",
  crypto3:"https://blockchainhealthcaretoday.com/index.php/journal/article/view/245?utm_source=chatgpt.com",
  price1:"https://www.fiercehealthcare.com/health-tech/price-transparency-startup-turquoise-health-picks-30m-series-b-funding?utm_source=chatgpt.com",
  price2:"https://medcitynews.com/2024/01/hospitals-price-transparency/?utm_source=chatgpt.com",
  price3:"https://finance.yahoo.com/news/mdsave-launches-transparency-product-cms-140000204.html?utm_source=chatgpt.com",
  aging1:"https://www.bloomberg.com/news/features/2023-01-25/anti-aging-techniques-taken-to-extreme-by-bryan-johnson?utm_source=chatgpt.com",
  aging2:"https://www.nia.nih.gov/news/senolytic-therapy-shows-subtle-impact-age-related-bone-health-women?utm_source=chatgpt.com",
  aging3:"https://techcrunch.com/2021/04/23/longevity-startup-longevica-plans-to-launch-supplements-based-on-long-term-research/?utm_source=chatgpt.com",
  enhance1:"https://www.sciencenews.org/article/new-device-sense-temperature-prosthetic-hand-touch?utm_source=chatgpt.com",
  enhance2:"https://www.theverge.com/2024/1/29/24055167/elon-musk-has-news-on-neuralinks-first-human-implant-and-a-new-product-name-telepathy?utm_source=chatgpt.com",
  enhance3:"https://www.wired.com/story/the-us-armys-vision-of-an-exoskeleton-future-lives-on/?utm_source=chatgpt.com",
  gene1:"https://www.theguardian.com/us-news/2023/dec/08/fda-new-treatment-sickle-cell-disease?utm_source=chatgpt.com",
  gene2:"https://www.theguardian.com/society/2023/nov/16/uk-medicines-regulator-approves-casgevy-gene-therapy-for-two-blood-disorders-sickle-cell?utm_source=chatgpt.com",
  gene3:"https://www.theguardian.com/science/2021/oct/17/polygenic-screening-of-embryos-is-here-but-is-it-ethical?utm_source=chatgpt.com",
  ethics1:"https://www.who.int/news/item/12-07-2021-who-issues-new-recommendations-on-human-genome-editing-for-the-advancement-of-public-health?utm_source=chatgpt.com",
  ethics2:"https://www.fda.gov/media/182567/download?utm_source=chatgpt.com",
  ethics3:"https://www.theguardian.com/commentisfree/2025/apr/23/america-pro-natalism-women?utm_source=chatgpt.com",
  culture1:"https://www.npr.org/2023/01/22/1150259944/florida-rejects-ap-class-african-american-studies?utm_source=chatgpt.com",
  culture2:"https://apnews.com/article/race-and-ethnicity-racial-injustice-business-education-government-and-politics-905c354a805cec1785160cf21f04c7ec?utm_source=chatgpt.com",
  culture3:"https://pen.org/book-bans/pen-america-index-of-school-book-bans-2023-2024/?utm_source=chatgpt.com",
  home1:"https://www.census.gov/library/stories/2021/03/homeschooling-on-the-rise-during-covid-19-pandemic.html?utm_source=chatgpt.com",
  home2:"https://techcrunch.com/2022/06/13/prenda-raises-20m-led-by-776-to-build-tech-to-run-k-8-microschools/?utm_source=chatgpt.com",
  home3:"https://www.washingtonpost.com/education/interactive/2023/homeschooling-growth-data-by-district/?utm_source=chatgpt.com",
  censor1:"https://www.npr.org/2023/06/22/1183701813/facing-book-bans-and-restrictions-on-lessons-teachers-are-scared-and-self-censor?utm_source=chatgpt.com",
  censor2:"https://pen.org/report/americas-censored-classrooms-2024/?utm_source=chatgpt.com",
  censor3:"https://apnews.com/article/coronavirus-pandemic-science-business-health-education-40ac2a2ec38c893b7c7a8dd196ce8b29?utm_source=chatgpt.com",
  values1:"https://apnews.com/article/education-arizona-doug-ducey-school-vouchers-7c5d7eb0498e5e7234d7eeb726027506?utm_source=chatgpt.com",
  values2:"https://apnews.com/article/business-education-michigan-tennessee-charter-schools-d9154ad70858a080c0d567fa71a9de3b?utm_source=chatgpt.com",
  values3:"https://apnews.com/article/a34be626074ef4d4ded987f841ff9aa8?utm_source=chatgpt.com",
  red1:"https://www.washingtonpost.com/opinions/2023/07/10/christine-emba-masculinity-new-model/?utm_source=chatgpt.com",
  red2:"https://apnews.com/article/f6a0c3a8f97f8d6cf616f201f68c04fe?utm_source=chatgpt.com",
  red3:"https://apnews.com/article/b6c9017f603c00466b9e9908c5f2183a?utm_source=chatgpt.com",
  pay1:"https://www.forbes.com/sites/ryancraig/2024/07/26/how-to-make-college-admissions-a-little-less-unequal/?utm_source=chatgpt.com",
  pay2:"https://www.forbes.com/sites/frederickhess/2023/12/19/why-are-elite-colleges-enabling-this-dubious-racket/?utm_source=chatgpt.com",
  pay3:"https://www.businessinsider.com/parents-pay-millions-college-counselor-harvard-ivy-league-acceptance-letter-2023-9?utm_source=chatgpt.com",
  cred1:"https://www.insidehighered.com/news/admissions/traditional-age/2023/10/23/assessing-college-readiness-pandemic-generation?utm_source=chatgpt.com",
  cred2:"https://www.insidehighered.com/news/quick-takes/2023/12/06/nearly-80-percent-grades-yale-were-last-year?utm_source=chatgpt.com",
  cred3:"https://www.forbes.com/sites/brennanbarnard/2023/11/21/will-ai-be-reviewing-your-college-application/?utm_source=chatgpt.com",
  test1:"https://newsroom.collegeboard.org/digital-sat-launches-across-country-completing-transition-digital-and-providing-simpler-testing?utm_source=chatgpt.com",
  test2:"https://www.marketwatch.com/press-release/test-preparation-market-to-grow-by-usd-16-28-billion-from-2024-2028-driven-by-online-test-prep-emphasis-with-ai-driving-market-transformation-technavio-bc92fbc8?utm_source=chatgpt.com",
  test3:"https://www.freethink.com/consumer-tech/khanmigo-ai-tutor?utm_source=chatgpt.com",
  demo1:"https://www.npr.org/2025/01/08/nx-s1-5246200/demographic-cliff-fewer-college-students-mean-fewer-graduates?utm_source=chatgpt.com",
  demo2:"https://apnews.com/article/d4851555bd0fb360a92dee84a2d93140?utm_source=chatgpt.com",
  demo3:"https://www.insidehighered.com/news/business/financial-health/2023/12/21/look-back-college-closures-and-mergers-2023?utm_source=chatgpt.com",
  tuition1:"https://www.insidehighered.com/news/business/revenue-strategies/2023/09/15/amid-skepticism-colleges-value-tuition-resets-keep?utm_source=chatgpt.com",
  tuition2:"https://www.forbes.com/sites/michaeltnietzel/2023/11/06/small-colleges-turning-to-these-tuition-deals-to-boost-enrollment/?utm_source=chatgpt.com",
  tuition3:"https://www.forbes.com/sites/michaeltnietzel/2024/12/20/as-competition-heats-up-more-colleges-freeze-tuition-or-make-it-free/?utm_source=chatgpt.com",
  corp1:"https://www.aboutamazon.com/news/workplace/career-choice-free-education-for-amazon-employees?utm_source=chatgpt.com",
  corp2:"https://fortune.com/education/articles/a-tipping-point-for-higher-ed-google-launches-new-low-cost-online-programs-for-high-demand-jobs/?utm_source=chatgpt.com",
  corp3:"https://www.linkedin.com/posts/palantir-technologies_skip-the-debt-skip-the-indoctrination-get-activity-7316432877577986049-gNjy/",
  altfin1:"https://www.insidehighered.com/news/students/financial-aid/2024/02/06/critics-colleges-disagree-equity-differential-tuition?utm_source=chatgpt.com",
  altfin2:"https://www.latimes.com/opinion/story/2024-04-30/college-tuition-costs-major-student-loans?utm_source=chatgpt.com",
  altfin3:"https://www.insidehighered.com/news/2022/06/23/purdue-pauses-new-income-share-agreement-enrollments?utm_source=chatgpt.com",
  imm1:"https://www.theverge.com/2023/6/5/23738968/apple-vision-pro-ar-headset-features-specs-price-release-date-wwdc-2023?utm_source=chatgpt.com",
  imm2:"https://www.theverge.com/2023/9/27/23890731/meta-quest-3-headset-hands-on-mixed-reality-connect?utm_source=chatgpt.com",
  imm3:"https://www.theverge.com/2021/12/9/22825139/meta-horizon-worlds-access-open-metaverse?utm_source=chatgpt.com",
  exp1:"https://www.theverge.com/22949905/star-wars-galactic-starcruiser-hotel-interactive-disney-world-photos-price?utm_source=chatgpt.com",
  exp2:"https://www.theguardian.com/artanddesign/2023/jan/28/immersive-art-exhibitions-popular-david-hockney-van-gogh-dali-london?utm_source=chatgpt.com",
  exp3:"https://www.theguardian.com/us-news/2024/nov/19/luna-luna-art-carnival-new-york-basquiat-keith-haring?utm_source=chatgpt.com",
  wear1:"https://www.roadtovr.com/ubisoft-owo-vr-haptic-vest-assassins-creed/?utm_source=chatgpt.com",
  wear2:"https://www.theverge.com/24126502/humane-ai-pin-review?utm_source=chatgpt.com",
  wear3:"https://www.theverge.com/2024/1/29/24055167/elon-musk-has-news-on-neuralinks-first-human-implant-and-a-new-product-name-telepathy?utm_source=chatgpt.com",
  fan1:"https://news.airbnb.com/barbies-malibu-dreamhouse-is-back-on-airbnb-but-this-time-kens-hosting/?utm_source=chatgpt.com",
  fan2:"https://www.theverge.com/2022/12/7/23498538/official-hobbit-hole-airbnb-lotr-booking-announcement-price?utm_source=chatgpt.com",
  fan3:"https://www.washingtonpost.com/travel/2023/05/25/galactic-starcruiser-disney-hotel-close/?utm_source=chatgpt.com",
  gen1:"https://techcrunch.com/2023/06/29/runway-a-startup-building-generative-ai-for-content-creators-raises-141m/?utm_source=chatgpt.com",
  gen2:"https://www.adobe.com/products/firefly.html?utm_source=chatgpt.com",
  gen3:"https://www.reuters.com/technology/getty-backed-ai-image-generator-bria-snags-fresh-funding-2024-02-21/?utm_source=chatgpt.com",
  cont1:"https://www.reuters.com/legal/getty-images-lawsuit-says-stability-ai-misused-photos-train-ai-2023-02-06/?utm_source=chatgpt.com",
  cont2:"https://www.reuters.com/technology/getty-asks-london-court-stop-uk-sales-stability-ai-system-2023-06-01/?utm_source=chatgpt.com",
  cont3:"https://www.reuters.com/business/universal-music-sales-edge-higher-helped-by-recorded-music-earnings-2023-04-26/?utm_source=chatgpt.com",
  auto1:"https://www.theguardian.com/technology/2023/jul/20/ai-tool-creates-south-park-episodes-with-user-in-starring-role?utm_source=chatgpt.com",
  auto2:"https://www.theverge.com/policy/2023/6/22/23770319/secret-invasion-ai-credits-method-studios-statement?utm_source=chatgpt.com",
  auto3:"https://arstechnica.com/information-technology/2023/02/netflix-taps-ai-image-synthesis-for-background-art-in-the-dog-and-the-boy/?utm_source=chatgpt.com",
  unc1:"https://apnews.com/article/hollywood-ai-strike-wga-artificial-intelligence-39ab72582c3a15f77510c9c30a45ffc8?utm_source=chatgpt.com",
  unc2:"https://www.reuters.com/business/universal-music-sales-edge-higher-helped-by-recorded-music-earnings-2023-04-26/?utm_source=chatgpt.com",
  unc3:"https://www.ft.com/content/a171bd7c-7f70-4145-acd5-beeb0b8da732?utm_source=chatgpt.com",
  auth1:"https://www.washingtonpost.com/podcasts/post-reports/how-taylor-swift-became-her-own-economy/?utm_source=chatgpt.com",
  auth2:"https://apnews.com/article/beyonce-concert-movie-3ea24a8de2716e08eeaf60999e8c9cd4?utm_source=chatgpt.com",
  auth3:"https://apnews.com/article/933312ca505200e8b73808592f89ca68?utm_source=chatgpt.com",
  div1:"https://www.theguardian.com/music/2023/aug/21/rich-men-north-of-richmond-us-chart-history?utm_source=chatgpt.com",
  div2:"https://apnews.com/article/technology-entertainment-music-elton-john-cd536b3a09f22565bbeb26fe0d75d03a?utm_source=chatgpt.com",
  div3:"https://www.theguardian.com/music/2021/jan/29/tiktokers-sea-shanty-wellerman-reaches-top-3-in-uk-charts-nathan-evans?utm_source=chatgpt.com",
  ind1:"https://www.bloomberg.com/news/features/2024-02-22/a24-movies-become-private-equity-bet-with-225-million-infusion?utm_source=chatgpt.com",
  ind2:"https://apnews.com/article/7c89e23503d6de54309322c694eca36a?utm_source=chatgpt.com",
  ind3:"https://pitchfork.com/news/epic-games-sells-bandcamp-amid-layoffs/?utm_source=chatgpt.com",
  d21:"https://www.musicbusinessworldwide.com/insidr-music-launching-direct-to-fan-music-streaming-app-offering-unsigned-artists-4000-more-pay-than-spotify/?utm_source=chatgpt.com",
  d22:"https://techcrunch.com/2023/04/03/daily-crunch-patreon-rival-fanfic-projects-paying-creators-50-million-by-end-of-2023/?utm_source=chatgpt.com",
  d23:"https://www.musicbusinessworldwide.com/spotify-launches-new-paid-for-showcase-recommendation-tool-starting-at-100-per-promo-campaign/?utm_source=chatgpt.com",

};

// Renderer component for each window
function MotionWindow({
  cfg,
  bringToFront,
  highlighted = false,
}: {
  cfg: WindowConfig;
  bringToFront: (id: string) => void;
  highlighted?: boolean;
}) {
  return (
    <motion.div
      key={cfg.key}
      onPointerDown={() => {
        // Don’t bring “king4” to front
        if (cfg.key !== "king4") bringToFront(cfg.key);
      }}
      style={{ }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <DraggableWindow
        id={cfg.key}
        initialPos={cfg.pos}
        initialZIndex={cfg.key === "king4" ? 0 : undefined}
        width={cfg.size.width}
        height={cfg.size.height}
        className={`${
          cfg.type === "text"
            ? "bg-white shadow-sm"
            : "bg-transparent shadow-none border-none"
        } ${highlighted ? "ring-4 ring-blue-400" : ""}`}
      >
{(() => {
        const inner = cfg.type === "image" && cfg.src ? (
          <Image
            src={cfg.src}
            alt={cfg.key}
            width={cfg.size.width as number}
            height={cfg.size.height as number}
            className="object-contain pointer-events-none select-none"
          />
        ) : (
          <div className="p-2">
            <p className="text-xl font-bold text-black whitespace-pre-line">
              {cfg.text}
            </p>
          </div>
        );

        const href = linkMap[cfg.key];
        return href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            {inner}
          </a>
        ) : (
          inner
        );
      })()}
      </DraggableWindow>
    </motion.div>
  );
}

export default function Home() {
  const [showHelp, setShowHelp] = useState(true);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [happenedMode, setHappenedMode] = useState(false);
  const [hoveredHappened, setHoveredHappened] = useState<number | null>(null);
  const [helpAnswer, setHelpAnswer] = useState("");
  // Z-index for help window
  const [zCounter, setZCounter] = useState(1);
  const [helpZIndex, setHelpZIndex] = useState(zCounter + 1);
  // State for the current happened scenario
  const [happenedScenario, setHappenedScenario] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<"health" | "education" | "entertainment" | null>(null);

  useEffect(() => {
    // Prefetch JS modules
    import('../../data/healthContent');
    import('../../data/educationContent');
    import('../../data/entertainmentContent');

    // Flatten keys for each category
    const allHealthWindowKeys = Object.values(optionWindows).flat();
    const allEducationOptionKeys = Object.values(educationOptionWindows).flat();
    const allEntertainmentOptionKeys = Object.values(entertainmentOptionWindows).flat();

    const nonHappenedKeys = {
      health: allHealthWindowKeys,
      education: allEducationOptionKeys,
      entertainment: allEntertainmentOptionKeys,
    } as const;

    // Preload images for each category
    (['health','education','entertainment'] as const).forEach(cat => {
      const keys = nonHappenedKeys[cat];
      windows
        .filter(w => w.type === 'image' && keys.includes(w.key))
        .forEach(w => {
          const img = new window.Image();
          img.src = w.src!;
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Determine if user has confirmed "yes"
  const page2Active = helpAnswer.trim().toLowerCase() === "yes";

  // Help intro typing effect
  const helpIntroText = `This resource has been developed by SIN Consulting Ltd. to help you adjust to everyday life in the year 2034.

In 2028, as part of Employee Upskilling Initiative (#1967), you underwent Brain-Computer Interface (BCI) integration surgery. Unfortunately, unforeseen complications arose during the procedure, requiring your placement into an Extended Aging Freeze™ pod.

Your employer has generously extended credit coverage for your pod usage and granted you access to this resource, enabling you to catch up with developments and societal changes since your surgery.

Important Disclaimer:
By proceeding to use this website, you agree to waive any rights to participate in the ongoing class-action lawsuit against Employer #451 regarding alleged negligence, withholding of critical information, or related claims associated with the Employee Upskilling Initiative.

Type yes to confirm and continue.`;
  const [helpDisplayedText, setHelpDisplayedText] = useState("");
  const [helpTypingIdx, setHelpTypingIdx] = useState(0);

  const page2IntroText = `Help Guide – Page 2

You can now explore the following content categories to familiarize yourself with key changes since 2028:

• Health
• Education
• Entertainment

To load a category, hover over the File menu, select Add, then choose your desired category.`;
  const [page2DisplayedText, setPage2DisplayedText] = useState("");
  const [page2TypingIdx, setPage2TypingIdx] = useState(0);

  const loadedHelp = showHelp && page2Active;

  // --- loadedIntroText/loadedDisplayedText removed, no longer needed for help flow ---

  useEffect(() => {
    if (showHelp && helpTypingIdx < helpIntroText.length) {
      const timeout = setTimeout(() => {
        setHelpDisplayedText(helpIntroText.slice(0, helpTypingIdx + 1));
        setHelpTypingIdx(helpTypingIdx + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [helpTypingIdx, showHelp, helpIntroText]);

  useEffect(() => {
    if (page2Active && page2TypingIdx < page2IntroText.length) {
      const timeout = setTimeout(() => {
        setPage2DisplayedText(page2IntroText.slice(0, page2TypingIdx + 1));
        setPage2TypingIdx(page2TypingIdx + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [page2TypingIdx, page2Active, page2IntroText]);

  // Easter egg: when the user types “nis” (any casing), open the Next Innovation Scholars page
  useEffect(() => {
    if (helpAnswer.trim().toLowerCase() === "nis") {
      window.open(
        "https://www.uc.edu/about/president/presidential-awards/next-innovation-scholars.html",
        "_blank"
      );
    }
  }, [helpAnswer]);

  // Handler to be called from MacMenuBar
  const handleAddHealth = () => {
    setShowHelp(false);
    setSelectedCategory("health");
    setSelectedOption(-1);
    setHappenedMode(false);
    setHoveredHappened(null);
  };
  const handleAddEducation = () => {
    setShowHelp(false);
    setSelectedCategory("education");
    setSelectedOption(-1);
    setHappenedMode(false);
    setHoveredHappened(null);
  };
  const handleAddEntertainment = () => {
    setShowHelp(false);
    setSelectedCategory("entertainment");
    setSelectedOption(-1);
    setHappenedMode(false);
    setHoveredHappened(null);
  };

  // Bring-to-front logic for windows (placeholder for real logic)
  const bringToFront = () => {
    const newZ = zCounter + 1;
    setZCounter(newZ);
    // (You would set the z-index for the window with id here)
  };

  useEffect(() => {
    if (showHelp) {
      setZCounter(prev => {
        const newZ = prev + 1;
        setHelpZIndex(newZ);
        return newZ;
      });
    }
  }, [showHelp]);

  // Option highlight mapping and selected
  const optionHighlights: Record<number, string[]> = {
    0: ['text1','text3','text5','text4'],
    1: ['text6','text7','text8','text9', 'text10'],
    2: ['text11','humanoid-text','techlimbs-text','body-computer-text','aging-text'],
  };
  // Highlights for Education scenario text draggables
  const educationOptionHighlights: Record<number, string[]> = {
    0: ["ide1-text", "ide2-text", "ide3-text", "ide4-text"],
    1: ["arms1-text", "arms2-text", "arms3-text", "arms4-text"],
    2: ["cliff1-text", "cliff2-text", "cliff3-text", "cliff4-text"],
  };
  // Highlights for Entertainment scenario text draggables
  const entertainmentOptionHighlights: Record<number, string[]> = {
    0: ["fifth1-text", "fifth2-text", "fifth3-text", "fifth4-text"],
    1: ["ai1-text", "ai2-text", "ai3-text", "ai4-text"],
    2: ["king1-text", "king2-text", "king3-text", "king4-text"],
  };
  const highlightedKeys = selectedCategory === "education"
    ? (educationOptionHighlights[selectedOption] || [])
    : selectedCategory === "entertainment"
    ? (entertainmentOptionHighlights[selectedOption] || [])
    : (optionHighlights[selectedOption] || []);

  // Map option index to window keys to show
  const optionWindows: Record<number, string[]> = {
    0: ['techanswers', 'sensors', 'surgery', 'text1', 'text3', 'text4', 'text5', 'info'],
    1: ['text6','text7','text8','text9', 'text10','pip','grocery','law','overreach','money'],
    2: ['text11','humanoid-text','techlimbs-text','body-computer-text','aging-text','celebrity','humanoid-img','techlimbs-img','body-computer-img','aging-img'],
  };

  // for Education category
  const educationOptionWindows: Record<number, string[]> = {
    0: ["ide1", "ide1-text", "ide2", "ide2-text", "ide3", "ide3-text", "ide4", "ide4-text"],
    1: [
      "arms1", "arms1-text",
      "arms2", "arms2-text",
      "arms3", "arms3-text",
      "arms4", "arms4-text"
    ],
    2: [
      "cliff1",   "cliff1-text",
      "cliff2",   "cliff2-text",
      "cliff3",   "cliff3-text",
      "cliff4",   "cliff4-text"
    ],
  };
  // for Entertainment category
  const entertainmentOptionWindows: Record<number, string[]> = {
    0: ["fifth1", "fifth1-text", "fifth2", "fifth2-text", "fifth3", "fifth3-text", "fifth4", "fifth4-text"],
    1: ["ai1", "ai1-text", "ai2", "ai2-text", "ai3", "ai3-text", "ai4", "ai4-text"],
    2: ["king1", "king1-text", "king2", "king2-text", "king3", "king3-text", "king4", "king4-text"],
  };

  // Flattened lists of window keys for each primary category
  const allHealthWindowKeys = Object.values(optionWindows).flat();
  const allEducationOptionKeys = Object.values(educationOptionWindows).flat();
  const allEntertainmentOptionKeys = Object.values(entertainmentOptionWindows).flat();



  // Draggables per happened-scenario and per option index
  const scenarioDraggables: Record<number, Record<number, string[]>> = {
    // Scenario 0: Dr. Me
    0: {
      0: ["wearable1","wearable2","wearable3"],
      1: ["healthassist1","healthassist2","healthassist3"],
      2: ["marketplace1","marketplace2","marketplace3"],
      3: ["hollistic1","hollistic2","hollistic3"],
      4: [],  // “Return to Health Start” shows no draggables
    },
    // Scenario 1: Profit Over Patient
    1: {
      0: ["diy1","diy2","diy3"],
      1: ["debt1","debt2","debt3"],
      2: ["crypto1","crypto2","crypto3"],
      3: ["price1","price2","price3"],
      4: [],  // Return option
    },
    // Scenario 2: Enhancement (Whole New World)
    2: {
      0: ["aging1","aging2","aging3"],
      1: ["enhance1","enhance2","enhance3"],
      2: ["gene1","gene2","gene3"],
      3: ["ethics1","ethics2","ethics3"],
      4: [],             // Return to start
    },
  };

  // Draggables per education scenario and per happened-option index
  const educationScenarioDraggables: Record<number, Record<number, string[]>> = {
    0: {
      0: ["culture1", "culture2", "culture3", "culture4"],
      1: ["home1", "home2", "home3", "home4"],
      2: ["censor1", "censor2", "censor3", "censor4"],
      3: ["values1", "values2", "values3", "values4"],
      4: [],  // Return to Education Start
    },
    1: {
      0: ["red1", "red2", "red3", "red4"],
      1: ["pay1", "pay2", "pay3", "pay4"],
      2: ["cred1", "cred2", "cred3", "cred4"],
      3: ["test1", "test2", "test3", "test4"],
      4: [],  // Return to Education Start
    },
    2: {
      0: ["demo1", "demo2", "demo3", "demo4"],
      1: ["tuition1", "tuition2", "tuition3", "tuition4"],
      2: ["corp1", "corp2", "corp3", "corp4"],
      3: ["altfin1", "altfin2", "altfin3", "altfin4"],
      4: [],  // Return to Education Start
    },
  };

  // Draggables per entertainment scenario and per happened-option index
  const entertainmentScenarioDraggables: Record<number, Record<number, string[]>> = {
    0: { // Fifth Wall
      0: ["imm1","imm2","imm3","imm4"],
      1: ["exp1","exp2","exp3","exp4"],
      2: ["wear1","wear2","wear3","wear4"],
      3: ["fan1","fan2","fan3","fan4"],
      4: [], // Return to Entertainment Start
    },
    1: { // AI Credits Roll
      0: ["gen1","gen2","gen3","gen4"],
      1: ["cont1","cont2","cont3","cont4"],
      2: ["auto1","auto2","auto3","auto4"],
      3: ["unc1","unc2","unc3","unc4"],
      4: [],
    },
    2: { // Artists Are King
      0: ["auth1","auth2","auth3","auth4"],
      1: ["div1","div2","div3","div4"],
      2: ["ind1","ind2","ind3","ind4"],
      3: ["d21","d22","d23","d24"],
      4: [],
    },
  };

  // Flatten all scenario draggables into one list for filtering
  const allScenarioKeys = Object.values(scenarioDraggables)
    .flatMap(optMap => Object.values(optMap))
    .flat();

  // You should have happenedScenario and hoveredHappened in scope

  // Compute which draggables to show
  const activeWindows: WindowConfig[] = happenedMode
    ? (() => {
        if (selectedCategory === "education") {
          return hoveredHappened !== null
            ? windows.filter(w =>
                educationScenarioDraggables[happenedScenario][hoveredHappened!]?.includes(w.key)
              )
            : [];
        } else if (selectedCategory === "entertainment") {
          return hoveredHappened !== null
            ? windows.filter(w =>
                entertainmentScenarioDraggables[happenedScenario][hoveredHappened!]?.includes(w.key)
              )
            : [];
        } else {
          // health
          return hoveredHappened !== null
            ? windows.filter(w =>
                scenarioDraggables[happenedScenario][hoveredHappened!]?.includes(w.key)
              )
            : [];
        }
      })()
    : (() => {
        if (selectedCategory === "education") {
          // Before any option is selected, show all education draggables
          if (selectedOption < 0) {
            return windows.filter(w =>
              allEducationOptionKeys.includes(w.key)
            );
          }
          // Once an option is selected, show only that option's draggables
          return educationOptionWindows[selectedOption]
            ? windows.filter(w =>
                educationOptionWindows[selectedOption].includes(w.key)
              )
            : [];
        } else if (selectedCategory === "health") {
          // Health category
          if (selectedOption >= 0 && selectedOption in optionWindows) {
            return windows.filter(w =>
              optionWindows[selectedOption].includes(w.key)
            );
          }
          // before option selected, show all Health draggables
          return windows.filter(w =>
            allHealthWindowKeys.includes(w.key)
          );
        } else if (selectedCategory === "entertainment") {
          // Entertainment: show draggables for entertainment category
          // Before any option selected, show all Entertainment draggables
          if (selectedOption < 0) {
            return windows.filter(w =>
              allEntertainmentOptionKeys.includes(w.key)
            );
          }
          // Once an option is selected, show only that option's draggables
          return entertainmentOptionWindows[selectedOption]
            ? windows.filter(w =>
                entertainmentOptionWindows[selectedOption].includes(w.key)
              )
            : [];
        } else {
          // other categories (fallback)
          return windows.filter(w =>
            !allScenarioKeys.includes(w.key) &&
            !allEducationOptionKeys.includes(w.key) &&
            !allHealthWindowKeys.includes(w.key) &&
            !allEntertainmentOptionKeys.includes(w.key)
          );
        }
      })();

  return (
    <>
      <MacMenuBar
        onAddHealth={handleAddHealth}
        onAddEducation={handleAddEducation}
        onAddEntertainment={handleAddEntertainment}
        disableFile={!page2Active}
      />
      <AnimatePresence mode="wait" initial={false}>
        {loadedHelp ? (
          <motion.div
            key="helpLoaded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DraggableWindow
              id="help"
              initialPos={{ x: 760, y: 354.5 }}
              width={600}
              height={400}
              className="bg-white text-black shadow-md"
              initialZIndex={helpZIndex}
            >
              {/* Header bar */}
              <div className="flex items-center px-3 py-2 bg-white border-b border-gray-300 rounded-t-lg">
                <div className="flex space-x-1">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <h1 className="ml-3 text-lg font-semibold">Help Guide – Page 2</h1>
                <span className="ml-auto text-sm text-gray-500">April 28, 2025 at 9:07 PM</span>
              </div>
              <div className="px-4 py-3 mb-4 font-mono text-sm text-gray-800 bg-blue-50 border-l-4 border-blue-400 rounded-md italic shadow-sm">
                Calibrate: Press <kbd>⌘</kbd>/<kbd>Ctrl</kbd> <kbd>+</kbd>/<kbd>-</kbd> to zoom in and out until this window is centered on your screen.
              </div>
              <div className="px-4 py-3 font-mono whitespace-pre-wrap">
                {page2DisplayedText}
              </div>
            </DraggableWindow>
          </motion.div>
        ) : showHelp ? (
          <motion.div
            key={helpAnswer.trim().toLowerCase() === "yes" ? "help2" : "help1"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DraggableWindow
              id="help"
              initialPos={
                helpAnswer.trim().toLowerCase() === "yes"
                  ? { x: 760, y: 354.5 }
                  : { x: 694, y: 299 }
              }
              width={helpAnswer.trim().toLowerCase() === "yes" ? 600 : 800}
              height={helpAnswer.trim().toLowerCase() === "yes" ? 400 : 600}
              className="bg-white text-black shadow-md"
              initialZIndex={helpZIndex}
            >
              {/* Header bar */}
              <div className="flex items-center px-3 py-2 bg-white border-b border-gray-300 rounded-t-lg">
                {/* Traffic lights */}
                <div className="flex space-x-1">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                {/* Title */}
                <h1 className="ml-3 text-lg font-semibold">Welcome User</h1>
                {/* Timestamp */}
                <span className="ml-auto text-sm text-gray-500">April 2, 2034 at 8:24 PM</span>
              </div>
              {helpAnswer.trim().toLowerCase() === "yes" ? (
                <div className="px-4 py-3 font-mono whitespace-pre-wrap">
                  {page2DisplayedText}
                </div>
              ) : (
                <div className="px-4 py-3 font-mono whitespace-pre-wrap">
                  {helpDisplayedText}
                </div>
              )}
              {/* input prompt for page1 only */}
              {!(helpAnswer.trim().toLowerCase() === "yes") && helpTypingIdx >= helpIntroText.length && (
                <div className="mt-4 px-4 pb-3">
                  <div className="flex items-center font-mono">
                    <span className="mr-2">{">"}</span>
                    <input
                      type="text"
                      placeholder="Type your response..."
                      value={helpAnswer}
                      onChange={(e) => setHelpAnswer(e.target.value)}
                      maxLength={3}
                      className="flex-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-500"
                    />
                  </div>
                </div>
              )}
            </DraggableWindow>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {selectedCategory && (
          <motion.div
            key={`text-editor-${selectedCategory}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <TextEditWindow
              content={
                selectedCategory === "health"
                  ? healthContent
                  : selectedCategory === "education"
                  ? educationContent
                  : entertainmentContent
              }
              initialPos={{ x: 694, y: 299 }}
              initialZIndex={1}
              onOptionSelect={setSelectedOption}
              onHappenedModeChange={setHappenedMode}
              onHappenedHover={setHoveredHappened}
              onHappenedScenarioChange={setHappenedScenario}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCategory && activeWindows.map(cfg => (
          <MotionWindow
            key={cfg.key}
            cfg={cfg}
            bringToFront={bringToFront}
            highlighted={highlightedKeys.includes(cfg.key)}
          />
        ))}
      </AnimatePresence>
    </>
  );
}