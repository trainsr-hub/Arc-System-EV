# 03 — Codex of Time Engine: Focus Consumables & Tachyon Mechanics

> **Codex Reference**: `docs/03_CODEX_OF_TIME_ENGINE.md`  
> **Classification**: Core Engine Specification & Focus Mathematics  
> **Status**: Review & Verification

---

## 1. Executive Summary & Strategic Intent

The **Codex of Time Engine** is the newest sovereign subsystem in Universe 25. It fundamentally redesigns traditional Pomodoro timers by transforming focus sessions into tangible, tiered inventory assets ("Codex Consumables").

Rather than passively ticking down a clock, the player activates, manages, fuses, and strategically cuts time items to extract maximum utility, mint **Tachyon Records**, and fuel the Master Ticket Pool.

---

## 2. Consumable Rank Tiers & Duration Table

Codex Consumables are structured into five distinct rank tiers:

| Rank Tier | Name | Target Duration (Seconds) | Target Duration (Minutes) | Primary Psychological Role |
| :---: | :--- | :---: | :---: | :--- |
| **0** | **Sprint** | `180 s` | 3.0 min | Micro-activation, overcoming procrastination inertia |
| **1** | **Spark** | `512 s` | ~8.5 min | Rapid single-task burst, email/doc triage |
| **2** | **Flow** | `960 s` | 16.0 min | Deep execution block, standard sub-routine |
| **3** | **Surge** | `1800 s` | 30.0 min | Extended focus, complex code engineering |
| **4** | **Epoch** | `3218 s` | ~53.6 min | Monolithic deep work session, major breakthrough block |

---

## 3. Core Mechanics & Mathematical Laws

### 3.1. The Law of Diminishing Efficiency
When combining two items of Rank $k$ to forge one item of Rank $k+1$, the resulting item contains **fewer total focused seconds** than the sum of its parents:

$$2 \times \text{Duration}(\text{Rank } k) > 1 \times \text{Duration}(\text{Rank } k+1)$$

#### Concrete Examples:
- $2 \times \text{Sprint (Rank 0)} = 2 \times 180 = 360\text{s} \longrightarrow 1 \times \text{Spark (Rank 1)} = 512\text{s}$ *(Special introductory jump)*.
- $2 \times \text{Spark (Rank 1)} = 2 \times 512 = 1024\text{s} \longrightarrow 1 \times \text{Flow (Rank 2)} = 960\text{s}$ *(Loss: 64s)*.
- $2 \times \text{Flow (Rank 2)} = 2 \times 960 = 1920\text{s} \longrightarrow 1 \times \text{Surge (Rank 3)} = 1800\text{s}$ *(Loss: 120s)*.
- $2 \times \text{Surge (Rank 3)} = 2 \times 1800 = 3600\text{s} \longrightarrow 1 \times \text{Epoch (Rank 4)} = 3218\text{s}$ *(Loss: 382s)*.

**Why:** Higher rank consumables demand sustained cognitive stamina. The diminishing duration rewards the player with higher concentration density and rare drop multipliers, but forces strategic decisions on whether to fuse or run multiple shorter blocks.

### 3.2. Hard Inventory Cap & Overflow Policy
- **Cap**: Maximum **100 consumables per rank tier**.
- **Overflow Prevention**: If an inventory tier reaches 100, no new items of that tier can be minted. The player is compelled to activate, fuse into higher tiers, or dissolve into Sand of Time.

### 3.3. Fusion Matrix & Sand of Time (Dust Economy)
- Fusing 2 identical Rank $k$ cards requires a small transaction fee.
- **Fusion Outcomes**:
  1. **Success**: Yields $1 \times \text{Rank}(k+1)$ card.
  2. **Miracle EXEED Proc**: Small percentage chance to yield $1 \times \text{Rank}(k+1)$ card + bonus Tachyon shards.
  3. **Dissolution / Failure**: If a fusion fails, the cards dissolve into **Sand of Time (Dust)**.
