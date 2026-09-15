import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../../store/useGlobalStore';
import { useCurrencyStore } from '../../store/useCurrencyStore';
import { useInventoryStore } from '../../store/useInventoryStore';
import { GameLayout } from '../../components/GameLayout';
import { Users, Sparkles, List, Sliders, Dna } from 'lucide-react';

// Import styles for Black Hole physics and Gacha UI
import './styles/juraGlobal.css';

// Import tab views
import { RosterView } from './components/tabs/RosterView';
import { Tabs_Gacha } from './components/tabs/Tabs_Gacha';
import { AllDinosView } from './components/tabs/AllDinosView';
import { SettingsView } from './components/tabs/SettingsView';

// Import raw game data directly for optimal Vite bundling and zero runtime fetch errors
import dinoRawData from './data/dino.json';
import lookupRawData from './data/lookup.json';
import resourceRawData from './data/resource.json';
import userProgressRawData from './data/user_progress.json';

// Complete data structures for Universe 25 integration
interface DinoObject {
  uuid: string;
  name: string;
  image_url: string;
  region: string;
  rarity: string;
  hybrid_type: string;
  class: string;
  hatch_time_mins: number;
  buy_price_dna: number;
  sell_price_dna: number;
  release_date: string;
  facts: string[];
  ingredients: any[];
  evolutions: {
    level: number;
    health: number;
    damage: number;
    image_url: string;
    portrait_frame: string;
  }[];
}

interface LookupData {
  class_icons: Record<string, string>;
  card_backgrounds: Record<string, string>;
  hybrid_types: Record<string, string>;
  region: Record<string, string>;
  portrait_frames: Record<string, string>;
  stats: Record<string, string>;
}

interface UserProgress {
  owned_dinos: Record<string, { number: number; rank: number }>;
}

interface ResourceData {
  elemental_time: Record<string, { amount: number; icon?: string }>;
  orbs: Record<string, { amount: number }>;
}

const LOCAL_STORAGE_PROGRESS_KEY = 'arc_jurassic_user_progress_v1';
const LOCAL_STORAGE_RESOURCES_KEY = 'arc_jurassic_resources_v1';

