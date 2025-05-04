"use client";
import React, { useState, useRef } from 'react';
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

  const bringToFront = () => {
    zIndexCounter += 1;
    setZIndex(zIndexCounter);
  };

  const mergedStyle: React.CSSProperties = {
    width,
    height,
    display: "block",
    boxSizing: "border-box",
    overflow: "hidden",
    ...style,
    zIndex,
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={initialPos}
      onStart={bringToFront}
    >
      <div
        ref={nodeRef}
        id={id}
        className={`draggable-window absolute rounded cursor-move overflow-hidden ${className}`}
        style={mergedStyle}
        onMouseDown={bringToFront}
      >
        {children}
      </div>
    </Draggable>
  );
};
