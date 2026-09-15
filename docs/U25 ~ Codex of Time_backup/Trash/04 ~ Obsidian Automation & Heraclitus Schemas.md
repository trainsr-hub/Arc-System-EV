---
title: "Universe 25 — Obsidian Automation & Heraclitus Schemas"
created: 2026-09-11
type: automation_schema
tags:
  - universe25/automation
  - universe25/templater
  - codex_of_time
---
=> Terminate
# ⚙️ Universe 25 — Obsidian Automation & Heraclitus Schemas

```Heraclitus
# entry
title ~~ Obsidian Automation & Heraclitus Schemas
type ~~ Automation & Template Standard
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
id ~~ U25-AUTO-04
```

---

> [!NOTE]
> This document provides copy-pasteable **Heraclitus schemas**, **Templater daily plan templates**, and **Dataview queries** for your daily gameplay. Everything here is self-contained so you can modify and adapt it at any time.

---

## 1. 📜 Heraclitus Block Standard for Focus Sessions

Whenever a Codex session is completed or planned in your daily notes, format it using the ````Heraclitus```` codeblock:

```Heraclitus
# entry
title ~~ Morning Deep Refactor
tier ~~ Rank III
duration ~~ 2048
status ~~ COMPLETED

# tag
domain ~~ [[C20 ~ Projects]]
resource ~~ [[Codex of Time]]
hazard_delta ~~ +0.082

# template
date ~~ 2026-09-11
backlink ~~ [[02 ~ Daily KPI & Quest Loop Mechanics]]

# system
id ~~ 191E0A4B8C1
```

### Section Definitions

| Section | Keys | Purpose |
| :--- | :--- | :--- |
| `# entry` | `title`, `tier`, `duration`, `status` | Core session parameters (`status` can be `PLANNED`, `ACTIVE`, `COMPLETED`, `ABORTED`). Duration is in seconds. |
| `# tag` | `domain`, `resource`, `hazard_delta` | Categorization links to your active projects and resources. |
| `# template` | `date`, `backlink` | Timestamps and parent documentation backlinks. |
| `# system` | `id` | Unique hex timestamp identifier for dataview indexing. |

---

## 2. 📅 Daily Codex Planning Template

*You can copy the template below into your daily note or Templater folder to generate structured daily focus plans:*

````markdown
---
creation_date: <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>
type: daily_kpi_plan
tags:
  - universe25/kpi
  - codex_of_time
---

# ⚔️ Daily Tactical Focus Plan — <% tp.date.now("YYYY-MM-DD") %>

## 🎯 Planned Codex Allocations
- [ ] **Slot 1 (Micro)**: Rank I (8m 32s / 512s) — <% tp.file.cursor(1) %>
- [ ] **Slot 2 (Micro)**: Rank I (8m 32s / 512s) — <% tp.file.cursor(2) %>
- [ ] **Slot 3 (Operational)**: Rank II (17m 04s / 1024s) — <% tp.file.cursor(3) %>
- [ ] **Slot 4 (Tactical)**: Rank III (34m 08s / 2048s) — <% tp.file.cursor(4) %>

---

## 📜 Session Logs

```Heraclitus
# entry
title ~~ <% tp.file.cursor(5) %>
tier ~~ Rank II
duration ~~ 1024
status ~~ COMPLETED

# tag
domain ~~ [[C20 ~ Projects]]
resource ~~ [[Codex of Time]]

# template
date ~~ <% tp.date.now("YYYY-MM-DD") %>

# system
id ~~ <% Date.now().toString(16).toUpperCase() %>
```

---

## 📊 Daily Summary & Review

```dataview
TABLE entry.tier AS "Tier", entry.duration AS "Seconds", entry.status AS "Status"
FROM #universe25/kpi
WHERE file.name = this.file.name
```
````

---

## 3. 🔍 Vault-Wide Dataview Query Snippets

### View All Completed Sessions This Week
```dataview
TABLE WITHOUT ID
  file.link AS "Note",
  entry.title AS "Session Title",
  entry.tier AS "Codex Tier",
  entry.duration + "s" AS "Duration",
  entry.status AS "Status"
FROM #universe25/kpi
WHERE entry.status = "COMPLETED"
SORT file.ctime DESC
LIMIT 20
```

### Calculate Total Focus Time Today
```dataviewjs
const today = dv.pages('#universe25/kpi').where(p => p.file.day && p.file.day.equals(moment().startOf('day')));
let secondsToday = 0;

for (let p of today) {
    if (p.EVO_YAML_Heraclitus) {
        for (let key of Object.keys(p.EVO_YAML_Heraclitus)) {
            const entry = p.EVO_YAML_Heraclitus[key];
            if (entry.entry && entry.entry.status === "COMPLETED") {
                secondsToday += Number(entry.entry.duration) || 0;
            }
        }
    }
}

dv.paragraph(`**Focused Time Today**: \`${(secondsToday / 60).toFixed(1)} minutes\` (${secondsToday} seconds)`);
```
