# 06 — Backend Data Storage Engine: Blue Rose 5-Tier Architecture

> **Codex Reference**: `docs/06_BACKEND_DATA_STORAGE_ENGINE.md`  
> **Classification**: Backend Architecture & Data Integrity  
> **Status**: Review & Verification

---

## 1. Executive Summary & Design Principles

The backend of Universe 25 runs on the **Blue Rose Storage Engine** (Python / FastAPI running locally on port `8080`).

It is built upon three non-negotiable architectural laws:
1. **Authoritative Backend Storage**: All game state, time balances, inventories, relics, crops, and event logs reside durably in SQLite and JSONL files on the local filesystem. Browser memory and `localStorage` are strictly ephemeral UI caches.
2. **Fail Loudly (Zero Silent Fallbacks)**: If the backend is offline or an API request fails, the application must immediately display clear, explicit error states. Swallowing exceptions or silently falling back to mock RAM state is strictly forbidden.
3. **Single Source of Truth (SSOT)**: Clean, DRY schemas without duplicate shim directories or competing data stores.

---

## 2. The 5-Tier Storage Hierarchy

For high-volume structured workloads (such as the 226 MB Music App library in Vinyl Angel), the engine employs a deterministic **5-Tier SQLite Layout**:

```
backend/data/projects/<project_id>/app_data/
├── _1_static.db        (Tier 1: Read-Only Static Metadata)
├── _2_events.jsonl      (Tier 2: High-Throughput Append-Only Event Log)
├── _3_state.db         (Tier 3: Aggregated State Matrices & Counters)
├── _4_display.db       (Tier 4: Materialized Projected Display Data)
├── _5_config.db        (Tier 5: Engine Runtime Configuration)
└── system/
    ├── rawinfo.db      (System: Full Raw Metadata Backup)
    ├── black_list.db   (System: Hard Blacklisted Track IDs)
    └── bad_kpi_list.db (System: Low Quality / Purged Tracks with Hazard < 2.0)
```

### Tier Functional Responsibilities

| Tier | File | Format | Read/Write Pattern | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | `_1_static.db` | SQLite | Read-Heavy | Immutable asset metadata (titles, channels, durations, media URLs). |
| **Tier 2** | `_2_events.jsonl`| JSONL | Append-Only | High-throughput write stream of user actions (play, skip, vote, bookmark). |
| **Tier 3** | `_3_state.db` | SQLite | Write/Read | Aggregated counters, interaction score arrays ($s_3$ to $s_7$). |
| **Tier 4** | `_4_display.db`| SQLite | Read-Heavy | Materialized view: computed `hazard_level`, `played`, `timeblock`. Serves UI galleries. |
| **Tier 5** | `_5_config.db` | SQLite | Read/Write | Runtime configuration flags, batch sizes, threshold settings. |

---

## 3. The ETL Data Processing Pipeline

To maintain zero UI latency, real-time user events are not written directly to display tables. Instead, an ETL pipeline runs periodically or on-demand:

```
[User Action]
      |
      v (Append)
[Tier 2: _2_events.jsonl]
      |
      v (ETL Stage 1: Ingestion & Aggregation)
[Tier 3: _3_state.db] (Updates score counts s3-s7, arc counters)
      |
      v (ETL Stage 2: Logarithmic Hazard Math & Projection)
[Tier 4: _4_display.db] (Computes Hazard scores, sorts, filters bad KPIs)
      |
      v (ETL Stage 3: Exclusion & Blacklist Synchronization)
[system/black_list.db & system/bad_kpi_list.db] (Purges IDs from Tier 1 display)
```

---

## 4. Universal API Gateway Protocol (`/api/v1/execute`)

The entire backend is controlled through a single, unified, strongly typed gateway endpoint:

`POST /api/v1/execute`

### 4.1. Request Envelope Specification
```json
{
  "project_id": "universe_25",
  "tier": "4",
  "order": {
    "action": "read_all",
    "key": "optional_item_id",
    "data": { "optional": "payload" }
  }
}
```

### 4.2. Supported Gateway Actions by Format

| Format | Supported Actions | Description |
| :--- | :--- | :--- |
| **`sqlite`** | `read_all` | Fetches all rows from the primary table. |
| | `read_key` | Fetches a single row by primary key `key`. |
| | `upsert` | Inserts or updates row data passed in `data`. |
| | `backup` | Creates an atomic snapshot backup file. |
| **`json`** | `read_all` | Returns the entire JSON state object. |
| | `read_key` | Returns the sub-key specified by `key`. |
| | `overwrite` | Replaces the JSON file contents with `data`. |
| | `backup` | Generates a timestamped JSON backup. |
| **`jsonl`** | `append` | Appends a single record or array of records to the log. |
| | `read_all` | Streams and parses all lines in the log. |
| | `clear` | Truncates the JSONL buffer after successful ETL. |

---

## 5. Project Resolution & Alias Registry

The backend server automatically resolves legacy and unified project identifiers:

```python
PROJECT_ALIASES: Dict[str, str] = {
    "vinyl_angel": "music_app",
    "universe-25": "universe_25",
    "golden_hour": "universe_25",
    "golden-hour": "universe_25",
    "modern_day": "universe_25",
    "modern-day": "universe_25",
}
```

---

## 6. Health Check & Monitoring Contract

- **Endpoint**: `GET /health` (or `GET /openapi.json`)
- **Port**: `8080` (binds to `0.0.0.0:8080`)
- **Frontend Heartbeat**: The Web-OS frontend polls the health endpoint every 30 seconds. If unreachable, an alert banner locks critical save operations to prevent silent data desynchronization.
