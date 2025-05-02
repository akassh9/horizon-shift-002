## This Readme is created for LLM consumption and understandability. 

---

## 0. Top‑Level Fact Sheet *(key–value, no prose)*

```jsonc
{
  "frameworks": ["Next.js 15", "React 18", "TypeScript", "Tailwind CSS (v4)", "Framer Motion"],
  "runtime": "Node 18 on Vercel",
  "dragLib": "react-draggable",
  "entry": "src/app/page.tsx",
  "staticAssets": "public/images/**",
  "fonts": ["Geist Sans", "Geist Mono"],
  "contentCategories": ["health", "education", "entertainment (stub)"],
  "mainInteractiveWindow": "components/TextEditWindow.tsx"
}
```

---

## 1. Domain Data Schemas — `/data/**`

### 1.1 `ForesightContent` *(shared TS interface)*

```ts
export interface ForesightContent {
  introText: string                              // terminal splash before options
  options: { file: string; description: string }[] // 3 (exact) scenario rows
  detailTexts: string[]                          // long text per scenario (length = options.length)
  detailHeaderTemplate: (file: string) => string // returns header block for detail page
  happenedConfig: {                              // “How did this happen?” timeline per scenario
    header: string
    intro: string
    options: string[]  // 5 rows (4 themes + “Return … Start”)
  }[]
}
```

### 1.2 Content Modules

```
data/
  healthContent.ts        // fully implemented
  educationContent.ts     // fully implemented
  entertainmentContent.ts // copy-paste placeholder (still health text)
```

Each exports a `ForesightContent` object.  
**Invariant**: array lengths and ordering are hard-wired assumptions inside `TextEditWindow`.

---

## 2. Window & Image Registry — `windows[]` in `page.tsx`

### 2.1 Shape

```ts
type WindowConfig = {
  key: string                         // unique id, also used in linkMap / reducers
  pos: { x: number; y: number }       // absolute start coordinates
  size: { width: number | 'auto'; height: number | 'auto' }
  type: 'image' | 'text'
  src?: string                        // for images
  text?: string                       // for text blocks
}
```

### 2.2 Lifetime

- The global `windows` array is *static* — nothing is pushed/removed at runtime.
- Filtering decides which configs flow into `<MotionWindow>` → `<DraggableWindow>`.

---

## 3. State Orchestration — `src/app/page.tsx`

### 3.1 React State Snapshot

| Variable                   | Purpose | Values |
|----------------------------|---------|--------|
| `showHelp`                 | Help overlay gating | `boolean` |
| `helpAnswer`               | Raw user text for “Type yes to confirm” | `string` |
| `selectedCategory`         | Current content domain | `"health"` \| `"education"` \| `"entertainment"` \| `null` |
| `selectedOption`           | Scenario index inside category | `-1` (none) to `2` |
| `happenedMode`             | In timeline sub-page? | `boolean` |
| `happenedScenario`         | Which scenario’s timeline | `0 … 2` |
| `hoveredHappened`          | Hovered theme row inside timeline | `null … 4` |
| `zCounter` / `helpZIndex`  | Bring-to-front bookkeeping | `number` |

### 3.2 Derived Window Filters

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

Everything else (animations, bring-to-front) is visual; no additional business logic.

---

## 4. Component Contracts

```
components/
  DraggableWindow.tsx   // z-index + react-draggable wrapper
  MacMenuBar.tsx        // top bar, emits onAdd{Health,Education,Entertainment}
  TextEditWindow.tsx    // terminal UI; owns keyboard flow & typing animations
  PreviewWindow.tsx     // rarely used; just DraggableWindow + <Image/>
```

### 4.1 `TextEditWindow` Callback Matrix

| Prop                        | Fires When | Payload |
|-----------------------------|------------|---------|
| `onOptionSelect(idx)`       | User presses **Enter** on scenario list | `0 … 2` |
| `onHappenedModeChange(bool)`| Timeline page entered/exited | `true` \| `false` |
| `onHappenedHover(idx|null)` | Hovered timeline theme row | `0 … 4` \| `null` |
| `onHappenedScenarioChange(idx)` | Entering timeline view | `0 … 2` |

---

## 5. Extending the App *(step-by-step recipe)*

> LLM, follow sequentially to add a **new content category** (e.g., `"climate"`).

1. **Create data file**  
   Add `data/climateContent.ts` exporting a complete `ForesightContent` with:
   - 3 scenario rows
   - 3 detail texts
   - 3 timeline configs × 5 options each

2. **Add draggables**  
   Append new `WindowConfig` objects to global `windows[]`.  
   Group them as:

   ```ts
   const climateOptionWindows: Record<number, string[]> = { 0: [...], 1: [...], 2: [...] }
   const climateScenarioDraggables: Record<number, Record<number, string[]>> = { ... }
   ```

3. **Wire filters** in `page.tsx`  
   - Extend `selectedCategory` union type  
   - Add `allClimateWindowKeys`, and merge into relevant filter branches

4. **Expose through menu**  
   - In `MacMenuBar.tsx`, add a menu item and callback `onAddClimate`

5. **(Optional)** update dynamic highlight maps for blue ring animations

No other steps needed — animations and layout auto-adjust.

---

## 6. Dev & Build Commands

```bash
# install
pnpm i           # or yarn install

# local dev
pnpm dev         # next dev

# type-check & lint in CI
pnpm typecheck && pnpm lint

# prod build
pnpm build && pnpm start
```

> Environment variables are **not** required; the app is fully static + client-side.

---

## 7. Known TODOs *(tagged for next LLM)*

- `entertainmentContent.ts` still reuses **health** content → needs proper text.
- Link maps sometimes refer to `*...4*` keys missing in `/public/images` — verify.
- Z-index escalation inside `MotionWindow` ignores `zCounter`; `DraggableWindow` uses its own counter. Consider lifting it to React state.
- No persistent storage — refresh kills interaction context.

---