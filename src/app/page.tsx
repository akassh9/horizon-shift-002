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
    pos: { x: 346, y: 972 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "Always on health sensors? Check",
  },
  {
    key: "sensors",
    pos: { x: 572, y: 792 },
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
    pos: { x: 1265, y: 933 },
    size: { width: "auto", height: "auto" },
    type: "text",
    text: "More information at any cost..",
  },
  {
    key: "info",
    pos: { x: 1199, y: 786 },
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
];

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
        {cfg.type === "image" && cfg.src ? (
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
        )}
      </DraggableWindow>
    </motion.div>
  );
}

export default function Home() {
  const [showHelp, setShowHelp] = useState(true);
  const [showWindows, setShowWindows] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [helpAnswer, setHelpAnswer] = useState("");
  const [centerPos, setCenterPos] = useState({ x: 694, y: 299 });
  // Z-index for help window
  const [zCounter, setZCounter] = useState(1);
  const [helpZIndex, setHelpZIndex] = useState(zCounter + 1);
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
  const windowsToRender = selectedOption in optionWindows
    ? windows.filter(w => optionWindows[selectedOption].includes(w.key))
    : windows;

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
        />
      )}

      <AnimatePresence>
        {showWindows && windowsToRender.map(cfg => (
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