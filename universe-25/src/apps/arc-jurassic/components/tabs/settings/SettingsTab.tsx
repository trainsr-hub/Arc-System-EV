import React, { useState } from 'react';
import {
  Wrench,
  RotateCcw,
  Zap,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface SettingsTabProps {
  userProgress: any;
  myResources: any;
  isFreeBuyCheat?: boolean;
  onUpdateProgress: (prog: any) => void;
  onResetCollection?: () => void;
  onUpdateResources: (res: any) => void;
  onToggleFreeBuyCheat?: (enabled: boolean) => void;
}

/**
 * Worker: SettingsTab
 * Responsibility: Clean, focused administrative laboratory controls:
 * 1. Cheat Free Cost (0 Cost God Mode Toggle)
 * 2. Reset Dino Collection (Authoritative Factory Purge)
 */
export const SettingsTab: React.FC<SettingsTabProps> = ({
  isFreeBuyCheat = false,
  onUpdateProgress,
  onResetCollection,
  onToggleFreeBuyCheat,
}) => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleCheat = () => {
    const nextState = !isFreeBuyCheat;
    if (onToggleFreeBuyCheat) {
      onToggleFreeBuyCheat(nextState);
    }
    showToast(
      nextState
        ? '🔓 Free Dinosaur Purchases (God Mode) ACTIVATED!'
        : '🔒 Standard Purchasing Economics Restored.'
    );
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all ARC Jurassic progress? This will reset your unlocked dinosaurs in the SQLite database.')) {
      if (onResetCollection) {
        onResetCollection();
      } else {
        onUpdateProgress({ owned_dinos: {} });
      }
      showToast('ARC Jurassic dinosaur collection has been reset in SQLite.');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto w-full text-white py-2">
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
      <div className="p-6 rounded-2xl bg-[#120f18] border border-[#2b2238] flex items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#291e07] to-[#120f18] border border-[#524124]">
            <Wrench className="w-7 h-7 text-[#ffd86b]" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl font-bold text-[#ffd86b]">
              ARC Jurassic Laboratory & Settings
            </h2>
            <p className="text-xs text-[#8c7a9e]">
              Administrative controls, god mode cheats, and SQLite database collection management.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Section 1: Cheat Free Cost (God Mode Toggle) */}
        <div className="p-6 rounded-2xl bg-[#120f18] border border-[#2b2238] space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#ffd86b]" />
            <h3 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
              God Mode — Free Dino Purchases
            </h3>
          </div>
          <p className="text-xs text-[#8c7a9e] leading-relaxed">
            Toggle zero-cost purchasing to claim rolled dinosaurs without consuming Jurassic Time, DNA, or Red Orbs.
          </p>

          <div
            onClick={handleToggleCheat}
            className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition select-none ${
              isFreeBuyCheat
                ? 'bg-amber-950/40 border-amber-400 shadow-[0_0_16px_rgba(255,215,0,0.25)]'
                : 'bg-black/40 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="space-y-0.5">
              <div className="text-xs font-bold font-cinzel text-white flex items-center gap-2">
                <span>Free Purchases (0 Cost Cheat)</span>
                {isFreeBuyCheat ? (
                  <span className="text-[10px] bg-amber-400 text-black font-extrabold px-2 py-0.5 rounded">
                    ACTIVE
                  </span>
                ) : (
                  <span className="text-[10px] bg-white/10 text-gray-400 font-semibold px-2 py-0.5 rounded">
                    DISABLED
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#8c7a9e]">
                {isFreeBuyCheat
                  ? 'Active: All dinosaur purchases in Gacha cost 0 Time, 0 DNA, and 0 Red Orbs.'
                  : 'Disabled: Dinosaurs cost standard Jurassic Time + DNA or Red Orbs.'}
              </p>
            </div>
            <div className="text-3xl text-amber-400 ml-4 shrink-0">
              {isFreeBuyCheat ? (
                <ToggleRight className="w-9 h-9 text-amber-400" />
              ) : (
                <ToggleLeft className="w-9 h-9 text-gray-500" />
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Reset Dino Collection */}
        <div className="p-6 rounded-2xl bg-[#120f18] border border-[#2b2238] space-y-3">
          <div className="flex items-center gap-2 text-rose-400">
            <RotateCcw className="w-5 h-5" />
            <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider">
              Factory Reset — Dino Collection
            </h3>
          </div>
          <p className="text-xs text-[#8c7a9e] leading-relaxed">
            Wipe your unlocked dinosaur progress and reset specimen counts and ranks back to baseline unowned status in SQLite.
          </p>

          <button
            type="button"
            onClick={handleResetProgress}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/80 text-rose-300 border border-rose-800 font-bold transition cursor-pointer flex items-center justify-center gap-2 text-xs font-mono select-none"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Dino Collection</span>
          </button>
        </div>
      </div>
    </div>
  );
};