export const ArcJurassic: React.FC = () => {
  const setActiveApp = useGlobalStore((s) => s.setActiveApp);
  const timeBalance = useCurrencyStore((s) => s.timeBalance);
  const { discs } = useInventoryStore();

  // State for game data
  const [objects, setObjects] = useState<DinoObject[]>([]);
  const [lookup, setLookup] = useState<LookupData>({
    class_icons: {},
    card_backgrounds: {},
    hybrid_types: {},
    region: {},
    portrait_frames: {},
    stats: {},
  });
  const [userProgress, setUserProgress] = useState<UserProgress>({ owned_dinos: {} });
  const [myResources, setMyResources] = useState<ResourceData>({ elemental_time: {}, orbs: {} });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'roster' | 'gacha' | 'alldinos' | 'settings'>('gacha');
  const [rosterTargetUuid, setRosterTargetUuid] = useState<string | null>(null);
  const [initialTemptUuid, setInitialTemptUuid] = useState<string | null>(null);
  const [excludedIds, setExcludedIds] = useState<string[]>([]);
  const [top3Ferocity, setTop3Ferocity] = useState(0);

  // Load game data synchronously from bundled JSON, with local cache fallback
  useEffect(() => {
    try {
      // 1. Process Dino Objects
      const dinoObjects: DinoObject[] = Object.entries(dinoRawData).map(([uuid, dino]) => ({
        uuid,
        ...(dino as Omit<DinoObject, 'uuid'>)
      }));

      // 2. Load cached user progress or fallback to baseline
      let initialProgress: UserProgress = userProgressRawData as UserProgress;
      try {
        const cachedProgress = localStorage.getItem(LOCAL_STORAGE_PROGRESS_KEY);
        if (cachedProgress) {
          initialProgress = JSON.parse(cachedProgress);
        }
      } catch (e) {
        console.warn('Failed to parse cached user progress:', e);
      }

      // 3. Load cached resources or fallback to baseline
      let initialResources: ResourceData = resourceRawData as ResourceData;
      try {
        const cachedResources = localStorage.getItem(LOCAL_STORAGE_RESOURCES_KEY);
        if (cachedResources) {
          initialResources = JSON.parse(cachedResources);
        }
      } catch (e) {
        console.warn('Failed to parse cached resources:', e);
      }

      setObjects(dinoObjects);
      setLookup(lookupRawData as unknown as LookupData);
      setUserProgress(initialProgress);
      setMyResources(initialResources);

      // 4. Calculate top 3 ferocity stats & excluded IDs
      const calculatedExcludedIds: string[] = [];
      const ferocities: number[] = [];

      for (const [uuid, data] of Object.entries(initialProgress.owned_dinos || {})) {
        const dino = dinoObjects.find((d: DinoObject) => d.uuid === uuid);
        if (dino) {
          if (dino.evolutions?.length > 0) {
            const limit = Math.pow(2, dino.evolutions.length - 1);
            if ((data as any).number >= limit) {
              calculatedExcludedIds.push(uuid);
            }
          }

          const rank = (data as any).rank || 0;
          if (rank > 0) {
            const targetLevel = rank * 10;
            const evo = dino.evolutions?.find((e: any) => e.level === targetLevel);
            if (evo) {
              ferocities.push(Math.floor((evo.damage || 0) + ((evo.health || 0) / 3.2)));
            }
          }
        }
      }

      ferocities.sort((a, b) => b - a);
      const top3 = ferocities.slice(0, 3).reduce((a, b) => a + b, 0);

      setExcludedIds(calculatedExcludedIds);
      setTop3Ferocity(top3);
      setLoading(false);
    } catch (error) {
      console.error("Error initializing ARC Jurassic game data:", error);
      setLoading(false);
    }
  }, []);

  const handleUpdateProgress = (prog: UserProgress) => {
    setUserProgress(prog);
    try {
      localStorage.setItem(LOCAL_STORAGE_PROGRESS_KEY, JSON.stringify(prog));
    } catch (e) {
      console.warn('Failed to save progress to localStorage:', e);
    }
  };

  const handleUpdateResources = (res: ResourceData) => {
    setMyResources(res);
    try {
      localStorage.setItem(LOCAL_STORAGE_RESOURCES_KEY, JSON.stringify(res));
    } catch (e) {
      console.warn('Failed to save resources to localStorage:', e);
    }
  };

  // Handle navigation back to master game
  const handleBackToHub = () => {
    setActiveApp('golden-hour');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="text-4xl mb-6">⏳ Loading ARC Jurassic...</div>
        <div className="animate-spin rounded-full border-4 border-b-4 border-amber-500 w-16 h-16"></div>
      </div>
    );
  }

  return (
    <GameLayout
      title="ARC Jurassic"
      gameTitleIcon={<Dna className="w-5 h-5 text-[#ffd86b]" />}
      gameTitleBadge="GENETIC VAULT"
      gameTitleSubtitle="Prehistoric Gacha Nexus • DNA Synthesis Lab"
      showBackButton={true}
      backButton="Golden Hour"
      onBackClick={handleBackToHub}
      globalInfo={{
        goldenHours: timeBalance / 3600, // Convert seconds to hours
        discs: discs
      }}
      tabs={[
        { id: 'roster', label: 'Roster', icon: <Users className="w-4 h-4" /> },
        { id: 'gacha', label: 'Gacha', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'alldinos', label: 'List of Dinos', icon: <List className="w-4 h-4" /> },
        { id: 'settings', label: 'Settings', icon: <Sliders className="w-4 h-4" /> },
      ]}
      activeTab={view}
      onTabChange={(id) => setView(id as 'roster' | 'gacha' | 'alldinos' | 'settings')}
    >
      {view === 'roster' && (
        <RosterView
          objects={objects}
          lookup={lookup}
          userProgress={userProgress}
          initialSelectedUuid={rosterTargetUuid}
          onBack={() => setView('gacha')}
        />
      )}

      {view === 'gacha' && (
        <Tabs_Gacha
          objects={objects}
          lookup={lookup}
          userFerocity={Math.max(top3Ferocity, 200)}
          excludedIds={excludedIds}
          userProgress={userProgress}
          myResources={myResources}
          initialTemptUuid={initialTemptUuid}
          onUpdateResources={handleUpdateResources}
          onUpdateProgress={handleUpdateProgress}
          onWriteTempt={async (uuid) => { setInitialTemptUuid(uuid); }}
          onBuySuccess={(uuid) => {
            setRosterTargetUuid(uuid);
            setView('roster');
          }}
        />
      )}

      {view === 'alldinos' && (
        <AllDinosView
          objects={objects}
          lookup={lookup}
          userProgress={userProgress}
          onBack={() => setView('gacha')}
        />
      )}

      {view === 'settings' && (
        <SettingsView
          userProgress={userProgress}
          myResources={myResources}
          onUpdateProgress={handleUpdateProgress}
          onUpdateResources={handleUpdateResources}
        />
      )}
    </GameLayout>
  );
};