---
name: arc-jurassic-tab-vision
description: "Manager's vision for arc-jurassic tab flow: Tab 1=Gacha (no auto-nav), Tab 2=Details (button to Gacha), Tab 3=AllDinos (click dino -> Gacha)"
metadata: 
  node_type: memory
  type: project
  origin: arc-jurassic-tab-rebuild-2026-09-15
  originSessionId: 2706b1fc-e9bd-4efc-be1d-7fa7ddcd353a
  modified: 2026-09-15T17:13:12.373Z
---

# ARC Jurassic Tab Navigation Vision (Rebuilt)

The Manager's vision for the 4-tab structure is:

- **Tab 1 (`gacha`)**: `Tabs_Gacha` — stays here after roll; no automatic navigation elsewhere (`onBuySuccess` preserves `view='gacha'`).
- **Tab 2 (`details`)**: `DinoDetailsView` — shows a single dino; includes "▶ ĐI TỚI GACHA" button (`onGoToGacha`) that navigates to Tab 1.
- **Tab 3 (`alldinos`)**: `AllDinosView` — clicking any dino triggers `onSelectDino`, which navigates to Tab 2 (`details`).
- **Tab 4 (`settings`)**: `SettingsView` — unchanged.

**Previous broken logic (pre-rebuild)**:
- `RosterView` (now removed from active flow) had dead placeholder UI
- `AllDinosView` selected a UUID but stayed in the same view
- `Tabs_Gacha` switched to `roster` on success

**Current logic (post-rebuild)**:
- Navigation handled centrally in `ArcJurassic.tsx` via `setView()`
- `DinoDetailsView` receives `onBack` (to `alldinos`) and `onGoToGacha` (to `gacha`)
- `AllDinosView` receives `onSelectDino` that sets UUID and switches view to `details` (Tab 2)
- No hardcoded auto-navigation; all flows are manager-directed

**Why:** Eliminates broken implicit navigation, replaces placeholder `RosterView` with purposeful tab flow, and makes every tab transition an explicit manager-controlled action.

**How to apply:** Any future modifications to `ArcJurassic.tsx` tab logic must check this mapping: `gacha` (roll, no auto-nav) -> `details` (view dino, button to gacha) -> `alldinos` (list, click -> details) -> `settings` (dev sandbox). Refer to this memory before changing `setView()` calls.

Link: [[gamification-master-game-vision]] for overall universe-25 plugin architecture.
