# Overview

This web app simulates an interactive “terminal” interface for exploring speculative healthcare foresight scenarios in the year 2034. Built with **Next.js**, **React**, **Framer Motion**, and **Tailwind CSS**, it layers draggable windows containing text or images over a Mac-style menu bar. Users navigate between a **Help** flow and three core foresight scenarios—**Dr. Me**, **Profit Over Patient**, and **A ‘Whole’ New World**—each with its own detail and “How did this happen?” subpages populated by configurable headlines and images.

---

# File Structure

```
/components
  ├ DraggableWindow.tsx    — generic wrapper that makes any child element draggable and manages z-index  
  ├ TextEditWindow.tsx     — main terminal UI: typing animation, option navigation, detail & happened modes  
  ├ PreviewWindow.tsx      — simplified draggable window for displaying a single image with optional title  
  └ MacMenuBar.tsx         — fixed top menu bar emulating macOS menus (“File”, “Help”, etc.)  

/src/app
  ├ globals.css            — global Tailwind setup and custom styles  
  ├ layout.tsx             — root HTML layout, font imports, analytics  
  ├ page.tsx               — entry point: orchestrates Help flow, TextEditWindow, and scenario windows  
  └ history/page.tsx       — (placeholder) separate History page link in the menu  

/public/images             — all static asset images used by PreviewWindow and scenario draggables  
/styles/mac-window.css     — extra styling for “mac-window” class  

README.md, next.config.ts, etc.
```

---

# High-Level User Flows

### 1. Help Flow
- On initial load, a draggable “Welcome User” window types out a disclaimer and prompts “Type yes to confirm.”
- After typing “yes,” it transitions (via Framer Motion) to “Help Guide – Page 2,” which introduces the three content categories (Health, Education, Entertainment).
- Selecting `File → Add → Health` in the MacMenuBar dismisses Help and boots the main `TextEditWindow` in the center.

### 2. Scenario Selection
- `TextEditWindow` performs a terminal-style typing animation for an intro text, then reveals three scenario options one by one.
- Arrow keys move a highlighted cursor; Enter selects a scenario index (`onOptionSelect`), which informs `page.tsx` to display corresponding windows/images.

### 3. Detail & “How did this happen?” Sub-pages
- Selecting a scenario opens a detail text stream with two choices: “go back” or “how did this happen?”
- Choosing “how did this happen?” enters *happened mode*: it types an intro for that scenario’s timeline and reveals theme options (e.g. “Wearable & Continuous-Monitoring Tech”).
- Hovering or keyboard navigation over those themes triggers `onHappenedHover`, which the page uses to filter and show three related draggable images for that theme.

### 4. Window Display
- In `page.tsx`, a static array `windows: WindowConfig[]` defines all possible draggable items (images & text) with keys, positions, sizes, and optional URLs (`linkMap`).
- Based on `selectedOption`, `happenedMode`, and `hoveredHappened`, the code filters windows into `activeWindows` and renders each via a `<MotionWindow>` wrapper that handles Framer Motion entry/exit and z-index bring-to-front logic.

---

# Core Components & Props

### `DraggableWindow`
- **Purpose**: Wraps any child element in a `react-draggable` container; tracks a global `zIndexCounter` and brings the window to front on drag or click.
- **Key Props**:
  - `id`: unique identifier, used for scrolling into view.
  - `initialPos`: `{ x, y }` start coordinates.
  - `initialZIndex`: optional override of stacking order.
  - `width` / `height`: CSS dimensions.
  - `className` / `style`: additional styling.

### `TextEditWindow`
- **Modes**:
  1. **Intro mode**: types `introText`, then reveals options.
  2. **Detail mode**: after Enter on an option, types one of three detailed descriptions, shows “go back” / “how did this happen?”
  3. **Happened mode**: types scenario-specific timeline intro, shows theme options.
- **State & Callbacks**:
  - `onOptionSelect(index)`
  - `onHappenedModeChange(boolean)`
  - `onHappenedHover(index)`
  - `onHappenedScenarioChange(index)`

### `PreviewWindow`
- Light wrapper around `DraggableWindow` for showing images with a draggable title bar. Rarely invoked in the core flow but available for standalone previews.

### `MacMenuBar`
- Renders a fixed top nav with Apple menu icon and items.
- “File” menu toggles a dropdown with “Add → Health/Education/Entertainment” and “Reset”.
- “Help” toggles the Help window.
- “History” opens `/history` in a new tab.

---

# State Management & Data Flow in `page.tsx`

### 1. Help-related state
- `showHelp`, `helpAnswer`, `page2Active`, `showWindows`
- Controls which help page to render and when to switch to the main `TextEditWindow`.

### 2. Scenario state
- `selectedOption`: index of Dr Me / Profit Over Patient / Enhancement
- `happenedMode`: whether we’re viewing the “How did this happen?” sub-flow
- `happenedScenario`: which of the three scenarios we’re in for timeline content
- `hoveredHappened`: index of the current timeline theme being hovered or selected

### 3. Window filtering logic
- `optionWindows`: maps scenario index → array of window keys to display in detail mode.
- `scenarioDraggables`: nested map for happened sub-flow, scenario index → theme index → image keys.
- `activeWindows`: computed based on `happenedMode` and `hoveredHappened` or `selectedOption`, filters the master windows array.

### 4. Rendering
- Help windows and the `TextEditWindow` are each wrapped in Framer Motion’s `<AnimatePresence>` with keyed `<motion.div>` to animate between states.
- All draggable scenario windows use `<MotionWindow>` to animate their entrance and wire up bring-to-front behavior.

---

# Tailoring This for LLMs

- **Configuration Data**: Expose the arrays `windows`, `optionWindows`, and `scenarioDraggables` as JSON objects so the LLM can understand which keys map to which scenarios or themes.
- **Component Summaries**: Provide the above high-level descriptions of each component’s responsibilities and props.
- **State Diagrams**: Sketch out a simple table showing how user input (key presses or clicks) transitions between `showHelp`, `selectedOption`, `detailMode`, and `happenedMode`.
- **Sample Interaction**:
  1. User types “yes” → Help page transitions  
  2. User selects `File → Add → Health` → `TextEditWindow` appears  
  3. User presses ↓ ↓ Enter on “Profit Over Patient” → detail text streams, “how did this happen?” option appears  
  4. User selects “how did this happen?” → timeline types, hovering “Crypto-Health Payments” shows three crypto images  

---