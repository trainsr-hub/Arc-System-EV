# Universe 25 — Master Architecture & Documentation Index

> **Codex Designation**: Universe 25 Master Architecture  
> **Status**: Comprehensive Engineering Blueprint & System Specification  
> **Primary Authority**: The Manager  
> **Executive Intelligence**: Faust  
> **Workspace Anchor**: `D:\My Drive\SandBox Projetcs`

---

## 1. Executive Summary

**Universe 25** is an integrated gamification operating system, focus economy, and sovereign self-discipline nexus. It unifies real-world discipline, active engagement, and focus sessions into an anti-inflationary economic loop.

Traditional productivity tools fail due to lack of tangible stakes, ungrounded rewards, and disconnected progress. Universe 25 solves this by decoupling **Origin Worlds (Effort Engines)** from a **Central Master Game (Golden Hour / Gate of Babylon)** via an unforgeable Proof-of-Effort currency token system (Dimensional Tickets, Golden Hours, Hazard Odometers, and the Codex of Time).

---

## 2. Master Documentation Directory

This documentation suite captures all system knowledge, mathematical specifications, backend architectures, frontend standards, and operational invariants. Review and adjust any section to align with the master vision.

| Document | File Path | Focus Area |
| :--- | :--- | :--- |
| **01. Gamification Core Vision** | [`docs/01_GAMIFICATION_CORE_VISION.md`](./01_GAMIFICATION_CORE_VISION.md) | Origin Worlds vs. Master Game, Proof-of-Effort loop, anti-inflation rules. |
| **02. Economic Engine & Math** | [`docs/02_ECONOMIC_ENGINE_AND_MATHEMATICS.md`](./02_ECONOMIC_ENGINE_AND_MATHEMATICS.md) | Golden Hours, Hazard Odometer ($y = 1.5\ln(x+1)$), Rank Tiers, IoT Elemental Cores. |
| **03. Codex of Time Engine** | [`docs/03_CODEX_OF_TIME_ENGINE.md`](./03_CODEX_OF_TIME_ENGINE.md) | Focus consumables, Law of Diminishing Efficiency, Fusion Matrix, Tachyon Cuts. |
| **04. Origin Worlds (Sub-Games)** | [`docs/04_ORIGIN_WORLDS_SUBGAMES.md`](./04_ORIGIN_WORLDS_SUBGAMES.md) | Specs for Vinyl Angel, Farm Alpha, Farm Beta, Arc Jurassic, and future modules. |
| **05. Master Game: Golden Hour** | [`docs/05_MASTER_GAME_GOLDEN_HOUR.md`](./05_MASTER_GAME_GOLDEN_HOUR.md) | 4-Tab Imperial Altar: Battle Arena, Gacha Altar, Purpose-Driven Vault, Dev Sandbox. |
| **06. Backend 5-Tier Data Engine** | [`docs/06_BACKEND_DATA_STORAGE_ENGINE.md`](./06_BACKEND_DATA_STORAGE_ENGINE.md) | Blue Rose 5-tier SQLite architecture, ETL pipeline, API Gateway (`/api/v1/execute`). |
| **07. Frontend Web-OS Architecture** | [`docs/07_FRONTEND_WEB_OS_ARCHITECTURE.md`](./07_FRONTEND_WEB_OS_ARCHITECTURE.md) | Vite/React/TS Web-OS, Keep-Alive zero-cost tab mounting, Imperial Gold design system. |
| **08. System Invariants & Daemons** | [`docs/08_SYSTEM_INVARIANTS_AND_DAEMONS.md`](./08_SYSTEM_INVARIANTS_AND_DAEMONS.md) | Core Engineering Triad, Zero-LLM Primacy, D:\ Storage Invariant, Audio/Telegram Daemons. |

---

## 3. High-Level System Architecture Diagram

