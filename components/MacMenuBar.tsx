// components/MacMenuBar.tsx
"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";

type MacMenuBarProps = {
  onAddHealth?: () => void;
  onAddEducation?: () => void;
  onAddEntertainment?: () => void;
  disableFile?: boolean;
};

export const MacMenuBar: React.FC<MacMenuBarProps> = ({
  onAddHealth,
  onAddEducation,
  onAddEntertainment,
  disableFile,
}) => {
  const [fileOpen, setFileOpen] = useState(false);
  const fileRef = useRef<HTMLSpanElement>(null);

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
        {["Terminal 13.2", "File", "Edit", "Format", "View", "History", "Help"].map((item) =>
          item === "File" ? (
            <span
              key={item}
              ref={fileRef}
              className={`px-2 py-1 rounded relative ${fileOpen ? "bg-gray-200" : ""} ${disableFile ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 cursor-pointer"}`}
              onClick={() => { if (!disableFile) setFileOpen(open => !open); }}
            >
              {item}
              {fileOpen && !disableFile && (
                <div className="absolute left-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg py-1 z-60">
                  <div className="relative group">
                    <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                      Add
                      <span className="ml-2">&#9654;</span>
                    </div>
                    {/* Submenu */}
                    <div className="absolute left-full top-0 mt-0 ml-1 w-36 bg-white border border-gray-200 rounded shadow-lg py-1 z-70">
                      <div
                        className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          console.log("Health clicked");
                          onAddHealth?.();
                        }}
                      >
                        Health
                      </div>
                      <div
                        className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          console.log("Education clicked");
                          onAddEducation?.();
                        }}
                      >
                        Education
                      </div>
                      <div
                        className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          console.log("Entertainment clicked");
                          onAddEntertainment?.();
                        }}
                      >
                        Entertainment
                      </div>
                    </div>
                  </div>
                  <div
                    className={`px-4 py-1 ${disableFile ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 cursor-pointer"}`}
                    onClick={() => { if (!disableFile) window.location.reload(); }}
                  >
                    Reset
                  </div>
                </div>
              )}
            </span>
          ) : item === "Help" ? (
            <span
              key={item}
              className="px-2 py-1 rounded opacity-50 cursor-not-allowed"
            >
              {item}
            </span>
          ) : item === "History" ? (
            <Link
              key={item}
              href="/history"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
            >
              {item}
            </Link>
          ) : (
            <span key={item} className="hover:bg-gray-200 px-2 py-1 rounded cursor-pointer">
              {item}
            </span>
          )
        )}
      </nav>
    </div>
  );
};