"use client";
import "../globals.css";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import { SimulationWindow } from "../../../components/SimulationWindow";
import { MacMenuBar } from "../../../components/MacMenuBar";

const PROMPTS: Record<
  Exclude<"intro" | "job" | "age" | "marital" | "city" | "result", "result">,
  string
> = {
  intro: [
    "Welcome back to the world of 2034!",
    "You’ve just stepped out of Extended Aging Freeze™ and this simulation will help you re-acclimate.",
    "Let’s build your personalised “day in the life” profile."
  ].join("\n\n"),

  job: [
    "First, what role will you assume in this new society?",
    "(Either type your actual 2028 job title—or pick one of our upskilling-certified careers:)",
    "• Immersive Experience Architect",
    "• Personal Data Broker",
    "• Holistic Curriculum Curator",
    "• Augmented-Reality Venue Medic",
    "• Ethical AI Talent Agent"
  ].join("\n"),

  age: "Next, how old are you now? (Please enter your current age in years)",

  marital: [
    "What’s your relationship status as you restart life in 2034?",
    "(Select one: Single, Married, Divorced)"
  ].join(" "),

  city: [
    "Finally, which city are you waking up in?",
    "This will help ground your simulation in the right locale."
  ].join(" ")
};


// ----------------------------------
// Helper to fetch scenario text
// ----------------------------------
async function* fetchScenario(profile: {
  job: string;
  age: string;
  marital: string;
  city: string;
}) {
  const res = await fetch("/api/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let full = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    full += decoder.decode(value);
    yield full;
  }
}

export default function SimulatePage() {
  const router = useRouter();

  // wizard steps
  const [step, setStep] = useState<
    "intro" | "job" | "age" | "marital" | "city" | "result"
  >("intro");

  // collected answers
  const [job, setJob] = useState("");
  const [age, setAge] = useState("");
  const [marital, setMarital] = useState("");
  const [city, setCity] = useState("");

  // track the intro input text
  const [introInput, setIntroInput] = useState("");

  // displayed text for the TextEditWindow
  const [displayedText, setDisplayedText] = useState("");

  // typewriter for prompt steps (robust to StrictMode double‑mount)
  useEffect(() => {
    if (step === "result") return;

    const promptText = PROMPTS[step as keyof typeof PROMPTS];
    let cancelled = false;

    (async () => {
      setDisplayedText("");
      for (let i = 0; i < promptText.length; i++) {
        if (cancelled) return;
        setDisplayedText((prev) => prev + promptText[i]);
        await new Promise((r) => setTimeout(r, 15));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [step]);

  // handlers for moving to next step
  const handleNext = useCallback(() => {
    if (step === "intro") setStep("job");
    else if (step === "job" && job.trim()) setStep("age");
    else if (step === "age" && /^\d{2}$/.test(age)) setStep("marital");
    else if (step === "marital" && marital.trim()) setStep("city");
    else if (step === "city" && city.trim()) setStep("result");
  }, [step, job, age, marital, city]);


  // when all inputs are collected, stream the scenario character by character (slicing-based, avoids duplication)
  useEffect(() => {
    if (step === "result") {
      (async () => {
        try {
          setDisplayedText(""); // reset before streaming
          let received = ""; // track what we've already displayed
          for await (const chunk of fetchScenario({ job, age, marital, city })) {
            // isolate only the newly received text
            const newPortion = chunk.slice(received.length);
            received = chunk;
            for (const char of newPortion) {
              setDisplayedText((prev) => prev + char);
              // small delay for terminal effect
              await new Promise((res) => setTimeout(res, 10));
            }
          }
        } catch {
          setDisplayedText("Error streaming simulation. Please try again.");
        }
      })();
    }
  }, [step, job, age, marital, city]);

  type QuestionStep = "job" | "age" | "marital" | "city";

  // render the input field or start button based on step
  const renderInput = () => {
    // hide options until typewriter finishes
    if (step !== "result") {
      const fullPrompt = PROMPTS[step as keyof typeof PROMPTS];
      if (displayedText.length < fullPrompt.length) return null;
    }

    if (step === "intro") {
      return (
        <div className="mt-4 font-mono text-[#fefefe] flex items-center">
          {/* terminal-style input prompt */}
          <span className="mr-2">{">"}</span>
          <input
            autoFocus
            type="text"
            value={introInput}
            onChange={(e) => setIntroInput(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (
                e.key === "Enter" &&
                introInput.trim().toLowerCase() === "yes"
              ) {
                handleNext();
              }
            }}
            placeholder="Type 'yes' and press return to begin"
            className="bg-transparent flex-1 focus:outline-none border-none font-mono placeholder-gray-500"
          />
        </div>
      );
    }

    if (step !== "result") {
      const valueMap: Record<QuestionStep, string> = { job, age, marital, city };
      const setterMap: Record<QuestionStep, (v: string) => void> = {
        job: setJob,
        age: (v: string) => {
          if (/^\d{0,2}$/.test(v)) setAge(v);
        },
        marital: setMarital,
        city: setCity,
      };

      return (
        <div className="mt-4 font-mono text-[#fefefe] flex items-center">
          {/* macOS terminal–style prompt */}
          <span className="mr-2">{"\u003E"}</span>
          <input
            autoFocus
            type="text"
            value={valueMap[step as QuestionStep]}
            onChange={(e) => setterMap[step as QuestionStep](e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") handleNext();
            }}
            className="bg-transparent flex-1 focus:outline-none border-none font-mono placeholder-gray-500"
            placeholder=""
          />
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <Suspense fallback={null}>
        <MacMenuBar
          onAddHealth={() => router.push("/?sector=health")}
          onAddEducation={() => router.push("/?sector=education")}
          onAddEntertainment={() => router.push("/?sector=entertainment")}
          disableFile={false}
          disableSimulate={true}
          onHelp={() => router.push("/?help=yes")}
          disableHelp={false}
        />
      </Suspense>

      <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
        <SimulationWindow
          key={step}
          title="Simulation Mode"
          date="April 2, 2034"
          showCursor={step === "result"}
          size={{
            intro: { width: 720, height: 500 },
            job: { width: 720, height: 500 },
            age: { width: 720, height: 500 },
            marital: { width: 720, height: 500 },
            city: { width: 720, height: 500 },
            result: { width: 720, height: 500 },
          }[step]}
        >
          {displayedText}
          {renderInput()}
        </SimulationWindow>
      </div>
    </>
  );
}