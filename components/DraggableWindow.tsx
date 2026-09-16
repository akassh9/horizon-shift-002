"use client";
import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

let zIndexCounter = 1;

type Props = {
  id: string;
  initialPos: { x: number; y: number };
  width: number | string;
  height: number | string;
  className?: string;
  style?: React.CSSProperties;
  initialZIndex?: number; // <-- Add this line
  children: React.ReactNode;
};

export const DraggableWindow: React.FC<Props> = ({
  id, initialPos, width, height, children, className = "", style = {}, initialZIndex
}) => {
  const [zIndex, setZIndex] = useState(initialZIndex ?? zIndexCounter);
  const nodeRef = useRef<HTMLDivElement>(null!);
  const [hasTitlebar, setHasTitlebar] = useState(false);
  const [viewportPosition, setViewportPosition] = useState<{ x: number; y: number } | null>(null);
  const mainWindow = ["help", "text-editor", "simulate"].includes(id);

  useEffect(() => {
    const updateLayout = () => {
      const node = nodeRef.current;
      setHasTitlebar(Boolean(node?.querySelector(".mac-titlebar, .border-b")));

      if (!mainWindow || typeof width !== "number" || typeof height !== "number") {
        setViewportPosition(null);
        return;
      }

      const availableWidth = window.innerWidth - 32;
      const availableHeight = window.innerHeight - 56;
      const fittedWidth = Math.min(width, availableWidth);
      const fittedHeight = Math.min(height, availableHeight);
      setViewportPosition({
        x: Math.max(16, (window.innerWidth - fittedWidth) / 2),
        y: Math.max(48, 40 + (availableHeight - fittedHeight) / 2),
      });
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [height, mainWindow, width]);

  const bringToFront = () => {
    zIndexCounter += 1;
    setZIndex(zIndexCounter);
  };

  const mergedStyle: React.CSSProperties = {
    width: mainWindow && typeof width === "number" ? `min(${width}px, calc(100vw - 2rem))` : width,
    height: mainWindow && typeof height === "number" ? `min(${height}px, calc(100vh - 3.5rem))` : height,
    position: mainWindow ? "fixed" : "absolute",
    ...(mainWindow ? { top: 0, left: 0 } : {}),
    display: "block",
    boxSizing: "border-box",
    overflow: id === "help" ? "auto" : "hidden",
    ...style,
    zIndex,
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={initialPos}
      position={viewportPosition ?? undefined}
      onDrag={(_, data) => {
        if (viewportPosition) setViewportPosition({ x: data.x, y: data.y });
      }}
      onStart={bringToFront}
      handle={hasTitlebar ? ".mac-titlebar, .border-b" : undefined}
      cancel="button, a, input, textarea, select, option, [role='button'], [contenteditable='true']"
    >
      <div
        ref={nodeRef}
        id={id}
        className={`draggable-window absolute rounded overflow-hidden ${className}`}
        style={mergedStyle}
        onMouseDown={bringToFront}
      >
        {children}
      </div>
    </Draggable>
  );
};
