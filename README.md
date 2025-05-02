This is a **source‑of‑truth README** written **for a coding‑LLM** (not primarily for humans).  

---

## 0. Top‑Level Fact Sheet  *(key–value, no prose)*

```jsonc
{
  "frameworks": ["Next.js 15", "React 18", "TypeScript", "Tailwind CSS (v4)", "Framer Motion"],
  "runtime": "Node 18 on Vercel",
  "dragLib": "react‑draggable",
  "entry": "src/app/page.tsx",
  "staticAssets": "public/images/**",
  "fonts": ["Geist Sans", "Geist Mono"],
  "contentCategories": ["health", "education", "entertainment (stub)"],
  "mainInteractiveWindow": "components/TextEditWindow.tsx"
}
```

---

## 1. Domain Data Schemas —— `/data/**`

### 1.1 `ForesightContent`       *(shared TS interface)*

```ts
export interface ForesightContent {
  introText: string                              // terminal splash before options
  options: { file: string; description: string }[] // 3 (exact) scenario rows
  detailTexts: string[]                          // long text per scenario (length = options.length)
  detailHeaderTemplate: (file: string) => string // returns header block for detail page
  happenedConfig: {                              // “How did this happen?” timeline per scenario
    header: string
    intro: string
    options: string[]  // 5 rows (4 themes + “Return … Start”)
  }[]
}
```

### 1.2 Content modules

```
data/
  healthContent.ts        // fully implemented
  educationContent.ts     // fully implemented
  entertainmentContent.ts // copy‑paste placeholder (still health text)
```

Each exports `ForesightContent` populated for that category.  
**Invariant**: array lengths and ordering are hard‑wired assumptions inside `TextEditWindow`.

---

## 2. Window & Image Registry —— `windows[]` in `page.tsx`

### 2.1 Shape

```ts
type WindowConfig = {
  key: string                         // unique id, also used in linkMap / reducers
  pos: { x: number; y: number }       // absolute start coordinates
  size: { width: number|'auto'; height: number|'auto' }
  type: 'image' | 'text'
  src?: string                        // for images
  text?: string                       // for text blocks
}
```

### 2.2 Lifetime

* The global `windows` array is *static* — nothing is pushed/removed at runtime.  
* Filtering decides which configs flow into `<MotionWindow>` → `<DraggableWindow>`.

---

## 3. State Orchestration —— `src/app/page.tsx`

### 3.1 React state snapshot

| variable                   | purpose | values |
|----------------------------|---------|--------|
| `showHelp`                 | help overlay gating | boolean |
| `helpAnswer`               | raw user text for “Type yes to confirm” | string |
| `selectedCategory`         | current content domain | `"health" \| "education" \| "entertainment" \| null` |
| `selectedOption`           | scenario index inside category | `‑1` (none) … `2` |
| `happenedMode`             | in timeline sub‑page? | boolean |
| `happenedScenario`         | which scenario’s timeline | `0 … 2` |
| `hoveredHappened`          | hovered theme row inside timeline | `null … 4` |
| `zCounter` / `helpZIndex`  | bring‑to‑front bookkeeping | ints |

### 3.2 Derived window filters

```ts
// when NOT in happenedMode
(active windows) =
  if selectedCategory === 'education'
       (selectedOption < 0) ? allEducationOptionKeys
                            : educationOptionWindows[selectedOption]
  else if selectedCategory === 'health'
       (selectedOption < 0) ? allHealthWindowKeys
                            : optionWindows[selectedOption]
  else ...
// when in happenedMode
(active windows) =
  didHover ? scenarioDraggables[happenedScenario][hoveredHappened] : []
```

Everything else (animations, bring‑to‑front) is visual; no other business logic.

---

## 4. Component Contracts

```
components/
  DraggableWindow.tsx   // z‑index + react‑draggable wrapper
  MacMenuBar.tsx        // top bar, emits onAdd{Health,Education,Entertainment}
  TextEditWindow.tsx    // terminal UI; owns keyboard flow & typing animations
  PreviewWindow.tsx     // rarely used; just DraggableWindow + <Image/>
```

### 4.1 `TextEditWindow` callback matrix

| prop                     | fires when | payload |
|--------------------------|-----------|---------|
| `onOptionSelect(idx)`            | user presses **Enter** on scenario list | 0 … 2 |
| `onHappenedModeChange(bool)`     | timeline page entered / exited | true/false |
| `onHappenedHover(idx \| null)`   | hovered timeline theme row | 0 … 4 \| null |
| `onHappenedScenarioChange(idx)`  | entering timeline, tells parent which scenario | 0 … 2 |

---

## 5. Dev & Build Commands

```bash
# install
pnpm i           # or yarn install

# local dev
pnpm dev         # next dev

# type‑check & lint in CI
pnpm typecheck && pnpm lint

# prod build
pnpm build && pnpm start
```

Environment variables are **not** required; app is 100 % static + client state.

---
