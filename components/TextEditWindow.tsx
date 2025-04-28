"use client";
import React, { useEffect, useRef, useState } from "react";
import { DraggableWindow } from "./DraggableWindow";

const introText = `[SYS-ARCHIVE v3.7]  •  NODE: CINCINNATI_EDU_NET
CATEGORY LOADED: Health
Date Retrieved: 14 May 2040 | 09:17:33 EST
————————
You may choose one of the following three health scenarios to explore further. Each scenario focuses on key developments reshaping healthcare in 2034. 

↓  SCENARIOS  ↓`;

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

export const TextEditWindow: React.FC<{
  initialPos?: { x: number; y: number };
  initialZIndex?: number;
  onOptionSelect?: (index: number) => void;
}> = ({
  initialPos = { x: 200, y: 100 },
  initialZIndex = 10,
  onOptionSelect,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [typingIdx, setTypingIdx] = useState(0);
  const [revealedOptions, setRevealedOptions] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState(0);

  const [detailMode, setDetailMode] = useState(false);
  const [detailDisplayedText, setDetailDisplayedText] = useState("");
  const [detailIdx, setDetailIdx] = useState(0);

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
      if (e.key === "ArrowUp") {
        setSelected((prev) => (prev === 0 ? options.length - 1 : prev - 1));
      } else if (e.key === "ArrowDown") {
        setSelected((prev) => (prev === options.length - 1 ? 0 : prev + 1));
      } else if (e.key === "Enter") {
        if (selected === 0) {
          // Enter on option 0: switch to detail view
          setDetailMode(true);
          // reset detail typing
          setDetailDisplayedText("");
          setDetailIdx(0);
        } else {
          // default behavior for other options
          if (onOptionSelect) onOptionSelect(selected);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showOptions, revealedOptions, selected, onOptionSelect]);

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
    if (detailMode && detailIdx < detailText.length) {
      const timeout = setTimeout(() => {
        setDetailDisplayedText(detailText.slice(0, detailIdx + 1));
        setDetailIdx(detailIdx + 1);
      }, 18);
      return () => clearTimeout(timeout);
    }
  }, [detailMode, detailIdx]);

  // Auto-scroll container while detail text is streaming
  useEffect(() => {
    if (detailMode) {
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [detailDisplayedText, detailMode]);

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
          {detailMode && (
            <div
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: detailDisplayedText }}
            />
          )}
        </div>
      </div>
    </DraggableWindow>
  );
};
