"use client";
import "../globals.css";
import React from "react";
import { useRouter } from "next/navigation";
import { TextEditWindow } from "../../../components/TextEditWindow";
import { ForesightContent } from "../../../data/foresightContent";
import { MacMenuBar } from "../../../components/MacMenuBar";

const simulateInitialText = `
Welcome to Simulation Mode!

Here on this page, you can interact with the simulator and see dynamic outputs based on your input. 
This text is unique to the Simulate page—feel free to replace it with any content you need.
`;

const simulateContent: ForesightContent = {
  introText: simulateInitialText.trim(),
  options: [
    { file: "Simulation", description: "Start simulation" },
  ],
  detailTexts: [
    "",
  ],
  detailHeaderTemplate: () => "",
  happenedConfig: [
    {
      header: "",
      intro: "",
      options: [],
    },
  ],
};

export default function SimulatePage() {
  const router = useRouter();

  return (
    <>
      <MacMenuBar
        onAddHealth={() => router.push("/?sector=health")}
        onAddEducation={() => router.push("/?sector=education")}
        onAddEntertainment={() => router.push("/?sector=entertainment")}
        disableFile={false}
        disableSimulate={true}
        onHelp={() => router.push("/?help=yes")}
        disableHelp={false}
      />
      <div className="flex items-center justify-center min-h-screen">
        <TextEditWindow
          content={simulateContent}
          initialPos={{ x: 35, y: -14 }}
        />
      </div>
    </>
  );
}