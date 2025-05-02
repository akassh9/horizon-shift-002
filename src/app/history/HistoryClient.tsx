"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { DraggableWindow } from "../../../components/DraggableWindow";

export default function HistoryClient() {
  const searchParams = useSearchParams();
  const volume = searchParams.get("volume") || "1";
  const iframeSrc =
    volume === "2"
      ? "https://issuu.com/uc_next_innovation_scholars/docs/horizon_shift_volume_002_future_creators_report?mode=window&viewMode=singlePage"
      : "https://issuu.com/uc_next_innovation_scholars/docs/2023_uc_nis_future_creators_report_horizon_shift?mode=window&viewMode=singlePage";

  return (
    <>
      <DraggableWindow
        id="history-note"
        initialPos={{ x: 250, y: 169 }}
        width="auto"
        height="auto"
        className="mac-window bg-white text-black font-mono border border-gray-300 shadow-lg"
      >
        <div className="mac-titlebar bg-gray-100 border-b border-gray-300 flex items-center px-3 py-1">
          <span className="mac-traffic traffic-red mr-2" />
          <span className="mac-traffic traffic-yellow mr-2" />
          <span className="mac-traffic traffic-green" />
          <span className="mac-title-text text-gray-700 ml-3 font-semibold">Horizon Shift</span>
          <span className="ml-auto text-sm text-gray-500">Volume {volume}</span>
        </div>
        <div className="p-4">
          {/* Optional additional content */}
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
          position: "relative",
        }}
      >
        <iframe
          title="History Publication"
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
  );
}