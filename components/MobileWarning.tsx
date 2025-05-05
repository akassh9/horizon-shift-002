// src/components/MobileWarning.tsx
"use client";

import { useState } from "react";
import { useDeviceDetect } from "../src/hooks/useDeviceDetect";

export function MobileWarning() {
  const isMobile = useDeviceDetect();
  const [dismissed, setDismissed] = useState(false);

  if (!isMobile || dismissed) return null;

  return (
    <div
      className="fixed inset-0 h-screen bg-black bg-opacity-70 z-[1000] flex items-center justify-center p-4"
      onClick={() => setDismissed(true)}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-sm p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">
          Optimized for Desktop
        </h2>
        <p className="text-gray-700 mb-4">
          This interactive terminal is best experienced on a computer with
          a mouse/keyboard. Touch screens may not feel quite right.
        </p>
        <button
          className="px-4 py-2 border rounded hover:bg-gray-100"
          onClick={() => setDismissed(true)}
        >
          Understood
        </button>
      </div>
    </div>
  );
}
