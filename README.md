**“LLM‑oriented README”** 
---

# 0 · Mission Statement (“Why does this repo exist?”)

> Build an **interactive foresight terminal** simulating a 2040‑era “archive computer.”
> Users explore speculative scenarios (Health / Education / Entertainment) inside draggable macOS‑style windows, toggle timelines (“How did this happen?”), and skim headline clippings dropped around the screen.
> **Everything**—text animation, z‑index juggling, menu‑bar gating, headline reveal—is client‑side React; the server only ships static assets.

---

# 1 · Tech Fact Sheet (key‑value, copy‑pastable)

```jsonc
{
  "frameworks": ["Next.js 15", "React 18", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
  "runtime": "Node 18 on Vercel (Edge‑runtime not required)",
  "dragLib": "react‑draggable",
  "entry": "src/app/page.tsx  // <Home/>",
  "windowSkin": "styles/mac-window.css + mac‑menubar logic",
  "stateAtoms": ["selectedCategory", "selectedOption", "happenedMode", "hoveredHappened"],
  "contentSchemas": ["data/foresightContent.ts  // canonical interface"],
  "fonts": ["Geist Sans", "Geist Mono"],
  "staticImages": "public/images/**  // 300+ png/jpg/webp headline tiles",
  "analytics": ["@vercel/analytics", "@vercel/speed-insights"]
}
```

---

# 2 · Domain Model

### 2.1 `ForesightContent` (interface)

```ts
interface ForesightContent {
  introText: string;                // typed line‑by‑line in the terminal
  options: { file: string; description: string }[];    // 3 scenario rows
  detailTexts: string[];            // 3 bodies (aligned to options[i])
  detailHeaderTemplate(file: string): string;          // top banner
  happenedConfig: {                 // “How did this happen?” pane
    header: string;
    intro: string;
    options: string[];              // timeline bullet list (length ≥4 + “Return”)
  }[];
}
```

Concrete instances:

* **healthContent.ts**
* **educationContent.ts**
* **entertainmentContent.ts**

Each file is pure data; there is **no logic** outside of `detailHeaderTemplate`.

---

# 3 · Component Primer

| Component             | Purpose                                                                                                 | Key Props / State                                              | Hotspots                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **`DraggableWindow`** | Generic window wrapper; handles z‑index bump and drag.                                                  | `id`, `initialPos`, `width/height`, `initialZIndex`            | Bumps global `zIndexCounter` in `bringToFront`.                                         |
| **`TextEditWindow`**  | The “terminal” that types text, reveals options, handles keyboard nav, *detail* & *happened* sub‑modes. | `content: ForesightContent`, callbacks for option + hover etc. | <kbd>useEffect</kbd> chain implements mini‑state‑machine. Keyboard listener lives here. |
| **`PreviewWindow`**   | Tiny image viewer (filename as title). Used only for future work.                                       | `src`, `title`, etc.                                           | Thin wrapper around `DraggableWindow` + Next `<Image/>`.                                |
| **`MacMenuBar`**      | Global menu ( File / Edit / … History / Help). Blocks items on `isHistoryPage`.                        | Callback props (`onAddHealth`, …).                             | Dropdown & submenu built without headless‑UI.                                           |
| **`HistoryClient`**   | Dedicated `/history` CSR view; embeds Issuu doc in mobile “singlePage” mode.                            | Reads `?volume=`, keeps iframe dark.                           | Wrapped in `<Suspense>` per Next 15 rule.                                               |

---

# 4 · Page Orchestrators

### 4.1 `src/app/page.tsx` (<Home/>)

1. Renders **MacMenuBar**.
2. Shows **Help** flow (two pages) until user types “yes”.
3. After a category is added via File▸Add, spawns one **TextEditWindow**.
4. Maintains the *entire* draggable layer (`windows: WindowConfig[]`).

   * Filtering logic lives in **`activeWindows`** computed property.
   * Highlight logic uses `educationOptionHighlights`, `entertainmentOptionHighlights`, etc.
5. **linkMap** turns certain draggable keys into `<a>` wrappers → opens sources in new tab.

### 4.2 `src/app/history/page.tsx`

CSR‑only page. Requirements already met (Suspense + `dynamic = "force-dynamic"` optional).

---

# 5 · Global State (React, not Redux)

| Variable           | File                       | Meaning                                              |
| ------------------ | -------------------------- | ---------------------------------------------------- |
| `selectedCategory` | page.tsx                   | `"health" \| "education" \| "entertainment" \| null` |
| `selectedOption`   | page.tsx                   | Index 0‑2 inside current category; –1 before choice  |
| `happenedMode`     | page.tsx + TextEditWindow  | Are we inside “How did this happen?” UI?             |
| `hoveredHappened`  | page.tsx + TextEditWindow  | Which timeline bullet is highlighted (0‑n)           |
| `happenedScenario` | page.tsx                   | Mirrors `selectedOption` when in happened mode       |
| `zCounter`         | page.tsx + DraggableWindow | Global max z‑index; increment on any click           |

No external store; state resets on hard reload.

---

# 6 · Window/Headline Registry

* **`windows` array** (\~350 entries) lives in `src/app/page.tsx`.
* Each entry:

```ts
{
  key: "wearable1",                // unique id
  pos: { x: 120, y: 953 },         // spawn coords
  size: { width: 700, height: 115.94 },
  type: "image" | "text",
  src?: "/images/…",               // if image
  text?: "string…"                 // if text
}
```

* Filtering matrices:

```
optionWindows              // Health main
educationOptionWindows     // Education main
entertainmentOptionWindows // Entertainment main

scenarioDraggables         // Health “happened” mode
educationScenarioDraggables
entertainmentScenarioDraggables
```

All of the above are **pure look‑up tables**; logic never mutates them.

---

# 7 · Menu‑Bar Disabling Logic

* On **/history** routes, `MacMenuBar` greys out everything except:

  * *Terminal 13.2* label (cosmetic)
  * *History* menu (opens Issuu volumes)

Implementation: compute `isHistoryPage` with `usePathname()`; apply `opacity‑50 cursor‑not‑allowed`.

---

# 8 · Animation Contracts

* **Intro typing**: `TextEditWindow` slices text every 18 ms until length reached.
* **Option reveal**: each option appears every 200 ms.
* **Detail / Happened text**: same 18 ms tick.
* **Window enter/exit**: `<AnimatePresence>` + `motion.div` (opacity/y slide).
* **Z‑index bump**: `onPointerDown` triggers `bringToFront`.

All timings are hard‑coded constants; feel free to expose as props if needed.

---

# 9 · Glossary (“You’ll see these words in code comments”)

| Term                        | Meaning                                                                        |
| --------------------------- | ------------------------------------------------------------------------------ |
| **Happened mode**           | Timeline sub‑view reached from “How did this happen?”                          |
| **Return option**           | Last bullet in every `happenedConfig.options`; pops back to main scenario list |
| **Headline Draggables**     | Image tiles that surface when hovering timeline bullets                        |
| **Option Highlight**        | Blue outline applied to selected scenario’s companion text draggables          |
| **Help flow / Page 1 vs 2** | Intro waiver → confirm “yes” → category instructions                           |

---

# 10 · Runbook

```bash
# Install
brew install yarn           # if yarn missing
yarn                         # or: corepack enable && pnpm i

# Develop
yarn dev                     # http://localhost:3000

# Lint / type‑check
next lint && tsc --noEmit

# Build / preview
yarn build && yarn start
```

Vercel deploy works out of the box (no environment vars).

---
