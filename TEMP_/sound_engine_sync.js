// Synchronizes the Black Hole Henshin timeline with Web Audio events
// Matches: index.html timeline

const timeline = [
  { time: 0.0, event: "INHALE_SWELL", label: "Phase 1: Cosmic Inhale" },
  { time: 1.0, event: "COLLAPSE", label: "Phase 2: Rapid Collapse" },
  { time: 1.4, event: "SNAP_FLASH", label: "Phase 3: Implosion Snap" },
  { time: 2.4, event: "REAPPEAR", label: "Phase 5: Black Hole Re-emerges" },
  { time: 2.65, event: "MATTER_EJECT", label: "Phase 6: Matter Spews Out" },
  { time: 3.5, event: "SPECIMEN", label: "Phase 7: Specimen Reveals" }
];

console.log("TEMP_ ENGINE SYNC READY");
console.log("Timeline:");
timeline.forEach(t => console.log(`${t.time.toFixed(1)}s  ->  ${t.event}`));
