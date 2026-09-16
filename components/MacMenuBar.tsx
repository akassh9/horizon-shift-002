"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type MacMenuBarProps = {
  onAddHealth?: () => void;
  onAddEducation?: () => void;
  onAddEntertainment?: () => void;
  disableFile?: boolean;
  disableAll?: boolean;
  onHelp?: () => void;
  disableHelp?: boolean;
  disableSimulate?: boolean;
};

export const MacMenuBar: React.FC<MacMenuBarProps> = ({
  onAddHealth,
  onAddEducation,
  onAddEntertainment,
  disableFile,
  disableAll,
  onHelp,
  disableHelp,
  disableSimulate,
}) => {
  const [fileOpen, setFileOpen] = useState(false);
  const fileRef = useRef<HTMLDivElement>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname() ?? "";
  const isHistoryPage = pathname.startsWith("/history");

  // -------- centralised URL helper --------
  const router = useRouter();
  const currentParams = useSearchParams();

  /**
   * Merge the provided key/value pairs into the query‑string.
   * Use `undefined` to delete a key.  Uses shallow routing.
   */
  const navigate = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(currentParams.toString());

    Object.entries(updates).forEach(([k, v]) => {
      if (v === undefined) params.delete(k);
      else params.set(k, v);
    });

    const query = params.toString();
    router.push(query ? `/?${query}` : "/", { scroll: false });
  };
  // ----------------------------------------

  const addSector = (
    sector: "health" | "education" | "entertainment",
    cb?: () => void
  ) => {
    setFileOpen(false);
    if (cb) cb();
    else navigate({ sector, help: undefined });
  };

  const triggerHelp = () => {
    if (onHelp) onHelp();
    else navigate({ help: "yes", sector: undefined });
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        fileRef.current &&
        !fileRef.current.contains(e.target as Node)
      ) {
        setFileOpen(false);
      }
    }
    if (fileOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [fileOpen]);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        historyRef.current &&
        !historyRef.current.contains(e.target as Node)
      ) {
        setHistoryOpen(false);
      }
    }
    if (historyOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [historyOpen]);

  React.useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFileOpen(false);
        setHistoryOpen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div
      className="
        mac-menubar
        fixed top-0 left-0 right-0
        h-10
        flex items-center select-none
        px-4
        z-50
        bg-white
      "
      style={{ fontSize: "1rem", minHeight: "40px" }} // 16px font, 40px height
    >
      <span className="mr-2 sm:mr-6 text-lg"></span>
      <nav className="flex gap-1 sm:gap-6 text-sm sm:text-base font-medium relative">
        {["Terminal 13.2", "File", "Simulate", "History", "Help"].map((item) => {
          const disabled = disableAll 
            || (isHistoryPage && item !== "Terminal 13.2" && item !== "History");

          if (disabled) {
            return (
              <button
                key={item}
                type="button"
                disabled
                className="px-2 py-1 rounded opacity-50 cursor-not-allowed"
              >
                {item}
              </button>
            );
          }

          return item === "File" ? (
            <div
              key={item}
              ref={fileRef}
              className="relative"
            >
              <button
                type="button"
                aria-expanded={fileOpen}
                disabled={disableFile}
                className={`px-2 py-1 rounded ${fileOpen ? "bg-gray-200" : ""} ${disableFile ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 cursor-pointer"}`}
                onClick={() => setFileOpen(open => !open)}
              >
                {item}
              </button>
              {fileOpen && !disableFile && (
                <div className="absolute left-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg py-1 z-[60]">
                  <div className="relative group">
                    <button type="button" className="w-full px-4 py-1 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                      Add
                      <span className="ml-2">&#9654;</span>
                    </button>
                    {/* Submenu */}
                    <div className="absolute left-full top-0 mt-0 ml-1 w-36 bg-white border border-gray-200 rounded shadow-lg py-1 z-[70]">
                      <button type="button"
                        className="block w-full px-4 py-1 text-left hover:bg-gray-100 cursor-pointer"
                        onClick={() => addSector("health", onAddHealth)}
                      >
                        Health
                      </button>
                      <button type="button"
                        className="block w-full px-4 py-1 text-left hover:bg-gray-100 cursor-pointer"
                        onClick={() => addSector("education", onAddEducation)}
                      >
                        Education
                      </button>
                      <button type="button"
                        className="block w-full px-4 py-1 text-left hover:bg-gray-100 cursor-pointer"
                        onClick={() => addSector("entertainment", onAddEntertainment)}
                      >
                        Entertainment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : item === "Simulate" ? (
            disableSimulate ? (
              <button
                key="Simulate"
                type="button"
                disabled
                className="px-2 py-1 rounded opacity-50 cursor-not-allowed"
              >
                Simulate
              </button>
            ) : (
              <Link
                key="Simulate"
                href="/simulate"
                className="inline-flex items-center hover:bg-gray-200 px-2 py-1 rounded cursor-pointer"
              >
                Simulate
              </Link>
            )
          ) : item === "History" ? (
            <div
              key={item}
              ref={historyRef}
              className="relative"
            >
              <button
                type="button"
                aria-expanded={historyOpen}
                className={`px-2 py-1 rounded ${historyOpen ? "bg-gray-200" : ""} hover:bg-gray-200 cursor-pointer`}
                onClick={() => setHistoryOpen(open => !open)}
              >{item}</button>
              {historyOpen && (
                <div className="absolute left-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg py-1 z-[60]">
                  <Link
                    href="/history?volume=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setHistoryOpen(false)}
                  >
                    Volume 1
                  </Link>
                  <Link
                    href="/history?volume=2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setHistoryOpen(false)}
                  >
                    Volume 2
                  </Link>
                  <Link
                    href="/history?volume=3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setHistoryOpen(false)}
                  >
                    Volume 3
                  </Link>
                </div>
              )}
            </div>
          ) : item === "Help" ? (
            disableHelp ? (
              <button
                key="Help"
                type="button"
                disabled
                className="px-2 py-1 rounded opacity-50 cursor-not-allowed"
              >
                Help
              </button>
            ) : (
              <button
                key="Help"
                type="button"
                className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
                onClick={triggerHelp}
              >
                Help
              </button>
            )
          ) : (
            <button type="button" key={item} className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">
              {item}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
