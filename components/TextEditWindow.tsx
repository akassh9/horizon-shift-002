"use client";
import React, { useEffect, useRef, useState } from "react";
import { DraggableWindow } from "./DraggableWindow";

const introText = `[SYS-ARCHIVE v3.7]  •  NODE: CINCINNATI_EDU_NET
BOOT>> 14 May 2040  09:17:33 EST
————————
Hi, explorer.  Welcome to the public mirror of the <strong>Dr. Me Foresight Archive</strong>.  
Health is no longer a service; it is the firmware of society.

↓  AVAILABLE FILES  ↓`;
/* ——————————————————————————————————————————— */

const options = [
  {
    file: "HER-2040-E012783.txt",
    header: "Executive Order #12783  | 12 Feb 2030",
    description: "“Establishing the Federal Health–Education Reform”",
  },
  {
    file: "IINLB-FIELDNOTES.log",
    header: "Personal journal fragment recovered from the “Ignorance–Is–No–Longer–Bliss” pilot, AZ sector",
  },
  {
    file: "HDGE-BULLETIN.webp",
    header: "Social feed post – Health–Data Gig–Economy launch day, Memphis FreePort",
  },
  {
    file: "HOLINS-MEMO.pdf",
    header: "Leaked insurer memo: “Roadmap to Holistic Risk Pricing – Confidential Draft v2.1”",
  },
];
export const TextEditWindow: React.FC<{
  initialPos?: { x: number; y: number };
  initialZIndex?: number;
}> = ({
  initialPos = { x: 200, y: 100 },
  initialZIndex = 10,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [typingIdx, setTypingIdx] = useState(0);
  const [revealedOptions, setRevealedOptions] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState(0);
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
        alert(`You chose: ${options[selected].file}`);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showOptions, revealedOptions, selected]);

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

  return (
    <DraggableWindow
      id="text-editor"
      initialPos={initialPos}
      width={800}
      height={500}
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
                    <div className="font-mono text-sm">{opt.header}</div>
                    {opt.description && (
                      <div className="font-mono text-sm mt-1">{opt.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DraggableWindow>
  );
};
