// path: src/apps/arc-jurassic/components/tabs/SettingsView.tsx

import React, { useState } from 'react';
import {
  Wrench,
  Sparkles,
  RotateCcw,
  Download,
  Upload,
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface SettingsViewProps {
  userProgress: any;
  myResources: any;
  onUpdateProgress: (prog: any) => void;
  onUpdateResources: (res: any) => void;
  onResetData?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userProgress,
  myResources,
  onUpdateProgress,
  onUpdateResources,
}) => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Quick resource cheats
  const handleAddElementalTime = (amount: number) => {
    const updated = { ...myResources };
    if (!updated.elemental_time) updated.elemental_time = {};
    const current = updated.elemental_time['jurassic']?.amount || 0;
    updated.elemental_time['jurassic'] = {
      amount: current + amount,
      icon: updated.elemental_time['jurassic']?.icon || 'https://cdn.paleo.gg/games/jwtg/images/resource/dna.png',
    };
    onUpdateResources(updated);
    showToast(`Added +${amount.toLocaleString()} DNA / Elemental Time!`);
  };

  const handleAddOrbs = (amount: number) => {
    const updated = { ...myResources };
    if (!updated.orbs) updated.orbs = {};
    const current = updated.orbs['amber']?.amount || 0;
    updated.orbs['amber'] = {
      amount: current + amount,
    };
    onUpdateResources(updated);
    showToast(`Added +${amount} Amber Orbs!`);
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all ARC Jurassic progress? This will reset your unlocked dinosaurs.')) {
      const reset = { owned_dinos: {} };
      onUpdateProgress(reset);
      showToast('ARC Jurassic progress has been reset.');
    }
  };

  const handleExportData = () => {
    const exportBundle = {
      userProgress,
      myResources,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `arc_jurassic_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported game data backup successfully!');
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      fileReader.readAsText(event.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target?.result as string);
          if (parsed.userProgress) {
            onUpdateProgress(parsed.userProgress);
          }
          if (parsed.myResources) {
            onUpdateResources(parsed.myResources);
          }
          showToast('Imported save data successfully!');
        } catch (err) {
          showToast('Failed to parse backup JSON file.', 'error');
        }
      };
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto w-full text-white">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-[#171320] border border-[#d4af37] text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 text-[#ffd86b]">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#120f18] border border-[#2b2238] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#291e07] to-[#120f18] border border-[#524124]">
            <Wrench className="w-7 h-7 text-[#ffd86b]" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl font-bold text-[#ffd86b] flex items-center gap-2">
              ARC Jurassic Settings & Laboratory
            </h2>
            <p className="text-xs text-[#8c7a9e]">
              Game parameters, gacha drop tables, resource management, and state backup utilities.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1: Drop Rate Tables & Probabilities */}
        <div className="p-6 rounded-2xl bg-[#120f18] border border-[#2b2238] space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ffd86b]" />
            <h3 className="font-cinzel text-sm font-bold text-white">
              Black Hole Gacha Mechanics & Rules
            </h3>
          </div>
          <p className="text-xs text-[#8c7a9e] leading-relaxed">
            Summoning pulls dinosaurs dynamically based on your Ferocity Tier:
          </p>

          <div className="p-4 rounded-xl bg-[#171320] border border-[#2b2238] space-y-2 text-xs font-mono">
            <div className="flex justify-between border-b border-white/10 pb-1 text-[#aaa]">
              <span>Rarity Class</span>
              <span>Distribution Weight</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Common / Rare</span>
              <span className="text-emerald-400">High Weight (Tier 1-2)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Super Rare</span>
              <span className="text-amber-400">Medium Weight (Tier 3)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Legendary / Tournament</span>
              <span className="text-purple-400">Gated by Top 3 Ferocity</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>VIP / Hybrid Apex</span>
              <span className="text-rose-400">Requires Ferocity ≥ 1,500</span>
            </div>
          </div>
        </div>

        {/* Module 2: Resource Injection / Dev Sandbox */}
        <div className="p-6 rounded-2xl bg-[#120f18] border border-[#2b2238] space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#ffd86b]" />
            <h3 className="font-cinzel text-sm font-bold text-white">
              Resource Arsenal Cheats
            </h3>
          </div>
          <p className="text-xs text-[#8c7a9e]">
            Inject DNA / Elemental Time and Amber Orbs for quick balance testing.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => handleAddElementalTime(5000)}
              className="p-2.5 rounded-xl bg-[#171320] hover:bg-[#ffd86b] text-[#cbd5e1] hover:text-black border border-[#2b2238] font-bold transition cursor-pointer text-center"
            >
              +5,000 DNA
            </button>
            <button
              type="button"
              onClick={() => handleAddElementalTime(50000)}
              className="p-2.5 rounded-xl bg-[#171320] hover:bg-[#ffd86b] text-[#cbd5e1] hover:text-black border border-[#2b2238] font-bold transition cursor-pointer text-center"
            >
              +50,000 DNA
            </button>
            <button
              type="button"
              onClick={() => handleAddOrbs(10)}
              className="p-2.5 rounded-xl bg-[#171320] hover:bg-amber-500 text-[#cbd5e1] hover:text-black border border-[#2b2238] font-bold transition cursor-pointer text-center"
            >
              +10 Amber Orbs
            </button>
            <button
              type="button"
              onClick={() => handleAddOrbs(100)}
              className="p-2.5 rounded-xl bg-[#171320] hover:bg-amber-500 text-[#cbd5e1] hover:text-black border border-[#2b2238] font-bold transition cursor-pointer text-center"
            >
              +100 Amber Orbs
            </button>
          </div>
        </div>

        {/* Module 3: State Backup & Restore */}
        <div className="p-6 rounded-2xl bg-[#120f18] border border-[#2b2238] space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#ffd86b]" />
            <h3 className="font-cinzel text-sm font-bold text-white">
              Data Management & Backup
            </h3>
          </div>
          <p className="text-xs text-[#8c7a9e]">
            Export or import your complete ARC Jurassic collection and resources.
          </p>

          <div className="flex flex-wrap gap-3 text-xs font-mono">
            <button
              type="button"
              onClick={handleExportData}
              className="px-4 py-2.5 rounded-xl bg-[#171320] hover:bg-white/10 border border-[#2b2238] font-bold transition cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-[#ffd86b]" />
              <span>Export JSON Backup</span>
            </button>

            <label className="px-4 py-2.5 rounded-xl bg-[#171320] hover:bg-white/10 border border-[#2b2238] font-bold transition cursor-pointer flex items-center gap-2">
              <Upload className="w-4 h-4 text-sky-400" />
              <span>Import Backup</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Module 4: Hard Reset */}
        <div className="p-6 rounded-2xl bg-[#120f18] border border-[#2b2238] space-y-4">
          <div className="flex items-center gap-2 text-rose-400">
            <RotateCcw className="w-5 h-5" />
            <h3 className="font-cinzel text-sm font-bold">
              Factory Reset & Data Purge
            </h3>
          </div>
          <p className="text-xs text-[#8c7a9e]">
            Wipe local storage cache and clear unlocked dinosaur collection back to baseline.
          </p>

          <button
            type="button"
            onClick={handleResetProgress}
            className="px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/80 text-rose-300 border border-rose-800 font-bold transition cursor-pointer flex items-center gap-2 text-xs font-mono"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Dino Collection</span>
          </button>
        </div>
      </div>
    </div>
  );
};
