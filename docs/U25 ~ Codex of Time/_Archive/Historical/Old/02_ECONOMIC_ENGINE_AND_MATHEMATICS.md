# 02 — Economic Engine & Mathematical Models

> **Codex Reference**: `docs/02_ECONOMIC_ENGINE_AND_MATHEMATICS.md`  
> **Classification**: Mathematical Specifications & Economic Constants  
> **Status**: Review & Verification

---

## 1. Universal Time & The Golden Hours Anchor

At the core of the entire Universe 25 economy is **Time**. Time cannot be minted arbitrarily; it is anchored directly to real-world focus and discipline.

### Mathematical Representation
Let $T$ be the total stored Universal Time in seconds.
$$\text{Golden Hours } (x) = \frac{T}{3600}$$

Golden Hours ($x$) serve as the non-linear input for the personal Hazard Level and time-locked purchases.

---

## 2. Personal Hazard Level (The Player's Odometer)

### 2.1. The Hazard Formula
The player's personal Hazard Level is an unranked, continuous mathematical odometer derived from active Golden Hours:

$$y = 1.5 \cdot \ln(x + 1) \quad (x \ge 0)$$

If $x < 0$, $y = 0.0$.

*(Note: In the pure Codex of Time kernel variant, the baseline equation is $y = \ln(x + 1)$; the $1.5$ multiplier is the tuned scale factor for the master UI)*.

### 2.2. Visual & Philosophical Principles
1. **Unranked Decimal Representation**:
   - The Hazard Level is displayed strictly as a plain decimal number: $\langle a.b \rangle$ (e.g., `4.7`, `11.3`, `0.0`).
   - It has **no rank badge**, **no rank title**, and **no rank label** (e.g., never "Rank A", never "Bronze").
2. **The Quiet Personal Odometer**:
   - The user looks at their Hazard Level and knows exactly what it cost in real hours of life.
   - Eliminates the psychological trap of "stuck at rank X" and avoids gamified title inflation.
3. **Dynamic Stakes Economy**:
   - Earning time raises the Hazard Level.
   - Spending or burning time immediately lowers the Hazard Level in real-time.
   - This creates real, palpable stakes: every second spent on consumables or rolls visibly reduces the odometer.
4. **Practical Horizon**:
   - A Hazard Level of $15.0$ represents approximately $10$ years of sustained, daily 6-hour intense focus ($\approx 22,000$ hours). There is no artificial hard cap.

---

## 3. Rank Tiers (Exclusively for Collection Items)

While the user remains an unranked decimal, **all gacha treasures, equipment, relics, and music tracks possess explicit Rank Tiers**.

### 3.1. The 15-Tier Prestige Hierarchy

| Tier Category | Tier Symbol / Notation | Rarity Class | Visual FX / Theme |
| :--- | :--- | :--- | :--- |
| **Cosmic Transcendence** | `✦` | Artifact of Eternity | Blinding Starlight / Prismatic Pulse |
| **Singularity** | `∅` | Void Sovereign | Gravitational Event Horizon / Deep Purple Black Hole |
| **Paragon** | `Ψ` | Psionic Monarch | Psionic Ripple / Azure Gold Aurora |
| **Imperial High Tiers** | `S₄` | Imperial Apex | Crimson Flame / High Gold Aura |
| | `S₃` | Grand Master | Radiant Gold Shimmer |
| | `S₂` | High Adept | Polished Gold Border |
| | `S₁` | Master | Fine Amber Glow |
| **Standard Tiers** | `A⁺` | Elite Superior | Vibrant Emerald |
| | `A` | Elite | Forest Jade |
| | `B⁺` | Veteran | Deep Sapphire Blue |
| | `B` | Skilled | Cerulean Blue |
| | `C⁺` | Apprentice | Warm Bronze |
| | `C` | Novice | Weathered Copper |
| | `D` | Initiate | Muted Steel Slate |
| **Sub-Threshold** | `F` | Degraded / Purged | Rust / Dark Iron (Score $< 2.0$) |

### 3.2. Separation of Player and Items
- **Player**: Unranked decimal odometer $\langle a.b \rangle$.
- **Inventory & Vault**: Tiered, ranked, and showcased in prestige galleries.
- **Psychological Effect**: The player is never judged by a label; only their collected arsenal carries prestige.

---

## 4. Multi-Attribute Energy Cores (IoT Fuel Economy)

In addition to relics and equipment, the Master Gacha Altar dispenses **Multi-Attribute Energy Cores** across five elemental affinities.

### 4.1. The Five Elemental Attributes
1. **Solar (Sun/Fire)**: Bright amber energy. Used for daytime ambient lighting and alertness peripheral feeds.
2. **Void (Dark/Gravity)**: Deep violet energy. Used for deep night focus modes and minimal distraction feeds.
3. **Verdant (Nature/Earth)**: Emerald green energy. Used for break timers and biological rest intervals.
4. **Celestial (Sky/Aether)**: Luminous cyan energy. Used for high-output sprint states and milestone beacons.
5. **Aether (Pure Spirit)**: Crystalline white-gold energy. Used for system-wide overclock and master hardware sync.

### 4.2. IoT Hardware Binding
- Energy Cores are not static collectibles—they are spent as consumable fuel to drive physical room IoT devices (smart lamps, secondary monitor telemetry displays, LED ambient strips).
- Transforms digital discipline into tangible physical ambiance in the Manager's workstation.

---

## 5. Music Track Hazard Mathematics (Vinyl Angel & Blue Rose Engine)

Tracks ingested into the Vinyl Angel library (Blue Rose storage engine) are scored dynamically based on user engagement metrics:

### 5.1. Raw XP Equation
Let $s_3, s_4, s_5, s_6, s_7$ represent the interaction score counts (from downvotes to exceptional bookmarks):
$$\text{rawXP} = 10 s_5 + 65 s_6 + 200 s_7 - 70 s_3 - 3 s_4$$

### 5.2. Logarithmic Hazard Score
The track's Hazard Score is calculated via:
$$c = \frac{5.0}{\ln(51)} \approx 1.2717$$
$$\text{Hazard} = 3.0 + \operatorname{sgn}(\text{rawXP}) \cdot c \cdot \ln\left(1 + \frac{|\text{rawXP}|}{300}\right)$$

### 5.3. ETL Eligibility Thresholds
- **Hazard $\ge 3.0$**: Eligible for the Imperial Vault Display (currently 59 curated master tracks).
- **Hazard $< 2.0$**: Track is classified as Bad KPI and purged to `system/bad_kpi_list.db`.
