// path: src/apps/golden-hour/GoldenHour.tsx

import React, { useState } from 'react';
import { BattleArena } from './components/BattleArena';
import { GachaAltar } from './components/GachaAltar';
import { VaultGalleries } from './components/VaultGalleries';
import { GoldenHourConfig } from './components/GoldenHourConfig';
import { calculateHazardFromTime } from './store/useGoldenHourStore';
import { useCurrencyStore } from '../../store/useCurrencyStore';
import { GameLayout } from '../../components/GameLayout';
import { Sparkles, Users, Archive, Sliders } from 'lucide-react';

type GoldenHourTab = 'arena' | 'gacha' | 'vault' | 'config';

export const GoldenHour: React.FC = () => {
  // Default to Tab 2 (Summoning Altar) as Tab 1 is in Phase 1 lock
  const [activeTab, setActiveTab] = useState<GoldenHourTab>('gacha');

  const timeBalance = useCurrencyStore((s) => s.timeBalance);
  const { goldenHours, hazardLevel } = calculateHazardFromTime(timeBalance);

  const tabs = [
    { id: 'arena', label: 'Arena', icon: <Users className="w-4 h-4" /> },
    { id: 'gacha', label: 'Gacha', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'vault', label: 'Vault', icon: <Archive className="w-4 h-4" /> },
    { id: 'config', label: 'Config', icon: <Sliders className="w-4 h-4" /> }
  ];

  return (
    <GameLayout
      gameTitle="Golden Hour"
      gameTitleIcon={<Sparkles />}
      gameTitleBadge="MASTER GAME"
      gameTitleSubtitle="Universal Stake Nexus • Babylonian Altar"
      globalInfo={{ hazardLevel, goldenHours }}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as GoldenHourTab)}
    >
      {activeTab === 'arena' && <BattleArena />}
      {activeTab === 'gacha' && <GachaAltar />}
      {activeTab === 'vault' && <VaultGalleries />}
      {activeTab === 'config' && <GoldenHourConfig />}
    </GameLayout>
  );
};

export default GoldenHour;