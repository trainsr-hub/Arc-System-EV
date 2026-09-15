---
title: "Universe 25 — Backend & SQLite 5-Tier Engines"
project_id: "U25"
type: "technical_spec"
status: "ACTIVE"
parent_hub: "[[00 ~ Index & Master Dashboard]]"
summary: "FastAPI REST API, SQLite 5-tier project databases, live data synchronization, and daemon processes."
created: 2026-09-12
last_updated: 2026-09-12
tags:
  - project/u25
  - type/backend_spec
  - domain/backend_engine
---

# ⚙️ Universe 25 — Backend & SQLite 5-Tier Engines

> **Context**: Sub-document of [[00 ~ Index & Master Dashboard]].

---

## 1. 🏛️ Architecture Overview

The Universe 25 backend is a lightweight, local-first FastAPI service operating on port `8000`. It acts as the persistent transaction engine for time records, inventory mutations, and hardware synchronization.

```
SandBox Projetcs/backend/
├── server.py                 # FastAPI application endpoints
├── run_backend.py            # Local process launcher & watchdog
├── api_spec.json             # OpenAPI contracts
└── data/
    └── projects/             # Multi-project isolated databases
        └── music_app/
            ├── index.json
            └── app_data/
                ├── _1_static.db
                ├── _5_config.db
                └── system/
```

---

## 2. 🗄️ SQLite 5-Tier Storage Engine Doctrine

To guarantee zero corruption and clean boundary separation:
1. **Tier 1 (Static Registry)**: Immutable items, rank duration tables, recipe definitions (`_1_static.db`).
2. **Tier 2 (Session Ledgers)**: Completed focus sprints, Tachyon cutoff records, and raw timestamps.
3. **Tier 3 (Inventory & State)**: Current consumable counts, cards, and player currencies.
4. **Tier 4 (Aggregations & Analytics)**: Historical Hazard Level logs and productivity graphs.
5. **Tier 5 (Configuration & Overrides)**: System preferences, audio presets, and daemon parameters (`_5_config.db`).

---

## 3. 🌐 Core Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/status` | Heartbeat & engine health status |
| `GET` | `/api/u25/inventory` | Retrieve current consumable balances & caps |
| `POST` | `/api/u25/session/complete` | Record completed focus session & mint rewards |
| `POST` | `/api/u25/fuse` | Execute consumable fusion with miracle proc checks |
| `POST` | `/api/hardware/sync` | Replay buffered offline sessions from ESP32 |
