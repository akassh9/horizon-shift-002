// components/MacMenuBar.tsx
"use client";
import React, { useState, useRef } from "react";

type MacMenuBarProps = {
  onAddHealth?: () => void;
};

export const MacMenuBar: React.FC<MacMenuBarProps> = ({ onAddHealth }) => {
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
        z-20
        bg-white
      "
      style={{ fontSize: "1rem", minHeight: "40px" }} // 16px font, 40px height
    >
      <span className="mr-6 text-lg"></span>
      <nav className="flex space-x-6 text-base font-medium relative">
        {["Text Editor", "File", "Edit", "Format", "View", "Window", "Help"].map((item) =>
          item === "File" ? (
            <span
              key={item}
              ref={fileRef}
              className={`hover:bg-gray-200 px-2 py-1 rounded cursor-pointer relative ${fileOpen ? "bg-gray-200" : ""}`}
              onClick={() => setFileOpen((open) => !open)}
            >
              {item}
              {fileOpen && (
                <div className="absolute left-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg py-1 z-30">
                  <div className="relative group">
                    <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                      Add
                      <span className="ml-2">&#9654;</span>
                    </div>
                    {/* Submenu */}
                    <div className="absolute left-full top-0 mt-0 ml-1 w-36 bg-white border border-gray-200 rounded shadow-lg py-1 z-40">
                      <div
                        className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          console.log("Health clicked");
                          onAddHealth?.();
                        }}
                      >
                        Health
                      </div>
                      <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Education</div>
                      <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer">Entertainment</div>
                    </div>
                  </div>
                  <div className="px-4 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => window.location.reload()}>
                    Reset
                  </div>
                </div>
              )}
            </span>
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
