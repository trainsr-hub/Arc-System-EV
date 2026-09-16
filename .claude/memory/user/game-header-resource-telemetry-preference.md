---
name: game-header-resource-telemetry-preference
description: "User preference: Sub-game dedicated resources must be placed directly in the top-right header area where Discs and Theme default chips sit."
metadata: 
  node_type: memory
  type: user
  key: user:header_resource_telemetry
  keys: 
    - user:header_resource_telemetry
    - core:modular_construction
    - div:ui:universe25
  originSessionId: 2706b1fc-e9bd-4efc-be1d-7fa7ddcd353a
  modified: 2026-09-16T11:30:17.078Z
---

# Sub-Game Top-Right Header Resource Telemetry Preference

The Manager has established a firm visual and layout preference for all Universe 25 sub-games:

> *"The way you placed the three is perfect. I need you to remember that as my preference."*

### Specification:
1. **Header-Embedded Resource Badges (`headerRight`)**:
   - Rather than crowding the main viewport body with a duplicate resource bar, the game's dedicated currencies/clocks must be rendered directly in the **top-right header area** of `GameLayout` (overriding the default Discs & Theme display via `headerRight`).
2. **Design Pattern**:
   - High-contrast, dark-translucent rounded capsules (`bg-[#14101c]`, `px-3.5 py-1.5`, `rounded-xl`, `border border-[#2e2638]`).
   - Clean icon + formatted amount + clear currency label (e.g. `⏳ 4h 00m Jurassic Time`, `🧬 50,000 DNA`, `🔴 50 Orbs`).
3. **Viewport Clarity**:
   - The main content container below the header remains 100% unobstructed and dedicated to the game's active tab views.

**Why:** Maximizes vertical screen real estate, maintains consistent imperial HUD aesthetics, and presents crucial transactional resources at eye level in the primary header.

**How to apply:** In any Universe 25 sub-application (e.g., [[arc-jurassic-tab-vision]], [[gamification-master-game-vision]]), pass custom resource telemetry into `GameLayout`'s `headerRight` prop instead of rendering standalone resource banners inside the main page body.
