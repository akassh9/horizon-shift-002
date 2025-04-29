"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { DraggableWindow } from "./DraggableWindow";

const introText = `[SYS-ARCHIVE v3.7]  •  NODE: PERSONAL_REINTEGRATION_PROTOCOL
CATEGORY LOADED: Health
Date Retrieved: 14 May 2040 | 09:17:33 EST
————————
You may choose one of the following three health scenarios to explore further. Each scenario focuses on key developments reshaping healthcare in 2034. 

↓  Use the arrow keys (↑ / ↓) to dive into a scenario  ↓`;

/* ——————————————————————————————————————————— */

const options = [
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
];

const detailText = `By 2034, personal health responsibility has profoundly reshaped healthcare. Driven by frustration with traditional medicine and empowered by advancements in wearable technology, individuals now manage their health independently, continuously monitoring vital signs and health metrics once available only during doctor visits. This era of unprecedented health data access empowers proactive health decisions but has introduced new anxieties stemming from constant vigilance and the potential misinterpretation of minor health fluctuations.

Meanwhile, holistic and alternative treatments—ranging from herbal medicine and acupuncture to psychedelic-assisted therapies—have become mainstream. Traditional insurance providers, pressured by public demand, have expanded their coverage models or face competition from specialized holistic-care insurers. Health education has also transformed radically, equipping new generations of patients and healthcare providers alike with the tools needed to navigate this increasingly complex landscape.

Finally, health data itself has emerged as a valuable personal asset, leading to a thriving economy where individuals actively sell or lease detailed biometric data to companies, researchers, and healthcare startups, fundamentally altering privacy norms and economic structures in healthcare.`;

const profitDetailText = `By 2034, the price tag on every medical decision is impossible to ignore. Sky-high costs and decades of deregulation have turned healthcare into a consumer marketplace where survival often depends on a family’s credit limit rather than a doctor’s skill. Faced with bankrupting hospital bills, many patients now design their own treatment plans at home: AI coaches guide bespoke physical-therapy regimens, countertop compounding kits mix personalized medications, and online forums swap raw pharmaceutical ingredients as casually as recipes.

Financial despair has also normalized once-taboo choices. Physician-assisted death—marketed as a “compassionate debt-relief option”—is now a line item in many hospital brochures, sparking fierce ethical debate. Meanwhile, “crypto-health” tokens let clinics and patients bypass insurers entirely; a single scan of a QR-tattoo can settle a surgery bill or unlock an upgrade to premium post-op care.

Comparison shopping platforms round out the landscape: with a few taps, users can sort heart-bypass packages by price, location, and recovery rating, much like booking flights or hotels in the early 2000s. Bargain hunters fly abroad for cut-rate procedures, while luxury hospitals advertise concierge gene therapies to the ultra-wealthy. In this marketplace, access to healing—and even the right to die—has become just another transaction.`;

const enhancementDetailText = `In 2034 the line between healing and upgrading has vanished. Gene-editing kiosks in suburban malls promise sharper memories or age-reversal enzyme packs; construction firms advertise “exo-muscle” implants that let workers hoist steel beams bare-handed. Lifespans have sprinted past a century, straining housing, pensions, and even food systems as governments scramble to accommodate populations that simply don’t retire—or die—on schedule.

The next generation may never know chance genetics at all. Prospective parents select embryo traits from glossy catalogs—disease immunity, height presets, perfect-pitch bundles—while bioethicists warn of a coming monoculture of designer children. Black-market labs push further, offering unauthorized CRISPR mods for IQ or extreme-sport endurance, leaving regulators in perpetual catch-up.

Legal definitions of “human” lag behind the tech. Courts debate whether enhanced firefighters with heat-shielded skin qualify for the same labor protections as unmodified peers. Insurance actuaries rewrite risk tables daily as augmented vision, sub-dermal armor, and neural-speech chips hit the market. Each breakthrough forces society to choose between access and equity, progress and identity—constantly redrawing the frontier of what bodies can, and should, become.`;

