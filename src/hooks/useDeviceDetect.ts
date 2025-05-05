// src/hooks/useDeviceDetect.ts
"use client";

import { useEffect, useState } from "react";

export function useDeviceDetect() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 1. User-agent sniffing
    const ua = navigator.userAgent || navigator.vendor || "";
    const mobileUa =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    // 2. Touch points
    const hasTouch =
      typeof navigator.maxTouchPoints === "number" &&
      navigator.maxTouchPoints > 0;

    // 3. Coarse-pointer media query
    const coarsePointer = window.matchMedia(
      "(hover: none) and (pointer: coarse)"
    ).matches;

    setIsMobile(mobileUa || (hasTouch && coarsePointer));
  }, []);

  return isMobile;
}
