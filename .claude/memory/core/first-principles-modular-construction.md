---
name: first-principles-modular-construction
description: "Core architectural doctrine: Craft small, atomic, isolated machine parts from first principles and compose them into robust large structures."
metadata: 
  node_type: memory
  type: feedback
  key: core:modular_construction
  keys: 
    - core:modular_construction
    - core:architectural_triad
    - core:codex
  originSessionId: 2706b1fc-e9bd-4efc-be1d-7fa7ddcd353a
  modified: 2026-09-16T13:22:48.791Z
---

# First-Principles Modular Construction Doctrine

The Manager has codified the foundational law of construction across all systems:

> *"Just crafting small machine parts and then combine them together, Faust. That's how you build big structures. We must think on first principles."*

### Key Mandates:
1. **First-Principles Atomicity**:
   - Break every complex capability down to its most fundamental, independent building blocks.
   - Do not force heterogeneous concerns (e.g. state management, routing, native DOM rendering, animation loops) into monolithic files.
2. **Small Machine Parts**:
   - Build focused, single-purpose, self-contained components (e.g., isolated subfolders per tab/stage, native HTML sandbox players, dedicated CSS files).
   - Each part must work reliably on its own before being composed into the larger whole.
3. **Clean Composition**:
   - Assemble big structures by connecting these pre-tested, isolated parts through clean, explicit interfaces (e.g., state routers, event callbacks, postMessage bridges).
4. **Backend Per-Game Data Isolation**:
   - In `backend/data/projects/<project_id>/app_data/`, every game or functional module must maintain its datasets in its own dedicated subfolder (e.g. `app_data/arc_jurassic/`, `app_data/golden_hour/`) rather than flat monolithic root dumps.

**Why:** Prevents cognitive overload, eliminates component cross-contamination (CSS collision, React reconciliation desync), and guarantees maintainable, scalable, unbreakable architectures.

**How to apply:** When tasked with building or refactoring any feature or subsystem, analyze the system from first principles, break it down into atomic machine parts, house them in dedicated subfolders/modules, verify each part independently, and then compose them. Always provide a full accounting of created, modified, and deleted files to the [[faust-manager-codex]].