const happenedHeaderText = `[SYS-ARCHIVE v3.7]  •  NODE: PERSONAL_REINTEGRATION_PROTOCOL
└─ QUERY: “How did this happen?” ──  PROFILE: Dr.Me`;

const happenedIntroText = `We get it — waking up to smart-patch bandages and DNA-insured mortgages is… a lot.
Let’s rewind.

On your screen you’ll see headlines, blog posts, and policy memos from 2020-2025 — the sparks that lit today’s bonfire of change.  

Use the arrow keys (↑ / ↓) to navigate, click any headline to open the original source:`;

// ---- Profit Over Patient “How did this happen?” content ----
const profitHappenedHeaderText = `[SYS-ARCHIVE v3.7]  •  NODE: PERSONAL_REINTEGRATION_PROTOCOL  
└─ QUERY: “How did this happen?”  ──  PROFILE: Profit Over Patient`;

const profitHappenedIntroText = `We realize the biggest sticker-shock isn’t waking up—it’s the bill that greets you afterward.  
Let’s roll back the tape.

Headlines from 2020 – 2025 will now populate around your console: policy memos, market launches, bankruptcy stats—each a spark that turned healthcare into today’s marketplace.  

Use the arrow keys (↑ / ↓) to navigate, click any headline to open the original source:`;

