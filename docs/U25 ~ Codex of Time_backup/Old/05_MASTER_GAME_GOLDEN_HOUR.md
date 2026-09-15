# 05 — Master Game: Golden Hour (Gate of Babylon)

> **Codex Reference**: `docs/05_MASTER_GAME_GOLDEN_HOUR.md`  
> **Classification**: Master Nexus & Altar Specification  
> **Status**: Review & Verification

---

## 1. Executive Summary

**Golden Hour (Gate of Babylon / Modern Day Nexus)** is the apex destination of Universe 25. It is the central treasury, summoning altar, and tactical loadout vault where the fruits of all Origin Worlds converge.

Drawing aesthetic and thematic inspiration from the Gilgamesh treasury, Golden Hour treats the player's accumulated focus and discipline as an unforgeable vault of ancient relics, celestial armaments, and elemental power.

---

## 2. The 4-Tab Imperial Architecture

The Master Game is organized into four distinct tabs:

```
+---------------------------------------------------------------------------------------+
|                                    GOLDEN HOUR                                        |
|                          (Gate of Babylon Imperial Altar)                             |
+---------------------------------------------------------------------------------------+
|  [Tab 1: Battle Arena]  |  [Tab 2: Card Packs (Altar)]  |  [Tab 3: Vault]  |  [Tab 4: Dev]    |
+---------------------------------------------------------------------------------------+
```

---

### Tab 1 — Tactical Battle Arena (Babylonian Altar Loadout)
- **Status**: Phase 1 Foundation.
- **Core Interface**:
  - **4 Tactical Equipment Slots**:
    1. *Slot 1: Primary Armament* (Offensive focus multiplier / active will).
    2. *Slot 2: Aegis Relic* (Shield against distraction / timer abort penalties).
    3. *Slot 3: Tachyon Catalyst* (Boosts Tachyon cut yields).
    4. *Slot 4: Divine Tablet* (Passive buffs and rare item drop luck).
  - **Aggregate Telemetry Display**:
    - Calculates active composite stats, total resonance power, active buffs, and dormant curses.
  - **Tactical Loadout Selector**: Modal drawer to equip items directly from Tab 3 (Purpose-Driven Vault).

---

### Tab 2 — Dimensional Card Packs (Summoning Altar — Default Tab)
- **Core Interface**:
  - The central Babylonian Summoning Altar where the player consumes **Dimensional Tickets** imported from Origin Worlds and the Codex of Time.
- **Available Card Packs (Summoning Pools)**:
  1. **Angel Roll Pack**:
     - *Cost*: $1 \times \text{Angel Roll Ticket}$ (from Vinyl Angel).
     - *Pool*: Musical treasures, acoustic relics, melody resonance tablets.
  2. **Solar Roll Pack**:
     - *Cost*: $1 \times \text{Solar Roll Ticket}$ (from Farm Alpha/Beta).
     - *Pool*: Verdant artifacts, solar stamina badges, agricultural totems.
  3. **Jurassic Roll Pack**:
     - *Cost*: $1 \times \text{Jurassic Roll Ticket}$ (from Arc Jurassic).
     - *Pool*: Prehistoric fossil relics, primal vigor gems, evolutionary cores.
  4. **Codex Roll / Master Ticket Pool**:
     - *Cost*: $1 \times \text{Codex Master Ticket}$ (minted via Tachyon Records and Epoch sessions).
     - *Pool*: Guaranteed $100\%$ drop rate for transcendent rank artifacts (`✦`, `∅`, `Ψ`).
- **Summoning Outputs**:
  - High-tier Relics & Armaments (Ranked `✦` down to `D`).
  - Cultural Lore Tablets & Artifacts.
  - **Multi-Attribute Energy Cores** (Solar, Void, Verdant, Celestial, Aether) as guaranteed baseline drops.

---

### Tab 3 — Purpose-Driven Vault (The Imperial Treasury)
- **Core Interface**:
  - Structured into three dedicated sub-galleries:
  1. **Tactical Arsenal**:
     - All battle-ready relics, weapons, and shields categorized by the 15-tier prestige matrix (`✦` to `F`).
     - Shows rank badges, dynamic visual FX (black holes, prismatic pulses), and equipment stats.
  2. **Cultural Lore & Tablets**:
     - Historical records, ancient tablets, and unlocked narrative lore fragments.
  3. **IoT Elemental Fuel Reserves**:
     - Real-time balances of all five Energy Core attributes:
       - ☀️ **Solar Fuel**
       - 🌌 **Void Fuel**
       - 🌿 **Verdant Fuel**
       - ⚡ **Celestial Fuel**
       - ✨ **Aether Fuel**
     - Fuel injector buttons to power peripheral IoT hardware sessions.

---

### Tab 4 — Dev Sandbox & Configuration
- **Core Interface**:
  - **Dev Cheat Suite**:
    - Direct time balance injector ($+1\text{h}, +10\text{h}, -1\text{h}$).
    - Dimensional Ticket dispensers (Angel, Solar, Codex, Jurassic tickets).
    - Relic generator and elemental fuel top-up sliders.
  - **System Inspector**:
    - Real-time backend connectivity telemetry (latency, tier health, active locks).
    - Database migration and schema verification tools.
    - Local state flush and reset mechanisms.

---

## 3. Visual & Aesthetic Guidelines (Gate of Babylon Style)

- **Color Palette**:
  - *Imperial Gold Primary*: `#d4af37`
  - *Imperial Gold Highlight*: `#ffd86b`
  - *Dark Portal Background*: `#0a0a0f` to `#16141e`
  - *Gold Glow Shadow*: `0 0 20px rgba(212, 175, 55, 0.4)`
- **Typography**:
  - *Headings & Titles*: `Cinzel Decorative`, `Cinzel`, serif.
  - *Body & Telemetry*: High-clarity monospace or clean sans-serif (`Inter`, `JetBrains Mono`).
- **Visual Effects**:
  - Golden border glow on hover.
  - Pulsing portal backdrop animations.
  - Interactive card flip and reveal animations during gacha summoning.