- **Sand of Time**: Used in the Codex shop to buy consumable catalysts, luck amplifiers, and emergency timer protection shields.

### 3.4. Single-Active-Timer Concurrency Lock
Only **one focus session may be active at any given moment across all devices**. Attempting to activate a second card while a session is running returns an immediate concurrency error (`409 Conflict`).

---

## 4. Tachyon Dynamics & The Cut-Half Mechanism

If a focus session is interrupted by high-priority real-world demands or early task completion, the player does not lose their progress. Instead, they can execute a **Tachyon Cut**.

### 4.1. Rules of the Cut-Half
- An active timer can be cut in half up to a maximum of **4 times** ($N_{\text{cuts}} \le 4$).
- Each cut halves the remaining duration immediately.
- The discarded seconds are not destroyed—they are transmuted into **Tachyon Records**.

### 4.2. Tachyon Record Yield Formula
$$\text{Record} = \left(1 + 0.1 \cdot N_{\text{cuts}}\right) \times \text{Seconds Discarded}$$

Where:
- $N_{\text{cuts}} \in \{1, 2, 3, 4\}$ is the total number of cuts performed in the session.
- $\text{Seconds Discarded}$ is the duration eliminated by the cut.

### 4.3. The Master Ticket Pool
- Tachyon Records are poured into the **Master Ticket Pool**.
- The Master Ticket Pool guarantees a $100\%$ drop rate for the rarest collection items and ancient tablets in the Master Game (Golden Hour).

---

## 5. Persistence Schema (SQLite)

The Codex of Time engine operates with three core SQLite tables:

### 5.1. Codex Inventory Table
```sql
CREATE TABLE IF NOT EXISTS codex_inventory (
    id TEXT PRIMARY KEY,
    rank_tier INTEGER NOT NULL,          -- 0: Sprint, 1: Spark, 2: Flow, 3: Surge, 4: Epoch
    duration_seconds INTEGER NOT NULL,
    charges_remaining INTEGER NOT NULL DEFAULT 1,
    max_charges INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5.2. Focus Sessions Ledger
```sql
CREATE TABLE IF NOT EXISTS focus_sessions (
    session_id TEXT PRIMARY KEY,
    card_id TEXT,
    rank_tier INTEGER NOT NULL,
    planned_seconds INTEGER NOT NULL,
    actual_seconds INTEGER NOT NULL,
    cuts_count INTEGER DEFAULT 0,
    tachyon_records_minted REAL DEFAULT 0,
    status TEXT NOT NULL,                -- 'ACTIVE', 'COMPLETED', 'ABORTED'
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP
);
```

### 5.3. Economy & Tachyon Ledger
```sql
CREATE TABLE IF NOT EXISTS economy_ledger (
    key TEXT PRIMARY KEY,
    total_golden_hours REAL DEFAULT 0.0,
    current_hazard_level REAL DEFAULT 0.0,
    tachyon_pool_seconds REAL DEFAULT 0.0,
    sand_of_time_balance REAL DEFAULT 0.0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 6. API Endpoints Contract (FastAPI)

All Codex operations are exposed via high-performance REST endpoints:

- `POST /api/v1/codex/activate`: Initializes an active focus session for a given card ID/tier. Locks concurrency mutex.
- `POST /api/v1/codex/cut-half`: Executes a cut on the active timer, minting Tachyon Records based on the formula.
- `POST /api/v1/codex/complete`: Validates elapsed time, awards Golden Hours, updates the Hazard Odometer ($y = \ln(x+1)$), and unlocks gacha fragments.
- `POST /api/v1/codex/abort`: Immediately cancels the session, unlocks concurrency, and applies a Sloth penalty.
- `POST /api/v1/codex/fuse`: Consumes 2 identical rank cards; executes fusion logic (Success / Miracle / Sand of Time).
- `GET /api/v1/codex/inventory`: Returns current consumable counts per tier (enforcing the 100 cap).
- `GET /api/v1/codex/telemetry`: Returns real-time Hazard Level, Golden Hours, and Tachyon Pool balances.
