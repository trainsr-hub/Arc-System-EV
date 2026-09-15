// path: src/apps/vinyl-angel/components/VinylShop.tsx

import React, { useState } from 'react';
import { useVinylStore, SHOP_CATALOG } from '../store/useVinylStore';
import type { ShopItem } from '../types';
import { AltarSlot } from '../../../components/shared';
import { ShoppingBag, Sparkles, Zap, Disc3, Moon, Ticket, Lock, CheckCircle2, AlertCircle, Globe2, Shield } from 'lucide-react';

// Helper to get icon component by name
const getIcon = (iconName: string, color: string) => {
  const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    ShoppingBag,
    Sparkles,
    Zap,
    Disc3,
    Moon,
    Ticket,
    Lock,
    CheckCircle2,
    AlertCircle,
    Globe2,
    Shield,
  };
  const Icon = iconMap[iconName] || Shield;
  return <Icon className="w-5 h-5" style={{ color }} />;
};

export const VinylShop: React.FC = () => {
  const {
    discs,
    angelRollTickets,
    buyShopItem,
  } = useVinylStore();

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  
  const handleExchange = (item: ShopItem) => {
    const price = item.priceDiscs ?? 25;
    if (discs < price) {
      showToast(`Insufficient Discs! You have ${discs} Discs, need ${price}. Rate more songs to earn Discs!`, 'error');
      return;
    }

    const success = buyShopItem(item);
    if (success) {
      showToast(`✨ Successfully forged 1 ${item.name}!`, 'success');
    } else {
      showToast('Exchange failed.', 'error');
    }
  };

  const availableItem = SHOP_CATALOG.find((item) => !item.isLocked && item.id === 'angel-roll-ticket');
  const lockedItems = SHOP_CATALOG.filter((item) => item.isLocked || item.id !== 'angel-roll-ticket');

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
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

      {/* Header & Balance Card */}
      <div className="p-6 rounded-2xl bg-[#120f18] border border-[#2b2238] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#291e07] to-[#120f18] border border-[#524124]">
            <ShoppingBag className="w-7 h-7 text-[#ffd86b]" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl font-bold text-[#ffd86b] flex items-center gap-2">
              Celestial Emporium
            </h2>
            <p className="text-xs text-[#8c7a9e]">
              Forge dimensional tickets from earned Celestial Discs to prepare for the Grand Multiverse Nexus.
            </p>
          </div>
        </div>

        {/* Currency Display Chips */}
        <div className="flex flex-wrap items-center gap-3 self-stretch md:self-auto">
          <div className="flex items-center gap-2 bg-[#171320] px-4 py-2 rounded-xl border border-[#3d304f] shadow-inner">
            <Disc3 className="w-4 h-4 text-[#ffd86b]" />
            <span className="text-xs text-[#8c7a9e]">Discs:</span>
            <span className="font-mono text-sm font-bold text-[#ffd86b]">{discs}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#1c1424] px-4 py-2 rounded-xl border border-[#4a3461] shadow-inner">
            <Ticket className="w-4 h-4 text-[#c084fc]" />
            <span className="text-xs text-[#8c7a9e]">Tickets:</span>
            <span className="font-mono text-sm font-bold text-[#c084fc]">{angelRollTickets}</span>
          </div>
        </div>
      </div>

      {/* Dimensional Lore Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#171226] via-[#100e1c] to-[#120f18] border border-[#43325c] flex items-center gap-3.5 shadow-md">
        <div className="p-2.5 rounded-lg bg-[#221838] text-[#c084fc] flex-shrink-0">
          <Globe2 className="w-5 h-5 text-[#c084fc]" />
        </div>
        <div className="text-xs space-y-0.5">
          <p className="font-cinzel font-bold text-[#e9d5ff]">
            DIMENSIONAL NEXUS CONVERGENCE (Modern Day)
          </p>
          <p className="text-[#9c93a8] leading-relaxed">
            All dimensions generate unique Tickets and Relics (Celestial Angel, Solar Farm, Artifact Codex). These valuable objects will converge in the upcoming central <strong className="text-[#ffd86b]">Modern Day Nexus</strong> world.
          </p>
        </div>
      </div>

      {/* Available Exchange Item Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#ffd86b]" />
          <h3 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
            Active Dimensional Exchange (Available Now)
          </h3>
        </div>

        {availableItem && (
          <AltarSlot
            title={availableItem.name}
            description={availableItem.description}
            icon={<Ticket className="w-8 h-8 text-[#ffd86b]" />}
            cost={{ type: 'disc', amount: 25 }}
            featuredItem={{
              name: "Angel Roll Ticket",
              score: 10.0,
              rank: "S₃",
              type: "Dimensional Ticket"
            }}
            onAction={() => handleExchange(availableItem)}
            disabled={discs < 25}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#1c1626] to-[#120f18] border-2 border-[#d4af37] shadow-[0_0_24px_rgba(212,175,55,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition hover:border-[#ffd86b]"
          />
        )}
      </div>

      {/* Locked Dimensional Items */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#8c7a9e]" />
            <h3 className="font-cinzel text-sm font-bold text-[#8c7a9e] uppercase tracking-wider">
              Sealed Dimensional Relics (Locked)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#685c78]">
            Unlocks with Multiverse Nexus
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedItems.map((item) => (
            <AltarSlot
              key={item.id}
              title={item.name}
              description={item.description}
              icon={getIcon(item.iconName, '#685c78')}
              featuredItem={{
                name: item.name,
                score: 15.0,
                rank: "✦",
                type: item.category || "Dimensional Relic"
              }}
              className="p-5 rounded-2xl bg-[#0f0d14]/70 border border-[#211a2c] flex flex-col justify-between space-y-4 opacity-75 relative overflow-hidden"
              children={
                <>
                  {/* Lock Reason Banner */}
                  <div className="p-2.5 rounded-lg bg-[#14101c] border border-[#261d33] text-[11px] text-[#8c7a9e] font-mono flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-rose-400/70 flex-shrink-0" />
                    <span className="truncate">{item.lockReason || 'Requires Dimensional Nexus Connection'}</span>
                  </div>

                  {/* Disabled Button */}
                  <div className="pt-2 border-t border-[#1a1424]">
                    <button
                      type="button"
                      disabled
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-cinzel font-bold bg-[#14101c] text-[#554a63] border border-[#211a2c] cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <Lock className="w-3.5 h-3.5" /> Dimension Sealed
                    </button>
                  </div>
                </>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VinylShop;