```
+---------------------------------------------------------------------------------------+
|                                     THE MANAGER                                       |
|                  (Strategic Commander, Architect, Supreme Authority)                  |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
|                                    FAUST INTELLECT                                    |
|              (Unified Multi-Body Distributed Intelligence, Analytical C2)             |
+---------------------------------------------------------------------------------------+
                                           |
    +--------------------------------------+--------------------------------------+
    |                                                                             |
    v                                                                             v
+------------------------------------+                         +------------------------------------+
|     ORIGIN WORLDS (SUB-GAMES)      |                         |      CODEX OF TIME ENGINE          |
|         (Effort Engines)           |                         |      (Focus Time Gamification)     |
|------------------------------------|                         |------------------------------------|
| - Vinyl Angel (Active Listening)   |                         | - Consumables (Ranks 0 to 4)       |
| - Farm Alpha / Beta (Routines)     |                         | - Diminishing Efficiency Fusion    |
| - Arc Jurassic (Habits/Evolution)  |                         | - Tachyon Records & Cuts           |
|                                    |                         | - Sand of Time (Dust Economy)      |
| Yields: Local Resources (Discs,    |                         |                                    |
| Solar Essence, Fossil Stones)      |                         | Yields: Golden Hours, Tachyons,    |
| -> Purchases: Dimensional Tickets  |                         | Hazard Progress, Codex Relics      |
+------------------------------------+                         +------------------------------------+
                   \                                                             /
                    \                                                           /
                     \                                                         /
                      v                                                       v
+---------------------------------------------------------------------------------------------------+
|                                 MASTER GAME: GOLDEN HOUR                                          |
|                               (Gate of Babylon Imperial Altar)                                    |
|---------------------------------------------------------------------------------------------------|
| Tab 1: Tactical Battle Arena       | Tab 2: Dimensional Card Packs (Gacha Summoning Altar)        |
| - 4 Altar Loadout Slots            | - Angel Roll / Solar Roll / Codex Roll                       |
| - Relic Stats, Buffs & Curses      | - Yields Treasures, Artifacts, and IoT Elemental Fuel        |
|------------------------------------+--------------------------------------------------------------|
| Tab 3: Purpose-Driven Vault        | Tab 4: Dev Sandbox & Config                                  |
| - Tactical Arsenal (Item Ranks)    | - Real-time state inspection, cheat injectors, health audit  |
| - Cultural Lore & Tablets          | - Backend DB synchronizer                                    |
| - IoT Elemental Fuel Reserves      |                                                              |
+---------------------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------------------+
|                                BACKEND STORAGE ENGINE (BLUE ROSE)                                 |
|                                (FastAPI Gateway on Local Port 8080)                               |
|---------------------------------------------------------------------------------------------------|
| Tier 1: Static Metadata (_1_static.db)      | Tier 2: Event Buffer (_2_events.jsonl)               |
| Tier 3: State Matrices (_3_state.db)         | Tier 4: Projected Display Tier (_4_display.db)        |
| Tier 5: Engine Config (_5_config.db)        | System: Rawinfo, Blacklist, Bad-KPI DBs              |
+---------------------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------------------+
|                                   DAEMON ECOSYSTEM & C2                                           |
|---------------------------------------------------------------------------------------------------|
| - Faust Resident Acoustic Daemon (Port 20129): Low-latency vocal presence via sound.speak()        |
| - Telegram Dumb I/O Daemon (Port 20130): Milestone notification telemetry via telegram.notify()   |
| - Watchdog Process Supervisor: Zero-LLM deterministic process monitor and keep-alive              |
+---------------------------------------------------------------------------------------------------+
```

---

## 4. Operational Context Protocol

Under this documentation-driven structure:
1. **Repository Authority**: All canonical project knowledge is stored within these markdown specifications in `docs/`.
2. **On-Demand Retrieval**: Faust retrieves, cites, and follows specifications by reading these files directly, minimizing unnecessary context bloat in persistent session memory.
3. **Manager Fine-Tuning**: Any modifications made by the Manager to these documents immediately serve as the new single source of truth for all subsequent engineering tasks.
