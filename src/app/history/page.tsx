"use client";
export const dynamic = 'force-dynamic';
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { DraggableWindow } from "../../../components/DraggableWindow";

export default function HistoryPage() {
  const searchParams = useSearchParams();
  const volume = searchParams.get("volume") || "1";
  const iframeSrc =
    volume === "2"
      ? "https://issuu.com/uc_next_innovation_scholars/docs/horizon_shift_volume_002_future_creators_report?mode=window&viewMode=singlePage"
      : "https://issuu.com/uc_next_innovation_scholars/docs/2023_uc_nis_future_creators_report_horizon_shift?mode=window&viewMode=singlePage";
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <DraggableWindow
          id="history-note"
          initialPos={{ x: 250, y: 169 }}
          width="auto"
          height="auto"
          className="mac-window bg-white text-black font-mono border border-gray-300 shadow-lg"
        >
          <div className="mac-titlebar bg-gray-100 border-b border-gray-300 flex items-center px-3 py-1">
            <span className="mac-traffic traffic-red mr-2"></span>
            <span className="mac-traffic traffic-yellow mr-2"></span>
            <span className="mac-traffic traffic-green"></span>
            <span className="mac-title-text text-gray-700 ml-3 font-semibold"> Publication</span>
          </div>
          <div className="p-4">
            <h1 className="text-lg font-bold">Horizon Shift</h1>
            <h2 className="text-sm text-gray-600">Volume {volume}</h2>
          </div>
        </DraggableWindow>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            backgroundColor: "#bfffe1",
            backgroundImage:
              "linear-gradient(to right, #c8e6c9 1px, transparent 1px), " +
              "linear-gradient(to bottom, #c8e6c9 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            minHeight: "100vh",
          }}
        >
          {/* Page version badge */}
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              fontFamily: "monospace",
              fontSize: "0.875rem",
              color: "#555",
            }}
          >
          </div>
          <iframe
            title="History Publication"
            /*  ⬇︎  document‑level link + flags  */
            src={iframeSrc}
            style={{
              border: "none",
              width: "100%",
              maxWidth: 800,
              height: "80vh",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            allowFullScreen
          />
        </div>
      </>
    </Suspense>
  );
}
