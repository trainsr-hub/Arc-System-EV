---
title: "Universe 25 — Frontend & Web-OS Integration"
project_id: "U25"
type: "technical_spec"
status: "ACTIVE"
parent_hub: "[[00 ~ Index & Master Dashboard]]"
summary: "React / Vite Web-OS shell, Zustand stores, modular sub-apps (Arc-Jurassic, Golden Hour, Hub), and theme engine."
created: 2026-09-12
last_updated: 2026-09-12
tags:
  - project/u25
  - type/frontend_spec
  - domain/web_os
---

# 🖥️ Universe 25 — Frontend & Web-OS Integration

> **Context**: Sub-document of [[00 ~ Index & Master Dashboard]].

---

## 1. 🏛️ Architecture Overview

The Universe 25 client is built as a high-performance Web-OS interface using React 18, TypeScript, Vite, and Tailwind/Lucide systems. It manages gamified focus sessions, inventory grids, altars, and multi-world sub-games.

```
universe-25/src/
├── apps/                     # Sovereign sub-apps / game worlds
│   ├── hub/                  # Main command portal & launchpad
│   ├── golden-hour/          # Core focus & Pomodoro ledger engine
│   ├── arc-jurassic/         # Dinosaur excavation & resource progression
│   ├── artifact-codex/       # Relic inspection & codex inventory grid
│   ├── vinyl-angel/          # Audio playback & music progression
│   └── farm-a / farm-b/      # Idle resource generation sub-games
├── core/                     # AppManager, sync engine, API layer
├── store/                    # Zustand global state (inventory, currency, theme)
└── themes/                   # Dynamic theming & visual FX tokens
```

---

## 2. 🗄️ State Management Topology

- **`useInventoryStore`**: Handles local optimistic mutations for Codex consumables, fusion attempts, and inventory caps.
- **`useCurrencyStore`**: Tracks Sand of Time (Dust), Gold, and Tachyon balances.
- **`useGlobalStore`**: Tracks active focus sessions, countdown timers, and hazard levels.
- **`syncEngine`**: Provides offline-first caching and background replay to the FastAPI backend.

---

## 3. 🎨 Theme System & Visual Effects

- Supports dynamic seasonal theme engines (`default`, `christmas`, `valentine`).
- Managed through `ThemeProvider` with CSS variable token injection and custom particles/FX.
