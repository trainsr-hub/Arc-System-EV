---
title: "Universe 25 — Daily KPI & Quest Loop Mechanics"
created: 2026-09-11
type: game_mechanics
tags:
  - universe25/kpi
  - universe25/quests
  - codex_of_time
---
=> Bullshit. Terminate
# 🎯 Universe 25 — Daily KPI & Quest Loop Mechanics

```Heraclitus
# entry
title ~~ Daily KPI & Quest Loop Mechanics
type ~~ Game Mechanics Doctrine
status ~~ DRAFT / ACTIVE
author ~~ Faust High Command & The Manager

# tag
domain ~~ [[A00 ~ Inbox/Idea Dumps/U25 ~ Codex of Time]]
resource ~~ [[Codex of Time]]
ecosystem ~~ [[Universe 25]]

# template
date ~~ 2026-09-11
backlink ~~ [[00 ~ System Doctrine & Master Architecture]]

# system
id ~~ U25-MECH-02
```

---

> [!NOTE]
> Universe 25 bridges your daily cognitive efforts with your character's progression. Real-world tasks are assigned to specific Codex of Time tiers. Completing sessions awards **Golden Hours**, grows your **Hazard Level Odometer**, and mints **Dimensional Tickets** for the master game.

---

## 1. 📋 Task Archetypes & Codex Requirements

Not all tasks are created equal. To maintain high focus density, you must swipe a card that matches the scope of your work:

| Task Tier | Focus Archetype | Required Codex Card | Recommended Daily Target | Proof-of-Effort Output |
| :--- | :--- | :--- | :--- | :--- |
| **Micro Quest** | Email triage, brief code review, hygiene/admin | **Rank I** (`8m 32s`) | 4 sessions / day | 1x Codex Fragment |
| **Operational Quest** | Building an API endpoint, writing a UI component | **Rank II** (`17m 04s`) | 2 sessions / day | 1x Dimensional Ticket |
| **Tactical Quest** | System architecture, complex math logic, deep refactoring | **Rank III** (`34m 08s`) | 1 session / day | 2x Dimensional Tickets |
| **Imperial Challenge** | Milestone release, multi-agent engine deployment | **Rank IV / EXEED** (`51m 12s`+) | 1 session / week | 1x Gate of Babylon Gacha Roll |

---

## 2. 🧮 Scoring Formulas & Dynamic Stake

```
   [ Focus Sessions Completed ] ──► Compute Total Focus Seconds
                                         │
                                         ▼
                             [ Convert to Golden Hours ]
                                 x = Seconds / 3600
                                         │
                                         ▼
                            [ Update Hazard Odometer ]
                               y = 1.5 * ln(x + 1)
```

### 2.1. Daily Focus Score ($S_{\text{daily}}$)
At the end of each day, your total focus score is calculated:

$$S_{\text{daily}} = \left[ \sum_{i=1}^{N} \left( \text{Duration}_i \times M_{\text{tier}}(i) \right) \right] \times \text{StreakMultiplier}$$

#### Tier Multipliers ($M_{\text{tier}}$)
- **Rank I**: $1.0\times$
- **Rank II**: $1.25\times$
- **Rank III**: $1.60\times$
- **Rank IV**: $2.00\times$
- **EXEED Tiers**: $2.50\times$

#### 🔥 Streak Multiplier
Maintaining daily focus streaks provides a cumulative boost up to $1.50\times$:
$$\text{StreakMultiplier} = 1.0 + (\text{ActiveDaysStreak} \times 0.05) \quad [\text{Max: } 1.50\times]$$

---

### 2.2. Personal Hazard Level Odometer
The Hazard Level is your live gauge of total accumulated discipline. It is rendered as an unranked decimal value `y`:

$$y = 1.5 \cdot \ln(x + 1)$$
*(where $x = \text{Total Golden Hours} = \text{Total Focus Seconds} / 3600$)*

| Golden Hours Banked ($x$) | Focus Time Equivalent | Personal Hazard Level ($y$) |
| :--- | :--- | :--- |
| **1 hour** | 3,600s | **`<1.04>`** |
| **10 hours** | 36,000s | **`<3.60>`** |
| **50 hours** | 180,000s | **`<5.89>`** |
| **100 hours** | 360,000s | **`<6.92>`** |
| **500 hours** | 1,800,000s | **`<9.32>`** |

---

## 3. ⚠️ The Sloth & Interruption Penalty

> [!WARNING]
> Swiping an NFC card creates an active contract with time. If a session is aborted, canceled, or interrupted before the hardware timer reaches 0:
> 1. **Card Charge Burned**: The spent charge is permanently deducted from the card RAM.
> 2. **Time Balance Penalty**: A penalty equal to $0.5 \times \text{SessionDuration}$ is deducted from your Universal Time balance.
> 3. **Hazard Level Drop**: Because time balance decreases, your Hazard Level odometer drops immediately, reflecting lost discipline equity.

---

## 4. 🏆 Daily Ritual & Review Flow

1. **Morning Briefing**: Open your Daily Plan, review pending tasks, and assign 4–6 Codex card slots.
2. **Execution**: Place your phone/distractions aside, place the chosen NFC card on the ESP32 reader, and focus until the buzzer chimes.
3. **Evening Synthesis**: Check off completed slots in your daily note. Your Dataview telemetry table updates automatically.
