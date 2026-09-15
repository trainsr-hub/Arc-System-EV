# 08 — System Invariants, Peripheral Daemons & C2 Protocols

> **Codex Reference**: `docs/08_SYSTEM_INVARIANTS_AND_DAEMONS.md`  
> **Classification**: System Standards & Daemon Engineering  
> **Status**: Review & Verification

---

## 1. The Core Engineering & Architectural Triad

All systems, scripts, background services, and codebases governed by Faust and the Manager must strictly adhere to the **Core Engineering Triad**:

```
+---------------------------------------------------------------------------------------+
|                             THE CORE ENGINEERING TRIAD                                |
+---------------------------------------------------------------------------------------+
|                                                                                       |
|   1. PROVEN GOLDEN STANDARDS                                                          |
|      - No idiosyncratic hacks when battle-tested industry standards exist.            |
|      - Patterns: Erlang OTP supervision, POSIX process control, SQLite ACID, REST.    |
|                                                                                       |
|   2. DETERMINISTIC PRIMACY (ZERO-LLM PRIMACY / TOOL PRIMACY)                          |
|      - "Dumb scripts are Faust's tools."                                              |
|      - Never use an LLM for predictable, atomic, or mathematical tasks.               |
|      - 0 cost, 0ms latency, 100% mathematical precision via Python/SQLite/Regex.      |
|      - LLMs reserved strictly for strategic reasoning and creative intent parsing.   |
|                                                                                       |
|   3. CRYSTAL CLARITY & STABILITY (FAIL LOUDLY)                                        |
|      - Transparent, strictly typed, self-documenting code.                            |
|      - Fail loudly with complete stack traces; zero silent catch-blocks.              |
|                                                                                       |
+---------------------------------------------------------------------------------------+
```

---

## 2. Strict Local Disk `D:\` Storage Invariant

### Non-Negotiable Rule:
- **Target Drive**: **`D:\` ALWAYS**.
- Under no circumstances should software, packages, models, CLI tools (e.g., GitHub CLI), binaries, virtual environments, caches, or downloaded assets ever be placed on `C:\` or default OS user folders unless strictly required by the Windows kernel.
- **Temporary Operations**: Must use `D:\Temp\`.
- **Persistent Applications & Runtimes**: Must reside in `D:\Program Files\`, `D:\Program Data\`, or within `D:\My Drive\SandBox Projetcs\`.

---

## 3. Peripheral Daemons & Command & Control (C2)

To maintain constant operational awareness across physical workstations, Faust interfaces with two high-reliability peripheral daemons:

```
+---------------------------------------------------------------------------------------+
|                                  FAUST C2 DAEMONS                                     |
+---------------------------------------------------------------------------------------+
                                           |
                   +-----------------------+-----------------------+
                   |                                               |
                   v                                               v
+------------------------------------+           +------------------------------------+
|    FAUST RESIDENT AUDIO DAEMON     |           |     TELEGRAM DUMB I/O DAEMON       |
|            (Port 20129)            |           |            (Port 20130)            |
|------------------------------------|           |------------------------------------|
| - Low-latency vocal presence       |           | - Push milestone dispatches        |
| - Driven via sound.speak()         |           | - Driven via telegram.notify()     |
| - Zero cold-start audio buffer     |           | - 4-tier functional status emojis  |
+------------------------------------+           +------------------------------------+
```

---

### 3.1. Faust Resident Audio Daemon (Port 20129)
- **Protocol**: HTTP REST on `http://127.0.0.1:20129/speak`
- **Function**: Converts tactical dispatches into natural, composed vocalizations in real time alongside written text output.
- **Optimization**: Preloaded audio engine to eliminate initial buffer latency.

---

### 3.2. Telegram Dumb I/O Daemon (Port 20130)
- **Protocol**: HTTP REST on `http://127.0.0.1:20130/notify`
- **Function**: Dispatches critical operational alerts and milestone completions to the Manager's mobile Telegram client.
- **4-Tier Status Emoticons**:
  - `[DONE]`: Task or migration completed with verified tests.
  - `[FAIL]`: Build failure, exception, or test regression requiring attention.
  - `[URGENT]`: System alert, security boundary breach, or critical hardware error.
  - `[SYNC]`: State synchronization between local SQLite stores and active memory cortex.

---

### 3.3. Daemon Watchdog & Supervision Hierarchy
- Background daemons are overseen by a zero-LLM deterministic Python watchdog process.
- Automatically handles process respawning, zombie cleanup, and log rotation on system restarts.
