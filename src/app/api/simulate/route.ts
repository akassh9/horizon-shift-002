// src/app/api/simulate/route.ts
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const runtime = 'edge'; // deploys as Edge Function

export async function POST(req: Request) {
  const { job, age, marital, city } = await req.json();

  const prompt = `
You are writing a 05:00–23:00 timeline set in **2034** inside the foresight universe below.

Nine trend tiles (cheat‑sheet)
──────────────────────────────
[H‑1] DIY Health & Wearables          – always‑on vitals, holistic insurance, data‑gig economy  
[H‑2] Cost‑Driven Care Marketplace    – DIY treatment, crypto‑health pay, shop‑compare‑save, debt‑or‑death dilemmas  
[H‑3] Human‑Upgrade Frontier          – gene edits, exo‑muscles, lifespan 100+  

[E‑1] Ideological School Choice       – curriculum culture wars, microschools, worldview checkpoints  
[E‑2] Education Arms Race             – redshirting, six‑figure admissions coaches, credential inflation  
[E‑3] Enrollment Cliff & Alt Pathways – mergers, corporate campuses, market‑priced degrees  

[ENT‑1] Fifth‑Wall Immersion          – XR venues, participatory storylines, physical fandom spaces  
[ENT‑2] AI Credits Roll               – generative scripts, synthetic idols, creativity legal fights  
[ENT‑3] Artists Are King (Again)      – direct‑to‑fan monetisation, authenticity premium, VC in indie media

Assignment
──────────
Craft a “day in the life” for:  
• Job…………… ${job}  
• Age…………… ${age}  
• Marital…… ${marital}  
• Dependents… ${city}

Output rules
────────────
1. One line per event, **ISO time stamp** \`HH:MM —\`  
2. **10–14 events**, 
3. **Second‑person, present‑tense** (e.g. “You review…”)  
4. Weave in **≥ 1 reference** from **each sector**: Health (H‑1/2/3), Education (E‑1/2/3), Entertainment (ENT‑1/2/3).  
   – Pick whichever tile(s) fit naturally with the job & family context. But never directly refer to the Trend by its name.  
5. Include at least **two events** that visibly reflect marital status & dependents.  
6. No bullet symbols (•, –, *) inside the timeline itself.
7. If the user provides a nonsensical or obviously invalid job title, age, marital status, city (e.g., "cow", "spaghetti", "your mom"), respond:
"Please provide valid parameters."

Begin.
`;

  const { textStream } = await streamText({
    model: groq('llama-3.1-8b-instant'),
    prompt,
  });

  return new NextResponse(textStream);
}