export const TextEditWindow: React.FC<{
  initialPos?: { x: number; y: number };
  initialZIndex?: number;
  onOptionSelect?: (index: number) => void;
  onHappenedModeChange?: (mode: boolean) => void;
  onHappenedHover?: (index: number | null) => void;
  onHappenedScenarioChange?: (scenario: number) => void;
}> = ({
  initialPos = { x: 200, y: 100 },
  initialZIndex = 10,
  onOptionSelect,
  onHappenedModeChange,
  onHappenedHover,
  onHappenedScenarioChange,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [typingIdx, setTypingIdx] = useState(0);
  const [revealedOptions, setRevealedOptions] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState(0);

  const [detailMode, setDetailMode] = useState(false);
  const [detailDisplayedText, setDetailDisplayedText] = useState("");
  const [detailIdx, setDetailIdx] = useState(0);
  const [currentDetailText, setCurrentDetailText] = useState(detailText);

  const detailOptions = useMemo(() => ["go back", "how did this happen?"], []);
  const [selectedDetail, setSelectedDetail] = useState(0);
  const [selectedHappened, setSelectedHappened] = useState(0);
  const [happenedMode, setHappenedMode] = useState(false);
  const [happenedDisplayedText, setHappenedDisplayedText] = useState("");
  const [happenedIdx, setHappenedIdx] = useState(0);
  // Happened‑page config per scenario index (0 = Dr Me, 1 = Profit, 2 = Enhancement)
  const happenedConfig = [
    {
      header: happenedHeaderText,
      intro: happenedIntroText,
      options: [
        "Wearable & Continuous-Monitoring Tech",
        "AI Symptom-Checkers & Virtual Health Assistants",
        "Personal Health-Data Marketplace",
        "Holistic & Alternative Therapies Go Mainstream (and Get Covered)",
        "Return to Health Start",
      ],
    },
    {
      header: profitHappenedHeaderText,
      intro: profitHappenedIntroText,
      options: [
        "DIY & Open-Access Care",
        "Medical-Debt Crisis (Debt or Death?)",
        "Crypto-Health Payments",
        "Shop-Compare-Save Platforms",
        "Return to Health Start",
      ],
    },
    {
      // Whole New World scenario
      header: `[SYS-ARCHIVE v3.7]  •  NODE: PERSONAL_REINTEGRATION_PROTOCOL  
└─ QUERY: “How did this happen?”  ──  PROFILE: A ‘Whole’ New World`,
      intro: `The year is 2034 and the human body is no longer a biological limit—it’s a design space. If that sounds impossible, let’s rewind and watch the tipping points unfold.

In a moment you’ll see news flashes, research papers, and policy rulings from 2020-2025 floating around your console. These are the breadcrumbs that led from first-in-human CRISPR trials to exo-muscle implants at the hardware store.  

Use the arrow keys (↑ / ↓) to navigate, click any headline to open the original source:`,
      options: [
        "Life-Extension & Longevity",
        "Human Enhancement & Prosthetics",
        "Genetic Editing & Designer Babies",
        "Ethics, Regulation & Identity",
        "Return to Health Start",
      ],
    },
  ];

  const [happenedScenario, setHappenedScenario] = useState<number>(0);
  const currentHappened = happenedConfig[happenedScenario];

  // Typing animation for happenedIntroText (now currentHappened.intro) when in happened mode
  useEffect(() => {
    if (happenedMode && happenedIdx < currentHappened.intro.length) {
      const timeout = setTimeout(() => {
        setHappenedDisplayedText(currentHappened.intro.slice(0, happenedIdx + 1));
        setHappenedIdx(happenedIdx + 1);
      }, 18);
      return () => clearTimeout(timeout);
    }
  }, [happenedMode, happenedIdx, currentHappened.intro]);

  useEffect(() => {
    if (happenedMode && happenedIdx >= currentHappened.intro.length) {
      if (onHappenedModeChange) {
        onHappenedModeChange(true);
      }
    }
  }, [happenedMode, happenedIdx, onHappenedModeChange, currentHappened.intro.length]);
  useEffect(() => {
    if (happenedMode && happenedIdx >= currentHappened.intro.length) {
      onHappenedHover?.(selectedHappened);
    }
  }, [happenedMode, happenedIdx, selectedHappened, onHappenedHover, currentHappened.intro.length]);

  // Auto-scroll for happened text
  useEffect(() => {
    if (happenedMode) {
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [happenedDisplayedText, happenedMode]);

  const detailHeaderText = useMemo(() => {
    const fileName = options[selected].file;
    return `[SYS-ARCHIVE v3.7]  •  NODE: PERSONAL_REINTEGRATION_PROTOCOL
└─ QUERY: "${fileName}"
Date Retrieved: 14 May 2040 | 09:17:33 EST`;
  }, [selected]);

  // Notify parent of the newly selected option (after options are visible)
  useEffect(() => {
    if (
      onOptionSelect &&
      showOptions &&
      revealedOptions === options.length
    ) {
      onOptionSelect(selected);
    }
  }, [selected, showOptions, revealedOptions, onOptionSelect]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Terminal typing animation for intro text
  useEffect(() => {
    if (typingIdx < introText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(introText.slice(0, typingIdx + 1));
        setTypingIdx(typingIdx + 1);
      }, 18);
      return () => clearTimeout(timeout);
    } else {
      // Start revealing options after intro text is done
      setShowOptions(true);
    }
  }, [typingIdx]);

  // Animate options one by one
  useEffect(() => {
    if (showOptions && revealedOptions < options.length) {
      const timeout = setTimeout(() => {
        setRevealedOptions(revealedOptions + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [showOptions, revealedOptions]);

  // Keyboard navigation for options (only when all options are revealed)
  useEffect(() => {
    if (!showOptions || revealedOptions < options.length) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      // If in detail mode, intercept keys
      if (detailMode && detailIdx >= currentDetailText.length) {
        // DETAIL PAGE navigation (when happenedMode is false)
        if (!happenedMode) {
          if (e.key === "ArrowUp") {
            setSelectedDetail(prev => prev === 0 ? detailOptions.length - 1 : prev - 1);
          } else if (e.key === "ArrowDown") {
            setSelectedDetail(prev => prev === detailOptions.length - 1 ? 0 : prev + 1);
          } else if (e.key === "Enter") {
            if (selectedDetail === 0) {
              // go back
              setDetailMode(false);
              setHappenedMode(false);
              if (onHappenedModeChange) {
                onHappenedModeChange(false);
              }
              if (onHappenedHover) {
                onHappenedHover(null);
              }
            } else if (selectedDetail === 1) {
              // enter happened page
              setHappenedMode(true);
              onHappenedScenarioChange?.(selected);
              setHappenedScenario(selected);       // 0 = Dr Me, 1 = Profit, 2 = Enhancement
              setHappenedDisplayedText("");
              setHappenedIdx(0);
              setSelectedHappened(0);
            }
          }
          return;
        }
        // HAPPENED PAGE navigation
        if (happenedMode) {
          const len = currentHappened.options.length;
          if (e.key === "ArrowUp") {
            setSelectedHappened(prev =>
              prev === 0 ? len - 1 : prev - 1
            );
          } else if (e.key === "ArrowDown") {
            setSelectedHappened(prev =>
              prev === len - 1 ? 0 : prev + 1
            );
          } else if (e.key === "Enter") {
            // if "Return to Health Start" selected
            if (selectedHappened === len - 1) {
              setDetailMode(false);
              setHappenedMode(false);
              if (onHappenedModeChange) onHappenedModeChange(false);
              if (onHappenedHover) onHappenedHover(null);
              setSelected(0);
            }
          }
          return;
        }
      }

      // Navigation for initial options
      if (e.key === "ArrowUp") {
        setSelected((prev) => (prev === 0 ? options.length - 1 : prev - 1));
      } else if (e.key === "ArrowDown") {
        setSelected((prev) => (prev === options.length - 1 ? 0 : prev + 1));
      } else if (e.key === "Enter") {
        if (selected === 0) {
          setDetailMode(true);
          setCurrentDetailText(detailText);
          setDetailDisplayedText("");
          setDetailIdx(0);
        } else if (selected === 1) {
          setDetailMode(true);
          setCurrentDetailText(profitDetailText);
          setDetailDisplayedText("");
          setDetailIdx(0);
        } else if (selected === 2) {
          setDetailMode(true);
          setCurrentDetailText(enhancementDetailText);
          setDetailDisplayedText("");
          setDetailIdx(0);
        } else {
          if (onOptionSelect) onOptionSelect(selected);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    showOptions,
    revealedOptions,
    selected,
    onOptionSelect,
    detailMode,
    detailIdx,
    currentDetailText,
    selectedDetail,
    detailOptions,
    selectedHappened,
    happenedMode,
    onHappenedModeChange,
    onHappenedHover,
    onHappenedScenarioChange,
    currentHappened.options.length,
  ]);

  // Auto-scroll to bottom only while typing the intro text
  useEffect(() => {
    if (typingIdx < introText.length) {
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [displayedText, typingIdx]);

  // Auto-scroll selected option into view on keyboard navigation
  useEffect(() => {
    if (showOptions && revealedOptions === options.length) {
      const el = document.getElementById(`option-${selected}`);
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [selected, showOptions, revealedOptions]);

  // Typing animation for detailText when in detail mode
  useEffect(() => {
    if (detailMode && detailIdx < currentDetailText.length) {
      const timeout = setTimeout(() => {
        setDetailDisplayedText(currentDetailText.slice(0, detailIdx + 1));
        setDetailIdx(detailIdx + 1);
      }, 18);
      return () => clearTimeout(timeout);
    }
  }, [detailMode, detailIdx, currentDetailText]);

  // Auto-scroll container while detail text is streaming
  useEffect(() => {
    if (detailMode) {
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [detailDisplayedText, detailMode]);

  useEffect(() => {
    if (detailMode && detailIdx >= currentDetailText.length) {
      if (selectedDetail === 1) {
        // Scroll to selected happened option
        const el = document.getElementById(`happened-option-${selectedHappened}`);
        el?.scrollIntoView({ block: "nearest" });
      } else {
        const el = document.getElementById(`detail-option-${selectedDetail}`);
        el?.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedDetail, selectedHappened, detailMode, happenedMode, detailIdx, currentDetailText.length]);

  // Cleanup: clear happened hover on unmount
  useEffect(() => {
    return () => {
      if (onHappenedHover) {
        onHappenedHover(null);
      }
    };
  }, [onHappenedHover]);
  return (
    <DraggableWindow
      id="text-editor"
      initialPos={initialPos}
      width={800}
      height={520}
      initialZIndex={initialZIndex}
      className="mac-window bg-white text-black font-mono border border-gray-300 shadow-lg"
    >
      <div style={{ height: "100%" }}>
        <div className="mac-titlebar bg-gray-100 border-b border-gray-300 flex items-center px-3 py-1">
          <span className="mac-traffic traffic-red mr-2"></span>
          <span className="mac-traffic traffic-yellow mr-2"></span>
          <span className="mac-traffic traffic-green"></span>
          <span className="mac-title-text text-gray-700 ml-3 font-semibold">Text Editor</span>
        </div>
        <div
          ref={containerRef}
          className="relative w-full h-[calc(100%-1.75rem)] p-4 overflow-y-auto font-mono text-base"
        >
          {!detailMode && (
            <>
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: displayedText }}
              />
              {showOptions && (
                <div className="mt-4">
                  {options.map((opt, idx) => (
                    <div
                      id={`option-${idx}`}
                      key={opt.file}
                      className={`mb-3 cursor-pointer ${selected === idx ? "bg-blue-50" : ""}`}
                    >
                      <div
                        className={`flex items-center px-2 py-1 ${
                          selected === idx ? "text-blue-700" : "text-gray-900"
                        }`}
                      >
                        <span className="mr-2">{">"}</span>
                        <span className="font-mono font-bold">{opt.file}</span>
                      </div>
                      <div className="pl-6">
                        {opt.description && (
                          <div className="font-mono text-sm mt-1">{opt.description}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {/* DETAIL PAGE */}
          {detailMode && !happenedMode && (
            <>
              <div className="font-mono text-base whitespace-pre-wrap mb-2">
                {detailHeaderText}
              </div>
              <div
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: detailDisplayedText }}
              />
              {detailIdx >= currentDetailText.length && (
                <div className="mt-4">
                  {detailOptions.map((opt, idx) => (
                    <div
                      id={`detail-option-${idx}`}
                      key={opt}
                      className={`mb-2 cursor-pointer pl-2 ${
                        selectedDetail === idx ? "bg-blue-50 text-blue-700" : "text-gray-900"
                      }`}
                    >
                      <span className="mr-2">{">"}</span>
                      <span className="font-mono">{opt}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* HAPPENED PAGE */}
          {detailMode && happenedMode && (
            <>
              <div className="font-mono text-base whitespace-pre-wrap mb-2">
                {currentHappened.header}
              </div>
              <div
                className="whitespace-pre-wrap mb-4"
                dangerouslySetInnerHTML={{ __html: happenedDisplayedText.replace(/\n/g, "<br/>") }}
              />
          {happenedIdx >= currentHappened.intro.length && (
            <div className="mt-4">
              {currentHappened.options.map((opt, idx) => (
                <div
                  id={`happened-option-${idx}`}
                  key={opt}
                  className={`mb-2 cursor-pointer pl-2 ${
                    selectedHappened === idx ? "bg-blue-50 text-blue-700" : "text-gray-900"
                  }`}
                  onMouseEnter={() => {
                    setSelectedHappened(idx);
                    if (onHappenedHover) {
                      onHappenedHover(idx);
                    }
                  }}
                >
                  <span className="mr-2">{">"}</span>
                  <span className="font-mono">{opt}</span>
                </div>
              ))}
            </div>
          )}
            </>
          )}
        </div>
      </div>
    </DraggableWindow>
  );
};