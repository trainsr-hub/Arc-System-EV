# 07 — Frontend Web-OS Architecture & UI Design System

> **Codex Reference**: `docs/07_FRONTEND_WEB_OS_ARCHITECTURE.md`  
> **Classification**: Frontend Engineering & UI Specification  
> **Status**: Review & Verification

---

## 1. Executive Summary & Tech Stack

The **Universe 25 Frontend** operates as a single-page **Web-OS** designed for zero-latency multitasking, instant app switching, and deep aesthetic immersion.

### Technology Foundation:
- **Framework**: React 18+ / React 19 (TypeScript)
- **Bundler & Tooling**: Vite + Rolldown / Oxlint for ultra-fast compilation and static verification
- **Styling Engine**: Tailwind CSS + Custom CSS Variables (Imperial Theme Tokens)
- **State Management**: Zustand with backend sync persistence middleware
- **Icons & Visuals**: Lucide React + Custom SVG VFX Filters

---

## 2. The Multi-App Keep-Alive Architecture

A core design requirement is **Zero-Cost App Switching**. When navigating between Vinyl Angel, Farm Alpha, Arc Jurassic, and Golden Hour:
- Music playback in Vinyl Angel must **never pause or stutter**.
- Form inputs and plot animations in Farm Alpha must **never unmount or lose state**.
- The 3D/CSS canvas in Golden Hour must **never re-initialize**.

### Implementation Pattern (`AppManager.tsx`):
```tsx
// All active apps remain permanently mounted in the DOM.
// Inactive apps are hidden via CSS display / offscreen transform.
export const AppManager: React.FC = () => {
  const { activeApp } = useGlobalStore();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className={activeApp === 'hub' ? 'block h-full' : 'hidden'}>
        <Hub />
      </div>
      <div className={activeApp === 'golden_hour' ? 'block h-full' : 'hidden'}>
        <GoldenHour />
      </div>
      <div className={activeApp === 'vinyl_angel' ? 'block h-full' : 'hidden'}>
        <VinylAngel />
      </div>
      <div className={activeApp === 'farm_a' ? 'block h-full' : 'hidden'}>
        <FarmA />
      </div>
      <div className={activeApp === 'farm_b' ? 'block h-full' : 'hidden'}>
        <FarmB />
      </div>
      <div className={activeApp === 'arc_jurassic' ? 'block h-full' : 'hidden'}>
        <ArcJurassic />
      </div>
    </div>
  );
};
```

---

## 3. Zustand Modular State Architecture

State is cleanly partitioned across domain-specific stores to prevent monolithic state bloat and unnecessary re-renders:

```
src/store/
├── useGlobalStore.ts       -> Active app ID, navigation history, system modals
├── useCurrencyStore.ts     -> Time balance, Golden Hours, Dimensional Tickets
├── useInventoryStore.ts    -> Relics, artifacts, equipment, and Codex cards
├── useThemeStore.ts        -> Imperial, Christmas, Valentine dynamic themes
src/apps/
├── golden-hour/store/      -> 4-slot loadout, battle arena stats, gacha rolls
├── vinyl-angel/store/      -> Active audio track, playback progress, volume
├── farm-a/                 -> Farm Alpha plot timers and hydration state
└── farm-b/                 -> Farm Beta night plot timers and harvests
```

---

## 4. The Imperial Design System (Gate of Babylon)

The visual design communicates sovereign authority, ancient gold craftsmanship, and modern cybernetic telemetry.

### 4.1. Core Palette & Aesthetic Tokens
- **Gold Primary**: `#d4af37` (Imperial Gold)
- **Gold Shimmer**: `#ffd86b` (Radiant Highlight)
- **Abyssal Base**: `#08080c` to `#12111a` (Deep Void Obsidian)
- **Border Trim**: `rgba(212, 175, 55, 0.35)` with `box-shadow: 0 0 15px rgba(212, 175, 55, 0.2)`
- **Typography**:
  - Headings: `Cinzel Decorative`, `Cinzel`, serif
  - Metrics / Code: `JetBrains Mono`, `Inter`, monospace

### 4.2. Core Shared Component Suite

| Component | Path | Functionality |
| :--- | :--- | :--- |
| **`ImperialHeader`** | `src/components/ImperialHeader.tsx` | Top bar with crown emblem, title "UNIVERSE 25 宇宙25", real-time backend health pulse, active app badges, and refresh trigger. |
| **`TelemetryBar`** | `src/components/shared/TelemetryBar.tsx` | Persistent HUD displaying Golden Hours, Hazard Odometer ($\langle a.b \rangle$), and Tachyon balance. |
| **`HazardBadge`** | `src/components/HazardBadge.tsx` | Renders the 15-tier prestige badge (`✦` to `F`) with CSS visual effects (black hole pulse, starlight shimmer). |
| **`UniversalCard`** | `src/components/shared/UniversalCard.tsx` | Card frame for gacha summons, track items, and equipment with golden border glow on hover. |
| **`AltarSlot`** | `src/components/shared/AltarSlot.tsx` | Hexagonal / bordered loadout slot for the 4 Tactical Battle Arena armaments. |
| **`Pagination`** | `src/components/Pagination.tsx` | Standard 16-item gallery page navigator with quick-jump controls. |
| **`ModalContainer`** | `src/components/shared/ModalContainer.tsx` | Backdrop-blurred modal shell for drawers, inspect dialogs, and gacha animations. |

---

## 5. Real-Time Backend Status & Error Surfacing

In compliance with the **No Silent Fallback Invariant**:
- `useBackendStatus` hook tracks live server health.
- If the backend on port `8080` disconnects:
  1. Header pulse turns from glowing green to pulsing crimson.
  2. A persistent warning banner locks state mutations.
  3. Clear diagnostic messages with retry buttons are displayed.
