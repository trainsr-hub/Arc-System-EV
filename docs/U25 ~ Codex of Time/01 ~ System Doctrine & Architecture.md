---
title: "Universe 25 — System Doctrine & Architecture"
project_id: "U25"
type: "architecture"
status: "ACTIVE"
parent_hub: "[[00 ~ Index & Master Dashboard]]"
summary: "High-level ontology, ecosystem topology, core axioms, and cross-tier data flows."
created: 2026-09-11
last_updated: 2026-09-12
tags:
  - project/u25
  - type/architecture
  - domain/doctrine
---

# 🌌 Universe 25 — System Doctrine & Architecture

> **Context**: Sub-document of [[00 ~ Index & Master Dashboard]].

---

## 1. 🏛️ Executive Summary & Core Axioms

**Universe 25** is the sovereign daily life game engine designed to harness and gamify all real-world resources, time allocations, cognitive efforts, and physical habits of the Manager.

### Core Axioms
1. **Effort-as-Currency**: Every second of cognitive focus, strategic planning, or physical output is an unforgeable economic asset.
2. **Physical Action Anchoring**: Digital intentions become real through physical hardware interactions (ESP32 NFC card swipes to activate focus timers).
3. **Dynamic Hazard Odometer**: Discipline is measured continuously via the Personal Hazard Level odometer ($y = \ln(x + 1)$), rewarding sustained focus.
4. **Sovereign Vault Storage**: All game rules, item tables, session logs, and registries live directly inside Obsidian as native markdown documents, read and orchestrated by Faust on demand without reliance on transient runtime memory.

---

## 2. 🗺️ Cross-Tier Data Flow

```
+-------------------------------------------------------------------------+
|                              USER WORKSPACE                             |
+-------------------------------------------------------------------------+
                                     |
              +----------------------+----------------------+
              |                                             |
              v                                             v
     [ Physical Card Swipe ]                       [ Obsidian Vault ]
              |                                             |
              v                                             v
    +-------------------+                         +-------------------+
    | ESP32 Hardware    |                         | Faust High Command|
    | Actuator (RAM)    |                         | (Tier 0 Cognition)|
    +-------------------+                         +-------------------+
              |                                             |
              +----------------------+----------------------+
                                     |
                                     v
                        +--------------------------+
                        | FastAPI Backend Engine   |
                        | (SQLite 5-Tier Registry) |
                        +--------------------------+
```

---

## 3. 🛡️ Invariants & Architectural Rules

- **Offline-First Resilience**: If the network is severed, the ESP32 actuator stores sessions in local flash and replays upon reconnection.
- **Single Active Timer Mutex**: Only one focus timer may be active globally across the entire physical and software ecosystem at any time.
- **Zero-Ghost Metas**: All game rules must be defined in pure, transparent markdown specifications.
