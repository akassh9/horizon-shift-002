"use client";

import React, { useRef, useEffect } from "react";
import { DraggableWindow } from "./DraggableWindow";

interface SimulationWindowProps {
  title?: string;
  date?: string;
  children: React.ReactNode;
  showCursor?: boolean;
  size?: { width: number; height: number };
  loading?: boolean;
}

export function SimulationWindow({
  title = "Simulation Mode",
  date = new Date().toLocaleString(),
  children,
  showCursor = true,
  size,
  loading = false,
}: SimulationWindowProps) {
  // reference to terminal pane for auto‑scroll
  const contentRef = useRef<HTMLPreElement>(null);

  // keep newest streamed text in view (only matters when showCursor = true)
  useEffect(() => {
    if (showCursor && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [children, showCursor]);

  return (
    <DraggableWindow
      id="simulate"
      initialPos={{ x: 35, y: -14 }}
      width={size?.width ?? 640}
      height={size?.height ?? 440}
    >
      <div className="bg-black text-[#fefefe] font-mono shadow-none border border-[#3a3a3a] flex flex-col h-full w-full">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#2e2e2e] border-b border-[#444] flex-shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="ml-4 text-sm text-gray-300">{title}</span>
          <span className="ml-auto text-xs text-gray-400">{date}</span>
        </div>
        <pre ref={contentRef} className="flex-1 overflow-auto p-4 whitespace-pre-wrap">
          {children}
          {loading ? (
            <span className="animate-spin inline-block ml-1">▌</span>
          ) : (
            showCursor && <span className="animate-blink ml-1">▌</span>
          )}
        </pre>
      </div>
    </DraggableWindow>
  );
}