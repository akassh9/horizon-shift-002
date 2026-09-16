"use client";

import React, { useEffect, useRef, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { SimulationWindow } from "../../../components/SimulationWindow";
import { MacMenuBar } from "../../../components/MacMenuBar";
import { readSimulation } from "@/lib/simulation-stream";

type Profile = { job: string; age: string; marital: string; city: string };
const fields = ['job', 'age', 'marital', 'city'] as const;
const prompts = {
  job: 'What role will you assume in 2034?',
  age: 'How old are you in this future? Enter an age from 1 to 120.',
  marital: 'What is your relationship status as you restart life in 2034?',
  city: 'Which city are you waking up in?',
};
const examples = ['Immersive Experience Architect', 'Personal Data Broker', 'Holistic Curriculum Curator'];
const buttonClass = 'rounded border border-gray-500 px-3 py-1.5 text-sm hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

export default function SimulatePage() {
  const router = useRouter();
  const [step, setStep] = useState(-1);
  const [profile, setProfile] = useState<Profile>({ job: '', age: '', marital: 'Single', city: '' });
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const activeField = fields[step];

  useEffect(() => () => controllerRef.current?.abort(), []);

  const generate = async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    let timedOut = false;
    const timer = setTimeout(() => { timedOut = true; controller.abort(); }, 40_000);
    setStep(4);
    setText('');
    setError('');
    setComplete(false);
    setLoading(true);
    try {
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
        signal: controller.signal,
      });
      for await (const chunk of readSimulation(response)) {
        if (controller.signal.aborted) return;
        setText(previous => previous + chunk);
      }
      if (!controller.signal.aborted) setComplete(true);
    } catch (cause) {
      if (controllerRef.current !== controller) return;
      setError(timedOut ? 'This is taking too long. Please try again.' : controller.signal.aborted ? 'Simulation canceled. You can retry or edit your profile.' : cause instanceof Error ? cause.message : 'Simulation failed. Please try again.');
    } finally {
      clearTimeout(timer);
      if (controllerRef.current === controller) setLoading(false);
    }
  };

  const editProfile = () => {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setLoading(false);
    setError('');
    setStep(0);
  };

  return <>
    <Suspense fallback={null}>
      <MacMenuBar
        onAddHealth={() => router.push('/?sector=health')}
        onAddEducation={() => router.push('/?sector=education')}
        onAddEntertainment={() => router.push('/?sector=entertainment')}
        disableSimulate onHelp={() => router.push('/?help=yes')}
      />
    </Suspense>
    <main className="flex min-h-screen items-center justify-center px-4 pt-12">
      <SimulationWindow title="Simulation Mode" date="April 2, 2034" showCursor={loading} size={{ width: 720, height: 540 }}>
        {step === -1 ? <>
          <p>Welcome back to the world of 2034!</p>
          <p className="mt-4">You’ve just stepped out of Extended Aging Freeze™. Build a profile to explore a possible day in your future.</p>
          <p className="mt-4 text-sm text-gray-400">Use an imagined profile. Your answers are sent to our AI provider to generate this fictional scenario.</p>
          <button className={`${buttonClass} mt-6`} onClick={() => setStep(0)}>Begin simulation →</button>
        </> : step < 4 ? <form onSubmit={event => {
          event.preventDefault();
          if (step === 3) void generate(); else setStep(step + 1);
        }}>
          <p className="mb-4 text-sm text-gray-400">Profile · {step + 1} of 4</p>
          <label htmlFor="profile-answer" className="block mb-4">{prompts[activeField]}</label>
          {activeField === 'marital' ? <select id="profile-answer" autoFocus value={profile.marital} onChange={event => setProfile({ ...profile, marital: event.target.value })} className="w-full rounded border border-gray-500 bg-black p-2 focus-visible:outline-2 focus-visible:outline-white">
            {['Single', 'Married', 'Divorced', 'Partnered', 'Prefer not to say'].map(value => <option key={value}>{value}</option>)}
          </select> : <input key={activeField} id="profile-answer" autoFocus required type={activeField === 'age' ? 'number' : 'text'} min={activeField === 'age' ? 1 : undefined} max={activeField === 'age' ? 120 : undefined} step={activeField === 'age' ? 1 : undefined} minLength={activeField === 'age' ? undefined : 2} maxLength={100} value={profile[activeField]} onChange={event => setProfile({ ...profile, [activeField]: event.target.value })} className="w-full rounded border border-gray-500 bg-black p-2 focus-visible:outline-2 focus-visible:outline-white" />}
          {activeField === 'job' && <div className="mt-4 flex flex-wrap gap-2">{examples.map(example => <button key={example} type="button" className={buttonClass} onClick={() => setProfile({ ...profile, job: example })}>{example}</button>)}</div>}
          <div className="mt-6 flex gap-3">
            <button type="button" className={buttonClass} onClick={() => setStep(step - 1)}>← Back</button>
            <button type="submit" className={buttonClass}>{step === 3 ? 'Generate my day →' : 'Continue →'}</button>
          </div>
        </form> : <>
          <p className="mb-4 text-xs text-gray-400">Fictional 2034 scenario · {profile.job} · {profile.city}</p>
          {loading && !text && <p role="status">Connecting to your future…</p>}
          <div className="whitespace-pre-wrap">{text}</div>
          {error && <p role="alert" className="mt-4 text-red-300">{error}</p>}
          {complete && <p role="status" className="mt-4 text-sm text-gray-400">Simulation complete.</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            {loading ? <button className={buttonClass} onClick={() => controllerRef.current?.abort()}>Cancel</button> : <button className={buttonClass} onClick={() => void generate()}>{error ? 'Retry' : 'Generate another day'}</button>}
            <button className={buttonClass} onClick={editProfile}>Edit profile</button>
          </div>
        </>}
      </SimulationWindow>
    </main>
  </>;
}
