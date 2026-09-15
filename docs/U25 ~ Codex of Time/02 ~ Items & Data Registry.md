---
title: "Universe 25 — Items & Data Registry"
project_id: "U25"
type: "item_registry"
status: "ACTIVE"
parent_hub: "[[00 ~ Index & Master Dashboard]]"
summary: "Master consumable item registry, duration tables, diminishing returns math, Sand of Time dust economy, and inventory caps."
created: 2026-09-11
last_updated: 2026-09-12
tags:
  - project/u25
  - type/item_registry
  - domain/codex_of_time
---

# ⏳ Universe 25 — Items & Data Registry

> **Context**: Sub-document of [[00 ~ Index & Master Dashboard]].

---

> [!NOTE]
> **Codex of Time** is the core consumable resource line of Universe 25. It transforms standard Pomodoro intervals into tangible, tiered game items that are consumed in the physical world via NFC card swipes to activate focus sessions.

---

## 1. ⏱️ Codex Tiers & The Law of Diminishing Efficiency

### 1.1. Core Duration Table
Durations scale non-linearly. Fusing two cards into a higher tier **always incurs a slight loss in total focus seconds** ($2 \times \text{Rank}(k) > 1 \times \text{Rank}(k+1)$). 

The value of higher ranks is not more total minutes—it is the mastery of a **longer continuous attention span**.

| Rank Tier | Duration (Seconds) | Duration (Standard) | Recipe Requirement | Efficiency vs Ingredients | Design Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Rank 0** | `150s - 180s` | **~2m 30s - 3m** | Rare Specialty Consumable | N/A | High-friction sprint; massive task completion rewards |
| **Rank I** | `512s` | **8m 32s** | Base Consumable Drop | 100% | Micro focus sprint & daily cadence |
| **Rank II** | `960s` | **16m 00s** | 2 × Rank I (`1024s`) | 93.75% | Standard operational work block |
| **Rank III** | `1800s` | **30m 00s** | 2 × Rank II (`1920s`) | 93.75% | Deep tactical immersion & architectural flow |
| **Rank IV** | `3218s` | **53m 38s** *(< 54m)* | 2 × Rank III (`3600s`) | 89.38% | Pinnacle sustained attention marathon |
| **EXEED** | Variable | **Miracle Tier** | Ultra-Rare Fusion Proc | Unique | Transcendent anomalies & rare fillers |

---

## 2. 🎒 Inventory Hard Cap (Anti-Hoarding Invariant)

Because lower ranks provide higher total raw time efficiency, an unconstrained player would naturally hoard Rank I cards indefinitely.

> [!WARNING]
> **Max Storage Cap**: A player may hold a **maximum of 100 consumables per rank tier**.
> - Once a tier reaches 100 cards, any new drops for that tier overflow or must be fused, consumed, or dissolved.
> - This forces continuous tactical decisions between time efficiency and inventory space.

---

## 3. ⚗️ Fusion, Miracle EXEEDs & Sand of Time

```
                           ┌──► Normal Upgrade: Rank(k+1)
[ 2x Rank(k) Consumables ] ┼──► Miracle Proc: EXEED Transcendence (Ultra-Rare)
                           └──► Failed Fusion: Dissolves into "Sand of Time" (Dust)
```

### 3.1. Miracle EXEED Odds
- Fusing standard cards has a base chance to proc into an **EXEED** tier.
- This chance is intentionally **extremely low and unreliable** (a genuine miracle event).
- Fusion probabilities are dynamically modulated by player luck stats and consumable luck catalysts rather than static hardcoding.

### 3.2. Sand of Time (Dust Economy)
- When a fusion attempt fails, the input consumables are not completely lost; they dissolve into **Sand of Time** (Codex Dust).
- **Sand of Time** serves as the universal crafting and trade currency to purchase:
  - Altar luck charms & catalysts
  - Re-rolls & specialty items
  - Rare consumable restoratives

---

## 4. 🔊 Acoustic Feedback & Rank Audio Cues

Every rank tier features dedicated acoustic cues upon completion:
- **Rank I**: Crisp, energetic chime signaling quick cadence.
- **Rank IV**: Deep, resonant harmonic victory theme reflecting sustained attention triumph.
- For full tactical tokusatsu/ZECT voice callout systems and the Tachyon cut-half mechanic, see [[_Archive/05 ~ Tachyon Dynamics & Zecter Timer Archetypes]].
