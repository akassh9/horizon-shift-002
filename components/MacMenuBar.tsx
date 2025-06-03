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
  const fileRef = useRef<HTMLSpanElement>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const historyRef = useRef<HTMLSpanElement>(null);

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
    navigate({ sector, help: undefined });
    cb?.();
  };

  const triggerHelp = () => {
    navigate({ help: "yes", sector: undefined });
    onHelp?.();
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
      <span className="mr-6 text-lg"></span>
      <nav className="flex space-x-6 text-base font-medium relative">
        {["Terminal 13.2", "File", "Simulate", "History", "Help"].map((item) => {
          const disabled = disableAll 
            || (isHistoryPage && item !== "Terminal 13.2" && item !== "History");

          if (disabled) {
            return (
              <span
                key={item}
                className="px-2 py-1 rounded opacity-50 cursor-not-allowed"
              >
                {item}
              </span>
            );
          }

          return item === "File" ? (
            <span
              key={item}
              ref={fileRef}
              className={`px-2 py-1 rounded relative ${fileOpen ? "bg-gray-200" : ""} ${disableFile ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 cursor-pointer"}`}
              onClick={() => { if (!disableFile) setFileOpen(open => !open); }}
            >
              {item}
              {fileOpen && !disableFile && (
                <div className="absolute left-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg py-1 z-[60]">
                  <div className="relative group">
                    <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                      Add
                      <span className="ml-2">&#9654;</span>
                    </div>
                    {/* Submenu */}
                    <div className="absolute left-full top-0 mt-0 ml-1 w-36 bg-white border border-gray-200 rounded shadow-lg py-1 z-[70]">
                      <div
                        className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => addSector("health", onAddHealth)}
                      >
                        Health
                      </div>
                      <div
                        className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => addSector("education", onAddEducation)}
                      >
                        Education
                      </div>
                      <div
                        className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => addSector("entertainment", onAddEntertainment)}
                      >
                        Entertainment
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </span>
          ) : item === "Simulate" ? (
            disableSimulate ? (
              <span
                key="Simulate"
                className="px-2 py-1 rounded opacity-50 cursor-not-allowed"
              >
                Simulate
              </span>
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
            <span
              key={item}
              ref={historyRef}
              className={`px-2 py-1 rounded relative ${historyOpen ? "bg-gray-200" : ""} hover:bg-gray-200 cursor-pointer`}
              onClick={() => setHistoryOpen(open => !open)}
            >
              {item}
              {historyOpen && (
                <div className="absolute left-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg py-1 z-[60]">
                  <Link
                    href="/history?volume=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    Volume 1
                  </Link>
                  <Link
                    href="/history?volume=2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    Volume 2
                  </Link>
                </div>
              )}
            </span>
          ) : item === "Help" ? (
            disableHelp ? (
              <span
                key="Help"
                className="px-2 py-1 rounded opacity-50 cursor-not-allowed"
              >
                Help
              </span>
            ) : (
              <span
                key="Help"
                className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
                onClick={triggerHelp}
              >
                Help
              </span>
            )
          ) : (
            <span key={item} className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">
              {item}
            </span>
          );
        })}
      </nav>
    </div>
  );
};