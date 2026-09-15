// path: src/apps/template-game-tab/TemplateGameTab.tsx

import React, { useState } from 'react';
import { GameLayout, type TabItem } from '../../components/GameLayout';
import { HazardBadge } from '../../components/HazardBadge';
import { useGlobalStore } from '../../store/useGlobalStore';
import { useCurrencyStore } from '../../store/useCurrencyStore';
import {
  Swords,
  ShoppingBag,
  Archive,
  Sliders,
  Layers,
  Sparkles,
  Info,
  Shield,
  Zap
} from 'lucide-react';
import {
  AltarSlot,
  UniversalCard,
  CodexGrid,
  ConfigSection,
  SharedButton,
  ModalContainer,
  TelemetryBar
} from '../../components/shared';

type SubTabId = 'battle' | 'altar' | 'vault' | 'config';

export const TemplateGameTab: React.FC = () => {
  const setActiveApp = useGlobalStore((s) => s.setActiveApp);
  const timeBalance = useCurrencyStore((s) => s.timeBalance);

  const [activeTab, setActiveTab] = useState<SubTabId>('battle');
  const [demoScore, setDemoScore] = useState<number>(9.85);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const tabs: TabItem[] = [
    { id: 'battle', label: 'Combat Arena', icon: <Swords className="w-4 h-4" /> },
    { id: 'altar', label: 'Summoning Altar', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'vault', label: 'Codex & Vault', icon: <Archive className="w-4 h-4" /> },
    { id: 'config', label: 'System Config', icon: <Sliders className="w-4 h-4" /> },
  ];

  // Sample items for Codex demonstration
  const mockVaultItems = [
    { id: 'item-1', name: 'Chrono-Rex Specimen', score: 14.85, rank: '✦', type: 'Apex Specimen' },
    { id: 'item-2', name: 'Event Horizon Relic', score: 11.20, rank: 'Ø', type: 'Singularity Core' },
    { id: 'item-3', name: 'Unfrozen Wave Matrix', score: 8.75, rank: 'Ψ', type: 'Cryo Entity' },
    { id: 'item-4', name: 'Celestial Gold Vinyl', score: 6.40, rank: 'S₄', type: 'Master Disc' },
    { id: 'item-5', name: 'Babylonian Stake Seal', score: 5.10, rank: 'S₃', type: 'Stake Contract' },
    { id: 'item-6', name: 'Genesis DNA Helix', score: 4.20, rank: 'S₂', type: 'Genetic Code' },
  ];

  return (
    <GameLayout
      title="Template Game Tab"
      gameTitleIcon={<Layers className="w-5 h-5 text-[#ffd86b]" />}
      gameTitleBadge="MASTER BLUEPRINT"
      gameTitleSubtitle="Standardized Layout Specification • Reference Architecture for Universe 25"
      showBackButton={true}
      backButton="Golden Hour"
      onBackClick={() => setActiveApp('golden-hour')}
      globalInfo={{
        hazardLevel: 8.42,
        goldenHours: timeBalance / 3600,
        discs: 42,
        tickets: 7,
      }}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as SubTabId)}
    >
      {/* Sub-Tab 1: Combat Arena / Primary Action Workspace */}
      {activeTab === 'battle' && (
        <div className="space-y-6">
          {/* Telemetry Bar Showcase */}
          <div className="p-6 rounded-2xl bg-[#0e0a16]/80 border border-[#2e2638] shadow-gold-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd86b]/20 to-[#841822]/30 border border-[#ffd86b]/40 flex items-center justify-center text-[#ffd86b]">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider">
                    Tab 1 — Primary Operational Stage
                  </h3>
                  <p className="text-xs text-[#8c7a9e]">
                    Demonstrating TelemetryBar, UniversalCard, SharedButton, and ModalContainer
                  </p>
                </div>
              </div>
              <SharedButton
                variant="secondary"
                size="sm"
                onClick={() => setIsModalOpen(true)}
              >
                Inspect Modal
              </SharedButton>
            </div>

            <div className="pt-2">
              <div className="text-[11px] font-mono text-[#ffd86b] uppercase mb-2">Live Shared Telemetry Bar:</div>
              <TelemetryBar
                hazardLevel={8.42}
                goldenHours={timeBalance / 3600}
                discs={42}
                tickets={7}
                themeVariant="detailed"
                className="bg-[#120f18] border-[#2b2238]"
              />
            </div>
          </div>

          {/* Universal Cards Showcase */}
          <div className="space-y-3">
            <div className="text-xs font-cinzel font-bold text-[#ffd86b] uppercase tracking-wider">
              Universal Cards (Shared Interactive Entities)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UniversalCard
                title="Chrono-Rex Specimen"
                subtitle="Apex Carnivore • Rank ✦"
                description="Hyper-accelerated temporal predator capable of tearing through localized continuum barriers."
                type="Apex Specimen"
                score={14.85}
                rank="✦"
                icon={<Zap className="w-5 h-5 text-[#ffd86b]" />}
                featured={true}
                className="bg-[#120f18] border-[#2b2238]"
                onClick={() => setSelectedCard('Chrono-Rex Specimen')}
              />

              <UniversalCard
                title="Event Horizon Core"
                subtitle="Singularity Relic • Rank Ø"
                description="Zero-radius gravimetric anchor generating continuous temporal distortion fields."
                type="Singularity Relic"
                score={11.20}
                rank="Ø"
                icon={<Shield className="w-5 h-5 text-[#ffd86b]" />}
                className="bg-[#120f18] border-[#2b2238]"
                onClick={() => setSelectedCard('Event Horizon Core')}
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="p-4 rounded-xl bg-[#120f18] border border-[#2b2238] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#ffd86b]" />
              <span className="text-xs text-[#8c7a9e]">
                {selectedCard ? `Selected: ${selectedCard}` : 'Select a UniversalCard above to inspect details'}
              </span>
            </div>
            <div className="flex gap-2">
              <SharedButton variant="ghost" size="sm" onClick={() => setSelectedCard(null)}>
                Clear Selection
              </SharedButton>
              <SharedButton variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
                Open Shared Modal
              </SharedButton>
            </div>
          </div>

          {/* Shared Modal Container */}
          <ModalContainer
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Shared Modal Specification"
            subtitle="Reusable Backdrop-Blur Container for Universe 25"
            icon={<Sparkles className="w-5 h-5 text-[#ffd86b]" />}
          >
            <div className="space-y-4 text-xs text-[#9c93a8]">
              <p>
                This modal container standardizes high-z-index popups, confirmation dialogues, and full-screen inspectors across all Universe 25 applications.
              </p>
              <div className="p-4 rounded-xl bg-[#14101c] border border-[#2a2034] space-y-2">
                <div className="font-bold text-white uppercase text-[11px] font-cinzel">Modal Invariants:</div>
                <ul className="list-disc pl-4 space-y-1 text-[#8c7a9e]">
                  <li>Keyboard / backdrop dismiss capability</li>
                  <li>Soft-coded Gate of Babylon border tokens and shadows</li>
                  <li>Scroll-locked viewport constraints with auto-scrolling content body</li>
                </ul>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <SharedButton variant="secondary" size="md" onClick={() => setIsModalOpen(false)}>
                  Close
                </SharedButton>
                <SharedButton variant="primary" size="md" onClick={() => setIsModalOpen(false)}>
                  Acknowledge
                </SharedButton>
              </div>
            </div>
          </ModalContainer>
        </div>
      )}

      {/* Sub-Tab 2: Altar / Shop / Extraction */}
      {activeTab === 'altar' && (
        <AltarSlot
          title="Summoning & Extraction Altar"
          description="Template layout for gacha rolls, shop purchases, and resource exchange interfaces"
          icon={<ShoppingBag className="w-5 h-5 text-[#ffd86b]" />}
          cost={{
            type: 'ticket',
            amount: 1
          }}
          featuredItem={{
            name: 'Chrono-Rex Specimen',
            score: 14.85,
            rank: '✦',
            type: 'Apex Specimen'
          }}
          className="p-6 bg-[#0e0a16]/80 border-[#2e2638]"
        >
          <div className="space-y-4">
            <div className="flex gap-3 justify-center">
              <SharedButton variant="primary" size="md">
                Roll Specimen (1 Ticket)
              </SharedButton>
              <SharedButton variant="secondary" size="md">
                Exchange Discs
              </SharedButton>
            </div>
            <p className="text-xs text-[#8c7a9e] max-w-md mx-auto text-center">
              Connect your currency stores (Discs, Angel Tickets, Time) to trigger procedural rolls and reward distributions.
            </p>
          </div>
        </AltarSlot>
      )}

      {/* Sub-Tab 3: Codex & Vault Gallery (Showcasing CodexGrid & HazardBadge) */}
      {activeTab === 'vault' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#0e0a16]/80 border border-[#2e2638]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffd86b]/20 to-[#0284c7]/30 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8]">
                  <Archive className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wider">
                    Tab 3 — Codex & Vault
                  </h3>
                  <p className="text-xs text-[#8c7a9e]">
                    Standardized paginated grid for inventory, relics, and specimens
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-[#8c7a9e]">Score Sandbox:</span>
              <input
                type="range"
                min="1"
                max="16"
                step="0.1"
                value={demoScore}
                onChange={(e) => setDemoScore(parseFloat(e.target.value))}
                className="w-32 accent-[#ffd86b]"
              />
              <HazardBadge score={demoScore} size="md" showDetails={true} />
            </div>

            <CodexGrid
              items={mockVaultItems}
              itemsPerPage={3}
              onItemClick={(item) => {
                console.log('Item clicked:', item);
              }}
              showDetails={false}
              className="space-y-4"
            />
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Settings & Configuration */}
      {activeTab === 'config' && (
        <ConfigSection
          title="Tab 4 — Soft-Coded Theming & Sandbox Config"
          description="Universal theme selector and configuration controls matching Gate of Babylon specifications"
          icon={<Sliders className="w-5 h-5" />}
          showThemeSelector={true}
        />
      )}
    </GameLayout>
  );
};
