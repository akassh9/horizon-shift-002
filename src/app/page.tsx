"use client";

import { useState, useEffect } from "react";
import { TextEditWindow } from '../../components/TextEditWindow';
import { DraggableWindow } from '../../components/DraggableWindow';
import { MacMenuBar } from '../../components/MacMenuBar';
import Image from 'next/image';
import { AnimatePresence, motion } from "framer-motion";

// Window configuration type and data
type WindowConfig = {
  key: string;
  pos: { x: number; y: number };
  size: { width: number | 'auto'; height: number | 'auto' };
  type: 'image' | 'text';
  src?: string;
  text?: string;
};

const windows: WindowConfig[] = [
  {
    key: "techanswers",
    pos: { x: 208, y: 115 },
    size: { width: 210, height: 210 },
    type: "image",
    src: "/images/349d3768e94b0294ee92fa6f023663b1.jpg",
  },
  {
    key: "text1",
    pos: { x: 34, y: 113 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Tech has the answers.",
  },
  {
    key: "text3",
    pos: { x: 343, y: 989 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Always on health sensors? Check",
  },
  {
    key: "sensors",
    pos: { x: 569, y: 807 },
    size: { width: 210, height: 189 },
    type: "image",
    src: "/images/457dd426d8744a49ad94e94c6ad97ce7-removebg-preview.png",
  },
  {
    key: "surgery",
    pos: { x: 1824, y: 125 },
    size: { width: 210, height: 303.8 },
    type: "image",
    src: "/images/15a726f1626b6eaa60dc3c0cd394bd7e.jpg",
  },
  {
    key: "text4",
    pos: { x: 1588, y: 357 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Healthcare Democratization!",
  },
  {
    key: "text5",
    pos: { x: 1264, y: 947 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "More information at any cost..",
  },
  {
    key: "info",
    pos: { x: 1196, y: 809 },
    size: { width: 300, height: 167.81 },
    type: "image",
    src: "/images/0259e5fa8d5ba28ef2dc1a6d8f7c3cd5-removebg-preview.png",
  },
  {
    key: "law",
    pos: { x: 630, y: 37 },
    size: { width: 210, height: 198.1 },
    type: "image",
    src: "/images/e2787e6d73d40030b622b2d7a036b567-removebg-preview.png",
  },
  {
    key: "text6",
    pos: { x: 734, y: 210 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Fear over Practice?",
  },
  {
    key: "text7",
    pos: { x: 37, y: 679 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "healthy = expensive",
  },
  {
    key: "grocery",
    pos: { x: 170, y: 674 },
    size: { width: 210, height: 218.4 },
    type: "image",
    src: "/images/114b0765eb68a0e30d72027149775d6b-removebg-preview.png",
  },
  {
    key: "text8",
    pos: { x: 1060, y: 234 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "health tycoons.",
  },
  {
    key: "pip",
    pos: { x: 1032, y: 60 },
    size: { width: 210, height: 157 },
    type: "image",
    src: "/images/1c96de63f7fc7c4e453bba68ad82d50b.png",
  },
  {
    key: "text9",
    pos: { x: 1517, y: 550 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "cures only for the payers.",
  },
  {
    key: "money",
    pos: { x: 1575, y: 454 },
    size: { width: 210, height: 100.8 },
    type: "image",
    src: "/images/upload-0a849059-a350-456a-afae-bf23b038d673.webp",
  },
  {
    key: "text10",
    pos: { x: 540, y: 541 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "no limits",
  },
  {
    key: "overreach",
    pos: { x: 320, y: 399 },
    size: { width: 250, height: 250 },
    type: "image",
    src: "/images/Generated_Image_March_14__2025_-_8_05PM.png-removebg-preview.png",
  },
  {
    key: "celebrity",
    pos: { x: 816, y: 901 },
    size: { width: 250, height: 250 },
    type: "image",
    src: "/images/ChatGPT Image Apr 26, 2025, 06_10_44 AM.png",
  },
  {
    key: "text11",
    pos: { x: 971, y: 851 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Celebrity Health Hobbies",
  },
  {
    key: "humanoid-img",
    pos: { x: 1560, y: 773 },
    size: { width: 210, height: 275 },
    type: "image",
    src: "/images/c249dc08f1a868ef694b502b886d8bc4.png",
  },
  {
    key: "humanoid-text",
    pos: { x: 1645, y: 1056 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "humanoid medicine",
  },
  {
    key: "techlimbs-img",
    pos: { x: 73, y: 351 },
    size: { width: 210, height: 210 },
    type: "image",
    src: "/images/98f31dc5616193240188a453b0fafcc8-removebg-preview.png",
  },
  {
    key: "techlimbs-text",
    pos: { x: 115, y: 525 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Tech Limbs",
  },
  {
    key: "body-computer-img",
    pos: { x: 1514, y: 54 },
    size: { width: 210, height: 281 },
    type: "image",
    src: "/images/f7a2ee3b976435fdd951779a16e1ea9a.jpg",
  },
  {
    key: "body-computer-text",
    pos: { x: 1330, y: 78 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Body Computers",
  },
  {
    key: "aging-img",
    pos: { x: 1816, y: 595 },
    size: { width: 210, height: 281 },
    type: "image",
    src: "/images/09bryanjohnson-cover-illo-superJumbo.webp",
  },
  {
    key: "aging-text",
    pos: { x: 1820, y: 877 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Anti Aging Race.",
  },
  // ✨  NEW  — example wearable images  ✨
  {
    key: "wearable1",          // unique key
    pos: { x: 120, y: 953 },        // where it spawns
    size: { width: 700, height: 115.94 },
    type: "image",
    src: "/images/wearable1.png",
  },
  {
    key: "wearable2",
    pos: { x: 256, y: 161 },
    size: { width: 700, height: 108.41 },
    type: "image",
    src: "/images/wearable2.png",
  },
  {
    key: "wearable3",
    pos: { x: 1285, y: 849 },
    size: { width: 600, height: 157.5 },
    type: "image",
    src: "/images/wearable3.png",
  },
  {
    key: "healthassist1",          // unique key
    pos: { x: 83, y: 683 },        // where it spawns
    size: { width: 500, height: 291.2 },
    type: "image",
    src: "/images/healthassist1.png",
  },
  {
    key: "healthassist2",
    pos: { x: 106, y: 150 },
    size: { width: 400, height: 295.65 },
    type: "image",
    src: "/images/healthassist2.png",
  },
  {
    key: "healthassist3",
    pos: { x: 1285, y: 849 },
    size: { width: 600, height: 157.5 },
    type: "image",
    src: "/images/healthassist3.png",
  },
  {
    key: "marketplace1",          // unique key
    pos: { x: 83, y: 683 },        // where it spawns
    size: { width: 550, height: 102.67 },
    type: "image",
    src: "/images/marketplace1.png",
  },
  {
    key: "marketplace2",
    pos: { x: 1053, y: 192 },
    size: { width: 700, height: 59.65 },
    type: "image",
    src: "/images/marketplace2.png",
  },
  {
    key: "marketplace3",
    pos: { x: 1285, y: 849 },
    size: { width: 600, height: 76 },
    type: "image",
    src: "/images/marketplace3.png",
  },
  {
    key: "hollistic1",          // unique key
    pos: { x: 1550, y: 801 },        // where it spawns
    size: { width: 550, height: 75.77 },
    type: "image",
    src: "/images/hollistic1.png",
  },
  {
    key: "hollistic2",
    pos: { x: 907, y: 915 },
    size: { width: 700, height: 203.57 },
    type: "image",
    src: "/images/hollistic2.png",
  },
  {
    key: "hollistic3",
    pos: { x: 23, y: 101 },
    size: { width: 600, height: 366 },
    type: "image",
    src: "/images/hollistic3.png",
  },
  {
    key:"diy1",
    pos: { x: 182, y: 939 },
    size: { width: 800, height: 70 },
    type: "image",
    src: "/images/diy1.png",
  },
  {
    key:"diy2",
    pos: { x: 392, y: 135 },
    size: { width: 550, height: 137 },
    type: "image",
    src: "/images/diy2.png",
  },
  {
    key:"diy3",
    pos: { x: 1180, y: 162 },
    size: { width: 900, height: 97 },
    type: "image",
    src: "/images/diy3.png",
  },
  {
    key:"debt1",
    pos: { x: 1452, y: 847 },
    size: { width: 700, height: 164 },
    type: "image",
    src: "/images/debt1.png",
  },
  {
    key:"debt2",
    pos: { x: 54, y: 879 },
    size: { width: 600, height: 104.04 },
    type: "image",
    src: "/images/debt2.png",
  },
  {
    key:"debt3",
    pos: { x: 1547, y: 288 },
    size: { width: 500, height: 140.74 },
    type: "image",
    src: "/images/debt3.png",
  },
  {
    key:"crypto1",
    pos: { x: 606, y: 93 },
    size: { width: 700, height: 155 },
    type: "image",
    src: "/images/crypto1.png",
  },
  {
    key:"crypto2",
    pos: { x: 306, y: 887 },
    size: { width: 700, height: 78.39 },
    type: "image",
    src: "/images/crypto2.png",
  },
  {
    key:"crypto3",
    pos: { x: 1368, y: 879 },
    size: { width: 700, height: 117 },
    type: "image",
    src: "/images/crypto3.png",
  },
  {
    key:"price1",
    pos: { x: 136, y: 377 },
    size: { width: 500, height: 148 },
    type: "image",
    src: "/images/price1.png",
  },
  {
    key:"price2",
    pos: { x: 528, y: 154 },
    size: { width: 650, height: 99 },
    type: "image",
    src: "/images/price2.png",
  },
  {
    key:"price3",
    pos: { x: 1272, y: 876 },
    size: { width: 650, height: 146 },
    type: "image",
    src: "/images/price3.png",
  },
  // Whole New World – HAPPENED scenario images (3 per theme)
  // Life-Extension & Longevity
  {
    key: "aging1",
    pos: { x: 178, y: 152 },
    size: { width: 450, height: 210 },
    type: "image",
    src: "/images/aging1.png",
  },
  {
    key: "aging2",
    pos: { x: 123, y: 613 },
    size: { width: 500, height: 117.13 },
    type: "image",
    src: "/images/aging2.png",
  },
  {
    key: "aging3",
    pos: { x: 1523, y: 138 },
    size: { width: 500, height: 131 },
    type: "image",
    src: "/images/aging3.png",
  },
  // Human Enhancement & Prosthetics
  {
    key: "enhance1",
    pos: { x: 81, y: 151 },
    size: { width: 500, height: 144 },
    type: "image",
    src: "/images/enhance1.png",
  },
  {
    key: "enhance2",
    pos: { x: 94, y: 527 },
    size: { width: 500, height: 548 },
    type: "image",
    src: "/images/enhance2.webp",
  },
  {
    key: "enhance3",
    pos: { x: 890, y: 871 },
    size: { width: 900, height: 131 },
    type: "image",
    src: "/images/enhance3.png",
  },
  // Genetic Editing & Designer Babies
  {
    key: "gene1",
    pos: { x: 546, y: 67 },
    size: { width: 500, height: 185 },
    type: "image",
    src: "/images/gene1.png",
  },
  {
    key: "gene2",
    pos: { x: 355, y: 870 },
    size: { width: 500, height: 70 },
    type: "image",
    src: "/images/gene2.png",
  },
  {
    key: "gene3",
    pos: { x: 1149, y: 858 },
    size: { width: 500, height: 137 },
    type: "image",
    src: "/images/gene3.png",
  },
  // Ethics, Regulation & Identity
  {
    key: "ethics1",
    pos: { x: 114, y: 169 },
    size: { width: 500, height: 151.39 },
    type: "image",
    src: "/images/ethics1.png",
  },
  {
    key: "ethics2",
    pos: { x: 91, y: 867 },
    size: { width: 900, height: 182 },
    type: "image",
    src: "/images/ethics2.png",
  },
  {
    key: "ethics3",
    pos: { x: 1575, y: 77 },
    size: { width: 500, height: 260 },
    type: "image",
    src: "/images/ethics3.png",
  },
];
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
      onPointerDown={() => bringToFront(cfg.key)}
      style={{ }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <DraggableWindow
        id={cfg.key}
        initialPos={cfg.pos}
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
  const [showWindows, setShowWindows] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [happenedMode, setHappenedMode] = useState(false);
  const [hoveredHappened, setHoveredHappened] = useState<number | null>(null);
  const [helpAnswer, setHelpAnswer] = useState("");
  const [centerPos, setCenterPos] = useState({ x: 694, y: 299 });
  // Z-index for help window
  const [zCounter, setZCounter] = useState(1);
  const [helpZIndex, setHelpZIndex] = useState(zCounter + 1);
  // State for the current happened scenario
  const [happenedScenario, setHappenedScenario] = useState<number>(0);
  useEffect(() => {
    function updateCenter() {
      const width = 600; // width of page2 window
      const height = 400; // height of page2 window
      setCenterPos({
        x: window.innerWidth / 2 - width / 2,
        y: window.innerHeight / 2 - height / 2,
      });
    }
    window.addEventListener("resize", updateCenter);
    updateCenter();
    return () => window.removeEventListener("resize", updateCenter);
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

  const loadedHelp = showHelp && showWindows;

  // Typing effect for loadedHelp content
  const loadedIntroText = `Data from wearables and an increase in holistic wellness options are promising for patient empowerment, but they exist amidst the tension of health systems being forced to optimize for efficiency, often at the cost of personalized care or attention to chronic conditions without a textbook diagnosis.`;
  const [loadedDisplayedText, setLoadedDisplayedText] = useState("");
  const [loadedTypingIdx, setLoadedTypingIdx] = useState(0);

  useEffect(() => {
    if (loadedHelp && loadedTypingIdx < loadedIntroText.length) {
      const timeout = setTimeout(() => {
        setLoadedDisplayedText(loadedIntroText.slice(0, loadedTypingIdx + 1));
        setLoadedTypingIdx(loadedTypingIdx + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [loadedTypingIdx, loadedHelp, loadedIntroText]);

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
    setShowWindows(true);
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
  const highlightedKeys = optionHighlights[selectedOption] || [];

  // Map option index to window keys to show
  const optionWindows: Record<number, string[]> = {
    0: ['techanswers', 'sensors', 'surgery', 'text1', 'text3', 'text4', 'text5', 'info'],
    1: ['text6','text7','text8','text9', 'text10','pip','grocery','law','overreach','money'],
    2: ['text11','humanoid-text','techlimbs-text','body-computer-text','aging-text','celebrity','humanoid-img','techlimbs-img','body-computer-img','aging-img'],
  };

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

  // Flatten all scenario draggables into one list for filtering
  const allScenarioKeys = Object.values(scenarioDraggables)
    .flatMap(optMap => Object.values(optMap))
    .flat();

  // You should have happenedScenario and hoveredHappened in scope

  // Compute which draggables to show
  const activeWindows: WindowConfig[] = happenedMode
    ? (
        hoveredHappened !== null
          ? windows.filter(w =>
              scenarioDraggables[happenedScenario][hoveredHappened!]?.includes(w.key)
            )
          : []
      )
    : (
        selectedOption >= 0 && selectedOption in optionWindows
          ? windows.filter(w => optionWindows[selectedOption].includes(w.key))
          : windows.filter(w => !allScenarioKeys.includes(w.key))
      );

  return (
    <>
      <MacMenuBar
        onAddHealth={handleAddHealth}
        onHelp={() => setShowHelp(h => !h)}
        disableFile={!page2Active}
        disableHelp={showHelp}
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
              initialPos={centerPos}
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
                <h1 className="ml-3 text-lg font-semibold">Health Help</h1>
                <span className="ml-auto text-sm text-gray-500">April 28, 2025 at 9:07 PM</span>
              </div>
              {/* Body */}
              <div className="px-4 py-3 font-mono whitespace-pre-wrap">
                {loadedDisplayedText}
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
              initialPos={helpAnswer.trim().toLowerCase() === "yes" ? centerPos : { x: 694, y: 299 }}
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
                <span className="ml-auto text-sm text-gray-500">April 28, 2025 at 8:24 PM</span>
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

      {showWindows && (
        <TextEditWindow
          initialPos={{ x: 694, y: 299 }}
          initialZIndex={1}
          onOptionSelect={setSelectedOption}
          onHappenedModeChange={setHappenedMode}
          onHappenedHover={setHoveredHappened}
          onHappenedScenarioChange={setHappenedScenario}
        />
      )}

      <AnimatePresence>
        {showWindows && activeWindows.map(cfg => (
          <MotionWindow
            key={cfg.key}
            cfg={cfg}
            bringToFront={bringToFront}
            highlighted={highlightedKeys.includes(cfg.key)}
          />
        ))}
      </AnimatePresence>

      <button onClick={() => setShowWindows(true)}>Show Windows (Debug)</button>
    </>
  );
}