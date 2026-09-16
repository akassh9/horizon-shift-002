"use client";
import type { ForesightContent } from "../data/foresightContent";
import React, { ReactNode, useCallback, useEffect, useRef, useState, useMemo } from "react";
import { DraggableWindow } from "./DraggableWindow";

interface TextEditWindowProps {
  content: ForesightContent;
  onOptionSelect?: (index: number) => void;
  onHappenedModeChange?: (inHappened: boolean) => void;
  onHappenedHover?: (index: number | null) => void;
  onHappenedScenarioChange?: (scenario: number) => void;
  initialPos?: { x: number; y: number };
  initialZIndex?: number;
  children?: ReactNode;
}

export const TextEditWindow: React.FC<TextEditWindowProps> = ({
  content,
  initialPos = { x: 200, y: 100 },
  initialZIndex = 10,
  onOptionSelect,
  onHappenedModeChange,
  onHappenedHover,
  onHappenedScenarioChange,
  children,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [typingIdx, setTypingIdx] = useState(0);
  const [revealedOptions, setRevealedOptions] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const [detailMode, setDetailMode] = useState(false);
  const [detailDisplayedText, setDetailDisplayedText] = useState("");
  const [detailIdx, setDetailIdx] = useState(0);
  const currentDetailText = content.detailTexts[selected];

  const detailOptions = useMemo(() => ["go back", "how did this happen?"], []);
  const [selectedDetail, setSelectedDetail] = useState(0);
  const [selectedHappened, setSelectedHappened] = useState(0);
  const [happenedMode, setHappenedMode] = useState(false);
  const [happenedDisplayedText, setHappenedDisplayedText] = useState("");
  const [happenedIdx, setHappenedIdx] = useState(0);
  const [happenedScenario, setHappenedScenario] = useState<number>(0);
  const currentHappened = content.happenedConfig[happenedScenario];

  // Typing animation for happenedIntroText (now currentHappened.intro) when in happened mode
  useEffect(() => {
    if (reduceMotion && happenedMode) {
      setHappenedDisplayedText(currentHappened.intro);
      setHappenedIdx(currentHappened.intro.length);
      return;
    }
    if (happenedMode && happenedIdx < currentHappened.intro.length) {
      const timeout = setTimeout(() => {
        setHappenedDisplayedText(currentHappened.intro.slice(0, happenedIdx + 1));
        setHappenedIdx(happenedIdx + 1);
      }, 18);
      return () => clearTimeout(timeout);
    }
  }, [happenedMode, happenedIdx, currentHappened.intro, reduceMotion]);

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
    const fileName = content.options[selected].file;
    return content.detailHeaderTemplate(fileName);
  }, [content, selected]);

  // Notify parent of the newly selected option (after options are visible)
  useEffect(() => {
    if (
      onOptionSelect &&
      showOptions &&
      revealedOptions === content.options.length
    ) {
      onOptionSelect(selected);
    }
  }, [selected, showOptions, revealedOptions, onOptionSelect, content.options.length]);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const detailOptionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const happenedOptionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const openDetail = useCallback((index = selected) => {
    setSelected(index);
    setDetailMode(true);
    setHappenedMode(false);
    setDetailDisplayedText("");
    setDetailIdx(0);
  }, [selected]);

  const returnToOptions = useCallback(() => {
    setDetailMode(false);
    setHappenedMode(false);
    onHappenedModeChange?.(false);
    onHappenedHover?.(null);
  }, [onHappenedHover, onHappenedModeChange]);

  const openHappened = useCallback(() => {
    setHappenedMode(true);
    onHappenedScenarioChange?.(selected);
    setHappenedScenario(selected);
    setHappenedDisplayedText("");
    setHappenedIdx(0);
    setSelectedHappened(0);
  }, [onHappenedScenarioChange, selected]);

  const returnToStart = useCallback(() => {
    returnToOptions();
    setSelected(0);
  }, [returnToOptions]);

  const revealAll = useCallback(() => {
    setDisplayedText(content.introText);
    setTypingIdx(content.introText.length);
    setShowOptions(true);
    setRevealedOptions(content.options.length);
  }, [content.introText, content.options.length]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  // Terminal typing animation for intro text
  useEffect(() => {
    if (reduceMotion) {
      revealAll();
      return;
    }
    if (typingIdx < content.introText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(content.introText.slice(0, typingIdx + 1));
        setTypingIdx(typingIdx + 1);
      }, 18);
      return () => clearTimeout(timeout);
    } else {
      // Start revealing options after intro text is done
      setShowOptions(true);
    }
  }, [typingIdx, content.introText, reduceMotion, revealAll]);

  // Animate options one by one
  useEffect(() => {
    if (showOptions && revealedOptions < content.options.length) {
      const timeout = setTimeout(() => {
        setRevealedOptions(revealedOptions + 1);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [showOptions, revealedOptions, content.options.length]);

  // Arrow navigation belongs to the terminal controls, not the whole page.
  useEffect(() => {
    if (!showOptions || revealedOptions < content.options.length) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;
      if (!target?.closest("#text-editor")) return;
      if (!["ArrowUp", "ArrowDown", "Enter"].includes(e.key)) return;
      const control = target?.closest("button");
      if (control && !/^(option|detail-option|happened-option)-/.test(control.id)) return;

      // If in detail mode, intercept keys once controls are available.
      if (detailMode) {
        // DETAIL PAGE navigation (when happenedMode is false)
        if (!happenedMode) {
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedDetail(prev => prev === 0 ? detailOptions.length - 1 : prev - 1);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedDetail(prev => prev === detailOptions.length - 1 ? 0 : prev + 1);
          } else if (e.key === "Enter") {
            e.preventDefault();
            if (selectedDetail === 0) {
              returnToOptions();
            } else if (selectedDetail === 1) {
              openHappened();
            }
          }
          return;
        }
        // HAPPENED PAGE navigation
        if (happenedMode) {
          const len = currentHappened.options.length;
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedHappened(prev =>
              prev === 0 ? len - 1 : prev - 1
            );
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedHappened(prev =>
              prev === len - 1 ? 0 : prev + 1
            );
          } else if (e.key === "Enter") {
            e.preventDefault();
            // if "Return to Health Start" selected
            if (selectedHappened === len - 1) {
              returnToStart();
            }
          }
          return;
        }
      }

      // Navigation for initial options
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((prev) => (prev === 0 ? content.options.length - 1 : prev - 1));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((prev) => (prev === content.options.length - 1 ? 0 : prev + 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        openDetail();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    showOptions,
    revealedOptions,
    selected,
    detailMode,
    detailIdx,
    currentDetailText,
    selectedDetail,
    detailOptions,
    selectedHappened,
    happenedMode,
    currentHappened.options.length,
    content.options.length,
    openDetail,
    openHappened,
    returnToOptions,
    returnToStart,
  ]);

  // Auto-scroll to bottom only while typing the intro text
  useEffect(() => {
    if (typingIdx < content.introText.length) {
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }
  }, [displayedText, typingIdx, content.introText.length]);

  // Auto-scroll selected option into view on keyboard navigation
  useEffect(() => {
    if (showOptions && revealedOptions === content.options.length) {
      const el = document.getElementById(`option-${selected}`);
      el?.scrollIntoView({ block: "nearest" });
      optionRefs.current[selected]?.focus({ preventScroll: true });
    }
  }, [selected, showOptions, revealedOptions, content.options.length]);

  // Typing animation for detailText when in detail mode
  useEffect(() => {
    if (reduceMotion && detailMode) {
      setDetailDisplayedText(currentDetailText);
      setDetailIdx(currentDetailText.length);
      return;
    }
    if (detailMode && detailIdx < currentDetailText.length) {
      const timeout = setTimeout(() => {
        setDetailDisplayedText(currentDetailText.slice(0, detailIdx + 1));
        setDetailIdx(detailIdx + 1);
      }, 18);
      return () => clearTimeout(timeout);
    }
  }, [detailMode, detailIdx, currentDetailText, reduceMotion]);

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
      (happenedMode ? happenedOptionRefs : detailOptionRefs).current[
        happenedMode ? selectedHappened : selectedDetail
      ]?.focus({ preventScroll: true });
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
              {typingIdx < content.introText.length && (
                <button
                  id="text-reveal-all"
                  type="button"
                  className="mt-3 rounded border border-gray-300 px-3 py-1 font-mono text-sm text-gray-600 hover:bg-gray-100"
                  onClick={revealAll}
                >
                  Reveal all
                </button>
              )}
              {showOptions && (
                <div className="mt-4">
                  {content.options.map((opt, idx) => (
                    <button
                      ref={(element) => { optionRefs.current[idx] = element; }}
                      id={`option-${idx}`}
                      key={opt.file}
                      type="button"
                      aria-pressed={selected === idx}
                      onFocus={() => setSelected(idx)}
                      onClick={() => openDetail(idx)}
                      className={`mb-3 block w-full text-left cursor-pointer ${selected === idx ? "bg-blue-50" : ""}`}
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
                    </button>
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
              <div className="mt-4" aria-label="Detail options">
                  {detailOptions.map((opt, idx) => (
                    <button
                      ref={(element) => { detailOptionRefs.current[idx] = element; }}
                      id={`detail-option-${idx}`}
                      key={opt}
                      type="button"
                      onFocus={() => setSelectedDetail(idx)}
                      className={`mb-2 block w-full cursor-pointer pl-2 text-left ${
                        selectedDetail === idx ? "bg-blue-50 text-blue-700" : "text-gray-900"
                      }`}
                      onClick={() => {
                        if (idx === 0) {
                          returnToOptions();
                        } else if (idx === 1) {
                          openHappened();
                        }
                      }}
                    >
                      <span className="mr-2">{">"}</span>
                      <span className="font-mono">{opt}</span>
                    </button>
                  ))}
              </div>
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
            <div className="mt-4" aria-label="How this happened options">
              {currentHappened.options.map((opt, idx) => (
                <button
                  ref={(element) => { happenedOptionRefs.current[idx] = element; }}
                  id={`happened-option-${idx}`}
                  key={opt}
                  type="button"
                  onFocus={() => {
                    setSelectedHappened(idx);
                    onHappenedHover?.(idx);
                  }}
                  className={`mb-2 block w-full cursor-pointer pl-2 text-left ${
                    selectedHappened === idx ? "bg-blue-50 text-blue-700" : "text-gray-900"
                  }`}
                  onMouseEnter={() => {
                    setSelectedHappened(idx);
                    if (onHappenedHover) {
                      onHappenedHover(idx);
                    }
                  }}
                  onClick={() => {
                    if (idx === currentHappened.options.length - 1) {
                      returnToStart();
                    }
                  }}
                >
                  <span className="mr-2">{">"}</span>
                  <span className="font-mono">{opt}</span>
                </button>
              ))}
            </div>
            </>
          )}
        {/* Render custom children if provided */}
        {children}
        </div>
      </div>
    </DraggableWindow>
  );
};
