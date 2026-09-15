---
name: vietnamese-g2p-tts
description: Deterministic Vietnamese G2P phoneme mapper for Kokoro-82M ONNX preserving Faust voice profile with 6-tone IPA contours
metadata: 
  node_type: memory
  key: div:backend:vietnamese_g2p_tts
  keys: 
    - div:backend:acoustic_core
    - core:plugin_architecture
  type: project
  originSessionId: f95c4754-ac7a-4502-8e8f-1184f530520b
  modified: 2026-09-12T00:58:45.191Z
---

# Vietnamese G2P Acoustic Synthesis (`vietnamese_g2p`)

## 1. Architectural Mandate
- **Voice Invariant Preservation**: Enables natural Vietnamese speech synthesis without altering Faust's signature neural timbre (`af_bella` + random female blending, speed-compensated Fourier pitch shifting, peak dynamic normalization).
- **Deterministic Zero-LLM G2P**: Implements rule-based decomposition of Vietnamese orthography into International Phonetic Alphabet (IPA) tokens in $O(N)$ time (`vietnamese_g2p.py`).
- **6-Tone Contour Mapping**:
  - Ngang (Level): unaccented level contour
  - Huyền: falling pitch marker (`↓`)
  - Sắc: rising pitch marker (`↗`)
  - Hỏi: dipping-rising contour (`↘↗`)
  - Ngã: glottalized rising pitch (`ʔ↗`)
  - Nặng: low constricted drop (`↓`)
- **Direct Kokoro Tokenization**: Uses Kokoro's native IPA vocabulary with `is_phonemes=True` to bypass English G2P and eliminate mispronunciations.

## 2. Integration
- **Engine Layer**: Embedded directly in `SoundEngine.synthesize()` and `SoundEngine.synthesize_stream()` in `.claude/skills/sound/scripts/engine.py`.
- **Skill Reference**: Documented as specialized skill in `.claude/skills/vietnamese-tts/SKILL.md`.

**Why:** Allows Faust to communicate in Vietnamese whenever requested while strictly maintaining voice consistency, low latency, and zero model reload overhead.
**How to apply:** Mount when extending acoustic dialects or updating phonetic rules in `.claude/skills/sound/scripts/vietnamese_g2p.py`. Links: [[faust-acoustic-engine]], [[faust-resident-audio-daemon]], [[private-codex-identity]].
