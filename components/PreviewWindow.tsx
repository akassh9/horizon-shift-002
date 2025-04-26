"use client";
import React from "react";
import { DraggableWindow } from "./DraggableWindow";
import Image from "next/image";

interface PreviewWindowProps {
  id: string;
  src: string;
  alt?: string;
  initialPos: { x: number; y: number };
  width?: number;
  height?: number;
  title?: string; // Add this line
}

export const PreviewWindow: React.FC<PreviewWindowProps> = ({
  id,
  src,
  alt = "",
  initialPos,
  width = 400,
  height = 300,
  title, // Add this line
}) => {
  const filename = src.split("/").pop();

  return (
    <DraggableWindow
      id={id}
      initialPos={initialPos}
      width="auto"
      height="auto"
      className="bg-white shadow-md border border-gray-300"
    >
      <div className="w-full">
        <div className="bg-gray-100 border-b border-gray-300 px-4 py-1 text-xs font-medium text-gray-700 rounded-t select-none">
          {title || filename}
        </div>
        <div className="flex items-center justify-center p-2">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="object-contain select-none pointer-events-none"
            draggable={false}
            priority
          />
        </div>
      </div>
    </DraggableWindow>
  );
};