---
title: "Universe 25 — Hardware Specs & NFC Sync Protocol"
created: 2026-09-11
type: hardware_spec
tags:
  - universe25/hardware
  - universe25/esp32
  - codex_of_time
---
=> This shouldn't be considered yet. We're not even in Phase 1 - Buiding Software backend. We're just planning
# 📟 Universe 25 — Hardware Specs & NFC Sync Protocol

```Heraclitus
# entry
title ~~ Hardware Specs & NFC Sync Protocol
type ~~ Edge Hardware Architecture
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
id ~~ U25-HW-03
```

---

> [!NOTE]
> The Codex of Time runs on physical hardware to anchor focus into the real world. A dedicated ESP32 NFC terminal reads physical cards, runs local timers completely offline, and connects to the backend only when recharging card charges or logging batch sessions.

---

## 1. 🛠️ Hardware Bill of Materials (BOM) & Pinout

```
┌─────────────────────────────────────────────────────────────┐
│                    ESP32 FOCUS TERMINAL                     │
│                                                             │
│   ┌──────────────┐     ┌──────────────┐    ┌────────────┐   │
│   │  PN532 NFC   │     │  0.96" OLED  │    │  WS2812B   │   │
│   │ Card Reader  │     │  SSD1306     │    │  RGB Ring  │   │
│   └──────┬───────┘     └──────┬───────┘    └─────┬──────┘   │
│          │ I2C                │ I2C              │ GPIO 18  │
│          └───────────┬────────┘                  │          │
│                      ▼                           ▼          │
│             ┌───────────────────────────────────────┐       │
│             │         ESP32 Microcontroller         │       │
│             │   [ RAM Counter ] [ NVS Ring Buffer ] │       │
│             └───────────────────┬───────────────────┘       │
│                                 │ GPIO 19                   │
│                                 ▼                           │
│                        [ Piezo Buzzer ]                     │
└─────────────────────────────────────────────────────────────┘
```

### Component Connections

| Component | Interface / Pins | ESP32 GPIO | Description |
| :--- | :--- | :--- | :--- |
| **MCU** | Micro-USB / 5V | — | ESP32-WROOM-32 or ESP32-S3 (240MHz, 520KB SRAM) |
| **NFC Reader (PN532)** | I2C (SDA, SCL) | **GPIO 21 (SDA), GPIO 22 (SCL)** | Reads Mifare Classic 1K / NTAG215 cards |
| **OLED Display (SSD1306)**| I2C (Shared Bus) | **GPIO 21 (SDA), GPIO 22 (SCL)** | $128 \times 64$ monochrome display for countdown & tier display |
| **NeoPixel Ring (8-LED)** | Digital Output | **GPIO 18** | Visual breathing pulse (Gold = Active, Red = Aborted, Green = Complete) |
| **Piezo Buzzer** | PWM / Digital Out | **GPIO 19** | Acoustic chime on session start, warning, and completion |

---

## 2. 🗃️ NFC Card Memory Layout (Mifare Classic 1K)

Data is written into protected card blocks so the hardware can validate and decrement charges instantly in RAM without network round-trips:

| Sector / Block | Byte Offset | Field Name | Data Type | Description & Example Values |
| :--- | :--- | :--- | :--- | :--- |
| **Sector 1 / Block 4** | `0x00 - 0x07` | `CardUUID` | `uint64_t` | Unique immutable Card ID (e.g. `0xC48A23DF`) |
| **Sector 1 / Block 4** | `0x08` | `CodexTier` | `uint8_t` | `0x01`=R1, `0x02`=R2, `0x03`=R3, `0x04`=R4, `0x05`=EXEED |
| **Sector 1 / Block 4** | `0x09 - 0x0A` | `Duration` | `uint16_t` | Second count (`512`, `1024`, `2048`, `3072`, `4096`) |
| **Sector 1 / Block 5** | `0x00 - 0x01` | `Charges` | `uint16_t` | Current remaining charges on card (decrements on swipe) |
| **Sector 1 / Block 5** | `0x02 - 0x05` | `LastRecharge`| `uint32_t` | UNIX timestamp of last backend refill |
| **Sector 2 / Block 8** | `0x00 - 0x0F` | `Signature` | `uint8_t[16]` | Backend HMAC signature to prevent local tampering |

---

## 3. 🔒 Local-First State Machine & Invariants

1. **Single-Active-Timer Rule**:
   - Only **one timer** can tick at any given time.
   - If a card is swiped while a timer is already running, the OLED flashes `"TIMER BUSY!"` and the buzzer emits a warning tone. The swipe is ignored.
2. **Offline-First Zero Latency**:
   - Card swipe validates `Charges > 0` locally.
   - Card charge is decremented by 1 immediately.
   - Session starts instantly without checking WiFi.
   - Completed session details are appended to the ESP32 Flash NVS ring buffer (capacity: 256 offline sessions).
3. **Session Completion Event**:
   - Timer hits `00:00`: Buzzer chimes victory sequence, NeoPixel glows green, and session status is logged as `COMPLETED`.

---

## 4. 🌐 Backend Synchronization Protocol (Blue Rose Engine)

When the Manager presses the **Sync Button** (or connects the terminal to WiFi), the ESP32 dispatches a batch JSON payload to the backend server.

### Sync Request Payload (`POST http://localhost:8080/api/v1/execute`)
```json
{
  "project_id": "universe_25",
  "tier": "inventory",
  "order": {
    "action": "sync_codex_sessions",
    "device_id": "ESP32_CODEX_01",
    "timestamp": 1773264000,
    "sessions": [
      {
        "session_id": "SES_8F9A12B0",
        "card_uuid": "C4:8A:23:DF",
        "tier": "RANK_III",
        "duration_seconds": 2048,
        "started_at": 1773261952,
        "ended_at": 1773264000,
        "status": "COMPLETED"
      }
    ],
    "recharge_requests": [
      {
        "card_uuid": "C4:8A:23:DF",
        "current_local_charges": 0,
        "requested_refill": 10
      }
    ]
  }
}
```

### Backend Success Response
```json
{
  "status": "SUCCESS",
  "data": {
    "synced_sessions_count": 1,
    "time_balance_delta_seconds": 2048,
    "new_time_balance_seconds": 184320,
    "current_hazard_level": 5.92,
    "proof_of_effort_minted": {
      "dimensional_codex_tickets": 2,
      "codex_fragments": 0
    },
    "recharged_cards": [
      {
        "card_uuid": "C4:8A:23:DF",
        "approved_charges": 10,
        "new_signature": "E9A4B3C2D1F087654321ABCDEFAABBCC"
      }
    ]
  }
}
```
