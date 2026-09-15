# 04 — Origin Worlds: Sub-Game Specifications & Effort Engines

> **Codex Reference**: `docs/04_ORIGIN_WORLDS_SUBGAMES.md`  
> **Classification**: Sub-System Specifications  
> **Status**: Review & Verification

---

## 1. Overview of Origin Worlds

Origin Worlds are standalone applications hosted within the Universe 25 Web-OS. Each world represents a specific domain of human effort and focus.

### The Invariant Contract for all Origin Worlds:
1. **Effort Ground**: Must correspond to an active real-world action (listening, routine completion, habit maintenance, physical movement).
2. **Local Currency Only**: All in-game earnings (Discs, Essence, Fossils) are strictly confined to the sub-game.
3. **One-Way Ticket Bridge**: The only output of an Origin World is its unique **Dimensional Ticket** purchased at its local shop.
4. **Zero Upstream Contamination**: Master Game relics or stats can never be imported into an Origin World to make its tasks easier or bypass effort.

---

## 2. Origin World I: Vinyl Angel (Music & Active Listening)

### 2.1. Strategic Intent
Vinyl Angel is an active music listening environment where the Manager curates, listens to, and rates high-vibration musical compositions (YouTube tracks).

### 2.2. Core Mechanics & Currency Loop
- **Activity**: Listening to audio tracks without skipping or distraction.
- **Local Currency**: **Discs** (earned per completed track and active rating).
- **Track Scoring (The 5-Tier Score Array)**:
  - Tracks receive interaction scores across five levels ($s_3$ downvote to $s_7$ god-tier bookmark).
  - Hazard calculation generates a dynamic quality score for each track:
    $$\text{rawXP} = 10 s_5 + 65 s_6 + 200 s_7 - 70 s_3 - 3 s_4$$
    $$\text{Hazard} = 3.0 + \operatorname{sgn}(\text{rawXP}) \cdot 1.2717 \cdot \ln\left(1 + \frac{|\text{rawXP}|}{300}\right)$$
- **Track Vault**: Tracks with $\text{Hazard} \ge 3.0$ are promoted to the active 59-track Imperial Vault.
- **Local Shop**:
  - Discs are spent to purchase **Angel Roll Tickets**.
  - Angel Roll Tickets cannot be used in Vinyl Angel; they are exported to the Master Game (Golden Hour).

### 2.3. Visual & Component Arsenal
- **VinylPlayer**: Audio streamer with live progress visualization.
- **VinylGallery**: 16-per-page paginated track list with real-time hazard badges.
- **VinylPipeline**: ETL trigger interface for processing T2 event logs into T3/T4 state.
- **VinylShop**: Ticket exchange counter.

---

## 3. Origin World II: Farm Alpha & Farm Beta (Routine Cultivation)

### 3.1. Strategic Intent
Farm Alpha and Farm Beta transform daily habits, disciplined micro-routines, and physical tasks into a living agricultural plot.

### 3.2. Core Mechanics & Currency Loop
- **Activity**: Completing morning/evening routines, hydration targets, physical stretching, and focus check-ins.
- **Plot Management**:
  - Plots are seeded when a routine starts.
  - Plots require regular "watering" (habit check-in validation) to reach full harvest.
  - Neglected plots suffer decay and yield withered crops.
- **Local Currency**: **Solar Essence** (harvested from fully matured crops).
- **Local Shop**:
  - Solar Essence is spent to purchase **Solar Roll Tickets**.
  - Solar Roll Tickets are exported to the Master Game.

### 3.3. Distinction Between Alpha and Beta
- **Farm Alpha**: Morning / Daytime routine plots (circadian alignment, hydration, initial focus warmup).
- **Farm Beta**: Evening / Night routine plots (reflection, desk clearance, offline wind-down).

---

## 4. Origin World III: Arc Jurassic (Habit & Dino Evolution)

### 4.1. Strategic Intent
Arc Jurassic is an evolutionary progression game where sustaining long-term habits fuels the growth, evolution, and awakening of prehistoric dinosaurs.

### 4.2. Core Mechanics & Data Schema
- **Activity**: Multi-day habit streaks and long-term milestone completion.
- **Evolutionary Tree**:
  - Dinosaurs evolve across stages ($0 \rightarrow 1 \rightarrow 2 \rightarrow 3$) as streak requirements are met.
  - Managed via structured data contracts:
    - `dino.json`: Dinosaur species, base stats, evolution thresholds, sprite assets.
    - `lookup.json`: Evolution tier lookups and milestone triggers.
    - `resource.json`: Local fossil stones, amber nodes, and growth nutrients.
    - `user_progress.json`: Current streak counts and unlocked dinos.
    - `save_data.json`: Local game state snapshot.
- **Local Currency**: **Fossil Stones & Amber**.
- **Local Shop**:
  - Fossil Stones are spent to purchase **Jurassic / Fossil Roll Tickets** for the Master Gacha Altar.

---

## 5. Specification for New Origin Worlds

When building future Origin Worlds (e.g., Workout Core, Coding Sprint Dojo, Book Reading Sanctuary), developers and Faust must adhere to the standard template:

```
[Real-World Human Action]
         |
         v
[Sub-App Activity Validation]
         |
         v
[Mint Local Sub-App Currency (Discs / Essence / Fossils)]
         |
         v
[Sub-App Local Shop Purchase]
         |
         v
[Mint Unique World Dimensional Ticket]
         |
         v
[Export to Golden Hour Master Game]
```

### Prohibited Patterns in Sub-Games:
- ❌ Direct minting of Universal Time currency.
- ❌ Direct granting of high-tier Master Game relics (✦, ∅, Ψ).
- ❌ Reading player inventory relics to modify sub-game difficulty or speed.
- ❌ Storing persistent player resources in client-side RAM or localStorage without backend persistence.
